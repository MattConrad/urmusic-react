import React from "react";
import ReactDOM from "react-dom";

const initialState = {
    notes: [],
    octaveKeys: [],
    interval1Num: 0, 
    interval2Num: 0, 
    interval3Num: 0,
    errors: [],
    isValid: false
};

const DecoderContext = React.createContext({ 'just': 1, 'some': 2, 'things': 'to try' });

export default DecoderContext;
