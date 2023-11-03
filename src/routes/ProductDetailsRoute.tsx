import { useParams } from "react-router-dom";
import menuData from "../data/menu.json";
import { useState, useEffect } from "react";
import { signal } from "@preact/signals-react";


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
        <div className="ProductDetailsRoute">
            {product && (
                <>
                    <h1> {product.name} </h1>
                    <p> Description: {product.description} </p>
                    <p> Price: {product.price} kr </p>
                    <p> Category: {product?.category} </p>
                    <p> Category: {product?.subcategory}</p>
                    <p> Allergenes: {product?.allergenes}</p>
                </>
            )}
            <button onClick={() => (addToCart.value.push(product))}>Add to Cart</button>
        </div>
    );
}
