// p5.MovRec

// MIT License
// Copyright (c) 2021 Tetsunori NAKAYAMA

// A simple movie recording tool for p5.js canvas

class P5MovRec {
  movRecorder = undefined;
  chunks = [];
  videoBPS = undefined;

  static codecId = {
    vp9: 'vp9',
    h264: 'h264',
  };
  codec = undefined;

  static movTypeId = {
    webm: 'webm',
    mp4: 'mp4',
  };
  movType = P5MovRec.movTypeId.webm;

  /**
   * Constructor.
   *
   * @param codec specify codec with P5MovRec.codecId.
   *              We support vp9 and H264.
   */
  constructor(codec = P5MovRec.codecId.vp9, vbps = 20000000 /* 20,000 Kbps */ ) {
    this.codec = codec;
    this.videoBPS = vbps;
    this.initMovRec();
  }

  /**
   * Initialize function.
   */
  initMovRec() {
    // Get stream from canvas element.
    const stream = document.querySelector('canvas').captureStream();

    // Prepare MediaRecorder
    const options = {
      videoBitsPerSecond: this.videoBPS, // Default is 20,000 Kbps
      mimeType: 'video/webm;codecs=' + this.codec,
    };
    const recorder = new MediaRecorder(stream, options);

    recorder.ondataavailable = (e) => this.chunks.push(e.data);
    recorder.onstop = this.generateMovie.bind(this);

    // Completed preparation of recorder.
    this.movRecorder = recorder;
  }

  /**
   * Movie generator function called on stopping recording.
   * We support 2 types of container, webm and mp4.
   */
  generateMovie() {
    switch (this.movType) {
      case P5MovRec.movTypeId.webm:
        this.generateWebm();
        break;
      case P5MovRec.movTypeId.mp4:
        this.generateMp4();
        break;
    }
  }

  /**
   * Download file created with specified url and name.
   */
  downloadFileFromURL(url, fileName) {
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.download = fileName;
    a.href = url;
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  /**
   * Generate Webm movie file
   */
  generateWebm() {
    const blob = new Blob(this.chunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const fileName = this.getNowYMDhmsStr() + '.webm';
    this.downloadFileFromURL(url, fileName);
  }

  /**
   * Generate mp4 movie file
   */
  async generateMp4() {
    const { createFFmpeg, fetchFile } = FFmpeg;
    const ffmpeg = createFFmpeg({
      /* log: true */
    });

    const name = 'record.webm';

    // Load ffmpeg
    console.log('Loading ffmpeg js');
    await ffmpeg.load();

    // Start trans coding. Actually, the transcoding performance is poor now
    // so that we only do copy(just change the container).
    console.log('Start transcoding');
    const blob = new Blob(this.chunks, { type: 'video/webm' });
    ffmpeg.FS('writeFile', name, await fetchFile(blob));
    await ffmpeg.run('-i', name, '-c', 'copy', 'output.mp4');

    // Complete transcoding
    console.log('Complete transcoding');
    const data = ffmpeg.FS('readFile', 'output.mp4');

    // File donwload procedure
    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
    const fileName = this.getNowYMDhmsStr() + '.mp4';
    this.downloadFileFromURL(url, fileName);
  }

  /**
   * Generate Webm movie file
   */
  keyHandler() {
    // movie type default value is 'webm'
    this.movType = P5MovRec.movTypeId.webm;

    switch (keyCode) {
      case 82: //r: start/stop Record
        this.toggleRec();
        break;
      case 83: //s: start(for debug)
        this.startRec();
        break;
      case 87: //w: webm
        this.stopRec();
        break;
      case 77: //m: mp4
        this.movType = P5MovRec.movTypeId.mp4;
        this.stopRec();
        break;
      default:
        break;
    }
  }

  /**
   * toggle Start/Stop recording
   */
  toggleRec() {
    if (!this.startRec()) {
      this.stopRec();
    }
  }

  /**
   * Start recording
   */
  startRec() {
    // Initialize chunk
    this.chunks.length = 0;

    let isStarted = false;
    const recorder = this.movRecorder;
    if (recorder && recorder.state === 'inactive') {
      console.log('🎥Start Recording.');
      recorder.start();
      isStarted = true;
    }
    return isStarted;
  }

  /**
   * Stop recording
   */
  stopRec() {
    let isStopped = false;

    const recorder = this.movRecorder;
    if (recorder && recorder.state === 'recording') {
      console.log('✅Recorded.');
      recorder.stop();
      isStopped = true;
    }
    return isStopped;
  }

  /**
   * Set movie type Webm or MP4.
   *
   * @param movType specify codec with P5MovRec.movTypeId.
   *                We support webm and mp4.
   */
  setMovType( movType ) {
    this.movType = movType;
  }

  /**
   * get current time as YYYYMMDDhhmmss format.
   * https://hatolabo.com/programming/js-get-now-string
   */
  getNowYMDhmsStr() {
    const date = new Date();
    const Y = date.getFullYear();
    const M = ('00' + (date.getMonth() + 1)).slice(-2);
    const D = ('00' + date.getDate()).slice(-2);
    const h = ('00' + date.getHours()).slice(-2);
    const m = ('00' + date.getMinutes()).slice(-2);
    const s = ('00' + date.getSeconds()).slice(-2);

    return Y + M + D + h + m + s;
  }
}
