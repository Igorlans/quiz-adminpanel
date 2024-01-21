import React from 'react';
import {Tab, Tabs} from "@mui/material";
import {NavLink, useLocation, useParams, useRoutes, useSearchParams} from "react-router-dom";
import classes from './questionTypeNav.module.scss';

const QuestionTypeNav = () => {

    const params = useParams();
    const location = useLocation();
    const type = location?.pathname?.split('/')?.[3];

    return (
        <>
            <h3 className={classes.title}>Тип питання</h3>
            <Tabs
                textColor={'secondary'}
                indicatorColor={'secondary'}
                value={
                    type !== '/'
                        ? type
                        : false
                }
            >
                <Tab label={'Вибрати відповідь'} value={'select'} component={NavLink} to={'select'} />
                <Tab label={'Вибрати число'} value={'range'} component={NavLink} to={'range'} />
                <Tab label={'Сортування'} value={'sort'} component={NavLink} to={'sort'} />
                <Tab label={'Прибрати зайве'} value={'remove'} component={NavLink} to={'remove'} />
                <Tab label={"Зв'язки"} value={'connections'} component={NavLink} to={'connections'} />
            </Tabs>
        </>

    );
};

export default QuestionTypeNav;