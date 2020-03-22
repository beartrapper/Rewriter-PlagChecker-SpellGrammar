import React, { useEffect, useState } from "react";
import { auth, firestore } from "../../firebase";
import { Redirect } from "react-router-dom";
import axios from "axios";
import HomeNav from "../Nav/HomeNav";
import ReCAPTCHA from "react-google-recaptcha";
import MobileHomeNAv from "../Nav/MobileHomeNav";

function PlagiarismChecker() {
  const [userStatus, setUserStatus] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [value, setValue] = useState("");
  const [updatedValue, setUpdatedValue] = useState("");
  const [wordsLength, setWordsLength] = useState(0);
  const [uniqueness, setUniqueness] = useState(1);
  const [ignoreWords, setIgnoreWords] = useState("aforementioned");
  const [spellCheck, setSpellCheck] = useState(false);
  const [plagiarismPlaces, setPlagiarismPlaces] = useState([]);
  const [checked, setChecked] = useState(false);
  const [checking, setChecking] = useState(false);
  const [userInfo, setUserInfo] = useState(0);
  const [fetchedFirestore, setFetchedFirestore] = useState(false);
  const [countCredits, setCountCredits] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [pageLoading, setPageLoading] = useState(true);




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


  const handlePlagiarism = () => {
    
    setChecking(true);
    const obj = {
      value
    };
    axios.post('http://64.227.39.217:5000/api/plagiarism', obj)
    .then(res => {
      firestore
      .collection('users')
      .doc(userStatus.uid)
      .set({
        credits: userInfo.credits - 1
      })
      .then(respo => {
        // res.data.sources.map(item => {
          const response = JSON.parse(res.data)
          setPlagiarismPlaces(response);
          console.log(response);
          setChecked(true);
          setCountCredits(countCredits - 1)
      setChecking(false);
  
      })



     
        // })
      // console.log(res.data);
      // setValue(res.data);
    }).catch(err => console.log(err));
  }

  const handleChange = e => {
    e.preventDefault();
    setValue(e.target.value);
    setChecked(false);
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
  console.log(width)

  return (
    <>



{pageLoading ? <>

  <div class="loadingio-spinner-rolling-bp0uc8kphr6"><div class="ldio-v9q6rtgt8o">
<div></div>
</div></div>

</>:<>
{redirect ? (
        <Redirect to="/signin" />
      ) : (
        <>
        {width > 500 ?
            <HomeNav />
:
<MobileHomeNAv />
}
          <div className={"form-group container container-width" + (width < 500 ? " bg-primary" : "")}>
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
  <div className="col">
  <button 

onClick={handlePlagiarism}
className={
  "btn btn-lg col-sm-4 p-3 mt-1 rounded-5 " +
  (wordsLength > 5000 || checking ? "btn-danger disabled" : "btn-primary") + (countCredits == 0 ? " disabled": " ")
}
>
  {
    countCredits == 0 ? <>
    Kindly add more credits
    </>: <>
    {wordsLength > 5000 ? <>Reduce Chars To 5000</> : <>{checking ? <>Please Wait</>:<>Check</>}</>} - {countCredits}    
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

</div>
<br />
<br />
<br />
<br />

{/* <button onClick={handleLogout} className="btn btn-primary">logout</button> */}
{
plagiarismPlaces.plagPercent == "0" ? 
  <div className="col col-lg-10 bg-danger text-center text-light p-3 pl-5">No Plagiarism found </div>

:<></>}
{
checked && plagiarismPlaces.plagPercent != "0"? <>
  <div class="row">
  <div className="col col-lg-10 bg-danger text-center text-light p-3 pl-5">Plagiarism Detected </div>
  <div className="col col-lg-2 bg-warning text-center text-dark p-3">{plagiarismPlaces.plagPercent}% </div>
</div>
<div class="box">
    <div class="container">
     	<div class="row">
			 {plagiarismPlaces.details.map((item, index) => {

        return(
          <>
          {item.unique == "false" ? 
              <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 pt-3">
              <div class="box-part text-center border-top border-bottom-3 mt-3">
                            
                            
                <p class="text p-2">
                - {item.query}
                </p>
                            
                <div class="bg-danger p-2">
                <a target="_blank" href={item.display.url} class="text-light">Check Similar Content</a>
                </div>
                            
                            
               </div>
            </div>	: <></>}
          </>
      
        );

       })}
 
				
		</div>		
    </div>
</div>
        

</>:<>
</>}

<div class="p-5"></div>
        </>

      )}
</> }



 
    </>
  );
}

export default PlagiarismChecker;
