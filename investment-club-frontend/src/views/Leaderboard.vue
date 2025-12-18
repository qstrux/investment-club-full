<template>
  <div class="leaderboard-page">
    <div class="container">
      <!-- Page Header -->
      <div class="page-header">
        <h1>🏆 {{ $t('leaderboard.title') }}</h1>
        <p>{{ $t('leaderboard.period') }}</p>
        <p class="notice">{{ $t('leaderboard.notice') }}</p>
      </div>

      <!-- Prize Tiers -->
      <div class="prize-tiers">
        <div class="prize-card">
          <span class="prize-icon">🏆</span>
          <div>
            <div class="prize-label">{{ $t('leaderboard.totalPrize') }}</div>
            <div class="prize-value">$100,000</div>
          </div>
        </div>
        <div class="prize-card">
          <span class="prize-icon">👑</span>
          <div>
            <div class="prize-label">{{ $t('leaderboard.vipTraders') }}</div>
            <div class="prize-value">$50,000</div>
          </div>
        </div>
        <div class="prize-card">
          <span class="prize-icon">💎</span>
          <div>
            <div class="prize-label">{{ $t('leaderboard.totalLikes') }}</div>
            <div class="prize-value">$10,000</div>
          </div>
        </div>
      </div>

      <!-- Filter Tabs -->
      <div class="filter-tabs">
        <button class="tab-btn active">👥 {{ $t('leaderboard.followers') }}</button>
        <button class="tab-btn">💰 {{ $t('leaderboard.totalProfit') }}</button>
        <button class="tab-btn">❤️ {{ $t('leaderboard.likes') }}</button>
      </div>

      <!-- Top 3 Traders (Podium) -->
      <div class="podium">
        <!-- 2nd Place -->
        <div class="podium-card rank-2">
          <div class="rank-badge">2</div>
          <img :src="traders[1].avatar" :alt="traders[1].name" class="podium-avatar">
          <div class="podium-profit">{{ traders[1].monthlyPnL }}</div>
          <h3>{{ traders[1].name }}</h3>
          <p class="podium-title">{{ traders[1].strategy }}</p>
          <div class="podium-stats">
            <div class="stat-col">
              <div class="stat-icon">📊</div>
              <div class="stat-num">{{ traders[1].rank * 100 + 85 }}</div>
              <div class="stat-label">{{ $t('leaderboard.trades') }}</div>
            </div>
            <div class="stat-col">
              <div class="stat-icon">🎯</div>
              <div class="stat-num">{{ traders[1].winRate }}</div>
              <div class="stat-label">{{ $t('leaderboard.winRate') }}</div>
            </div>
          </div>
          <div class="podium-stats">
            <div class="stat-col">
              <div class="stat-icon">👥</div>
              <div class="stat-num">{{ traders[1].followers }}</div>
              <div class="stat-label">{{ $t('leaderboard.followers') }}</div>
            </div>
            <div class="stat-col">
              <div class="stat-icon">❤️</div>
              <div class="stat-num">{{ Math.floor(traders[1].followers * 0.8) }}</div>
              <div class="stat-label">{{ $t('leaderboard.likes') }}</div>
            </div>
          </div>
        </div>

        <!-- 1st Place -->
        <div class="podium-card rank-1">
          <div class="rank-badge gold">1</div>
          <img :src="traders[0].avatar" :alt="traders[0].name" class="podium-avatar">
          <div class="podium-profit gold">{{ traders[0].monthlyPnL }}</div>
          <h3>{{ traders[0].name }}</h3>
          <p class="podium-title">{{ traders[0].strategy }}</p>
          <div class="podium-stats">
            <div class="stat-col">
              <div class="stat-icon">📊</div>
              <div class="stat-num">{{ traders[0].rank * 100 + 485 }}</div>
              <div class="stat-label">{{ $t('leaderboard.trades') }}</div>
            </div>
            <div class="stat-col">
              <div class="stat-icon">🎯</div>
              <div class="stat-num">{{ traders[0].winRate }}</div>
              <div class="stat-label">{{ $t('leaderboard.winRate') }}</div>
            </div>
          </div>
          <div class="podium-stats">
            <div class="stat-col">
              <div class="stat-icon">👥</div>
              <div class="stat-num">{{ traders[0].followers }}</div>
              <div class="stat-label">{{ $t('leaderboard.followers') }}</div>
            </div>
            <div class="stat-col">
              <div class="stat-icon">❤️</div>
              <div class="stat-num">{{ Math.floor(traders[0].followers * 1.2) }}</div>
              <div class="stat-label">{{ $t('leaderboard.likes') }}</div>
            </div>
          </div>
        </div>

        <!-- 3rd Place -->
        <div class="podium-card rank-3">
          <div class="rank-badge">3</div>
          <img :src="traders[2].avatar" :alt="traders[2].name" class="podium-avatar">
          <div class="podium-profit">{{ traders[2].monthlyPnL }}</div>
          <h3>{{ traders[2].name }}</h3>
          <p class="podium-title">{{ traders[2].strategy }}</p>
          <div class="podium-stats">
            <div class="stat-col">
              <div class="stat-icon">📊</div>
              <div class="stat-num">{{ traders[2].rank * 100 + 78 }}</div>
              <div class="stat-label">{{ $t('leaderboard.trades') }}</div>
            </div>
            <div class="stat-col">
              <div class="stat-icon">🎯</div>
              <div class="stat-num">{{ traders[2].winRate }}</div>
              <div class="stat-label">{{ $t('leaderboard.winRate') }}</div>
            </div>
          </div>
          <div class="podium-stats">
            <div class="stat-col">
              <div class="stat-icon">👥</div>
              <div class="stat-num">{{ traders[2].followers }}</div>
              <div class="stat-label">{{ $t('leaderboard.followers') }}</div>
            </div>
            <div class="stat-col">
              <div class="stat-icon">❤️</div>
              <div class="stat-num">{{ Math.floor(traders[2].followers * 0.7) }}</div>
              <div class="stat-label">{{ $t('leaderboard.likes') }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Remaining Traders List -->
      <div class="traders-list">
        <div v-for="(trader, index) in traders.slice(3)" :key="trader.id" class="trader-row">
          <div class="rank-number">{{ index + 4 }}</div>
          <img :src="trader.avatar" :alt="trader.name" class="trader-avatar-small">
          <div class="trader-info">
            <h4>{{ trader.name }}</h4>
            <p>{{ trader.strategy }}</p>
          </div>
          <div class="trader-stats-row">
            <div class="stat-item-row">
              <span class="stat-icon-small">👥</span>
              <span>{{ trader.followers }}</span>
              <span class="stat-label-small">{{ $t('leaderboard.followers') }}</span>
            </div>
            <div class="stat-item-row">
              <span class="stat-icon-small">❤️</span>
              <span>{{ Math.floor(trader.followers * 0.6) }}</span>
              <span class="stat-label-small">{{ $t('leaderboard.likes') }}</span>
            </div>
            <div class="stat-item-row">
              <span class="stat-icon-small">🎯</span>
              <span>{{ trader.winRate }}</span>
              <span class="stat-label-small">{{ $t('leaderboard.winRate') }}</span>
            </div>
            <div class="stat-item-row">
              <span class="stat-icon-small">📊</span>
              <span>{{ (index + 4) * 50 + 200 }}</span>
              <span class="stat-label-small">{{ $t('leaderboard.trades') }}</span>
            </div>
          </div>
          <div class="monthly-profit">
            <div class="profit-label">{{ $t('leaderboard.monthlyProfit') }}</div>
            <div class="profit-value">{{ trader.monthlyPnL }}</div>
          </div>
        </div>
      </div>

      <!-- How to Join Section -->
      <section class="competition-steps-section">
        <h2>{{ $t('leaderboard.howToJoin') }}</h2>
        <div class="steps-grid">
          <div class="step-card">
            <div class="step-number">1</div>
            <div class="step-icon">📝</div>
            <h3>{{ $t('leaderboard.step1') }}</h3>
            <p>{{ $t('leaderboard.step1Desc') }}</p>
          </div>
           <div class="step-arrow">➜</div>
          <div class="step-card">
            <div class="step-number">2</div>
            <div class="step-icon">📈</div>
            <h3>{{ $t('leaderboard.step2') }}</h3>
            <p>{{ $t('leaderboard.step2Desc') }}</p>
          </div>
           <div class="step-arrow">➜</div>
          <div class="step-card">
            <div class="step-number">3</div>
            <div class="step-icon">🏆</div>
            <h3>{{ $t('leaderboard.step3') }}</h3>
            <p>{{ $t('leaderboard.step3Desc') }}</p>
          </div>
        </div>
      </section>

      <!-- Join the Competition / Membership Section -->
      <section class="join-competition-section" id="join-now">
        <div class="section-header text-center">
            <h2>{{ $t('leaderboard.joinCta') }}</h2>
            <p class="subtitle">{{ $t('leaderboard.subtitle') }}</p>
        </div>

        <div class="tiers-grid">
          <!-- Bronze / Entry -->
          <div class="card tier-card">
            <h3 class="tier-name">{{ $t('leaderboard.silver') }}</h3>
            <div class="tier-price">$29<span>/mo</span></div>
            <ul class="tier-features">
              <li><span class="check-icon">✓</span> Basic Market Analysis</li>
              <li><span class="check-icon">✓</span> 5 AI Picks / Month</li>
              <li><span class="check-icon">✓</span> Community Access</li>
            </ul>
            <button class="btn btn-outline btn-block" @click="joinPlan('silver')">{{ $t('leaderboard.start') }}</button>
          </div>

          <!-- Gold / High Value -->
          <div class="card tier-card highlight">
            <div class="ribbon">Best Value</div>
            <h3 class="tier-name">{{ $t('leaderboard.gold') }}</h3>
            <div class="tier-price">$49<span>/mo</span></div>
            <ul class="tier-features">
              <li class="active"><span class="check-icon">✓</span> All Silver Features</li>
              <li class="active"><span class="check-icon">✓</span> Daily AI Picks</li>
              <li class="active"><span class="check-icon">✓</span> Copy Trading (3 Traders)</li>
              <li class="active"><span class="check-icon">✓</span> Live Webinars</li>
            </ul>
            <button class="btn btn-primary btn-block" @click="joinPlan('gold')">{{ $t('leaderboard.joinGold') }}</button>
          </div>

          <!-- Platinum / Exclusive -->
          <div class="card tier-card">
            <h3 class="tier-name">{{ $t('leaderboard.platinum') }}</h3>
            <div class="tier-price">$99<span>/mo</span></div>
            <ul class="tier-features">
              <li><span class="check-icon">✓</span> All Gold Features</li>
              <li><span class="check-icon">✓</span> Unlimited Copy Trading</li>
              <li><span class="check-icon">✓</span> 1-on-1 Mentorship</li>
              <li><span class="check-icon">✓</span> Institutional Reports</li>
            </ul>
            <button class="btn btn-outline btn-block" @click="joinPlan('platinum')">{{ $t('leaderboard.goPlatinum') }}</button>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { mockTraders } from '../services/mockData'

const router = useRouter()
const traders = ref(mockTraders)

const joinPlan = (plan) => {
  router.push({ path: '/login', query: { plan: plan } })
}
</script>

<style scoped>
.leaderboard-page {
  padding: 2rem 0 6rem;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
}

.notice {
  color: var(--accent-gold) !important;
  font-size: 0.9rem;
}

.prize-tiers {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.prize-card {
  background: linear-gradient(135deg, var(--card-background), var(--background-light));
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.prize-icon {
  font-size: 2.5rem;
}

.prize-label {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.prize-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent-gold);
}

.filter-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  justify-content: center;
}

.tab-btn {
  background: var(--card-background);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 0.75rem 2rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-normal);
  font-weight: 600;
}

.tab-btn.active {
  background: var(--accent-gold);
  color: var(--primary-dark-blue);
  border-color: var(--accent-gold);
}

.tab-btn:hover {
  transform: translateY(-2px);
}

.podium {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
  align-items: end;
}

.podium-card {
  background: var(--card-background);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 2rem;
  text-align: center;
  position: relative;
  transition: transform var(--transition-normal);
}

.podium-card:hover {
  transform: translateY(-8px);
}

.rank-1 {
  border-color: var(--accent-gold);
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
  order: 2;
}

.rank-2 {
  order: 1;
  margin-top: 2rem;
}

.rank-3 {
  order: 3;
  margin-top: 2rem;
}

.rank-badge {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  background: var(--background-light);
  border: 3px solid var(--border-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.rank-badge.gold {
  background: var(--accent-gold);
  border-color: var(--accent-gold);
  color: var(--primary-dark-blue);
  font-size: 2rem;
}

.podium-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid var(--accent-gold);
  margin: 1rem auto;
}

.podium-profit {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--success-green);
  margin: 1rem 0;
}

.podium-profit.gold {
  font-size: 2.25rem;
}

.podium-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}

.podium-title {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}

.podium-stats {
  display: flex;
  justify-content: space-around;
  margin: 1rem 0;
  padding: 1rem 0;
  border-top: 1px solid var(--border-color);
}

.stat-col {
  text-align: center;
}

.stat-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.stat-num {
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--text-primary);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
}

.traders-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.trader-row {
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all var(--transition-normal);
}

.trader-row:hover {
  transform: translateX(8px);
  border-color: var(--accent-gold);
}

.rank-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent-gold);
  min-width: 60px;
  text-align: center;
}

.trader-avatar-small {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid var(--accent-gold);
}

.trader-info {
  flex: 1;
}

.trader-info h4 {
  margin: 0 0 0.25rem 0;
  font-size: 1.125rem;
}

.trader-info p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.trader-stats-row {
  display: flex;
  gap: 2rem;
}

.stat-item-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stat-icon-small {
  font-size: 1.125rem;
}

.stat-label-small {
  color: var(--text-secondary);
  font-size: 0.75rem;
}

.monthly-profit {
  text-align: right;
  min-width: 150px;
}

.profit-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
}

.profit-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--success-green);
}

/* Steps Section */
.competition-steps-section {
  margin-top: 4rem;
  text-align: center;
}

.competition-steps-section h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
}

.steps-grid {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
}

.step-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: var(--radius-lg);
    padding: 2rem;
    width: 280px;
    position: relative;
    transition: transform 0.3s;
}

.step-card:hover {
    transform: translateY(-5px);
    border-color: var(--accent-gold);
}

.step-number {
    position: absolute;
    top: -10px;
    left: -10px;
    width: 30px;
    height: 30px;
    background: var(--accent-gold);
    color: #000;
    border-radius: 50%;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
}

.step-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.step-arrow {
    font-size: 1.5rem;
    color: var(--accent-gold);
}

/* Membership Tiers Styles */
.join-competition-section {
    margin-top: 3rem;
    padding-top: 4rem;
    border-top: 1px solid rgba(255,255,255,0.05);
}

.section-header {
    margin-bottom: 3rem;
}

.subtitle {
    font-size: 1.1rem;
    color: var(--text-secondary);
}

.tiers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.tier-card {
  text-align: center;
  padding: 3rem 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--glass-bg);
  backdrop-filter: var(--backdrop-blur);
  -webkit-backdrop-filter: var(--backdrop-blur);
  border: var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--glass-shadow);
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.tier-card:hover {
  transform: translateY(-10px);
  border-color: rgba(255, 215, 0, 0.3);
}

.tier-card.highlight {
  border: 1px solid var(--accent-gold);
  box-shadow: 0 0 40px rgba(255, 215, 0, 0.15);
  transform: scale(1.05);
  z-index: 2;
  background: rgba(17, 34, 64, 0.85);
}

.tier-card.highlight:hover {
  transform: scale(1.05) translateY(-5px);
}

.ribbon {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--accent-gold);
  color: #020c1b;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-weight: 800;
  font-size: 0.85rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
}

.tier-name {
  font-family: var(--font-display);
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.tier-card.highlight .tier-name {
  color: var(--accent-gold);
}

.tier-price {
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 2.5rem;
  display: flex;
  align-items: baseline;
  justify-content: center;
}

.tier-price span {
  font-size: 1rem;
  color: var(--text-secondary);
  font-weight: 400;
  margin-left: 5px;
}

.tier-features {
  list-style: none;
  padding: 0;
  margin-bottom: 3rem;
  text-align: left;
  flex-grow: 1;
}

.tier-features li {
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
  color: var(--text-secondary);
  font-size: 1rem;
}

.tier-features li.active, .tier-card.highlight .tier-features li {
  color: var(--text-primary);
}

.check-icon {
  margin-right: 1rem;
  color: var(--accent-gold);
  font-weight: bold;
  font-size: 1.1rem;
}

.btn-block {
  width: 100%;
}

@media (max-width: 900px) {
  .pricing-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .tier-card.highlight {
    transform: none;
  }
  
  .tier-card.highlight:hover {
    transform: translateY(-5px);
  }
}

@media (max-width: 768px) {
  .podium {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .rank-1, .rank-2, .rank-3 {
    order: initial;
    margin-top: 0;
  }
  
  .prize-tiers {
    grid-template-columns: 1fr;
  }
  
  .trader-row {
    flex-wrap: wrap;
  }
  
  .trader-stats-row {
    width: 100%;
    justify-content: space-between;
  }
  
  .steps-grid {
      flex-direction: column;
  }
  .step-arrow {
      transform: rotate(90deg);
      margin: 0.5rem 0;
  }
}
</style>
