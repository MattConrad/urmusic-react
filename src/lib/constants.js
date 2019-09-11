const scale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const flatToSharp = {
    "Db": "C#",
    "Eb": "D#",
    "Gb": "F#",
    "Ab": "G#",
    "Bb": "A#"
};

const intervalToSemitone = {
    "per unison": 0,
    "min second": 1,
    "maj second": 2,
    "min third": 3,
    "maj third": 4,
    "per fourth": 5,
    "dim 5th/aug 4th": 6,
    "per fifth": 7,
    "min sixth": 8,
    "maj sixth": 9,
    "min seventh": 10,
    "maj seventh": 11,
    "per octave": 12
};

export { scale, flatToSharp, intervalToSemitone };
