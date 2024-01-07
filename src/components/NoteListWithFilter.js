import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import NoteList from "./NoteList";

const NoteListWithFilter = ({ notes }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  let tag = searchParams.get("tag");
  if (tag) {
    const filteredNotes = notes.filter((note) => note.label.includes(tag));
    if (filteredNotes.length == 0) return <div>No notes with {tag} tag</div>;
    return <NoteList notes={filteredNotes} />;
  } else {
    return <NoteList notes={notes} />;
  }
};

export default NoteListWithFilter;
