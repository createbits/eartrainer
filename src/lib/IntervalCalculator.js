import { reverseTransformNote, transformNote } from './NoteTransformer'
import { noteMap, rootNoteLetters } from './NoteSpriteCalculator'

const adjustHalfStepIndexForBiggerInterval = num => {
  if (num > 12) return num - 2
  if (num >= 9) return num - 1

  return num
}

const getIntervalHalfStepIndex = (type, intervalNum) => {
  if (intervalNum > 13) {
    throw Error('Distances bigger than 13 are not supported')
  }

  if (type === 'major') {
    return adjustHalfStepIndexForBiggerInterval((intervalNum - 1) * 2)
  } else if (type === 'minor') {
    return adjustHalfStepIndexForBiggerInterval((intervalNum - 1) * 2 - 1)
  } else if (type === 'perfect') {
    return (intervalNum - 1) * 2 - 1
  } else if (type === 'tritone') {
    return 6
  } else if (type === 'octave') {
    return 0
  }
}

const getDistanceFromType = type => {
  if (type === 'tritone') {
    return 4
  } else if (type === 'octave') {
    return 1
  }
}

const calculateOctave = (halfSteps, currentOctave) =>
  parseInt(currentOctave, 10) + (halfSteps === 13 ? 1 : (Math.ceil(halfSteps / 13) - 1))

export const getIntervals = (baseNote, intervals) => {
  const [letter, octave] = reverseTransformNote(baseNote)

  const baseNoteLetterRootNoteIndex = noteMap[letter].rootNoteIndex
  const baseNoteLetterHalfStepIndex = noteMap[letter].halfStepIndex

  return intervals.map(interval => {
    const { type, distance } = interval
    const octaveToAdd = interval.octave || 0

    const intervalNum = distance ? distance : getDistanceFromType(type)

    const intervalRootNoteIndex = (baseNoteLetterRootNoteIndex + (intervalNum - 1))
      % rootNoteLetters.length

    const intervalRootNoteLetter = rootNoteLetters[intervalRootNoteIndex]
    const absoluteIntervalHalfStepIndex = getIntervalHalfStepIndex(type, intervalNum)
      + baseNoteLetterHalfStepIndex

    const relativeIntervalHalfStepIndex = absoluteIntervalHalfStepIndex > 12 ?
      absoluteIntervalHalfStepIndex % 12
      : absoluteIntervalHalfStepIndex

    let intervalLetter = Object.keys(noteMap)
      .filter(l => l.startsWith(intervalRootNoteLetter)
      && noteMap[l].halfStepIndex === relativeIntervalHalfStepIndex)[0]

    const intervalOctave = calculateOctave(absoluteIntervalHalfStepIndex, octave) + octaveToAdd

    // special rules
    if (letter === 'cSharp' && distance === 7 && type === 'major') {
      intervalLetter = 'bSharp'
    } else if (letter === 'aFlat' && distance === 3 && type === 'minor') {
      intervalLetter = 'cFlat'
    }

    if (!intervalOctave || !intervalLetter) {
        throw new Error(
          `Could not define interval for ${type} - ${distance} with base ${baseNote}`,
        )
    }

    return transformNote(intervalLetter, intervalOctave)
  })
}
