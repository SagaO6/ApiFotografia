const mysql = require("mysql2");

const conecta = mysql.createConnection({
    host: "10.23.47.20",
    user: "senac",
    password: "123",
    database: "dbFotografia"
});

conecta.connect((err) =>{
    if(err){
        console.log(`Erro ao conectar ao banco: ${err}`)
    }
    console.log('Conectado ao banco!');
})

module.exports = conecta;