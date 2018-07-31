import React from 'react';
import ReactDOM from 'react-dom';
import styles from './app.css';
import axios from 'axios';
//
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      length: '',
      currentTime: '0:00',
      canvas: null,
      hovering: false
    };

    this.moveHandler = this.moveHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    this.buildCanvas();
    this.getSong(2);
  }

  getSong(id) {
    axios.get(`/songs/${id}`)
      .then(data => {
        this.setState({data: data.data});
        return data;
      })
      .then(data => this.setState({ length: this.formatTime(data.data.songLength) }))
      .catch(err => console.log(err));
  }

  buildCanvas() {
    let canvas = document.getElementById('canvas');
    this.setState( {canvas} );
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white'
    let randomHeight = () => {
      return Math.floor(Math.random() * (canvas.height / 2));
    }
    for(let i = 0; i < canvas.width; i += 3) {
      let generatedHeight = randomHeight();
      ctx.fillRect(i, (canvas.height / 2), 2.5, generatedHeight + 1);
      ctx.fillRect(i, (canvas.height / 2), 2.5, -generatedHeight);
    }
  }

  moveHandler(e) {
    this.hoverWaveform(this.state.canvas, e);
  }

  hoverWaveform(canvas, e) {
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = 'rgba(255, 85, 0, 0.55)';
    ctx.fillRect(0, 0, x, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(canvas.width, 0, -(canvas.width - x), canvas.height);

    const percent = x / canvas.width;
    const hoverPercentage = Math.round(percent * 100);
    const min = 0;
    const max = this.state.data.songLength;
    const playbackTime = Math.round(percent * (max - min) + min);

    this.setState({currentTime: this.formatTime(playbackTime)});
  }

  clickHandler(e) {
    this.clickWaveform(this.state.canvas, e);
  }

  clickWaveform(canvas, e) {
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = 'rgb(255, 85, 0, 0.75)';
    ctx.fillRect(0, 0, x, canvas.height);
  }

  formatTime(totalSeconds) {
    if(typeof totalSeconds !== 'number') {
      totalSeconds = 0;
    }
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds - minutes * 60;
    let formattedSeconds = '';
    if (seconds < 10) {
      formattedSeconds = `0${seconds}`;
    } else {
      formattedSeconds = `${seconds}`;
    }
    return `${minutes}:${formattedSeconds}`;
  }

  render() {
    return (
      <div className={`${styles.content} waveformHero`}>
        <div className={styles.counterLeft}>{this.state.currentTime}</div>
        <canvas id="canvas" className={styles.canvas} width="820" height="100" onMouseMove={this.moveHandler} onClick={this.clickHandler}>Please upgrade your browser to the latest Chrome version</canvas>
        <div className={styles.counterRight}>{this.state.length}</div>
        <div className={styles.commentWave}>
          <div className={styles.commentBlock}></div>

        </div>
      </div>
    );
  }
}

export default App;
