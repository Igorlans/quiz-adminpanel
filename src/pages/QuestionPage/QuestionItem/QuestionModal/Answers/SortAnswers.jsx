import { useMemo } from "react";
import SortItem from "../../../../CreateQuestionPage/SortForm/SortItem.jsx";

const SortAnswers = ({ question }) => {
    const option1Variants = useMemo(() => {
        const optionName = question?.options[0];
        return question?.subjects?.filter(
            (option) => option?.expected === optionName
        );
    }, []);
    const option2Variants = useMemo(() => {
        const optionName = question?.options[1];
        return question?.subjects?.filter(
            (option) => option?.expected === optionName
        );
    }, []);

    console.log("optionVariants1", option1Variants);
    console.log("optionVariants2", option2Variants);
    console.log(question?.options);
    return (
        <div>
            <div>
                <div>{question?.options?.[0]}</div>
                <div>
                    {option1Variants?.map((variant) => (
                        <SortItem
                            key={variant?.name}
                            variant={variant}
                            disabled
                        />
                    ))}
                </div>
            </div>
            <div>
                <div>{question?.options?.[1]}</div>
                <div>
                    {option2Variants?.map((variant) => (
                        <SortItem
                            key={variant?.name}
                            variant={variant}
                            disabled
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SortAnswers;
