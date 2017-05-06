import { range, sample } from 'lodash'
import { note, scale, rootNoteLetters } from 'playnote'
import { formatLetter } from 'playnote/src/NoteTransformer'

const mapNoteToAnswer = note => ({
  value: note,
  label: formatLetter(note).replace('_', ' '),
})

export const generateBeginnerNoteSets = ({ length, mode, letters }) => {
  const answers = letters.map(d => note(d, 4)).map(mapNoteToAnswer)

  return {
    sets: range(length).map(() => ({
      baseNoteLetter: 'c',
      mode,
      answers,
    })),
  }
}

export const generateInKeyWithConstantNoteGameSets = ({ length, baseNoteLetter, mode }) => {
  const answers = scale(baseNoteLetter, mode)
    .base(4)
    .notes([1, 2, 3, 4, 5, 6, 7, 8])
    .map(mapNoteToAnswer)

  return {
    sets: range(length).map(() => ({
      baseNoteLetter,
      mode,
      answers,
    })),
  }
}

export const generateAllNotesWithConstantModeNoteSets = ({ length, mode }) => {
  return {
    sets: range(length)
      .map(() => sample(rootNoteLetters))
      .map((baseNoteLetter) => ({
        baseNoteLetter,
        mode,
        answers: scale(baseNoteLetter, mode)
          .base(4)
          .notes([1, 2, 3, 4, 5, 6, 7, 8])
          .map(mapNoteToAnswer),
      })),
  }
}
