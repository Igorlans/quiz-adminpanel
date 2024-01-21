import React from 'react';
import {TextField} from "@mui/material";
import {Controller} from "react-hook-form";
const Input = ({name, label, error, onChangeTrigger, shouldUnregister = true, register, control, multiline,style, rows, ...props}) => {

    return (
        <Controller
            name={name}
            control={control}
            shouldUnregister={shouldUnregister}
            render={({ field: { ref, ...field }, fieldState }) => (
                <TextField
                    style={style}
                    onChange={(e) => {
                        field.onChange(e);
                        onChangeTrigger && onChangeTrigger()
                    }}
                    value={field.value}
                    onBlur={field.onBlur}
                    InputProps={{
                        style: {borderRadius: 12}
                    }}
                    inputRef={ref}
                    size={"small"}
                    multiline={multiline}
                    rows={rows}
                    color={'secondary'}
                    label={label}
                    variant="outlined"
                    error={!!error}
                    helperText={error ?? ''}
                    {...props}
                />
            )}
        />

    );
};

export default Input;