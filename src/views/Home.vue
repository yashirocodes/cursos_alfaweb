<template>
  <div class="home">
    <v-container class="background">
      <v-row  class="alto">
        <v-col cols="12" sm="6" class="flex flex-column">
          <vue-typed-js
          class="mb-3"
            :strings="[
              ' AL MUNDO DIGITAL',
              ' AL EMPRENDIMIENTO',
              'AL MUNDO LABORAL',
            ]"
            :loop="true"
            :typeSpeed="80"
            :smartBackspace="true"
          >
            <h3>Hola <span class="typing"></span></h3>
          </vue-typed-js>
          <v-btn  elevation="10" color="orange darken-2 white--text" to="/courses">Descubrir Cursos </v-btn>
        </v-col>
        <v-col cols="12" sm="5" class="flex">
         <v-img
         src="https://i.imgur.com/bIXSBkP.png"
        
         ></v-img>
        </v-col>
        <v-col>
         <v-card>
           
         </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  name: "Home",
  data() {
    return {
    
    };
  },
};
</script>
<style scoped>
.background {
  background-image: linear-gradient(
    to left top,
    #023047,
    #053d56,
    #094b64,
    #0d5973,
    #126782
  );
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.alto {
  height: 100%;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
/* Animation */
.typing {
  color: rgb(255, 157, 36);
  font-family: 'TTRationalistBold';
}
h3 {
  color: wheat;
  font-family: 'TTRationalistNormal';
}
</style>
