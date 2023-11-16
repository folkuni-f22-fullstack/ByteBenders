import RecievedOrderCard from "../components/RecievedOrderCard";
import '../styles/OrderCards.css'

export default function RecOrderRoute() {
    return (
        <>
            {/* // TODO : Ska header brukas istället för h1?
            <div className="order-route-header">
                <div className="order-page-employee">
                    <h1> Recieved Orders </h1>
                    <br />
                </div>
            </div> */}
            <RecievedOrderCard />
        </>
    );
}
