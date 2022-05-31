const express = require('express');
const fetchUser = require('../middleware/fetchuser');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const { find } = require('../models/Note');

// Route 1:Fetch all the notes of a logined user

router.get('/fetchallnotes', fetchUser, async (req, res) => {
        try {
                const notes = await Note.find({ user: req.user.id })
             return   res.json(notes);
        } catch (error) {
                console.error(error.message);
           return     res.status(500).send("Internal server error occured");
        }
        // res.json([]);
})

// Route 2:add  notes of a logined user
router.post('/addnotes', fetchUser, [
        body('title', 'Title must be of at least 3 characters').isLength({ min: 3 }),
        body('description', 'Description must be of atleast 8 characters').isLength({ min: 8 })

], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });

        }
        const { title, description, tag } = req.body;
        try {

                savednote = await Note.create({
                        title: req.body.title,
                        description: req.body.description,
                        tag: req.body.tag,
                        user: req.user.id
                })
                res.json(savednote);

        } catch (error) {
                console.error(error.message);
                res.status(500).send("Internal server error occured");
        }




})

// Route 3:Upadte the existing notes of a logined user
router.put('/updatenotes/:id', fetchUser, async (req, res) => {

        const { title, description, tag } = req.body;
        let newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        try {


                let note = await Note.findById(req.params.id);
                if (!note) {
                        return res.status(404).send("Not Found");
                }
                if (note.user.toString() !== req.user.id) {
                        return res.status(401).send("Not allowed");
                }
                note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
                res.json({ note });



        }
        catch (error) {
                console.error(error.message);
                return res.status(500).send("Internal server error occured");
        }
});

// Route 3:Delete the existing notes of a logined user
router.delete('/deletenotes/:id', fetchUser, async (req, res) => {

       

        try {


                let note = await Note.findById(req.params.id);
                if (!note) {
                        return res.status(404).send("Not Found");
                }
                if (note.user.toString() !== req.user.id) {
                        return res.status(401).send("Not allowed");
                }
                note = await Note.findByIdAndDelete(req.params.id);
                res.json({"Sucess":"Note has been deleted",note:note});



        }
        catch (error) {
                console.error(error.message);
                return res.status(500).send("Internal server error occured");
        }
});
module.exports = router;