import { useContext, useState } from "react";
import { Context } from "../wrapper";
import EditNote from "./EditNot";

let searchTimeout = null;
const NoteList = () => {
  const context = useContext(Context);
  const notes = context.state?.notes;

  const [noteToEdit, setNoteToEdit] = useState(null);
  const [search, setSearch] = useState("");

  const handleSearchValue = (e) => {
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      setSearch(e.target.value);
    }, 400);
  };

  const editNote = (note) => {
    setNoteToEdit(note);
  };

  const submitEditNote = (note) => {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    const updatedNotes = notes.map((n) =>
      n.id === note.id ? { ...n, ...note } : n
    );
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    context.updateUserActivity();

    setNoteToEdit(null);
  };

  const deleteNote = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      const notes = JSON.parse(localStorage.getItem("notes") || "[]");
      const updatedNotes = notes.filter((note) => note.id !== id);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      context.updateUserActivity();
      // setNotes(updatedNotes);
      // saveNotes(updatedNotes);
    }
  };

  return (
    <div className="notes-list">
      {noteToEdit && (
        <EditNote
          note={noteToEdit}
          onClose={() => setNoteToEdit(null)}
          onSave={submitEditNote}
        />
      )}
      <div className="search-wrapper">
        <input
          type="search"
          placeholder="Search..."
          onChange={handleSearchValue}
        />
      </div>
      {notes
        ?.filter((note) => JSON.stringify(note).toLowerCase().includes(search))
        .map((note, index) => (
          <div key={index} className="note">
            <div className="title">
              <h5>{note.title}</h5>
              <span>
                {new Intl.DateTimeFormat("in").format(
                  new Date(note?.createdDate || Date.now())
                )}
              </span>
            </div>
            <p>{note.text}</p>
            <div className="note-actions">
              <button onClick={() => editNote(note)}>Edit</button>
              <button onClick={() => deleteNote(note.id)}>Delete</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default NoteList;
