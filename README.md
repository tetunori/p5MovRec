
# Description 🎥
**p5.MovRec** is a simple movie recording tool for p5.js.  
You can generate a high quality movie from your sketch by adding just **2 lines** to the HTML.  
Generated movies can be uploaded to Twitter or YouTube right away!

This tool is for who...  
 - would like to make a movie of one's work easily.  
 - would like to upload one's work to **Twitter** and pursue simplicity rather than quality.
 - want Today to be the last day to wait for ffmpeg to concatenate a lot of still images of your work and render. 
 - As long as the image quality is improved, it's OK with converting to `vp9` instead of `h264`.

and is **NOT** for who...  
 - think the movie of one's work must be high quality and uncompressed.
 - love transcoding and fine tuning in ffmpeg.

Now, the version is 0.5.0. (alpha release)

# Simple Usage
## Environment 
Assume PC(Win/Mac) Environment.
Due to the dependency to `MediaRecorder` and `ffmpeg.wasm`, we highly recommend to use **Google Chrome**.  
This tool works fine in both [P5 Editor](https://editor.p5js.org/) and [OpenProcessing](https://www.openprocessing.org/).  

## Import library
Just insert 2 scripts after `p5.js` script in your `<head>`.  
```html 
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/p5.js"></script>

<!-- INSERT HERE -->
<script src="https://unpkg.com/@ffmpeg/ffmpeg@0.10.0/dist/ffmpeg.min.js"></script>
<script src="https://tetunori.github.io/p5MovRec/dist/0.5.0/basic/p5MovRec.js"></script>
```

## JUST REC IT!
1. Press `r` key to start recording. `🎥Start Recording.` text will be shown in Console.  
<img src="https://tetunori.github.io/p5MovRec/images/startRecording.png" alt="startRecording" width="375px">  

2. Then, press `w` key to stop recording and browser instantly generates `webm` format movie! `✅Recorded.` text will be also shown in Console. This `webm` format movie can be watched in your browser.  
<img src="https://tetunori.github.io/p5MovRec/images/stopRecording.png" alt="stopRecording" width="375px"> 

3. If you press `m` key to stop, `mp4` format movie will be generated little bit later. This movie is perfect for uploading for Twitter.  
Movie files can be downloaded like below and are named `YYYYMMDDhhmmss.webm/mp4`.  
<img src="https://tetunori.github.io/p5MovRec/images/downloadMovies.png" alt="downloadMovies" width="500px"> 

4. If you have already `keyPressed()` function, you need add start/stop-recording function in your `keyPressed()` like below. You can use `p5MovRec` instance and its methods `startRec()`, `stopRec()` and `setMovType()`.  
```javascript
function keyPressed() {
  switch (keyCode) {
    case 49: //1: Start record
      p5MovRec.startRec();
      break;
    case 50: //2: set webm, stop
      p5MovRec.setMovType(P5MovRec.movTypeId.webm);
      p5MovRec.stopRec();
      break;
    case 51: //3: set mp4, stop
      p5MovRec.setMovType(P5MovRec.movTypeId.mp4);
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
|  `r` (**R**ecord)  |  Start Recording.  |
|  `w` (**W**ebm)  |  Stop Recording and Generate `Webm` format movie.  |
|  `m` (**M**p4)  |  Stop Recording and Generate `mp4` format movie.  |

## Samples 
 - [Basic Sample On GitHub](https://tetunori.github.io/p5MovRec/sample/basic/)
 - [Basic Sample On P5 Web Editor](https://editor.p5js.org/tetunori/sketches/cWvkz1E2_)  
 - [Basic Sample On OpenProcessing](https://openprocessing.org/sketch/1212512)

## WARNING
### On `canvas`
Since this tool makes movie from the stream of `canvas` created in `createCanvas()`, `#つぶやきProcessing` guys and `#p5t` guys should be move `createCanvas()` into `setup()` on recording like below.  

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

### On Movie Quality
Please refer to the following [Tips](https://github.com/tetunori/p5MovRec#tips) later.


# For more high quality and fine tuning.
Since the simple usecase above is specialized for Twitter, it is simple and has chosen the `h264` codec. On the other hand, this tool also supports `vp9` codec, which can further improve the movie quality. It also allows you to fine-tune the timing and procedure of start/stop the recording and the parameters, so I will introduce those as well.

## Import library
Just insert 2 scripts after `p5.js` script in your `<head>`. Be carefull about **the URL is defferent** from the basic one. 
```html 
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/p5.js"></script>

<!-- INSERT HERE -->
<script src="https://unpkg.com/@ffmpeg/ffmpeg@0.10.0/dist/ffmpeg.min.js"></script>
<script src="https://tetunori.github.io/p5MovRec/dist/0.5.0/advanced/p5MovRec.js"></script>
```

## Use in your Sketch
### Make instance just after `createCanvas()`.
Call `P5MovRec()` with `codecId`. You can choose from `P5MovRec.codecId.vp9` and `P5MovRec.codecId.h264`. Default value is `P5MovRec.codecId.vp9` in advanced mode.
```javascript
let myP5MovRec;  // Please prepare instance in global 

function setup() {
  createCanvas( 720, 720 );
  myP5MovRec = new P5MovRec();  // P5MovRec.codecId.vp9 is selected by default.
  // myP5MovRec = new P5MovRec(P5MovRec.codecId.vp9);  // Same as above.
  // myP5MovRec = new P5MovRec(P5MovRec.codecId.h264); // For h264 codec.
}
```

### Start/Stop Recording
It is almost same as basic usecase like below. Default value of `movType` is `P5MovRec.movTypeId.webm`.
```javascript
function keyPressed() {
  switch (keyCode) {
    case 49: //1: Start record
      myP5MovRec.startRec();
      break;
    case 50: //2: set webm, stop
      // myP5MovRec.setMovType(P5MovRec.movTypeId.webm); // webm is default value
      myP5MovRec.stopRec();
      break;
    case 51: //3: set mp4, stop
      myP5MovRec.setMovType(P5MovRec.movTypeId.mp4); // for mp4 container
      myP5MovRec.stopRec();
      break;
    default:
      break;
  }
}
```

## Samples 
 - [Basic Sample On GitHub](https://tetunori.github.io/p5MovRec/sample/advanced/)
 - [Basic Sample On P5 Web Editor](https://editor.p5js.org/tetunori/sketches/OFj1Ne9Bn)  
 - [Basic Sample On OpenProcessing](https://openprocessing.org/sketch/1212513)

## Tips
### Movie quality
#### Codec
the quality of `h264` codec on this tool is a little bit low compared to `vp9`. If you are concerned about the quality, please try `vp9` setting. But be careful that Twitter does not support `vp9` format. (YouTube might support it.)

#### frameRate
For controlling output movie frame rate, please adjust `frameRate()` in p5.js sketch. `frameRate(30)`, `frameRate(40)` and `frameRate(60)` I recommend for recording.

#### Canvas Size
`720` is currently best size for Twitter, I think.
If you zoom in and out, the quality will change strongly depending on its zooming value. Please watch out the zooming value and the frame width/height of the output movie.

### Issue
So far, there is no issues.

# Licence
This software is released under MIT License, see LICENSE.

# Author
Tetsunori NAKAYAMA.

# References
ffmpeg.wasm  
https://github.com/ffmpegwasm/ffmpeg.wasm  
https://github.com/ffmpegwasm/ffmpeg.wasm/blob/master/examples/browser/webcam.html  
MIT License, Copyright (c) 2019 Jerome Wu

Screen Capture on your browser with ffmpeg.wasm  
https://dannadori.medium.com/screen-capture-on-your-browser-with-ffmpeg-wasm-b9ce333067aa

MediaRecorder  
https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder