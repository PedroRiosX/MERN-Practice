const Activity = require('../models/Activity');
const Project = require('../models/Project');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.activitiesList = async (req, res) => {

    try 
    {
        const {project} = req.query;

        const projectSelected = await Project.findById(project);

        if (!projectSelected) {
            res.status(404).json({ msg: `Project not found`});
        }

        if (projectSelected.owner.toString() !== req.user.id ) {
            return res.statu(401).json({ msg:`User not authorized` });
        }

        const activities = await Activity.find({project: project}).sort({createdate:-1});
        res.json({activities});

    } catch (error) {
        console.log(error);
        res.status(500).send('Have been a bug, sorry');
    }
}

exports.createActivity = async (req, res) => {

    ///Check if we have errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {project} = req.body;

    try 
    {
        const projectSelected = await Project.findById(project);

        if (!projectSelected) {
            res.status(404).json({ msg: `Project not found`});
        }

        if (projectSelected.owner.toString() !== req.user.id ) {
            return res.statu(401).json({ msg:`User not authorized` });
        }

        const activity =new Activity(req.body);
        await activity.save();
        res.json({ msg: `Activity ${activity.name} has been added`});
    } catch (error) {
        console.log(error);
        res.status(500).send('Have been a bug, sorry');
    }
}

exports.updateActivity = async (req, res) => {
    try 
    {
        const {project, name, status} = req.body;

        const activityExist = await Activity.findById(req.params.id);

        if (!activityExist) {
            return res.statu(401).json({ msg:`Activity not found` });
        }

        const projectSelected = await Project.findById(project);

        if (projectSelected.owner.toString() !== req.user.id ) {
            return res.statu(401).json({ msg:`User not authorized` });
        }

        const newActivity = {};

  
        newActivity.name = name;
        newActivity.status = status;
        newActivity.updatedate = Date.now();
        

        const activity = await Activity.findOneAndUpdate({_id: req.params.id }, newActivity, {new: true});
        res.json({activity});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Have been a bug, sorry');
    }
}

exports.deleteActivity = async (req, res) =>{
    try 
    {
        const {project} = req.query;

        const activityExist = await Activity.findById(req.params.id);

        if (!activityExist) {
            return res.statu(401).json({ msg:`Activity not found` });
        }

        const projectSelected = await Project.findById(project);

        if (projectSelected.owner.toString() !== req.user.id ) {
            return res.statu(401).json({ msg:`User not authorized` });
        }

       const activity = await Activity.findOneAndRemove({_id: req.params.id});
       res.json({msg: `The activity ${activity.name} has been deleted`})
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Have been a bug, sorry');
    }
}