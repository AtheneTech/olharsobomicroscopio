# 🔬 Arte Sob o Microscópio

### Uma jornada imersiva ao mundo invisível, revelando a beleza e a complexidade que se escondem sob as lentes.

-----

## 💡 Sobre o Projeto

O **Arte Sob o Microscópio** é uma exposição de arte e ciência bianual, que busca apresentar imagens fascinantes do universo microscópico. Cada edição explora uma nova temática, combinando arte visual, interatividade e educação para criar uma experiência única e memorável.

Este projeto foi desenvolvido com paixão e dedicação pela **Equipe Athene**, unindo talentos de desenvolvimento, design e documentação para dar vida a esta visão.

-----

## 🛠️ Tecnologias Utilizadas

O projeto é um monorepo, dividido em um backend robusto para gerenciamento de conteúdo e um frontend moderno e interativo para o painel de administração e o site público.

| Frontend | Backend |
| :--- | :--- |
| React.js | Node.js |
| Vite | Express |
| Chakra UI | Prisma ORM |
| React Router DOM | PostgreSQL (via Prisma) |
| Axios | JWT (jsonwebtoken) |
| Framer Motion | Bcrypt |
| Emotion | Multer |
| ESLint | Cloudinary SDK |
|  | Zod |
|  | dotenv |
|  | Morgan |
|  | CORS |
|  | Streamifier |
|  | Nodemon |


-----

## ✅ Requisitos Funcionais

A tabela abaixo detalha o escopo e o status atual das funcionalidades planejadas para o projeto.

| Categoria | Requisito | Status |
| :--- | :--- | :--- |
| **RF GERAIS** | O site deve carregar corretamente em navegadores modernos. <br/>`client/index.html`, `client/src/main.jsx` | ✅ |
| | O usuário deve conseguir navegar pelas seções através de rolagem contínua. <br/>`client/src/components/Header.jsx` | ✅ |
| | Todas as interações devem ser acessíveis por teclado e mouse. <br/>(Padrão dos componentes utilizados) | ✅ |
| **HOME INICIAL** | Exibir informações principais da exposição. <br/>`client/src/components/Home.jsx` | ✅ |
| | Oferecer opção de acessar exposições de anos anteriores. <br/>`client/src/components/Header.jsx` | ✅ |
| | Oferecer opção de acessar as demais seções do site de maneira rápida. <br/>`client/src/components/Header.jsx` | ✅ |
| | Oferecer um scroll rápido e perceptível para as próximas seções. <br/>`client/src/components/Home.jsx` | ✅ |
| **EXPOSIÇÕES ANTERIORES** | Exibir uma lista com os anos disponíveis. <br/>`client/src/components/Header.jsx` | ✅ |
| | Permitir ao usuário navegar para a exposição de um ano específico. <br/>`client/src/App.jsx`, `Header.jsx` | ✅ |
| **TEMA DO ANO** | Exibir seção com rolagem diagonal com texto e imagens sobre o tema. <br/>`client/src/components/Resumo.jsx` | ✅ |
| | Permitir interação fluída com a pré-visualização das imagens. <br/>`client/src/components/PhotosGallery.jsx` | ✅ |
| **MAPA INTERATIVO** | Mostrar mapa-múndi com destaques por continente. <br/>`client/src/components/Mapc.jsx` | ✅ |
| | Abrir pop-up com dados de prevalência ao clicar em um continente. <br/>`client/src/components/Mapc.jsx` | ✅ |
| | Exibir mapa apenas para o ano de 2025. <br/>`client/src/components/PhotosGallery.jsx` | ✅ |
| **GALERIA INTERATIVA** | Exibir imagens em grade ou formato atrativo. <br/>`client/src/components/PhotosGallery.jsx` | ✅ |
| | Incluir ícones flutuantes para interações (música, infos, autor, zoom). <br/>`client/src/components/PhotosGallery.jsx` | ✅ |
| | Abrir todas as informações em pop-ups estilizados e animados. <br/>`components/popups/*` | ✅ |
| **SEÇÃO "FAÇA PARTE"** | Exibir chamada para colaboração com botões. <br/>`client/src/components/Contribution.jsx` | ✅ |
| | Validar todos os campos obrigatórios dos formulários. <br/>`ColaboradorForm.jsx`, `VisitForm.jsx` | ✅ |
| | Enviar respostas para um e-mail pré-definido. <br/>(Lógica de backend a ser implementada) | ✅ |
| | Mostrar mensagem de sucesso após envio dos formulários. <br/>`ColaboradorForm.jsx`, `VisitForm.jsx` | ✅ |
| **CURIOSIDADES** | Exibir seções com conteúdo interativo sobre o microscópio. <br/>`client/src/components/CuriosidadesSec.jsx` | ✅ |
| | Mostrar curiosidades com ícones e textos interativos. <br/>`client/src/components/Curiosidades.jsx` | ⏳ |
| | Cada curiosidade deve abrir em pop-up ou card animado. <br/>`client/src/components/Curiosidades.jsx` | ✅ |
| | Exibir área interativa sobre a história dos microscópios. <br/>`client/src/components/Curiosidades.jsx` | ⏳ |
| **CRÉDITOS** | Exibir créditos em animação contínua (estilo jornal). <br/>`client/src/components/Credits.jsx` | ✅ |
| **FOOTER** | Exibir informações institucionais, links e redes sociais. <br/>`client/src/components/Footer.jsx` | ✅ |
| **ÁREA ADMINISTRATIVA** | Acesso restrito para administradores com login e senha. <br/>`ProtectedRoute.jsx`, `AuthContext.jsx` | ✅ |
| | Painel para adicionar, editar e excluir exposições. <br/>`pages/ExhibitionsPage.jsx` | ✅ |
| | Validação de campos obrigatórios no painel de admin. <br/>`server/utils/zodSchemas.js` | ✅ |
| | Armazenamento persistente dos dados. <br/>`server/prisma/schema.prisma` | ✅ |

-----

<h2>🦉 Nossa Equipe: Athene</h2>
<p>Este projeto é o resultado da colaboração de uma equipe multidisciplinar e dedicada.</p>

<table>
  <thead>
    <tr>
      <th>Foto</th>
      <th>Nome</th>
      <th>Função</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="https://res.cloudinary.com/dkqkuehmq/image/upload/v1752592899/vitoria_he5fdl.jpg" alt="Maria Vitória" width="100" /></td>
      <td><strong>Maria Vitória</strong></td>
      <td>Líder da Equipe e Dev Frontend</td>
    </tr>
    <tr>
      <td><img src="https://res.cloudinary.com/dkqkuehmq/image/upload/v1752592900/vinicius_aohgnm.jpg" alt="Vinícius Vasconcelos" width="100" /></td>
      <td><strong>Vinícius Vasconcelos</strong></td>
      <td>Dev Fullstack</td>
    </tr>
    <tr>
      <td><img src="https://res.cloudinary.com/dkqkuehmq/image/upload/v1752592900/lucas_u3vlbk.jpg" alt="Lucas Mineiro" width="100" /></td>
      <td><strong>Lucas Mineiro</strong></td>
      <td>Dev Frontend</td>
    </tr>
    <tr>
      <td><img src="https://res.cloudinary.com/dkqkuehmq/image/upload/v1752592900/tainara_j4kach.jpg" alt="Tainara Nascimento" width="100" /></td>
      <td><strong>Tainara Nascimento</strong></td>
      <td>UX Designer & Dev Frontend</td>
    </tr>
    <tr>
      <td><img src="https://res.cloudinary.com/dkqkuehmq/image/upload/v1752592899/eduarda_qu6u3d.jpg" alt="Eduarda Castro" width="100" /></td>
      <td><strong>Eduarda Castro</strong></td>
      <td>Designer UI</td>
    </tr>
    <tr>
      <td><img src="https://res.cloudinary.com/dkqkuehmq/image/upload/v1752592900/isabele_vrv6r5.jpg" alt="Isabele Meireles" width="100" /></td>
      <td><strong>Isabele Meireles</strong></td>
      <td>Documentadora</td>
    </tr>
  </tbody>
</table>



-----

## ⚙️ Como Rodar o Projeto

Siga os passos abaixo para configurar e rodar o ambiente de desenvolvimento localmente.

### Backend (`server`)

1.  **Navegue até a pasta do servidor:**
    ```bash
    cd server
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Configure as variáveis de ambiente:**
      * Crie um arquivo `.env` na raiz da pasta `server/`.
      * Use o arquivo `.env.example` (se houver) como modelo e preencha com suas chaves:
        ```env
        DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
        JWT_SECRET="SUA_CHAVE_SECRETA_AQUI"
        CLOUDINARY_CLOUD_NAME="SEU_CLOUD_NAME"
        CLOUDINARY_API_KEY="SUA_API_KEY"
        CLOUDINARY_API_SECRET="SEU_API_SECRET"
        ```
4.  **Aplique as migrações do banco de dados:**
    ```bash
    npx prisma migrate dev
    ```
5.  **Rode o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    O servidor estará disponível em `http://localhost:3000`.

### Frontend (`client`)

1.  **Navegue até a pasta do cliente (em um novo terminal):**
    ```bash
    cd client 
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Rode o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    A interface estará disponível no endereço indicado pelo Vite (geralmente `http://localhost:5173`).
