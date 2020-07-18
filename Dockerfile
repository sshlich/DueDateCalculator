FROM node:12
WORKDIR /Users/ivzholner/WebstormProjects/DueDateCalculator/
COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 8080
CMD [ "node", "src/index.js" ]

