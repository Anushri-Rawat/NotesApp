import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotes, removeNote } from "../features/noteSlice";
import { useParams } from "react-router";
import { ImCancelCircle } from "react-icons/im";
import { FiEdit } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const SingleNote = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notes = useSelector(getAllNotes);
  let tempNote = notes.filter((note) => note.noteId === id);

  return (
    <section className="px-4">
      <div className="flex justify-between items-center border-b-[1px] border-b-black">
        <h2 className="my-2 text-20 font-bold">
          Title : {tempNote[0].noteTitle}
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            className="transition text-sm text-white bg-red-600 rounded px-3 py-1 flex gap-1 items-center"
            onClick={() => {
              const userConfirmed = window.confirm(
                "Are you sure you want to delete this note?"
              );
              if (userConfirmed) {
                dispatch(removeNote(tempNote[0].noteId));
                navigate("/");
              }
            }}
          >
            <ImCancelCircle /> Delete
          </button>
          <Link
            to={`/edit/${tempNote[0].noteId}`}
            className="transition text-sm text-white bg-green-600 rounded px-3 py-1 flex gap-1 items-center"
          >
            <FiEdit /> Edit
          </Link>
        </div>
      </div>

      <div
        className="py-4"
        dangerouslySetInnerHTML={{ __html: tempNote[0].noteContent }}
      ></div>
    </section>
  );
};

export default SingleNote;
