# Recipebook Frontend


## Vite + React
<p>This project is developed with React Framework, and Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects.
This will simplifies the development workflow by offering speed, flexibility, and a rich ecosystem of plugins. </p>

- To install Vite and React `my-app` is the project's folder
```
npm create vite@latest my-app -- --template react
```

- To install for routing, when its not already installed
```
npm i react-router
```

- To install all dependencies
```
npm install
```

- To run the project
```
npm run dev
```

## Run with Docker

- Build the image for development

```
docker build -t recipebook-frontend .
```

- Run the image into container, put `--rm` to automatically delete the container when stopped

```
docker run -p 5173:5173 recipebook-frontend
```

- If it doesn't display, setup the network to host
```
docker run --rm --network=host -p 5173:5173 recipebook-frontend
```

### Build a production docker container
- Build the image for production, from seperate `Dockerfile.prod`
- This multi-stage config contains:
    - Stage 1: The Vite + React source code will be build via `npm run build`
    - Stage 2: The build source will be copy to nginx folder `/usr/share/nginx/html`, and the custom nginx config is also copied to `/etc/nginx/conf.d/default.conf`
```
docker build -t recipebook-frontend -f Dockerfile.prod .
```
- Start a container, in this container the default port is `80` from nginx
```
docker run --rm -p 5173:80 recipebook-frontend
```
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
