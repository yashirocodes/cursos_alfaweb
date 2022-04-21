<template>
  <div>
    <v-col cols="12" md="8" lg="6" class="ma-auto mt-10">
      <h2 class="text-center">Inicia Sesión</h2>
      <v-card class="pa-8">
        <v-form ref="form">
        <v-text-field
          :rules="emailRules"
          v-model="usuario.email"
          label="Ingrese su email"
          required
        >
        </v-text-field>
        <v-text-field
          v-model="usuario.password"
          label="Ingrese su clave"
          required
        >
        </v-text-field>
        <v-container class="d-flex flex-column align-center">
          <v-btn width="200px" class="mb-5" color="primary" @click="iniciarSesion" :loading="loading"
            >Iniciar Sesión</v-btn
          >
          <v-btn width="200px" class="mb-5" color="danger" @click="reset">Limpiar Formulario</v-btn>
          <v-btn width="200px" color="warning" @click="resetValidation"
            >Limpiar Validación</v-btn
          >
        </v-container>
      </v-form>
      </v-card>
    </v-col>
    <v-snackbar color="green" top centered v-model="snackbarSuccess">
      Inicio de sesión correcto
    </v-snackbar>
    <v-snackbar color="red" top centered v-model="snackbarFailed">
      Usuario o contraseña no validos <v-icon> mdi-emoticon-sad </v-icon>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import rules from "@/helpers/rules.js";
const { emailRules } = rules;

export default {
  data() {
    return {
      loading: false,
      snackbarSuccess: false,
      snackbarFailed: false,
      usuario: {
        email: "prueba@prueba.cl",
        password: 123456,
      },
      emailRules,
    };
  },
  methods: {
    ...mapActions(["iniciar_Sesion",]),
    async iniciarSesion() {
      try {
        const usuario = { ...this.usuario };
        await this.iniciar_Sesion(usuario);
        this.snackbarSuccess = true;
        this.reset();
        this.$router.push("/dashboard");
      } catch (error) {
        this.snackbarFailed = true;
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    reset() {
      const { form } = this.$refs;
      form.reset();
    },
    resetValidation() {
      const { form } = this.$refs;
      form.resetValidation();
    },
  },
};
</script>

<style>
</style>