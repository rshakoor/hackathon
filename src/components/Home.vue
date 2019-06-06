<template>
    <div>
        <div v-if="authenticated">
            <h1 v-if="userSession.getAccount().idToken.extension_Role == 'Student'">Student Portal</h1>
            <h1 v-else>Teacher Portal</h1>
            <h2 style="color: grey">Welcome: {{userSession.getAccount().name}}</h2>
        </div>
        <div v-else>
            <h1>W!SE Portal</h1>
            <h3 style="color: grey">You are not logged in...</h3>
        </div>
    </div>
</template>
    

<script>
import * as Msal from 'msal';

var appConfig = {
      b2cScopes: ["https://B2C_1_signup_signinv2.onmicrosoft.com/hello/read"],
      webApi: "http://dbteam4wiseapi.azurewebsites.net/hello"
};

// configuration to initialize msal
var msalConfig = {
    auth: {
        clientId: "dd5de04c-ce1e-4a23-808d-1800b7b3e799", //This is your client ID
        authority: "https://login.microsoftonline.com/tfp/wiseteam4.onmicrosoft.com/B2C_1_signup_signinv2" //This is your tenant info
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
    }
};  

var clientApplication = new Msal.UserAgentApplication(msalConfig);

export default {
    methods: {
    }, 
    mounted(){
        if(this.userSession.getAccount() != null){
            this.authenticated = true;
        }
        else{
            this.authenticated = false;
        }
    },
    data () {
        return {
            userSession: clientApplication,
            authenticated: false
        }
    }
}
</script>

<style>

</style>
