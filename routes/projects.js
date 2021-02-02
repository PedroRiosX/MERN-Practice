///Routes to create users
const express = require('express');
const router = express.Router();
///importing users controller
const projectsController = require('../controllers/proyectsController');
///Validator
const { check } = require('express-validator');
///Middleware
const auth = require('../middleware/auth');

///Create an project
///api/projects
router.post('/',
    auth,
    [
        check('name', `The field name is required`).not().isEmpty()
    ],
    projectsController.createProject
);

router.get('/',
    auth,
    projectsController.projectsList
);

router.put('/:id',
    auth,
    [
        check('name', `The field name is required`).not().isEmpty()
    ],
    projectsController.updateProject
);

router.delete('/:id',
    auth,
    projectsController.deleteProject
);

module.exports = router;