import React, { useEffect, useState } from "react";
import { Button, FormLabel } from "@mui/material";
import { AiOutlinePlusCircle } from "react-icons/ai";
import classes from "./sortForm.module.scss";
import VariantItem from "../VariantItem/VariantItem.jsx";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    formSchemaSort,
    questionFormSchema,
} from "../../../validation/QuestionFormSchema.js";
import Input from "../../../components/UI/Input/Input.jsx";
import { useNavigate } from "react-router";
import { QuestionsService } from "../../../services/FirebaseService.js";
import toast from "react-hot-toast";
import SortItemForm from "./SortItemForm/SortItemForm.jsx";
import SortItem from "./SortItem.jsx";

const SortForm = () => {
    const [variants1, setVariants1] = useState([]);
    const [variants2, setVariants2] = useState([]);
    const [variantFormVisible1, setVariantFormVisible1] = useState(false);
    const [variantFormVisible2, setVariantFormVisible2] = useState(false);
    const navigate = useNavigate();

    const methods = useForm({
        mode: "onBlur",
        resolver: yupResolver(formSchemaSort),
        defaultValues: {
            text: "",
            time: "",
            points: "",
            option1: "",
            option2: "",
        },
    });

    console.log(methods.watch());

    const submitHandler = async (data) => {
        try {
            if (!variants1?.length || !variants2?.length)
                return toast.error("Створіть варіанти сортування");
            const formData = {
                text: data.text,
                time: Number(data.time),
                points: Number(data.points),
                type: "sort",
                createdAt: Date.now(),
                options: [data.option1, data.option2],
                subjects: [
                    ...variants1?.map((variant) => ({
                        name: variant.name,
                        expected: data.option1,
                    })),
                    ...variants2?.map((variant) => ({
                        name: variant.name,
                        expected: data.option2,
                    })),
                ],
            };
            const docs = await QuestionsService.create(formData);
            toast.success("Питання створено");
            navigate("/questions");
        } catch (e) {
            console.error(e);
            toast.error(e.message);
        }
    };

    return (
        <FormProvider {...methods}>
            <SortItemForm
                open={variantFormVisible1}
                onClose={() => setVariantFormVisible1(false)}
                variants={variants1}
                setVariants={setVariants1}
            />
            <SortItemForm
                open={variantFormVisible2}
                onClose={() => setVariantFormVisible2(false)}
                variants={variants2}
                setVariants={setVariants2}
            />
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

            <FormLabel style={{ display: "block", margin: "30px 0 20px" }}>
                Варіанти сортування
            </FormLabel>
            <div className={classes.variants}>
                <div>
                    <div className={classes.variants_header}>
                        <Input
                            name={"option1"}
                            label={"Опція 1"}
                            control={methods.control}
                            error={
                                methods.formState?.errors?.["option1"]?.message
                            }
                        />
                        <AiOutlinePlusCircle
                            onClick={() => {
                                setVariantFormVisible1(true);
                            }}
                            color={"#586c89"}
                            style={{ cursor: "pointer" }}
                            size={"1.6em"}
                        />
                    </div>
                    <div className={classes.items}>
                        {variants1?.map((variant) => (
                            <SortItem
                                variants={variants1}
                                setVariants={setVariants1}
                                variant={variant}
                                key={variant.id}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <div className={classes.variants_header}>
                        <Input
                            name={"option2"}
                            label={"Опція 2"}
                            control={methods.control}
                            error={
                                methods.formState?.errors?.["option2"]?.message
                            }
                        />
                        <AiOutlinePlusCircle
                            onClick={() => {
                                setVariantFormVisible2(true);
                            }}
                            color={"#586c89"}
                            style={{ cursor: "pointer" }}
                            size={"1.6em"}
                        />
                    </div>
                    <div className={classes.items}>
                        {variants2?.map((variant) => (
                            <SortItem
                                variants={variants2}
                                setVariants={setVariants2}
                                variant={variant}
                                key={variant.id}
                            />
                        ))}
                    </div>
                </div>
            </div>

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

export default SortForm;
