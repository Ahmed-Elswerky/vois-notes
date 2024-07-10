import React, { useState, useEffect, useContext } from "react";
import CryptoJS from "crypto-js";
import { decryptTxt, encryptTxt } from "../../utils";
import NoteForm from "./NotesForm";
import NoteList from "./NotesList";
import { Context } from "../wrapper";

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
    )?.filter((note) => note.userId !== user.id);

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

  const [noteToEdit, setNoteToEdit] = useState(null);

  // useEffect(() => {
  //   console.log("first useeffect");
  //   const savedNotes = JSON.parse(localStorage.getItem("notes"));
  //   if (savedNotes) {
  //     console.log("savedNotes", savedNotes);
  //     const notesArr = [];
  //     for (let i = 0; i < savedNotes.length; i++) {
  //       const currentNote = savedNotes[i];
  //       console.log("currentNote", currentNote);
  //       notesArr.push({
  //         ...currentNote,
  //         text: decryptTxt(currentNote?.text),
  //       });
  //       console.log("notesArr", { ...notesArr });
  //     }
  //     // const decryptedNotes = await Promise.all(
  //     //   savedNotes.map(async (note) => {
  //     //     const value = {
  //     //       ...note,
  //     //       text: await decryptTxt(note?.text),
  //     //     };
  //     //     await new Promise((resolve) => setTimeout(resolve, 500));
  //     //     return value;
  //     //   })
  //     // );
  //     // console.log("decryptedNotes", decryptedNotes);
  //     setNotes(notesArr);
  //   }
  // }, []);

  const saveNotes = (notes) => {
    const encryptedNotes = notes.map((note) => ({
      ...note,
      text: encryptTxt(note?.text),
    }));

    localStorage.setItem("notes", JSON.stringify(encryptedNotes));
  };

  // const addNote = (text) => {
  //   const newNote = { id: Date.now(), text };
  //   const newNotes = [...notes, newNote];
  //   setNotes(newNotes);
  //   saveNotes(newNotes);
  // };

  const startEditNote = (note) => {
    setNoteToEdit(note);
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
