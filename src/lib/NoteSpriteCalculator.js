import { range, flatMap } from 'lodash'
import { transformNote } from './NoteTransformer'

export const noteMap = {
  cFlat: {
    halfStepIndex: 0,
    rootNoteIndex: 0,
  },
  c: {
    halfStepIndex: 1,
    rootNoteIndex: 0,
  },
  cSharp: {
    halfStepIndex: 2,
    rootNoteIndex: 0,
  },
  dFlat: {
    halfStepIndex: 2,
    rootNoteIndex: 1,
  },
  d: {
    halfStepIndex: 3,
    rootNoteIndex: 1,
  },
  dSharp: {
    halfStepIndex: 4,
    rootNoteIndex: 1,
  },
  eFlat: {
    halfStepIndex: 4,
    rootNoteIndex: 2,
  },
  e: {
    halfStepIndex: 5,
    rootNoteIndex: 2,
  },
  eSharp: {
    halfStepIndex: 6,
    rootNoteIndex: 2,
  },
  fFlat: {
    halfStepIndex: 5,
    rootNoteIndex: 3,
  },
  f: {
    halfStepIndex: 6,
    rootNoteIndex: 3,
  },
  fSharp: {
    halfStepIndex: 7,
    rootNoteIndex: 3,
  },
  gFlat: {
    halfStepIndex: 7,
    rootNoteIndex: 4,
  },
  g: {
    halfStepIndex: 8,
    rootNoteIndex: 4,
  },
  gSharp: {
    halfStepIndex: 9,
    rootNoteIndex: 4,
  },
  aFlat: {
    halfStepIndex: 9,
    rootNoteIndex: 5,
  },
  a: {
    halfStepIndex: 10,
    rootNoteIndex: 5,
  },
  aSharp: {
    halfStepIndex: 11,
    rootNoteIndex: 5,
  },
  bFlat: {
    halfStepIndex: 11,
    rootNoteIndex: 6,
  },
  b: {
    halfStepIndex: 12,
    rootNoteIndex: 6,
  },
  bSharp: {
    halfStepIndex: 0,
    rootNoteIndex: 6,
  },
}

export const rootNoteLetters = Object.keys(noteMap).filter(note => note.length === 1)

const notePlayLengthMs = 2000
const octavePlayLength = notePlayLengthMs * 12

const getSingleNoteSpriteData = (letter, octave) => {
  return [
    { key: letter, start: calculateNoteStart(letter, octave) }
  ]
}

export const calculateNoteStart = (letter, octave) => (
  (octave - 1) * octavePlayLength + (noteMap[letter].halfStepIndex - 1) * notePlayLengthMs
)

const noteSpriteData = range(1, 9).reduce((acc, octaveNum) => {
  const singleNotes = flatMap(
    Object.keys(noteMap),
    noteLetter => getSingleNoteSpriteData(noteLetter, octaveNum),
  )

  return {
    ...acc,
    ...singleNotes.reduce((noteAcc, noteData) => ({
      ...noteAcc,
      [transformNote(noteData.key, octaveNum)]: [noteData.start, 2000],
    }), {})
  }
}, {})

export const getNoteSpriteData = () => noteSpriteData
