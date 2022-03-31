<template>
  <div>
    <v-container class="d-flex justify-center my-5">
      <h2>Administración</h2>
      <v-btn color="red white--text" class="ms-5" @click="cursoModal"
        >Agregar Curso</v-btn
      >
    </v-container>
    <v-dialog v-model="dialog" width="600">
      <v-card class="pa-8">
        <v-card-title>Agregando un curso</v-card-title>
        <v-form>
          <v-text-field
            v-model="curso.nombre"
            label="Nombre del curso"
            required
          ></v-text-field>
          <v-text-field
            v-model="curso.imagen"
            label="Imagen del curso"
            required
          ></v-text-field>
          <v-text-field
            v-model.number="curso.cupos"
            label="Cupos totales"
            required
          ></v-text-field>
          <v-text-field
            v-model.number="curso.inscritos"
            label="inscritos"
            required
          ></v-text-field>
          <v-text-field
            v-model.number="curso.costo"
            label="Costo del curso"
            required
          ></v-text-field>
          <v-text-field
            v-model="curso.duracion"
            label="Duración de curso"
            required
          ></v-text-field>
          <v-text-field
            v-model="curso.codigo"
            label="Codigo del curso"
            required
          ></v-text-field>
          <v-textarea
            v-model="curso.descripcion"
            label="Descripción del curso"
            required
          ></v-textarea>

          <v-btn color="blue" @click="agregarCurso()">Agregar Curso</v-btn>
        </v-form>
      </v-card>
    </v-dialog>
    <Tabla/>
  </div>
</template>

<script>
import Tabla from '@/components/Tabla.vue'
import { mapActions } from "vuex";
export default {
  components: {
    Tabla
  },
  data() {
    return {
      dialog: false,
      curso: {
        nombre: "",
        imagen: "",
        duracion: "",
        cupos: "",
        inscritos: "",
        costo: "",
        codigo: "",
        descripcion: "",
      },
    };
  },
  methods: {
    ...mapActions(["agregar_Curso"]),
    cursoModal() {
      return (this.dialog = true);
    },
    async agregarCurso() {
      const curso = { ...this.curso };
      curso.fecha = new Date();
      await this.agregar_Curso(curso);
      alert("Curso agregado");
      this.dialog = false;
    },
  },
};
</script>

<style>
</style>