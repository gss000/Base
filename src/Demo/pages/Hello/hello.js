import React from 'react';
import Say from '../../components/say';

export default class Hello extends React.Component {
  handleClick = () => {
  }

  render() {
    return <section className="MainPage">
      <h4>This is main page</h4>
      <Say value="hello world"/>
    </section>
  }
}