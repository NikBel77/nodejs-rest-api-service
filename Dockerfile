FROM node:14-alpine3.13
WORKDIR /usr/app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "start"]