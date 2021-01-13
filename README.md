<h1><b>reddit-fetcher</b>, a simple tool to get images and videos from Reddit </h1>

![Libraries.io dependency status for latest release, scoped npm package](https://img.shields.io/librariesio/release/npm/@daimond113/reddit-fetcher)
[![GitHub issues](https://img.shields.io/github/issues/daimond113/reddit-fetcher?logo=github)](https://github.com/daimond113/redditFetcher/issues)
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
<h3>Getting an image URL</h3>

```javascript
const redditFetcher = require('@daimond113/reddit-fetcher') //get the fetcher

async function getImage(subreddit, isOver18) {
	//Remember, subreddit has to be a **string** and isOver18 a **boolean**
	try {
		const image = await redditFetcher.returnImage(subreddit, isOver18) //await until image URL is returned
		return image //will return image URL
	} catch (erro) {
		console.error(erro)
	}
}

/*
Be sure to add an catch! Fetcher fails sometimes, when it can't find an image/video
*/     
```

<h3>Getting an video URL</h3>

```javascript
const redditFetcher = require('@daimond113/reddit-fetcher') //get the fetcher

async function getVideo(subreddit, isOver18) {
	//Remember, subreddit has to be a **string** and isOver18 a **boolean**
	try {
		const video = await redditFetcher.returnVideo(subreddit, isOver18) //await until video URL is returned
		return video //will return video URL
	} catch (erro) {
		console.error(erro)
	}
}

/*
Remember about the catch! It's especially important in videos, as they fail really often
*/     
```

</br><h2>Got any issues? Be sure to report them on <a href="https://github.com/daimond113/reddit-fetcher/issues">GitHub/Issues</a>!</h2>
