import {
    Button, Drawer,
} from "@mui/material";
import {useForm} from "react-hook-form";
import Input from "../../../../components/UI/Input/Input.jsx";
import {yupResolver} from "@hookform/resolvers/yup";
import {selectVariantFormSchema} from "../../../../validation/QuestionFormSchema.js";

const SortItemForm = ({open, onClose, variants, setVariants}) => {

    const methods = useForm({
        mode: 'onBlur',
        defaultValues: {
            value: '',
        },
        resolver: yupResolver(selectVariantFormSchema)
    })
    const submitHandler = (data) => {
        const newVariant = {
            id: Date.now(),
            name: data.value,
        }
        console.log(newVariant)
        setVariants([...variants, newVariant])
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
                    control={methods.control}
                    error={methods.formState?.errors['value']?.message}
                    name={'value'}
                    label={'Варіант'}
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

export default SortItemForm;