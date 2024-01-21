import Modal from "../../../../components/UI/Modal/Modal.jsx";
import classes from "./questionModal.module.scss";
import { MdOutlineCategory, MdOutlineClose } from "react-icons/md";
import { BsPatchQuestion } from "react-icons/bs";
import { questionTypes } from "../../../../utils/questionTypes.js";
import { AiOutlineStar } from "react-icons/ai";
import { TfiTimer } from "react-icons/tfi";
import Answers from "./Answers/Answers.jsx";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { QuestionsService } from "../../../../services/FirebaseService.js";

export default function QuestionModal({ question, onClose, setQuestions }) {
    const handleDelete = async () => {
        try {
            await toast.promise(QuestionsService.delete(question.id), {
                loading: `Видалення питання...`,
                success: () => {
                    setQuestions((prev) => {
                        return prev?.filter(
                            (quest) => quest?.id !== question.id
                        );
                    });
                    onClose();
                    return `Питання видалено`;
                },
                error: `Помилка видалення`,
            });
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <Modal onClose={onClose} isOpen={question}>
            <div className={classes.questionModal}>
                <div className={classes.header}>
                    <div className={classes.title}>
                        {questionTypes[question?.type]}
                    </div>
                    <div onClick={onClose} className={classes.close}>
                        <MdOutlineClose size={24} />
                    </div>
                </div>
                <div className={classes.info}>
                    <div className={classes.item}>
                        <div className={classes.icon}>
                            <BsPatchQuestion size={20} color={"#586c89"} />
                        </div>
                        {question?.text}
                    </div>
                    <div className={classes.item}>
                        <div className={classes.icon}>
                            <AiOutlineStar size={20} color={"#586c89"} />
                        </div>
                        {question?.points}
                    </div>
                    <div className={classes.item}>
                        <div className={classes.icon}>
                            <TfiTimer size={20} color={"#586c89"} />
                        </div>
                        {question?.time}
                    </div>
                    {question?.category?.name && (
                        <div className={classes.item}>
                            <MdOutlineCategory size={20} color={"#586c89"} />
                            {question?.category?.name}
                        </div>
                    )}
                </div>
                <Answers question={question} />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: 20,
                    }}
                >
                    <Button onClick={handleDelete} color={"error"}>
                        Видалити
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
