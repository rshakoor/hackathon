<template>
  <div>
    <v-toolbar fixed app dark color="primary">

      <v-toolbar-side-icon @click.stop="toggleMenu"></v-toolbar-side-icon>

      <v-toolbar-title class="white--text">Wiser Together</v-toolbar-title>

    </v-toolbar>
    <v-navigation-drawer permanent>
          <v-toolbar flat>
            <v-list>
              <v-list-tile>
                <v-list-tile-title class="title">
                  Application
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-toolbar>

          <v-divider></v-divider>

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
data () {
    return {
      items: [
        { title: 'Game', icon: 'dashboard', link: 'game' },
        { title: 'Study Group', icon: 'question_answer', link: 'studygroup' },
        { title: 'Analytics', icon: 'question_answer', link: 'analytics' },
      ],
      right: null
    }
  }
}
</script>
