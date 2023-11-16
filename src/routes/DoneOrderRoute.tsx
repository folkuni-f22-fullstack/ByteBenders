import DoneOrderCard from "../components/DoneOrderCard";
import '../styles/OrderCards.css'

export default function DoneOrderRoute() {
    return (
        <>
            {/* // TODO : Ska header brukas istället för h1?*/}
            {/* <h1 className="order-logotype">Fish & Friends</h1>
            <br />
            <div className="order-route-header">
                <div className="order-page-employee">
                    <h1> Done Orders </h1>
                    <br />
                </div>
            </div> */}
            <DoneOrderCard />
        </>
    );
}
