/*
    the decoder absolutely relies on formatted text, with whitespace between each note/ockey value.
*/
const decoder = (notesText, octaveKeyText, interval1Num, interval2Num, interval3Num) => {

    let isValidData = false;

    const getErrors = () => {
        const notes = getDecoderElements(notesText);
        const octaveKeys = getDecoderElements(octaveKeyText);

        const errors = [];

        if (notes.length !== octaveKeys.length) {
            errors.push(`Number of notes lines (${notes.length}) must match number of octave key lines (${octaveKeys.length}).`);
        } else {
            for(let i = 0; i < notes.length; i++) {
                if (notes[i].length !== octaveKeys[i].length - 2) {
                    errors.push(`Number of notes on line ${i} (${notes[i].length}) must match number of octave key values on line ${i} (${octaveKeys[i].length - 2}) (the first 3 octave interval key values do not count).`);
                }
            }
        }

        return errors;
    }

    const getSingleNote = (noteLineIndex, notePositionIndex) => {
        return 'fake single' + interval1Num;
    };

    const getTranslatedText = () => {
        return 'fake text' + notesText;
    }

    const reset = (newNotesText, newOctaveKeyText, newInterval1Num, newInterval2Num, newInterval3Num) => {
        notesText = newNotesText;
        octaveKeyText = newOctaveKeyText;
        interval1Num = newInterval1Num;
        interval2Num = newInterval2Num;
        interval3Num = newInterval3Num;

        isValidData = notesText.length > 10 && octaveKeyText.length > 10 && getErrors().length === 0;
        console.log(isValidData);
    };

    //both notes and octave keys are expected in the same kind of block and are split/filtered the same way.
    const getDecoderElements = (text) => {
        return text.split('\n').map(line => line.split(/\s+/));
    }

    return { getErrors, getSingleNote, getTranslatedText, isValidData, reset }
};

export default decoder;
