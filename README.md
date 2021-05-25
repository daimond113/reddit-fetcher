# <b>reddit-grabber</b>, a simple tool to get images and videos from Reddit

![Libraries.io dependency status for latest release, scoped npm package](https://img.shields.io/librariesio/release/npm/reddit-grabber)
[![GitHub issues](https://img.shields.io/github/issues/daimond113/reddit-fetcher?logo=github)](https://github.com/daimond113/reddit-fetcher/issues)
![GitHub package.json version](https://img.shields.io/github/package-json/v/daimond113/reddit-fetcher?logo=github)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/daimond113/reddit-fetcher?logo=github)

<h2>How to install:</h2></br>
It's simple! </br>
<ol>
<li>Be sure to have npm installed, it comes preinstalled with <a href="https://nodejs.org/en/download/">Node.js</a></li>
<li>Run <code>npm i reddit-grabber</code></li>
</ol>
There! Now you're ready to use the grabber!

<h2>How to use:</h2></br>
<h3>Getting an image/video URL</h3>

```typescript
import { get } from 'reddit-grabber'

async function (
	type: 'Image' | 'Video',
	subreddit: string,
	isOver18?: boolean
) {
	return await get(type, subreddit, isOver18).catch((e) => {
		console.error(
			`An error has occured, it's probably because the grabber can't find anything. ${e.message}`
		)
	})
}
// the catch here, is because the grabber will error if it can't find a post
```

<h2>Changing grabber config</h2>
The grabber exports a object with arrays, these include: file and video extensions and valid video links. You can modificate them by doing

```typescript
import { validMedia } from 'reddit-grabber'
validMedia.ImageExtensions.push('png')
validMedia.VideoExtensions.push('mp4')
validMedia.VideoUrls.push('youtu.be')
```

Don't add any dots to extensions, and don't add http/https to urls.

</br><h2>Got any issues? Be sure to report them on <a href="https://github.com/daimond113/reddit-fetcher/issues">GitHub/Issues</a>!</h2>
