<template>
  <div class="trade-card">
    <div class="trade-header">
      <div class="trade-symbol-section">
        <span class="country-badge">{{ trade.country }}</span>
        <h3 class="symbol">{{ trade.symbol }}</h3>
        <span :class="['status-badge', trade.status.toLowerCase()]">{{ trade.status }}</span>
      </div>
    </div>

    <!-- K-Line Chart -->
    <div class="chart-container">
      <img :src="trade.chartData" :alt="`${trade.symbol} chart`" class="chart-image">
    </div>

    <!-- Trade Details Grid -->
    <div class="trade-details">
      <div class="detail-row">
        <span class="detail-label">Entry Date</span>
        <span class="detail-value">{{ trade.entryDate }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Entry Price</span>
        <span class="detail-value">{{ trade.entryPrice }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Current Price</span>
        <span class="detail-value">{{ trade.currentPrice }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Quantity</span>
        <span class="detail-value">{{ trade.quantity.toLocaleString() }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Entry Amount</span>
        <span class="detail-value">{{ trade.entryAmount }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Market Value</span>
        <span class="detail-value">{{ trade.marketValue }}</span>
      </div>
      <div class="detail-row highlight">
        <span class="detail-label">P&L Ratio</span>
        <span :class="['detail-value', getPLClass(trade.plRatio)]">{{ trade.plRatio }}</span>
      </div>
      <div class="detail-row highlight">
        <span class="detail-label">P&L Amount</span>
        <span :class="['detail-value', getPLClass(trade.plAmount)]">{{ trade.plAmount }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  trade: {
    type: Object,
    required: true
  }
})

const getPLClass = (value) => {
  return value.startsWith('+') ? 'profit' : 'loss'
}
</script>

<style scoped>
.trade-card {
  background: var(--card-background);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  transition: all var(--transition-normal);
}

.trade-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent-gold);
  box-shadow: 0 8px 24px rgba(255, 215, 0, 0.15);
}

.trade-header {
  margin-bottom: 1rem;
}

.trade-symbol-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.country-badge {
  background: var(--background-light);
  color: var(--accent-gold);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 700;
  border: 1px solid var(--accent-gold);
}

.symbol {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--accent-gold);
  margin: 0;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
}

.status-badge.active {
  background: rgba(0, 230, 118, 0.2);
  color: var(--success-green);
  border: 1px solid var(--success-green);
}

.status-badge.closed {
  background: rgba(255, 215, 0, 0.2);
  color: var(--accent-gold);
  border: 1px solid var(--accent-gold);
}

.chart-container {
  margin: 1.5rem 0;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--background-dark);
  border: 1px solid var(--border-color);
}

.chart-image {
  width: 100%;
  height: auto;
  display: block;
}

.trade-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  background: var(--background-light);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
}

.detail-row.highlight {
  background: linear-gradient(135deg, var(--background-light), var(--card-background));
  border-color: var(--accent-gold);
}

.detail-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.detail-value {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--text-primary);
}

.detail-value.profit {
  color: var(--success-green);
}

.detail-value.loss {
  color: #ff1744;
}

@media (max-width: 768px) {
  .trade-details {
    grid-template-columns: 1fr;
  }
  
  .trade-symbol-section {
    flex-wrap: wrap;
  }
}
</style>
