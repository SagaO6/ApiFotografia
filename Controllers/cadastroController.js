const express = require('express');
const dbConecta = require('../Models/dbConnection');
const router = express.Router();

router.post('/login', (req, res) => {

    const {emailUsuario, senhaUsuario} = req.body

    const query = `select * from usuarios 
    where emailUsuario = ? 
    and senhaUsuario = MD5(?);`

    dbConecta.query(query, [emailUsuario, senhaUsuario], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ status: 'error', message: 'Ocorreu um erro no servidor.' });
            return;
        }

        if(result.length > 0) {
            res.json({ status: "Sucesso", MessageChannel: "Login efetuado com sucesso"});
        }

        else{
            res.json({status: "error", MessageChannel: "E-mail ou senha incorretos"});
        }

    })


})

router.post('/cadastrousuario', (req, res) => {

    const {nomeUsuario, emailUsuario, senhaUsuario, arrobaUsuario} = req.body;

    const query = `insert into usuarios (nomeUsuario, emailUsuario, senhaUsuario, arrobaUsuario) values (?, ?, MD5(?), ?);`

    dbConecta.query(query, [nomeUsuario, emailUsuario, senhaUsuario, arrobaUsuario], (err, result) => {
        if (err) throw err;
        res.json(result);
    })

})

router.post('/cadastrofotografo', (req, res) => {
    const { nomeUsuario, emailUsuario, senhaUsuario, arrobaUsuario,
         telefone, cep, estado, cidade, endereco,
          bairro, numero, complemento, especialidade,
           disponibilidade, whatsapp, instagram, twitter } = req.body;

    const query = `CALL cadastrarFotografo( '${arrobaUsuario}','${nomeUsuario}', '${emailUsuario}', '${senhaUsuario}','
    ${telefone}', '${cep}', '${estado}', '${cidade}', '${endereco}', '${bairro}', '${numero}', '
    ${complemento}', '${especialidade}', '${disponibilidade}', '${whatsapp}', '${instagram}', '${twitter}')`;

    dbConecta.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
    })
})

module.exports = router;