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

    const {nomeUsuario, emailUsuario, senhaUsuario} = req.body;

    const query = `insert into usuarios (nomeUsuario, emailUsuario, senhaUsuario) values (?, ?, MD5(?));`

    dbConecta.query(query, [nomeUsuario, emailUsuario, senhaUsuario], (err, result) => {
        if (err) throw err;
        res.json(result);
    })

})

router.post('/cadastrofotografo', (req, res) => {
    const { nomeUsuario, emailUsuario, senhaUsuario,
         telefone, cep, estado, cidade, endereco,
          bairro, numero, complemento, especialidade,
           disponibilidade, whatsapp, instagram, twitter } = req.body;

    const query = `CALL cadastrarFotografo('${nomeUsuario}', '${emailUsuario}', '${senhaUsuario}', '
    ${telefone}', '${cep}', '${estado}', '${cidade}', '${endereco}', '${bairro}', '${numero}', '
    ${complemento}', '${especialidade}', '${disponibilidade}', '${whatsapp}', '${instagram}', '${twitter}')`;

    dbConecta.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
    })
})

/*CREATE PROCEDURE cadastrarFotografo(
    IN p_nomeUsuario VARCHAR(50),
    IN p_emailUsuario VARCHAR(50),
    IN p_senhaUsuario VARCHAR(255),
    IN p_telefone VARCHAR(20),
    IN p_cep VARCHAR(9),
    IN p_estado VARCHAR(2),
    IN p_cidade VARCHAR(40),
    IN p_endereco VARCHAR(255),
    IN p_bairro VARCHAR(40),
    IN p_numero VARCHAR(10),
    IN p_complemento VARCHAR(255),
    IN p_especialidade VARCHAR(255),
    IN p_disponibilidade ENUM('Manhã','Tarde', 'Noite', 'Todos'),
    IN p_whatsapp VARCHAR(255),
    IN p_instagram VARCHAR(255),
    IN p_twitter VARCHAR(255)
)
BEGIN
    DECLARE v_idUsuario INT;
    DECLARE v_idEndereco INT;
    DECLARE v_idProfissional INT;

    -- Inserir na tabela usuarios
    INSERT INTO usuarios(nomeUsuario, emailUsuario, senhaUsuario)
    VALUES(p_nomeUsuario, p_emailUsuario, p_senhaUsuario);

    -- Obter o ID do usuário inserido
    SET v_idUsuario = LAST_INSERT_ID();

    -- Inserir na tabela endereco
    INSERT INTO endereco(cep, estado, cidade, endereco, bairro, numero, complemento)
    VALUES(p_cep, p_estado, p_cidade, p_endereco, p_bairro, p_numero, p_complemento);

    -- Obter o ID do endereço inserido
    SET v_idEndereco = LAST_INSERT_ID();

    -- Inserir na tabela profissionais
    INSERT INTO profissionais(especialidade, bio, whatsapp, instagram, twitter, telefone, disponibilidade, idEndereco, idUsuario)
    VALUES(p_especialidade, '', p_whatsapp, p_instagram, p_twitter, p_telefone, p_disponibilidade, v_idEndereco, v_idUsuario);

    -- Obter o ID do profissional inserido
    SET v_idProfissional = LAST_INSERT_ID();

    -- Retornar o ID do profissional
    SELECT v_idProfissional;
    
END //

DELIMITER ;

CALL cadastrarFotografo(
    'Thiago', -- nomeUsuario
    'Thiago@email.com', -- emailUsuario
    '123', -- senhaUsuario
    '(11) 99999-9999', -- telefone
    '0000-000', -- cep
    'SP', -- estado
    'São Paulo', -- cidade
    'Rua, 99', -- endereco
    'Bairro', -- bairro
    '99', -- numero
    'Casa', -- complemento
    'Casamento', -- especialidade
    'Todos', -- disponibilidade
    '(11) 11111-1111', -- whatsapp
    'Saga_heeh', -- instagram
    'Saguinha' -- twitter
);*/

module.exports = router;