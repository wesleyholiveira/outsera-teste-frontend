# Outsera Frontend Challenge

## Sobre o Projeto

Este projeto foi desenvolvido utilizando React, TypeScript e uma arquitetura baseada em features, priorizando organização, escalabilidade, testabilidade e experiência de desenvolvimento.

Além da implementação dos requisitos solicitados, algumas decisões arquiteturais foram tomadas com o objetivo de reduzir complexidade, acelerar a entrega e aumentar a confiabilidade da aplicação.

---

# Tecnologias Utilizadas

## React + TypeScript

O React foi utilizado para construção da interface e o TypeScript para fornecer tipagem estática, reduzindo erros em tempo de desenvolvimento e facilitando futuras manutenções e refatorações.
---

## Vite

O projeto utiliza o Vite como ferramenta de desenvolvimento, build e bundling.

A escolha foi motivada principalmente pela excelente performance e experiência de desenvolvimento oferecidas pela ferramenta.

Principais benefícios:

- Inicialização extremamente rápida do ambiente de desenvolvimento;
- Hot Module Replacement (HMR) praticamente instantâneo;
- Build otimizado para produção;
- Utilização do Rolldown como bundler moderno e de alta performance;
- Excelente integração com TypeScript;
- Ecossistema robusto de plugins;
- Configuração simples e de fácil manutenção.

Atualmente o Vite é uma das ferramentas mais rápidas e produtivas do ecossistema frontend.

---

## Material UI

O Material UI foi escolhido para acelerar o desenvolvimento da interface sem abrir mão de qualidade, acessibilidade e responsividade.

A biblioteca adota uma abordagem component-first, extremamente integrada ao React, permitindo focar mais nas regras de negócio do que na implementação de componentes básicos de interface.

Principais vantagens:

- Componentes prontos e amplamente testados;
- Excelente integração com React;
- Sistema de temas robusto;
- Recursos de responsividade nativos;
- Boa acessibilidade por padrão;
- Alta produtividade no desenvolvimento.

A adoção do Material UI permitiu reduzir significativamente o tempo de implementação da interface mantendo uma boa experiência para o usuário.

---

## TanStack Query

O TanStack Query foi adotado como solução para gerenciamento de estado remoto e consumo de APIs.

Sua utilização reduz significativamente a quantidade de código necessária para lidar com requisições HTTP e estados assíncronos.

Benefícios:

- Cache automático de requisições;
- Deduplicação de chamadas para o mesmo endpoint;
- Controle de estados de loading e erro;
- Atualização automática de dados;
- Menor quantidade de código boilerplate;
- Melhor experiência para o usuário.

Além de simplificar a implementação, também evita múltiplas requisições desnecessárias para os mesmos recursos.

---

## Lodash

O Lodash foi utilizado para implementação do debounce dos filtros de busca.

Embora seja possível implementar debounce utilizando apenas `setTimeout`, a implementação fornecida pelo Lodash já contempla diversos cenários e edge cases que normalmente exigiriam código adicional.

Entre eles:

- Cancelamento de execuções pendentes;
- Controle de execução imediata (`leading`);
- Controle de execução ao final (`trailing`);
- Melhor previsibilidade de comportamento;
- Implementação amplamente utilizada e validada pela comunidade.

A adoção da biblioteca reduz riscos e evita a necessidade de manter implementações customizadas para um problema já resolvido.

---

# Qualidade de Código

## ESLint

O ESLint é utilizado para validação estática do código.

Além da padronização de estilo, ele ajuda a identificar problemas comuns durante o desenvolvimento.

Exemplos:

- Dependências incorretas em Hooks;
- Variáveis não utilizadas;
- Possíveis bugs;
- Más práticas em React;
- Problemas de tipagem.

---

## Prettier

O Prettier é responsável pela formatação automática do código.

Isso garante:

- Consistência visual em todo o projeto;
- Melhor legibilidade;
- Menor tempo gasto com discussões de formatação durante revisões de código.

---

## Husky

O Husky foi configurado para executar validações antes da realização de commits.

Antes que um commit seja concluído, são executadas verificações automáticas como:

- Lint;
- Testes automatizados.

Isso ajuda a garantir que apenas alterações válidas e verificadas sejam enviadas ao repositório.

---

# Docker

Foi adicionado suporte ao Docker para simplificar a execução da aplicação em ambientes de homologação e produção.

Com isso não é necessário instalar manualmente toda a cadeia de ferramentas do ecossistema JavaScript para executar o projeto.

Benefícios:

- Ambientes reproduzíveis;
- Menor esforço de configuração;
- Facilidade de deploy;
- Maior consistência entre ambientes.

---

# Estrutura do Projeto

O projeto segue uma arquitetura baseada em features.

```text
src/
├── assets/
├── components/
├── features/
│   ├── dashboard/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   └── movies/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── types/
├── pages/
├── services/
└── test/
```

## assets

Arquivos estáticos utilizados pela aplicação.

---

## components

Componentes compartilhados e reutilizáveis entre diferentes partes da aplicação.

---

## features

Contém os módulos de negócio da aplicação.

Cada feature concentra sua própria implementação:

- Components;
- Hooks;
- Services;
- Types;
- Testes.

Essa abordagem reduz acoplamento e facilita a evolução da aplicação conforme novas funcionalidades são adicionadas.

---

## pages

Componentes de página responsáveis por compor e organizar as features exibidas ao usuário.

---

## services

Serviços compartilhados da aplicação.

Atualmente contém abstrações comuns utilizadas para comunicação com APIs.

---

## test

Configurações e utilitários compartilhados pelos testes automatizados.

---

# Estratégia de Consumo da API

A aplicação utiliza uma camada de Services combinada com Hooks construídos sobre o TanStack Query.

Essa separação oferece alguns benefícios importantes:

- Melhor reutilização de código;
- Menor acoplamento entre UI e infraestrutura;
- Facilidade para testes;
- Maior organização da lógica de negócio.

---

## Otimização da Paginação

O endpoint de filmes suporta paginação.

Embora a tabela exiba apenas **15 registros por página**, a aplicação realiza requisições buscando **75 registros por vez**.

A motivação dessa decisão foi reduzir a quantidade de chamadas realizadas para a API.

Estratégia adotada:

```text
75 registros retornados pela API
↓
5 páginas de 15 registros no DataGrid
```

Benefícios:

- Menor quantidade de requisições HTTP;
- Navegação mais rápida entre páginas;
- Menor latência percebida pelo usuário;
- Redução de carga sobre o backend.

Foi considerado um trade-off aceitável entre utilização de memória e redução de overhead de rede.

---

## Testes

O projeto utiliza Vitest e React Testing Library, ferramentas com propósitos complementares.

O Vitest é responsável por executar a suíte de testes, fornecer as APIs de teste, asserções, mocks e cobertura.

A React Testing Library é utilizada para testar componentes React a partir da perspectiva do usuário, priorizando interações e elementos acessíveis em vez de detalhes internos de implementação.

Essa combinação permite testar componentes, páginas, hooks e serviços de forma rápida, confiável e próxima do comportamento real da aplicação.

---

# Decisões Arquiteturais

Algumas bibliotecas foram escolhidas propositalmente para reduzir o tempo de implementação sem comprometer qualidade e manutenibilidade.

Em vez de desenvolver soluções customizadas para problemas já amplamente resolvidos pelo mercado, foram adotadas ferramentas maduras e consolidadas:

- Material UI para construção da interface;
- TanStack Query para gerenciamento de estado remoto;
- Lodash para debounce;
- Vite para build e desenvolvimento;
- ESLint e Prettier para qualidade e padronização de código.

Essa abordagem permite concentrar o esforço de desenvolvimento nas regras de negócio da aplicação em vez da manutenção de soluções genéricas já disponíveis no ecossistema.

---

# Executando o Projeto

## Instalar Dependências

```bash
npm install
```

## Ambiente de Desenvolvimento

```bash
npm run dev
```

## Build de Produção

```bash
npm run build
```

## Executar Testes

```bash
npm run test
```

## Executar Lint

```bash
npm run lint
```

## Formatar Código

```bash
npm run format
```

## Executar com Docker

```bash
docker compose up --build
```

# Melhorias Futuras

- Evoluir a estratégia de tema da aplicação, reduzindo valores hardcoded de cores, espaçamentos e tamanhos diretamente nos componentes. A ideia seria centralizar esses valores no tema do Material UI e/ou em CSS Custom Properties, tornando o design mais consistente, reutilizável e fácil de alterar.

- Adicionar testes end-to-end com Playwright ou Cypress para validar os principais fluxos da aplicação em ambiente próximo ao real.

- Melhorar o tratamento visual de erros, exibindo mensagens mais específicas de acordo com o tipo de falha da API.

- Adicionar suporte a variáveis de ambiente para configurar a URL base da API por ambiente, como desenvolvimento, homologação e produção.

- Adicionar camada de normalização/validação das respostas da API com bibliotecas como Zod, garantindo maior segurança em runtime.

- Criar uma pipeline de CI/CD para executar lint, testes e build automaticamente a cada pull request.

- Melhorar a experiência mobile em telas menores, revisando espaçamentos, tabelas e navegação.

- Evoluir a estrutura de rotas para um módulo dedicado, permitindo lazy loading por página/feature com `React.lazy` e `Suspense`. Essa abordagem ajudaria a reduzir o bundle inicial e manter a navegação mais escalável conforme novas páginas forem adicionadas.