import React, { useState } from "react";
import { useCode } from "../contexts/CodeContext";
import { usePayment } from "../contexts/PaymentContext";
import CodeComponent from "./CodeComponent";
import ModalComponent from './ModalComponent';

import "../styles/components/PaymentComponent.scss";

const PaymentComponent: React.FC = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { addPayment, payments } = usePayment();
  const { code, grid } = useCode();
  const [selectedGrid, setSelectedGrid] = useState<string[][] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const amountNumber = parseFloat(amount);

    //Rudimental validation
    if (name.trim() === "" || isNaN(amountNumber)) {
      alert("Please enter valid data");
      return;
    }

    const newPayment = {
      name,
      amount: amountNumber,
      code: code,
      grid: grid,
    };

    addPayment(newPayment);

    setName("");
    setAmount("");

  };

  const openModal = (grid: string[][]): void => {
    setSelectedGrid(grid);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setSelectedGrid(null);
    setIsModalOpen(false);
  };
  return (
    <div>
      <CodeComponent code={code} />
      <form className="payment" onSubmit={handleSubmit}>
        <div className="payment-input">
          <span>Payment</span>
          <input
            type="text"
            placeholder="Payment"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="payment-input">
          <span>Amount</span>
          <input
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button type="submit">+ ADD</button>
      </form>
      <div className="payment-list">
        <div className="title">Payment List</div>
        {payments.length > 0 ? (
          <div className="payment-list-table">
            <div className="table-head">
              <div className="tn">Name</div>
              <div>Amount</div>
              <div>Code</div>
              <div>Grid</div>
            </div>
            <div className="table-body">
              {payments.map((payment, index) => (
                <div className="row" key={index}>
                  <div className="tn">{payment.name}</div>
                  <div>{payment.amount}</div>
                  <div>{payment.code}</div>
                  <div className="modal-button" onClick={() => openModal(payment.grid)}>view</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No payments available.</p>
        )}
        <ModalComponent isOpen={isModalOpen} onClose={closeModal}>
        {selectedGrid && (
          <table>
            {selectedGrid.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((char, colIndex) => (
                  <td key={colIndex}>{char}</td>
                ))}
              </tr>
            ))}
          </table>
        )}
      </ModalComponent>
      </div>
    </div>
  );
};

export default PaymentComponent;
