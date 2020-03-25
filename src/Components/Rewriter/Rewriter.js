import React, { useEffect, useState } from "react";
import { auth, firestore } from "../../firebase";
import { Redirect } from "react-router-dom";
import axios from "axios";
import HomeNav from "../Nav/HomeNav";
import MobileHomeNAv from "../Nav/MobileHomeNav";
import ReCAPTCHA from "react-google-recaptcha";
import SimpleNav from "../Nav/SimpleNav";


function Rewiter() {
  const [userStatus, setUserStatus] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [value, setValue] = useState("");
  const [updatedValue, setUpdatedValue] = useState("");
  const [wordsLength, setWordsLength] = useState(0);
  const [uniqueness, setUniqueness] = useState(1);
  const [ignoreWords, setIgnoreWords] = useState("aforementioned");
  const [spellCheck, setSpellCheck] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [done, setDone] = useState(false);
  const [userInfo, setUserInfo] = useState(0);
  const [fetchedFirestore, setFetchedFirestore] = useState(false);
  const [countCredits, setCountCredits] = useState(0);
  const [checked, setChecked] = useState(false);
  const [checking, setChecking] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [valueForReset, setValueForReset] = useState('');
  const [lastValue, setLastValue] = useState('');


  useEffect(() => {

    auth.onAuthStateChanged(user => {
      if (user == null) {
        setRedirect(true);
        setUserStatus(user);
   
      } else {
        console.log(user.uid)
        firestore
        .collection('users')
        .doc(user.uid)
        .get()
        .then(doc => {
          if(!doc.exists){
            console.log('no such doc')
          } else {
            console.log(doc.data())
            setFetchedFirestore(true)
            setUserInfo(doc.data());
            setCountCredits(doc.data().credits)
          }
          setPageLoading(false);
        })
        setUserStatus(user);
      }
    });
  }, [userStatus]);



  const handleRewrite = async e => {
    e.preventDefault();
    setChecking(true);
    console.log(uniqueness);
    let ignoredToBeSent = [];
    let tempValue;
    if (wordsLength < 5000) {

      let tempValueForTesting = "";
      for (let count = 0; count < uniqueness; count++) {
        if (count != 0) {
          await axios({
            method: "post", //you can set what request you want to be
            url: "http://178.128.47.78:5000/api/rewrite",
            data: { value: tempValue, words: ignoreWords}
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
            url: "http://178.128.47.78:5000/api/rewrite",
            data: { value: value, words: ignoreWords }
          })
            .then(res => {
              console.log(res.data);
              tempValue = res.data;
              setUpdatedValue(res.data);
              
            })
            .catch(err => console.log(err));
        }
      };

      const obj = {
        value
      };


      axios.post('http://178.128.47.78:5000/api/spell', obj)
        .then(resp => {
          const obj2 = {
            value: resp.data
          }
          axios.post('http://178.128.47.78:5000/api/plagiarism', obj2)
          .then(res => {
            
            const response = JSON.parse(res.data);
            let plagPercent = ''
            // let plagPercent = response.plagPercent + '% plagiarism \n\n';
            plagPercent = plagPercent + resp.data;
            setLastValue(plagPercent);
        setChecking(false);
        setCountCredits(countCredits - 1)
          }).catch(err => {
      setChecking(false);
            
            console.log(err)
          })
  


        })
        .catch(err => {
      setChecking(false);
          
          console.log(err)})



      firestore
      .collection('users')
      .doc(userStatus.uid)
      .set({
        credits: userInfo.credits - 1
      })
      .then(respo => {
        // res.data.sources.map(item => {
          setValue(tempValue)
          setDone(true);
          
  
      });




  
    }
  };

  const handlePlagiarism = () => {
    const obj = {
      text: updatedValue
    }
    axios.post('https://contentrewriter.com:5000/api/plagiarism', obj).catch(err => console.log(err));
  }

  const handleChange = e => {
    e.preventDefault();
    setValue(e.target.value);
    setValueForReset(e.target.value);
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

  function onChange(value) {
    console.log("Captcha value:", value);
  }

  const handleReset = e => {
    setValue('');
    setValueForReset('');
    setLastValue('');
  }

  return (
    <>


{pageLoading ? 
<>
<div class="loadingio-spinner-rolling-bp0uc8kphr6"><div class="ldio-v9q6rtgt8o">
<div></div>
</div></div>
</>:<>

{redirect ? (
        <Redirect to="/signin" />
      ) : (
        <>
      
       <SimpleNav />
       
       <div className="text-center text-dark pt-4 mt-4">
          <h2>
            Premium Article Rewriter
          </h2>
          <h5>
            You have {countCredits} credits remaining.
          </h5>
          <h5 className={wordsLength > 5000 ? "text-danger" : ""}>
            Characters length: {wordsLength}
          </h5>
        </div>
<div className="container pt-5 mt-5">
        <div className="row">
        <div class="col-lg-6">
    <div class="form-group text-center">
      <textarea 
      value={valueForReset}
      className="form-control" 
      rows="13"
      onChange={handleChange}
      ></textarea>
      <button 
      onClick={handleRewrite}
      className={"btn btn-primary mt-3" + (checking || wordsLength > 5000 || countCredits ==0? " disabled" : "")}>{checking ? "Rewriting" : <>{countCredits == 0 ? "Out of Credits" : "Rewrite"} </>}</button>
    </div>
  </div>
  <div className="col-lg-6">
    <div className="form-group text-center">
      <textarea 
      value={lastValue}
      className="form-control" rows="13">
      
      </textarea>
      <button 
      onClick={handleReset}
      className="btn btn-primary mt-3">Reset</button>

    </div>
  </div>
        </div>
   { userInfo.recaptcha ? 
  <div class="padding-customized-plag">
  <ReCAPTCHA
    sitekey="6Le9W-IUAAAAAHnwDZmrlXBQTFaQIRIfU3YvrYvA"
    onChange={onChange}
  />
  </div> :<></>
}
        </div>
     
     




































{/* 
          <div className="form-group container container-width">
            <div className="row">
<div className="col col-sm-12">

            <div>
            <div className="tag-saucy">
            
            <p className={wordsLength > 5000 ? "text-danger" : ""}>
              Characters: {wordsLength}
            </p>
          </div>
        
          </div>
          <div className="position-style">
            <textarea
              value={value}
              onChange={handleChange}
              className="form-control position-change"
              rows="15"
              id="text"
            ></textarea>
            </div>
    
        
            </div>
    
          </div>
          </div>
 */}

{/* <div className="container">
<button class="btn btn-lg btn-primary col-sm-4 p-3 rounded-5">Rewiter</button>
<button class="btn btn-lg btn-primary col-sm-4 p-3 rounded-5">Plagiarism</button>
<button class="btn btn-lg btn-primary col-sm-4 p-3 rounded-5">Spelling and Grammar</button>
</div> */}
{/* <div className="container text-center font-color">
  <button 

onClick={handleRewrite}
className={
  "btn btn-lg col-sm-4 p-3 mt-1 rounded-5 " +
  (wordsLength > 5000 || checking ? "btn-danger disabled" : "btn-primary")
}
>
{
    countCredits == 0 ? <>
    Kindly add more credits
    </>: <>
    {wordsLength > 5000 ? <>Reduce Chars To 5000</> : <>{checking ? <>Please Wait</>:<>Check  - {countCredits}   </>}</>} 
    </>
}
</button>
{ userInfo.recaptcha ? 
  <div class="padding-customized-plag">
  <ReCAPTCHA
    sitekey="6Le9W-IUAAAAAHnwDZmrlXBQTFaQIRIfU3YvrYvA"
    onChange={onChange}
  />
  </div> :<></>
}
</div>
  
   */}
  
  
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
          <button onClick={handleLogout} className="col col-sm-12 btn btn-danger">Logout</button>
          {/* <div className="form-group">
            <label for="comment">Cleansed:</label>
            <textarea
              value={updatedValue}
              className="form-control"
              rows="10"
              id="comment"
            ></textarea>
          </div>
          <button onClick={handlePlagiarism} className="btn btn-primary">click</button> */}

        </>
      )}


</>}


 
    </>
  );
}

export default Rewiter;
