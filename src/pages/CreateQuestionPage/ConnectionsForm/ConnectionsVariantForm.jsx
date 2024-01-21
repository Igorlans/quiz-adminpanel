import {
    Button, Drawer,
} from "@mui/material";
import {useForm} from "react-hook-form";
import Input from "../../../components/UI/Input/Input.jsx";
import {yupResolver} from "@hookform/resolvers/yup";
import {connectionsVariantSchema} from "../../../validation/QuestionFormSchema.js";

const ConnectionsVariantForm = ({open, onClose, variants, setVariants}) => {

    const methods = useForm({
        mode: 'onBlur',
        defaultValues: {
            answer: '',
            question: ""
        },
        resolver: yupResolver(connectionsVariantSchema)
    })

    const submitHandler = (data) => {
        const newVariant = {
            id: Date.now(),
            question: data.question,
            answer: data.answer
        }
        console.log(newVariant)
        setVariants([newVariant, ...variants])
        methods.reset()
        onClose()
    }

    console.log('VALUES', methods.watch())

    return (
        <Drawer
            style={{zIndex: 2334}}
            open={open}
            anchor={'right'}
            onClose={onClose}
            PaperProps={{
                style: {padding: 30, minWidth: 400}
            }}
        >
            <form style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{fontSize: 24, fontWeight: 700, marginBottom: 50}}>
                    Варіант відповіді
                </div>
                <Input
                    style={{marginBottom: 20}}
                    control={methods.control}
                    error={methods.formState?.errors['question']?.message}
                    name={'question'}
                    label={'Питання'}
                />
                <Input
                    control={methods.control}
                    error={methods.formState?.errors['answer']?.message}
                    name={'answer'}
                    label={'Відповідь'}
                />

                <Button
                    onClick={methods.handleSubmit(submitHandler)}
                    style={{borderRadius: 16, alignSelf: 'flex-end', marginTop: 15}}
                    color={'secondary'}
                    type={'submit'}
                    variant={'contained'}
                >
                    Створити
                </Button>
            </form>
        </Drawer>
    );
};

export default ConnectionsVariantForm;