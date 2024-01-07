import React, { useRef, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { editNote, getAllNotes } from "../features/noteSlice";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { Link } from "react-router-dom";
import JoditEditor from "jodit-react";

const config = {
  readonly: false,
  placeholder: "Enter note content here",
};

const EditNote = () => {
  const editor = useRef(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const notes = useSelector(getAllNotes);
  let tempNote = notes.filter((note) => note.noteId === id);

  const [noteTitle, setNoteTitle] = useState(tempNote[0].noteTitle);
  const [noteContent, setNoteContent] = useState(tempNote[0].noteContent);
  const [tags, setTags] = useState(tempNote[0].label);
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [canSave, setCanSave] = useState(true);

  const handleNoteTitleChange = (event) => {
    event.preventDefault();
    if (event.target.name === "noteTitle") {
      if (event.target.value.length === 0) {
        setTitleError(true);
      } else {
        setTitleError(false);
        setCanSave(true);
      }
    }

    setNoteTitle(event.target.value);
  };

  const handleNoteContentChange = (newContent) => {
    if (newContent.length === 0) {
      setContentError(true);
    } else {
      setContentError(false);
      setCanSave(true);
    }
    setNoteContent(newContent);
  };

  const onSaveNoteClicked = () => {
    if (!titleError && !contentError) {
      dispatch(
        editNote({
          noteId: tempNote[0].noteId,
          noteTitle,
          noteContent,
          label: tags,
        })
      );
      toast.success("Note edited successfully");
    }
  };

  const handleChange = (t) => {
    setTags(t);
  };

  return (
    <section className="rounded m-3">
      <h2 className="my-4 text-lg font-bold">Edit Note</h2>
      <form className="flex flex-col gap-2">
        <div className="flex w-full">
          <label htmlFor="noteTitle" className="form-label text-sm w-[80px]">
            Title:
          </label>
          <div className="flex flex-col w-full">
            <input
              type="text"
              id="noteTitle"
              name="noteTitle"
              placeholder="Note title here ..."
              onChange={handleNoteTitleChange}
              className="w-full border-[1px] border-black rounded"
              value={noteTitle}
            />
            <span className="text-sm text-red-600">
              {titleError ? "Title can't be empty!" : ""}
            </span>
          </div>
        </div>

        <div className="flex w-full">
          <span className="text-sm w-[80px]">Label:</span>
          <TagsInput
            value={tags}
            onChange={handleChange}
            className="w-full border-[1px] border-black rounded text-sm"
          />
        </div>

        <div className="flex w-full">
          <label htmlFor="noteContent" className="form-label text-sm w-[80px]">
            Content:
          </label>
          <div className="flex flex-col w-full">
            <JoditEditor
              ref={editor}
              value={noteContent}
              config={config}
              onChange={handleNoteContentChange}
            />
            <span className="text-sm text-red-600">
              {contentError ? "Content can't be empty!" : ""}
            </span>
          </div>
        </div>
        <div className="flex justify-start gap-2 items-center pl-0 sm:pl-[4.5rem]">
          <button
            type="button"
            onClick={onSaveNoteClicked}
            className="text-sm rounded-sm text-white bg-black px-5 py-2 cursor-pointer w-[130px]"
            disabled={!canSave}
          >
            Update Note
          </button>
          <Link to="/" className="text-green-600 text-md">
            Cancel
          </Link>
        </div>
        <ToastContainer />
      </form>
    </section>
  );
};

export default EditNote;
