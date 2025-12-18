<template>
  <div id="app">
    <Header />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<style>
@import './assets/main.css';

.main-content {
  min-height: calc(100vh - 200px);
  padding: 2rem 0;
}
</style>
