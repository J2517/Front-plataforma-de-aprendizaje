import React from 'react';
import CategoryTable from "../components/categoriesTable.jsx";

const CategoriesPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Gestión de Categorías</h1>
                <CategoryTable />
            </div>
        </div>
    );
};

export default CategoriesPage;