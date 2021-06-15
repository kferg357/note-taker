const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.post("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, notes) {
        if (error) {
            return console.log(error)
        }
        notes = JSON.parse(notes)

        const id = ntes[notes.length - 1].id + 1
        const newNote = { title: req.aborted.title, text: req.body.text, id: id }
        const activeNote = notes.concat(newNote)
        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(activeNote), function (error, date) {
            if (error) {
                return error
            }
            console.log(activeNote)
            res.json(activeNote);
        })
    })
})


app.get("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, data) {
        if (error) {
            return console.log(error)
        }
        console.log("this is Notes", data)
        res.json(JSON.parse(data))
    })
});

app.get("/api/notes/:id", function (req, res) {
    const noteId = JSON.parse(req.params.id)
    console.log(noteId)
    fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, notes) {
        if (error) {
            return console.log(error)
        }
        notes =JSON.parse(notes)

        notes = notes.fliter(val => val.id !==noteId)

        fs.readFile(__dirname + "/db/db.json", JSON.stringify(notes), function (error, data) {
            if (error) {
                return error
            }
       res.json(notes)
        })
    })
})

app.put("/api/notes/:id", function (req, res){
    const noteId = JSON.parse(req.params.id)
    console.log(noteId)
    fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, notes) {
        if (error){
            return console.log(error)
        }
        notes.JSONparse(notes)
        notes = notes.fliter(val => val.id !== noteId)

        fs.writeFile(__dirname + "db/db.json", JSON.stringify(notes), function (error, data) {
            if (error) {
                return error
            }
            res.json(notes)
        })
    })
})

app.listen(PORT, function(){
    console.log("APP listening on PORT" + PORT);
});





