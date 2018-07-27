import React from 'react';

const src1 = 'rtsp://184.72.239.149/vod/mp4://BigBuckBunny_175k.mov';
const src2 = 'rtsp://172.16.101.57:1111/test';
const src3 = 'rtsp://222.214.9.13:554/H264?admin110@admin:100204&794028970&8000&1&1&794028970:8000-1-1'
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: '',
      display: true
    };
  }

  componentDidUpdate() {
    // let play = this.refs.play.playList.play()
  }

  click() {
    if (this.state.display) {
      this.setState({
        display: false
      })
    } else {
      this.setState({
        display: true
      })
    }
  }

  render() {
    const me = this;
    return (
      <div style={{
        display: 'flex'
      }}>
        <object classID="clsid:9BE31822-FDAD-461B-AD51-BE1D1C159921" codebase="http://download.videolan.org/pub/videolan/vlc/last/win32/axvlc.cab"
          style={{ width: 100, height: 100, display: this.state.display ? 'block' : 'none' }}>
          <param name="src" value={src3} />
          <param name="autostart" value="true" />
          <embed ref={'play'} type="application/x-vlc-plugin" pluginspage="http://www.videolan.org" width="640px" height="480px" />
        </object>
        <button onClick={me.click.bind(me)}>click</button>
      </div>
    );
  }
};

export default Page;
