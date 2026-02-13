# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```



## Development and Deployment

### 1. Local Development (with Hot Reload)
This project uses **Docker Compose** to provide a seamless development experience with Hot Module Replacement (HMR).

**To start development:**
```bash
docker-compose up dev
```
*   **URL**: `http://localhost`
*   **How it works**: Your local code is volume-mounted into the container. 
*   **HMR**: Changes you make in VS Code will reflect instantly in the browser thanks to the polling configuration in `vite.config.ts`.

---

### 2. Production Deployment (AWS ECR)
The project is configured to build a production-grade Nginx image and push it to **Amazon ECR** via GitHub Actions.

#### Prerequisites
1.  **AWS ECR Repository**: Create a private repository in your AWS Console (e.g., `my-admin-dashboard`).
2.  **GitHub Secrets**: Add the following secrets to your GitHub repository (**Settings > Secrets and variables > Actions**):
    *   `AWS_ACCESS_KEY_ID`: IAM user access key.
    *   `AWS_SECRET_ACCESS_KEY`: IAM user secret key.
    *   `AWS_REGION`: e.g., `us-east-1`.
    *   `ECR_REPOSITORY`: Your repository name (e.g., `my-admin-dashboard`).

#### The CI/CD Pipeline
Every time you push to the `main` branch:
1.  **Lint & Build**: GitHub Actions verifies your code and builds the production assets.
2.  **Docker Push**: A secure Nginx image is built and pushed to your **AWS ECR** repository with both `latest` and `SHA` tags.

---

### 3. Manual Production Test (Local)
To verify the production build locally using the Nginx configuration:
```bash
docker build -t my-admin-dashboard:prod .
docker run -p 8080:80 my-admin-dashboard:prod
```
Access at `http://localhost:8080`.
