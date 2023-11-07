import RecievedOrderCard from "../components/RecievedOrderCard";
import '../styles/OrderCards.css'

export default function RecOrderRoute() {
    // TODO: Saknas komponent
    return (
        <>
            {/* // TODO : Addera class för logotypen */}
            <h1 className="order-logotype">Fish & Friends</h1>
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
