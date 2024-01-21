import React from 'react';
import { Checkbox as MUICheckbox, FormControlLabel } from "@mui/material";
import {Controller} from "react-hook-form";
const Checkbox = ({name, label, onChangeTrigger, shouldUnregister = true, control, color='primary', ...props}) => {

    return (
        <Controller
            name={name}
            shouldUnregister={shouldUnregister}
            control={control}
            render={({field}) => (
                <FormControlLabel
                    label={label}
                    control={<MUICheckbox
                        label={label}
                        onChange={(e) => {
                            field.onChange(e);
                            onChangeTrigger && onChangeTrigger()
                        }}
                        checked={field.value}
                        size={'medium'}
                        color={color}
                        {...props}
                    />}
                />

            )}
        />

    );
};

export default Checkbox;