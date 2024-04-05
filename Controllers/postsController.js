const express = require('express');
const dbConecta = require('../Models/dbConnection');
const router = express.Router();

router.get('/maisavaliados', (res) => {

    const query = `SELECT avaliacao.idPost, SUM(avaliacao) AS soma_avaliacao, post.* 
FROM avaliacao inner join post on avaliacao.idPost = post.idPost 
GROUP BY avaliacao.idPost 
ORDER BY soma_avaliacao desc limit 6;`

    dbConecta.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
    })
})

router.get('/maisrecentes', (res) => {

    const query = `select * from post order by dataPost desc limit 8;`

    dbConecta.query(query, (err, result) => {

        if (err) throw err;
        res.json(result);

    })

})

router.get('/ensaiosperfil/:id', (req, res) => {

    const id = req.params.id;

    const query = `select * from post where idProfissional = ? order by dataPost desc;`

    dbConecta.query(query, [id], (err, result) => {

        if (err) throw err;
        res.json(result);

    })

})

router.get('/dadosperfil/:id', (req, res) => {

    const id = req.params.id;

    const query = `select usuarios.idUsuario as id, usuarios.*, profissionais.* ,case 
    when idProfissional is not null then true 
    else false
    end as ehProfissional
    from usuarios left join profissionais on usuarios.idUsuario = profissionais.idUsuario where  usuarios.idUsuario = ?;`

    dbConecta.query(query, [id], (err, result) => {

        if (err) throw err;
        res.json(result);

    })

})

router.get('/listaseguidores/:id', (req, res) => {

    const id = req.params.id

    const query = `WITH seguindo AS (
    SELECT 
        u1.nomeUsuario AS seguidor,
        u1.idUsuario AS idSeguidor,
        COUNT(u.idUsuario) AS seguindo
    FROM usuarios u1
    LEFT JOIN seguidores s 
    ON u1.idUsuario = s.idSeguidor 
    LEFT JOIN profissionais p 
    ON p.idProfissional = s.idSeguido
    LEFT JOIN usuarios u 
    ON p.idUsuario = u.idUsuario
    GROUP BY u1.idUsuario, u1.nomeUsuario
), 
seguidores AS (
    SELECT 
        u.idUsuario, 
        u.nomeUsuario, 
        COUNT(s.idSeguido) AS Seguidores
    FROM usuarios u
    LEFT JOIN profissionais p 
    ON p.idUsuario = u.idUsuario
    LEFT JOIN seguidores s 
    ON p.idProfissional = s.idSeguido
    GROUP BY u.idUsuario, u.nomeUsuario
)
SELECT 
idUsuario, 
s.seguidor AS nomeUsuario, 
s.seguindo, 
g.Seguidores
FROM seguindo s
INNER JOIN seguidores g ON g.idUsuario = s.idSeguidor
where idUsuario = ?;`

    dbConecta.query(query, [id], (err, result) => {

        if (err) throw err;
        res.json(result);

    })

})

module.exports = router;