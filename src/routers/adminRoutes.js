const express = require('express');
const router  = express.Router();
const bcrypt = require('bcryptjs');
const Admin = require('../models/admins');

router.get('/', (req, res) => {
    res.send('Hello World!');
  });
  
router.post('/admins/register', async (req, res) => {
    try {
    console.log(req.body);
    const addingAdmin = new Admin(req.body);
    const token  = await addingAdmin.generateToken();
    const addedAdmin = await addingAdmin.save();
    res.status(201).send(addedAdmin);
    } catch (e) {
        res.status(400).send(e);
        console.log("the error was: " + e.message);
    }
})

router.post('/admins/login', async (req, res) => {
    try {
        const email = req.body.adminEmail;
        const password = req.body.adminPassword;
        
        console.log(req.body);
        const useremail = await Admin.findOne({adminEmail :  email});

        const isMatch = await bcrypt.compare(password, useremail.adminPassword)

        const token  = await useremail.generateToken();
        console.log("token: " + token);
        if(isMatch){
            res.status(200).send("Login Successful");
        }
        else{
            res.status(404).send("Login Failure");
        }
    } catch (e) {
        res.status(400).send("Invalid Login Credentials");
    }
})


router.get('/admins', async(req, res) => {
    try {
        const getAdmins =await Admin.find({}).sort("adminName");
        res.status(200).send(getAdmins);
        } catch (e) {
            res.status(500).send(e);
        }
});

router.get('/admins/:id', async(req, res) => {
    try {
        const _id  = req.params.id;
        const getAdmin =await Admin.findById(_id);
        res.status(200).send(getAdmin);
        } catch (e) {
            res.status(500).send(e);
        }
});

router.patch('/admins/update/:id', async(req, res) => {
    try {
        const _id  = req.params.id;
        const setAdmin = await Admin.findByIdAndUpdate(_id,req.body,{new:true});
        res.status(200).send(setAdmin);
        } catch (e) {
            res.status(400).send(e);
        }
});

router.delete('/admins/delete/:id', async(req, res) => {
    try {
        const _id  = req.params.id;
        const removedAdmin = await Admin.findByIdAndDelete(_id);
        res.status(200).send(removedAdmin);
        } catch (e) {
            res.status(400).send(e);
        }
});

module.exports = router;

