import { map as mapIonian } from './scales/IonianScaleMapper'
import { map as mapAeolian } from './scales/AeolianScaleMapper'

const scales = {
  major: mapIonian,
  minor: mapAeolian,

  ionian: mapIonian,
  aeolian: mapAeolian,
}

export const scale = (baseNote, scaleKey = 'major') => {
  const mapScale = scales[scaleKey]

  if (!mapScale) {
    throw new Error(`Scale "${scaleKey}" not recognized`)
  }

  const degrees = mapScale(baseNote)

  return {
    getDegree: (indexPlusOne) => degrees[indexPlusOne - 1],
    getDegrees: () => degrees,
  }
}
