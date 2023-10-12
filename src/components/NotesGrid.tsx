import "../App.css";

type notes = {
  notes: Props[];
  onDelete: (id: number) => void;
  selectNote: (id: number) => void;
};

type Props = {
  id: number;
  title: string;
  content: string;
};

const NotesGrid = ({ notes, onDelete, selectNote }: notes) => {
  return (
    <div className="notes-grid">
      {notes.map((note: any) => (
        <div
          className="note-item"
          key={note.id}
          onClick={() => selectNote(note.id)}
        >
          <div className="notes-header">
            <button onClick={() => onDelete(note.id)}>X</button>
          </div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
};

export default NotesGrid;
