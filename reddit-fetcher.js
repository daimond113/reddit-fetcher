const axios = require('axios')

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min)) + min
}
const fileExtensions = {
	ImageExtensions: ['png', 'jpeg', 'jpg'],
	VideoExtensions: ['gif', 'wmv', 'mp4', 'mov', 'webm'],
}

function check(post, type, isOver18) {
	let checked = 0
	const url = post.data.url_overridden_by_dest
	const urlToCheck = url && url.toLowerCase()
	if (url && (isOver18 || !post.data.over_18)) {
		checked = 1
		if (type === 'Video') {
			for (let i = 0; i < fileExtensions.VideoExtensions.length; i++) {
				if (urlToCheck.endsWith(fileExtensions.VideoExtensions[i])) {
					checked = 2
					break
				}
			}
		} else if (type == 'Image') {
			for (let i = 0; i < fileExtensions.ImageExtensions.length; i++) {
				if (urlToCheck.endsWith(fileExtensions.ImageExtensions[i])) {
					checked = 2
					break
				}
			}
		}
	}
	return checked === 2
}

/**
 * @param {"Video"|"Image"} type
 * @param {string} subreddit
 * @param {boolean} [over18=false]
 * @returns {Promise<string>}
 */

module.exports.return = async (type, subreddit, over18 = false) => {
	if (typeof type !== 'string' || (type !== 'Video' && type !== 'Image')) {
		throw new TypeError(
			`Argument type: string with value "Video" or "Image" expected, got ${typeof type}`
		)
	}
	if (typeof subreddit !== 'string') {
		throw new TypeError(
			`Argument subreddit expected string, got ${typeof subreddit}`
		)
	}

	over18 = over18 || false // Only for safety

	const response = await axios.get(`https://reddit.com/r/${subreddit}.json`)
	const children = response.data.data.children
	let retriesArg = 25
	let whileIndex = 0
	while (whileIndex < retriesArg) {
		let post = children[getRndInteger(0, children.length)]
		const success = check(post, type, over18)
		if (success) {
			return post.data.url_overridden_by_dest
		} else {
			children.splice(post, 1)
			post = children[getRndInteger(0, children.length)]
			whileIndex++
		}
	}
	throw new Error(`Sadly, no ${type}s were found.`)
}
