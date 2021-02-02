///Routes 
const express = require('express');
const router = express.Router();
///importing users controller
const activitiesController = require('../controllers/activitiesController');
///Validator
const { check } = require('express-validator');
///Middleware
const auth = require('../middleware/auth');

///Create an activity
///api/activities
router.get('/',
    auth,
    activitiesController.activitiesList
);

router.post('/',
    auth,
    [
        check('name', `The field name is required`).not().isEmpty()
    ],
    activitiesController.createActivity
);

router.put('/:id',
    auth,
    [
        check('name', `The field name is required`).not().isEmpty()
    ],
    activitiesController.updateActivity
);

router.delete('/:id',
    auth,
    activitiesController.deleteActivity
);

module.exports = router;