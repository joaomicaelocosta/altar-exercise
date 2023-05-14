import React from "react";
import "../styles/components/App.scss";
import PaymentComponent from "../components/PaymentComponent";


const Payments: React.FC = () => {

  return (
      <div className="App-payment">
        <PaymentComponent/>
      </div>
  );
};

export default Payments;
