
export default function AddProducts() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#8A5FBF]">Add New Product</h1>
        <p className="text-gray-500 mt-2">
          Create and manage your beauty products from here.
        </p>
      </div>

      <div className="bg-[#FCF8FF] border border-[#E9DDF7] rounded-2xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            type="text"
            placeholder="Product ID"
            className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D9C2F0]"
          />
          <input
            type="text"
            placeholder="Product Name"
            className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D9C2F0]"
          />
          <input
            type="number"
            placeholder="Price"
            className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D9C2F0]"
          />
          <input
            type="number"
            placeholder="Labeled Price"
            className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D9C2F0]"
          />
          <input
            type="text"
            placeholder="Category"
            className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D9C2F0]"
          />
          <input
            type="number"
            placeholder="Stock"
            className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D9C2F0]"
          />
        </div>

        <textarea
          rows="5"
          placeholder="Product Description"
          className="w-full mt-5 p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D9C2F0]"
        ></textarea>

        <div className="mt-6 flex justify-end">
          <button className="px-6 py-3 bg-[#8A5FBF] text-white rounded-xl font-semibold hover:bg-[#7448aa] transition">
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
}