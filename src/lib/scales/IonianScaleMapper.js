import { getIntervals } from '../IntervalCalculator'
import { reverseTransformNote, transformNote } from '../NoteTransformer'

export const map = (letter) => {
  const baseNote = transformNote(letter, 4)

  return [
    letter,
    ...getIntervals(baseNote, [
      { type: 'major', distance: 2 },
      { type: 'major', distance: 3 },
      { type: 'perfect', distance: 4 },
      { type: 'perfect', distance: 5 },
      { type: 'major', distance: 6 },
      { type: 'major', distance: 7 },
    ]).map(n => reverseTransformNote(n)[0])
  ]
}
