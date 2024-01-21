import React, { useState } from "react";
import styled from "styled-components";
import Input from "../../components/UI/Input/Input.jsx";
import { useForm } from "react-hook-form";
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import Checkbox from "../../components/UI/Checkbox.jsx";
import Cropper from "../../components/Cropper/Cropper.jsx";
import cropperPlaceholder from '../../assets/image_uploader_plus.svg'
import toast from "react-hot-toast";
import TourForm from "./TourForm.jsx";
import {MdStar} from "react-icons/md";
import {MdStarOutline} from "react-icons/md";
import RoundForm from "./RoundForm.jsx";
import GreetingFields from "./GreetingFields";
import { greetingValidationSchema } from "./GreetingFields";
import { questionTypes } from "../../utils/questionTypes.js";
import { addGame } from "./parseGame.js";
import { useNavigate } from "react-router";

export const StyledInput = styled(Input)`
  width: ${props => props.$textarea ? '80%' : '60%'};
`

const CreateGamePage = () => {
    const validationSchema = z.object({
        title: z.string().min(3, "Поле обов'язкове"),
        greeting: greetingValidationSchema,
        isPremium: z.boolean().optional(),
        toStarsIndex: z.number().optional().nullish(),
        isActive: z.boolean().optional(),
        tours: z.array(z.any()),
        finalScreen: z.object({
            isPresent: z.boolean().optional(),
            text: z.string().optional(),
            qrCode: z.string().optional(),
        })
    })


    const navigate = useNavigate();
    const [file, setFile] = useState(null)

    const [activeTour, setActiveTour] = useState(false)
    const [activeRound, setActiveRound] = useState(false)


    const methods = useForm({
        defaultValues: {
            title: '',
            greeting: {
                title: '',
                subtitle: '',
                text: '',
                skip: false,
                mainImage: null,
                secondaryImage: null
            },
            isPremium: false,
            isActive: true,
            toStarsIndex: null,
            finalScreen: {
                isPresent: false,
                text: '',
                qrCode: ''
            },
            tours: []
        },
        resolver: zodResolver(validationSchema)
    })


    const getErrorMessage = (name) => methods.formState.errors?.[name]?.message;
    const control = methods.control;
    const toStarsIndex = methods.watch('toStarsIndex');

    // console.log('GAME VALUES ========', methods.watch(), '========================');
    // console.log(toStarsIndex);

    const submitHandler = async (data) => {
        if (!file) return  toast.error('Додайте фото')
        if (!data.tours?.length) return toast.error('Додайте тури')
        if (!data.tours?.[0]?.rounds?.length) return toast.error('Додайте хоча б 1 раунд')

        await toast.promise(addGame(data, file), {
            loading: 'Створення гри...',
            success: () => {
                navigate('/games')
                return 'Гра створена'
            },
            error: (e) => e.message
        })
        console.log('Values', data);
    }

    const onStarClick = (e, index) => {
        e.stopPropagation();

        if (toStarsIndex !== null) {
            methods.setValue('toStarsIndex', null)
        } else {
            methods.setValue('toStarsIndex', index)
        }
    }

    return (
        <>

            <PageContainer>
                <FormBody>
                    <FormHeader>
                        <PageTitle>Створення гри</PageTitle>
                        <Button
                            style={{ borderRadius: 16 }}
                            color={"secondary"}
                            variant={"contained"}
                            onClick={methods.handleSubmit(submitHandler)}
                        >
                            Створити гру
                        </Button>
                    </FormHeader>
                    <Form>
                        <FormInputs>
                            <StyledInput
                                name={'title'}
                                error={getErrorMessage('title')}
                                label={'Назва гри'}
                                control={control}
                            />
                            <Checkbox
                                control={control}
                                name={'isPremium'}
                                label={'Преміум'}
                            />
                            <Checkbox
                                control={control}
                                name={'isActive'}
                                label={'Показувати на сайті'}
                            />
                            <Checkbox
                                control={control}
                                shouldUnregister={false}
                                name={'finalScreen.isPresent'}
                                label={'Фінальний екран'}
                            />
                            {
                                methods.watch('finalScreen.isPresent') &&
                                <>
                                    <StyledInput
                                        name={'finalScreen.text'}
                                        error={methods?.formState?.errors?.finalScreen?.text?.message}
                                        multiline
                                        rows={10}
                                        label={'Текст фінального екрану'}
                                        control={control}
                                    />
                                    <StyledInput
                                        name={'finalScreen.qrCode'}
                                        error={methods?.formState?.errors?.finalScreen?.qrCode?.message}
                                        label={'QR код посилання'}
                                        control={control}
                                    />
                                </>
                            }
                            <GreetingFields
                                control={control}
                                watch={methods.watch}
                                setValue={methods.setValue}
                                getErrorMessage={getErrorMessage}
                            />
                        </FormInputs>
                        <FormUploader>
                            <UploaderTitle>Картинка гри</UploaderTitle>
                           <Cropper placeholder={cropperPlaceholder} file={file} setFile={setFile} aspect={1} height={200} width={200} />
                        </FormUploader>
                    </Form>
                    <PageTitle>Тури гри</PageTitle>
                    <TourList>
                        {methods.watch('tours')?.map((tour, index) =>
                            <TourItem
                                key={tour.id}
                                onClick={() => setActiveTour(tour)}
                            >
                                <TourItemRow>
                                    <div>
                                        Тур {index+1}: {tour?.title}
                                    </div>
                                    <div onClick={(e) => onStarClick(e, index)}>
                                        {
                                            index >= toStarsIndex && toStarsIndex !== null
                                                ? <MdStar size={25} color={'#404e68'} />
                                                : <MdStarOutline size={25} color={'#404e68'} />
                                        }
                                    </div>
                                </TourItemRow>
                                <div style={{marginTop: '10px'}}>
                                    {
                                        tour?.rounds?.map(round =>
                                            <RoundItem
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setActiveRound({
                                                        tourId: tour?.id,
                                                        round: round
                                                    })
                                                }}
                                            >
                                                {questionTypes[round?.questionsType]}
                                            </RoundItem>
                                        )
                                    }

                                </div>
                                <Button
                                    style={{ borderRadius: 16, alignSelf: 'flex-start' }}
                                    color={"secondary"}
                                    variant={"contained"}
                                    size={'small'}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setActiveRound({
                                            tourId: tour?.id,
                                            round: {}
                                        })
                                    }}
                                >
                                    Створити раунд
                                </Button>
                            </TourItem>
                        )}
                    </TourList>
                    <Button
                        style={{ borderRadius: 16, alignSelf: 'flex-start' }}
                        color={"secondary"}
                        variant={"contained"}
                        onClick={() => setActiveTour({})}
                    >
                        Створити тур
                    </Button>
                </FormBody>
            </PageContainer>

            <TourForm
                open={activeTour}
                onClose={() => setActiveTour(false)}
                setTours={(newTours) => methods.setValue('tours', newTours)}
                tours={methods.watch('tours')}
            />
            <RoundForm
                open={activeRound}
                onClose={() => setActiveRound(false)}
                setRounds={(newRounds) => {
                    const updatedTours = methods.watch('tours')?.map(tour => {
                        if (tour.id === activeRound?.tourId) {
                            return {
                                ...tour,
                                rounds: newRounds
                            }
                        } else {
                            return tour
                        }
                    })
                    methods.setValue('tours', updatedTours)
                }}
                rounds={methods.watch('tours')?.find(tour => tour.id === activeRound?.tourId)?.rounds}
            />
        </>
    );
};

export const PageTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
`

const PageContainer = styled.div`
  padding: 80px 20px;
  background: #fff;
  height: 100%;
`

const FormBody = styled.div`
  background: #f8f8ff;
  min-height: 500px;
  padding: 35px;
  border-radius: 16px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const Form = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 0.5fr;
`

const FormInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const FormUploader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const UploaderTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 4px;
`

const FormHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 60px;
`
const TourList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 70%;
  
`
const TourItem = styled.div`
  padding: 12px;
  background: #d3dbec;
  transition: all 0.1s linear;
  cursor: pointer;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 10px;

  font-size: 18px;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
`

const RoundItem = styled.div`
  padding: 8px;
  background: #fff;
  margin-bottom: 10px;
  cursor: pointer;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 10px;

  font-size: 14px;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
`

const TourItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export default CreateGamePage;