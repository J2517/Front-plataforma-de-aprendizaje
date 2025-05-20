// src/pages/paymentsPage.jsx
import React from "react";
import RegisterPayment from "../components/registerPayment.jsx";
import PaymentsTable from "../components/paymentsTable.jsx";

const PaymentsPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-yellow-50 to-orange-50 py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Gestión de Pagos</h1>
                <RegisterPayment />
                <PaymentsTable />
            </div>
        </div>
    );
};

export default PaymentsPage;
