import { Button, FormLabel } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchemaRemove } from "../../../validation/QuestionFormSchema.js";
import Input from "../../../components/UI/Input/Input.jsx";
import { useNavigate } from "react-router";
import classes from "./removeForm.module.scss";
import { QuestionsService } from "../../../services/FirebaseService.js";
import toast from "react-hot-toast";
import { useState } from "react";
import RemoveOptionsList from "./RemoveOptionsList/RemoveOptionsList.jsx";

const RemoveForm = () => {
    const navigate = useNavigate();

    const methods = useForm({
        mode: "onBlur",
        resolver: yupResolver(formSchemaRemove),
        defaultValues: {
            text: "",
            time: "",
            points: "",
        },
    });

    const [options, setOptions] = useState([]);

    console.log(methods.watch());

    const submitHandler = async (data) => {
        try {
            const formattedOptions = options?.map((option) => {
                const formattedData = option?.data?.map((item) => ({
                    value: item.value,
                    correct: item.correct,
                }));
                return { data: formattedData };
            });

            const formData = {
                text: data.text,
                time: Number(data.time),
                points: Number(data.points),
                type: "remove",
                createdAt: Date.now(),
                options: formattedOptions,
            };

            console.log("FORM DATA", formData);

            await QuestionsService.create(formData);
            toast.success("Питання створено");
            navigate("/questions");
        } catch (e) {
            console.error(e);
            toast.error(e.message);
        }
    };

    return (
        <FormProvider {...methods}>
            <form className={classes.form}>
                <div className={classes.info}>
                    <FormLabel>Інформація про питання</FormLabel>
                    <Input
                        className={classes.input}
                        control={methods.control}
                        error={methods.formState?.errors["text"]?.message}
                        name={"text"}
                        label={"Питання"}
                    />
                    <Input
                        className={classes.input}
                        control={methods.control}
                        error={methods.formState?.errors["time"]?.message}
                        name={"time"}
                        label={"Час"}
                        type={"number"}
                    />
                    <Input
                        className={classes.input}
                        control={methods.control}
                        error={methods.formState?.errors["points"]?.message}
                        name={"points"}
                        label={"Бали"}
                        type={"number"}
                    />
                </div>

                <RemoveOptionsList options={options} setOptions={setOptions} />
            </form>
            <Button
                style={{
                    borderRadius: 16,
                    alignSelf: "flex-end",
                    marginTop: 15,
                }}
                color={"secondary"}
                type={"submit"}
                variant={"contained"}
                onClick={methods.handleSubmit(submitHandler)}
            >
                Створити
            </Button>
        </FormProvider>
    );
};

export default RemoveForm;
