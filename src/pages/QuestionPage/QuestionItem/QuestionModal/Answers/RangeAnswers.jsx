import classes from "./answers.module.scss";

const RangeAnswers = ({ question }) => {
    return (
        <div className={classes.rangeAnswers}>
            <div>
                <span>MIN — </span>
                {question?.min}
            </div>
            <div>
                <span>Правильно — </span>
                {question?.correctAnswer}
            </div>
            <div>
                <span>MAX — </span>
                {question?.max}
            </div>
        </div>
    );
};

export default RangeAnswers;
