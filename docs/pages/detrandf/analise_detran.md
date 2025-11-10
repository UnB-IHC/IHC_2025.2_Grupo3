### **Relatório de Análise de Acessibilidade Digital**

**Site Avaliado:** Departamento de Trânsito do Distrito Federal (DETRAN-DF)

**URL:** `https://www.detran.df.gov.br/`

**Data da Análise:** 10 de novembro de 2025

---

### **1. Introdução**

Este documento apresenta os resultados de uma análise de acessibilidade digital realizada na página inicial do site do DETRAN-DF. O objetivo foi avaliar o nível de conformidade do site com as práticas e diretrizes de acessibilidade (baseadas na WCAG), utilizando um checklist detalhado dividido em categorias de Design, Desenvolvimento Web, Geração de Conteúdo e Testes Manuais com Leitor de Telas (NVDA).

### **2. Metodologia de Avaliação**

A análise foi conduzida em três fases para garantir uma cobertura completa, combinando auditorias técnicas com simulações de experiência do usuário:

1.  **Análise Estática e Automatizada:** Utilização da ferramenta de auditoria **Axe DevTools** para identificar falhas técnicas de conformidade no código-fonte, como problemas de contraste, atributos ARIA ausentes, falhas em formulários e `alt` text.
2.  **Teste Manual de Navegação (Teclado):** Simulação de uso sem mouse, utilizando exclusivamente a tecla `Tab` para navegar entre os elementos interativos. Este teste é crucial para usuários com deficiências motoras.
3.  **Análise para Leitores de Tela (NVDA/Orca):** Verificação de como a estrutura da página, os formulários e o conteúdo são lidos e interpretados por tecnologias assistivas, focando na experiência de usuários com deficiência visual.

**Nota:** O checklist de **Gestão de Projetos** não foi aplicado, pois avalia processos internos de desenvolvimento (criação de personas, alocação de recursos) que não podem ser verificados por uma auditoria externa.

---

### **3. Sumário Executivo e Resultados Quantitativos**

A análise revela que o site do DETRAN-DF apresenta **falhas críticas de acessibilidade** que impedem o uso autônomo por pessoas com deficiência. A navegação por teclado é **inoperante**, e foram encontradas falhas severas em contraste de cores e na descrição de informações essenciais (imagens e formulários).

Os resultados quantitativos da avaliação do checklist são os seguintes:

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

O teste manual de navegação via tecla `Tab` falhou completamente. Os usuários não conseguem navegar de forma lógica e previsível pelos elementos interativos da página.
* **Impacto:** Esta falha torna o site inutilizável para usuários com deficiências motoras que dependem do teclado e para usuários de leitores de tela, que usam o `Tab` para acessar formulários e links.
* **Itens Falhos:** `Navegação com TAB`, `Ordem do Foco`, `Foco Visível`, `Pausar Animações (Carrossel)`, `Acesso a Modais`.

#### **Falha Crítica 2: Contraste de Cores (Falha no Checklist de Design)**

A ferramenta de análise automática (Axe) detectou **23 falhas de contraste**.
* **Impacto:** Textos, ícones e elementos de interface não possuem contraste suficiente com o fundo, tornando o conteúdo difícil ou impossível de ler para usuários com baixa visão ou daltonismo.
* **Itens Falhos:** `Contraste de texto normal`, `Contraste de texto grande`, `Contraste de ícones`.

#### **Falha Crítica 3: Falta de Informação Semântica (Desenvolvimento e Conteúdo)**

O site falha em descrever informações não-textuais, tornando-as invisíveis para leitores de tela.
* **Imagens:** A análise automática reportou **7 imagens sem texto alternativo**. Os *banners* principais do carrossel (ex: "Habilitação Social") contêm texto, mas seus atributos `alt` são genéricos (ex: "imagem de banner"), escondendo a informação.
* **Formulários:** A ferramenta Axe reportou "ARIA input fields must have an accessible name". Isso foi confirmado na análise manual: o campo de busca principal do site não possui uma tag `<label>` associada, impedindo que o leitor de telas anuncie sua finalidade.
* **Links:** A ferramenta reportou **3 links com texto não discernível**, como "Saiba mais", que não oferecem contexto quando lidos isoladamente.

### **5. Conclusão e Recomendações Prioritárias**

O site do DETRAN-DF, em seu estado atual, não atende aos critérios mínimos de acessibilidade digital. As falhas encontradas não são apenas técnicas, mas criam barreiras reais que impedem o acesso a serviços públicos por cidadãos com deficiência.

Recomenda-se um plano de correção imediato, focado nas seguintes prioridades:

1.  **Navegação por Teclado (Prioridade Máxima):** Corrigir a funcionalidade da tecla `Tab`, garantir uma ordem de foco lógica e implementar um indicador de foco visível. Sem isso, o site permanece inoperante.
2.  **Contraste de Cores:** Revisar a paleta de cores do site para garantir que todos os textos e elementos de interface atendam aos mínimos de 4.5:1 (texto normal) e 3:1 (ícones).
3.  **Semântica Básica:**
    * Implementar texto alternativo descritivo em todas as imagens informativas.
    * Associar corretamente as tags `<label>` a todos os campos de formulário.
    * Revisar links ambíguos ("Saiba mais") para que sejam descritivos.