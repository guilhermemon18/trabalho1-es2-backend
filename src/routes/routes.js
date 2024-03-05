const express = require("express");

//rotas especificas (exemplos):

const testeRoutes = require("./testeRoutes");
//so para fazer o add
const server = express();

server.use("/teste", testeRoutes);

server.use("/", () => {
  console.log("ROTA DE TESTE");
});

module.exports = server;
