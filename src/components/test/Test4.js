import React from 'react';
import Hls from 'hls.js';

const list = [
  'http://172.16.144.12:8033/movies202/202.m3u8',
  'http://172.16.144.12:8033/movies203/203.m3u8'
];
class Page extends React.Component {
  playVideo(index) {
    if (window.tcplayer) { this.refs.video.innerHTML = ''; }
    this.options.m3u8 = list[index];
    // window.tcplayer = new window.TcPlayer('video', this.options);
  }

  componentDidMount() {
    const me = this;
    this.options = {
      width: '560',
      height: '460',
      volume: 0.5,
    };

    let video = me.refs.video;
    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource('http://172.16.144.12:8033/movies202/202.m3u8');
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = 'http://172.16.144.12:8033/movies202/202.m3u8';
      video.addEventListener('loadedmetadata', function () {
        video.play();
      });
    }



  }
  num = 0;
  click() {
    console.log(window.tcplayer)
    if (this.num == 1) {
      this.playVideo(1);
      this.num = 0;
    } else {
      this.playVideo(0);
      this.num = 1;
    }

  }

  render() {
    const me = this;
    return (
      <div>
        <div id={'video'} ref={'video'}></div>
        <button onClick={this.click.bind(me)}>click</button>
      </div>
    );
  }
};

export default Page;
