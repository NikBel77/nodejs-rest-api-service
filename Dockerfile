FROM node:14-alpine3.13
WORKDIR /usr/app
COPY package*.json .
COPY . .
RUN npm install\
	&& npm run build
CMD ["node", "./build/server.js"]
EXPOSE 4000