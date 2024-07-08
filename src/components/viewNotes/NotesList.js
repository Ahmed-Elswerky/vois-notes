const NoteList = ({ notes }) => {
  return (
    <div className="notes-list">
      {notes.map((note, index) => (
        <div key={index} className="note">
          <h5>{note.title}</h5>
          <p>{note.text}</p>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
