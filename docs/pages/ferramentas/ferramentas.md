# Ferramentas de Acessibilidade

Para auxiliar e facilitar o desenvolvimento de soluções acessíveis, existem diversas ferramentas essenciais que são amplamente utilizadas por desenvolvedores e profissionais de acessibilidade. Estas ferramentas ajudam a identificar, corrigir e prevenir barreiras que podem impedir pessoas com deficiência de utilizar produtos digitais de forma eficiente.

## NonVisual Desktop Acess - NVDA
O NVDA (NonVisual Desktop Access) é um leitor de telas gratuito e de código aberto para o sistema operacional Windows. Amplamente utilizado por pessoas cegas ou com baixa visão, o NVDA converte conteúdo textual em síntese de voz, permitindo a navegação por aplicativos, documentos e páginas web. Sua popularidade deve-se não apenas ao custo zero, mas também à sua eficiência e atualizações constantes, tornando-o uma ferramenta indispensável para testar a acessibilidade de softwares e sites.

## Checklist NVDA (ou leitores semelhantes)

<div class="chart-container" style="position: relative; height:250px; width:250px; margin: 20px auto;">
    <canvas class="accessibility-pie-chart"></canvas>
</div>

### Navegação
- [ ] Consigo navegar por todo o site usando apenas TAB<a id="TEC2" href="#RP2">[2] [A]</a>

- [ ] A ordem do foco é lógica e faz sentido<a id="TEC3" href="#RP3">[3] [A]</a>

- [ ] Consigo voltar com SHIFT+TAB quando necessário<a id="TEC2" href="#RP2">[2] [A]</a>

### Imagens
- [ ] Todas as imagens importantes são descritas pelo NVDA <a id="TEC1" href="#RP1">[1] [A]</a>

- [ ] Imagens decorativas não são lidas (ou não atrapalham) <a id="TEC1" href="#RP1">[1] [A]</a>

### Estrutura
- [ ] Os títulos (H1, H2, H3) são anunciados corretamente<a id="TEC4" href="#RP4">[4] [A]</a>

- [ ] Consigo pular entre seções usando os títulos <a id="TEC5" href="#RP5">[5] [A]</a>

- [ ] Listas são identificadas como "lista com X itens"<a id="TEC4" href="#RP4">[4] [A]</a>

### Links
- [ ] Todos os links têm texto claro e descritivo <a id="TEC6" href="#RP6">[6] [A]</a> <a id="TEC7" href="#RP7">[7] [AAA]</a>

- [ ] O NVDA anuncia que são "links" ao focar neles<a id="TEC8" href="#RP8">[8] [A]</a>

- [ ] Ao clicar no link, é anunciado que foi aberto outra página

### Formulários
- [ ] Cada campo tem seu label anunciado <a id="TEC4" href="#RP4">[4] [A]</a> <a id="TEC9" href="#RP9">[9] [A]</a>

- [ ] Campos obrigatórios são identificados <a id="TEC9" href="#RP9">[9] [A]</a>

- [ ] Mensagens de erro são lidas automaticamente <a id="TEC10" href="#RP10">[10] [A]</a> <a id="TEC11" href="#RP11">[11] [AA]</a>

### Conteúdo Dinâmico
- [ ] Mensagens que aparecem na tela são anunciadas<a id="TEC11" href="#RP11">[11] [AA]</a>

- [ ] Carregamentos e atualizações são comunicados<a id="TEC11" href="#RP11">[11] [AA]</a>

---

## Job Acess With Speech - JAWS
O JAWS (Job Access With Speech) é outro leitor de telas para Windows, considerado um dos mais completos e utilizados profissionalmente. Com recursos avançados de navegação e personalização, o JAWS é frequentemente empregado em ambientes corporativos e educacionais. Testar com JAWS é crucial para garantir compatibilidade com usuários que dependem de tecnologias assistivas robustas, especialmente em contextos onde a estabilidade e os recursos avançados são necessários.

## LightHouse
O Lighthouse, ferramenta de código aberto do Google, inclui auditorias de acessibilidade em seu conjunto de análises. Integrado ao Chrome DevTools, ele gera relatórios detalhados com pontuações e recomendações para melhorar a acessibilidade, desempenho e SEO de páginas web. Sua facilidade de uso e a integração direta com ferramentas conhecidas dos desenvolvedores o tornam uma opção popular para verificações rápidas e contínuas.

## Vlibras
O VLIBRAS é uma suíte de ferramentas brasileira, desenvolvida por meio de uma parceria entre o Ministério da Economia e a Universidade Federal da Paraíba (UFPB), com o objetivo de promover a inclusão digital de pessoas surdas ou com deficiência auditiva. Sua função principal é traduzir conteúdos em Português para a Língua Brasileira de Sinais (Libras), que é a primeira língua e possui uma estrutura linguística completamente diferente do português escrito. O VLIBRAS não é um simples tradutor de texto; ele utiliza um avatar 3D (o "animado") para realizar os sinais, tornando o conteúdo digital acessível de uma forma visual e compreensível para a comunidade surda. A ferramenta pode ser disponibilizada como um plugin em sites governamentais, de empresas ou de instituições educacionais, aparecendo geralmente como um ícone flutuante na tela. Ao clicar nele, o usuário pode digitar ou copiar um texto para ser traduzido em Libras em tempo real. A importância do VLIBRAS é monumental, pois ele quebra uma das principais barreiras de comunicação na internet para milhões de brasileiros, garantindo o cumprimento da Lei Brasileira de Inclusão (LBI) e democratizando o acesso à informação.

## Referências Bibliográficas
> <a id="RP1" href="#TEC1">1.</a> WCAG 2.2 Understanding Docs. SC 1.1.1 Non-text Content (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html). Acesso em: 03 Nov. 2025.

> <a id="RP2" href="#TEC2">2.</a> WCAG 2.2 Understanding Docs. SC 2.1.1 Keyboard (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html). Acesso em: 03 Nov. 2025.

><a id="RP3" href="#TEC3">3.</a> WCAG 2.2 Understanding Docs. SC 2.4.3 Focus Order (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html). Acesso em: 03 Nov. 2025.

><a id="RP4" href="#TEC4">4.</a> WCAG 2.2 Understanding Docs. SC 1.3.1 Info and Relationships (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html). Acesso em: 03 Nov. 2025.

><a id="RP5" href="#TEC5">5.</a> WCAG 2.2 Understanding Docs. SC 2.4.1 Bypass Blocks (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html). Acesso em: 03 Nov. 2025.

><a id="RP6" href="#TEC6">6.</a> WCAG 2.2 Understanding Docs. SC 2.4.4 Link Purpose (In Context) (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html). Acesso em: 03 Nov. 2025.

><a id="RP7" href="#TEC7">7.</a> WCAG 2.2 Understanding Docs. SC 2.4.9 Link Purpose (Link Only) (Level AAA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-link-only.html](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-link-only.html). Acesso em: 03 Nov. 2025.

><a id="RP8" href="#TEC8">8.</a> WCAG 2.2 Understanding Docs. SC 4.1.2 Name, Role, Value (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html). Acesso em: 03 Nov. 2025.

><a id="RP9" href="#TEC9">9.</a> WCAG 2.2 Understanding Docs. SC 3.3.2 Labels or Instructions (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html). Acesso em: 03 Nov. 2025.

><a id="RP10" href="#TEC10">10.</a> WCAG 2.2 Understanding Docs. SC 3.3.1 Error Identification (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html). Acesso em: 03 Nov. 2025.

><a id="RP11" href="#TEC11">11.</a> WCAG 2.2 Understanding Docs. SC 4.1.3 Status Messages (Level AA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html). Acesso em: 03 Nov. 2025.

## Bibliografia
> DINIZ, V.; FERRAZ, R.; NASCIMENTO, C. M.; CREDIDIO, R. Guia de Boas Práticas para Acessibilidade Digital. Programa de Cooperação entre Reino Unido e Brasil em Acesso Digital, 2023. Disponível em: [https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/acessibilidade-digital/guiaboaspraaticasparaacessibilidadedigital.pdf](https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/acessibilidade-digital/guiaboaspraaticasparaacessibilidadedigital.pdf). Acesso em: 03 Nov. 2025.