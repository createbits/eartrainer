import { sample, sampleSize, range, startCase } from 'lodash'
import { intervals } from 'playnote'
import { playChord } from './ChordsGamePlayer.js'

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

const seventhChords = {
  minorSeventh: [
    ...minorTriad,
    { type: 'minor', distance: 7 },
  ],
  majorSeventh: [
    ...majorTriad,
    { type: 'major', distance: 7 },
  ],
  dominantSeventh: [
    ...majorTriad,
    { type: 'minor', distance: 7 },
  ],
  diminishedSeventh: [
    ...diminishedTriad,
    { type: 'major', distance: 6 },
  ],
  halfDiminishedSeventh: [
    ...diminishedTriad,
    { type: 'minor', distance: 7 },
  ],
}

const getPositionLabel = distance => {
  if (!distance) return ''
  if (distance === 2) return `${distance}nd`
  if (distance === 3) return `${distance}rd`

  return `${distance}th`
}

const getIntervalLabel = interval =>
  `${startCase(interval.type)} ${getPositionLabel(interval.distance)}`

const getIntervalAnswer = interval => ({
  label: getIntervalLabel(interval),
  value: interval,
})

const chordIntervals = [
  { type: 'minor', distance: 2 },
  { type: 'major', distance: 2 },
  { type: 'minor', distance: 3 },
  { type: 'major', distance: 3 },
  { type: 'perfect', distance: 4 },
  { type: 'tritone' },
  { type: 'perfect', distance: 5 },
  { type: 'minor', distance: 6 },
  { type: 'major', distance: 6 },
  { type: 'minor', distance: 7 },
  { type: 'major', distance: 7 },
  { type: 'octave', octave: 1 },
]

export const intervalAnswers = chordIntervals.map(i => getIntervalAnswer (i))

let lastKey

const chordDefinitionForMap = map => {
  const key = sample(Object.keys(map)
    .filter(key => key !== lastKey))
  lastKey = key

  return {
    label: startCase(key),
    intervals: [
      { type: 'octave' },
      ...map[key],
    ],
    play: playChord,
  }
}

const chordsMap = {
  simpleTriad() {
    return chordDefinitionForMap(basicTriads)
  },
  seventhChord() {
    return chordDefinitionForMap(seventhChords)
  },
  advancedTriad() {
    const triadIntervals = sampleSize(chordIntervals, 2)

    return {
      label: `Tonic, ${triadIntervals.map(i => getIntervalLabel(i)).join(', ')}`,
      intervals: [
        { type: 'octave' },
        ...triadIntervals,
      ],
      play: playChord,
    }
  },
}

export const generateChordsSets = ({ length, baseNoteLetter, mode, type }) => range(length)
  .map(() => ({
    baseNoteLetter,
    ...chordsMap[type](baseNoteLetter, mode),
  }))
