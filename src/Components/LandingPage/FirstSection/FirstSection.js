import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import * as generator from 'generate-password'
import { firestore, auth } from '../../../firebase'
import * as emailCheck from 'email-check'

function FirstSection () {

  const [email, setEmail] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signUpError, setSignUpError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  
  const sendEmail = () => {
    if(email == null)
      setError(true)
    
    else {
      setLoading(true)

      
        const generatedPassword = generator.generate({
          length: 10,
          numbers: true
        });
  
  
  
        auth
        .createUserWithEmailAndPassword(email, generatedPassword)
        .then(res => {
          
          firestore
            .collection("users")
            .doc(res.user.uid)
            .set({
              credits: 50
            }).then(() => {
              auth.signOut().then(() => console.log('logged out')).catch(() => console.log('err while logging out'))
            }).catch(err => console.log('error updating firestore'))
  
            const template_params = {
              "userEmail": email,
              "message_html": generatedPassword
           }
           
           const service_id = "gmail-contentrewriter";
           const template_id = "template_bQtZdYnl";
           const user_id = "user_qNDvwIf6G8yPhuSVlEBvK"
           emailjs.send(service_id, template_id, template_params, user_id).then(res => {
            setSuccess(true);
            console.log(res)
            setLoading(false);

            }).catch(err => {
              setSuccess(false)
              console.log(err)
            });
  
  
          setDone(true);
        })
        .catch(err => setSignUpError(true));






    }
  } 

  const handleEmail = e => {
    console.log(e.target.value);
    setError(false);
    setSuccess(null);
    setEmail(e.target.value);
  }

    return(

                   <div class="site-blocks-cover" style={{"overflow": "hidden"}}>
            <div class="container">
              <div class="row align-items-center justify-content-center">
      
                <div class="col-md-12" style={{"position": "relative"}} data-aos="fade-up" data-aos-delay="200">
                  
                  <img src="images/undraw_investing_7u74.svg" alt="Image" class="img-fluid img-absolute" />
      
                  <div class="row mb-4" data-aos="fade-up" data-aos-delay="200">
                    <div class="col-lg-6 mr-auto">
                      <h1>Make Your Life More Comfy</h1>
                      <p class="mb-5">Life can be unfairly hard at times. We at ContentRewriter try and make things easier one at a time.</p>
                      <div class="input-group mb-3 ">
  <input onChange={handleEmail} type="email" class="form-control" placeholder="Please input email address here" aria-label="Email Address" aria-describedby="basic-addon2" />
  <div class="input-group-append">
  <a onClick={sendEmail} href="#" class={"btn btn-primary mr-2 mb-2 " + (loading ? 'disabled' : '') }>{!loading ? <>Free Trial</> :<>Please wait</> }</a>

  </div>

    </div>
    {error ? 
  <div className="alert alert-danger">It doesn't work like that :(</div>:<></>
  }
      {success && done ? 
  <div className="alert alert-success">Login credentials sent via email :)</div>:<></>
  }
      {success == false ? 
  <div className="alert alert-danger">Something went wrong :O</div>:<></>
  }

{signUpError ? 
  <div className="alert alert-danger">Error with mail!</div>:<></>
  }

{emailError ? 
  <div className="alert alert-danger">Please input the right email</div>:<></>
  }
      

                    </div>
                    
                    
                  </div>
      
                </div>
              </div>
            </div>
          </div>  
       
    );
}

export default FirstSection;