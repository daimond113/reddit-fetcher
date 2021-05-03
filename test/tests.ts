import fetcher from '../build'

fetcher('Image', 'funny').then((img) => {
	console.log(`IGNORE THIS, ITS A PART OF TESTS, IMAGE URL: ${img}`)
})
