type Props = {
  title: string;
  content: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  editMode: boolean;
  addNotes: (e: React.MouseEvent<HTMLButtonElement>) => void;
  updateNote: (e: React.MouseEvent<HTMLButtonElement>) => void;
  cancelUpdate: () => void;
};

const FormComponent = ({
  title,
  content,
  setTitle,
  setContent,
  editMode,
  addNotes,
  updateNote,
  cancelUpdate,
}: Props) => {
  console.log(title, content);
  return (
    <form className="note-form">
      <input
        placeholder="Title"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <textarea
        placeholder="Content"
        required
        rows={10}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {!editMode ? (
        <div className="save">
          <button type="submit" onClick={addNotes}>
            Add Note
          </button>
        </div>
      ) : (
        <div className="update">
          <button className="save" onClick={updateNote}>
            Save
          </button>
          <button className="cancel" onClick={cancelUpdate}>
            Cancel
          </button>
        </div>
      )}
    </form>
  );
};

export default FormComponent;
