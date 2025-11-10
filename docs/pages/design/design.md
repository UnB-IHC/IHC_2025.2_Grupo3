# Checklist de Design

<div class="chart-container" style="position: relative; height:250px; width:250px; margin: 20px auto;">
    <canvas class="accessibility-pie-chart"></canvas>
</div>

Existe uma lenda de que a acessibilidade torna um sítio web muito simples ou feio. Não é verdade: um sítio web bem estruturado pode ser bonito e criativo. É possível, inclusive, criar apresentações visuais diferentes para a mesma estrutura HTML de um sítio web com o uso de CSS e atender a diferentes necessidades". Dessa forma, nessa seção encontra-se checklist que garantam a acessibilidade no design.

## Aparência
- [ ] <b>Não depender exclusivamente da cor</b> para transmitir instruções ou informações. <a id="TEC1" href="#RP1">[1] [A]</a>

- [ ] <b>Tamanho do texto ajustável</b> até 200% sem perda de conteúdo ou funcionalidade. <a id="TEC2" href="#RP2">[2] [AA]</a>

- [ ] <b>Oferecer modo de alto contraste</b> (ex.: dark mode) e opção de aumentar fontes.

- [ ] <b>Limitar linhas de texto a no máximo 80 caracteres</b> (ou 40 para ideogramas).

- [ ] <b>Evitar textos longos em caixa alta ou fontes condensadas</b>.

- [ ] <b>Descrever controles</b> por nome, e não apenas por aparência ou localização. <a id="TEC3" href="#RP3">[3] [A]</a>

- [ ] <b>Evitar alinhamento justificado</b> de texto.

- [ ] <b>Usar fontes fluidas e legíveis</b>.

- [ ] <b>Dicas visuais</b> (como ícones e bordas) com contraste mínimo de 3:1 em relação ao fundo. <a id="TEC4" href="#RP4">[4] [AA]</a>

- [ ] <b>Cuidado com display: none e visibility: hidden</b> para não ocultar conteúdo de tecnologias assistivas.

- [ ] <b>Refluxo (reflow)</b> de conteúdo sem barra de rolagem horizontal em telas de 320px de largura. <a id="TEC5" href="#RP5">[5] [AA]</a>

- [ ] <b>Preferir botões com texto + ícone</b>. Botões apenas com ícone devem ter nome acessível.

## Animação
- [ ] <b>Evitar conteúdo que pisque mais de 3 vezes por segundo</b>. <a id="TEC6" href="#RP6">[6] [A]</a>

- [ ] <b>Permitir pausar, parar ou ocultar</b> conteúdo em movimento, rolagem ou atualização automática. <a id="TEC7" href="#RP7">[7] [A]</a>

- [ ] <b>Respeitar ``prefers-reduced-motion``</b> para reduzir ou remover animações. <a id="TEC8" href="#RP8">[8] [AAA]</a>

- [ ] <b>Permitir desativar animações acionadas por interação</b>, a menos que sejam essenciais. <a id="TEC14" href="#RP10">[10] [AAA]</a>

## Contraste de Cores
- [ ] <b>Contraste de texto normal</b> de pelo menos 4.5:1. <a id="TEC9" href="#RP9">[9] [AA]</a>

- [ ] <b>Contraste de texto grande</b> (>= 18pt ou 14pt negrito) de pelo menos 3:1. <a id="TEC9" href="#RP9">[9] [AA]</a>

- [ ] <b>Contraste de ícones e elementos de interface</b> de pelo menos 3:1. <a id="TEC4" href="#RP4">[4] [AA]</a>

- [ ] <b>Contraste de bordas de elementos de entrada</b> (campos, botões, etc.). <a id="TEC4" href="#RP4">[4] [AA]</a>

- [ ] <b>Contraste de texto sobre imagens ou vídeos</b>. <a id="TEC9" href="#RP9">[9] [AA]</a>

- [ ] <b>Contraste de cores personalizadas em ``::selection``</b>. <a id="TEC9" href="#RP9">[9] [AA]</a>

## Interação e Foco
- [ ] <b>Foco não obscurecido no mínimo</b>: componente com foco não pode estar totalmente escondido por outros elementos. <a id="TEC15" href="#RP11">[11] [AA]</a>

- [ ] <b>Foco não obscurecido (reforçado)</b>: nenhuma parte do componente com foco pode estar escondida. <a id="TEC16" href="#RP12">[12] [AAA]</a>

- [ ] <b>Aparência do foco</b>: indicador de foco deve ter pelo menos 2px de espessura e contraste de 3:1. <a id="TEC17" href="#RP13">[13] [AAA]</a>

- [ ] <b>Tamanho mínimo do alvo</b>: pelo menos 24x24px para toque, exceto em casos específicos. <a id="TEC18" href="#RP14">[14] [AA]</a>

- [ ] <b>Movimentos de arrastar</b> devem ter alternativa sem arrastar, a menos que essencial. <a id="TEC19" href="#RP15">[15] [AA]</a>

## Referências Bibliograficas

> <a id="RP1" href="#TEC1">1.</a> WCAG 2.2 Understanding Docs. SC 1.4.1 Use of Color (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html). Acesso em: 03 Nov. 2025.

> <a id="RP2" href="#TEC2">2.</a> WCAG 2.2 Understanding Docs. SC 1.4.4 Resize Text (Level AA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html). Acesso em: 03 Nov. 2025.

> <a id="RP3" href="#TEC3">3.</a> WCAG 2.2 Understanding Docs. SC 1.3.3 Sensory Characteristics (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/sensory-characteristics.html](https://www.w3.org/WAI/WCAG22/Understanding/sensory-characteristics.html). Acesso em: 03 Nov. 2025.

> <a id="RP4" href="#TEC4">4.</a> WCAG 2.2 Understanding Docs. SC 1.4.11 Non-text Contrast (Level AA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html). Acesso em: 03 Nov. 2025.

> <a id="RP5" href="#TEC5">5.</a> WCAG 2.2 Understanding Docs. SC 1.4.10 Reflow (Level AA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/reflow.html](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html). Acesso em: 03 Nov. 2025.

> <a id="RP6" href="#TEC6">6.</a> WCAG 2.2 Understanding Docs. SC 2.3.1 Three Flashes or Below Threshold (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html). Acesso em: 03 Nov. 2025.

> <a id="RP7" href="#TEC7">7.</a> WCAG 2.2.2 Understanding Docs. SC 2.2.2 Pause, Stop, Hide (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html). Acesso em: 03 Nov. 2025.

> <a id="RP8" href="#TEC8">8.</a> WCAG 2.2 Understanding Docs. SC 2.3.3 Animation from Interactions (Level AAA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html). Acesso em: 03 Nov. 2025.

> <a id="RP9" href="#TEC9">9.</a> WCAG 2.2 Understanding Docs. SC 1.4.3 Contrast (Minimum) (Level AA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). Acesso em: 03 Nov. 2025.

> <a id="RP10" href="#TEC10">10.</a> WCAG 2.2 Understanding Docs. SC 2.3.3 Animation from Interactions (Level AAA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html). Acesso em: 03 Nov. 2025.

> <a id="RP11" href="#TEC11">11.</a> WCAG 2.2 Understanding Docs. SC 2.4.11 Focus Not Obscured (Minimum) (Level AA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html). Acesso em: 03 Nov. 2025.

> <a id="RP12" href="#TEC12">12.</a> WCAG 2.2 Understanding Docs. SC 2.4.12 Focus Not Obscured (Enhanced) (Level AAA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-enhanced.html](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-enhanced.html). Acesso em: 03 Nov. 2025.

> <a id="RP13" href="#TEC13">13.</a> WCAG 2.2 Understanding Docs. SC 2.4.13 Focus Appearance (Level AAA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html). Acesso em: 03 Nov. 2025.

> <a id="RP14" href="#TEC14">14.</a> WCAG 2.2 Understanding Docs. SC 2.5.8 Target Size (Minimum) (Level AA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html). Acesso em: 03 Nov. 2025.

> <a id="RP15" href="#TEC15">15.</a> WCAG 2.2 Understanding Docs. SC 2.5.7 Dragging Movements (Level AA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html). Acesso em: 03 Nov. 2025.

## Bibliografia

> </a> DINIZ, V.; FERRAZ, R.; NASCIMENTO, C. M.; CREDIDIO, R. Guia de Boas Práticas para Acessibilidade Digital. Programa de Cooperação entre Reino Unido e Brasil em Acesso Digital, 2023. Disponível em: [https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/acessibilidade-digital/guiaboaspraaticasparaacessibilidadedigital.pdf](https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/acessibilidade-digital/guiaboaspraaticasparaacessibilidadedigital.pdf). Acesso em: 03 Nov. 2025.