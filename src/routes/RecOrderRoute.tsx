import RecievedOrderCard from "../components/RecievedOrderCard";
import '../styles/OrderCards.css'

export default function RecOrderRoute() {
    return (
        <>
        <br />
            <div className="order-route-header">
                <div className="order-page-employee">
                    <h1> Recieved Orders </h1>
                    <br />
                </div>
            </div>
            <RecievedOrderCard />
        </>
    );
}
