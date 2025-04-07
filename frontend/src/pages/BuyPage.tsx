import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomeBand";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";
import { useState } from "react";

function BuyPage () {
    const navigate = useNavigate();
    const {title, bookId, bprice} = useParams();
    const {addToCart} = useCart();
    const [price, setfullPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);

    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookId : Number(bookId),
            title : String(title),
            price,
            pricePerBook : Number(bprice),
            quantity}
            addToCart(newItem);
            navigate('/cart');
        }

    return (
        <>
            <WelcomeBand />
            <h2>Buy {title}</h2>
            <h3>Price per copy: <strong>${bprice}</strong></h3>
            <div>
            <input
                type="number"
                placeholder="How many copies?"
                onChange={(x) => {
                    const value = Number(x.target.value);
                    setQuantity(value);
                    setfullPrice(value * Number(bprice));
                }}
            />

                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
            <br />
            <button className='' onClick={() => navigate(-1)}>Go Back</button>
        </>
    );

}
export default BuyPage;