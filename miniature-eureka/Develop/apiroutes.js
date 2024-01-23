const fs = require('fs');
const path = require('path');

module.exports = function(app) {
  // Read notes from db.json
  app.get('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db.json'), 'utf8'));
    res.json(notes);
  });

  // Save a new note to db.json
  app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db.json'), 'utf8'));

    // Generate a unique id (you can use npm packages like 'uuid' for this)
    newNote.id = generateUniqueId();
    
    notes.push(newNote);

    fs.writeFileSync(path.join(__dirname, '../db.json'), JSON.stringify(notes));

    res.json(newNote);
  });
};

// Function to generate a unique id (using 'uuid' as an example)
function generateUniqueId() {
  const { v4: uuidv4 } = require('uuid');
  return uuidv4();
}

// Delete a note by ID
app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    let notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db.json'), 'utf8'));
  
    // Filter out the note with the specified ID
    notes = notes.filter(note => note.id !== noteId);
  
    // Save the updated notes to db.json
    fs.writeFileSync(path.join(__dirname, '../db.json'), JSON.stringify(notes));
  
    res.json({ success: true });
  });