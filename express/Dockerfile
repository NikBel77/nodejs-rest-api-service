FROM node:14-alpine3.13
WORKDIR /usr/app
COPY package*.json .
COPY . .
RUN npm install
EXPOSE 4000
CMD ["npm", "run", "start"]