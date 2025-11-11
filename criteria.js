function runAccessibilityAudit() {
  function createSnippet(text, limit) {
    if (!text) return '';
    const normalized = text.replace(/\s+/g, ' ').trim();
    if (normalized.length <= limit) {
      return normalized;
    }
    return `${normalized.slice(0, limit)}…`;
  }

  function describeElement(el, textOverride) {
    const tag = el.tagName.toLowerCase();
    const id = el.id ? `#${el.id}` : '';
    const className =
      el.classList && el.classList.length
        ? `.${Array.from(el.classList).join('.')}`
        : '';
    const snippet = createSnippet(
      typeof textOverride === 'string' ? textOverride : el.textContent,
      60
    );
    return `<${tag}${id}${className}> "${snippet}"`;
  }

  function isElementVisible(el) {
    const style = window.getComputedStyle(el);
    if (style.visibility === 'hidden' || style.display === 'none') {
      return false;
    }

    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  function getAccessibleName(el) {
    const ariaLabel = el.getAttribute('aria-label');
    if (ariaLabel && ariaLabel.trim().length) {
      return ariaLabel.trim();
    }

    const labelledBy = el.getAttribute('aria-labelledby');
    if (labelledBy) {
      const ids = labelledBy.split(/\s+/);
      const pieces = ids
        .map((id) => {
          const node = document.getElementById(id);
          return node ? node.textContent.trim() : '';
        })
        .filter(Boolean);
      if (pieces.length) {
        return pieces.join(' ');
      }
    }

    const titleAttr = el.getAttribute('title');
    if (titleAttr && titleAttr.trim().length) {
      return titleAttr.trim();
    }

    const text = (el.innerText || el.textContent || '').replace(
      /\s+/g,
      ' '
    ).trim();
    return text;
  }

  function includesIgnoreCase(text, search) {
    if (!text || !search) return false;
    return text.toLowerCase().includes(search.toLowerCase());
  }

  const cssEscape =
    typeof CSS !== 'undefined' && CSS.escape
      ? CSS.escape
      : (value) =>
          String(value).replace(
            /([^\w-])/g,
            (match) => `\\${match}`
          );

  function findElementsContaining(attr, substring, baseSelector) {
    const selector = baseSelector || `[${attr}]`;
    const matches = [];
    document.querySelectorAll(selector).forEach((el) => {
      const value = el.getAttribute(attr);
      if (includesIgnoreCase(value, substring)) {
        matches.push(el);
      }
    });
    return matches;
  }

  function dedupeElements(elements) {
    const seen = new Set();
    const unique = [];
    elements.forEach((el) => {
      if (!seen.has(el)) {
        seen.add(el);
        unique.push(el);
      }
    });
    return unique;
  }

  function hasAssociatedLabel(el) {
    if (!el) return false;
    const ariaLabel = el.getAttribute('aria-label');
    if (ariaLabel && ariaLabel.trim().length) {
      return true;
    }

    const labelledBy = el.getAttribute('aria-labelledby');
    if (labelledBy) {
      const ids = labelledBy.split(/\s+/);
      const labelledContent = ids
        .map((id) => {
          const node = document.getElementById(id);
          return node ? node.textContent.trim() : '';
        })
        .filter(Boolean)
        .join(' ');
      if (labelledContent.length) {
        return true;
      }
    }

    if (el.id) {
      const selector = `label[for="${cssEscape(el.id)}"]`;
      if (document.querySelector(selector)) {
        return true;
      }
    }

    let parent = el.parentElement;
    while (parent) {
      if (parent.tagName && parent.tagName.toLowerCase() === 'label') {
        return true;
      }
      parent = parent.parentElement;
    }

    return false;
  }

  function isLabelRequired(el) {
    if (!el || !el.tagName) return false;
    const tag = el.tagName.toLowerCase();
    if (tag === 'select' || tag === 'textarea') {
      return true;
    }
    if (tag !== 'input') {
      return false;
    }
    const type = (el.getAttribute('type') || 'text').toLowerCase();
    const skipTypes = new Set([
      'hidden',
      'button',
      'submit',
      'reset',
      'image',
      'file',
    ]);
    return !skipTypes.has(type);
  }

  function getLinkNormalizedText(el) {
    return (getAccessibleName(el) || '').toLowerCase().trim();
  }

  function hasSkipLink() {
    const skipTargets = [
      'main',
      'conteudo',
      'content',
      'principal',
      'inicio',
      'main-content',
    ];
    const links = document.querySelectorAll('a[href^="#"]');
    return Array.from(links).some((link) => {
      const target = (link.getAttribute('href') || '').slice(1).toLowerCase();
      if (!target) {
        return false;
      }
      return skipTargets.some((pattern) => target.includes(pattern));
    });
  }

  function getInteractiveElementsForTouch() {
    const candidates = document.querySelectorAll(
      'button, a[href], input:not([type="hidden"]), select, textarea, [role="button"], [role="link"]'
    );
    return Array.from(candidates).filter((el) => isElementVisible(el));
  }

  function indicatesNewWindow(text) {
    const normalized = (text || '').toLowerCase();
    const keywords = [
      'nova aba',
      'nova janela',
      'new tab',
      'new window',
      'externo',
      'external',
      'abre em nova',
      'abre em',
      'abre nova',
      'abre outra',
      'abre uma nova',
      'external link',
      'link externo',
      '↗',
      '⧉',
    ];
    return keywords.some((word) => normalized.includes(word));
  }

  const designCriteria = [
    {
      id: 'design-avoid-justify',
      section: 'Design · Aparência',
      description: 'Evitar alinhamento totalmente justificado em blocos longos.',
      evaluate() {
        const selectors = 'p, div, article, section, li';
        const offenders = [];
        document.querySelectorAll(selectors).forEach((el) => {
          const text = (el.innerText || '').replace(/\s+/g, ' ').trim();
          if (text.length < 60) return;
          const style = window.getComputedStyle(el);
          if (style.textAlign && style.textAlign.toLowerCase() === 'justify') {
            offenders.push(describeElement(el, text));
          }
        });

        if (offenders.length) {
          return {
            passed: false,
            details:
              'Evite blocos longos totalmente justificados para preservar a legibilidade.',
            violations: offenders,
          };
        }

        return { passed: true, violations: [] };
      },
    },
    {
      id: 'design-icon-only-buttons',
      section: 'Design · Aparência',
      description: 'Botões com ícone devem ter texto visível ou nome acessível.',
      evaluate() {
        const interactiveElements = document.querySelectorAll(
          'button, [role="button"], a[role="button"]'
        );
        const offenders = [];

        interactiveElements.forEach((el) => {
          if (!isElementVisible(el)) return;

          const accessibleName = getAccessibleName(el);
          const hasIcon = el.querySelector('svg, img, i');
          if (!accessibleName && hasIcon) {
            offenders.push(describeElement(el));
          }
        });

        if (offenders.length) {
          return {
            passed: false,
            details:
              'Botões compostos apenas por ícones precisam expor um nome acessível.',
            violations: offenders,
          };
        }

        return { passed: true, violations: [] };
      },
    },
    {
      id: 'design-focus-visible',
      section: 'Design · Interação e foco',
      description: 'Indicadores de foco devem permanecer visíveis.',
      evaluate() {
        const interactiveSelectors =
          'button, a[href], input, select, textarea, [tabindex]';
        const offenders = [];

        document.querySelectorAll(interactiveSelectors).forEach((el) => {
          const tabIndexAttr = el.getAttribute('tabindex');
          if (tabIndexAttr !== null && parseInt(tabIndexAttr, 10) < 0) {
            return;
          }

          if (!isElementVisible(el)) return;

          const style = window.getComputedStyle(el);
          const outlineWidth = parseFloat(style.outlineWidth);
          const outlineStyle = style.outlineStyle;
          const boxShadow = style.boxShadow;
          const hasCustomIndicator = boxShadow && boxShadow !== 'none';

          if (
            (outlineStyle === 'none' || outlineWidth === 0) &&
            !hasCustomIndicator
          ) {
            offenders.push(describeElement(el));
          }
        });

        if (offenders.length) {
          return {
            passed: false,
            details:
              'Todo elemento interativo deve manter um indicador de foco visível.',
            violations: offenders,
          };
        }

        return { passed: true, violations: [] };
      },
    },
  ];

  const developmentCriteria = [
    {
      id: 'dev-language',
      section: 'Desenvolvimento · Conteúdo',
      description: 'A tag <html> deve possuir atributo lang.',
      evaluate() {
        const htmlLang = document.documentElement.lang;
        if (!htmlLang || htmlLang.trim() === '') {
          return {
            passed: false,
            details:
              "Defina o atributo 'lang' na tag <html> para informar o idioma principal.",
            violations: ["<html> sem atributo 'lang' definido"],
          };
        }
        return { passed: true, violations: [] };
      },
    },
    {
      id: 'dev-images-alt',
      section: 'Desenvolvimento · Conteúdo não textual',
      description: 'Imagens devem possuir atributo alt (ou alt="").',
      evaluate() {
        const images = document.querySelectorAll('img');
        const offenders = [];

        images.forEach((img) => {
          if (!img.hasAttribute('alt')) {
            offenders.push(describeElement(img, img.src || ''));
          }
        });

        if (offenders.length) {
          return {
            passed: false,
            details: 'Imagens informativas precisam do atributo alt.',
            violations: offenders,
          };
        }

        return { passed: true, violations: [] };
      },
    },
    {
      id: 'dev-keyboard-clickables',
      section: 'Desenvolvimento · Teclado',
      description:
        "Elementos com 'onclick' precisam ser focáveis ou nativamente interativos.",
      evaluate() {
        const selector = 'div[onclick], span[onclick], p[onclick], img[onclick]';
        const offenders = [];

        document.querySelectorAll(selector).forEach((el) => {
          const tabIndex = el.getAttribute('tabindex');
          const isFocusable = tabIndex !== null && parseInt(tabIndex, 10) >= 0;
          const role = el.getAttribute('role');
          const isButtonRole =
            role === 'button' || role === 'link' || role === 'menuitem';

          if (!isFocusable) {
            offenders.push(
              describeElement(
                el,
                `role=${role || 'sem role'}, tabindex=${tabIndex || 'ausente'}`
              )
            );
          } else if (isButtonRole && parseInt(tabIndex, 10) < 0) {
            offenders.push(
              describeElement(
                el,
                `role=${role}, tabindex=${tabIndex || 'ausente'}`
              )
            );
          }
        });

        if (offenders.length) {
          return {
            passed: false,
            details:
              'Elementos clicáveis precisam ser focáveis ou nativamente interativos.',
            violations: offenders,
          };
        }

        return { passed: true, violations: [] };
      },
    },
    {
      id: 'dev-video-captions',
      section: 'Desenvolvimento · Mídia',
      description: 'Vídeos devem disponibilizar faixas de legenda (track captions).',
      evaluate() {
        const videos = document.querySelectorAll('video');
        const offenders = [];
        videos.forEach((video) => {
          const hasTrack = video.querySelector(
            'track[kind="captions"], track[kind="subtitles"]'
          );
          if (!hasTrack) {
            offenders.push(
              describeElement(video, video.currentSrc || video.src || '')
            );
          }
        });

        if (offenders.length) {
          return {
            passed: false,
            details: 'Adicione faixas <track> com legendas ou legendas embutidas nos vídeos.',
            violations: offenders,
          };
        }

        return { passed: true, violations: [] };
      },
    },
    {
      id: 'dev-media-controls',
      section: 'Desenvolvimento · Mídia',
      description: 'Vídeos e áudios precisam oferecer controles de reprodução.',
      evaluate() {
        const offenders = [];
        document.querySelectorAll('video, audio').forEach((media) => {
          if (!media.controls && !media.hasAttribute('controls')) {
            offenders.push(
              describeElement(media, media.currentSrc || media.src || '')
            );
          }
        });

        if (offenders.length) {
          return {
            passed: false,
            details: 'Habilite o atributo controls para que usuários possam pausar ou ajustar mídias.',
            violations: offenders,
          };
        }

        return { passed: true, violations: [] };
      },
    },
    {
      id: 'dev-media-autoplay',
      section: 'Desenvolvimento · Mídia',
      description: 'Evite autoplay em mídias.',
      evaluate() {
        const offenders = [];
        document.querySelectorAll('video, audio').forEach((media) => {
          if (media.autoplay || media.hasAttribute('autoplay')) {
            offenders.push(
              describeElement(media, media.currentSrc || media.src || '')
            );
          }
        });

        if (offenders.length) {
          return {
            passed: false,
            details: 'Remova autoplay ou peça confirmação antes de iniciar mídias automaticamente.',
            violations: offenders,
          };
        }

        return { passed: true, violations: [] };
      },
    },
    {
      id: 'dev-links-href',
      section: 'Desenvolvimento · Links',
      description: 'Links precisam de href válido.',
      evaluate() {
        const offenders = [];
        document.querySelectorAll('a').forEach((link) => {
          const href = (link.getAttribute('href') || '').trim();
          const role = (link.getAttribute('role') || '').toLowerCase();
          if (!href || href === '#' || href.toLowerCase().startsWith('javascript')) {
            if (role !== 'button') {
              offenders.push(describeElement(link, link.textContent || href));
            }
          }
        });

        if (offenders.length) {
          return {
            passed: false,
            details:
              'Links sem href válido não são anunciados corretamente por leitores de tela.',
            violations: offenders,
          };
        }

        return { passed: true, violations: [] };
      },
    },
    {
      id: 'dev-buttons-type',
      section: 'Desenvolvimento · Controles',
      description: 'Defina type explícito nos botões.',
      evaluate() {
        const offenders = [];
        document.querySelectorAll('button').forEach((button) => {
          if (!button.hasAttribute('type')) {
            offenders.push(describeElement(button, button.textContent));
          }
        });

        if (offenders.length) {
          return {
            passed: false,
            details: 'Especifique type="button", "submit" ou "reset" para cada botão.',
            violations: offenders,
          };
        }
        return { passed: true, violations: [] };
      },
    },
    {
      id: 'dev-skip-link',
      section: 'Desenvolvimento · Navegação',
      description: 'Inclua links para pular direto ao conteúdo principal.',
      evaluate() {
        if (hasSkipLink()) {
          return { passed: true, violations: [] };
        }
        return {
          passed: false,
          details:
            'Adicione um link visível ao receber foco que permita saltar direto para o conteúdo principal.',
          violations: ['Nenhum skip-link encontrado na página.'],
        };
      },
    },
    {
      id: 'dev-new-tab-warning',
      section: 'Desenvolvimento · Links',
      description: 'Links que abrem em nova aba devem sinalizar essa ação.',
      evaluate() {
        const offenders = [];
        document.querySelectorAll('a[target="_blank"]').forEach((link) => {
          const text = getLinkNormalizedText(link);
          const title = (link.getAttribute('title') || '').toLowerCase();
          const ariaLabel = (link.getAttribute('aria-label') || '').toLowerCase();
          if (
            !indicatesNewWindow(text) &&
            !indicatesNewWindow(title) &&
            !indicatesNewWindow(ariaLabel)
          ) {
            offenders.push(describeElement(link, link.textContent));
          }
        });

        if (offenders.length) {
          return {
            passed: false,
            details:
              'Informe pessoas usuárias quando um link abrirá em outra aba ou janela.',
            violations: offenders,
          };
        }

        return { passed: true, violations: [] };
      },
    },
    {
      id: 'dev-form-labels',
      section: 'Desenvolvimento · Formulários',
      description: 'Campos de formulário precisam de label associado.',
      evaluate() {
        const offenders = [];
        document.querySelectorAll('input, select, textarea').forEach((field) => {
          if (!isLabelRequired(field)) return;
          if (!hasAssociatedLabel(field)) {
            offenders.push(describeElement(field));
          }
        });

        if (offenders.length) {
          return {
            passed: false,
            details:
              'Associe cada campo de formulário a um label ou utilize aria-label/aria-labelledby.',
            violations: offenders,
          };
        }
        return { passed: true, violations: [] };
      },
    },
    {
      id: 'dev-form-autocomplete',
      section: 'Desenvolvimento · Formulários',
      description: 'Campos de dados pessoais devem usar autocomplete.',
      evaluate() {
        const offenders = [];
        const allowedTypes = new Set([
          'text',
          'email',
          'tel',
          'url',
          'search',
          'password',
          'number',
        ]);
        document.querySelectorAll('input').forEach((input) => {
          const type = (input.getAttribute('type') || 'text').toLowerCase();
          if (!allowedTypes.has(type)) return;
          if (input.disabled || input.readOnly) return;
          const autocomplete = input.getAttribute('autocomplete');
          if (!autocomplete || !autocomplete.trim().length) {
            offenders.push(describeElement(input));
          }
        });

        if (offenders.length) {
          return {
            passed: false,
            details: 'Preencha o atributo autocomplete para facilitar o preenchimento.',
            violations: offenders,
          };
        }
        return { passed: true, violations: [] };
      },
    },
    {
      id: 'dev-heading-structure',
      section: 'Desenvolvimento · Estrutura',
      description: 'Não pule níveis de cabeçalho.',
      evaluate() {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const offenders = [];
        let lastLevel = 0;
        headings.forEach((heading) => {
          const level = parseInt(heading.tagName.substring(1), 10);
          if (Number.isNaN(level)) return;
          if (lastLevel && level > lastLevel + 1) {
            offenders.push(
              describeElement(heading, heading.textContent || heading.innerText)
            );
          }
          lastLevel = level;
        });

        if (offenders.length) {
          return {
            passed: false,
            details:
              'Evite saltar de h2 para h4, por exemplo. Siga a hierarquia sequencial.',
            violations: offenders,
          };
        }
        return { passed: true, violations: [] };
      },
    },
    {
      id: 'dev-heading-h1',
      section: 'Desenvolvimento · Estrutura',
      description: 'Cada página deve ter um único h1 descritivo.',
      evaluate() {
        const headings = document.querySelectorAll('h1');
        if (headings.length === 1) {
          return { passed: true, violations: [] };
        }
        if (headings.length === 0) {
          return {
            passed: false,
            details: 'Inclua um h1 descrevendo o conteúdo principal da página.',
            violations: ['Nenhum elemento <h1> foi encontrado.'],
          };
        }
        const offenders = Array.from(headings).map((heading) =>
          describeElement(heading, heading.textContent || heading.innerText)
        );
        return {
          passed: false,
          details: 'Mantenha apenas um h1 por página para evitar ambiguidades.',
          violations: offenders,
        };
      },
    },
    {
      id: 'dev-table-headers',
      section: 'Desenvolvimento · Tabelas',
      description: 'Tabelas de dados precisam de cabeçalhos <th>.',
      evaluate() {
        const offenders = [];
        document.querySelectorAll('table').forEach((table) => {
          if (table.getAttribute('role') === 'presentation') return;
          const rows = table.rows || [];
          if (rows.length === 0) return;
          const firstRow = rows[0];
          if (!firstRow || firstRow.cells.length <= 1 || rows.length <= 1) {
            return;
          }
          const hasHeaders = table.querySelector('th');
          if (!hasHeaders) {
            offenders.push(describeElement(table));
          }
        });

        if (offenders.length) {
          return {
            passed: false,
            details:
              'Use <th> com escopo correto para identificar cabeçalhos de tabela.',
            violations: offenders,
          };
        }
        return { passed: true, violations: [] };
      },
    },
    {
      id: 'dev-table-caption',
      section: 'Desenvolvimento · Tabelas',
      description: 'Forneça <caption> descritivo para tabelas.',
      evaluate() {
        const offenders = [];
        document.querySelectorAll('table').forEach((table) => {
          if (table.getAttribute('role') === 'presentation') return;
          const rows = table.rows || [];
          if (rows.length <= 1) return;
          const firstRow = rows[0];
          if (!firstRow || firstRow.cells.length <= 1) return;
          if (!table.querySelector('caption')) {
            offenders.push(describeElement(table));
          }
        });

        if (offenders.length) {
          return {
            passed: false,
            details:
              'Inclua <caption> para descrever a finalidade dos dados apresentados.',
            violations: offenders,
          };
        }
        return { passed: true, violations: [] };
      },
    },
    {
      id: 'dev-touch-target',
      section: 'Desenvolvimento · Dispositivos móveis',
      description: 'Alvos interativos devem ter ao menos 24x24px.',
      evaluate() {
        const offenders = [];
        getInteractiveElementsForTouch().forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (!rect.width || !rect.height) return;
          if (rect.width < 24 || rect.height < 24) {
            offenders.push(
              `${describeElement(
                el
              )} (${Math.round(rect.width)}x${Math.round(rect.height)}px)`
            );
          }
        });

        if (offenders.length) {
          return {
            passed: false,
            details:
              'Amplie botões e links para pelo menos 24px de largura e altura.',
            violations: offenders,
          };
        }

        return { passed: true, violations: [] };
      },
    },
    {
      id: 'dev-search-available',
      section: 'Desenvolvimento · Extras',
      description: 'Inclua um campo ou região de busca.',
      evaluate() {
        const hasSearchField = Boolean(
          document.querySelector('input[type="search"]')
        );
        const hasSearchRole = Array.from(
          document.querySelectorAll('[role]')
        ).some((el) => includesIgnoreCase(el.getAttribute('role'), 'search'));
        const hasSearchForm = Array.from(
          document.querySelectorAll('form[action]')
        ).some((form) =>
          includesIgnoreCase(form.getAttribute('action'), 'search')
        );
        const hasSearchName = Array.from(
          document.querySelectorAll('input[name]')
        ).some((input) =>
          includesIgnoreCase(input.getAttribute('name'), 'search')
        );

        const hasSearch =
          hasSearchField || hasSearchRole || hasSearchForm || hasSearchName;
        if (hasSearch) {
          return { passed: true, violations: [] };
        }
        return {
          passed: false,
          details: 'Disponibilize um mecanismo de busca para conteúdos extensos.',
          violations: ['Nenhum campo ou região de busca foi identificado.'],
        };
      },
    },
    {
      id: 'dev-breadcrumbs',
      section: 'Desenvolvimento · Extras',
      description: 'Use breadcrumbs para indicar localização atual.',
      evaluate() {
        const classBreadcrumb = document.querySelector('.breadcrumb');
        if (classBreadcrumb) {
          return { passed: true, violations: [] };
        }

        const labels = ['breadcrumb', 'trilha', 'navegação secundária'];
        const ariaBreadcrumb = Array.from(
          document.querySelectorAll(
            'nav[aria-label], nav[role="navigation"][aria-label]'
          )
        ).some((nav) => {
          const label = nav.getAttribute('aria-label') || '';
          return labels.some((word) => includesIgnoreCase(label, word));
        });

        if (ariaBreadcrumb) {
          return { passed: true, violations: [] };
        }
        return {
          passed: false,
          details:
            'Inclua breadcrumbs para orientar pessoas usuárias sobre onde elas estão na estrutura.',
          violations: ['Nenhum componente de breadcrumb foi identificado.'],
        };
      },
    },
    {
      id: 'dev-captcha-accessible',
      section: 'Desenvolvimento · Extras',
      description: 'Captchas precisam oferecer alternativas acessíveis.',
      evaluate() {
        const captchaCandidates = [
          ...findElementsContaining('id', 'captcha'),
          ...findElementsContaining('class', 'captcha'),
          ...findElementsContaining('name', 'captcha', 'input[name]'),
          ...findElementsContaining('src', 'captcha', 'iframe[src]'),
        ];
        const captchaElements = dedupeElements(captchaCandidates);
        if (!captchaElements.length) {
          return { passed: true, violations: [] };
        }

        const offenders = [];
        captchaElements.forEach((el) => {
          const hasAlternative =
            el.getAttribute('aria-label') ||
            el.getAttribute('aria-describedby') ||
            el.getAttribute('title');
          if (!hasAlternative) {
            offenders.push(describeElement(el));
          }
        });

        if (offenders.length) {
          return {
            passed: false,
            details:
              'Ofereça alternativas simples (ex.: áudio ou desafio lógico) e descreva o captcha para tecnologias assistivas.',
            violations: offenders,
          };
        }

        return {
          passed: true,
          violations: [],
        };
      },
    },
  ];

  const contentCriteria = [
    {
      id: 'content-links-descriptive',
      section: 'Conteúdo · Links',
      description: 'Links devem ser descritivos isoladamente.',
      evaluate() {
        const offenders = [];
        const bannedTexts = [
          'clique aqui',
          'clique',
          'saiba mais',
          'veja mais',
          'mais',
          'leia mais',
          'aqui',
          'acesse',
          'link',
          'more',
          'learn more',
          'read more',
          'click here',
        ];
        document.querySelectorAll('a[href]').forEach((link) => {
          const text = getLinkNormalizedText(link);
          if (!text || text.length < 3) {
            offenders.push(describeElement(link, link.textContent));
            return;
          }
          if (bannedTexts.includes(text)) {
            offenders.push(describeElement(link, link.textContent));
          }
        });

        if (offenders.length) {
          return {
            passed: false,
            details:
              'Atualize textos de links para que façam sentido fora de contexto.',
            violations: offenders,
          };
        }
        return { passed: true, violations: [] };
      },
    },
    {
      id: 'content-dynamic-control',
      section: 'Conteúdo · Dinâmico',
      description: 'Conteúdo que se move precisa permitir pausar/parar.',
      evaluate() {
        const offenders = [];
        const movingSelectors = ['marquee', 'blink'];
        movingSelectors.forEach((selector) => {
          document.querySelectorAll(selector).forEach((el) => {
            offenders.push(describeElement(el, el.textContent));
          });
        });

        const autoCarousels = document.querySelectorAll(
          '[aria-live="off"][data-autoplay], [data-autoplay="true"]'
        );
        autoCarousels.forEach((el) => {
          offenders.push(describeElement(el));
        });

        if (offenders.length) {
          return {
            passed: false,
            details:
              'Garante que componentes com movimento possuam controles de pausa, parada ou ocultação.',
            violations: offenders,
          };
        }

        return { passed: true, violations: [] };
      },
    },
  ];

  const allCriteria = [
    ...designCriteria,
    ...developmentCriteria,
    ...contentCriteria,
  ];

  const results = {
    errors: [],
    totalCriteria: allCriteria.length,
    passedCriteria: allCriteria.length,
    score: 100,
    criteriaResults: [],
    sections: [],
  };

  allCriteria.forEach((criterion) => {
    try {
      const evaluation = criterion.evaluate();
      const passed = evaluation && evaluation.passed !== false;

      const criterionResult = {
        id: criterion.id,
        section: criterion.section,
        description: criterion.description,
        passed,
        details: evaluation && evaluation.details ? evaluation.details : '',
        violations: Array.isArray(evaluation?.violations)
          ? evaluation.violations
          : [],
      };
      results.criteriaResults.push(criterionResult);

      if (!passed) {
        results.passedCriteria -= 1;
        const detail =
          evaluation && evaluation.details ? ` ${evaluation.details}` : '';
        results.errors.push(
          `${criterion.section}: ${criterion.description}.${detail}`
        );
      } else {
        criterionResult.details = '';
      }
    } catch (error) {
      results.passedCriteria -= 1;
      const errorMessage = `Erro na verificação (${error.message}).`;
      results.errors.push(
        `${criterion.section}: ${criterion.description}. ${errorMessage}`
      );
      results.criteriaResults.push({
        id: criterion.id,
        section: criterion.section,
        description: criterion.description,
        passed: false,
        details: errorMessage,
        violations: [errorMessage],
      });
    }
  });

  const sectionsMap = {};
  results.criteriaResults.forEach((item) => {
    if (!sectionsMap[item.section]) {
      sectionsMap[item.section] = {
        name: item.section,
        total: 0,
        passed: 0,
        failed: 0,
        items: [],
      };
    }
    const section = sectionsMap[item.section];
    section.total += 1;
    if (item.passed) {
      section.passed += 1;
    } else {
      section.failed += 1;
    }
    section.items.push(item);
  });

  results.sections = Object.values(sectionsMap);
  results.score = (results.passedCriteria / results.totalCriteria || 0) * 100;
  return results;
}

window.runAccessibilityAudit = runAccessibilityAudit;
