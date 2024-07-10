import { useState } from "react";
import { randId } from "../../utils";

const NoteForm = ({ addNote }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addNote({ title, text, createdDate: Date.now(), id: randId() });
      setTitle("");
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="notes-form">
      <input
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title..."
        value={title}
        type="text"
      />
      <textarea
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your note here..."
        value={text}
      ></textarea>
      <button type="submit">Add Note</button>
    </form>
  );
};

export default NoteForm;
