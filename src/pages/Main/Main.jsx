import React, {useEffect, useState} from 'react';
import classes from './main.module.css';
import {Button, TextField} from "@mui/material";

const Main = () => {
    const [label, setLabel] = useState('Get transaction value');
    const [input, setInput] = useState('');


    const getTransactionValue = async (transactionId) => {
        try {
            const response = await fetch(`https://apilist.tronscan.org/api/transaction-info?hash=${transactionId}`)
            const data = await response.json();
            const value = Number(data?.tokenTransferInfo?.amount_str) / 1000000;
            if (isNaN(value)) {
                throw new Error();
            } else {
                return value
            }
        } catch (e) {
            alert('Transaction is not found')
        }
    }

    const clickHandler = () => {
        getTransactionValue(input).then((data) => alert(data)).catch(e => {
            alert(e.message)
        });
    }


    return (
        <div className={classes.main}>

            <div className={classes.title}>{label}</div>
            <TextField value={input} onChange={(e) => setInput(e.target.value)} size={'small'} className={classes.input} label={"Transaction id"}/>
            <Button onClick={clickHandler} variant={'contained'} size={"large"}>Get</Button>
        </div>
    );
};

export default Main;