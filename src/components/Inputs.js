import React, { useRef, useContext } from 'react';
import { intervalToSemitone } from '../lib/constants'; 
import formatter from '../lib/formatter';
import examplesJson from '../lib/examples.json';
import DecoderContext from './DecoderContext';

const createIntervalOptions = () => {
    return Object.keys(intervalToSemitone).map((key) => {
        return <option key={key} value={intervalToSemitone[key]}>{key}</option>;
    });
};

const CheckButtonOrSolverButton = ({isValidData}) => {
    const dc = useContext(DecoderContext);

    const onHintClick = () => {
        console.log('checkorsolve OHC ' + isValidData);

        alert('we need a ref to the decoder here, or at least a get-hint method on the decoder');
    }

    const onSolveClick = () => {
        alert('this should be a ref to the solver itself.');
    }

    const onCheckClick = () => {
        console.log('for testing ' + dc);
    }

    return isValidData ?
        <div>
            <p>HINT WIDGETS GO HERE</p>
            <input type="button" onClick={onHintClick} value="Test/Request Hint" />
            &nbsp;&nbsp;
            <input type="button" onClick={onSolveClick} value="Show Complete Solution" />
        </div> :
        <div>
            {/* this doesn't do anything itself, but clicking it will trigger the onBlur event. although we then need to set focus back in one of the textboxes, so we can click repeatedly . . . . */}
            <input type="button" onClick={onCheckClick} value="Check Notes/Octave Keys" />
        </div>;
}

const Inputs = ({decoder, resetDecoder, decoderIsValid}) => {
    const currentFormatter = formatter();
    const ival1Ref = useRef(0);
    const ival2Ref = useRef(0);
    const ival3Ref = useRef(0);
    const octaveTextRef = useRef('');
    const noteTextRef = useRef('');

    const onLoadExampleClick = (e) => {
        e.preventDefault();

        noteTextRef.current.value = currentFormatter.getFormattedNotesText(examplesJson.notes[0]);
        octaveTextRef.current.value = currentFormatter.getFormattedOctaveKeysText(examplesJson.octavekeys[0]);

        reformatThenResetDecoder();
    }

    // since the decoder expects formatted text, we always want to reformat everything before we reset the decoder.
    const reformatThenResetDecoder = () => {
        noteTextRef.current.value = currentFormatter.getFormattedNotesText(noteTextRef.current.value);
        octaveTextRef.current.value = currentFormatter.getFormattedOctaveKeysText(octaveTextRef.current.value);

        resetDecoder(noteTextRef.current.value, octaveTextRef.current.value, ival1Ref.current.value, ival2Ref.current.value, ival3Ref.current.value);
    }

    return (
        <div style={{ width: "95%" }}>
            <p style={{float: "right"}}>wrong not float right <button className={"button-link"} onClick={(e) => onLoadExampleClick(e)}>(load an example)</button></p>
            <p>Interval values:</p>
            <p>
                1: <select ref={ival1Ref}>{createIntervalOptions()}</select> 
                &nbsp;2: <select ref={ival2Ref}>{createIntervalOptions()}</select> 
                &nbsp;3: <select ref={ival3Ref}>{createIntervalOptions()}</select>
            </p>
            <p>Octave Key Text (4 lines, one set per line)</p>
            <div><textarea ref={octaveTextRef} onBlur={reformatThenResetDecoder} onPaste={reformatThenResetDecoder} cols={160} rows={4}></textarea></div>
            <p>Note Text (4 lines, one set per line)</p>
            <div><textarea ref={noteTextRef} onBlur={reformatThenResetDecoder} onPaste={reformatThenResetDecoder} cols={160} rows={4}></textarea></div>

            <CheckButtonOrSolverButton isValidData={decoderIsValid} />

        </div>
    );
};

export default Inputs;