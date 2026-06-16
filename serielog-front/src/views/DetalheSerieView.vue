<template>
  <main v-if="serie">
    <div id="cards">
      <SerieCard :serie="serie" textoBotao="Editar" @acao="abrirEdicao"/>
    </div>
    <SerieFormulario v-if="mostrandoFormulario" :serie="serie" @salvar="editar"/>
  </main>

  <p v-else>Carregando...</p>
</template>

<script setup>
    import { ref, onMounted } from "vue";
    import { useRoute } from "vue-router";

    import SerieCard from "../components/SerieCard.vue";
    import SerieFormulario from "../components/SerieFormulario.vue";

    const route = useRoute();

    const serie = ref(null);
    const mostrandoFormulario = ref(false);

    onMounted(async () => {
    try {
        const response = await fetch(
        `http://localhost:3000/series/${route.params.id}`
        );

        if (!response.ok) {
        throw new Error("Erro ao buscar série");
        }

        serie.value = await response.json();
    } catch (error) {
        console.error(error);
    }
    });

    function abrirEdicao() {
        mostrandoFormulario.value = true;
    }

    async function editar(dados) {
        try {
            const response = await fetch(
            `http://localhost:3000/series/${route.params.id}`,
            {
                method: "PUT",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            }
            );

            if (!response.ok) {
            throw new Error("Erro ao atualizar série");
            }

            serie.value = await response.json();

            mostrandoFormulario.value = false;

            alert("Série atualizada com sucesso!");
        } catch (error) {
            console.error(error);
            alert("Erro ao atualizar série");
        }
    }
</script>

<style scoped>
    #cards {
        display: flex;
        justify-content: center;
    }
    main{
        width: 600px;
        margin-top: 10px;
    }
</style>