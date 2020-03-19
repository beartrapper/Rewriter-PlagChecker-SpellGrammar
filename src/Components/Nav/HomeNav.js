import React from 'react';

function HomeNav () {
    return(

           <header class="site-navbar py-4 js-sticky-header site-navbar-target background-home" role="banner">
      
            <div class="container">
              <div class="row align-items-center">
                
                <div class="col-6 col-md-3 col-xl-4  d-block">
                  <h1 class="mb-0 site-logo"><a href="/home" class="text-black h2 mb-0">ContentRewriter<span class="text-primary">.</span> </a></h1>
                </div>
      
                <div class="col-12 col-md-9 col-xl-8 main-menu">
                  <nav class="site-navigation position-relative text-right" role="navigation">
      
                    <ul class="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block ml-0 pl-0">
                      <li><a href="" class="nav-link">Rewriter</a></li>
                      <li><a href="" class="nav-link">Plagiarism Checker</a></li>
                      <li >
                        <a href="" class="nav-link">Grammar and Spelling</a>
        
                      </li>
                      <li >
                        <a class="bg-warning rounded nav-link">Buy More Credits</a>
        
                      </li>
                    </ul>
                  </nav>
                </div>
      
      
                <div class="col-6 col-md-9 d-inline-block d-lg-none ml-md-0" ><a href="#" class="site-menu-toggle js-menu-toggle text-black float-right"><span class="icon-menu h3"></span></a></div>
      
              </div>
            </div>
            
          </header> 

    );
}

export default HomeNav;