import React from 'react';

function Prices () {
    return(

<div class="background">
  <div class="containerr">
    <div class="panel pricing-table">
      
      <div class="pricing-plan">
        <img src="https://s22.postimg.cc/8mv5gn7w1/paper-plane.png" alt="" class="pricing-img" />
        <h2 class="pricing-header">Testing</h2>
        <ul class="pricing-features">
          <li class="pricing-features-item">50 Spins</li>
          <li class="pricing-features-item">Recaptcha Security</li>
        </ul>
        <span class="pricing-price">Free Trial</span>
        <a href="#/" class="pricing-button">Get me there!</a>
      </div>
      
      <div class="pricing-plan">
        <img src="https://s28.postimg.cc/ju5bnc3x9/plane.png" alt="" class="pricing-img" />
        <h2 class="pricing-header">Hobby</h2>
        <ul class="pricing-features">
          <li class="pricing-features-item">20000 credits</li>
          <li class="pricing-features-item">No Recaptcha</li>
        </ul>
        <span class="pricing-price">$50</span>
        <a href="#/" class="pricing-button is-featured">Checkout.</a>
      </div>
      
      <div class="pricing-plan">
        <img src="https://s21.postimg.cc/tpm0cge4n/space-ship.png" alt="" class="pricing-img" />
        <h2 class="pricing-header">Enterprise</h2>
        <ul class="pricing-features">
          <li class="pricing-features-item">50000 credits</li>
          <li class="pricing-features-item">No Recaptcha</li>
        </ul>
        <span class="pricing-price">$100</span>
        <a href="#/" class="pricing-button">Done Deal!</a>
      </div>
      
    </div>
  </div>
</div>

    );
}

export default Prices;