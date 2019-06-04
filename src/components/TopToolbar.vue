<template>
  <div>
    <v-toolbar fixed app dark color="primary">

      <v-toolbar-side-icon @click.stop="toggleMenu"></v-toolbar-side-icon>

      <v-toolbar-title class="white--text">Wiser Together</v-toolbar-title>

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
export default {
  methods: {
    toggleMenu: function() {
      if (this.drawer) { 
        this.drawer = false;
      } else {
        this.drawer = true;
      }
    }
  },  
data () {
    return {
      items: [
        { title: 'Game', icon: 'fas fa-gamepad', link: 'game' },
        { title: 'Study Group', icon: 'fas fa-users', link: 'studygroup' },
        { title: 'My Progress', icon: 'fas fa-chart-line', link: 'analytics' },
      ],
      right: null,
      drawer: false
    }
  }
}
</script>
