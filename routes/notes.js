const notes = require('express').Router();
const path = require('path');
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const { json } = require('express');
const { get } = require('.');


//get route to read all the notes ଘ(੭*ˊᵕˋ)੭* ̀ˋ
notes.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
});

//post request for a new note d(> _・)
notes.post('/', (req, res) => {
    let db = fs.readFileSync('db/db.json');
    db = JSON.parse(db);
    const { title, text, } = req.body;
    // creating body for note 
    if (req.body) {
        let userNote = {
            title,
            text,
            // creates an id for the note 
            id: uuidv4(),
        };
        // pushing created note to the db.json file
        db.push(userNote);
        fs.writeFileSync('db/db.json', JSON.stringify(db));
        res.json(`Note added successfully ｡^‿^｡ `);
    } else {
        res.error('Error in adding tip ༽◺_◿༼ ');
    }
});


//delete request for a specific note （>﹏<）
notes.delete('/:id', (req, res) => {
    //reads note db
    let db = JSON.parse(fs.readFileSync('db/db.json'))
    // removing note with specific id
    let deleteNotes = db.filter(item => item.id !== req.params.id);
    // rewriting note to db.json
    fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
    res.json('note deleted (˃̣̣̥⌓˂̣̣̥ )');

})

module.exports = notes;