import React, { Component } from 'react';
import { VscGithub } from 'react-icons/vsc';
import style from '../style/Footer.module.css';

export default class Footer extends Component {
  render() {
    return (
      <footer
        className={ style.footer }
      >
        <a href="https://github.com/hellenribas?tab=repositories" target="_blank" rel="noopener noreferrer">
          <VscGithub className={ style.github } />
        </a>
      </footer>
    );
  }
}
