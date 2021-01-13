const axios = require('axios')

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min)) + min
}
const fileExtensions = {
	ImageExtensions: [ 'png', 'jpeg', 'jpg' ],
	VideoExtensions: [ 'gif', 'wmv', 'mp4', 'mov', 'webm' ]
}

function check(post, videoOrImg, isOver18) {
	let check1 = false
	let check2 = false
	if (post.data.url_overridden_by_dest && (isOver18 || !post.data.over_18)) {
		check1 = true
		if (videoOrImg === 'video') {
			for (let i = 0; i < fileExtensions.VideoExtensions.length; i++) {
				if (post.data.url_overridden_by_dest.toLowerCase().endsWith(fileExtensions.VideoExtensions[i])) {
					check2 = true
				}
			}
		} else if (videoOrImg == 'img') {
			for (let i = 0; i < fileExtensions.ImageExtensions.length; i++) {
				if (post.data.url_overridden_by_dest.toLowerCase().endsWith(fileExtensions.ImageExtensions[i])) {
					check2 = true
				}
			}
		}
	}
	return check1 && check2
}

module.exports.returnImage = async (subreddit, over18) => {
	let isOver18
	if (over18 == null || over18 == undefined) {
		isOver18 = false
	} else {
		isOver18 = over18
	}
	const response = await axios.get(`https://reddit.com/r/${subreddit}.json`)
	const children = response.data.data.children
	let retriesArg = 25
	let whileIndex = 0
	while (whileIndex < retriesArg) {
		let post = children[getRndInteger(0, children.length)]
		const success = await check(post, 'img', isOver18)
		if (success) {
			return post.data.url_overridden_by_dest
		} else {
			children.splice(post, 1)
			post = children[getRndInteger(0, children.length)]
			whileIndex++
		}
	}
	throw new Error('Sadly, no images were found.')
}

module.exports.returnVideo = async (subreddit, over18) => {
	let isOver18
	if (over18 == null || over18 == undefined) {
		isOver18 = false
	} else {
		isOver18 = over18
	}
	const response = await axios.get(`https://reddit.com/r/${subreddit}.json`)
	const children = response.data.data.children
	let retriesArg = 25
	let whileIndex = 0
	while (whileIndex < retriesArg) {
		let post = children[getRndInteger(0, children.length)]
		const success = await check(post, 'video', isOver18)
		if (success) {
			return post.data.url_overridden_by_dest
		} else {
			children.splice(post, 1)
			post = children[getRndInteger(0, children.length)]
			whileIndex++
		}
	}
	throw new Error('Sadly, no videos were found.')
}
