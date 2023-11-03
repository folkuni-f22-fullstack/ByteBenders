import "../styles/categories.css"
import data from '../data/menu.json'
import { useState } from "react"

const Categories = () => {
    const [selectedCategory, setSelectedCartegory] = useState('')
    // console.log(data);

    const filteredItems = data.filter(item => item.category === selectedCategory)

    return (
        <section className="category-section">
            <section className="category-text-section">
                <h4 className="category-header">Categories</h4>
                <p className="category-text">Select a category to explore our menu items</p>
            </section>
            <section className="category-button-section">
                <button onClick={() => setSelectedCartegory('meals')} className="category-button">Meals</button>
                <button onClick={() => setSelectedCartegory('sides')} className="category-button">Sides</button>
                <button onClick={() => setSelectedCartegory('drinks')} className="category-button">Drinks</button>
            </section>
            <section className="render-filteredfood-section">
                {filteredItems.map(item => (
                    <div key={item.id}>
                        {item.name} {item.price}:-
                    </div>
                ))}
            </section>
        </section>
    )
}

export default Categories