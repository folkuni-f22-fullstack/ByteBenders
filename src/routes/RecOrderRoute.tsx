import RecievedOrderCard from "../components/RecievedOrderCard";
import '../styles/OrderCards.css'

export default function RecOrderRoute() {
    return (
        <>
            <div className="order-route-header">
                <div className="order-page-employee">
                    <h1> Received Orders </h1>
                </div>
            </div>
            <RecievedOrderCard />
        </>
    );
}
