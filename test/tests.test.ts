import { get } from '../index'

test('image found', () =>
	expect(get('Image', 'onlyimages')).resolves.toMatch(
		/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
	))

test('no image', () =>
	expect(get('Image', 'videos')).rejects.toThrow(/were found/gi))
