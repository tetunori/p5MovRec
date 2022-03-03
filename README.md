
# Description 🎥
**p5.MovRec** is a simple movie recording tool for p5.js.  
You can generate a high quality movie from your sketch by adding just **1 line** to the HTML.  
Generated movies can be uploaded to YouTube right away!  
(for Twitter, need conversion. Use [Convertio](https://convertio.co/webm-mp4/) for example.)

https://user-images.githubusercontent.com/14086390/156571916-22338421-a9d4-4b19-9099-ad8d63e3f8f8.mp4

This tool is for who...  
 - would like to make a movie of one's work easily.  
 - would like to upload one's work to SNSs and pursue simplicity rather than quality.
 - As long as the image quality is improved, it's OK with`vp9` codec instead of `h264` codec.

and is **NOT** for who...  
 - think the movie of one's work must be high quality and uncompressed.

Now, the version is `1.0.0`(Deleted transcoding function by ffmpeg-wasm). 

# Simple Usage
## Environment 
Assume PC(Win/Mac) Environment.
Due to the dependency to `MediaRecorder`, we highly recommend to use **Google Chrome**.  
This tool works fine in both [P5 WebEditor](https://editor.p5js.org/) and [OpenProcessing](https://www.openprocessing.org/).  

## Import library
Just insert 1 script after `p5.js` script in your `<head>`.  

```html 
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>

<!-- INSERT HERE -->
<script src="https://tetunori.github.io/p5MovRec/dist/1.0.0/basic/p5MovRec.js"></script>
```

## JUST REC IT!
1. Press `1` key to start recording. `🎥Start Recording.` text will be shown in Console.  
<img src="https://tetunori.github.io/p5MovRec/images/startRecording.png" alt="startRecording" width="375px">  

2. Then, press `2` key to stop recording and browser instantly generates `webm` format movie! `✅Recorded.` text will be also shown in Console. This `webm` format movie can be watched in your browser.  
<img src="https://tetunori.github.io/p5MovRec/images/stopRecording.png" alt="stopRecording" width="375px"> 

3. Movie files can be downloaded like below and are named `YYYYMMDDhhmmss.webm`.  
<img src="https://tetunori.github.io/p5MovRec/images/downloadMovies.png" alt="downloadMovies" width="500px"> 

4. If you have already `keyPressed()` function, you need add start/stop-recording function in your `keyPressed()` like below. You can use `p5.MovRec` instance and its methods `startRec()` and `stopRec()`.  

```javascript
function keyPressed() {
  switch (keyCode) {
    case 49: //1: Start record
      p5MovRec.startRec();
      break;
    case 50: //2: Stop record
      p5MovRec.stopRec();
      break;
    default:
      break;
  }
}
```

### Key Operation Matrix
|  Key  |  Note  |
| ---- | ---- |
|  `1`  |  Start Recording.  |
|  `2`  |  Stop Recording.  |

## Samples 
 - [Basic Sample On GitHub](https://tetunori.github.io/p5MovRec/sample/basic/)
 - [Basic Sample On OpenProcessing](https://openprocessing.org/sketch/1212512)　

## WARNING
### On `canvas`
Since this tool makes movie from the stream of `canvas` created in `createCanvas()`, `#つぶやきProcessing` guys and `#p5t` guys should move `createCanvas()` into `setup()` on recording like below.  

Starndard `#つぶやきProcessing` code: 
```javascript
t=0 
draw=_=>{
  createCanvas(w=720,w)
  noStroke(fill('#つぶやきProcessing'))
  ...
```

Please change as:
```javascript
t=0 
w=720
setup=_=>{ createCanvas(w,w) }
draw=_=>{
  noStroke(fill('#つぶやきProcessing'))
  ...
```

# If you would like to decide recoding timing.
For advanced people, I will introduce how to make an instance for `p5.MovRec`.

## Import library
Just insert 1 script after `p5.js` script in your `<head>`. Be carefull about **the URL is defferent** from the basic one. 

```html 
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>

<!-- INSERT HERE -->
<script src="https://tetunori.github.io/p5MovRec/dist/1.0.0/advanced/p5MovRec.js"></script>
```

## Use in your Sketch
### Make instance just after `createCanvas()`.
Prepare your instance and call `P5MovRec()` like below.

```javascript
let myP5MovRec;  // Please prepare instance in global 

function setup() {
  createCanvas( 720, 720 );
  myP5MovRec = new P5MovRec();
}
```

### Start/Stop Recording
It is almost same as basic usecase like below.

```javascript
function keyPressed() {
  switch (keyCode) {
    case 49: //1: Start record
      myP5MovRec.startRec();
      break;
    case 50: //2: Stop record
      myP5MovRec.stopRec();
      break;
    default:
      break;
  }
}
```

## Samples 
 - [Advanced Sample On GitHub](https://tetunori.github.io/p5MovRec/sample/advanced/)
 - [Advanced Sample On OpenProcessing](https://openprocessing.org/sketch/1212513) 

### Issue
So far, there is no issues.

# Licence
This software is released under MIT License, see LICENSE.

# Author
Tetsunori NAKAYAMA.

# References
Article (in Japanese only.)  
https://qiita.com/tetunori_lego/items/c942eb2aad844b72dadb

MediaRecorder  
https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder
