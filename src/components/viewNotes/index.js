import { useContext } from "react";
import NoteForm from "./NotesForm";
import NoteList from "./NotesList";
import { Context } from "../wrapper";
import { encryptTxt } from "../../utils";

const Notes = () => {
  const context = useContext(Context);
  const user = context.state?.user,
    notes = context.state?.notes;

  // const [user, setUser] = useState();

  const addNote = (note) => {
    const newNotes = [...notes, { ...note, userId: user.id }];
    // setNotes(newNotes);

    const otherNotes = JSON.parse(
      localStorage.getItem("notes") || "[]"
    )?.filter(
      (note) => note.userId !== user.id || note?.taggedUsers?.includes(user.id)
    );

    localStorage.setItem(
      "notes",
      JSON.stringify([
        ...newNotes?.map((note) => ({
          ...note,
          title: encryptTxt(note.title),
          text: encryptTxt(note.text),
        })),
        ...otherNotes,
      ])
    );
    context?.updateUserActivity();
  };

  return (
    <div className="notes-wrap">
      <h3>Note Taking Notes</h3>
      <NoteForm addNote={addNote} />
      <NoteList />
    </div>
  );
};

export default Notes;
