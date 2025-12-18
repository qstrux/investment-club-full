<template>
  <div class="admin-dashboard">
    <h1>Dashboard Overview</h1>
    
    <div class="stats-grid">
      <div class="stat-card">
        <h3>Total Users</h3>
        <div class="value">{{ stats.users }}</div>
      </div>
      <div class="stat-card">
        <h3>Videos</h3>
        <div class="value">{{ stats.videos }}</div>
      </div>
      <div class="stat-card">
        <h3>Strategies</h3>
        <div class="value">{{ stats.strategies }}</div>
      </div>
      <div class="stat-card">
        <h3>Active Traders</h3>
        <div class="value">{{ stats.traders }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../../services/api'

const stats = ref({
  users: 75, // Mock number for now since we don't have full user DB access in api yet
  videos: 0,
  strategies: 0,
  traders: 0
})

onMounted(async () => {
  try {
    const [videos, strategies, traders] = await Promise.all([
      api.getVideos(),
      api.getStrategies(),
      api.getTraders()
    ])
    
    stats.value.videos = videos.data.length
    stats.value.strategies = strategies.data.length
    stats.value.traders = traders.data.length
  } catch (error) {
    console.error('Failed to load admin stats', error)
  }
})
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.stat-card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-card .value {
  font-size: 2rem;
  font-weight: 700;
  color: #0a1929;
}
</style>
