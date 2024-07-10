const NoteList = ({ notes = [] }) => {
  const editNote = (id, newText) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, text: newText } : note
    );
    // setNotes(updatedNotes);
    // saveNotes(updatedNotes);
    // setNoteToEdit(null);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    // setNotes(updatedNotes);
    // saveNotes(updatedNotes);
  };

  return (
    <div className="notes-list">
      {notes.map((note, index) => (
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
