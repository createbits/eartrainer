import { rootNoteLetters, getNoteSpriteData } from './NoteSpriteCalculator'
import { transformNote } from './NoteTransformer'
import { scale as mapScale } from './ScaleMapper'
import { Howl } from 'howler'

const sprite = getNoteSpriteData()

/*
import { init, scale, play, note } from 'playnote'

init('/mp3/soundSprite.mp3').then(() => {
  play(note('dSharp', 3))
  play(scale('d', 'minor').base(3).note(1))
  play(scale('c', 'major').base(3).notes(5, 7, 9))
})
*/
// TODO: release as library

let audioSource

export const init = async (src) => new Promise(res => audioSource = new Howl({
  src: [src],
  loop: false,
  autoplay: false,
  sprite,
  onload: res,
}))

export const note = transformNote

export const scale = (baseNote, mode) => mapScale(baseNote, mode)

export const wait = ms => new Promise(res => setTimeout(res, ms))

export const play = (notes, fadeMs = -1, waitFadeMs = 0) => {
  if (!Array.isArray(notes)) {
    notes = [notes]
  }

  if (!audioSource) {
    throw new Error('Not initialized (call init)')
  }

  const ids = notes.map(n => audioSource.play(n))

  if (fadeMs > -1) {
    setTimeout(() => ids.forEach(id => audioSource.fade(1, 0, fadeMs, id)), waitFadeMs)
  }
}

export const playSequence = async (noteSequence) => {
  const [n, ...restNoteSequence] = noteSequence

  if (n.offset) await wait(n.offset)

  play(n.notes, n.length * 0.2, n.length * 0.8)

  await wait(n.length - (n.length * 0.1))

  return restNoteSequence.length > 0 ? playSequence(restNoteSequence) : null
}

export { rootNoteLetters }
