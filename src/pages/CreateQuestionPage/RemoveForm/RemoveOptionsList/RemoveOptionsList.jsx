import classes from './removeOptionsList.module.scss';
import RemoveOptionsListItem from "./RemoveOptionsListItem.jsx";
import {FormLabel} from "@mui/material";
import {AiOutlinePlusCircle} from "react-icons/ai";
const RemoveOptionsList = ({options, setOptions}) => {

    const addOptionItem = () => {
        const newOption = {
            id: Date.now(),
            data: []
        }
        setOptions([newOption, ...options])
    }

    const setOptionData = (id, newItems) => {
        const newOptions = options?.map(option => option?.id === id ? {...option, data: newItems} : option)
        setOptions(newOptions)
    }

    return (
        <div className={classes.removeOptionsList}>
            <div className={classes.header}>
                <FormLabel style={{fontWeight: 500, fontSize: 20}}>Варіанти відповіді</FormLabel>
                <AiOutlinePlusCircle
                    onClick={addOptionItem}
                    color={'#586c89'}
                    style={{cursor: 'pointer'}}
                    size={'2em'}
                />
            </div>
            {/*<div className={classes.items}>*/}
            {/*    {variants?.map(variant =>*/}
            {/*        <VariantItem*/}
            {/*            variants={variants}*/}
            {/*            setVariants={setVariants}*/}
            {/*            variant={variant}*/}
            {/*            key={variant.id}*/}
            {/*        />*/}
            {/*    )}*/}
            {/*</div>*/}
            {options?.map(option =>
                <RemoveOptionsListItem
                    key={option.id}
                    id={option.id}
                    option={option?.data}
                    setOption={(newItems) => setOptionData(option.id, newItems)}
                    setOptions={setOptions}
                />
            )}
        </div>
    );
};

export default RemoveOptionsList;