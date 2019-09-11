import React, { useState } from 'react';
import decoder from '../lib/songDecoder';
import Inputs from './Inputs';

const Layout = () => {
    const defaultDecoder = decoder('', '', 0, 0, 0);
    const [currentDecoder, setDecoder] = useState(defaultDecoder);

    // you're trying to use the reset method of the defaultDecoder object without ever calling setDecoder, i don't think this is going to work.
    return (
        <div>
            <Inputs decoder={defaultDecoder} />
            {/* <Inputs decodingReady={true} manageDecoderAndDisplays={manageDecoderAndDisplays} /> */}
            {/* <p>This is a button: <button onClick={() => setDecoder(decoder + ' x')} >er, click me</button>.</p> */}
        </div>
    );
}

export default Layout;
