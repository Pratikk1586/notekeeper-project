import api from "../services/api.js";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export default function DetailCard({ note }) {
    const navigate = useNavigate();

    const deleteNote = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "Yes, delete it!",
            confirmButtonText: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                api
                    .delete(`/deleteNote/${note?._id}`)
                    .then(() => {
                        navigate("/dashboard");
                        Swal.fire("Deleted!", "Your note has been deleted.", "success");
                    })
                    .catch((err) => console.error(err));
            }
        });
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white/90 shadow-xl rounded-2xl p-8 space-y-6">


            <h1 className="text-3xl font-bold text-indigo-700">{note.title}</h1>
            <p className="text-gray-700 text-lg whitespace-pre-wrap">{note.details}</p>

            <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">

                <Link
                    to={`/edit/${note._id}`}
                    className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-purple-700 transition duration-200"
                >
                    Edit
                </Link>
                <button
                    onClick={deleteNote}
                    className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold shadow-md hover:from-red-600 hover:to-orange-600 transition duration-200"
                >
                    Delete
                </button>

            </div>
        </div>
    );
}