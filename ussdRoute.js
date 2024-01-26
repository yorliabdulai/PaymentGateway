const express = require("express")
const router = express.Router()
let ussdCode = "*928*38#"
let userSessionData = {}

router.get("/ussd", async(req, res)=>{
    const {sessionID, userID, newSession, msisdn, userData, network} = req.body
    console.log("Details from Arkesel", req.body)
    let message= ""
    let service= ""
    let continueSession ="";

    if(newSession && userData === ussdCode){
        userSessionData[sessionID]={
            step: 1,
            amount: undefined,
            service: undefined,
            phoneNumber: undefined,
            reference: undefined
        }
        message = "Welcome to the YorTech USSD payment platform.\n";
        message += "1. Pay your GMSA dues\n";
        message += "2. Pay for an event\n";
        continueSession = true;
    }

    let response = {
        sessionID: service,
        msisdn: msisdn,
        userID: userID,
        message: message,
        continueSession: continueSession,
        network: network
    }

    service.send(response)
})

module.exports = router

/*{
    "sessionID": "2005506191900168",
       "userID": "USSD_DOCUMENTATION",
         "newSession": true,
           "msisdn": "233271231234",
             "userData": "*928*1#",
               "network": "AIRTELTIGO"
};
*/