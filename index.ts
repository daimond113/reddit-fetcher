import axios from 'axios'

function getRndInteger(min: number, max: number) {
	return Math.floor(Math.random() * (max - min)) + min
}

export const validMedia = {
	ImageExtensions: ['png', 'jpeg', 'jpg'],
	VideoExtensions: ['gif', 'wmv', 'mp4', 'mov', 'webm'],
	VideoUrls: ['youtube.com', 'youtu.be', 'reddit.com', 'redd.it'],
}

type AnyCase<T extends string> = string extends T
	? string
	: T extends `${infer F1}${infer F2}${infer R}`
	? `${Uppercase<F1> | Lowercase<F1>}${
			| Uppercase<F2>
			| Lowercase<F2>}${AnyCase<R>}`
	: T extends `${infer F}${infer R}`
	? `${Uppercase<F> | Lowercase<F>}${AnyCase<R>}`
	: ''

type RedditGrabberResultType = AnyCase<'video' | 'image'>

interface PostArg {
	data: {
		url_overridden_by_dest?: string
		over_18: boolean
		url?: string
		author: string
		title: string
		permalink: string
	}
	index: number
}
interface Post {
	children: PostArg[]
}

interface RedditGrabberResult {
	media: string
	url: string
	title: string
	author: string
}

function check(
	post: PostArg,
	type: RedditGrabberResultType,
	isOver18: boolean
) {
	const url = post.data.url_overridden_by_dest?.toLowerCase()
	if (url && (isOver18 || !post.data.over_18)) {
		const extension =
			type === 'Video' ? validMedia.VideoExtensions : validMedia.ImageExtensions
		const extensionBool = extension.some((v) => url.endsWith(v))
		return type === 'Image'
			? extensionBool
			: extensionBool ||
					validMedia.VideoUrls.some((v) => url.match(new RegExp(v, 'gi')))
	}
}

export async function get(
	type: RedditGrabberResultType,
	subreddit: string,
	over18 = false
): Promise<RedditGrabberResult> {
	if (type.toLowerCase() !== 'video' && type.toLowerCase() !== 'image') {
		throw new TypeError(
			`Type expected string of 'Image' or 'Video', got "${type}" with the type of "${typeof type}"`
		)
	}
	if (typeof subreddit !== 'string') {
		throw new TypeError(
			`Subreddit expected string, got "${subreddit}" with the type of "${typeof subreddit}"`
		)
	}

	const response = await axios.get(`https://reddit.com/r/${subreddit}.json`)
	const children = (response.data.data as Post).children
	const retries = children.length ?? 25
	let whileIndex = 0
	while (whileIndex < retries) {
		let post = children[getRndInteger(0, children.length)]
		if (!post) continue
		post.index = whileIndex
		if (check(post, type, over18)) {
			const returnObject: RedditGrabberResult = {
				media: post.data.url_overridden_by_dest ?? post.data.url ?? '',
				url: `https://reddit.com${post.data.permalink}` ?? '',
				author: post.data.author ?? '',
				title: post.data.title ?? '',
			}
			return returnObject
		} else {
			children.splice(
				children.findIndex((o) => o.index === whileIndex),
				1
			)
			whileIndex++
		}
	}
	throw new Error(`No ${type.toLowerCase()}s were found.`)
}
