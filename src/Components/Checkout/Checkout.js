import { PayPalButton } from "react-paypal-button";
import React from "react";
import Nav from "../Nav/Nav";
import { firestore, auth } from "../../firebase";
import emailjs from "emailjs-com";
import * as generator from "generate-password";

class Example extends React.Component {
  state = {
    paid: false,
    erorr: false,
    loading: false,
    pageLoad: true
  };


  componentDidMount(){
    setTimeout(() => {
      this.setState({pageLoad: false})

    }, 2000)
  }

  handleChange() {
    this.setState({ paid: false, erorr: false, loading: false });
  }

  render() {
    console.log(this.props);

    const paypalOptions = {
      clientId:
        "AUO4Sg6waZAdAAlrYuxZOqeO-27bL6WsKSdcVUcK2k-md1gK8EqBdv1Mc4ro2sU-LZbLUllFnyuBoe11",
      intent: "capture"
    };

    return (
      <>
        <Nav />
        {this.state.pageLoad ? 
        
        <div class="loadingio-spinner-rolling-bp0uc8kphr6">
        <div class="ldio-v9q6rtgt8o">
          <div></div>
        </div>
      </div>
      
    :<>
       <div className="">
          <div className="posi">
            <img
              src="images/undraw_investing_7u74.svg"
              alt="Image"
              class="img-fluid img-absolute posi"
            />
          </div>
        </div>
        <div className="padding-customized" onClick={this.handleChange}>
          {this.state.paid ? (
            <div className="alert alert-success">
              <p>Login credentials sent via Email address</p>
            </div>
          ) : (
            <></>
          )}
          {this.state.loading ? (
            <div className="alert alert-info">
              <p>Kindly wait for a few seconds..</p>
            </div>
          ) : (
            <></>
          )}

          {this.state.error ? (
            <div className="alert alert-danger">
              <p>Is the account already in use?</p>
            </div>
          ) : (
            <></>
          )}

          <PayPalButton
            paypalOptions={paypalOptions}
            // buttonStyles={buttonStyles}
            amount={this.props.location.state.amount}
            onPaymentSuccess={response => {
              this.setState({ loading: true });

              const generatedPassword = generator.generate({
                length: 10,
                numbers: true
              });

              auth
                .createUserWithEmailAndPassword(
                  response.payer.email_address,
                  generatedPassword
                )
                .then(res => {
                  firestore
                    .collection("users")
                    .doc(res.user.uid)
                    .set({
                      credits: this.props.location.state.credits,
                      recapthca: false
                    })
                    .then(() => {
                      auth
                        .signOut()
                        .then(() => console.log("logged out"))
                        .catch(() => console.log("err while logging out"));
                    })
                    .catch(err => console.log("error updating firestore"));

                  const template_params = {
                    userEmail: response.payer.email_address,
                    message_html: generatedPassword
                  };

                  const service_id = "gmail-contentrewriter";
                  const template_id = "template_bQtZdYnl";
                  const user_id = "user_qNDvwIf6G8yPhuSVlEBvK";
                  emailjs
                    .send(service_id, template_id, template_params, user_id)
                    .then(res => {
                      // setSuccess(true);
                      console.log(res);
                      // setLoading(false);
                      this.setState({ paid: true, loading: false });
                    })
                    .catch(err => {
                      //   setSuccess(false)
                      this.setState({ erorr: true, loading: false });

                      console.log(err);
                    });

                  //   setDone(true);
                })
                .catch(err => {
                  this.setState({ erorr: true, loading: false });
                  console.log(err);
                });

              console.log(response);
            }}
            onPaymentError={response => {
              this.setState({ erorr: true });
              console.log(response);
            }}
          />
        </div>
    
    </>}
     
      </>
    );
  }
}

export default Example;
