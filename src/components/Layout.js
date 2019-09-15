import React, { useState } from 'react';
import DecoderContext from './DecoderContext';
import decoder from '../lib/songDecoder';
import Inputs from './Inputs';

const Layout = () => {
    const defaultDecoder = decoder('', '', 0, 0, 0);
    const [currentDecoder, setDecoder] = useState(defaultDecoder);

    const resetDecoder = (newNotesText, newOctaveKeyText, newInterval1Num, newInterval2Num, newInterval3Num) => {
        currentDecoder.reset(newNotesText, newOctaveKeyText, newInterval1Num, newInterval2Num, newInterval3Num);
        setDecoder(currentDecoder);
    };

    return (
        <div>
            <DecoderContext.Provider>
                <Inputs decoder={currentDecoder} resetDecoder={resetDecoder} decoderIsValid={currentDecoder.isValidData} />
            </DecoderContext.Provider>
        </div>
    );
}

export default Layout;
