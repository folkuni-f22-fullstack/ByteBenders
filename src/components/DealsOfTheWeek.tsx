import "../styles/meals.css";
import menuData from "../data/menu.json";
import { signal } from "@preact/signals-react";
import { BsCart3 } from "react-icons/bs";
// let weeklyDishes = signal([]);
import { useEffect, useState } from "react";

export default function DealsOfTheWeek() {
    const [randomMeals, setRandomMeals] = useState([]);

    function randomizer(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function generateMeals() {
        let weeklyDishes = [];
        for (let i = 0; i < 5; i++) {
            let dish = menuData[randomizer(0, menuData.length - 1)]
            !weeklyDishes.includes(dish) && weeklyDishes.push(dish);
        }
        return weeklyDishes
    }

    function getWeek() {
        let currentDate = new Date();
        let startDate = new Date(currentDate.getFullYear(), 0, 1);
        let days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
        return Math.ceil(days / 7);
    }

    function weekFromLocalStorage() {
        const currentDate = new Date();
        const currentWeekNumber = getWeek(currentDate);
        const storedWeekNumber = localStorage.getItem("weeknumber");

        if (!storedWeekNumber) {
            localStorage.setItem("weeknumber", currentWeekNumber);
            return currentWeekNumber;
        }
        return parseInt(storedWeekNumber, 10);
    }
    
    function displayMeals() {
        const oldWeek = weekFromLocalStorage();
        const thisWeek = getWeek();
        const deals = localStorage.getItem("deals")

        if (deals === null || oldWeek !== thisWeek) {
            const toLocalStorage = JSON.stringify(generateMeals());
            localStorage.setItem("deals",toLocalStorage);
            localStorage.setItem("weeknumber", thisWeek);
            setRandomMeals(generateMeals());
        } else {
            setRandomMeals(JSON.parse(deals));
        }
    }

    useEffect(() => {
        displayMeals();
    }, []);

    return (
        <section className="meals-section snaps-inline">
            {randomMeals && randomMeals.map((menuItem, index) => (
                <div className="meals-card" key={index}>
                    <img
                        src={menuItem.image}
                        alt={`image of ${menuItem.name}`}
                        className="meals-img"
                    />
                    <div className="meals-text">
                        <p>{menuItem.name}</p>
                        <div className="deal-prices">
                            <p className="dealmeals-price-old">{menuItem.price} :-</p>
                            <p className="dealmeals-price">{Math.round(menuItem.price * 0.70)} :-</p>
                        </div>
                    </div>
                    <button className="meals-btn">
                        Add to cart <BsCart3 className="btn-icon" />
                    </button>
                </div>
            ))}
        </section>
    );
}