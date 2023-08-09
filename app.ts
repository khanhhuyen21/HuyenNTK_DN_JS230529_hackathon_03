interface Note {
  id: number;
  name: string;
}

const noteForm = document.getElementById("noteForm") as HTMLFormElement;
const createNote = document.getElementById("createNote") as HTMLInputElement;
const noteList = document.getElementById("noteList") as HTMLDivElement;
let notes: Note[] = dataLocal();
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

  const noteList = document.getElementById(
    "noteList"
  ) as HTMLTableSectionElement;
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
    const newUser: Note = {
      id: notes.length == 0 ? 0 : maxx + 1,
      name: name,
    };
    notes.push(newUser);
    renderNotes();
    noteForm.reset();
  }
  //validate input
  if (name.length === 0) {
    const errAgeElement = document.getElementById("warning") as HTMLElement;
    errAgeElement.style.display = "block";
  }
  const myArr = JSON.stringify(notes);
  localStorage.setItem("note", myArr);
});

//delete
function handleDelete(noteId: number) {
  notes = notes.filter((note) => note.id !== noteId);
  const myArr = JSON.stringify(notes);
  localStorage.setItem("note", myArr);
  renderNotes();
}

function dataLocal() {
  const results: string | null = localStorage.getItem("note");
  const arr = JSON.parse(results ?? "null");
  return arr ? arr : [];
}
renderNotes();
