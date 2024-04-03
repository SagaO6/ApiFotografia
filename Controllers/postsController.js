const express = require('express');
const dbConecta = require('../Models/dbConnection');
const router = express.Router();

router.get('/', (req, res) => {
    dbConecta.query('SELECT * FROM post', (err, result) => {
        if(err) throw err;
        res.json(result);
    })
})

module.exports = router;