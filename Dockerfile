FROM node:20-alpine

WORKDIR /srv/www/html

COPY package*.json ./

RUN npm install -g @angular/cli

RUN npm install -g pnpm@latest-10

RUN pnpm i

COPY . .

RUN chown -R 1000:1000 /srv/www/html

USER 1000

CMD ["ng", "serve", "--host", "0.0.0.0"]