import { Button, Drawer } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/UI/Input/Input.jsx";
import { categoryFormSchema } from "../../validation/QuestionFormSchema.js";
import toast from "react-hot-toast";
import { CategoriesService } from "../../services/FirebaseService.js";

const CategoryForm = ({ open, onClose, setCategories }) => {
    const methods = useForm({
        mode: "onBlur",
        defaultValues: {
            name: "",
        },
        resolver: yupResolver(categoryFormSchema),
    });
    const submitHandler = async (data) => {
        try {
            await toast.promise(CategoriesService.create(data), {
                loading: "Створення категорії...",
                success: (newCategory) => {
                    setCategories((prev) => {
                        return [newCategory, ...prev];
                    });
                    methods.reset();
                    onClose();
                    return "Категорія створена";
                },
                error: "Помилка створення категорії",
            });
        } catch (e) {
            console.error(e);
        }
    };

    console.log("VALUES", methods.watch());

    return (
        <Drawer
            style={{ zIndex: 2334 }}
            open={open}
            anchor={"right"}
            onClose={onClose}
            PaperProps={{
                style: { padding: 30, minWidth: 400 },
            }}
        >
            <form style={{ display: "flex", flexDirection: "column" }}>
                <div
                    style={{ fontSize: 24, fontWeight: 700, marginBottom: 50 }}
                >
                    Створити категорію
                </div>
                <Input
                    control={methods.control}
                    error={methods.formState?.errors["name"]?.message}
                    name={"name"}
                    label={"Назва"}
                />

                <Button
                    onClick={methods.handleSubmit(submitHandler)}
                    style={{
                        borderRadius: 16,
                        alignSelf: "flex-end",
                        marginTop: 15,
                    }}
                    color={"secondary"}
                    type={"submit"}
                    variant={"contained"}
                >
                    Створити
                </Button>
            </form>
        </Drawer>
    );
};

export default CategoryForm;
