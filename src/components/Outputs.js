import React, { useRef, useContext } from 'react';

const Outputs = ({solution}) => {
    console.log('solution.isArray', Array.isArray(solution));

    // MWCTODO: man, what should we do with React's desire for a proper key here? i don't want to UQ key every damn thing.
    return (solution && solution.length > 3)
        ? <div>{solution.map(line => <div>{line}</div>)}</div>
        : <div>NO SOLUTION YET</div>
}

export default Outputs;