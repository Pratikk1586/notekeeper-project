import React, { useEffect, useState } from "react";
import AddNote from "../components/AddNote";
import NoteCard from "../components/NoteCard";
import api from "../services/api";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = () => {
      setLoading(true);
      api
        .get("/allNotes")
        .then((res) => {
          if (res.data.content) {
            setNotes(res.data.content);
          } else {
            setNotes([]);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-6 py-12 flex flex-col items-center">
      <h1 className="text-white text-4xl font-extrabold mb-6 drop-shadow-lg text-center max-w-3xl">
        Save Your <span className="text-yellow-400">Notes</span> Here
      </h1>

      <div className="mb-10 w-full max-w-2xl">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-5 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-md transition duration-200"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-8 h-8 border-4 border-white border-t-yellow-400 rounded-full animate-spin"></div>
        </div>
      ) : filteredNotes?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-7xl">
          {filteredNotes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      ) : (
        <p className="flex justify-center items-center h-64 text-gray-300 text-lg tracking-wide">
          No Notes To Show
        </p>
      )}

      <div className="w-full mt-auto flex justify-end sticky bottom-4">
        <AddNote />
      </div>
    </div>
  );
}
