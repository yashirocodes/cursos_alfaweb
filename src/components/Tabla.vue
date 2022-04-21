<template>

  <div>
    <v-data-table :headers="headers" :items="cursos" class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editCurso(item.id)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteCurso(item.id)"> mdi-delete </v-icon>
      </template>
      <template v-slot:item.data.costo="{ item }">
        ${{ formatNumber(item.data.costo) }}
      </template>
      <template v-slot:item.data.fecha="{ item }">
        {{ item.data.fecha.toDate().toLocaleDateString() }}
      </template>
      <template v-slot:item.data.estado="{ item }">
        <v-chip v-if="item.data.estado === false" color="red lighten-1" outlined
          >NO</v-chip
        >
        <v-chip v-else color="green lighten-2" outlined>SI</v-chip>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" width="500">
      <v-card class="pa-5 scrollbar">
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
        <v-container>
          <v-switch
            v-model="localSwitch"
            :label="localSwitch ? 'Curso terminado : Si' : 'Curso terminado : No'"
          ></v-switch>
        </v-container>
        <v-container>
          <v-date-picker full-width v-model="editedCurso.fecha"></v-date-picker>
        </v-container>
        <v-btn color="warning" class="mr-4" @click="actualizarCurso">
          Actualizar
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Timestamp } from "@firebase/firestore";
import moment from 'moment'

export default {
  data() {
    return {
      localSwitch: false,
      state: false,
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
        estado: "",
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
          text: "Curso terminado",
          value: "data.estado",
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
    //FORMATO DE NUMEROS
    formatNumber(number) {
      return new Intl.NumberFormat("de-DE").format(number);
    },
    //eliminar curso
    async deleteCurso(id) {
      const confirmacion = confirm("¿Estas seguro de eliminar este curso?");
      if (confirmacion) {
        await this.eliminar_Curso(id);
        this.$swal.fire({
          type: "success",
          title: "Curso eliminado",
          text: "El curso ha sido eliminado con éxito",
        });
      }
    },
    //editar curso
    editCurso(idCurso) {
      this.editedIndex = idCurso;
      const cursoEncontrado = this.cursos.find((curso) => curso.id === idCurso);
      this.editedCurso = { ...cursoEncontrado.data };
      const fechaTimestamp = cursoEncontrado.data.fecha;
      const fechaFormateada = moment(fechaTimestamp.toDate()).format("YYYY-MM-DD");
      console.log(fechaFormateada);
      this.editedCurso.fecha = fechaFormateada;
      this.dialog = true;
    },
    //actualizar curso
    async actualizarCurso() {
      const { editedIndex: id, editedCurso: curso } = this;
      // convertir string a timestamp
      const fechaString = curso.fecha;
      const date = new Date()
      const fechaStringToUnix = await date.setFullYear(fechaString.substring(0, 4), fechaString.substring(5, 7) - 1, fechaString.substring(8, 10));
      const UnixToTimeStamp = await Timestamp.fromDate(new Date(fechaStringToUnix));
      curso.fecha = UnixToTimeStamp;
      // fin 
      curso.estado = this.localSwitch;
      console.log(curso.fecha);
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