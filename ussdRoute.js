const express = require("express")
const router = express.Router()
let ussdCode = "*928*38#"
let userSessionData = {}
const whitelist = ["233557206667"]
let service = ""

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
    }else if(newSession== false && userSessionData[sessionID].step == 1){
        userSessionData[sessionID].service = userData;
        if(userSessionData[sessionID].service =="1" && whitelist.includes(msisdn)){
            service = "1"
            message = "Please enter member's number for dues"
            continueSession = true;
            userSessionData[sessionID].step = userSessionData[sessionID].step + 1;
        }else{
            service ="1"
            message = "You are not authorized to use this service"
            continueSession = false;
        }
        if(userSessionData[sessionID].service =="2" && whitelist.includes(msisdn)){
            service = "2"
            message = "Please enter member's number for event"
            continueSession = true;
            userSessionData[sessionID].step = userSessionData[sessionID].step + 1;
        }else{
            service ="2"
            message = "You are not authorized to use this service"
            continueSession = false;
        }
    }else if(newSession == false && userSessionData[sessionID].step === 2){
        userSessionData[sessionID].phoneNumber = userData;
        if(userSessionData[sessionID].service == "1"){
            service = "1"
            message = "Please enter amount for dues:"
            continueSession = true;
            userSessionData[sessionID].step = userSessionData[sessionID].step + 1;
        }
        if(userSessionData[sessionID].service == "2"){
            service = "2"
            message = "Please enter amount for event:"
            continueSession = true;
            userSessionData[sessionID].step = userSessionData[sessionID].step + 1;
        }
    }else if (newSession == false && userSessionData[sessionID].tep === 3){
        userSessionData[sessionID].amount = userData;
        if(userSessionData[sessionID].service == "1"){
            service = "1"
            message = "Please confirm payment for dues\n"
            message += "1. Confirm\n"
            message += "2. Cancel\n"
            userSessionData[sessionID].step = userSessionData[sessionID].step + 1;
            continueSession = true;
        }
        if(userSessionData[sessionID].service == "2"){
            service = "2"
            message = "Please Confirm payment for event:\n"
            message += "1. Confirm\n"
            message += "2. Cancel\n"
            continueSession = true;
            userSessionData[sessionID].step = userSessionData[sessionID].step + 1;
        }
    }else if (newSession == false && userData === "1" && userSessionData[sessionID].step === "4"){
        if(userSessionData[sessionID].service == "1"){
            service = "1"
            message = "Please wait for propmt to authorize payment of dues. Thank you!"
            continueSession = false;
            delete userSessionData[sessionID];
        } else if (userSessionData[sessionID].service == "2"){
            service = "2"
            message = "Please wait for propmt to authorize payment of event. Thank you!"
            continueSession = false;
            delete userSessionData[sessionID];
        }
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