<template>
  <main>
    <SerieFormulario @salvar="cadastrar" />
  </main>
</template>

<script setup>
    import { ref } from "vue";
    import SerieFormulario from "../components/SerieFormulario.vue";
    import { useRouter } from "vue-router";

    const router = useRouter();

    const series = ref([]);

    const form = ref({
    titulo: "",
    genero: "",
    nota: null,
    ano: "",
    assistida: false
    });

    const cadastrar = async (novaSerie) => {
    try {
        const response = await fetch("http://localhost:3000/series", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
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
    router.push("/");
    };
</script>