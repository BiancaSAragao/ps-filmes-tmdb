# 🎬 PS Filmes TMDB

Aplicação web desenvolvida com **Next.js**, **TypeScript** e **Material UI** que consome a API do **The Movie Database (TMDB)** para exibir filmes populares, realizar buscas e visualizar detalhes completos de cada filme.

---

## 🚀 Funcionalidades

- 🔍 Busca de filmes por título
- 📄 Página de detalhes do filme
- ⚡ Skeleton loading com animação
- 🔔 Feedback visual com Snackbar (erros, busca vazia, erro de API)
- 📱 Layout totalmente responsivo (mobile first)
- 🧩 Componentes reutilizáveis
- 🎨 UI moderna com Material UI
- 🌐 Integração com API externa (TMDB)

---

## 🛠️ Tecnologias utilizadas

- Next.js
- React
- TypeScript
- Material UI (MUI)
- Axios
- TMDB API

---

## ⚙️ Como executar o projeto

### 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd ps-filmes-tmdb
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo .env.local baseado no .env.example:

```env
NEXT_PUBLIC_TMDB_API_KEY=coloque_sua_api_key_aqui
``` 

Você pode obter sua API Key em:
https://www.themoviedb.org/settings/api


### 4. Rodar o Projeto

```bash
npm run dev
```

Então acesse:
https://localhost:3000

## 🏗️ Build de produção

```bash
npm run build
npm start
```

## 📁 Estrutura do projeto

```text
src/
 ├─ components/
 ├─ pages/
 │   ├─ movie/[id].tsx
 │   └─ index.tsx
 ├─ services/
 ├─ styles/
 ├─ theme/
 └─ types/
```

## 📌 Observações

 - O projeto utiliza variáveis de ambiente para proteger a API Key.

 - O arquivo .env.local não deve ser versionado.

 - O layout foi desenvolvido com foco em responsividade e experiência do usuário.

## 👩‍💻 Autora

Desenvolvido por Bianca Aragão