import { useEffect, useMemo, useState } from "react";
import SearchInput from "../../components/SearchInput/SearchInput.jsx";
import { Button, Skeleton, Tab, Tabs } from "@mui/material";
import classes from "./questionPage.module.scss";
import { useNavigate } from "react-router";
import QuestionItem from "./QuestionItem/QuestionItem.jsx";
import { useSearch } from "../../hooks/useSearch.js";
import QuestionModal from "./QuestionItem/QuestionModal/QuestionModal.jsx";
import {
    CategoriesService,
    QuestionsService,
} from "../../services/FirebaseService.js";

const QuestionPage = () => {
    const [search, setSearch] = useState("");
    const [questions, setQuestions] = useState([]);
    const [type, setType] = useState(null);
    const searchedQuestions = useSearch(questions, search, "text");
    const navigate = useNavigate();
    const [activeQuestion, setActiveQuestion] = useState(null);

    const getQuestions = async () => {
        const questions = await QuestionsService.getMany({
            joinOptions: {
                joinField: "category",
                joinService: CategoriesService,
            },
        });
        console.log(questions);
        setQuestions(questions);
    };

    const filteteredAndSearchedQuestions = useMemo(() => {
        return searchedQuestions?.filter((question) => {
            if (!type) return true;
            return question?.type === type;
        });
    }, [searchedQuestions, type]);

    const handleChange = (event, newValue) => {
        setType(newValue);
    };

    useEffect(() => {
        getQuestions();
    }, []);

    return (
        <div className={classes.questionPage}>
            <h1 className={classes.title}>База питань</h1>
            <div className={classes.header}>
                <SearchInput search={search} setSearch={setSearch} />
                <Button
                    style={{ borderRadius: 16 }}
                    color={"secondary"}
                    onClick={() => navigate("/questions/create/select")}
                    variant={"contained"}
                >
                    Створити питання
                </Button>
            </div>
            <QuestionModal
                setQuestions={setQuestions}
                question={activeQuestion}
                onClose={() => setActiveQuestion(null)}
            />
            <Tabs
                style={{ marginTop: 40 }}
                value={type}
                textColor={"secondary"}
                indicatorColor={"secondary"}
                onChange={handleChange}
            >
                <Tab label={"Усі"} value={null} />
                <Tab label={"Вибрати відповідь"} value={"select"} />
                <Tab label={"Вгадай число"} value={"range"} />
                <Tab label={"Сортування"} value={"sort"} />
                <Tab label={"Прибрати зайве"} value={"remove"} />
                <Tab label={"Зв'язки"} value={"connections"} />
            </Tabs>

            {questions?.length ? (
                <div className={classes.questionList}>
                    {filteteredAndSearchedQuestions?.map((question) => (
                        <QuestionItem
                            key={question.id}
                            question={question}
                            setActiveQuestion={setActiveQuestion}
                        />
                    ))}
                </div>
            ) : (
                <div className={classes.questionList}>
                    {[...Array(10)]?.map((skeleton, index) => (
                        <Skeleton
                            key={index}
                            height={200}
                            variant={"rounded"}
                            color={"#9f9d9d"}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default QuestionPage;
