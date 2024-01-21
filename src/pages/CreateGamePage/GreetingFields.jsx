import styled from "styled-components";
import { PageTitle, StyledInput } from "./CreateGamePage";
import { z } from "zod";
import Checkbox from "../../components/UI/Checkbox";
import { useEffect } from "react";
import cropperPlaceholder from '../../assets/image_uploader_plus.svg'
import PhotoUploader from "../../components/Cropper/PhotoUploader.jsx";

export const greetingValidationSchema = z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    text: z.string().optional(),
    skip: z.boolean().optional(),
    mainImage: z.any().optional(),
    secondaryImage: z.any().optional(),
})


const GreetingFields = ({
    control,
    setValue,
    watch,
    getErrorMessage,
}) => {

    const mainImage = watch('greeting.mainImage');
    const secondaryImage = watch('greeting.secondaryImage');
    const mainPlaceholder = !mainImage?.name ? mainImage : null
    const secondaryPlaceholder = !secondaryImage?.name ? secondaryImage : null

    const setMainImage = (file) => {
        setValue('greeting.mainImage', file)
    }

    const setSecondaryImage = (file) => {
        setValue('greeting.secondaryImage', file)
    }

    useEffect(() => {
        setMainImage(mainImage)
        setSecondaryImage(secondaryImage)
    }, [mainImage, secondaryImage])

    return (
        <GreetingForm>
            <PageTitle>Привітання</PageTitle>
            <Checkbox
                control={control}
                name={'greeting.skip'}
                label={'Пропустити екран привітання'}
            />
            {!watch('greeting.skip') &&
                <>
                    <StyledInput
                        shouldUnregister={false}
                        name={'greeting.title'}
                        error={getErrorMessage('greeting.title')}
                        label={'Заголовок'}
                        control={control}
                    />
                    <StyledInput
                        shouldUnregister={false}
                        name={'greeting.subtitle'}
                        error={getErrorMessage('greeting.subtitle')}
                        label={'Підзаголовок'}
                        control={control}
                    />
                    <StyledInput
                        shouldUnregister={false}
                        name={'greeting.text'}
                        error={getErrorMessage('greeting.text')}
                        label={'Текст привітання'}
                        multiline
                        rows={10}
                        control={control}
                    />
                    <GreetingImages>
                        <div>
                            <UploaderTitle>Головна картинка</UploaderTitle>
                            <PhotoUploader
                                file={mainImage}
                                placeholder={mainPlaceholder || cropperPlaceholder}
                                setFile={(file) => setMainImage(file)}
                                width={150}
                                height={150}
                            />

                        </div>
                        <div>

                            <UploaderTitle>Другорядна картинка</UploaderTitle>
                            <PhotoUploader
                                file={secondaryImage}
                                placeholder={secondaryPlaceholder || cropperPlaceholder}
                                setFile={(file) => setSecondaryImage(file)}
                                width={150}
                                height={150}
                            />

                        </div>

                    </GreetingImages>
                </>
            }



        </GreetingForm>
    );
};

const GreetingForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const GreetingImages = styled.div`
  display: flex;
  max-width: 100%;
  gap: 100px;
`

const UploaderTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 4px;
  margin-bottom: 25px;
`


export default GreetingFields;

