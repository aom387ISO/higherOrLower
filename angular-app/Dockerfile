# Stage 1: Build frontend
FROM node:18.19.0-alpine3.19 as build-stage
WORKDIR /app
COPY ./package*.json ./
RUN echo "Archivos después de copiar package.json:" && ls /app
RUN npm install
COPY . .
RUN echo "Archivos después de copiar todo el contexto:" && ls /app
RUN npm run build -- --output-path=/app/dist/angular-app --output-hashing=all

# Stage 2: Serve it using Nginx
FROM nginx:stable-alpine
COPY --from=build-stage /app/dist/angular-app/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf