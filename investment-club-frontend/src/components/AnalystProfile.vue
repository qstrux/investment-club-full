<template>
  <div class="analyst-profile" v-if="analyst">
    <div class="profile-header">
      <img :src="analyst.avatar" :alt="analyst.name" class="analyst-avatar">
      <div class="analyst-info">
        <h1 class="analyst-name">{{ analyst.name }}</h1>
        <p class="analyst-title">{{ analyst.title }}</p>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">{{ analyst.yearsOfExperience }}</div>
        <div class="stat-label">Years of Experience</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ analyst.totalTrades }}</div>
        <div class="stat-label">Total Trades</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ analyst.winRate }}</div>
        <div class="stat-label">Win Rate</div>
      </div>
    </div>

    <div class="pnl-cards">
      <div class="pnl-card">
        <div class="pnl-icon">📁</div>
        <div>
          <div class="pnl-label">Active Positions</div>
          <div class="pnl-value">{{ analyst.activePositions }}</div>
        </div>
      </div>
      <div class="pnl-card">
        <div class="pnl-icon">💰</div>
        <div>
          <div class="pnl-label">Monthly P&L</div>
          <div class="pnl-value success">{{ analyst.monthlyPnL }}</div>
        </div>
      </div>
      <div class="pnl-card">
        <div class="pnl-icon">📈</div>
        <div>
          <div class="pnl-label">Total P&L</div>
          <div class="pnl-value success">{{ analyst.totalPnL }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  analyst: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.analyst-profile {
  background: rgba(10, 25, 47, 0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: var(--radius-lg);
  padding: 3rem;
  margin-bottom: 3rem;
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5);
  position: relative;
  overflow: hidden;
}

.analyst-profile::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, transparent, #FFD700, transparent);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid var(--border-color);
}

.analyst-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid var(--accent-gold);
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
}

.analyst-name {
  font-size: 2.5rem;
  color: var(--accent-gold);
  margin: 0 0 0.5rem 0;
  font-weight: 700;
}

.analyst-title {
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: var(--background-light);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent-gold);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.pnl-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.pnl-card {
  background: var(--background-light);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.pnl-icon {
  font-size: 2rem;
}

.pnl-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.pnl-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.pnl-value.success {
  color: var(--success-green);
}

@media (max-width: 768px) {
  .stats-grid,
  .pnl-cards {
    grid-template-columns: 1fr;
  }
  
  .profile-header {
    flex-direction: column;
    text-align: center;
  }
}
</style>
