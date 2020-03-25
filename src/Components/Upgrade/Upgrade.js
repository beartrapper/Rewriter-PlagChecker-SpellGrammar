import React, { useEffect, useState } from "react";
import { auth, firestore } from "../../firebase";
import { Redirect } from "react-router-dom";
import axios from "axios";
import HomeNav from "../Nav/HomeNav";
import ReCAPTCHA from "react-google-recaptcha";
import MobileHomeNAv from "../Nav/MobileHomeNav";
import SimpleNav from "../Nav/SimpleNav";
import Prices from "../LandingPage/Prices/Prices";

function Upgrade() {
  const [userStatus, setUserStatus] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [value, setValue] = useState("");
  const [updatedValue, setUpdatedValue] = useState("");
  const [wordsLength, setWordsLength] = useState(0);
  const [uniqueness, setUniqueness] = useState(1);
  const [ignoreWords, setIgnoreWords] = useState("aforementioned");
  const [spellCheck, setSpellCheck] = useState(false);
  const [plagiarismPlaces, setPlagiarismPlaces] = useState();
  const [checked, setChecked] = useState(false);
  const [checking, setChecking] = useState(false);
  const [userInfo, setUserInfo] = useState(0);
  const [fetchedFirestore, setFetchedFirestore] = useState(false);
  const [countCredits, setCountCredits] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [pageLoading, setPageLoading] = useState(true);
  const [donePlagCheck, setDonePlagCheck] = useState(false);




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
    axios.post('http://178.128.47.78:5000/api/plagiarism', obj)
    .then(res => {
      firestore
      .collection('users')
      .doc(userStatus.uid)
      .set({
        credits: userInfo.credits - 1
      })
      .then(respo => {
        // res.data.sources.map(item => {
          const response = JSON.parse(res.data);
          console.log(response);

          if(response.plagPercent != "0"){
            let stringResponse = `Plagiarism Percentage: ${response.plagPercent}% \n\n`;
            for(let counter = 0; counter < response.details.length; counter++){
              stringResponse = stringResponse + `- ${response.details[counter].query} -- ${response.details[counter].display.url} \n\n`
            } 
            setPlagiarismPlaces(stringResponse);
          } else {
            let stringResponse = `plagiarism Percentage ${response.plagPercent}% \n`;
          }
          
          // if(!response.plagPercent){
          //   const obj = {
          //     plagPercent: 0,
          //     details: []
          //   }
          //   setPlagiarismPlaces(obj);
          // } else {
          //   const obj = {
          //     plagPercent: response.plagPercent,
          //     details: 
          //   }
          // }
          // setPlagiarismPlaces(response);
          setChecked(true);
          setCountCredits(countCredits - 1)
      setChecking(false);
      setDonePlagCheck(true);
  
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
  
  const handleReset = e => {
    setValue('');
    setPlagiarismPlaces('');
  }

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
        <SimpleNav />
        <div className="text-center text-dark pt-4 mt-4">
       
          <h5>
            You have {countCredits} credits remaining.
          </h5>
     
        </div>
        <Prices free={false} signedIn={true} />
     
        </>








)}
</> }



 
    </>
  );
}

export default Upgrade;




