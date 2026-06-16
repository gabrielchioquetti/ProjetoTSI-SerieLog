<template>
  <main>
    <h1>SerieLog</h1>
    <SeriesAssitidas :total="totalSeries" :assistidas="seriesAssistidas"/>
    <div v-for = "serie in series" :key = "serie.id">
      <SerieCard :serie="serie" />
    </div>
    <SerieFormulario @cadastrar="cadastrar" />
  </main>
</template>

<script setup>
    import { ref, onMounted , computed } from "vue";
    import SerieCard from "./components/SerieCard.vue";
    import SeriesAssitidas from "./components/SeriesAssistidas.vue";
    import SerieFormulario from "./components/SerieFormulario.vue";

    const series = ref([]);

    const form = ref({
    titulo: "",
    genero: "",
    nota: null,
    ano: "",
    assistida: false
    });

    const seriesAssistidas = computed(() => {
    return series.value.filter(serie => serie.assistida).length;
    });

    const totalSeries = computed(() => {
    return series.value.length;
    });

    const cadastrar = async (novaSerie) => {
    try {
        const response = await fetch("http://localhost:3000/series", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(novaSerie)
        });

        if (!response.ok) {
        throw new Error("Erro ao cadastrar série");
        }

        const serieCriada = await response.json();

        series.value.push(serieCriada);

        alert("Série cadastrada com sucesso!");
    } catch (error) {
        console.error(error);
        alert("Erro ao cadastrar série.");
    }
    };

    onMounted(async () => {
    const response = await fetch("http://localhost:3000/series");
    if (!response.ok) throw new Error("Erro ao buscar");
    series.value = await response.json();
    });
</script>