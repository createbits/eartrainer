import { sample, drop, take } from 'lodash'
import { playSequence, scale } from 'playnote'

export const playRandomSequence = async (twoFiveOneSequence, answers) => {
  const answer = sample(answers)

  await playSequence([
    ...twoFiveOneSequence,
    { notes: [answer.value], length: 1000, offset: 1000 },
  ])

  return answer.value
}

export const playResolveToTonic = async (roundAnswer, scaleNotes) => {
  const toneIndex = scaleNotes.indexOf(roundAnswer)

  let resolvingTones = [scaleNotes[0]]

  if (toneIndex > 0) {
    resolvingTones = toneIndex >= 4
      ? drop(scaleNotes, toneIndex)
      : take(scaleNotes, (toneIndex + 1)).reverse()
  }

  return await playSequence(resolvingTones.map((note, i) => ({
    notes: [note],
    length: (i === 0 || (resolvingTones.length - 1) === i) ? 800 : 400,
  })))
}

export const generateTwoFiveSequence = scale => [
  { notes: scale.base(4).notes([2, 4, 6]), length: 800 },
  { notes: scale.base(4).notes([5, 7, 9]), length: 800 },
  { notes: scale.base(4).notes([1, 3, 5]), length: 1600 },
]

export const generateScaleNotes = scale => scale.base(4).notes([1, 2, 3, 4, 5, 6, 7, 8])
export const scaleFromSet = set => scale(set.baseNoteLetter, set.mode)
