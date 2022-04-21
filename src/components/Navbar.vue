<template>
  <div>
    <v-app-bar dense height="100px" color="blue-grey darken-4">
      <router-link to="/">
        <img class="logoImg" src="../assets/logo.png" alt=""
      />
      </router-link>
      <v-spacer></v-spacer>

      <v-menu v-if="!user" offset-y transition="slide-x-transition" bottom right>
        <template v-slot:activator="{ on }">
          <v-btn class="deep-orange" color="primary" dark v-on="on">
           <v-icon>
            mdi-account-circle
           </v-icon>
          </v-btn>
        </template>
        <v-list class="d-flex flex-column align-center">
          <v-list-item>
            <v-btn
              to="/register"
              outlined
              color="deep-orange lighten-1 white--text"
              >Registrarse <v-icon class="ms-2">mdi-account-plus</v-icon>
            </v-btn>
          </v-list-item>
          <v-list-item >
            <v-btn to="/login" color="indigo darken-1 white--text"
              >Iniciar sesion <v-icon class="ms-2">mdi-login-variant</v-icon>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-app-bar-nav-icon
        color="white"
        v-if="user"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <!-- NAVIGATOR DRAWER -->
    <v-navigation-drawer
      v-if="user"
      :user="user"
      absolute
      temporary
      right
      v-model="drawer"
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img :src="user.photoURL" alt="" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ user.displayName }}</v-list-item-title>
            <v-list-item-subtitle>Activo 😄</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-spacer></v-spacer>

      <v-list dense>
        <v-list-item link to="/dashboard">
          <v-list-item-icon>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-content> Administracion </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="cerrarSesion">
          <v-list-item-icon>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content> Cerrar Sesion </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- END NAVIGATOR DRAWER -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),
  methods: {
    ...mapActions(["cerrar_Sesion"]),
    async cerrarSesion() {
      await this.cerrar_Sesion();
      this.$swal('Sesion cerrada', '', 'success');
      this.$router.push("/");
    },
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style>
.logoImg {
  width: 140px;
  margin-left: 1rem;
}
</style>