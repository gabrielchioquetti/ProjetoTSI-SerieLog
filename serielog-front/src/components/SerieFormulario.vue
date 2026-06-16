<template>
  <section>
    <h1>{{ props.serie ? "Editar Série" : "Cadastrar Série" }}</h1>
    <form @submit.prevent="enviar">
      <label for="titulo">Título:</label>
      <input id="titulo" name="titulo" type="text" v-model="form.titulo">
      <label for="genero">Gênero:</label>
      <input id="genero" name="genero" type="text" v-model="form.genero">
      <label for="nota">Nota:</label>
      <input id="nota" name="nota" type="number" v-model.number="form.nota">
      <label for="ano">Ano:</label>
      <input id="ano" name="ano" type="number" v-model.number="form.ano">
      <label for="assistida">Assistida:</label>
      <select id="assistida" v-model="form.assistida">
        <option :value="true">Assistida</option>
        <option :value="false">Não Assistida</option>
      </select>
      <button type="submit">
        {{ props.serie ? "Salvar Alterações" : "Cadastrar" }}
      </button>
    </form>
    <pre>{{ form }}</pre>
  </section>
</template>

<script setup>
  import { ref, watch } from "vue";

  const props = defineProps({
    serie: {
      type: Object,
      default: null
    }
  });

  const emit = defineEmits(["salvar"]);

  const form = ref({
    titulo: "",
    genero: "",
    nota: null,
    ano: null,
    assistida: false
  });

  watch(
    () => props.serie,
    (novaSerie) => {
      if (novaSerie) {
        form.value = { ...novaSerie };
      }
    },
    { immediate: true }
  );

  const enviar = () => {
    emit("salvar", { ...form.value });

    if (!props.serie) {
      form.value = {
        titulo: "",
        genero: "",
        nota: null,
        ano: null,
        assistida: false
      };
    }
  };
</script>

<style scoped>
  form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  button {
    grid-column: span 2;
    background-color: #42b883;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    cursor: pointer;
    transition: 0.3s;
    border: 2px solid black;
  }

  button:hover {
    background: #36996b;
  }
</style>