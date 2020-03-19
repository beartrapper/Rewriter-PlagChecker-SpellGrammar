import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { Redirect } from "react-router-dom";
import axios from "axios";
import HomeNav from "../Nav/HomeNav";

function Rewiter() {
  const [userStatus, setUserStatus] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [value, setValue] = useState("");
  const [updatedValue, setUpdatedValue] = useState("");
  const [wordsLength, setWordsLength] = useState(0);
  const [uniqueness, setUniqueness] = useState(1);
  const [ignoreWords, setIgnoreWords] = useState("aforementioned");
  const [spellCheck, setSpellCheck] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user == null) {
        setRedirect(true);
        setUserStatus(user);
      } else setUserStatus(user);
    });
  }, [userStatus]);

  const handleRewrite = async e => {
    e.preventDefault();
    let ignoredToBeSent = [];
    let tempValue;
    if (wordsLength < 10000) {
      for (let count = 0; count < uniqueness; count++) {
        if (count != 0) {
          await axios({
            method: "post", //you can set what request you want to be
            url: "http://localhost:5000/api/rewrite",
            data: { body: tempValue, words: ignoreWords, spellCheck }
          })
            .then(res => {
              console.log(res.data);
              tempValue = res.data;
              setUpdatedValue(res.data);
            })
            .catch(err => console.log(err));
        } else {
          await axios({
            method: "post", //you can set what request you want to be
            url: "http://localhost:5000/api/rewrite",
            data: { body: value, words: ignoreWords, spellCheck }
          })
            .then(res => {
              console.log(res.data);
              tempValue = res.data;
              setUpdatedValue(res.data);
            })
            .catch(err => console.log(err));
        }
      }
    }
  };

  const handlePlagiarism = () => {
    const obj = {
      text: updatedValue
    }
    axios.post('http://localhost:5000/api/plagiarism', obj).catch(err => console.log(err));
  }

  const handleChange = e => {
    e.preventDefault();
    setValue(e.target.value);
    function WordCount(str) {
      // const wordsLength = str.split(" ").filter(function(n) {
      //   return n != "";
      // }).length;
      setWordsLength(e.target.value.length);
    }
    WordCount(e.target.value);
  };

  const handleUniqueness = e => {
    e.preventDefault();
    setUniqueness(e.target.value);
    console.log(e.target.value);
  };

  const handleIgnoreWords = e => {
    e.preventDefault();
    setIgnoreWords(e.target.value);
  };

  const handleSpellCheck = e => {
    e.preventDefault();
    if (!spellCheck) setSpellCheck(true);
    else setSpellCheck(false);
    console.log(spellCheck);
  };

  const handleLogout = e => {
    auth.signOut();
  };

  return (
    <>
      {redirect ? (
        <Redirect to="/signin" />
      ) : (
        <>
          {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">
              Content Rewriter
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown mr-5">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img
                      src="https://www.w3schools.com/howto/img_avatar.png"
                      alt="Avatar"
                      className="avatar"
                    />
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                    <div className="dropdown-divider"></div>
                    <a
                      onClick={handleLogout}
                      className="dropdown-item"
                      href="#"
                    >
                      Logout
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
           */}
            <HomeNav />
 
          {/* <div className="background-home" >
          </div> */} 

          <div className="form-group container container-width">
            <div className="row">
<div className="col col-sm-12">

            <div>
            <div className="tag-saucy">
            
            <p className={wordsLength > 10000 ? "text-danger" : ""}>
              Characters: {wordsLength}
            </p>
          </div>
        
          </div>
          <div className="position-style">
            <textarea
              onChange={handleChange}
              className="form-control position-change"
              rows="15"
              id="text"
            ></textarea>
            </div>
    
        
            </div>
    
          </div>
          </div>


{/* <div className="container">
<button class="btn btn-lg btn-primary col-sm-4 p-3 rounded-5">Rewiter</button>
<button class="btn btn-lg btn-primary col-sm-4 p-3 rounded-5">Plagiarism</button>
<button class="btn btn-lg btn-primary col-sm-4 p-3 rounded-5">Spelling and Grammar</button>
</div> */}
<div className="container text-center font-color">
  <button 

onClick={handleRewrite}
className={
  "btn btn-lg col-sm-4 p-3 mt-1 rounded-5 " +
  (wordsLength > 10000 ? "btn-danger" : "btn-primary")
}
>
{wordsLength > 10000 ? <>Reduce Chars</> : <>Check</>}
  </button>
</div>
<div className="container pt-5">

            <div  className="row">
            <div className="col col-sm-4">
              <div class="form-group row">
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter words to ignore"
                  onChange={handleIgnoreWords}
                />
                <small id="emailHelp" class="form-text text-muted">
                  Seperate with a comma like.. ketchup, man, bubble
                </small>
              </div>
            </div>
        
            <div className="col col-sm-2">
              <div className="selectt ml-5">
                <select
                  onChange={handleUniqueness}
                  name="slct"
                  id="slct"
                  className="select"
                >
                  <option selected disabled>
                    Uniqueness
                  </option>
                  <option value="1">70%</option>
                  <option value="2">80%</option>
                  <option value="3">90%</option>
                </select>
              </div>
            </div>
            </div>
            </div>
            
            


          <br />
          <br />
          <br />
          <br />
          <div className="form-group">
            <label for="comment">Cleansed:</label>
            <textarea
              value={updatedValue}
              className="form-control"
              rows="10"
              id="comment"
            ></textarea>
          </div>
          <button onClick={handlePlagiarism} className="btn btn-primary">click</button>

        </>
      )}
    </>
  );
}

export default Rewiter;
