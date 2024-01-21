import React from 'react';
import QuestionTypeNav from "../../components/QuestionTypeNav/QuestionTypeNav.jsx";
import {Outlet} from "react-router";
import classes from "./createQuestionPage.module.scss";

const CreateQuestionPage = () => {
    return (
        <div className={classes.createQuestionPage}>
            <h1 className={classes.title}>
                Створення питання
            </h1>
            <QuestionTypeNav />
            <Outlet />
        </div>
    );
};

export default CreateQuestionPage;