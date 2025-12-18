<template>
  <div class="trader-detail-page">
    <div v-if="trader">
      <!-- Banner Header -->
      <div class="banner-header">
        <div class="banner-bg" :style="{ backgroundImage: `url(${trader.avatar})` }"></div>
        <div class="container banner-content">
          <div class="avatar-wrapper">
            <img :src="trader.avatar" :alt="trader.name" class="banner-avatar">
            <div class="rank-badge">#{{ trader.rank }}</div>
          </div>
          <h1>{{ trader.name }}</h1>
          <div class="trader-title">{{ trader.strategy }} Strategy Expert</div>
          
          <div class="action-buttons">
            <button class="btn btn-primary" @click="handleCopyTrade">
              Copy Trade
            </button>
            <button class="btn btn-outline" @click="toggleFollow">
              {{ isFollowing ? 'Following' : 'Follow' }}
            </button>
          </div>
        </div>
      </div>

      <div class="container content-grid">
        <!-- Main Content Column -->
        <div class="main-column">
          <div class="section-card glass-panel">
            <h2>About {{ trader.name }}</h2>
            <p class="bio-text">{{ trader.bio }}</p>
          </div>

          <div class="section-card glass-panel">
            <div class="section-header">
              <h3>Performance History</h3>
              <div class="time-filters">
                <button class="filter-btn active">1Y</button>
                <button class="filter-btn">6M</button>
              </div>
            </div>
            <div class="chart-container" ref="chartRef"></div>
          </div>

          <div class="section-card glass-panel">
            <h3>Current Portfolio</h3>
            <div class="table-responsive">
              <table class="holdings-table">
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Size</th>
                    <th>Entry</th>
                    <th>PnL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="pos in trader.positions" :key="pos.symbol">
                    <td><span class="symbol-tag">{{ pos.symbol }}</span></td>
                    <td>
                      <div class="allocation-bar-wrapper">
                        <div class="allocation-bar" :style="{ width: pos.size }"></div>
                      </div>
                    </td>
                    <td>${{ pos.entry.toFixed(2) }}</td>
                    <td :class="getPnlClass(pos.pnl)">{{ pos.pnl }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Sidebar Column -->
        <aside class="sidebar-column">
          <div class="card stats-card">
            <h3>Key Metrics</h3>
            <div class="stat-row">
              <span class="stat-label">Total Profit</span>
              <span class="stat-value text-success">{{ trader.totalProfit }}</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">Win Rate</span>
              <span class="stat-value text-gold">{{ trader.winRate }}</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">AUM</span>
              <span class="stat-value">${{ trader.aum }}</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">Followers</span>
              <span class="stat-value">{{ trader.followers }}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
    
    <div v-else class="container loading-state">
      <p>Loading trader details...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import * as echarts from 'echarts'
import api from '../services/api'

const route = useRoute()
const trader = ref(null)
const chartRef = ref(null)
const isFollowing = ref(false)
let chartInstance = null

const loadTraderData = async () => {
  const id = route.params.id
  try {
    const response = await api.getTrader(id)
    trader.value = response.data
    // Initialize chart after data is loaded and DOM updated
    setTimeout(initChart, 100)
  } catch (error) {
    console.error('Failed to load trader detail:', error)
  }
}

const getPnlClass = (pnl) => {
  // Safe check if pnl is undefined
  if (!pnl) return ''
  if (String(pnl).includes('+')) return 'text-success'
  if (String(pnl).includes('-')) return 'text-danger'
  return ''
}

const toggleFollow = () => {
  isFollowing.value = !isFollowing.value
}

const handleCopyTrade = () => {
  alert(`Copy Trading request sent for ${trader.value.name}! awaiting approval.`)
}

const initChart = () => {
  if (!chartRef.value || !trader.value || !trader.value.performanceData) return
  
  if (chartInstance) {
    chartInstance.dispose()
  }
  
  chartInstance = echarts.init(chartRef.value)
  
  const dates = trader.value.performanceData.map(d => d.date)
  const values = trader.value.performanceData.map(d => d.value)
  
  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dates,
      axisLine: { lineStyle: { color: '#666' } },
      axisLabel: { color: '#aaa' }
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: '#333' } },
      axisLabel: { color: '#aaa' }
    },
    series: [
      {
        name: 'Equity',
        type: 'line',
        smooth: true,
        symbol: 'none',
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(255, 215, 0, 0.3)' },
            { offset: 1, color: 'rgba(255, 215, 0, 0)' }
          ])
        },
        lineStyle: {
          color: '#FFD700',
          width: 3
        },
        data: values
      }
    ]
  }
  
  chartInstance.setOption(option)
}

onMounted(() => {
  loadTraderData()
  window.addEventListener('resize', () => chartInstance?.resize())
})

// Watch for route changes to reload data
watch(() => route.params.id, () => {
  loadTraderData()
})
</script>

<style scoped>
.trader-detail-page {
  min-height: 100vh;
  padding-bottom: 4rem;
  background: var(--bg-deep);
}

/* Banner Header */
.banner-header {
  height: 380px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 4rem;
  background: radial-gradient(circle at center, rgba(17, 34, 64, 0.9) 0%, #020c1b 100%);
  overflow: hidden;
  border-bottom: 1px solid rgba(255,215,0,0.1);
}

.banner-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0.15;
  filter: blur(30px);
  transform: scale(1.1);
}

.banner-content {
  position: relative;
  z-index: 2;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.banner-avatar {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 4px solid var(--accent-gold);
  box-shadow: 0 0 40px rgba(255, 215, 0, 0.25);
  margin-bottom: 1rem;
}

.rank-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: var(--accent-gold);
  color: #020c1b;
  font-weight: 800;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #020c1b;
}

.avatar-wrapper {
  position: relative;
  margin-bottom: 1.5rem;
}

.banner-content h1 {
  font-family: var(--font-display);
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #FFD700 0%, #FFF 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.trader-title {
  font-size: 1.1rem;
  letter-spacing: 2px;
  color: var(--text-secondary);
  text-transform: uppercase;
  margin-bottom: 2rem;
}

.action-buttons {
  display: flex;
  gap: 1.5rem;
}

/* Layout Grid */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 3rem;
}

.glass-panel {
  padding: 2.5rem;
  margin-bottom: 2.5rem;
}

.main-column h2, .main-column h3 {
  color: var(--text-primary);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}

.bio-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-secondary);
}

/* Sidebar Stats */
.sidebar-column {
  position: sticky;
  top: 100px;
}

.stats-card {
  padding: 2rem;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.stat-row:last-child {
  border-bottom: none;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.stat-value {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--text-primary);
}

/* Table Override */
.holdings-table th {
  background: rgba(255, 255, 255, 0.02);
  color: var(--accent-gold);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.time-filters {
  display: flex;
  gap: 0.5rem;
}

.filter-btn {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: var(--text-secondary);
  padding: 0.4rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn.active, .filter-btn:hover {
  background: var(--accent-gold);
  color: #020c1b;
  border-color: var(--accent-gold);
}

.chart-container {
  min-height: 400px;
}

@media (max-width: 900px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .banner-header {
    height: auto;
    padding: 6rem 1rem 4rem;
  }
  
  .sidebar-column {
    position: static;
  }
}
</style>
