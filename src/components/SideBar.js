import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { getAllNotes } from "../features/noteSlice";
import { useSelector } from "react-redux";
import { FaTag } from "react-icons/fa";
import { MdNoteAlt } from "react-icons/md";

const Sidebar = () => {
  const location = useLocation();
  let pathname = location.pathname.replace("/", "");
  const notes = useSelector(getAllNotes);

  const uniqueLabels = [
    ...new Set(notes.reduce((acc, curr) => [...acc, ...curr.label], [])),
  ];

  return (
    <div className="w-16 min-h-[100vh] sidebar border-e-[1px]">
      <div className="pt-4 pb-3 px-6 flex flex-col">
        <Link
          to="/"
          className="text-lg hidden md:block sm:text-xl md:text-left text-center"
        >
          NotesApp
        </Link>
        <Link to="/" className="text-lg block md:hidden text-center">
          <MdNoteAlt size={20} />
        </Link>

        <ul className="my-4">
          <Link
            to="/"
            className={`text-black flex justify-center items-center link-item hover:text-red-600 ${
              pathname === "home" ? "active-link" : ""
            }`}
          >
            <span className="flex items-center justify-center">
              <AiFillHome size={17} />
            </span>
            <span className="icon-text text-sm font-light">Home</span>
          </Link>
          <Link
            to="/add"
            className={`text-black flex justify-center items-center link-item hover:text-red-600 ${
              pathname === "add" ? "active-link" : ""
            }`}
          >
            <span className="flex items-center justify-center">
              <BsPlusLg size={17} />
            </span>
            <span className="icon-text text-sm font-light">Add</span>
          </Link>
          {/* <Link
            to="/notes"
            className="text-black flex justify-center items-center link-item hover:text-red-600"
          >
            <span className="flex items-center justify-center">
              <MdNoteAlt size={17} />
            </span>
            <span className="icon-text text-sm font-light">Notes</span>
          </Link> */}
          {uniqueLabels.length > 0 &&
            uniqueLabels.map((label, i) => (
              <Link
                to={`/notes?tag=${label}`}
                className={`text-black flex justify-center items-center link-item hover:text-red-600 ${
                  pathname === "add" ? "active-link" : ""
                }`}
                key={i}
              >
                <span className="flex items-center justify-center">
                  <FaTag size={17} />
                </span>
                <span className="icon-text text-sm font-light">{label}</span>
              </Link>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
