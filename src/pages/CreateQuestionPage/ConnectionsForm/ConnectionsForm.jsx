import { Button, FormLabel } from "@mui/material";
import { AiOutlinePlusCircle } from "react-icons/ai";
import classes from "./connectionsForm.module.scss";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchemaConnections } from "../../../validation/QuestionFormSchema.js";
import Input from "../../../components/UI/Input/Input.jsx";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useState } from "react";
import ConnectionsVariantForm from "./ConnectionsVariantForm.jsx";
import ConnectionsVariantItem from "./ConnectionsVariantItem.jsx";
import { QuestionsService } from "../../../services/FirebaseService.js";

const ConnectionsForm = () => {
    const [variants, setVariants] = useState([]);
    const [variantFormVisible, setVariantFormVisible] = useState(false);
    const navigate = useNavigate();

    const methods = useForm({
        mode: "onBlur",
        resolver: yupResolver(formSchemaConnections),
        defaultValues: {
            text: "",
            time: "",
            points: "",
            answer: "",
            question: "",
        },
    });

    console.log(methods.watch());

    const submitHandler = async (data) => {
        try {
            const answerArr = [];
            const questionArr = [];

            variants.forEach((variant, index) => {
                const answer = {
                    key: String(index),
                    type: "answer",
                    value: variant.answer,
                };
                const question = {
                    key: String(index),
                    type: "question",
                    value: variant.question,
                };
                answerArr.push(answer);
                questionArr.push(question);
            });

            const formData = {
                text: data.text,
                time: Number(data.time),
                points: Number(data.points),
                type: "connections",
                createdAt: Date.now(),
                answer: { title: data.answer, options: answerArr },
                question: { title: data.question, options: questionArr },
            };
            console.log("FORMDATA", formData);
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
            <ConnectionsVariantForm
                open={variantFormVisible}
                onClose={() => setVariantFormVisible(false)}
                variants={variants}
                setVariants={setVariants}
            />
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
                <div className={classes.variants}>
                    <div className={classes.variants_header}>
                        <FormLabel>Варіанти відповіді</FormLabel>
                        <AiOutlinePlusCircle
                            onClick={() => {
                                setVariantFormVisible(true);
                            }}
                            color={"#586c89"}
                            style={{ cursor: "pointer" }}
                            size={"1.6em"}
                        />
                    </div>
                    <div className={classes.items}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                            }}
                        >
                            <Input
                                className={classes.input}
                                control={methods.control}
                                error={
                                    methods.formState?.errors["question"]
                                        ?.message
                                }
                                name={"question"}
                                label={"Питання"}
                            />
                            <Input
                                className={classes.input}
                                control={methods.control}
                                error={
                                    methods.formState?.errors["answer"]?.message
                                }
                                name={"answer"}
                                label={"Відповідь"}
                            />
                        </div>
                        {variants?.map((variant) => (
                            <ConnectionsVariantItem
                                key={variant.id}
                                variants={variants}
                                setVariants={setVariants}
                                variant={variant}
                            />
                        ))}
                    </div>
                </div>
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

export default ConnectionsForm;
