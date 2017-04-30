export const transformNote = (letter, octave) => `${letter}_${octave}`

export const reverseTransformNote = note => note.split('_')
