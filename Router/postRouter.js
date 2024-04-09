const express = require('express');
const router = express.Router();
const postController = require('../Controllers/postsController');
const cadastroController = require('../Controllers/cadastroController');


router.use('/listaensaios', postController);

router.use('/cadastro', cadastroController);



module.exports = router;