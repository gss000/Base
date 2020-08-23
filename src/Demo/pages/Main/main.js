import React from 'react';
import Run from '../../components/run/index';
import './main.css';

export default class Main extends React.Component {
  handleClick = () => {
    
  }

  render() {
    return <section className="MainPage">
      <h4>This is main page</h4>
      <Run value="run 组件加载成功"/>
      <button onClick={this.handleClick}>go</button>
    </section>
  }
}