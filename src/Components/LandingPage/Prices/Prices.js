import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Prices({free, signedIn}) {
  const [redirectPath, setRedirectPath] = useState('');
  useEffect(() => {
    if(signedIn)
      setRedirectPath('/checkout/profile');
    else
      setRedirectPath('/checkout');
  }, [])
  return (
    <div class="background">
      <div class="containerr">
        <div class="panel pricing-table">
          <div class="pricing-plan">
            <img
              src="https://s22.postimg.cc/8mv5gn7w1/paper-plane.png"
              alt=""
              class="pricing-img"
            />
            <h2 class="pricing-header">Testing</h2>
            <ul class="pricing-features">
              <li class="pricing-features-item">50 credits</li>
              <li class="pricing-features-item">Recaptcha Security</li>
            </ul>
            <span class="pricing-price">Free Trial</span>
            <a href="#" class={"pricing-button " + (!free ? "disabled bg-danger text-white border-0": "") }>
              { !free ? <>Nope, sorry.</>:<>Get me there!</>}
            </a>
          </div>

          <div class="pricing-plan">
            <img
              src="https://s28.postimg.cc/ju5bnc3x9/plane.png"
              alt=""
              class="pricing-img"
            />
            <h2 class="pricing-header">Hobby</h2>
            <ul class="pricing-features">
              <li class="pricing-features-item">500 credits</li>
              <li class="pricing-features-item">No Recaptcha</li>
            </ul>
            <span class="pricing-price">$50</span>
            <Link
              to={{
                pathname: redirectPath,
                state: {
                  amount: "50.00",
                  credits: "500"
                }
              }}
            >
              <a href="#" class="pricing-button is-featured">
                Checkout.
              </a>
            </Link>
          </div>

          <div class="pricing-plan">
            <img
              src="https://s21.postimg.cc/tpm0cge4n/space-ship.png"
              alt=""
              class="pricing-img"
            />
            <h2 class="pricing-header">Enterprise</h2>
            <ul class="pricing-features">
              <li class="pricing-features-item">1200 credits</li>
              <li class="pricing-features-item">No Recaptcha</li>
            </ul>
            <span class="pricing-price">$100</span>
            <Link
              to={{
                pathname: redirectPath,
                state: {
                  amount: "100.00",
                  credits: "1200"
                }
              }}
            >
              <a href="#/" class="pricing-button">
                Done Deal!
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prices;
