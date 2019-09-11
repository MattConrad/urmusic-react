import { scale, flatToSharp } from './constants';

const defaultTokenRightPad = 3;
const defaultNoteLineLeftPad = defaultTokenRightPad * 3;
const invalidNoteCharsRegExp = /[^A-Gb#\n]/g;
const invalidOctaveKeyCharsRegExp = /[^0-9*\n]/g;

const formatter = () => {

    const getFormattedNotesText = (originalNotesText) => {
        const notesTokens = getNotesTokens(originalNotesText);

        return getFormattedText(notesTokens, defaultTokenRightPad, defaultNoteLineLeftPad);
    }

    const getFormattedOctaveKeysText = (originalOctaveKeysText) => {
        const okTokens = getOctaveKeysTokens(originalOctaveKeysText);

        return getFormattedText(okTokens, defaultTokenRightPad, 0);
    }

    const getFormattedText = (tokensArrays, padTokenRight, padLineLeft) => {
        const formattedLines = tokensArrays.map((tokens) => { 
            return tokens.map((token) => token.padEnd(padTokenRight, ' ')).join('');
        });

        const leftPadding = new Array(padLineLeft + 1).join(' ');

        return formattedLines.map((line) => leftPadding + line).join('\n');
    }

    const getOctaveKeysTokens = (originalOctaveKeysText) => {
        const fixedText = originalOctaveKeysText.trim().replace(invalidOctaveKeyCharsRegExp, "");

        const lines = fixedText.split('\n');
        
        return lines.map((line) => {
            return line.split('');
        })
    }

    const getNotesTokens = (originalNotesText) => {
        const fixedText = originalNotesText.trim().replace(invalidNoteCharsRegExp, "");
        
        const lines = fixedText.split('\n');

        const validTokens = scale.concat(Object.keys(flatToSharp));

        const tokensArrays = []
        for(const line of lines) {
            const tokens = [];
            for(let i = 0; i < line.length; i++) {
                // if this is not the last char, look ahead and handle sharps/flats specially.
                if (i + 1 < line.length && (line[i+1] === '#' || line[i+1] === 'b')) {
                    tokens.push(line[i] + line[i+1]);
                    i++;
                } else {
                    tokens.push(line[i]);
                }
            }

            // user could have still slipped garbage past the regex. remove any non-note tokens.
            const fixedTokens = tokens.filter((tok) => validTokens.indexOf(tok) > -1);

            tokensArrays.push(fixedTokens);
        };

        return tokensArrays.filter((arr) => arr.length > 0);
    };

    return { getFormattedNotesText, getFormattedOctaveKeysText };
};

export default formatter;
