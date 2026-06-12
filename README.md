# Outsera Frontend Challenge

## Sobre o Projeto

Aplicação desenvolvida em React e TypeScript para consumo da API disponibilizada pelo desafio, permitindo a visualização dos produtores com maior e menor intervalo entre premiações consecutivas, além da consulta paginada de filmes.

O projeto foi estruturado utilizando uma arquitetura baseada em features, priorizando organização, escalabilidade, testabilidade e facilidade de manutenção.

---

# Tecnologias Utilizadas

- React
- TypeScript
- Vite
- Material UI
- TanStack Query
- Vitest
- React Testing Library
- ESLint
- Prettier
- Docker

---

# Estrutura do Projeto

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

### Assets

Arquivos estáticos utilizados pela aplicação.

### Components

Componentes compartilhados e reutilizáveis.

### Features

Módulos funcionais da aplicação organizados por domínio de negócio.

Cada feature concentra seus próprios componentes, hooks, serviços, tipos e testes.

### Pages

Responsáveis por compor e organizar as features exibidas ao usuário.

### Services

Serviços compartilhados para comunicação com APIs e abstrações comuns.

### Test

Configurações e utilitários compartilhados pelos testes automatizados.

---

# Estratégia de Consumo da API

A aplicação utiliza uma camada de serviços combinada com hooks construídos sobre o TanStack Query.

Essa abordagem permite:

- Reutilização de código;
- Separação entre UI e acesso a dados;
- Cache automático de requisições;
- Menor acoplamento entre componentes e infraestrutura.

---

## Otimização da Paginação

Embora a tabela exiba apenas 15 registros por página, a aplicação realiza requisições buscando 75 registros por vez.

```text
75 registros retornados pela API
↓
5 páginas de 15 registros no DataGrid
```

Essa estratégia reduz chamadas ao backend, melhora a navegação entre páginas e diminui a latência percebida pelo usuário.

---

# Testes

O projeto utiliza Vitest e React Testing Library para validação dos principais fluxos da aplicação.

A cobertura contempla componentes, hooks, serviços e regras de comportamento relevantes para a interface.

---

# Decisões Arquiteturais

Algumas decisões foram tomadas para acelerar a implementação sem comprometer organização e manutenibilidade:

- Arquitetura baseada em features para reduzir acoplamento e facilitar evolução;
- Material UI para acelerar a construção da interface;
- TanStack Query para gerenciamento de estado remoto;
- Lodash para debounce dos filtros;
- Docker para simplificar execução em diferentes ambientes;
- Testes automatizados para validação dos fluxos principais.

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

---

# Melhorias Futuras

- Evoluir a estratégia de tema da aplicação centralizando cores, espaçamentos e tokens visuais;
- Adicionar testes end-to-end para validação dos principais fluxos da aplicação;
- Melhorar o tratamento visual e funcional de erros retornados pela API;
- Adicionar suporte a múltiplos ambientes através de variáveis de ambiente;
- Implementar validação e normalização de contratos da API utilizando bibliotecas como Zod;
- Criar pipeline de CI/CD para execução automática de lint, testes e build;
- Melhorar a experiência mobile em telas menores;
- Evoluir a estratégia de roteamento com lazy loading por página/feature para otimização do bundle inicial;
- Adicionar observabilidade da aplicação utilizando ferramentas de monitoramento e rastreamento de erros.