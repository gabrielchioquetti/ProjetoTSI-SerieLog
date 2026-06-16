<template>
  <main>
    <h1>SerieLog</h1>
    <SeriesAssitidas :total="totalSeries" :assistidas="seriesAssistidas"/>
    
    <FiltroSeries @filtrar="atualizarFiltros" />

    <div id="cards">
      <div v-for="serie in seriesFiltradas" :key="serie.id" id="detalheCard">
        <RouterLink :to="`/series/${serie.id}`" id="detalhe">Ver detalhes</RouterLink>
        <SerieCard  :serie="serie" :textoBotao="'Remover'" @acao="remover"/>
      </div>
    </div>
  </main>
</template>

<script setup>
    import { ref, onMounted , computed, reactive } from "vue";
    import SerieCard from "../components/SerieCard.vue";
    import SeriesAssitidas from "../components/SeriesAssistidas.vue";
    import FiltroSeries from "../components/FiltroSeries.vue";

    const series = ref([]);
    
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
    #detalheCard{
        color: black;
    }
    #detalhe{
      margin-top: 5px;
    }
</style>