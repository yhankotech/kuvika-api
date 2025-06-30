# **Kuvika API**

> **Descrição**: Aplicação Backend desenvolvido com ExpressJs, que utiliza tecnologias modernas para criar uma aplicação ágil, robusta e escalável.

---

## **Tecnologias Utilizadas**

Este projeto foi construído com as seguintes tecnologias:

- **TypeScript**: Superset do JavaScript com suporte a tipagem estática.
- **Node.js**: Ambiente de execução para JavaScript no lado do servidor.
- **ExpressJs**: Framework para construir aplicações backend escaláveis, eficientes e modernas com Node.js, utilizando TypeScript por padrão.
- **Swagger**: Biblioteca para documentação da API.
- **PrismaORM**: ORM para TypeScript e JavaScript (Node.js) que permite trabalhar com bancos de dados como se estivesse manipulando objetos TypeScript.
- **Zod**: Biblioteca de validação e transformação de dados em JavaScript e TypeScript.

---

## **Como Utilizar**

Siga os passos abaixo para executar o projeto em sua máquina local:

### **1. Clone o Repositório**

No terminal, execute:
```bash
git clone https://github.com/Yhanko/kuvica-api.git
cd kuvica-api
```

### **2. Instale as Dependências**

Certifique-se de ter o Node.js e o Nest instalado. Então, execute:
```bash
npm install
```

### **3. Inicie o Servidor de Desenvolvimento**

Para rodar a aplicação no modo de desenvolvimento, execute:
```bash
npm run server
```
🗂️ Exemplo de estrutura de pastas
src/
│
├── domain/                  # Regra de negócio pura (núcleo do sistema)
│   ├── entities/            # Entidades da aplicação
│   ├── repositories/        # Interfaces dos repositórios (contratos)
│   └── dtos/                # Tipos e classes com regras dos casos de uso
│
├── application/             # Casos de uso (interação com as entidades)
│   └── services/            # Serviços específicos da aplicação
│
├── infrastructure/          # Implementações externas (DB, APIs, etc)
│   ├── database/
│   │   └── prisma/          # Exemplo: implementação com Prisma
│   └── providers/           # Email, fila, storage, etc
│
├── interfaces/              # Adapters de entrada/saída
│   ├── controllers/         # HTTP Controllers, GraphQL resolvers, etc
│   ├── routes/              # Rotas da aplicação
│   └── dtos/                # Data Transfer Objects
│
├── config/                  # Configurações (env, logger, middlewares)
│
├── shared/                  # Utilitários, helpers e tipos globais
├── server/                  # O servidor que roda aplicação
│
└── main.ts                  # Ponto de entrada da aplicação