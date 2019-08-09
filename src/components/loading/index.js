import React from 'react';
import './index.scss';

const loading = () =>{
  return (
    <div class="loading_container">
      <div class="load_img" style={{backgroundPositionY:'-(positionY%7)*2.5 rem'}}>
      </div>
      <svg class="load_ellipse" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <ellipse cx="26" cy="10" rx="26" ry="10" style="fill:#ddd;stroke:none;"></ellipse>
      </svg>
	  </div>
  )
}

export default loading;