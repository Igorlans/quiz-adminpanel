import { TfiTimer } from "react-icons/tfi";
import { AiOutlineStar } from "react-icons/ai";
import { MdOutlineCategory } from "react-icons/md";
import classes from "./questionItem.module.scss";
import { questionTypes } from "../../../utils/questionTypes.js";

const QuestionItem = ({ question, setActiveQuestion }) => {
    return (
        <div
            onClick={() => setActiveQuestion(question)}
            className={classes.questionItem}
        >
            <div className={classes.type}>{questionTypes[question.type]}</div>
            <div className={classes.text}>{question.text}</div>
            <div className={classes.info}>
                <div className={classes.info_item}>
                    <AiOutlineStar size={20} color={"#586c89"} />
                    {question.points}
                </div>
                {question?.category?.name && (
                    <div className={classes.info_item}>
                        <MdOutlineCategory size={20} color={"#586c89"} />
                        {question?.category?.name}
                    </div>
                )}

                <div className={classes.info_item}>
                    <TfiTimer size={20} color={"#586c89"} />
                    {question.time}
                </div>
            </div>
        </div>
    );
};

export default QuestionItem;
