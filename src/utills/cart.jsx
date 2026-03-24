import toast from "react-hot-toast";

export function LoadCart(){
    let cartString = localStorage.getItem("cart");
    if(cartString == null){
        localStorage.setItem("cart","[]");
        cartString = "[]";
    }

    const cart = JSON.parse(cartString);
    return cart;
}

export function AddToCart(product , quantity){
    let cart = LoadCart();
    
    const existingItemIndex = cart.findIndex(
        (item)=>{
           return item.productID == product.productID;
        }
    )

    if(existingItemIndex == -1){
        if(quantity < 1){
            console.log("quantity cannot be less than 1");
            toast.error("Quantity cannot be less than 1");
            return;
        }
        const cartItem = {
            productID : product.productID,
            name : product.name,
            image : product.images[0],
            labledPrice : product.labledPrice,
            quantity : quantity,
            price : product.price
        }
        cart.push(cartItem);
        

    }else{
        const existingItem = cart[existingItemIndex];
        const newquantity = existingItem.quantity + quantity;
        if(quantity < 1){
            cart = cart.filter(
                (item)=>{
                    return item.productID != product.productID; 
                }
            )
        }else{
            existingItem.quantity = newquantity;
        }
        
    }
    localStorage.setItem("cart",JSON.stringify(cart));
}