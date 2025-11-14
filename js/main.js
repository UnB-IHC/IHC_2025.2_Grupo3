document.addEventListener('DOMContentLoaded', () => {
  // Para cada canvas com essa classe criaremos um gráfico separado
  document.querySelectorAll('canvas.accessibility-pie-chart').forEach(canvas => {
    // Limitar a busca de checkboxes ao mesmo bloco de conteúdo (se possível)
    const container = canvas.closest('.md-content') || document;
    const checkboxes = Array.from(container.querySelectorAll('input[type="checkbox"]'));

    // Função que conta checks
    function counts() {
      const checked = checkboxes.filter(cb => cb.checked).length;
      const total = checkboxes.length;
      return { checked, unchecked: total - checked, total };
    }

    // Contexto do canvas e destruição de chart existente (evita duplo chart ao navegar)
    const ctx = canvas.getContext('2d');
    const existing = Chart.getChart(canvas);
    if (existing) existing.destroy();

    // Dados iniciais
    const initial = counts();

    const feitosColor = '#009485';   // verde
    const faltamColor = '#FBB13C';

    const data = {
      labels: ['Feitos', 'Faltam'],
      datasets: [{
        data: [initial.checked, initial.unchecked],
        backgroundColor: [feitosColor, faltamColor],
        borderColor: '#1e1e1e',
        borderWidth: 0
      }]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' },
        tooltip: { enabled: true }
      }
    };

    const chart = new Chart(ctx, { type: 'pie', data, options });

    // Atualiza o gráfico com os novos valores
    function updateChart() {
      const c = counts();
      chart.data.datasets[0].data = [c.checked, c.unchecked];
      chart.update();
    }

    // Adiciona listener a cada checkbox para atualizar (e salvar estado)
    const storageKey = 'checkstate:' + (location.pathname || document.title);
    checkboxes.forEach((cb, i) => {
      cb.addEventListener('change', () => {
        updateChart();
        // salva array de booleanos no localStorage
        try {
          const state = checkboxes.map(x => x.checked);
          localStorage.setItem(storageKey, JSON.stringify(state));
        } catch (e) {/* se storage falhar, ignora */}
      });
    });

    // Tenta restaurar estado salvo (opcional)
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const arr = JSON.parse(saved);
        arr.forEach((v, idx) => {
          if (checkboxes[idx]) checkboxes[idx].checked = !!v;
        });
        updateChart();
      }
    } catch (e) { /* ignore parse errors */ }
  });
});
