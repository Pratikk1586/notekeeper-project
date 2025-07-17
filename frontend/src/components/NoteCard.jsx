import { Link } from "react-router-dom";

export default function NoteCard({ note }) {
  return (
    <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition duration-300 p-6 space-y-4">
      <div className="flex items-start justify-between">
        <Link
          to={`/details/${note?._id}`}
          className="text-xl font-semibold text-indigo-700 hover:underline"
        >
          {note?.title}
        </Link>

        <Link
          to={`/details/${note?._id}`}
          className="text-indigo-500 hover:text-indigo-700 transition"
          aria-label="More options"
        >
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </Link>
      </div>

      <pre className="text-gray-700 text-sm line-clamp-4">{note.details}</pre>
      {console.log("from NoteCard :: ", note.details)}
    </div>
  );
}
