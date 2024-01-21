import { Navigate, Route, Routes } from "react-router";
import Layout from "./Layout/Layout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import QuestionPage from "../pages/QuestionPage/QuestionPage.jsx";
import GamesPage from "../pages/GamesPage/GamesPage.jsx";
import CreateQuestionPage from "../pages/CreateQuestionPage/CreateQuestionPage.jsx";
import SortForm from "../pages/CreateQuestionPage/SortForm/SortForm.jsx";
import RangeForm from "../pages/CreateQuestionPage/RangeForm/RangeForm.jsx";
import SelectForm from "../pages/CreateQuestionPage/SelectForm/SelectForm.jsx";
import RemoveForm from "../pages/CreateQuestionPage/RemoveForm/RemoveForm.jsx";
import ConnectionsForm from "../pages/CreateQuestionPage/ConnectionsForm/ConnectionsForm.jsx";
import CategoriesPage from "../pages/CategoriesPage/CategoriesPage.jsx";
import CreateGamePage from "../pages/CreateGamePage/CreateGamePage.jsx";
import UpdateGamePage from "../pages/CreateGamePage/UpdateGamePage.jsx";

const Router = () => {
    return (
        <>
            <Routes>
                {/* Public routes */}
                {/*<Route index path='/login' element={<LoginPage />}/>*/}

                {/* Private routes */}
                {/*<Route element={<PrivateRoutes />}>*/}
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Navigate to={"questions"} />} />
                    <Route path="/questions" element={<QuestionPage />} />
                    <Route
                        path="/questions/create"
                        element={<CreateQuestionPage />}
                    >
                        <Route index path="select" element={<SelectForm />} />
                        <Route path="range" element={<RangeForm />} />
                        <Route path="sort" element={<SortForm />} />
                        <Route path="remove" element={<RemoveForm />} />
                        <Route
                            path="connections"
                            element={<ConnectionsForm />}
                        />
                    </Route>
                    <Route path="/games" element={<GamesPage />} />
                    <Route
                        path="/games/create"
                        element={<CreateGamePage />}
                    />
                    <Route
                        path="/games/:id"
                        element={<UpdateGamePage />}
                    />
                    <Route path="/categories" element={<CategoriesPage />} />
                    <Route path="/error" element={<ErrorPage />} />
                </Route>
                <Route path="*" element={<Navigate to={"error"} />} />
                {/*</Route>*/}
            </Routes>
        </>
    );
};

export default Router;
