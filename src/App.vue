<template>
  <v-app>

    <TopToolbar></TopToolbar>
      <router-view />
    <BottomNav></BottomNav>


  </v-app>
</template>

<script>
import TopToolbar from './components/TopToolbar';
import BottomNav from './components/BottomNav';

export default {
  name: 'App',
  components: {
    TopToolbar,
    BottomNav
  },
  data () {
    return {
      //
    }
  }
}
</script>
