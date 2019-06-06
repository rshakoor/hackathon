<template>
  <div>
    <v-toolbar fixed app dark color="primary">

      <v-toolbar-side-icon @click.stop="toggleMenu"></v-toolbar-side-icon>

      <v-toolbar-title class="pa-0 ma-0 white--text change-font" >W!ser Together</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn v-if="authenticated" v-on:click="logout" flat>LOGOUT</v-btn>
        <v-btn v-else v-on:click="login" flat>LOGIN</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" fixed app clipped>

          <v-list dense class="pt-0">
            <v-list-tile
              v-for="item in items"
              :key="item.title"
              :to="{path: '/' + item.link}"
              @click=""
            >
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
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
    toggleMenu: function() {
      if (this.drawer) { 
        this.drawer = false;
      } else {
        this.drawer = true;
      }
    },
    login: function() {
        var loginRequest = {
            scopes: appConfig.b2cScopes
        };

        clientApplication.loginPopup(loginRequest).then((loginResponse)=> {
            var tokenRequest = {
                scopes: appConfig.b2cScopes
            };
            
            console.log(clientApplication.getAccount());
            this.authenticated = true;
            this.refreshPage();
        }).catch (function (error) {
            console.log("Error during login:\n" + error);
        });
    },
    logout: function(){
        clientApplication.logout();
        this.authenticated = false;
        this.$router.replace({name: 'home'});
    },
    refreshPage: function(){
      this.$router.go();
      console.log("page refreshed");
    }
  },
  mounted(){
    if(clientApplication.getAccount() != null){
      // this.log = { title: 'Logout', icon: 'fas fa-sign-out-alt', fun: 'logout' };
      this.authenticated = true;
    }
    else{
      // this.log = { title: 'Login', icon: 'fas fa-sign-in-alt', fun: 'login' };
      this.authenticated = false;
    }

    //console.log(this.log.fun);
  },
  data () {
    return {
      items: [
        { title: 'Home', icon: 'fas fa-home', link: '' },
        { title: 'My Study Plan', icon: 'fas fa-gamepad', link: 'studyplan' },
        { title: 'My Study Group', icon: 'fas fa-users', link: 'studygroup' },
        { title: 'My Progress', icon: 'fas fa-chart-line', link: 'analytics' }
      ],
      right: null,
      drawer: false,
      authenticated: false
    }
  }
}
</script>
<style lang="stylus" scoped>
.change-font {
    font-family: "Rubik", Helvetica, sans-serif;
    font-size:150%;
}
.logo-image {
  height: 35px;
}

</style>