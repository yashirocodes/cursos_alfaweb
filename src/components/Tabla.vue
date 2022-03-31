<template>
  <div>
    <v-data-table :headers="headers" :items="cursos" class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editCurso(item.id)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteCurso(item.id)"> mdi-delete </v-icon>
      </template>
      <template v-slot:item.data.precio="{ item }">
        ${{ formatNumber(item.data.precio) }}
      </template>
      <template v-slot:item.data.fecha="{ item }">
        {{ item.data.fecha.toDate().toLocaleDateString() }}
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" width="500">
      <v-card class="pa-5">
        <v-text-field
          v-model="editedCurso.nombre"
          label="Nombre del curso"
          required
        ></v-text-field>
        <v-text-field
          v-model="editedCurso.imagen"
          label="Imagen del curso"
          required
        ></v-text-field>
        <v-text-field
          v-model.number="editedCurso.cupos"
          label="Cupos totales"
          required
        ></v-text-field>
        <v-text-field
          v-model.number="editedCurso.inscritos"
          label="inscritos"
          required
        ></v-text-field>
        <v-text-field
          v-model.number="editedCurso.costo"
          label="Costo del curso"
          required
        ></v-text-field>
        <v-text-field
          v-model="editedCurso.duracion"
          label="Duración de curso"
          required
        ></v-text-field>
        <v-text-field
          v-model="editedCurso.codigo"
          label="Codigo del curso"
          required
        ></v-text-field>
        <v-textarea
          v-model="editedCurso.descripcion"
          label="Descripción del curso"
          required
        ></v-textarea>
        <v-text-field
          v-model="editedCurso.fecha"
          label="Fecha del curso"
          required
        ></v-text-field>
        <v-btn color="warning" class="mr-4" @click="actualizarCurso">
          Actualizar
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
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
      editedIndex: null,
      editedCurso: {},
      headers: [
        {
          text: "Nombre Del Curso",
          value: "data.nombre",
        },
        {
          text: "Cupos del curso",
          value: "data.cupos",
        },
        {
          text: "Inscritos en el curso",
          value: "data.inscritos",
        },
        {
          text: "Duracion del curso",
          value: "data.duracion",
        },
        {
          text: "Costo del curso",
          value: "data.costo",
        },
        {
          text: "Descripción del curso",
          value: "data.descripcion",
        },
        {
          text: "Fecha de ingreso",
          value: "data.fecha",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    ...mapState(["cursos"]),
  },
  methods: {
    ...mapActions(["eliminar_Curso", "update_Curso"]),
    //eliminar curso
    async deleteCurso(id) {
      const confirmacion = confirm("¿Estas seguro de eliminar este curso?");
      if (confirmacion) {
        await this.eliminar_Curso(id);
        alert("Curso eliminado con exíto");
      }
    },
    //editar curso
    editCurso(idCurso) {
      this.editedIndex = idCurso;
      const cursoEncontrado = this.cursos.find((curso) => curso.id === idCurso);
      this.editedCurso = { ...cursoEncontrado.data };
      this.dialog = true;
    },
    //actualizar curso
    async actualizarCurso() {
      const { editedIndex: id, editedCurso: curso } = this;
      const payload = { id, curso };
      await this.update_Curso(payload);
      alert("Curso actualizado con exito");
      this.dialog = false;
    },
  },
};
</script>

<style>
</style>