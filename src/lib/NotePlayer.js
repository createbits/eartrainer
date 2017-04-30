import { rootNoteLetters, getNoteSpriteData } from './NoteSpriteCalculator'
import { getIntervals } from './IntervalCalculator'
import { transformNote } from './NoteTransformer'
import { scale as mapScale } from './ScaleMapper'
import { Howl } from 'howler'

const sprite = getNoteSpriteData()

/*
play(note('dSharp', 3))
scale(note('c', 4), 'major').playNote(1)
*/
// TODO: add possibility to play notes in a given scale
// TODO: add possibility to play chords in a given scale
// TODO: release as library

const piano = new Howl({
  src: ['/mp3/ps.mp3'],
  loop: false,
  autoplay: false,
  sprite,
})

export const note = transformNote
export const scale = (baseNote, scale) => mapScale(baseNote, scale)

export const play = (notes, fadeMs = -1, waitMs = 0) => {
  if (!Array.isArray(notes)) {
    notes = [notes]
  }

  const ids = notes.map(n => piano.play(n))

  if (fadeMs > -1) {
    setTimeout(() => ids.forEach(id => piano.fade(1, 0, fadeMs, id)), waitMs)
  }
}

export const playSequence = async (noteSequence) => {
  const [n, ...restNoteSequence] = noteSequence

  if (n.offset) await new Promise(res => setTimeout(res, n.offset))

  play(n.notes, n.length * 0.2, n.length * 0.8)

  await new Promise(res => setTimeout(res, n.length - (n.length * 0.1)))

  return restNoteSequence.length > 0 ? playSequence(restNoteSequence) : null
}

// TODO: remove
export const notesForChord = (base, intervals) => [
  base,
  ...getIntervals(base, intervals),
]

export { rootNoteLetters }
