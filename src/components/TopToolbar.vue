<template>
  <div>
    <v-toolbar fixed app dark color="primary">

      <v-toolbar-side-icon @click.stop="toggleMenu"></v-toolbar-side-icon>

      <v-toolbar-title class="pa-0 ma-0 white--text change-font" >W!ser Together </v-toolbar-title>

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
        { title: 'My Study Plan', icon: 'fas fa-gamepad', link: 'studyplan' },
        { title: 'My Study Group', icon: 'fas fa-users', link: 'studygroup' },
        { title: 'My Progress', icon: 'fas fa-chart-line', link: 'analytics' },
      ],
      right: null,
      drawer: false
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