import Vue from "vue";
import Vuex from "vuex";

//FIREBASE
import {
  getFirestore, collection, query, onSnapshot, addDoc,
  doc, deleteDoc, updateDoc, where
} from "firebase/firestore";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    cursos:[]
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SIGN_OUT(state) {
      state.user = null;
    },
    SET_CURSOS(state, cursos){
        state.cursos = cursos;
  },
},
  actions: {
    //REGISTRAR USUARIO
    async register_User(context, { email, password }) {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
    },
    //AGREGAR USUARIO
    async add_User(context, usuario) {
      const db = getFirestore();
      const collectionRef = collection(db, "usuarios");
      await addDoc(collectionRef, usuario);
    },
    //INICIAR SESIÓN
    async iniciar_Sesion({ commit }, { email, password }) {
      const auth = getAuth();
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const db = getFirestore();
      const q = query(collection(db, "usuarios"), where("email", "==", email));
      onSnapshot(q, (querySnapshot) => {
        let user = {};
        querySnapshot.forEach((doc) => {
          user = doc.data();
        });
        commit("SET_USER", user);
      });
    },

    //CERRAR SESIÓN
    async cerrar_Sesion({ commit }) {
      const auth = getAuth();
      await signOut(auth);
      commit("SIGN_OUT");
    },
    //AREGAR CURSO
    async agregar_Curso(context, curso) {
      const db = getFirestore();
      const collectionRef = collection(db, "cursos");
      await addDoc(collectionRef, curso);
    },
    //OBTENER CURSOS
    async obtener_Cursos({commit}){
      const db = getFirestore();
      const q = query(collection(db, "cursos"));
      onSnapshot(q,(querySnapshot)=>{
        const cursos = [];
        querySnapshot.forEach((doc)=>{
          const curso = {
            id: doc.id,
            data: doc.data()
          }
          cursos.push(curso)
        })
        commit("SET_CURSOS",cursos)
      })
    },
    //ELIMINAR CURSO
    async eliminar_Curso(context, idCurso){
      const db = getFirestore()
      const docRef = doc(db, "cursos", idCurso)
      await deleteDoc(docRef)
    },
    //ACTUALIZAR CURSO
    async update_Curso(context, {id, curso}){
      const db = getFirestore()
      const docRef = doc(db, "cursos", id)
      await updateDoc(docRef, curso)
    },
    
  },
});
