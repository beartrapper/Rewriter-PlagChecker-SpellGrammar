import React from 'react';
import Nav from '../Nav/Nav';
import FirstSection from './FirstSection/FirstSection';
import Prices from './Prices/Prices';

function LandingPage(){

    return(

        <div data-spy="scroll" data-target=".site-navbar-target" data-offset="300">
  

        {/* <div id="overlayer"></div>
        <div class="loader">
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Warming up the spinner..</span>
          </div>
        </div> */}
        <div class="site-wrap"  id="home-section">
          <div class="site-mobile-menu site-navbar-target">
            <div class="site-mobile-menu-header">
              <div class="site-mobile-menu-close mt-3">
                <span class="icon-close2 js-menu-toggle"></span>
              </div>
            </div>
            <div class="site-mobile-menu-body"></div>
          </div>
         
         
        <Nav />
        <FirstSection />          
      

      
          <div class="site-section" id="features-section">
            <div class="container">
              <div class="row mb-5 justify-content-center text-center"  data-aos="fade-up">
                <div class="col-7 text-center  mb-5">
                  <h2 class="section-title">ContentRewriter Features</h2>
                  <p class="lead">Believing in smart work over hardwork is what we have on every office wall over here.</p>
                </div>
              </div>
              <div class="row align-items-stretch">
                <div class="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up">
                  
                  <div class="unit-4 d-block">
                    <div class="unit-4-icon mb-3">
                      <span class="icon-wrap"><span class="text-primary icon-autorenew"></span></span>
                    </div>
                    <div>
                      <h3>Plagiarism Checker</h3>
                      <p>Rewriting itself is not just enough, we've added extra security so that you may sleep a little better knowing we got you coverred.</p>
                      <p><a href="#">learn more</a></p>
                    </div>
                  </div>
      
                </div>
                <div class="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="100">
      
                  <div class="unit-4 d-block">
                    <div class="unit-4-icon mb-3">
                      <span class="icon-wrap"><span class="text-primary icon-store_mall_directory"></span></span>
                    </div>
                    <div>
                      <h3>Spelling Checker</h3>
                      <p>I'm sure we can all agree on the fact that typos are one of the worst mistakes a person can make when writing professionally, we got you coverred here too.</p>
                      <p><a href="#">learn more</a></p>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up"  data-aos-delay="200">
                  <div class="unit-4 d-block">
                    <div class="unit-4-icon mb-3">
                      <span class="icon-wrap"><span class="text-primary icon-shopping_basket"></span></span>
                    </div>
                    <div>
                      <h3>Grammar Checker</h3>
                      <p>This is the most important feature for me, don't let anybody judge you especially not based on your Grammar.</p>
                      <p><a href="#">learn more</a></p>
                    </div>
                  </div>
                </div>      
              </div>
            </div>
          </div>
          
          <div class="feature-big">
            <div class="container">
              <div class="row mb-5 site-section">
                <div class="col-lg-7" data-aos="fade-right">
                  <img src="images/undraw_gift_card_6ekc.svg" alt="Image" class="img-fluid" />
                </div>
                <div class="col-lg-5 pl-lg-5 ml-auto mt-md-5">
                  <h2 class="text-black">Press a couple of buttons and relax! </h2>
                  <p class="mb-4">Our content rewriter uses machine learning to get the best possible result for you.</p>
                  
                  <div class="author-box" data-aos="fade-left">
                    <div class="d-flex mb-4">
                      <div class="mr-3">
                        <img src="images/person_4.jpg" alt="Image" class="img-fluid rounded-circle" />
                      </div>
                      <div class="mr-auto text-black">
                        <strong class="font-weight-bold mb-0">Richard Hale</strong> <br />
                        CTO, Babies-day-out.
                      </div>
                    </div>
                    <blockquote>&ldquo;Everybody needs an escape from their work once in a while, this is the perfect shortcut for a reasonable amount. Definitely Recommended!&rdquo;</blockquote>
                  </div>
                </div>
              </div>
      
             
         
 
            </div>
          </div>
      
      
          <div class="site-section bg-light" id="about-section">
            <div class="container">
              <div class="row mb-5">
                <div class="col-12 text-center">
                  <h2 class="section-title mb-3">About Us</h2>
                </div>
              </div>
              <div class="row mb-5">
                <div class="col-lg-6" data-aos="fade-right">
                  <img src="images/undraw_bookmarks_r6up.svg" alt="Image" class="img-fluid" />
                </div>
                <div class="col-lg-5 ml-auto pl-lg-5">
                  <h2 class="text-black mb-4 h3 font-weight-bold">Our Objective</h2>
                  <p class="mb-4">Easing the pressure off of your shoulders by providing affordable life hack(s).</p>
                  <ul class="ul-check mb-5 list-unstyled success">
                    <li>Machine learning everywhere.</li>
                    <li>Easy peasy.</li>
                    <li>As simple as it can be.</li>
                  </ul>
                  <p><a href="#" class="btn btn-primary">Learn more</a></p>
                </div>
              </div>
      
              
            </div>
          </div>





          <Prices free={true} signedIn={false}/>
      
        
      
 
      
          <div class="footer py-5 text-center">
            <div class="container">
              <div class="row mb-5">
                <div class="col-12">
                  <p class="mb-0">
                    <a href="#" class="p-3"><span class="icon-facebook"></span></a>
                    <a href="#" class="p-3"><span class="icon-twitter"></span></a>
                    <a href="#" class="p-3"><span class="icon-instagram"></span></a>
                    <a href="#" class="p-3"><span class="icon-linkedin"></span></a>
                    <a href="#" class="p-3"><span class="icon-pinterest"></span></a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div> 
    );

}

export default LandingPage;