import classes from './removeOptionsList.module.scss'
import {FormLabel} from "@mui/material";
import {AiOutlinePlusCircle} from "react-icons/ai";
import {MdDelete} from "react-icons/md";
import VariantItem from "../../VariantItem/VariantItem.jsx";
import VariantForm from "../../VariantForm/VariantForm.jsx";
import {useState} from "react";
const RemoveOptionsListItem = ({option, setOption, setOptions, id}) => {
    const [isFormOpen, setIsFormOpen] = useState(false)

    const deleteItem = () => {
        setOptions(prev => {
            return prev?.filter(opt => opt?.id !== id);
        })
    }
    return (
        <div className={classes.removeOptionsListItem}>
            <VariantForm
                open={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                variants={option}
                setVariants={setOption}
            />
            <div className={classes.header}>
                <FormLabel>Варіанти відповіді</FormLabel>
                <div className={classes.btns}>
                    <AiOutlinePlusCircle
                        onClick={() => setIsFormOpen(true)}
                        color={'#586c89'}
                        style={{cursor: 'pointer'}}
                        size={'1.6em'}
                    />
                    <MdDelete
                        onClick={deleteItem}
                        color={'#586c89'}
                        style={{cursor: 'pointer'}}
                        size={'1.4em'}
                    />
                </div>
            </div>

            {option?.map(optionItem =>
                <VariantItem
                    key={optionItem.id}
                    variants={option}
                    variant={optionItem}
                    setVariants={setOption}
                />
            )}
        </div>
    );
};

export default RemoveOptionsListItem;