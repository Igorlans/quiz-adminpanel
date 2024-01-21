import ConnectionsAnswers from "./ConnectionsAnswers.jsx";
import SortAnswers from "./SortAnswers.jsx";
import SelectAnswers from "./SelectAnswers.jsx";
import RemoveAnswers from "./RemoveAnswers.jsx";
import RangeAnswers from "./RangeAnswers.jsx";
import classes from "./answers.module.scss";

const Answers = ({ question }) => {
    const renderAnswers = () => {
        switch (question?.type) {
            case "connections":
                return <ConnectionsAnswers question={question} />;
            case "range":
                return <RangeAnswers question={question} />;
            case "remove":
                return <RemoveAnswers question={question} />;
            case "select":
                return <SelectAnswers question={question} />;
            case "sort":
                return <SortAnswers question={question} />;
            default:
                return null;
        }
    };
    return (
        <div>
            <div className={classes.title}>Відповіді</div>
            {renderAnswers()}
        </div>
    );
};

export default Answers;
