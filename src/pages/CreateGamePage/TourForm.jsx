import React, { useEffect } from "react";
import { Button, Drawer } from "@mui/material";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PageTitle, StyledInput } from "./CreateGamePage.jsx";
import styled from "styled-components";
import { FaTrash } from 'react-icons/fa'
import { v4 as generateId } from "uuid";
import GreetingFields, { greetingValidationSchema } from "./GreetingFields.jsx";

const TourForm = ({open, onClose, tours, setTours}) => {
    const isUpdate = !!open?.id;
    const isOpen = !!open;

    const validationSchema = z.object({
        title: z.string().min(3, "Поле обов'язкове"),
        greeting: greetingValidationSchema,
        rounds: z.array(z.any())
    })

    const updateValues = {
        title: open?.title,
        greeting: open?.greeting,
        rounds: open?.rounds,
    }

    const initValues = {
        title: '',
        greeting: {
            title: '',
            subtitle: '',
            text: '',
            skip: false,
            mainImage: null,
            secondaryImage: null
        },
        rounds: []
    }

    const defaultValues = isUpdate ? updateValues : initValues;

    const methods = useForm({
        defaultValues,
        resolver: zodResolver(validationSchema)
    })


    useEffect(() => {
        methods.reset(defaultValues)
        if (isUpdate) {
            methods.setValue('greeting.mainImage'. defaultValues?.greeting?.mainImage)
            methods.setValue('greeting.secondaryImage'. defaultValues?.greeting?.secondaryImage)
        }
    }, [open])


    const updateTour = (newTour) => {
        const updatedTours = tours?.map(tour => tour.id === newTour.id ? newTour : tour)
        console.log(updatedTours, 'update tourssss');
        setTours(updatedTours)
    }
    const addTour = (newTour) => {
        setTours([...tours, newTour])
    }
    const removeTour = (tourId) => {
        const filteredTours = tours?.filter(tour => tour.id !== tourId);
        setTours(filteredTours);
        onClose()
    }

    const submitHandler = (data) => {
        console.log('SUBMIT VALUES =====', data);
        const newTour = {...data, id: generateId()}
        const updatedTour = {...data, id: open?.id}
        console.log('updated TOUR', updatedTour);
        isUpdate ? updateTour(updatedTour) : addTour(newTour)
        onClose()
    }

    const getErrorMessage = (name) => methods.formState.errors?.[name]?.message;


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
                {isUpdate ? 'Редагування туру' : 'Створення туру'}
            </PageTitle>
            <Form>
                <StyledInput
                    name={'title'}
                    label={"Назва туру"}
                    error={getErrorMessage('title')}
                    control={methods.control}
                />
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
                        {isUpdate ? 'Змінити тур' : 'Створити тур'}
                    </Button>
                    {isUpdate &&
                        <Button
                            style={{ borderRadius: 16, alignSelf: 'flex-start', display: 'flex', gap: 10, alignItems: 'center'}}
                            color={"error"}
                            variant={"contained"}
                            onClick={() => removeTour(open?.id)}
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

export default TourForm;