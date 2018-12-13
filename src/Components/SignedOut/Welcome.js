import React, { Component } from 'react';
import '../../App.css';

class Welcome extends Component {

  render() {
    return (
      <div className='sectional'>

          <div className='parallax' style={{ backgroundImage: 'url("/apostles.jpg")' }}>
            <div>
              <h1>BV2</h1>
            </div>
          </div>

          <div className='interParallax'>
            <p>some words</p>
          </div>

          <div className='parallax' style={{ backgroundImage: 'url("/forest.jpg")' }}>
            <div>
              <p>some more words</p>
            </div>
          </div>

          <div className='interParallax'>
            <p>even more words</p>
          </div>

      </div>
    );
  }

}

export default Welcome;
