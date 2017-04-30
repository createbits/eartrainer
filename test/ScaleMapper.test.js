import { scale } from '../src/lib/ScaleMapper'

test('validly maps default major scale', () => {
  expect(scale('d').getDegrees()).toEqual(
    ['d', 'e', 'fSharp', 'g', 'a', 'b', 'cSharp'],
  )
})

test('validly retrieves a single degree', () => {
  expect(scale('c').getDegree(1)).toEqual('c')
  expect(scale('c').getDegree(7)).toEqual('b')
  expect(scale('c', 'minor').getDegree(7)).toEqual('bFlat')
  expect(scale('c', 'minor').getDegree(5)).toEqual('g')
  expect(scale('c', 'ionian').getDegree(5)).toEqual('g')
  expect(scale('f', 'ionian').getDegree(4)).toEqual('bFlat')
  expect(scale('cSharp', 'minor').getDegree(3)).toEqual('e')
})

test('validly maps ionian / major scale', () => {
  expect(scale('c', 'ionian').getDegrees()).toEqual(
    ['c', 'd', 'e', 'f', 'g', 'a', 'b'],
  )
  expect(scale('c', 'major').getDegrees()).toEqual(
    ['c', 'd', 'e', 'f', 'g', 'a', 'b'],
  )
  expect(scale('f', 'ionian').getDegrees()).toEqual(
    ['f', 'g', 'a', 'bFlat', 'c', 'd', 'e'],
  )
  expect(scale('cSharp', 'major').getDegrees()).toEqual(
    ['cSharp', 'dSharp', 'eSharp', 'fSharp', 'gSharp', 'aSharp', 'bSharp'],
  )
  expect(scale('aFlat', 'major').getDegrees()).toEqual(
    ['aFlat', 'bFlat', 'c', 'dFlat', 'eFlat', 'f', 'g'],
  )
})

test('validly maps aeolian / minor scale', () => {
  expect(scale('c', 'minor').getDegrees()).toEqual(
    ['c', 'd', 'eFlat', 'f', 'g', 'aFlat', 'bFlat'],
  )
  expect(scale('a', 'aeolian').getDegrees()).toEqual(
    ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  )
  expect(scale('aFlat', 'minor').getDegrees()).toEqual(
    ['aFlat', 'bFlat', 'cFlat', 'dFlat', 'eFlat', 'fFlat', 'gFlat'],
  )
  expect(scale('bFlat', 'aeolian').getDegrees()).toEqual(
    ['bFlat', 'c', 'dFlat', 'eFlat', 'f', 'gFlat', 'aFlat'],
  )
})
