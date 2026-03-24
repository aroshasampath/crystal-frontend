export default function ProductCart(props) {
  const product = props.product;

  const discount =
    product.labledPrice > product.price
      ? Math.round(
          ((product.labledPrice - product.price) / product.labledPrice) * 100
        )
      : 0;

  return (
    <div className="w-full max-w-[280px] bg-white rounded-[28px] border border-[#D9C2F0] overflow-hidden shadow-[0_10px_30px_rgba(138,95,191,0.12)] hover:shadow-[0_18px_45px_rgba(138,95,191,0.18)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
      <div className="relative w-full h-[220px] bg-[#FCF8FF] overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={product.images[0]}
          alt={product.name}
        />

        {discount > 0 && (
          <div className="absolute top-4 right-4 bg-[#8A5FBF] text-white text-[13px] font-semibold px-4 py-2 rounded-full shadow-lg">
            {discount}% off
          </div>
        )}

        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#8A5FBF] text-[12px] font-semibold px-3 py-1.5 rounded-full border border-[#D9C2F0] shadow-sm">
          {product.category}
        </div>
      </div>

      <div className="p-5 bg-gradient-to-b from-white to-[#FCF8FF]">
        <div className="mb-3">
          <h2 className="text-[24px] leading-[30px] font-bold text-[#4B2E6F]">
            {product.name}
          </h2>

          <p className="text-[14px] text-[#8A5FBF] mt-1 font-medium">
            {product.altNames}
          </p>
        </div>

        <p className="text-[14px] text-gray-600 leading-6 min-h-[72px]">
          {product.discription}
        </p>

        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-[28px] font-extrabold text-[#111827] leading-none">
              LKR {product.price}
            </p>

            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <p className="text-[14px] text-gray-400 line-through">
                LKR {product.labledPrice}
              </p>

              {discount > 0 && (
                <p className="text-[14px] font-semibold text-[#F97316]">
                  {discount}% off
                </p>
              )}
            </div>
          </div>

          <div className="bg-[#FCF8FF] border border-[#D9C2F0] rounded-2xl px-4 py-3 min-w-[92px] text-center">
            <p className="text-[11px] text-gray-500 uppercase tracking-wide">
              Stock
            </p>
            <p className="text-[18px] font-bold text-[#8A5FBF]">
              {product.stock}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between text-[13px] text-gray-500 border-t border-[#EADDF7] pt-4">
          <span className="font-medium">{product.category}</span>
          <span>ID: {product.productID}</span>
        </div>

        <button className="w-full mt-5 h-[48px] rounded-2xl bg-[#8A5FBF] text-white font-semibold text-[15px] shadow-[0_8px_20px_rgba(138,95,191,0.25)] hover:bg-[#7648ad] active:scale-[0.98] transition-all duration-300">
          View Product
        </button>
      </div>
    </div>
  );
}