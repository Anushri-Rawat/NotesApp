import React from "react";
import { ImCancelCircle } from "react-icons/im";
import { FiEdit } from "react-icons/fi";
import { parseISO, formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { removeNote } from "../features/noteSlice";
import { useDispatch } from "react-redux";

const NoteList = ({ notes }) => {
  const dispatch = useDispatch();

  if (!notes || notes.length === 0) {
    return <div className="not-found">No notes found</div>;
  }

  return (
    <div className="p-2">
      <h5 className="text-lg font-bold uppercase border-e pe-2">notes</h5>
      <div className="my-2 mx-0 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => {
          return (
            <div
              className="border rounded relative transition box-shadow hover:translate-y-1"
              style={{ background: note.bg }}
              key={note.noteId}
            >
              <div className="text-sm font-bold px-3.5 py-2 border-b-[1px] border-white">
                {note.noteTitle.length > 80
                  ? note.noteTitle.substring(0, 80) + "..."
                  : note.noteTitle}
              </div>
              <div
                className="text-sm font-thin p-3.5 pb-0"
                dangerouslySetInnerHTML={{
                  __html:
                    note.noteContent.length > 120
                      ? note.noteContent.substring(0, 130) + "..."
                      : note.noteContent,
                }}
              ></div>
              {note?.label?.length !== 0 && (
                <div className="flex items-center pb-2">
                  {[...note?.label].map((label) => (
                    <span
                      key={label}
                      className="tags rounded-full text-xs px-2.5 py-0.5"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              )}
              <div className="border-t-[1px] px-3.5 text-sm capitalize border-white">
                {formatDistanceToNow(parseISO(note.noteDate))}
              </div>
              <div className="pt-2 px-3.5 pb-2.5 flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="transition text-base text-red-600 "
                    onClick={() => {
                      const userConfirmed = window.confirm(
                        "Are you sure you want to delete this note?"
                      );
                      if (userConfirmed) {
                        dispatch(removeNote(note.noteId));
                      }
                    }}
                  >
                    <ImCancelCircle />
                  </button>
                  <Link
                    to={`/edit/${note.noteId}`}
                    className="transition text-base text-green-600 "
                  >
                    <FiEdit />
                  </Link>
                </div>

                <Link to={`/note/${note.noteId}`} className="text-xs">
                  Read More
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NoteList;
