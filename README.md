# Tarefa API - Gerenciador de Tarefas

Esta aplicação foi desenvolvida como parte da trilha Fullstack da Rocketseat e tem como objetivo ser um gerenciador de tarefas com controle de autenticação e autorização. O projeto foi desenvolvido utilizando tecnologias modernas como Express.js, PostgreSQL, Prisma, Jest, Docker, Zod e JWT.

## 🚀 Tecnologias

- **Express.js**: Framework minimalista para criação de APIs RESTful em Node.js.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenamento.
- **Prisma**: ORM (Object-Relational Mapping) que facilita a interação com o banco de dados.
- **Jest**: Framework para testes automatizados.
- **Docker**: Contêineres para garantir que a aplicação seja executada de forma consistente em qualquer ambiente.
- **Zod**: Biblioteca para validação e esquemas de dados.
- **JWT (JSON Web Token)**: Sistema de autenticação utilizado para verificar a identidade do usuário.

## ⚙️ Funcionalidades

### 1. **Autenticação e Autorização**

- **Criar Conta e Iniciar Sessão**: O usuário pode criar uma conta e realizar login na plataforma.
- **JWT para Autenticação**: O JSON Web Token (JWT) é utilizado para garantir a autenticação segura.
- **Níveis de Acesso**:
    - **Administrador**: Pode gerenciar usuários, equipes e tarefas.
    - **Membro**: Pode gerenciar apenas suas tarefas atribuídas.

### 2. **Gerenciamento de Times** 👥

- **Criação e Edição de Times**: Apenas usuários com o papel de **Administrador** podem criar ou editar times.
- **Adição e Remoção de Membros**: Apenas o **Administrador** pode adicionar ou remover membros de um time.

### 3. **Gerenciamento de Tarefas** 📝

- **CRUD de Tarefas**: 
  - **Criar**: Adicionar novas tarefas.
  - **Ler**: Visualizar tarefas existentes.
  - **Atualizar**: Modificar o status ou prioridade de tarefas.
  - **Deletar**: Remover tarefas.
- **Status das Tarefas**: As tarefas podem ter um dos seguintes status:
    - **Pendente**
    - **Em progresso**
    - **Concluído**
- **Prioridade das Tarefas**: Atribua prioridade a cada tarefa:
    - **Alta**
    - **Média**
    - **Baixa**
- **Atribuição de Tarefas**: As tarefas podem ser atribuídas a membros específicos da equipe.

### 4. **Usuário Admin** 👑

- **Visualizar e Gerenciar**:
    - O **Administrador** pode visualizar e gerenciar todas as tarefas, usuários e times.
    - Capacidade de editar e excluir tarefas de qualquer membro.

### 5. **Usuário Membro** 💼

- **Visualizar Tarefas**: O **Membro** pode visualizar as tarefas do seu time.
- **Editar Apenas Suas Tarefas**: O **Membro** só pode modificar as tarefas que foram atribuídas a ele.

## 🔒 Segurança

A aplicação utiliza **JWT** para autenticação de usuários e **Zod** para validação de dados, garantindo que todos os dados de entrada estejam corretos e seguros antes de serem processados.

## 📈 Testes

A aplicação conta com **testes automatizados** escritos com o framework **Jest**, garantindo que todas as funcionalidades estejam funcionando conforme o esperado.

## 🛠️ Instalação e Execução

Para rodar a aplicação localmente, siga os seguintes passos:

### 1. Clonar o Repositório

```bash
https://github.com/alissonsveen/tasksAPI
cd tasksAPI
npm install
docker-compose up
npx prisma migrate dev
npm run dev

