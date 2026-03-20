export default function TestPage() {
  return (
    <div className="w-full min-h-screen bg-[#FCF8FF] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-lg w-full">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#D9C2F0] flex items-center justify-center text-2xl">
          🧪
        </div>

        <h1 className="text-3xl font-bold text-[#8A5FBF] mt-5">Test Page</h1>
        <p className="text-gray-600 mt-3">
          This page is now working correctly. Your blank page issue from
          <code className="mx-1 bg-gray-100 px-2 py-1 rounded">testPage.jsx</code>
          has been fixed.
        </p>
      </div>
    </div>
  );
}