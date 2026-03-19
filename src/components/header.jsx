export default function Header(){
    return (
        <div className="w-full h-[75px] bg-[#8A5FBF] flex items-center justify-between px-6 text-white shadow-md">
            
            <h1 className="text-2xl font-bold tracking-wide">
                ✨ Crystal Beauty
            </h1>

            <div className="flex gap-6 text-[18px] font-bold">
                <a href="/">Home</a>
                <a href="/products">products</a>
                <a href="/about">about</a>
                <a href="/contact">contact</a>
               

       
            </div>

        </div>
    )
}