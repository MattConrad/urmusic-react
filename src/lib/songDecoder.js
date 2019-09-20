import { doesNotReject } from "assert";

const songDecoder = () => {

    const notesToNums = { 'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4, 'F': 5, 
        'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11 };

    const alphas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

    const getBlockAndOctaveKeys = (rawOctaveKeys) => {
        const blockKeys = rawOctaveKeys.map(arr => arr.slice(0, 3).map(s => parseInt(s)));
        const octaveKeys = rawOctaveKeys.map(arr => arr.slice(3).map(s => parseInt(s)));

        return { blockKeys, octaveKeys };
    }

    //both notes and octave keys are expected in the same kind of block and are split/filtered the same way.
    const getDecoderElements = (text) => {
        return text
            .split('\n')
            .map(line => { 
                // splitting on whitespace sometimes creates empty array element noise (maybe from \r\n), those must be filtered out.
                return line
                    .split(/\s+/)
                    .filter(tok => tok.length > 0);
            });
    }

    const getDecoderState = (notesText, octaveKeyText, interval1Num, interval2Num, interval3Num) => {
        const notes = getDecoderElements(notesText);
        const rawOctaveKeyStrings = getDecoderElements(octaveKeyText);
        const { blockKeys, octaveKeys } = getBlockAndOctaveKeys(rawOctaveKeyStrings);

        const errors = getErrors(notes, blockKeys, octaveKeys);

        const intervals = [parseInt(interval1Num), parseInt(interval2Num), parseInt(interval3Num)];

        return { notes, blockKeys, octaveKeys, intervals, errors };
    };

    const getErrors = (notes, blockKeys, octaveKeys) => {
        const errors = [];

        if (notes.length < 3 || octaveKeys.length < 3) {
            errors.push('Enter the notes and octave keys from the puzzle (be sure to use Mickey\'s text).');

            return errors;
        }

        // there's no particular reason block keys would need to be the same for each line.
        // but, as far as I know they ARE always the same between lines. we've relied on this to implement single note hints, so enforce it, at least for now.
        const blockKeyMismatch = blockKeys.filter(key => JSON.stringify(key) !== JSON.stringify(blockKeys[0])).length > 0;
        if (blockKeyMismatch) errors.push('This solver only works for puzzles where the block keys for each line (i.e. first 3 numbers of octave key) are identical.');

        if (notes.length !== octaveKeys.length) {
            errors.push(`Number of notes lines (${notes.length}) must match number of octave key lines (${octaveKeys.length}).`);
        } else {
            for(let i = 0; i < notes.length; i++) {
                if (notes[i].length !== octaveKeys[i].length) {
                    console.log(notes[i], octaveKeys[i]);
                    errors.push(`Number of notes on line ${i} (${notes[i].length}) must match number of octave key values on line ${i} (${octaveKeys[i].length}).`);
                }
            }
        }

        return errors;
    }

    const getSingleNote = (decoderState, note, octaveKey) => {
        if (isNaN(octaveKey)) return '?';

        const blockKey = decoderState.blockKeys[0];

        // find the block element that matches the octave key for this note (sometimes the octaveKey is larger than the related block element)
        const blockElement = Math.max(...blockKey.filter(e => e <= octaveKey));
        // find the index of the block element we just matched
        const blockIndex = blockKey.indexOf(blockElement);
        // sum up all the intervals with indicies LTE the blockIndex (ask Styg, don't ask me). 
        const intervalTotal = decoderState.intervals
            .slice(0, blockIndex + 1)
            .reduce((acc, curr) => acc + curr, 0);

        // this is buggy in the same way as its predecessors. some counting bug when octaveKey doesn't match blockElement exactly.
        const adjustedNoteNum = ((notesToNums[note] + intervalTotal) % 12) + (blockIndex * 12);

        return alphas[adjustedNoteNum] || '*';
    };

    const getSolution = (decoderState) => {
        const translation = decoderState.notes
            .map((noteLine, lineIndex) => {
                return noteLine.map((note, charIndex) => {
                    const letter = getSingleNote(decoderState, note, decoderState.octaveKeys[lineIndex][charIndex]);
                    return letter;
                })
            });
        
        return translation;
    }

    return { getDecoderState, getSingleNote, getSolution }
};

export default songDecoder;
