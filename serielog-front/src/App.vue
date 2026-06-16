<template>
  <nav>
    <RouterLink to="/">Início</RouterLink>
    <RouterLink to="/series/nova">Nova Série</RouterLink>
  </nav>

  <RouterView />
</template>

<script setup>
</script>
<style scoped>
  nav{
    display: flex;
    gap: 10px;
  }
</style>