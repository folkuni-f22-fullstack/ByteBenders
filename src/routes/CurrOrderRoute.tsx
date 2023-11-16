import CurrentOrderCard from "../components/CurrentOrdersCard";
import '../styles/OrderCards.css'

export default function CurrOrderRoute() {
    return (
        <>
            <br />
            <div className="order-route-header">
                <div className="order-page-employee">
                    <h1> Current Orders </h1>
                    <br />
                </div>
            </div>
            <CurrentOrderCard />
        </>
    );
}
