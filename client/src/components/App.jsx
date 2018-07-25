import React from 'react';
import ReactDOM from 'react-dom';
import styles from './app.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
//
  render() {
    return (
      <div className={styles.content}>
        hello
      </div>
    );
  }
}

export default App;
