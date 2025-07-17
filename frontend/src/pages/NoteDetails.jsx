import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailCard from "../components/DetailCard";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function NoteDetails() {
    const { id } = useParams();
    const [note, setNote] = useState({
        id: "",
        title: "",
        details: "",
    });

    console.log(note)
    const navigate = useNavigate();
    useEffect(() => {
        api
            .get(`/noteDetails/${id}`)
            .then((res) => {
                setNote(res.data.content);
            })
            .catch((err) => console.log(err));
    }, [id]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-700 flex items-centre justify-center px-4 py-12">

            <div className="max-w-3xl w-full bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="w-[100%] text-indigo-700 font-medium rounded-lg text-sm px-5 py-2.5 text-left transition cursor-pointer-mt-[10px]">
                    ⬅️ Go to Dashboard
                </button>
                <DetailCard note={note ? note : "no data"} />
            </div>
        </div>
    );
}