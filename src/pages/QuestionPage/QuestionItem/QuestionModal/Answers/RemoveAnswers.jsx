import React from "react";
import VariantItem from "../../../../CreateQuestionPage/VariantItem/VariantItem.jsx";

const RemoveAnswers = ({ question }) => {
    return (
        <div>
            <div>
                {question?.options?.map((option, index) => (
                    <div key={index}>
                        <div>{index + 1}</div>
                        <div>
                            {option?.data?.map((variant) => (
                                <VariantItem
                                    key={variant?.value}
                                    variant={variant}
                                    disabled
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RemoveAnswers;
