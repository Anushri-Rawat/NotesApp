import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { storeInLocalStorage, fetchFromLocalStorage } from "../utils/helpers";

const initialState = {
  notes: fetchFromLocalStorage("notes"),
  error: null,
  count: 0,
};
const colors = [
  "#faf9f9",
  "#fed7aa",
  "#bbf7d0",
  "#fecaca",
  "#c7d2fe",
  "#fef08a",
  "#e9d5ff",
];

function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNewNote(state, action) {
      const { noteTitle, noteContent, label } = action.payload;
      let noteId = uuid();
      let newPost = {
        noteId,
        noteTitle,
        noteContent,
        label,
        bg: getRandomColor(),
      };
      newPost.noteDate = new Date().toISOString();
      state.notes.push(newPost);
      storeInLocalStorage("notes", state.notes);
    },

    removeNote(state, action) {
      const tempId = action.payload;
      const tempNotes = state.notes.filter((note) => note.noteId !== tempId);
      state.notes = tempNotes;
      storeInLocalStorage("notes", tempNotes);
    },

    editNote(state, action) {
      const { noteId, noteTitle, noteContent, label } = action.payload;
      console.log(noteId, noteTitle, noteContent, label);
      const tempNotes = state.notes.map((note) => {
        if (note.noteId === noteId) {
          note.noteTitle = noteTitle;
          note.noteContent = noteContent;
          note.label = label;
          note.noteDate = new Date().toISOString();
        }
        return note;
      });

      state.notes = tempNotes;
      storeInLocalStorage("notes", tempNotes);
    },

    increaseCount(state, action) {
      state.count = state.count + 1;
    },
  },
});

export const { addNewNote, removeNote, editNote } = noteSlice.actions;
export const getAllNotes = (state) => state.notes.notes;
export default noteSlice.reducer;
