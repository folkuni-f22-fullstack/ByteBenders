import { useParams } from "react-router-dom";
import menuData from "../data/menu.json";
import { useState, useEffect } from "react";
import { BiArrowBack, BiMinus, BiPlus } from "react-icons/bi";
import { BsFillCartPlusFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import "../styles/details.css";

// details code imported and implemented with original

export default function ProductDetailsRoute() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    let [quantity, setQuantity] = useState(1);

    function findProduct(id) {
        return menuData.find((product) => product.id == id);
    }

    useEffect(() => {
        setProduct(findProduct(id));
    }, [id]);

    // Quantity count
    function updateQuantity(change) {
        let newQuantity = quantity + change;
        // Cannot be less than one
        newQuantity = Math.max(newQuantity, 1);
        if (quantity >= 1) {
            setQuantity(newQuantity);
        }
    }

    // Send to local storage
    function addToCart() {
        const cartItem = {
            id: product.id,
            image: product.image,
            name: product.name,
            price: product.price * quantity,
            quantity: quantity,
            comment: product.comment,
        }
        const existingCartData = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if item already exist
        const matchingId = existingCartData.findIndex(
            (item) => item.id === cartItem.id
        );
        if (matchingId !== -1) {
            existingCartData[matchingId].quantity += cartItem.quantity;
            existingCartData[matchingId].price += cartItem.price;
        } else {
            existingCartData.push(cartItem);
        }
        localStorage.setItem("cart", JSON.stringify(existingCartData));
    }

    return (
        <main className="details-page">
            {product && (
                <div className="image-container">
                    <img
                        src={product.image}
                        alt={`image of ${product.name}`}
                        className="background-img"
                    />
                    <div className="back-container">
                        <NavLink to="/menu">
                            <BiArrowBack className="BiArrowBack" />
                        </NavLink>
                    </div>
                    <section className="detail-popup">
                        <section className="top-row">
                            <div className="amount">
                                <button
                                    className="amount-detail-button"
                                    onClick={() => updateQuantity(-1)}
                                >
                                    <BiMinus className="BiMinus" />
                                </button>
                                <div className="amount-count">{quantity}</div>
                                <button
                                    className="amount-detail-button"
                                    onClick={() => updateQuantity(1)}
                                >
                                    <BiPlus className="BiPlus" />
                                </button>
                            </div>
                            <p className="price">
                                {product.price * quantity} :-
                            </p>
                        </section>
                        <div className="description">
                            <h5 className="detail-header">{product.name}</h5>
                            <p className="description-text">
                                {product.description}
                            </p>
                        </div>
                        <button className="cart-btn" onClick={addToCart}>
                            <p className="btn-text">Add to Cart</p>
                            <BsFillCartPlusFill className="BsFillCartPlusFill" />
                        </button>
                    </section>
                </div>
            )}
        </main>
    );
}
