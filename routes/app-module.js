const express = require('express');
const router = express.Router();
const appModule = require('../services/app-module');

/* GET appModuleViewAccess listing. */
router.get('/appModuleViewAccess', async (req, res, next) => {
  try {
    res.json(await appModule.getViewAccess(req.query));
  } catch(err) {
    console.error(`Error while getting appModuleViewAccess `, err.message);
    next(err);
  }
});

/* POST appModuleViewAccess */
router.post('/appModuleViewAccess', async (req, res, next) => {
  try {
    res.json(await appModule.createViewAccess(req.body));
  } catch(err) {
    console.error(`Error while adding appModuleViewAccess `, err.message);
    next(err);
  }
});

/* PUT appModuleViewAccess */
router.patch('/appModuleViewAccess', async (req, res, next) => {
  try {
    res.json(await appModule.updateViewAccess(req.body));
  } catch(err) {
    console.error(`Error while adding appModuleViewAccess `, err.message);
    next(err);
  }
});

module.exports = router;