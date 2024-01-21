import {Controller} from "react-hook-form";
import {FormControlLabel, FormLabel, Radio, RadioGroup as MUIRadioGroup} from "@mui/material";
const RadioGroup = ({name, label, options, className, style, control}) => {

    return (
        <div className={className} style={style}>
            {label &&
                <FormLabel color={'secondary'}>{label}</FormLabel>
            }
            <Controller
                name={name}
                shouldUnregister={true}
                control={control}
                render={({field}) => (
                    <MUIRadioGroup
                        {...field}
                    >
                        {options?.map(option =>
                            <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                            />
                        )}
                    </MUIRadioGroup>
                )}
            />
        </div>

    );
};

export default RadioGroup;