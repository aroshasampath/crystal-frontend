import { useState } from "react";

export default function ContactPage() {

    const [status, setStatus] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        // fake submit (no backend yet)
        setStatus("Message sent successfully 💜");

        // reset after 3 seconds (optional)
        setTimeout(() => {
            setStatus("");
        }, 3000);
    }

    return (
        <div className="w-full min-h-[100vh] bg-[#FCF8FF] flex items-center justify-center px-4 py-10">
            
            <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-8">
                
                <h1 className="text-3xl font-bold text-[#8A5FBF] text-center">
                    Contact Us 💜
                </h1>

                <p className="text-center text-gray-500 mt-2 mb-6">
                    We’d love to hear from you! Send us your questions or feedback.
                </p>

                {/* ✅ Status Message */}
                {status && (
                    <div className="mb-4 p-3 text-center bg-[#D9C2F0] text-[#2F2A2E] rounded-md">
                        {status}
                    </div>
                )}

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D9C2F0]"
                        required
                    />

                    <input
                        type="email"
                        placeholder="Your Email"
                        className="p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D9C2F0]"
                        required
                    />

                    <textarea
                        rows="5"
                        placeholder="Your Message"
                        className="p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D9C2F0]"
                        required
                    ></textarea>

                    <button
                        type="submit"
                        className="mt-2 bg-[#8A5FBF] text-white py-3 rounded-md font-semibold hover:bg-[#7a4ec0] transition"
                    >
                        Send Message
                    </button>

                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    📧 support@crystalbeauty.com <br />
                    📞 +94 71 1234567
                </div>

            </div>

        </div>
    )
}