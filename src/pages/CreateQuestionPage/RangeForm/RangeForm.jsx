import React, { useEffect, useState } from "react";
import { Button, FormLabel } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchemaRange } from "../../../validation/QuestionFormSchema.js";
import Input from "../../../components/UI/Input/Input.jsx";
import { useNavigate } from "react-router";
import classes from "./rangeForm.module.scss";
import { QuestionsService } from "../../../services/FirebaseService.js";
import toast from "react-hot-toast";

const SelectForm = () => {
    const navigate = useNavigate();

    const methods = useForm({
        mode: "onBlur",
        resolver: yupResolver(formSchemaRange),
        defaultValues: {
            text: "",
            time: "",
            points: "",
            min: "",
            max: "",
            correctAnswer: "",
        },
    });

    console.log(methods.watch());

    const submitHandler = async (data) => {
        try {
            console.log(data);
            const formData = {
                ...data,
                time: Number(data.time),
                points: Number(data.points),
                min: Number(data.min),
                max: Number(data.max),
                correctAnswer: Number(data.correctAnswer),
                createdAt: Date.now(),
                type: "range",
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
                    <div style={{ display: "flex", gap: 10 }}>
                        <Input
                            className={classes.input}
                            sx={{ width: 200 }}
                            control={methods.control}
                            onChangeTrigger={() => methods.trigger()}
                            error={methods.formState?.errors["min"]?.message}
                            name={"min"}
                            label={"MIN"}
                            type={"number"}
                        />
                        <Input
                            sx={{ width: 200 }}
                            className={classes.input}
                            control={methods.control}
                            onChangeTrigger={() => methods.trigger()}
                            error={
                                methods.formState?.errors["correctAnswer"]
                                    ?.message
                            }
                            name={"correctAnswer"}
                            label={"Правильно"}
                            type={"number"}
                        />
                        <Input
                            sx={{ width: 200 }}
                            className={classes.input}
                            control={methods.control}
                            onChangeTrigger={() => methods.trigger()}
                            error={methods.formState?.errors["max"]?.message}
                            name={"max"}
                            label={"MAX"}
                            type={"number"}
                        />
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
