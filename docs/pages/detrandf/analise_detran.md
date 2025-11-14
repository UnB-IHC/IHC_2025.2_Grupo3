### **Relatório de Análise de Acessibilidade Digital**

**Site Avaliado:** Departamento de Trânsito do Distrito Federal (DETRAN-DF)
**URL:** `https://www.detran.df.gov.br/`
**Data da Análise:** 14 de novembro de 2025

---

### **1. Introdução**

Este documento apresenta os resultados de uma análise de acessibilidade digital realizada na página inicial do site do DETRAN-DF. O objetivo foi avaliar o nível de conformidade do site com as práticas e diretrizes de acessibilidade (baseadas na WCAG), utilizando um checklist detalhado dividido em categorias de Design, Desenvolvimento Web, Geração de Conteúdo e Testes Manuais com Leitor de Telas.

### **2. Metodologia de Avaliação**

A análise foi conduzida em três fases para garantir uma cobertura completa, combinando auditorias técnicas com simulações de experiência do usuário:

1.  **Análise Automatizada:** Utilização das ferramentas de auditoria **Axe DevTools** e **WAVE (WebAIM)** para identificar falhas técnicas de conformidade no código-fonte, como problemas de contraste, atributos ARIA ausentes, falhas em formulários e texto alternativo.
2.  **Teste Manual de Navegação (Teclado):** Simulação de uso sem mouse, utilizando exclusivamente a tecla `Tab` para navegar entre os elementos interativos. Este teste é crucial para usuários com deficiências motoras.
3.  **Análise para Leitores de Tela (NVDA/Orca):** Verificação de como a estrutura da página, os formulários e o conteúdo são lidos e interpretados por tecnologias assistivas, focando na experiência de usuários com deficiência visual.

**Nota:** O checklist de **Gestão de Projetos** não foi aplicado, pois avalia processos internos de desenvolvimento (criação de personas, alocação de recursos) que não podem ser verificados por uma auditoria externa.

---

### **3. Sumário Executivo e Resultados Quantitativos**

A análise revela que o site do DETRAN-DF apresenta **falhas críticas de acessibilidade** que impedem o uso autônomo por pessoas com deficiência. A navegação por teclado é **inoperante**, e foram encontradas falhas severas em contraste de cores e na descrição de informações essenciais (imagens e formulários).

A auditoria da ferramenta WAVE (WebAIM) validou esta conclusão, atribuindo ao site uma pontuação geral de acessibilidade de apenas **3.5 de 10** e reportando um total de **23 Erros** (falhas diretas de WCAG), **28 Erros de Contraste** e **23 Alertas**.

Os resultados quantitativos da avaliação do nosso checklist são os seguintes:

| Categoria | Itens Verificados (Feitos) | Itens Pendentes (Faltam) | Total de Itens | Conformidade |
| :--- | :---: | :---: | :---: | :---: |
| **Checklist de Design** | 1 | 26 | 27 | 3.7% |
| **Checklist de Desenvolvimento Web** | 15 | 39 | 54 | 27.8% |
| **Checklist de Geração de Conteúdo** | 2 | 33 | 35 | 5.7% |
| **Checklist NVDA (Teste Manual)** | 0 | 16 | 16 | 0% |
| **Total** | **18** | **114** | **132** | **13.6%** |

---

### **4. Análise Detalhada das Falhas Críticas**

Os baixos índices de conformidade são resultado de falhas severas que comprometem a experiência do usuário.

#### **Falha Crítica 1: Inoperabilidade via Teclado (Checklist NVDA 0%)**

O teste manual de navegação via tecla `Tab` falhou completamente. Os usuários não conseguem navegar de forma lógica e previsível, e o foco do teclado frequentemente desaparece, tornando a navegação "às cegas" impossível.
* **Impacto:** Esta falha torna o site inutilizável para usuários com deficiências motoras que dependem do teclado e para usuários de leitores de tela, que usam o `Tab` para acessar formulários e links.
* **Itens Falhos:** `Navegação com TAB`, `Ordem do Foco`, `Foco Visível`, `Pausar Animações (Carrossel)`, `Acesso a Modais`.

#### **Falha Crítica 2: Contraste de Cores (Falha no Checklist de Design)**

A falha de design mais numerosa foi o contraste. A ferramenta WAVE confirmou isso, identificando **28 Erros de Contraste Muito Baixo**.
* **Impacto:** Textos, ícones e elementos de interface não possuem contraste suficiente com o fundo, tornando o conteúdo difícil ou impossível de ler para usuários com baixa visão ou daltonismo.
* **Itens Falhos:** `Contraste de texto normal`, `Contraste de texto grande`, `Contraste de ícones`.

#### **Falha Crítica 3: Falta de Informação Semântica (Desenvolvimento e Conteúdo)**

O site falha em descrever informações não-textuais, tornando-as invisíveis para leitores de tela.
* **Imagens:** A ferramenta WAVE detalhou a gravidade deste problema, reportando um total de **19 falhas de imagem**: 16 por texto alternativo ausente  e, de forma mais crítica, **3 em imagens que são links**. Isso significa que 3 links do site são impossíveis de identificar por um leitor de telas.
* **Formulários:** A análise do WAVE confirmou que a falha nos formulários é generalizada, encontrando **3 campos de formulário sem rótulo (Missing form label)**. Isso impede que o leitor de telas anuncie a finalidade desses campos.
* **Estrutura:** O WAVE encontrou um **título vazio (Empty heading)**, um erro estrutural que confunde a navegação por leitor de telas, que ao pular de título em título, encontra um "título" que não contém informação.

### **5. Conclusão e Recomendações Prioritárias**

O site do DETRAN-DF, em seu estado atual, não atende aos critérios mínimos de acessibilidade digital. As falhas encontradas não são apenas técnicas, mas criam barreiras reais que impedem o acesso a serviços públicos por cidadãos com deficiência.

Recomenda-se um plano de correção imediato, focado nas seguintes prioridades:

1.  **Navegação por Teclado (Prioridade Máxima):** Corrigir a funcionalidade da tecla `Tab`, garantir uma ordem de foco lógica e implementar um indicador de foco visível. Sem isso, o site permanece inoperante.
2.  **Contraste de Cores:** Revisar a paleta de cores do site para garantir que todos os textos e elementos de interface atendam aos mínimos de contraste.
3.  **Semântica Básica:**
    * Implementar texto alternativo descritivo em todas as 19 imagens falhas.
    * Associar corretamente as tags `<label>` aos 3 campos de formulário.
    * Remover o título vazio.
