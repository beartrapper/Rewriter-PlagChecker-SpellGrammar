import React from 'react';
import HomeNav from '../Nav/HomeNav';
import Prices from '../LandingPage/Prices/Prices';

function Upgrade(){
    return(
        <>
            <HomeNav />
            <div className="p-5"></div>
            <Prices free={false} signedIn={true}/>
        </>
    );
}

export default Upgrade;