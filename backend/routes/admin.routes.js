const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { autenticarToken, esAdmin } = require('../middlewares/auth');

router.get('/estadisticas', autenticarToken, esAdmin, adminController.obtenerEstadisticas);

module.exports = router;