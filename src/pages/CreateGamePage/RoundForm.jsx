import React, { useEffect, useState } from "react";
import { Button, Drawer } from "@mui/material";
import { PageTitle, StyledInput } from "./CreateGamePage.jsx";
import { v4 as generateId } from "uuid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaTrash } from "react-icons/fa";
import styled from "styled-components";
import GreetingFields from "./GreetingFields.jsx";
import Select from "../../components/UI/Select/Select.jsx";
import toast from "react-hot-toast";
import { SheetsService } from "../../services/SheetsService.js";
import { roundValidationSchema } from "./RoundValidation.js";
import RoundQuestions from "../CategoriesPage/RoundQuestions.jsx";



const RoundForm = ({open, onClose, rounds, setRounds}) => {
    const updateRoundId = open?.round?.id;
    const isUpdate = !!updateRoundId;
    const roundToUpdate = open?.round;
    const isOpen = !!open;

    const addRound = (newRound) => {
        setRounds([...rounds, newRound])
    }

    const updateRound = (newRound) => {
        const updatedRounds = rounds?.map(round => round?.id === updateRoundId ? newRound : round)
        setRounds(updatedRounds)
    }

    const removeRound = () => {
        const filteredRounds = rounds?.filter(round => round?.id !== updateRoundId)
        setRounds(filteredRounds)
        onClose()
    }
    const updateValues = {
        questionsType: roundToUpdate?.questionsType,
        voting: roundToUpdate?.voting,
        time: roundToUpdate?.time,
        questionsCount: roundToUpdate?.questionsCount,
        gapTime: roundToUpdate?.gapTime,
        greeting: roundToUpdate?.greeting,
        googleSheetsId: roundToUpdate?.googleSheetsId,
        questions: roundToUpdate?.questions
    }

    const initValues = {
        questionsType: 'select',
        voting: {
            votingTime: '20'
        },
        questionsCount: '1',
        gapTime: '0',
        greeting: {
            title: '',
            subtitle: '',
            text: '',
            skip: false,
            mainImage: null,
            secondaryImage: null
        },
        googleSheetsId: '',
        questions: []
    }

    const defaultValues = isUpdate ? updateValues : initValues;

    const methods = useForm({
        defaultValues,
        mode: 'all',
        resolver: zodResolver(roundValidationSchema)
    })

    const questionsType = methods.watch('questionsType');

    const isBlitz = questionsType === 'connections' ||
        questionsType === 'sort' ||
        questionsType === 'remove'

    const isRange = questionsType === 'range';
    const isSelect = questionsType === 'select';

    const submitHandler = async (data) => {
        try {
            if (isUpdate) {
                const roundToUpdate = {
                    ...data,
                    id: updateRoundId,
                    gapTime: Number(data?.gapTime),
                    questionsCount: Number(data?.questionsCount),
                    time: Number(data?.time),
                    voting: {
                        votingTime: Number(data?.voting?.votingTime)
                    },
                    processType: isBlitz ? 'blitz' : 'queue',
                    questions: await loadQuestions(data.questionsType, updateRoundId, data.googleSheetsId)
                }

                if (isBlitz) {
                    delete roundToUpdate?.gapTime
                    delete roundToUpdate?.questionsCount
                    delete roundToUpdate?.voting
                } else {
                    delete roundToUpdate?.time
                    if (isRange) {
                        delete roundToUpdate?.voting
                    }
                }

                updateRound(roundToUpdate)
            } else {
                const newRoundId = generateId()
                const newRound = {
                    ...data,
                    id: newRoundId,
                    gapTime: Number(data?.gapTime),
                    processType: isBlitz ? 'blitz' : 'queue',
                    questionsCount: Number(data?.questionsCount),
                    time: Number(data?.time),
                    voting: {
                        votingTime: Number(data?.voting?.votingTime)
                    },
                    questions: await loadQuestions(data.questionsType, newRoundId, data.googleSheetsId)
                }

                if (isBlitz) {
                    delete newRound?.gapTime
                    delete newRound?.questionsCount
                    delete newRound?.voting
                } else {
                    delete newRound?.time
                    if (isRange) {
                        delete newRound?.voting
                    }
                }

                addRound(newRound)
            }
            onClose()

        } catch (e) {
            console.log(e);
            toast.error(e?.message)
        }

    }

    const loadQuestions = async (questionsType, roundId, googleSheetsId) => {
        try {
            // 1wx4GkEZq4IkN6xbofVnyG9fsQJ6Unu2BJIryYSQHKoQ ==== select
            // 1wx4GkEZq4IkN6xbofVnyG9fsQJ6Unu2BJIryYSQHKoQ ==== range

            const sheetsService = new SheetsService(googleSheetsId)
            const questions = await sheetsService.parseQuestions(questionsType, roundId)
            console.log(questions);
            return questions;
        } catch (e) {
            throw e;
        }
    }

    const getErrorMessage = (name) => methods.formState.errors?.[name]?.message;

    // console.log('ERRORS', methods.formState.errors);

    useEffect(() => {
        methods.reset(defaultValues)
    }, [open])






    useEffect(() => {
        const firstError = Object.keys(methods.formState.errors).reduce((field, a) => {
            return !!methods.formState.errors[field] ? field : a;
        }, null);

        if (firstError) {
            methods.setFocus(firstError);
        }
    }, [methods.formState.errors, methods.setFocus]);

    const onQuestionTypeChange = (newValue) => {
        console.log(newValue, 'NEW VALUE =====');

        const isRange = newValue === 'range';
        const isSelect = newValue === 'select';

        methods.clearErrors()
        if (isSelect || isRange) {
            methods.setValue('gapTime', "0")
            methods.setValue('questionsCount', "1")
            if (isSelect) {
                methods.setValue('voting.votingTime', "15")
            }
        } else {
            methods.setValue('time', '20')
        }
    }

    const [questionsOpen, setQuestionsOpen] = useState(false)

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
            <PageTitle>
                {isUpdate ? 'Редагування раунду' : 'Створення раунду'}
            </PageTitle>
            <Form>
                <Select
                    name={'questionsType'}
                    onChangeTrigger={(newValue) => onQuestionTypeChange(newValue)}
                    control={methods.control}
                    label={'Тип питання'}
                    MenuProps={{
                        style: {zIndex: 35001}
                    }}
                    options={[
                        {label: 'Вибрати відповідь', value: 'select'},
                        {label: 'Вгадай число', value: 'range'},
                        {label: 'Сортування', value: 'sort'},
                        {label: 'Прибрати зайве', value: 'remove'},
                        {label: "Зв'язки", value: 'connections'},
                    ]}
                />
                {
                    isSelect &&
                        <StyledInput
                            name={'voting.votingTime'}
                            error={methods.formState.errors?.voting?.votingTime?.message}
                            label={'Час голосування'}
                            control={methods.control}
                        />
                }
                {
                    isBlitz &&
                        <StyledInput
                            name={'time'}
                            error={getErrorMessage('time')}
                            label={'Час на питання'}
                            control={methods.control}
                        />
                }
                {
                    isRange || isSelect ?
                        <>
                            <StyledInput
                                name={'questionsCount'}
                                error={methods.formState.errors?.questionsCount?.message}
                                label={'Кількість питань'}
                                control={methods.control}
                            />
                            <StyledInput
                                name={'gapTime'}
                                error={methods.formState.errors?.gapTime?.message}
                                label={'Перерва між питаннями'}
                                control={methods.control}
                            />
                        </>

                        : null
                }

                <StyledInput
                    name={'googleSheetsId'}
                    error={getErrorMessage('googleSheetsId')}
                    label={'ID таблиці'}
                    control={methods.control}
                />
                <Button onClick={() => setQuestionsOpen(true)}>
                    Показати питання
                </Button>
                <RoundQuestions
                    questions={methods.watch('questions')}
                    onClose={() => setQuestionsOpen(false)}
                    isOpen={questionsOpen}
                />
                {/*<code>*/}
                {/*    Values*/}
                {/*    <pre>*/}
                {/*        {JSON.stringify(methods.watch(), null, 4)}*/}
                {/*    </pre>*/}
                {/*</code>*/}
                {/*<code>*/}
                {/*    Errors*/}
                {/*    <pre>*/}
                {/*        {JSON.stringify(methods.formState.errors, null, 4)}*/}
                {/*    </pre>*/}
                {/*</code>*/}
                <GreetingFields
                    control={methods.control}
                    watch={methods.watch}
                    setValue={methods.setValue}
                    getErrorMessage={getErrorMessage}
                />

                <ButtonsRow>
                    <Button
                        style={{ borderRadius: 16, alignSelf: 'flex-start' }}
                        color={"secondary"}
                        variant={"contained"}
                        onClick={methods.handleSubmit(submitHandler)}
                    >
                        {isUpdate ? 'Змінити раунд' : 'Створити раунд'}
                    </Button>
                    {isUpdate &&
                        <Button
                            style={{ borderRadius: 16, alignSelf: 'flex-start', display: 'flex', gap: 10, alignItems: 'center'}}
                            color={"error"}
                            variant={"contained"}
                            onClick={() => removeRound(updateRoundId)}
                        >
                            <FaTrash size={18} />
                        </Button>
                    }

                </ButtonsRow>
            </Form>
        </Drawer>
    );
};

const Form = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ButtonsRow = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
`

export default RoundForm;