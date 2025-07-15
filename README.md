# 🔬 Olhar Sob o Microscópio

### Uma jornada imersiva ao mundo invisível, revelando a beleza e a complexidade que se escondem sob as lentes.

-----

## 💡 Sobre o Projeto

O **Olhar Sob o Microscópio** é uma exposição de arte e ciência bianual, que busca apresentar imagens fascinantes do universo microscópico. Cada edição explora uma nova temática, combinando arte visual, interatividade e educação para criar uma experiência única e memorável.

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
| **RF GERAIS** | O site deve carregar corretamente em navegadores modernos. | ✅ |
| | O usuário deve conseguir navegar pelas seções através de rolagem contínua. | ✅ |
| | Todas as interações devem ser acessíveis por teclado e mouse. | ✅ |
| **HOME INICIAL** | Exibir informações principais da exposição. | ✅ |
| | Oferecer opção de acessar exposições de anos anteriores. | ✅ |
| | Oferecer opção de acessar as demais seções do site de maneira rápida. | ✅ |
| | Oferecer um scroll rápido e perceptível para as próximas seções. | ✅ |
| **EXPOSIÇÕES ANTERIORES** | Exibir uma lista com os anos disponíveis. | ✅ |
| | Permitir ao usuário navegar para a exposição de um ano específico. | ✅ |
| **TEMA DO ANO** | Exibir seção com rolagem diagonal com texto e imagens sobre o tema. | ✅ |
| | Permitir interação fluída com a pré-visualização das imagens. | ✅ |
| **MAPA INTERATIVO** | Mostrar mapa-múndi com destaques por continente. | ✅ |
| | Abrir pop-up com dados de prevalência ao clicar em um continente. | ✅ |
| | Exibir mapa apenas para o ano de 2025. | ✅ |
| **GALERIA INTERATIVA** | Exibir imagens em grade ou formato atrativo. | ✅ |
| | Incluir ícones flutuantes para ouvir música, ver infos da imagem/autor e dar zoom. | ✅ |
| | Abrir todas as informações em pop-ups estilizados e animados. | ✅ |
| **SEÇÃO "FAÇA PARTE"** | Exibir chamada para colaboração com botões para visitantes e colaboradores. | ✅ |
| | Validar todos os campos obrigatórios dos formulários. | ✅ |
| | Enviar respostas para um e-mail pré-definido. | ✅ |
| | Mostrar mensagem de sucesso após envio dos formulários. | ✅ |
| **CURIOSIDADES** | Exibir seções com conteúdo interativo sobre o microscópio. | ⏳ |
| | Mostrar curiosidades com ícones e textos interativos. | ⏳ |
| | Cada curiosidade deve abrir em pop-up ou card animado. | ⏳ |
| | Exibir área interativa sobre a história dos microscópios. | ⏳ |
| **CRÉDITOS** | Exibir créditos em animação contínua (estilo jornal). | ⏳ |
| **FOOTER** | Exibir informações institucionais, links e redes sociais. | ✅ |
| **ÁREA ADMINISTRATIVA** | Acesso restrito para administradores com login e senha. | ✅ |
| | Painel para adicionar, editar e excluir exposições. | ✅ |
| | Validação de campos obrigatórios no painel de admin. | ✅ |
| | Armazenamento persistente dos dados. | ✅ |

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
      <td><img src="https://cdn-icons-png.flaticon.com/512/9187/9187532.png" alt="Maria Vitória" width="100" /></td>
      <td><strong>Maria Vitória</strong></td>
      <td>Líder da Equipe</td>
    </tr>
    <tr>
      <td><img src="https://cdn-icons-png.flaticon.com/512/9187/9187532.png" alt="Vinícius Vasconcelos" width="100" /></td>
      <td><strong>Vinícius Vasconcelos</strong></td>
      <td>Dev Fullstack</td>
    </tr>
    <tr>
      <td><img src="https://cdn-icons-png.flaticon.com/512/9187/9187532.png" alt="Lucas Mineiro" width="100" /></td>
      <td><strong>Lucas Mineiro</strong></td>
      <td>Dev Frontend</td>
    </tr>
    <tr>
      <td><img src="https://cdn-icons-png.flaticon.com/512/9187/9187532.png" alt="Tainara Nascimento" width="100" /></td>
      <td><strong>Tainara Nascimento</strong></td>
      <td>UX Designer & Dev Frontend</td>
    </tr>
    <tr>
      <td><img src="https://cdn-icons-png.flaticon.com/512/9187/9187532.png" alt="Eduarda Castro" width="100" /></td>
      <td><strong>Eduarda Castro</strong></td>
      <td>Designer UI</td>
    </tr>
    <tr>
      <td><img src="https://cdn-icons-png.flaticon.com/512/9187/9187532.png" alt="Isabele Meireles" width="100" /></td>
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
