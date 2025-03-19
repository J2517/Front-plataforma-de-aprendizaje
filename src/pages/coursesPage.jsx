import React from 'react';
import CourseTable from "../components/coursesTable.jsx";

const CoursesPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Gestión de Cursos</h1>
                <CourseTable />
            </div>
        </div>
    );
};

export default CoursesPage;