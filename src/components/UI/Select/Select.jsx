import {FormControl, InputLabel, MenuItem, Select as MUISelect} from "@mui/material";
import {Controller} from "react-hook-form";

const Select = ({name, control, label, options, className, onChangeTrigger, style, ...props}) => {

    return (
        <div className={className} style={style}>
            {label &&
                <InputLabel color={'secondary'}>{label}</InputLabel>
            }
            <FormControl>

                <Controller
                    name={name}
                    control={control}
                    shouldUnregister={true}
                    render={({ field: { ref,onChange, ...field}}) => (
                        <MUISelect
                            inputRef={ref}
                            {...props}
                            onChange={(e) => {
                                onChange(e.target.value)
                                console.log('hui');
                                onChangeTrigger && onChangeTrigger(e.target.value)
                            }}
                            {...field}
                            // label={label}
                        >
                            {options?.map(option =>
                                <MenuItem
                                    key={option?.value}
                                    value={option?.value}
                                >
                                    {option?.label}
                                </MenuItem>
                            )}
                        </MUISelect>
                    )}
                />
            </FormControl>
        </div>
    );
};

export default Select;