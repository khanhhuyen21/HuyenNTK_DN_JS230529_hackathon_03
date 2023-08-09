"use strict";
const noteForm = document.getElementById("noteForm");
const createNote = document.getElementById("createNote");
const noteList = document.getElementById("noteList");
let notes = dataLocal();
console.log(notes);
function renderNotes() {
    let notee = "";
    notes.forEach((note) => {
        notee += `
      <div class="list">
                  <p>Title: ${note.name}</p>
                  <button class="delete" data-id="${note.id}">Delete</button>
              </div>`;
    });
    const noteList = document.getElementById("noteList");
    noteList.innerHTML = notee;
    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const noteId = parseInt(button.getAttribute("data-id") || "0", 0);
            handleDelete(noteId);
        });
    });
}
noteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = createNote.value;
    const maxx = notes.reduce((max, note) => Math.max(max, note.id), 0);
    if (name) {
        const newUser = {
            id: notes.length == 0 ? 0 : maxx + 1,
            name: name,
        };
        notes.push(newUser);
        renderNotes();
        noteForm.reset();
    }
    //validate input
    if (name.length === 0) {
        const errAgeElement = document.getElementById("warning");
        errAgeElement.style.display = "block";
    }
    const myArr = JSON.stringify(notes);
    localStorage.setItem("note", myArr);
});
//delete
function handleDelete(noteId) {
    notes = notes.filter((note) => note.id !== noteId);
    const myArr = JSON.stringify(notes);
    localStorage.setItem("note", myArr);
    renderNotes();
}
function dataLocal() {
    const results = localStorage.getItem("note");
    const arr = JSON.parse(results !== null && results !== void 0 ? results : "null");
    return arr ? arr : [];
}
renderNotes();
