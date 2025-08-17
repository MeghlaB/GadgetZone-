import React, { useState } from "react";
import axios from "axios";

const AddBannerImg = () => {
    const [link, setLink] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleBannerImg = async (e) => {
        e.preventDefault();

        // if (!link.trim()) {
        //     setMessage({ type: "error", text: "Please enter an image link." });
        //     return;
        // }

        // setLoading(true);
        // setMessage(null);

        // try {
        //     const res = await axios.post("/bannerImg", { url: link.trim() }); // adjust endpoint if needed
        //     if (res.data.acknowledged) {
        //         setMessage({ type: "success", text: "Banner image added successfully!" });
        //         setLink("");
        //     } else {
        //         setMessage({ type: "error", text: res.data.message || "Failed to add banner image." });
        //     }
        // } catch (error) {
        //     setMessage({ type: "error", text: "Something went wrong. Please try again." });
        // } finally {
        //     setLoading(false);
        // }
        
        
    };

    return (
        <div className="max-w-md p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg">
            <h1 className="mb-6 text-3xl font-bold text-center text-indigo-700">
                Add Banner Image
            </h1>
            <form onSubmit={handleBannerImg} className="space-y-4">
                <input
                    name="link"
                    type="url"
                    placeholder="Enter Image URL"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded-md text-white font-semibold ${loading ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                >
                    {loading ? "Adding..." : "Add Banner"}
                </button>
            </form>

            {message && (
                <p
                    className={`mt-4 text-center font-medium ${message.type === "success" ? "text-green-600" : "text-red-600"
                        }`}
                >
                    {message.text}
                </p>
            )}
        </div>
    );
};

export default AddBannerImg;
