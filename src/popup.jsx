import React from 'react';
import { render } from 'react-dom';

import Nav from './components/Nav/Nav.jsx';
import Main from './components/Main/Main.jsx'
import './popup.css'

function App () {
    return (
        <div className="container">
            <Nav />
            <Main />
        </div>
    );
}

render(
  <App />,
  document.getElementById("react-target")
);