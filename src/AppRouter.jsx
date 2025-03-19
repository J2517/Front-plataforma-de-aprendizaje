import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserPage from "./pages/UserPage.jsx";
import CoursesPage from "./pages/coursesPage.jsx";
import CategoriesPage from "./pages/categoriesPage.jsx";
import ContentPage from "./pages/contentPage.jsx";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/users" element={<UserPage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/content" element={<ContentPage />} />
                <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
