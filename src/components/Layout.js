import React, { useState } from 'react';
import DecoderContext from './DecoderContext';
import songDecoder from '../lib/songDecoder';
import Inputs from './Inputs';
import Outputs from './Outputs';

const Layout = () => {
    const decoder = songDecoder();
    const initialDecoderState = decoder.getDecoderState('', '', 0, 0, 0);
    const [currentDecoderState, setDecoderState] = useState(initialDecoderState);
    const [solutionState, setSolution] = useState();

    // this should be called each time any relevant inputs change.
    const resetDecoder = (newNotesText, newOctaveKeyText, newInterval1Num, newInterval2Num, newInterval3Num) => {
        const newState = decoder.getDecoderState(newNotesText, newOctaveKeyText, newInterval1Num, newInterval2Num, newInterval3Num);
        setDecoderState(newState);
        setSolution();
    };

    const solve = () => {
        const solution = decoder.getSolution(currentDecoderState);
        console.log(solution);
        setSolution(solution);
    }

    // MWCTODO: use a context for the state instead of passing it in.
    return (
        <div>
            <Inputs decoderState={currentDecoderState} resetDecoder={resetDecoder} solve={solve} />
            <Outputs solution={solutionState} /> 
        </div>
    );
}

export default Layout;
