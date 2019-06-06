<template>
      <v-layout row>
         <v-flex xs-12 height="100%" >
            <v-card>
               <v-img v-if="!this.inSession" contain src="http://www.trespassmag.com/wp-content/uploads/2010/06/a_team_xlg1.jpg"
                  ></v-img>
               <v-card-title primary-title v-if="!this.inSession">
                  <div>
                     <h2 color="primary" class="headline mb-0">The A-Team</h2>
                     <div>
                        <v-layout
                           align-center
                           justify-space-around
                           wrap>
                           <v-tooltip bottom v-for="member in members">
                              <template v-slot:activator="{ on }">
                                 <v-avatar class="ma-1" v-on="on">
                                    <img v-bind:src="require(`@/assets/avatars/${member.name}.jpg`)" /> 
                                 </v-avatar>
                              </template>
                              <span>{{member.name}}</span>
                           </v-tooltip>
                        </v-layout>
                     </div>
                  </div>
               </v-card-title>

              
            <div v-if="this.inSession && this.showTimeLine">
              <v-card dark flat>
                <v-toolbar color="cyan" dark>
                  <v-toolbar-title>{{this.formatDate(this.sessionStartDate)}}</v-toolbar-title>
                </v-toolbar>
               </v-card>
               <v-card-text class="py-0">
                  <v-timeline
                     align-top
                     dense
                     >
                     <v-timeline-item
                        color="teal lighten-3"
                        small
                        >
                        <v-layout wrap pt-3>
                           <v-flex>
                              <strong>{{this.formatDate(this.sessionStartDate)}}</strong>
                           </v-flex>
                           <v-flex>
                              <div><strong>Attendees</strong></div>
                                <v-tooltip bottom v-for="attendee in attendees">
                                            <template v-slot:activator="{ on }">
                                              <v-avatar class="ma-1" v-on="on">
                                                  <img v-bind:src="require(`@/assets/avatars/${attendee.name}.jpg`)" /> 
                                              </v-avatar>
                                            </template>
                                            <span>{{attendee.name}}</span>
                                        </v-tooltip>
                           </v-flex>
                        </v-layout>
                     </v-timeline-item>
                     <v-timeline-item @click="toggleShowTimeLine" color="teal lighten-3" small v-for="(sessionItem, index) in sessionItems">
                            <template v-if="index == sessionItems.length - 1" v-slot:icon>
                              <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                                <template v-slot:activator="{ on }">
                                  <v-btn v-on="on" fab dark small color="primary">
                                    <v-icon dark>fas fa-external-link-alt</v-icon>
                                  </v-btn>
                                </template>
                                <v-card>
                                  <v-toolbar dark color="primary">
                                    <v-btn icon dark @click="dialog = false">
                                      <v-icon>fas fa-angle-left</v-icon>
                                    </v-btn>
                                    <v-toolbar-title>{{sessionItem.tagline}}</v-toolbar-title>
                                    </v-toolbar>

                                </v-card>
                              </v-dialog>
                    
                          </template>
                        <v-layout wrap pt-3>
                           <v-flex>
                              <strong>{{formatTime(sessionItem.start)}}</strong>
                           </v-flex>
                           <v-flex>
                              <div><strong>{{sessionItem.tagline}}</strong> </div>
                           </v-flex>
                           <v-flex>
                           </v-flex>
                        </v-layout>
                     </v-timeline-item>
                  </v-timeline>
               </v-card-text>
               </div>
               <div class="text-xs-center">
                  <v-btn small v-if="this.inSession" color="primary" @click="toggleSession">
                     Stop Session
                  </v-btn>
                  <v-btn small v-else color="primary" @click="toggleSession">
                     Start Session
                  </v-btn>
                  <v-btn v-if="this.inSession && !this.inGames" small color="warning" @click="this.startGames">
                     Start Game
                  </v-btn>
                  <v-btn v-if="this.inSession && !this.inReview" small color="blue" @click="this.startReview">
                     Start Review
                  </v-btn>
               </div>
            </v-card>
         </v-flex>

      </v-layout>
</template>
<script>
  import router from '../router'

   export default {
   methods: {
       toggleSession: function() {
           this.inSession = !this.inSession;
           this.sessionItems = [];
           this.sessionStartDate = new Date();
           this.showTimeLine = true;
       },

       toggleShowTimeLine: function() {
           this.showTimeLine = !this.showTimeLine;
       },
       startReview: function() {
         this.inReview = true;
         this.inGames = false;
         var item = new Object();
         item.tagline = "Review Answers";
         item.type = "Review"
         item.start = new Date();
         this.sessionItems.push(item);
       },
       startGames: function() {
         this.inGames = true;
         this.inReview = false;
        var item = new Object();
         item.type = "Games";
         item.tagline = "Quiz Time!"
         item.start = new Date();
         this.sessionItems.push(item);
       },
       loadQuiz: function() {
         router.push({ name: 'game', params: {quiz: {name: 'Study group quiz', topicCodes: ['I', 'II', 'III', 'IV', 'V']}} });
       },
       formatDate: function(date) {
         var monthNames = [
           "January", "February", "March",
           "April", "May", "June", "July",
           "August", "September", "October",
           "November", "December"
         ];
   
         var day = date.getDate();
         var monthIndex = date.getMonth();
         var year = date.getFullYear();
         return day + ' ' + monthNames[monthIndex] + ' ' + year;
       },
       formatTime: function(date) {
          var hours = date.getHours();
          var minutes = date.getMinutes();
          var ampm = hours >= 12 ? 'pm' : 'am';
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          minutes = minutes < 10 ? '0'+minutes : minutes;
          var strTime = hours + ':' + minutes + ' ' + ampm;
          return strTime;
        }   
   },  
   data () {
       return {
       inSession: false,
       dialog: false,
       showTimeLine: false,
       inGames: false,
       inReview: false,
       sessionStartDate: new Date(),
       sessionItems: [
   
       ],
       members: [
           { name: 'alan'},
           { name: 'jeremy'},
           { name: 'jim'},
           { name: 'kim'},
           { name: 'kate'}
       ],
       attendees: [
           { name: 'alan'},
           { name: 'jeremy'},
           { name: 'jim'},
           { name: 'kim'}
       ],
       right: null,
       drawer: false
       }
   }
   }   
</script>
<style lang="stylus" scoped>
   .bottom-container {
   position: absolute;
   margin: none;
   padding: none;
   width: 100%;
   bottom: 0;
   }
   .border {
   border: 1px solid red;
   }
</style>