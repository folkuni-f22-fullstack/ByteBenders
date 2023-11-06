import "../styles/meals.css";
import { BsCart3 } from "react-icons/bs";
import { useEffect, useState } from "react";
import displayMeals from "../utils/popular.ts";

export default function PopularThisWeek() {
    const [randomMeals, setRandomMeals] = useState([]);

    useEffect(() => {
        displayMeals(randomMeals, setRandomMeals);
    }, []);

    return (
        <>
            <h1 className="most-popular-title"> Most popular this week</h1>
            <section className="meals-section snaps-inline">
                {randomMeals &&
                    randomMeals.map((menuItem, index) => (
                        <div className="meals-card" key={index}>
                            <img
                                src={menuItem.image}
                                alt={`image of ${menuItem.name}`}
                                className="meals-img"
                            />
                            <div className="meals-text">
                                <p>{menuItem.name}</p>
                                    <p className="meals-price"> {menuItem.price} :- </p>
                            </div>
                            <button className="meals-btn">
                                Add to cart <BsCart3 className="btn-icon" />
                            </button>
                        </div>
                    ))}
            </section>
        </>
    );
}
