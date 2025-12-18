<template>
  <div class="traders-page">
    <div class="container">
      <div class="page-header">
        <h1>{{ $t('traders.title') }}</h1>
        <p>{{ $t('traders.subtitle') }}</p>
        
        <div class="search-section">
          <input 
            v-model="searchQuery" 
            :placeholder="$t('traders.searchPlaceholder')" 
            class="search-input"
          >
          <select v-model="selectedStrategy" class="strategy-select">
            <option value="All">{{ $t('traders.allStrategies') }}</option>
            <option value="Aggressive Growth">{{ $t('traders.aggressive') }}</option>
            <option value="Swing Trading">{{ $t('traders.swing') }}</option>
            <option value="Day Trading">{{ $t('traders.day') }}</option>
            <option value="Conservative Income">{{ $t('traders.conservative') }}</option>
          </select>
        </div>
      </div>

      <div class="grid grid-3">
        <div v-for="trader in traders" :key="trader.id" class="card trader-card">
          <img :src="trader.avatar" :alt="trader.name" class="trader-avatar">
          <h3>{{ trader.name }}</h3>
          <p class="trader-strategy">{{ trader.strategy }}</p>
          
          <div class="trader-metrics">
            <div class="metric">
              <span class="metric-label">{{ $t('traders.totalProfit') }}</span>
              <span class="metric-value text-success">{{ trader.totalProfit }}</span>
            </div>
            <div class="metric">
              <span class="metric-label">{{ $t('traders.winRate') }}</span>
              <span class="metric-value">{{ trader.winRate }}</span>
            </div>
            <div class="metric">
              <span class="metric-label">{{ $t('traders.aum') }}</span>
              <span class="metric-value">${{ trader.aum }}</span>
            </div>
          </div>
          
          <router-link :to="`/traders/${trader.id}`" class="btn btn-primary btn-block">
            {{ $t('traders.viewProfile') }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { mockTraders } from '../services/mockData'
import api from '../services/api'

const traders = ref([])

onMounted(async () => {
  try {
    const response = await api.getTraders()
    traders.value = response.data
  } catch (error) {
    console.warn('API unavailable, using mock data')
    traders.value = mockTraders
  }
})

const searchQuery = ref('')
const selectedStrategy = ref('All')

const filteredTraders = computed(() => {
  return traders.value.filter(trader => {
    const matchesSearch = trader.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStrategy = selectedStrategy.value === 'All' || trader.strategy === selectedStrategy.value
    return matchesSearch && matchesStrategy
  })
})
</script>

<style scoped>
.page-header {
  text-align: center;
  margin-bottom: 4rem;
}

.page-header h1 {
  font-family: var(--font-display);
  font-size: 3.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #FFD700 0%, #FFF 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.search-section {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.search-input, .strategy-select {
  padding: 1rem 1.5rem;
  border-radius: 50px;
  background: rgba(10, 25, 47, 0.6) !important;
  border: 1px solid rgba(255, 215, 0, 0.2) !important;
  color: var(--text-primary) !important;
  min-width: 250px;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

.search-input:focus, .strategy-select:focus {
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.15);
  border-color: var(--accent-gold) !important;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2.5rem;
}

.trader-card {
  text-align: center;
  padding: 2.5rem 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.trader-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 0%, rgba(255, 215, 0, 0.05), transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.trader-card:hover::before {
  opacity: 1;
}

.trader-avatar {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  border: 3px solid var(--accent-gold);
  box-shadow: 0 0 25px rgba(255, 215, 0, 0.15);
  transition: transform 0.3s ease;
}

.trader-card:hover .trader-avatar {
  transform: scale(1.05);
  box-shadow: 0 0 35px rgba(255, 215, 0, 0.3);
}

.trader-card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.trader-strategy {
  color: var(--text-secondary);
  margin-bottom: 2rem;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.trader-metrics {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 0 2rem;
  background: rgba(0,0,0,0.2);
  padding: 1.5rem;
  border-radius: var(--radius-md);
}

.metric {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.metric:last-child {
  border-bottom: none;
}

.metric-label {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.metric-value {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--text-primary);
}

.text-success { color: #64ffda; text-shadow: 0 0 10px rgba(100, 255, 218, 0.3); }

.btn-block {
  width: 100%;
  margin-top: auto;
}
</style>
