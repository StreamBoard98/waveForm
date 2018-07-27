import React from 'react';
import ReactDOM from 'react-dom';
import styles from './app.css';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    this.buildCanvas();
  }

  getSong(id) {
    axios.get(`/songs/${id}`)
      .then(data => this.setState({data}))
      .catch(err => console.log(err));
  }

  buildCanvas() {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    console.log(canvas);
    let randomHeight = () => {
      return Math.floor(Math.random() * (canvas.height / 2));
    }
    for(let i = 0; i < canvas.width; i += 3) {
      let generatedHeight = randomHeight();
      ctx.fillRect(i, (canvas.height / 2), 2, generatedHeight + 1);
      ctx.fillRect(i, (canvas.height / 2), 2, -generatedHeight);
    }
  }

  render() {
    return (
      <div className={styles.content}>
        <canvas id="canvas" width="660" height="100">Please upgrade your browser to the latest Chrome version</canvas>
        <div className={styles.counter}>4:00</div>
      </div>
    );
  }
}

export default App;
