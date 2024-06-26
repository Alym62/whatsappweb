
# Chat Web

Esse é um projeto de um web sockets desenvolvido com NestJs utilizando as seguintes ferramentas:
- <a href="https://nestjs.com">***NestJs***</a>
- <a href="https://typeorm.io">***TypeORM***</a>
- <a href="https://www.docker.com">***Docker***</a>
- <a href="https://www.typescriptlang.org">***Typescript***</a>
- <a href="https://angular.dev">***Angular***</a>
- <a href="https://material.angular.io">***Angular Material***</a>
- <a href="https://socket.io">***Sockets.io***</a>
- <a href="https://www.postgresql.org">***PostgreSQL***</a>
- <a href="https://jwt.io">***JWT***</a>

Essa aplicação conta com uma autenticação com JWT para utilização segura de uma API REST e um Web Sockets para o lado do servidor, no lado do cliente o Angular e Angular Material, uma conexão com banco de dados PostgreSQL, documentação e para o ambiente de desenvolvimento foi usado o Docker.

![logo nestjs](https://nestjs.com/logo-small-gradient.76616405.svg)

## Como rodar a aplicação localmente

Primeiro de tudo é preciso fazer um clone do projeto com o comando abaixo:
```github
  git clone https://github.com/Alym62/whatsappweb
```

Logo após basta entrar no diretório do projeto e realizar o seguinte comando para rodar o banco de dados no docker. Esse comando vai subir o container e abrir a conexão com o PostgreSQL e o Pgadmin:
```docker
  docker-compose up
```

#### Backend

Para rodar o backend, basta colocar as variáveis de conexão no module principal da aplicação ***📂 ./src/app.module.ts*** lá você encontra a configuração global que vai ser compartilhada por toda aplicação:
```npm
  npm start
```

#### Frontend

Para rodar o frontend, é muito simples, basta rodar o comando abaixo para iniciar o projeto, faça o registro de 2 usuários e comece a utilizar o chat:
```ng
  ng serve -o
```
#### OBS: Se caso o comando ***ng serve -o*** não funcionar, basta implementar o comando ***npx*** no inicio que a aplicação vai rodar. Não se esqueça que é necessário depois de fazer o clone do projeto instalar as dependências.

## Stack utilizada

[![My Skills](https://skillicons.dev/icons?i=ts,angular,nest,postgres,docker&perline=3)](https://skillicons.dev)


