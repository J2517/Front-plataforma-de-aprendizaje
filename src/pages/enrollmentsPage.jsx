// src/pages/enrollmentsPage.jsx
import React from "react";
import MyCoursesTable from "../components/myCoursesTable.jsx";
import RegisterCourse from "../components/registerCourse.jsx";

const EnrollmentsPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-green-50 to-blue-50 py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Gestión de Inscripciones</h1>
                <RegisterCourse />
                <MyCoursesTable />
            </div>
        </div>
    );
};

export default EnrollmentsPage;
