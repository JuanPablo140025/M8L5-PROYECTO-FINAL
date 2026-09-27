const express = require('express');
const router = express.Router();
const juegosController = require('../controllers/juegos.controller');
const { autenticarToken } = require('../middlewares/auth');

router.use(autenticarToken);

router.get('/', juegosController.listar);
router.post('/', juegosController.crear);
router.put('/:id', juegosController.actualizar);
router.delete('/:id', juegosController.eliminar);

module.exports = router;