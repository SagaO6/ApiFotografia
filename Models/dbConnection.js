const mysql = require("mysql2");

const conecta = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "dbfotografia"
});

conecta.connect((err) =>{
    if(err){
        console.log(`Erro ao conectar ao banco: ${err}`)
    }
    console.log('Conectado ao banco!');
})

module.exports = conecta;