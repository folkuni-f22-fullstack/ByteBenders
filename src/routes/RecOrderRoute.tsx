import RecievedOrderCard from "../components/RecievedOrderCard";
import "../styles/OrderCards.css";
import { BiSolidPencil } from "react-icons/bi";

export default function RecOrderRoute() {
  return (
    <>
      <div className="order-route-header">
        <div className="order-page-employee">
          <h1 className="employee-h1">
            {" "}
            Received Orders <BiSolidPencil className="employee-icon" />{" "}
          </h1>
        </div>
      </div>
      <RecievedOrderCard />
    </>
  );
}
