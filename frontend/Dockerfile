FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json* /app/
RUN npm install
COPY . /app/
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]
