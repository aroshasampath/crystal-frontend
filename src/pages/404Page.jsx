export default function NotFoundPage() {
    return (
        <div className="w-full h-[100vh] flex flex-col items-center justify-center bg-[#FCF8FF] text-center px-4">
            
            <h1 className="text-7xl font-bold text-[#8A5FBF]">
                404
            </h1>

            <h2 className="text-2xl font-semibold mt-4 text-[#2F2A2E]">
                Oops! Page Not Found
            </h2>

            <p className="mt-2 text-[#555] max-w-md">
                The page you are looking for doesn’t exist or has been moved.  
                Let’s get you back to shopping beauty products ✨
            </p>

            <button 
                className="mt-6 px-6 py-3 bg-[#8A5FBF] text-white rounded-full shadow-md hover:bg-[#7a4ec0] transition"
                onClick={() => window.location.href = "/"}
            >
                Back to Home
            </button>

        </div>
    )
}