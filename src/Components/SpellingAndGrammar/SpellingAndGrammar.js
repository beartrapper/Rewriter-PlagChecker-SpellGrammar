import React, { useEffect, useState } from "react";
import { auth, firestore } from "../../firebase";
import { Redirect } from "react-router-dom";
import axios from "axios";
import HomeNav from "../Nav/HomeNav";
import ReCAPTCHA from "react-google-recaptcha";
import SimpleNav from "../Nav/SimpleNav";


function SpellingAndGrammar() {
  const [userStatus, setUserStatus] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [value, setValue] = useState("");
  const [updatedValue, setUpdatedValue] = useState("");
  const [wordsLength, setWordsLength] = useState(0);
  const [uniqueness, setUniqueness] = useState(1);
  const [ignoreWords, setIgnoreWords] = useState("aforementioned");
  const [spellCheck, setSpellCheck] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checking, setChecking] = useState(false);
  const [userInfo, setUserInfo] = useState(0);
  const [fetchedFirestore, setFetchedFirestore] = useState(false);
  const [countCredits, setCountCredits] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [pageLoading, setPageLoading] = useState(true);
  const [bothSwitch, setBothSwitch] = useState(false);
  const [spellSwitch, setSpellSwitch] = useState(false);
  const [grammarSwitch, setGrammarSwitch] = useState(false);

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
      setPageLoading(false)

        })
        setUserStatus(user);
      }
    });
  }, [userStatus]);
  
  function onChange(value) {
    console.log("Captcha value:", value);
  }


  const onSubmit = async e => {
    e.preventDefault();
    setChecking(true);

    const obj = {
      value
    };
    axios.post('http://178.128.47.78:5000/api/spell', obj)
      .then(res => {
        console.log(res.data);


        firestore
        .collection('users')
        .doc(userStatus.uid)
        .set({
          credits: userInfo.credits - 1
        })
        .then(respo => {
          // res.data.sources.map(item => {
            setValue(res.data)
            setChecked(true);
            setCountCredits(countCredits - 1)
        setChecking(false);
          
    
        })


      })
      .catch(err => {
        console.log(err);
      })
   
  };

  const handlePlagiarism = () => {
    const obj = {
      text: updatedValue
    }
    axios.post('http://178.128.47.78:5000/api/plagiarism', obj).catch(err => console.log(err));
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

  const handleReset = e => {
    setValue('');
  }

  const toggleSwitchSpelling = e => {
    if(!spellSwitch)
      setSpellSwitch(true);
    else
      setSpellSwitch(false);
  }


  const toggleSwitchGrammar = e => {
    if(!grammarSwitch)
      setGrammarSwitch(true);
    else 
    setGrammarSwitch(false);
  }


  const toggleSwitchBoth = e => {
    if(!bothSwitch)
    setBothSwitch(true);
    else 
    setBothSwitch(false);
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
            Premium Spelling and Grammar Checker
          </h2>
          <h5>
            You have {countCredits} credits remaining.
          </h5>
          <h5 className={wordsLength > 5000 ? "text-danger" : ""}>
            Characters length: {wordsLength}
          </h5>
        </div>
          <div className="form-group container pt-4 mt-5">
            <div className="row">
            <div class="col-lg-10">
    <div class="form-group text-center">
      <textarea 
      value={value}
      className="form-control" 
      rows="13"
      onChange={handleChange}
      ></textarea>
   </div>
  </div>
{/* <div className="col col-sm-10">

            <div>
            <div className="tag-saucy">
            
            <p className={wordsLength > 10000 ? "text-danger" : ""}>
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
    
        
            </div> */}
    <div className="col col-sm-2">
      

        <br/>

        <div className="row">
        <button onClick={toggleSwitchSpelling} className={"btn btn-primary mt-3 col-sm-12" + (spellSwitch ? " btn-success" : " btn-primary")}>Check Spelling</button>
        </div>
        <div className="row">

        <button onClick={toggleSwitchGrammar} className={"btn mt-3 col-sm-12" + (grammarSwitch ? " btn-success" : " btn-primary")}>Check Grammar</button>
        </div>
        <div className="row">
        <button onClick={toggleSwitchBoth} className={"btn btn-primary mt-3 col-sm-12 " + (bothSwitch ? " btn-success" : " btn-primary")}>Check Both</button>
        </div>
        <div className="row">
        <button 
      onClick={onSubmit}
      className={"btn btn-success mt-3 col-sm-12  " + (checking || wordsLength > 5000 || countCredits ==0? " disabled" : "")}>{checking ? "Checking" : <>{countCredits == 0 ? "Out of Credits" : "Check"} </>}</button>
        </div>
        <div className="row">
        <button onClick={handleReset} className="btn btn-secondary mt-3 col-sm-12 ">Reset</button>
</div>
		{/* <label for="default" class="btn btn-default">Default <input type="checkbox" id="default" class="badgebox"/><span class="badge bg-white"></span></label>
        <label for="primary" class="btn btn-primary">Primary <input type="checkbox" id="primary" class="badgebox"/><span class="badge"></span></label>
        <label for="info" class="btn btn-info">Info <input type="checkbox" id="info" class="badgebox"/><span class="badge">&check;</span></label>
        <label for="success" class="btn btn-success">Success <input type="checkbox" id="success" class="badgebox"/><span class="badge">&check;</span></label>
        <label for="warning" class="btn btn-warning">Warning <input type="checkbox" id="warning" class="badgebox"/><span class="badge">&check;</span></label>
        <label for="danger" class="btn btn-danger">Danger <input type="checkbox" id="danger" class="badgebox"/><span class="badge">&check;</span></label>

 */}


    </div>
          </div>
          </div>


{/* <div className="container text-center font-color">
  <button 

onClick={onSubmit}
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

         

        </>
      )}

</>}


  
    </>
  );
}

export default SpellingAndGrammar;
