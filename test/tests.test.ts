import { get } from '../index'
const urlRegEx = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi

test('image found', () =>
	expect(get('Image', 'onlyimages').then((r) => r.url)).resolves.toMatch(
		urlRegEx
	))

test('no image', () =>
	expect(get('Image', 'dogvideos')).rejects.toThrow(/were found/gi))

test('video found', () =>
	expect(get('Video', 'dogvideos').then((r) => r.url)).resolves.toMatch(
		urlRegEx
	))

test('no video', () =>
	expect(get('Video', 'onlyimages')).rejects.toThrow(/were found/gi))
