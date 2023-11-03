import { useParams } from "react-router-dom";
import menuData from "../data/menu.json";
import { useState, useEffect } from "react";
import { signal } from "@preact/signals-react";
import { BiArrowBack, BiMinus, BiPlus } from 'react-icons/bi'
import { BsFillCartPlusFill } from 'react-icons/bs'
import { NavLink } from "react-router-dom";
import '../styles/details.css'

// details code imported and implemented with original

export const addToCart = signal([])
export default function ProductDetailsRoute() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    function findProduct(id) {
        return menuData.find((product) => product.id == id);
    }

    useEffect(() => {
        setProduct(findProduct(id));
    }, [id]);

    return (
        <main className="details-page">
            {product && (
                <div className="image-container">
                    <img className="background-img" src={product.image} alt="Product Image" />
                    <div className='back-container'>
                        <NavLink to="/menu">
                            <BiArrowBack className='BiArrowBack' />
                        </NavLink>
                    </div>
                    <section className='detail-popup'>
                        <section className='top-row'>
                            <div className='amount'>
                                <BiMinus className='BiMinus' />
                                <div className='amount-count'>1</div>
                                <BiPlus className='BiPlus' />
                            </div>
                            <p className='price'>{product.price} :-</p>
                        </section>
                        <div className='description'>
                            <h5 className='detail-header'>{product.name}</h5>
                            <p className='description-text'>
                                {product.description}
                            </p>
                        </div>
                        <button className="cart-btn" onClick={() => addToCart.value.push(product)}>
                            <p className="btn-text">
                                Add to Cart
                            </p>
                            <BsFillCartPlusFill className='BsFillCartPlusFill' /></button>
                    </section>
                </div>
            )}
        </main>
    );
}

