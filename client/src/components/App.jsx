import React from 'react';
import ReactDOM from 'react-dom';
import styles from './app.css';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      length: '',
      currentTime: '0:00',
    };

    this.renderTime = this.renderTime.bind(this);
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
      .then(data => this.renderTime(data.data.songLength))
      .catch(err => console.log(err));
  }

  buildCanvas() {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white'
    let randomHeight = () => {
      return Math.floor(Math.random() * (canvas.height / 2));
    }
    for(let i = 0; i < canvas.width; i += 3) {
      let generatedHeight = randomHeight();
      ctx.fillRect(i, (canvas.height / 2), 2, generatedHeight + 1);
      ctx.fillRect(i, (canvas.height / 2), 2, -generatedHeight);
    }
  }

  renderTime(totalSeconds) {
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
    this.setState({length: `${minutes}:${formattedSeconds}`});
  }

  render() {
    return (
      <div className={styles.content}>
        <div className={styles.counterLeft}>{this.state.currentTime}</div>
        <canvas id="canvas" width="660" height="100">Please upgrade your browser to the latest Chrome version</canvas>
        <div className={styles.counterRight}>{this.state.length}</div>
      </div>
    );
  }
}

export default App;
