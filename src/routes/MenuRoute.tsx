import DealsOfTheWeek from "../components/DealsOfTheWeek.tsx";
import Meals from "../components/Meals.jsx";

export default function MenuRoute() {
    return (
        <div className="MenuRoute">
            <DealsOfTheWeek />
            <Meals />
        </div>
    );
}
