import DoneOrderCard from "../components/DoneOrderCard";
import '../styles/OrderCards.css'

export default function DoneOrderRoute() {
    return (
        <>
            <div className="order-route-header">
                <div className="order-page-employee">
                    <h1> Done Orders </h1>
                </div>
            </div>
            <DoneOrderCard />
        </>
    );
}
