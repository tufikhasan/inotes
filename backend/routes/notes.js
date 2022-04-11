const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//ROUTE 01: Add new note using: POST "/api/notes/addnote".login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid name").isLength({ min: 3 }),
    body("description", "description must be at-lest 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    //if there are error return bad request and error message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //create a new note
      const note = await Notes.create({
        title,
        description,
        tag,
        user: req.user.id,
      });
      res.json(note);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE 02: Fetch all notes using: GET "/api/notes/fatchallnotes".login required
router.get("/fatchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});
//ROUTE 03: Add new note using: PUT "/api/notes/updatenote".login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //create a updateNote object
    const updateNote = {};
    //if title exist then update title
    if (title) {
      updateNote.title = title;
    }
    //if description exist then update description
    if (description) {
      updateNote.description = description;
    }
    //if tag exist then update tag
    if (tag) {
      updateNote.tag = tag;
    }
    //Find the note by id to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: updateNote },
      { new: true }
    );

    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
