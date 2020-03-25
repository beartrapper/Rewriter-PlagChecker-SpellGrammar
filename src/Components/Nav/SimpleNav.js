import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

function SimpleNav(){
    const location = useLocation();
    return(
        <>
            <div className="container pt-4">
                <h1 className="h1oly">
                    ContentReWriter
                </h1>
                <div className="container">
                <ul className="ulogy">
  {/* <li className="liogy "><a href="#">Home</a></li> */}
  <Link to="/plagiarism">
  <li className={"liogy" + (location.pathname.includes("plagiarism") ? " active-page-nav" :"")}><a href="#news">Plagiarism Checker</a></li>
  </Link>
  <Link to="/rewriter">
  <li className={"liogy" + (location.pathname.includes("rewriter") ? " active-page-nav" :"")}><a href="#news">Article Rewriter</a></li>
  </Link>
  <Link to="spelling">
  <li className={"liogy" + (location.pathname.includes("spelling") ? " active-page-nav" :"")}><a href="#contact">Spelling & Grammar Checker</a></li>
  </Link>
  <Link to="/account">
  <li className={"liogy" + (location.pathname.includes("account") ? " active-page-nav" :"")}><a href="#about">My Account</a></li>
</Link>
</ul>
                </div>
            </div>
        </>
    );

}

export default SimpleNav;