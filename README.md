# α video player - HTML5 Video Player (based on VideoJS)
![GitHub repo size](https://img.shields.io/github/repo-size/rezwanhaleem/a-video-player)
![GitHub package.json version](https://img.shields.io/github/package-json/v/rezwanhaleem/a-video-player)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/rezwanhaleem/a-video-player)
![GitHub issues](https://img.shields.io/github/issues/rezwanhaleem/a-video-player)

# Demo

## [α video player](http://a-video-player.infinityfreeapp.com/) <- Demo hosted on [Infinity Free](https://www.infinityfree.net/)

<br/>
<img src="https://i.imgur.com/FVIkEuR.png" alt="drawing" style="width:700px;"/>

Video Credits: Big Buck Bunny (code-named Project Peach) made by the Blender Institute.
<br/>
<br/>

# Built on VideoJS

> Video.js is a web video player built from the ground up for an HTML5 world. It supports HTML5 and Flash video, as well as YouTube and Vimeo (through [plugins](https://github.com/videojs/video.js/wiki/Plugins)). It supports video playback on desktops and mobile devices. This project was started mid 2010, and the player is now used on over ~~50,000~~ ~~100,000~~ 200,000 websites.

<br/>

# Features

## Editable Time Stamps

`Type in exact time or remaining time to skip to precise points in the video`

![Editable Time](https://media.giphy.com/media/vubFzpby8zbey02ypU/giphy.gif)

## Precise Volume

`Set you volume level to the exact percentage`

![Precise Volume](https://media.giphy.com/media/71gEhlriXiJNSd8gYW/giphy.gif)

## Powerful Playback Options

`Rewind or Fast Forward over 10 seconds(variable) or frame by frame`

![Playback](https://media.giphy.com/media/NPlGfmIXu00vm3fgLQ/giphy.gif)

## Fluid Track and View Options

`Captions, Subtitles and Chapters included along with a Light Box and Theather View`

![Fluid View](https://media.giphy.com/media/GVHGsByyRSGNyi2aSv/giphy.gif)
<br/>
<br/>

### Light Box
<img src="https://i.imgur.com/VJzHGr6.png" alt="drawing" style="width:700px;"/>

<br/>

# Git Submodules

## α video player font
https://github.com/rezwanhaleem/a-video-player-font

<br/>

# Usage

[Node >= v4.9.1](https://nodejs.org/en/)

[Grunt-CLI >= v0.1.13](https://nodejs.org/en/)

Install the required node.js modules using node package manager

```bash
npm install
```

> A note to Windows developers: If you run npm commands, and you find that your command prompt colors have suddenly reversed, you can configure npm to set color to false to prevent this from happening.
> `npm config set color false`
> Note that this change takes effect when a new command prompt window is opened; the current window will not be affected.

Build a local copy of α-video-player and run tests

```bash
grunt dist
grunt test
```

α-video-player is also configured to run tests with Karma. Karma is installed as a grunt plugin to run QUnit tests in real browsers, as opposed to simply running the tests in phantomjs, a headless browser. To run the tests with Karma:

```bash
grunt karma:dev
```

# [License](https://github.com/rezwanhaleem/a-video-player/blob/develop/LICENSE)

α-video-player is [licensed](https://github.com/rezwanhaleem/a-video-player/blob/develop/LICENSE) under the Apache License, Version 2.0.
