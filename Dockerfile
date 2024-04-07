FROM node:18.20.1
WORKDIR /app
ADD package*.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm","run","dev"]