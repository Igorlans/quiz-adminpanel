import classes from "./answers.module.scss";
import VariantItem from "../../../../CreateQuestionPage/VariantItem/VariantItem.jsx";

const SelectAnswers = ({ question }) => {
    return (
        <div className={classes.selectAnswers}>
            {question?.options?.map((variant) => (
                <VariantItem key={variant?.value} variant={variant} disabled />
            ))}
        </div>
    );
};

export default SelectAnswers;
