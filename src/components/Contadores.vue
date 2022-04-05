<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" xs="12"  >
          <v-alert
            dense
            outlined
            color="success"
            icon="mdi-book-open-page-variant"
          >
            Cantidad total de cursos : <strong> {{ cantidadDeCursos }} </strong>
          </v-alert>
          <v-alert
            dense
            outlined
            color="deep-purple darken-1"
            icon="mdi-account-group"
          >
            Cantidad total de alumnos inscritos : <strong> {{ cantidadDeAlumnos }} </strong>
          </v-alert>
          <v-alert
            dense
            outlined
            color="red darken-1"
            icon="mdi-account-multiple-plus"
          >
            Cantidad total de cupos permitidos : <strong> {{ cantidadDeCupos }} </strong>
          </v-alert>
          <v-alert
            dense
            outlined
            color="amber lighten-1"
            icon="mdi-account-multiple-minus"
          >
            Cantidad total de cupos restantes : <strong> {{ cuposRestantes }} </strong>
          </v-alert>
          <v-alert
            dense
            outlined
            color="blue darken-1"
            icon="mdi-check-all"
          >
            Cantidad total de cursos terminados : <strong> {{ cantidadCursosTerminados }} </strong>
          </v-alert>
          <v-alert
            dense
            outlined
            color="orange darken-1"
            icon="mdi-account-alert"
          >
            Cantidad total de cursos por terminar : <strong> {{ cantidadCursosPorTerminar }} </strong>
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["cantidadDeCursos","cantidadDeAlumnos", "cantidadCursosTerminados","cantidadCursosPorTerminar","cantidadDeCupos","cuposRestantes"]),
  },
};
</script>

<style>
</style>