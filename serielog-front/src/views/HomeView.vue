<template>
  <main>
    <h1>SerieLog</h1>
    <SeriesAssitidas :total="totalSeries" :assistidas="seriesAssistidas"/>
    <FiltroSeries :generos="listaGeneros" @filtrar="atualizarFiltros" />
    <div id="cards">
      <div v-for="serie in seriesFiltradas" :key="serie.id"  class="card-wrapper" @click="irParaDetalhes(serie.id)">
        <SerieCard :serie="serie"  :textoBotao="'Remover'"  @acao="remover"/>
      </div>
    </div>
  </main>
</template>

<script setup>
  import { ref, onMounted, computed, reactive } from "vue";
  import { useRouter } from "vue-router";
  import SerieCard from "../components/SerieCard.vue";
  import SeriesAssitidas from "../components/SeriesAssistidas.vue";
  import FiltroSeries from "../components/FiltroSeries.vue";

  const router = useRouter();
  const series = ref([]);

  const listaGeneros = computed(() => {
    if (!series.value.length) return [];
    const generos = series.value.map(serie => serie.genero).filter(Boolean);
    return [...new Set(generos)].sort();
  });

  const filtrosAtivos = reactive({
    genero: '',
    status: 'todas'
  });

  function atualizarFiltros(novosFiltros) {
    filtrosAtivos.genero = novosFiltros.genero;
    filtrosAtivos.status = novosFiltros.status;
  }

  const seriesFiltradas = computed(() => {
    return series.value.filter(serie => {
      const passaGenero = filtrosAtivos.genero === '' || serie.genero === filtrosAtivos.genero;
      let passaStatus = true;
      if (filtrosAtivos.status === 'assistidas') {
        passaStatus = serie.assistida === true;
      } else if (filtrosAtivos.status === 'nao-assistidas') {
        passaStatus = serie.assistida === false;
      }
      return passaGenero && passaStatus;
    });
  });

  const seriesAssistidas = computed(() => {
    return series.value.filter(serie => serie.assistida).length;
  });

  const totalSeries = computed(() => {
    return series.value.length;
  });

  function irParaDetalhes(id) {
    router.push(`/series/${id}`);
  }

  onMounted(async () => {
    const response = await fetch("http://localhost:3000/series");
    if (!response.ok) throw new Error("Erro ao buscar");
    series.value = await response.json();
  });

  async function remover(id) {
    try {
      const res = await fetch(`http://localhost:3000/series/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erro ao remover");

      series.value = series.value.filter((serie) => serie.id !== id);

    } catch (err) {
      console.error(err);
      alert("Erro ao remover série");
    }
  }
</script>

<style scoped>
  #cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 25px;
    max-width: 1200px;
    margin: 40px auto;
  }

  .card-wrapper {
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .card-wrapper:hover {
    transform: translateY(-5px);
  }
</style>