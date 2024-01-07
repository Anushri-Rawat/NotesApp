import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addNewNote } from "../features/noteSlice";
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

const AddNote = () => {
  const editor = useRef(null);
  const dispatch = useDispatch();
  const [tags, setTags] = useState([]);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [canSave, setCanSave] = useState(false);

  const handleNoteTitleChange = (event) => {
    event.preventDefault();
    if (event.target.value.length === 0) {
      setTitleError(true);
    } else {
      setTitleError(false);
      setCanSave(true);
    }

    setNoteTitle(event.target.value);
  };

  const handleContentChange = (newContent) => {
    if (newContent.length === 0) {
      setContentError(true);
    } else {
      setContentError(false);
      setCanSave(true);
    }
    setNoteContent(newContent);
  };

  const onSaveNoteClicked = () => {
    if (
      !titleError &&
      !contentError &&
      noteTitle.length > 0 &&
      noteContent.length > 0
    ) {
      dispatch(addNewNote({ noteTitle, noteContent, label: tags }));
      toast.success("New Note added successfully");
      setNoteContent(" ");
      setNoteTitle("");
      setTags([]);
    }
  };

  return (
    <section className="rounded m-3">
      <h2 className="my-4 text-lg font-bold">Add New Note</h2>
      <form className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row w-full">
          <label htmlFor="noteTitle" className="form-label text-sm w-[80px]">
            Title:
          </label>
          <div className="flex flex-col w-full">
            <input
              type="text"
              id="noteTitle"
              name="noteTitle"
              placeholder="Enter the title here"
              onChange={handleNoteTitleChange}
              className="border-[1px] border-black rounded"
              value={noteTitle}
            />
            <span className="text-sm text-red-600">
              {titleError ? "Title can't be empty!" : ""}
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full">
          <span className="text-sm w-[80px]">Label:</span>
          <TagsInput
            value={tags}
            onChange={(t) => {
              setTags(t);
            }}
            className="w-full border-[1px] border-black rounded text-sm"
          />
        </div>

        <div className="flex flex-col sm:flex-row w-full">
          <label htmlFor="noteContent" className="form-label text-sm w-[80px]">
            Content:
          </label>
          <div className="flex flex-col w-full">
            <JoditEditor
              ref={editor}
              value={noteContent}
              config={config}
              onChange={handleContentChange}
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
            className="text-sm rounded-sm text-white bg-black px-5 py-2 cursor-pointer w-[120px]"
            disabled={!canSave}
          >
            Save Note
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

export default AddNote;
