export const transformNote = (letter, octave) => `${letter}_${octave}`

export const reverseTransformNote = note => note.split('_')

export const formatLetter = lettter => lettter
  .replace('Sharp', '#')
  .replace('Flat', '♭')
  .toUpperCase()
