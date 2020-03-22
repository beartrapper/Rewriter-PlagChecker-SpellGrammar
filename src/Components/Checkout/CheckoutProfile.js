import { PayPalButton } from "react-paypal-button";
import React from "react";
import HomeNav from "../Nav/HomeNav";
import { firestore, auth } from "../../firebase";
import emailjs from "emailjs-com";
import * as generator from "generate-password";
import Nav from "../Nav/Nav";

class CheckoutProfile extends React.Component {
  state = {
    paid: false,
    erorr: false,
    loading: false,
    pageLoad: true,
    user: ''
  };


  componentDidMount(){
      auth.onAuthStateChanged(userState => {
        console.log(userState);
        this.setState({user: userState.uid})
        setTimeout(() => {
            this.setState({pageLoad: false})
      
          }, 2000)
      })
    

   
  }

//   handleChange() {
//     this.setState({ paid: false, erorr: false, loading: false });
//   }

  render() {
    console.log(this.props);

    const paypalOptions = {
      clientId:
        "AUO4Sg6waZAdAAlrYuxZOqeO-27bL6WsKSdcVUcK2k-md1gK8EqBdv1Mc4ro2sU-LZbLUllFnyuBoe11",
      intent: "capture"
    };

    return (
      <>
        {this.state.pageLoad ? 
        
        <div class="loadingio-spinner-rolling-bp0uc8kphr6">
        <div class="ldio-v9q6rtgt8o">
          <div></div>
        </div>
      </div>
      
    :
    <>
        <Nav />

       <div className="">
          <div className="posi">
            {/* <img
              src="images/undraw_investing_7u74.svg"
              alt="Image"
              class="img-fluid img-absolute posi"
            /> */}
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


        








                  firestore
                    .collection("users")
                    .doc(this.state.user)
                    .set({
                      credits: this.props.location.state.credits,
                      recapthca: false
                    })
                    .then(() => {
                        this.setState({paid: true})
                    })
                    .catch(err => {
                        this.setState({erorr: true});
                        console.log("error updating firestore");
                    });

              







                  //   setDone(true);
            
            //   console.log(response);
            }}
            onPaymentError={response => {
              this.setState({ erorr: true });
            //   console.log(response);
            }}
          />
        </div>
    
    </>}
     
      </>
    );
  }
}

export default CheckoutProfile;
