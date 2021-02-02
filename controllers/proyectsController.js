const Project = require('../models/Project');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createProject = async ( req, res ) => {

    ///Check if we have errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try 
    {

        ///Create a new project
        const project = new Project(req.body);
        project.owner = req.user.id;
        await project.save();
        res.json(project);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Have been a bug, sorry');
    }
}

exports.projectsList = async (req, res) => {
    try 
    {
        const projects = await Project.find({owner:req.user.id}).sort({createdate:-1});
        res.json({projects});
    } catch (error) {
        console.log(error);
        res.status(500).send('Have been a bug, sorry');
    }
}

exports.updateProject = async (req,res) => {

    ///Check if we have errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {name} = req.body;
    const newProject = {};

    if (name) {
        newProject.name = name;
        newProject.updatedate = Date.now();
    }

    try 
    {
        
        let project = await Project.findById(req.params.id);

        if (!project) {
            res.status(404).json({ msg: `Project not found`});
        }

        if (project.owner.toString() !== req.user.id ) {
            return res.statu(401).json({ msg:`User not authorized` });
        }

        project = await Project.findOneAndUpdate({_id: req.params.id}, { $set: newProject } ,{ new: true });

        res.json({project});

    } catch (error) {
        console.log(error);
        res.status(500).send('Have been a bug, sorry');
    }
}

exports.deleteProject = async (req, res) => {
    try 
    {
        let project = await Project.findById(req.params.id);

        if (!project) {
            res.status(404).json(`Project not found`);
        }

        if (project.owner.toString() !== req.user.id ) {
            return res.statu(401).json({ msg:`User not authorized` });
        }

        await Project.findOneAndRemove({_id: req.params.id});
        res.json({ msg: `Project deleted successed` });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Have been a bug, sorry');
    }
}