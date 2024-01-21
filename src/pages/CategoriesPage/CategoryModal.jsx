import classes from "../QuestionPage/QuestionItem/QuestionModal/questionModal.module.scss";
import { MdOutlineClose } from "react-icons/md";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import {
    CategoriesService,
    QuestionsService,
} from "../../services/FirebaseService.js";
import Modal from "../../components/UI/Modal/Modal.jsx";

export default function CategoryModal({ category, onClose, setCategories }) {
    const handleDelete = async () => {
        try {
            const deleteRequest = async () => {
                await CategoriesService.delete(category.id);
                await QuestionsService.deleteMany([
                    "category",
                    "==",
                    category?.id,
                ]);
            };

            await toast.promise(deleteRequest(), {
                loading: `Видалення категорії...`,
                success: () => {
                    setCategories((prev) => {
                        return prev?.filter((cat) => cat?.id !== category.id);
                    });
                    onClose();
                    return `Категорія видалена`;
                },
                error: `Помилка видалення`,
            });
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <Modal onClose={onClose} isOpen={category}>
            <div className={classes.questionModal}>
                <div className={classes.header} style={{ flex: 1 }}>
                    <div className={classes.title}>{category?.name}</div>
                    <div onClick={onClose} className={classes.close}>
                        <MdOutlineClose size={24} />
                    </div>
                </div>

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
