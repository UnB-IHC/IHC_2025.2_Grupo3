#
## Resumo dos Checklists
<div id="checklist-summary"></div>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('checklist-summary');
  if (!container) return;

  // 🔧 Ordem fixa dos checklists
  const checklists = [
    { path: '/pages/design/design/', name: 'Design' },
    { path: '/pages/devWeb/devWeb/', name: 'DevWeb' },
    { path: '/pages/geracaoConteudo/conteudo/', name: 'Conteúdo' },
    { path: '/pages/gestaoProjeto/gestaoProjeto/', name: 'Projetos' },
    { path: '/pages/ferramentas/ferramentas/', name: 'NVDA' }
  ];

  // 🎨 GRID CENTRALIZADO (3 por linha, centraliza se sobrar)
  container.style.display = 'grid';
  container.style.gridTemplateColumns = 'repeat(5, 1fr)';
  container.style.justifyItems = 'center';
  container.style.alignItems = 'start';
  container.style.gap = '20px';
  container.style.maxWidth = '1200px';
  container.style.margin = '2rem auto';

  checklists.forEach(({ path, name }) => {
    const storageKey = 'checkstate:' + path;
    const raw = localStorage.getItem(storageKey);
    const state = raw ? JSON.parse(raw) : [];
    const metaRaw = localStorage.getItem(storageKey + ':meta');
    const meta = metaRaw ? JSON.parse(metaRaw) : {};
    const total = meta.total || state.length || 0;
    const checked = state.filter(Boolean).length;
    const percent = total > 0 ? Math.round((checked / total) * 100) : 0;

    // 🧩 CARD
    const card = document.createElement('div');
    card.style = `
      background:#fff;
      border:1px solid #ddd;
      border-radius:12px;
      padding:16px 12px;
      display:flex;
      flex-direction:column;
      align-items:center;
      text-align:center;
      box-shadow:0 2px 6px rgba(0,0,0,0.05);
      transition:transform .2s;
    `;
    card.onmouseenter = () => card.style.transform = 'translateY(-3px)';
    card.onmouseleave = () => card.style.transform = 'none';

    // título
    const title = document.createElement('div');
    title.style = "font-weight:600;margin-bottom:6px;font-size:1rem;color:black;";
    title.textContent = name;

    // progresso
    const progress = document.createElement('div');
    progress.style = "font-size:0.9rem;color:#666;margin-bottom:6px;";
    progress.textContent = `${checked}/${total} (${percent}%)`;

    // barra
    const barContainer = document.createElement('div');
    barContainer.style = `
      width:100%;
      height:10px;
      background:#eee;
      border-radius:8px;
      overflow:hidden;
      position:relative;
    `;

    const bar = document.createElement('div');
    bar.style = `
      width:${percent}%;
      height:100%;
      background:linear-gradient(90deg, #009485, #00bfa5);
      border-radius:8px 0 0 8px;
      transform-origin:left center;
      transition:width .4s ease;
    `;

    barContainer.appendChild(bar);

    // link
    const link = document.createElement('a');
    link.href = path;
    link.style = 'text-decoration:none;color:inherit;width:100%;';

    card.appendChild(title);
    card.appendChild(progress);
    card.appendChild(barContainer);
    link.appendChild(card);
    container.appendChild(link);
  });
});
</script>

## Bem Vindo!
Este projeto foi desenvolvido como parte da disciplina de Interação Humano-Computador ministrada pela Professora Rejane no semestre 2025.2, com o objetivo de criar um material prático e acessível sobre acessibilidade digital.

Este guia de bolso (Pocket Guide) foi feito baseado no Projeto [VerificaAAA](https://github.com/vitorfleonardo/VerificaAAA), desenvolvido no semestre anterior, reformulado de acordo com as novidades do WCAG.

Este pocket guide foi pensado para atender às necessidades de diversos profissionais: <b>designers</b> que querem criar interfaces inclusivas desde o início, <b>desenvolvedores</b> que precisam implementar acessibilidade de forma correta, <b>gerentes</b> de projeto que devem garantir a inclusão em seus produtos, <b>produtores de conteúdo</b> que desejam comunicar-se com todos os públicos, e <b>testadores</b> que validam a acessibilidade de produtos digitais.

Aqui você encontrará um material organizado em quatro pilares essenciais e um checklist bônus: <b>Design</b> Acessível com checklists práticos para criar interfaces que todos podem ver, entender e usar; <b>Desenvolvimento</b> inclusivo com orientações técnicas para implementar acessibilidade no código; <b>Geração de Conteúdo</b> para todos com boas práticas para produzir textos, imagens e vídeos compreensíveis por todas as pessoas; e <b>Gestão de Projetos</b> com um passo a passo de como uma equipe deve ser estruturada para o desenvolvimento acessível. Ao final há um espaõ destinado a elencar <b>Ferramentas</b> e Verificações com recursos para testar e validar a acessibilidade em diferentes fases do projeto, nesta mesma seção há um checklist para <b>NVDA</b> ou outros leitores de tela.

Para usar este material, navegue pelas seções de acordo com sua função no projeto, siga os checklists como guia durante seu trabalho, consulte as referências para entender os critérios técnicos e compartilhe com a equipe para criar uma cultura de acessibilidade. No topo da página inicial há o resultado de todos os checklists juntos.

---
## Integrantes do Grupo 3

<div style="
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
">

<a href="https://github.com/marcoslbz" style="text-decoration: none" target="_blank";>
  <div class="integrante-card">
    <img src="assets/marcos.webp">
    <h3>Marcos Bezerra</h3>
    <p>Integrante do grupo</p>
  </div>
</a>

<a href="https://github.com/CaioMelo25" style="text-decoration: none" target="_blank";>
  <div class="integrante-card">
    <img src="assets/caio.webp">
    <h3>Caio Melo</h3>
    <p>Líder do grupo</p>
  </div>
</a>

<a href="https://github.com/Pnery2004" style="text-decoration: none" target="_blank";>
  <div class="integrante-card">
    <img src="assets/paulo.webp">
    <h3>Paulo Nery</h3>
    <p>Integrante do grupo</p>
  </div>
</a>

<a href="https://github.com/LeoFacB" style="text-decoration: none" target="_blank";>
  <div class="integrante-card">
    <img src="assets/leonardo.webp">
    <h3>Leonardo Bonetti</h3>
    <p>Integrante do grupo</p>
  </div>
</a>

<!-- ...demais integrantes -->
</div>

---

## Histórico de Versão

| Data     | Versão | Descrição             | Autor              |
| -------- | ------ | --------------------- | ------------------ |
| 03/11/25 | 1.0    | Criação do Documento  | Marcos Bezerra     |
