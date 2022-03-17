FROM node:17-alpine as base
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .

FROM base as build
RUN npm run build

FROM base as development
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM nginx:stable as production
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist .
EXPOSE 80