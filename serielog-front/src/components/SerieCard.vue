<template>
  <div class="card">
    <h2>{{ serie.titulo }}</h2>
    <p>{{ serie.genero }}</p>
    <span class="nota">⭐ {{ serie.nota }}</span>
    <p>{{ serie.ano }}</p>
    <p>{{ serie.assistida ? "Assistida" : "Não assistida" }}</p>
    <button id="btn-acao" @click="emit('acao', serie.id)">{{ textoBotao }}</button>
    </div>
</template>

<script setup>
defineProps({
    serie:{
        type: Object,
        required: true
    },
    textoBotao: {
      type: String,
      default: "Remover"
    }
});
const emit = defineEmits(["acao"]);
</script>

<style scoped>
  .card {
    width: 80%;
    background: #fff;
    border-radius: 18px;
    padding: 1.5rem;
    min-height: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-shadow:
      0 8px 20px rgba(0, 0, 0, 0.08),
      0 2px 4px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }

  .card:hover {
    transform: translateY(-8px);
    box-shadow:
      0 15px 30px rgba(0, 0, 0, 0.12),
      0 5px 10px rgba(0, 0, 0, 0.08);
  }

  .card h2 {
    margin: 0;
    text-align: center;
    color: #1f344b;
    font-size: 1.8rem;
  }

  .card p {
    margin: 0.4rem 0;
    color: #4b5563;
  }

  .nota {
    background: #fef3c7;
    color: #b45309;
    padding: 8px 14px;
    border-radius: 999px;
    font-weight: 700;
  }

  .card button {
    width: 100%;
    padding: 12px;

    border: none;
    border-radius: 10px;

    background: #42b883;
    color: white;

    font-size: 1rem;
    font-weight: 600;

    cursor: pointer;
    transition: 0.3s;
  }

  .card button:hover {
    background: #36996b;
  }
</style>