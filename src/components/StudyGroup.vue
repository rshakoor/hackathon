
   <template>
      <v-card>
        <v-img contain="true" src="http://www.trespassmag.com/wp-content/uploads/2010/06/a_team_xlg1.jpg"
        ></v-img>

        <v-card-title primary-title>
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

        <v-card-actions>
        </v-card-actions>
      </v-card>
    </template>
    <script>
    export default {
    methods: {
    },  
    data () {
        return {
        members: [
            { name: 'alan'},
            { name: 'jeremy'},
            { name: 'jim'},
            { name: 'kim'},
            { name: 'kate'}
        ],
        right: null,
        drawer: false
        }
    }
    }   
    </script>