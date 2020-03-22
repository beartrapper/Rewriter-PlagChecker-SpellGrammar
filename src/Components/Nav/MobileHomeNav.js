import React from 'react';
import { Link } from 'react-router-dom';

function MobileHomeNAv(){
    return(
        <nav class="navbar navbar-expand-lg navbar-light bg-primary">
  <a class="navbar-brand" href="#">ContentRewrter</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="/">Home</a>
      </li>
      <li class="nav-item">
        <Link to="/plagiarism">
        <a class="nav-link" href="#">Plgiarism Checker</a>
        </Link>
      </li>
      <li class="nav-item">
        <Link to="/plagiarism">
        <a class="nav-link" href="#">Rewriter</a>
        </Link>
      </li>
      <li class="nav-item">
        <Link to="/plagiarism">
        <a class="nav-link" href="#">Grammar and spelling</a>
        </Link>
      </li>
      <li class="nav-item">
        <Link to="/upgrade">
        <a class="nav-link" href="#">Buy more credits</a>
        </Link>
      </li>
    
    </ul>
 
  </div>
</nav>
    );
}

export default MobileHomeNAv