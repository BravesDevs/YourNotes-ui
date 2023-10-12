import "./App.css";
import { useEffect, useState } from "react";
import FormComponent from "./components/FormComponent";
import { Note } from "./types/types";
import NotesGrid from "./components/NotesGrid";
// import notesData from "../data/notes.json";

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editMode, setEditMode] = useState(false);

  let [noteId, setNoteId] = useState<number>(-1);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/notes");
        const apiData = await res.json();
        setNotes(apiData.data);
      } catch (err: any) {
        throw new Error(err.message);
      }
    };
    fetchNotes();
  }, []);

  const addNotes = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title, content }),
      });
      const apiData = await res.json();
      setNotes([...notes, apiData.data]);
      setTitle("");
      setContent("");

      // Refresh the page by calling the useEffect hook again
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (noteId: Number) => {
    try {
      const res = await fetch(`http://localhost:3000/api/note/${noteId}`, {
        method: "DELETE",
      });
      const apiData = await res.json();
      if (apiData.message === "ok") {
        let newNotes = notes.filter((note) => note.id !== noteId);
        setNotes(newNotes);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectNote = (noteId: number) => {
    const selectedNote = notes.filter((note) => note.id == noteId);
    setNoteId(noteId);
    setTitle(selectedNote[0].title);
    setContent(selectedNote[0].content);
    setEditMode(true);
  };

  const updateNote = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const updatedNote = {
      title: title,
      content,
    };

    try {
      const res = await fetch(`http://localhost:3000/api/note/${noteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedNote),
      });

      const apiData = await res.json();
      if (apiData.message === "ok") {
        let newNotes = notes.map((note) => {
          if (note.id === noteId) {
            return { ...note, title: title, content };
          }
          return note;
        });
        setNotes(newNotes);
      }
      setEditMode(false);
      setTitle("");
      setContent("");
    } catch (err) {
    }
  };

  const cancelUpdate = () => {
    setEditMode(false);
    setTitle("");
    setContent("");
  };

  return (
    <div className="app-container">
      <FormComponent
        title={title}
        content={content}
        setTitle={setTitle}
        setContent={setContent}
        editMode={editMode}
        addNotes={addNotes}
        updateNote={updateNote}
        cancelUpdate={cancelUpdate}
      />
      <NotesGrid notes={notes} onDelete={deleteNote} selectNote={selectNote} />
    </div>
  );
};

export default App;
