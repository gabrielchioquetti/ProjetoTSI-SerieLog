<template>
  <div class="filtros-container">
    <div class="filtro-grupo">
      <label for="genero">Gênero:</label>
      <select id="genero" v-model="filtros.genero" @change="emitirFiltros">
        <option value="">Todos</option>
        <option value="Ação">Ação</option>
        <option value="Comédia">Comédia</option>
        <option value="Crime / Drama">Crime / Drama</option>
        <option value="Drama">Drama</option>
        <option value="Drama / Comédia">Drama / Comédia</option>
        <option value="Drama / Crime">Drama / Crime</option>
        <option value="Drama / História">Drama / História</option>
        <option value="Ficção Científica">Ficção Científica</option>
        <option value="Ficção Científica / Suspense">Ficção Científica / Suspense</option>
        <option value="Ficção Científica / Terror">Ficção Científica / Terror</option>
        <option value="Outros">Outros</option>
        </select>
    </div>

    <div class="filtro-grupo">
      <label for="status">Status:</label>
      <select id="status" v-model="filtros.status" @change="emitirFiltros">
        <option value="todas">Todas</option>
        <option value="assistidas">Assistidas</option>
        <option value="nao-assistidas">Não Assistidas</option>
      </select>
    </div>
  </div>
</template>

<script setup>
    import { reactive } from 'vue';

    const emit = defineEmits(['filtrar']);

    const filtros = reactive({
        genero: '',
        status: 'todas'
    });

    function emitirFiltros() {
        emit('filtrar', { ...filtros });
    }
</script>

<style scoped>
    .filtros-container {
        display: flex;
        gap: 20px;
        justify-content: center;
        margin: 20px 0;
        background-color: #f5f5f5;
        padding: 15px;
        border-radius: 8px;
    }

    .filtro-grupo {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    select {
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #ccc;
        min-width: 150px;
    }
</style>