<template>
  <v-app>

    <TopToolbar></TopToolbar>
    <v-content>

     <router-view />
   
   
    </v-content>
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
