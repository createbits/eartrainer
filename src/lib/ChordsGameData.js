import { sample, range, startCase } from 'lodash'
import { intervals } from 'playnote'

const minorTriad = [
  { type: 'minor', distance: 3 },
  { type: 'perfect', distance: 5 },
]

const majorTriad = [
  { type: 'major', distance: 3 },
  { type: 'perfect', distance: 5 },
]

const diminishedTriad = [
  { type: 'minor', distance: 3 },
  { type: 'tritone' },
]

const augmentedTriad = [
  { type: 'major', distance: 3 },
  { type: 'minor', distance: 6 },
]

const basicTriads = {
  minorTriad,
  majorTriad,
  diminishedTriad,
  augmentedTriad,
}

const chordsMap = {
  basic() {
    const triadKey = sample(Object.keys(basicTriads))

    return {
      label: startCase(triadKey),
      intervals: [
        { type: 'octave' },
        ...basicTriads[triadKey],
      ],
    }
  }
}

const getPositionLabel = distance => {
  if (!distance) return ''
  if (distance === 2) return `${distance}nd`
  if (distance === 3) return `${distance}rd`

  return `${distance}th`
}

const getIntervalAnswer = interval => ({
  label: `${startCase(interval.type)} ${getPositionLabel(interval.distance)}`,
  value: interval,
})

export const generateChordsSets = ({ length, baseNoteLetter, type }) => range(length)
  .map(() => ({
    baseNoteLetter,
    ...chordsMap[type](),
  }))

export const getIntervalAnswers = () => {
  return [
    getIntervalAnswer({ type: 'minor', distance: 2 }),
    getIntervalAnswer({ type: 'major', distance: 2 }),
    getIntervalAnswer({ type: 'minor', distance: 3 }),
    getIntervalAnswer({ type: 'major', distance: 3 }),
    getIntervalAnswer({ type: 'perfect', distance: 4 }),
    getIntervalAnswer({ type: 'tritone' }),
    getIntervalAnswer({ type: 'perfect', distance: 5 }),
    getIntervalAnswer({ type: 'minor', distance: 6 }),
    getIntervalAnswer({ type: 'major', distance: 6 }),
    getIntervalAnswer({ type: 'minor', distance: 7 }),
    getIntervalAnswer({ type: 'major', distance: 7 }),
    getIntervalAnswer({ type: 'octave', octave: 1 }),
  ]
}
