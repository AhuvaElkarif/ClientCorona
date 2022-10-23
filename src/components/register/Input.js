import { TextField } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import * as React from "react";

const Input = ({ register, errors, name, lableName, type, flag, member }) => {
    // const date = member? {...new Date(member[name])} : null;
    return <React.Fragment>
        <InputLabel>{lableName}</InputLabel> <br/>
        <TextField id="standard-basic" name={name} type={type}
            {...register(name)} variant="outlined" disabled={flag}
            defaultValue={member && type=="date"?new Date(member[name]).toISOString().split('T')[0] :member? member[name] : ""}
        />
        <p style={{ color: "red" }}>{errors[name]?.message}</p>
    </React.Fragment>
}
export default Input;