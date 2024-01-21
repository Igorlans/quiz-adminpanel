import React from "react";
import ConnectionsVariantItem from "../../../../CreateQuestionPage/ConnectionsForm/ConnectionsVariantItem.jsx";

const ConnectionsAnswers = ({ question }) => {
    const variants = Object.values(
        [...question?.answer?.options, ...question?.question?.options].reduce(
            (acc, curr) => {
                const key = curr.key;
                const value = curr.value;

                if (curr.type === "question") {
                    acc[key] = { ...acc[key], question: value };
                } else if (curr.type === "answer") {
                    acc[key] = { ...acc[key], answer: value };
                }

                return acc;
            },
            {}
        )
    );

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>{question?.question?.title}</div>
                <div>{question?.answer?.title}</div>
            </div>
            <div>
                {variants?.map((variant) => (
                    <ConnectionsVariantItem
                        key={variant?.answer}
                        variant={variant}
                        disabled
                    />
                ))}
            </div>
        </div>
    );
};

export default ConnectionsAnswers;
