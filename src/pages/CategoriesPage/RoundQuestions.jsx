import React, { useState } from "react";
import { Drawer } from "@mui/material";
import { PageTitle } from "../CreateGamePage/GameForm.jsx";
import QuestionModal from "../QuestionPage/QuestionItem/QuestionModal/QuestionModal.jsx";
import styled from "styled-components";
import QuestionItem from "../QuestionPage/QuestionItem/QuestionItem.jsx";

const RoundQuestions = ({isOpen, onClose, questions}) => {

    const [activeQuestion, setActiveQuestion] = useState(null);

    return (
        <Drawer
            style={{zIndex: 2334}}
            open={isOpen}
            anchor={'right'}
            onClose={onClose}
            PaperProps={{
                style: {padding: 30, minWidth: 800}
            }}
        >
            <QuestionModal
                question={activeQuestion}
                onClose={() => setActiveQuestion(null)}
            />
            <PageTitle>Питання раунду</PageTitle>
            <QuestionList>
                {questions?.map(question =>
                    <QuestionItem setActiveQuestion={setActiveQuestion} question={question} />
                )}
            </QuestionList>
        </Drawer>
    );
};

const QuestionList = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`

export default RoundQuestions;