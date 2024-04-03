//importando o express
const express = require('express');

//inicializando o express
const app = express();

const port = 3000;

const postRouter = require('./Router/postRouter')

app.use('/', postRouter);



//configuração da porta do servidor
app.listen(port, () => {

    console.log(`Servidor rodando na porta ${port}`)

})