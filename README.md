<h1><b>reddit-grabber</b>, a simple tool to get images and videos from Reddit </h1>

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

```javascript
const { get } = require('reddit-grabber')

async function getURL(type: string, subreddit: string, isOver18?: boolean) {
	try {
		const data = await get(type, subreddit, isOver18)
		return data //will return a object with a post data
	} catch (e) {
		console.error(e)
	}
}
// the catch here, is because the grabber will error if it can't find a post
```

<h2>Changing grabber config</h2>
The grabber exports a object with arrays, these include: file and video extensions and valid video links. You can modificate them by doing

```javascript
const { validMedia } = require('reddit-grabber')
validMedia.ImageExtensions.push('your extension')
validMedia.VideoExtensions.push('your extension')
validMedia.VideoUrls.push('your url')
```

Also, don't add a . to extensions

</br><h2>Got any issues? Be sure to report them on <a href="https://github.com/daimond113/reddit-fetcher/issues">GitHub/Issues</a>!</h2>
