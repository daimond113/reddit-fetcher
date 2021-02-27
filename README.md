<h1><b>reddit-fetcher</b>, a simple tool to get images and videos from Reddit </h1>

![Libraries.io dependency status for latest release, scoped npm package](https://img.shields.io/librariesio/release/npm/@daimond113/reddit-fetcher)
[![GitHub issues](https://img.shields.io/github/issues/daimond113/reddit-fetcher?logo=github)](https://github.com/daimond113/reddit-fetcher/issues)
![GitHub package.json version](https://img.shields.io/github/package-json/v/daimond113/reddit-fetcher?logo=github)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/daimond113/reddit-fetcher?logo=github)

<h2>How to install:</h2></br>
It's simple! </br>
<ol>
<li>Be sure to have npm installed, it comes preinstalled with <a href="https://nodejs.org/en/download/">Node.js</a></li>
<li>Run <code>npm i @daimond113/reddit-fetcher</code></li>
</ol>
There! Now you're ready to use the fetcher!

<h2>How to use:</h2></br>
<h3>Getting an image/video URL</h3>

```javascript
const redditFetcher = require('@daimond113/reddit-fetcher')

async function getURL(type, subreddit, isOver18) {
	/*
		type: "Video" or "Image"
		subreddit: string
		isOver18: boolean
	*/
	try {
		const url = await redditFetcher.return(type, subreddit, isOver18)
		return url //will return the type URL
	} catch (erro) {
		console.error(erro)
	}
}

/*
Be sure to add an catch! Fetcher fails sometimes, when it can't find an image/video
*/
```

</br><h2>Got any issues? Be sure to report them on <a href="https://github.com/daimond113/reddit-fetcher/issues">GitHub/Issues</a>!</h2>
