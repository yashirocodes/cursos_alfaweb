<template>
  <div>
    <v-col cols="12" md="8" class="ma-auto">
      <v-card class="mt-12">
        <h2 class="text-center pt-5">Registrar nueva cuenta</h2>
        <v-form ref="form" class="pa-7">
          <!-- NOMBRE -->
          <v-text-field
            v-model="usuario.displayName"
            :counter="15"
            :rules="nameRules"
            label="Nombre"
            required
          ></v-text-field>
          <!-- FOTO -->
          <v-text-field
            v-model="usuario.photoURL"
            label="Imagen"
            hint="Asegurate que el enlace termine en JPG o PNG"
          ></v-text-field>
          <!-- EMAIL -->
          <v-text-field
            v-model="usuario.email"
            :rules="emailRules"
            label="E-mail"
            required
            hint="Ejemplo : ejemplo@ejemplo.com"
          ></v-text-field>
          <!-- PASSWORD -->
          <v-text-field
            v-model="usuario.password"
            label="Password"
            :rules="passwordRules"
            hint="Minimo 6 caracteres"
            required
            class="mb-5"
          ></v-text-field>
          <v-row >
            <v-col class="d-flex justify-center" cols="12"  lg="4">
              <v-btn
                color="indigo darken-1 white--text"
                class="mr-4"
                @click="registerAndAddUser"
                :loading="loading"
                elevation="8"
              >
                Registrarse
              </v-btn>
            </v-col>

            <v-col cols="12"  lg="4" class="d-flex justify-center">
              <v-btn outlined color="error" @click="reset">
                Limpiar Formulario
              </v-btn>
            </v-col>

            <v-col cols="12" lg="4" class="d-flex justify-center">
              <v-btn outlined color="warning" @click="resetValidation">
                Resetear Validación
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-col>
    <v-snackbar color="green" top centered v-model="snackbarSuccess">
      Usuario registrado con éxito
    </v-snackbar>
    <v-snackbar color="red" top centered v-model="snackbarFailed">
      Ocurrió un problema <v-icon> mdi-emoticon-sad </v-icon>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import rules from "@/helpers/rules.js";
const { emailRules, passwordRules, nameRules } = rules;
export default {
  data() {
    return {
      loading: false,
      snackbarSuccess: false,
      snackbarFailed: false,
      usuario: {
        displayName: "",
        photoURL: "",
        email: "",
        password: "",
      },
      emailRules,
      passwordRules,
      nameRules,
    };
  },
  methods: {
    ...mapActions(["register_User", "add_User"]),
    async registerAndAddUser() {
      try {
        const usuario = { ...this.usuario };
        this.loading = true;
        await this.register_User(usuario);
        delete usuario.password;

        await this.add_User(usuario);
        this.snackbarSuccess = true;
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