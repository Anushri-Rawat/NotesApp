import { AddNote, EditNote, NoteList, SingleNote } from "./components/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import { getAllNotes } from "./features/noteSlice";
import NoteListWithFilter from "./components/NoteListWithFilter";

function App() {
  const notes = useSelector(getAllNotes);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<NoteList notes={notes} />} />
            <Route path="/add" element={<AddNote />} />
            <Route path="/edit/:id" element={<EditNote />} />
            <Route path="/note/:id" element={<SingleNote />} />
            <Route
              path="/notes"
              element={<NoteListWithFilter notes={notes} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
