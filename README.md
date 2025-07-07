# Recipebook Frontend
This is based from a project from a school project `ReciBook` made from native php, and bootstrap as frontend framework

## Prerequisites
- Node.js v22.14.0+
- NPM 10.9.2
- Docker 20.3.1 (optional)

## Getting Started
- First, install all dependencies
```sh
npm install
```
- Run the development server
```sh
npm run dev
```
Open `http://localhost:5173/` with your browser

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

```sh
docker build -t recipebook-frontend -f Dockerfile.prod .
```

- Start a container, in this container the default port is `80` from nginx
```sh
docker run --rm -p 5173:80 recipebook-frontend
```