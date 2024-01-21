import React, { useEffect, useState } from "react";
import { Button, FormLabel, InputLabel, TextField } from "@mui/material";
import { AiOutlinePlusCircle } from "react-icons/ai";
import classes from "./selectForm.module.scss";
import VariantItem from "../VariantItem/VariantItem.jsx";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { questionFormSchema } from "../../../validation/QuestionFormSchema.js";
import Input from "../../../components/UI/Input/Input.jsx";
import VariantForm from "../VariantForm/VariantForm.jsx";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import Select from "../../../components/UI/Select/Select.jsx";
import {
    CategoriesService,
    QuestionsService,
} from "../../../services/FirebaseService.js";

const SelectForm = () => {
    const [categories, setCategories] = useState([]);
    const [variants, setVariants] = useState([]);
    const [variantFormVisible, setVariantFormVisible] = useState(false);
    const navigate = useNavigate();

    const methods = useForm({
        mode: "onBlur",
        resolver: yupResolver(questionFormSchema),
        defaultValues: {
            text: "",
            time: "",
            points: "",
            category: "",
        },
    });

    console.log(methods.watch());

    const getCategories = async () => {
        const categories = await CategoriesService.getMany({
            orderBy: ["name", "asc"],
        });
        const categoryOptions = categories?.map((category) => ({
            label: category.name,
            value: category.id,
        }));
        setCategories(categoryOptions);
        methods.setValue("category", categoryOptions?.[0]?.value);
    };
    useEffect(() => {
        getCategories();
    }, []);

    const submitHandler = async (data) => {
        try {
            const formData = {
                ...data,
                time: Number(data.time),
                points: Number(data.points),
                type: "select",
                createdAt: Date.now(),
                options: variants?.map((variant) => ({
                    value: variant.value,
                    correct: variant.correct,
                })),
            };
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
            <VariantForm
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
                    <Select
                        size={"small"}
                        sx={{ width: 200 }}
                        label={"Категорія"}
                        control={methods.control}
                        name={"category"}
                        options={categories}
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
                        {variants?.map((variant) => (
                            <VariantItem
                                variants={variants}
                                setVariants={setVariants}
                                variant={variant}
                                key={variant.id}
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

export default SelectForm;
