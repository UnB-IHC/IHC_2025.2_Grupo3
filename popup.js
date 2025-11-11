document.addEventListener('DOMContentLoaded', () => {
  const auditButton = document.getElementById('auditButton');
  const scoreValueEl = document.getElementById('scoreValue');
  const scoreRatioEl = document.getElementById('scoreRatio');
  const statusMessageEl = document.getElementById('statusMessage');
  const sectionsContainer = document.getElementById('sectionsContainer');
  const filterButtons = document.querySelectorAll('[data-filter]');

  let lastResults = null;
  let activeFilter = 'failed';

  function setStatusMessage(text, tone = 'neutral') {
    statusMessageEl.textContent = text;
    statusMessageEl.className = `status-message status-message--${tone}`;
  }

  function updateScore(results) {
    if (!results) {
      scoreValueEl.textContent = '--%';
      scoreValueEl.dataset.tone = 'neutral';
      scoreRatioEl.textContent = '0 critérios avaliados';
      return;
    }

    const score = Math.round(results.score || 0);
    scoreValueEl.textContent = `${score}%`;
    scoreRatioEl.textContent = `${results.passedCriteria}/${results.totalCriteria} critérios aprovados`;

    if (score >= 90) {
      scoreValueEl.dataset.tone = 'good';
    } else if (score >= 70) {
      scoreValueEl.dataset.tone = 'warn';
    } else {
      scoreValueEl.dataset.tone = 'alert';
    }
  }

  function updateFiltersUI() {
    filterButtons.forEach((btn) => {
      const isActive = btn.dataset.filter === activeFilter;
      btn.classList.toggle('filter-button--active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });
  }

  function shouldDisplayItem(item) {
    if (activeFilter === 'failed') {
      return !item.passed;
    }
    return true;
  }

  function renderSections() {
    sectionsContainer.innerHTML = '';

    if (!lastResults) {
      sectionsContainer.innerHTML =
        '<p class="empty-state">Execute a auditoria para visualizar os resultados aqui.</p>';
      return;
    }

    const sectionsData = lastResults.sections
      .map((section) => ({
        ...section,
        filteredItems: section.items.filter(shouldDisplayItem),
      }))
      .filter((section) => {
        if (activeFilter === 'failed') {
          return section.filteredItems.length > 0;
        }
        return true;
      });

    if (!sectionsData.length) {
      sectionsContainer.innerHTML =
        '<p class="empty-state">Nenhum critério corresponde ao filtro selecionado.</p>';
      return;
    }

    sectionsData.forEach((section) => {
      const detailsEl = document.createElement('details');
      detailsEl.className = 'section-card';
      if (section.filteredItems.length) {
        detailsEl.open = true;
      }

      const summary = document.createElement('summary');
      summary.className = 'section-card__summary';

      const headingWrapper = document.createElement('div');
      headingWrapper.className = 'section-heading';

      const titleEl = document.createElement('h3');
      titleEl.textContent = section.name;
      headingWrapper.appendChild(titleEl);

      const metaEl = document.createElement('p');
      metaEl.className = 'section-meta';
      metaEl.textContent = `${section.passed}/${section.total} critérios aprovados`;
      headingWrapper.appendChild(metaEl);

      const chip = document.createElement('span');
      chip.className = `status-chip ${
        section.failed ? 'status-chip--alert' : 'status-chip--ok'
      }`;
      chip.textContent = section.failed
        ? `${section.failed} falha(s)`
        : 'Tudo certo';

      summary.appendChild(headingWrapper);
      summary.appendChild(chip);
      detailsEl.appendChild(summary);

      if (section.filteredItems.length) {
        const itemsWrapper = document.createElement('div');
        itemsWrapper.className = 'section-items';

        section.filteredItems.forEach((item) => {
          const criterionDetails = document.createElement('details');
          criterionDetails.className = `criterion-card ${
            item.passed ? 'criterion-card--pass' : 'criterion-card--fail'
          }`;

          const summary = document.createElement('summary');
          const title = document.createElement('p');
          title.className = 'criterion-card__title';
          title.textContent = item.description;

          const chip = document.createElement('span');
          chip.className = `criterion-chip ${
            item.passed ? 'criterion-chip--ok' : 'criterion-chip--alert'
          }`;
          chip.textContent = item.passed
            ? 'Sem infrações'
            : `${item.violations.length || 1} infração(ões)`;

          summary.appendChild(title);
          summary.appendChild(chip);
          criterionDetails.appendChild(summary);

          const body = document.createElement('div');
          body.className = 'criterion-card__body';

          if (item.details) {
            const info = document.createElement('p');
            info.className = 'criterion__detail';
            info.textContent = item.details;
            body.appendChild(info);
          }

          if (!item.passed && item.violations.length) {
            const list = document.createElement('ul');
            list.className = 'violations-list';
            item.violations.forEach((violation) => {
              const li = document.createElement('li');
              li.textContent = violation;
              list.appendChild(li);
            });
            body.appendChild(list);
          } else {
            const okMessage = document.createElement('p');
            okMessage.className = 'criterion__detail';
            okMessage.textContent = item.passed
              ? 'Todos os elementos avaliados estão conformes.'
              : 'Nenhuma infração detalhada foi retornada.';
            body.appendChild(okMessage);
          }

          criterionDetails.appendChild(body);
          itemsWrapper.appendChild(criterionDetails);
        });

        detailsEl.appendChild(itemsWrapper);
      } else {
        const okMessage = document.createElement('p');
        okMessage.className = 'section-empty';
        okMessage.textContent =
          activeFilter === 'failed'
            ? 'Nenhuma falha nesta seção.'
            : 'Todos os critérios desta seção foram aprovados.';
        detailsEl.appendChild(okMessage);
      }

      sectionsContainer.appendChild(detailsEl);
    });
  }

  function finalizeAudit(results) {
    lastResults = results;
    updateScore(results);
    renderSections();

    if (results.errors.length) {
      setStatusMessage(
        'Foram encontradas recomendações. Revise as seções em destaque.',
        'warning'
      );
    } else {
      setStatusMessage(
        'Nenhum problema detectado nos critérios avaliados. Excelente!',
        'success'
      );
    }
  }

  async function handleAudit() {
    setStatusMessage('Analisando página atual...', 'info');
    auditButton.disabled = true;
    auditButton.setAttribute('aria-busy', 'true');

    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      const injection = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: runAccessibilityAudit,
      });

      if (!injection || !injection.length) {
        throw new Error('Nenhum resultado retornado.');
      }

      const [response] = injection;
      if (response.error) {
        throw new Error(response.error);
      }

      if (!response.result) {
        throw new Error('Nenhum resultado retornado.');
      }

      finalizeAudit(response.result);
    } catch (error) {
      console.error(error);
      const hint =
        'Verifique se a aba não é restrita (ex.: chrome://) ou tente recarregar a página.';
      setStatusMessage(`Erro: ${error.message}. ${hint}`, 'error');
      sectionsContainer.innerHTML =
        '<p class="empty-state">Não foi possível carregar os resultados.</p>';
    } finally {
      auditButton.disabled = false;
      auditButton.removeAttribute('aria-busy');
    }
  }

  auditButton.addEventListener('click', handleAudit);

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.filter;
      updateFiltersUI();
      renderSections();
    });
  });

  updateFiltersUI();
  updateScore(null);
  renderSections();
});
