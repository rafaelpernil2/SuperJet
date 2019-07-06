FROM node:12.6.0
WORKDIR /SuperJet-Client
RUN npm install -g @oracle/ojet-cli
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 8100
CMD ["ojet", "serve", "--server-port=8100"]
