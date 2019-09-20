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

const CheckButtonOrSolverButton = ({errors, reset, solve}) => {
    const onHintClick = () => {
        console.log('checkorsolve OHC ' + errors);
    }

    const onCheckClick = () => {
        console.log('for testing ' + errors);
    }

    return errors.length === 0 ?
        <div>
            {/* these two should be SELECTs, not INPUTs. but also, worry about this later. */}
            <p>Enter a single octave key value: <input /> Enter a single note: <input /></p>
            <input type="button" onClick={onHintClick} value="Get Single Note Hint TODO" />
            &nbsp;&nbsp;
            <input type="button" onClick={solve} value="Show Complete Solution" />
        </div> :
        <div>
            {/* i'm not sure this is safe, we could certainly have two different 0-idx errs in succession . . . but only when we're re-rendering anyway . . . perhpas better to ask someone.  */}
            {errors.map((err, idx) => <div key={idx}>{err}</div>)}
            {/* MWCTODO: replace this with an onkeyup w/ debounce for the two text widgets NO DON'T BC THE REFORMAT WOULD FEEL WEIRD TO USER */}
            <input type="button" onClick={reset} value="Check Notes/Octave Keys" />
        </div>;
}

const Inputs = ({decoderState, resetDecoder, solve}) => {
    const currentFormatter = formatter();
    const ival1Ref = useRef(0);
    const ival2Ref = useRef(0);
    const ival3Ref = useRef(0);
    const octaveTextRef = useRef('');
    const noteTextRef = useRef('');

    const onLoadExampleClick = (e) => {
        e.preventDefault();

        ival1Ref.current.value = examplesJson.intervalKeys[0][0];
        ival2Ref.current.value = examplesJson.intervalKeys[0][1];
        ival3Ref.current.value = examplesJson.intervalKeys[0][2];

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
                1: <select ref={ival1Ref} onChange={reformatThenResetDecoder}>{createIntervalOptions()}</select> 
                &nbsp;2: <select ref={ival2Ref} onChange={reformatThenResetDecoder}>{createIntervalOptions()}</select> 
                &nbsp;3: <select ref={ival3Ref} onChange={reformatThenResetDecoder}>{createIntervalOptions()}</select>
            </p>
            <p>Octave Key Text (4 lines, one set per line)</p>
            {/* MWCTODO: onPaste isn't working the way i want. not sure what it's actually doing, but it seems like nothing. */}
            <div><textarea ref={octaveTextRef} onBlur={reformatThenResetDecoder} onPaste={reformatThenResetDecoder} cols={160} rows={4}></textarea></div>
            <p>Note Text (4 lines, one set per line)</p>
            <div><textarea ref={noteTextRef} onBlur={reformatThenResetDecoder} onPaste={reformatThenResetDecoder} cols={160} rows={4}></textarea></div>

            <CheckButtonOrSolverButton errors={decoderState.errors} reset={reformatThenResetDecoder} solve={solve} />
        </div>
    );
};

export default Inputs;