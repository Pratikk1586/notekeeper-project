import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../services/api";

export default function EditForm() {
    const { id } = useParams();
    const [note, setNote] = useState({
        title: "",
        details: "",
    });

    useEffect(() => {
        api
            .get(`/noteDetails/${id}`)
            .then((res) => {
                setNote(res.data.content);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setNote({ ...note, [name]: value })
    };

    const navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();
        api
            .patch(`/updateNote/${id}`, note)
            .then(() => {
                navigate(`/details/${id}`);
                Swal.fire("Your note has been updated successfully!");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 flex flex-col items-centre justify-centre px-4 py-12">
            <h1 className="text-white text-4xl font-extrabold mb-8 drop-shadow-lg">
                Edit <span className="text-yellow-400">Note</span>
            </h1>

            <form onSubmit={submitHandler}
                className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-9 max-w-xl w-full space-y-6">

                <input
                    type="text"
                    name="title"
                    value={note.title}
                    onChange={changeHandler}
                    placeholder="Title of Note....."
                    required
                    className="w-full px-5 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition duration-200" />

                <textarea
                    name="deatails"
                    rows="5"
                    value={note.details}
                    onChange={changeHandler}
                    placeholder="Describe Your Note..."
                    required
                    className="w-full px-5 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition duration-200"></textarea>

                <button
                    type="submit"
                    className="cursor-pointer w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-xl shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400">Save Changes</button>

                <button
                    onClick={() => navigate('/dashboard')}
                    className="w-[100%] text-indigo-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition cursor-pointer -mt-[10px]">Go to Dashboard</button>
            </form>
        </div>
    );
}