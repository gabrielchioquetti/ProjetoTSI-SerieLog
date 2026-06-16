<template>
  <div class="filtros-container">
    <div class="filtro-grupo">
      <label for="genero">Gênero:</label>
      <select id="genero" v-model="filtros.genero" @change="emitirFiltros">
        <option value="">Todos</option>
        <option v-for="genero in generos" :key="genero" :value="genero">
          {{ genero }}
        </option>
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

    <button 
      v-if="temFiltroAtivo" 
      @click="limparFiltros" 
      class="btn-limpar"
    >
      Limpar Filtros
    </button>
  </div>
</template>

<script setup>
  import { reactive, computed } from 'vue';

  const props = defineProps({
    generos: {
      type: Array,
      default: () => []
    }
  });

  const emit = defineEmits(['filtrar']);

  const filtros = reactive({
    genero: '',
    status: 'todas'
  });

  const temFiltroAtivo = computed(() => {
    return filtros.genero !== '' || filtros.status !== 'todas';
  });

  function emitirFiltros() {
    emit('filtrar', { ...filtros });
  }

  function limparFiltros() {
    filtros.genero = '';
    filtros.status = 'todas';
    emitirFiltros();
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

  .btn-limpar {
    padding: 8px 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background-color: #fff;
    cursor: pointer;
    margin-top: auto;
  }

  .btn-limpar:hover {
    background-color: #e0e0e0;
  }
</style>