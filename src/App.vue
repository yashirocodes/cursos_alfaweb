<template>
  <v-app>
    <v-main>
      <Navbar></Navbar>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Navbar from '@/components/Navbar'
export default {
  name: 'App',
  components:{
    Navbar,
  },
  data: () => ({
    
  }),
  methods: {
    ...mapActions(["obtener_Cursos"]),
  },
  mounted() {
    this.obtener_Cursos();
  },
};
</script>
