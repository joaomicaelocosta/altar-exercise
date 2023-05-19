import React, { createContext, useState, useContext, useEffect } from "react";

interface Payment {
  name: string;
  amount: number;
  code: string;
  grid: string[][];
}

interface PaymentContextType {
  payments: Payment[];
  addPayment: (payment: Payment) => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
};

export const PaymentProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [payments, setPayments] = useState<Payment[]>([]);

  // Load payments from localstorage
  useEffect(() => {
    const storedPayments = localStorage.getItem("payments");
    if (storedPayments) {
      setPayments(JSON.parse(storedPayments));
    }
  }, []);

  // Add new payment to payment list and save it in localstorage
  const addPayment = (payment: Payment) => {
    setPayments((prevPayments) => [...prevPayments, payment]);
    localStorage.setItem("payments", JSON.stringify([...payments, payment]));
  };

  const paymentContextType: PaymentContextType = {
    payments,
    addPayment,
  };

  return (
    <PaymentContext.Provider value={paymentContextType}>
      {children}
    </PaymentContext.Provider>
  );
};
