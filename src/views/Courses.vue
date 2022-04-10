<template>
  <div>
    <v-container class="mt-15">
      <v-row>
        <v-col cols="12" sm="6" md="4" v-for="({ data }, i) in cursos" :key="i">
          <v-card class="pa-4">
            <v-img max-height="170" contain :src="data.imagen" />
            <v-card-title>{{ data.nombre }}</v-card-title>
            <v-timeline align-top dense>
              <v-timeline-item color="pink" small>
                <div>Costo : $ <strong>{{ formatNumber(data.costo) }}</strong> </div>
                <div>Duración : <strong>{{ data.duracion }}</strong></div>
              </v-timeline-item>
            </v-timeline>
            <v-timeline align-top dense>
              <v-timeline-item color="pink" small>
                <div>Cupos : <strong> {{ data.cupos }}</strong></div>
                <div v-if="data.estado === false">Completado : <strong>NO</strong> </div>
                <div v-else >Completado : <strong>SI</strong></div>
              </v-timeline-item>
            </v-timeline>
            <v-timeline align-top dense>
              <v-timeline-item color="pink" small>
                <div>Fecha de registro : </div>
                <div><strong> {{ data.fecha.toDate().toLocaleDateString() }}</strong></div>
              </v-timeline-item>
            </v-timeline>
            <v-timeline align-top dense>
              <v-timeline-item color="pink" small>
                <div>Descripción : </div>
                <div><strong> {{ data.descripcion }}</strong></div>
              </v-timeline-item>
            </v-timeline>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapState(["cursos"]),
  },
  methods:{
    formatNumber(number) {
      return new Intl.NumberFormat("de-DE").format(number);
    },
  }
};
</script>


<style>
</style>