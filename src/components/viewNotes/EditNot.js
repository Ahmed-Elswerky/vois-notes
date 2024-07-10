import { useState, useEffect } from "react";
import { encryptTxt } from "../../utils";

const EditNote = ({ note, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setText(note.text);
    }

    return () => {
      setTitle("");
      setText("");
    };
  }, [note]);

  const handleSave = () => {
    onSave({ id: note.id, text: encryptTxt(text), title: encryptTxt(title) });
    onClose();
  };

  if (!note) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Note</h2>
        <input
          type="text"
          defaultValue={note.title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          defaultValue={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditNote;
