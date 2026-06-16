<template>
  <section>
    <h2>Estatísticas</h2>
    <div class="estatisticas">
      <p class="estatistica_card">Total de séries: {{ total }}</p>
      <p class="estatistica_card">Séries assistidas: {{ assistidas }}</p>
    </div>
  </section>
</template>

<script setup>
  defineProps({
    total: Number,
    assistidas: Number
  });
</script>

<style scoped>
  .estatisticas {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin: 30px 0;
  }

  .estatistica_card {
    background: white;
    padding: 20px 30px;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0,0,0,.08);
  }
</style>