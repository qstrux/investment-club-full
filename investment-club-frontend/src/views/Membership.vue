<template>
  <div class="membership-page">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="container">
        <div v-if="!authenticated" class="hero-public">
          <h1>🏆 {{ $t('membership.heroTitle') }}</h1>
          <p>{{ $t('membership.heroSubtitle') }}</p>
        </div>
        <div v-else class="hero-personalized">
          <div class="welcome-badge">
            <div class="crown-icon">👑</div>
            <div class="welcome-text">
              <h1>{{ $t('membership.welcome') }} <span class="highlight">{{ userInfo.name }}</span></h1>
              <p class="subtitle">{{ $t('membership.sanctuary') }}</p>
            </div>
          </div>
          
          <div class="user-stats">
            <div class="stat-card">
              <div class="stat-label">{{ $t('membership.level') }}</div>
              <div class="stat-value tier-name">{{ userInfo.tier }}</div>
              <div class="tier-stars">{{ getTierStars(userInfo.tier) }}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">{{ $t('membership.totalAUM') }}</div>
              <div class="stat-value">${{ formatNumber(userInfo.totalAUM) }}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">{{ $t('membership.points') }}</div>
              <div class="stat-value points">{{ formatNumber(userInfo.points) }}</div>
            </div>
          </div>

          <!-- Progress to Next Tier -->
          <div v-if="userInfo.progress && !userInfo.progress.isMaxTier" class="progress-section">
            <div class="progress-header">
              <span>{{ $t('membership.next') }} <strong>{{ userInfo.progress.nextTier }}</strong></span>
              <span class="progress-amount">${{ formatNumber(userInfo.progress.remaining) }} {{ $t('membership.needed') }}</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: userInfo.progress.progressPercentage + '%' }"></div>
            </div>
            <div class="progress-percentage">{{ Math.round(userInfo.progress.progressPercentage) }}%</div>
          </div>
          <div v-else-if="userInfo.progress && userInfo.progress.isMaxTier" class="max-tier-message">
            🎉 {{ $t('membership.congrats') }}
          </div>
        </div>
      </div>
    </div>

    <!-- Demo Login Button (for testing) -->
    <div v-if="!authenticated" class="demo-login-section">
      <div class="container">
        <button class="btn btn-secondary" @click="handleDemoLogin">
          🎮 {{ $t('membership.demo') }}
        </button>
        <p class="demo-note">{{ $t('membership.demoNote') }}</p>
      </div>
    </div>

    <!-- Logout Button (for logged-in users) -->
    <div v-else class="logout-section">
      <div class="container">
        <button class="btn btn-secondary" @click="handleLogout">
          👋 {{ $t('membership.logout') }}
        </button>
      </div>
    </div>

    <!-- Membership Tiers -->
    <section class="tiers-section">
      <div class="container">
        <h2>{{ $t('membership.tiers') }}</h2>
        <div class="tiers-grid">
          <!-- Silver / Entry -->
          <div class="card tier-card">
            <h3 class="tier-name">{{ $t('membership.bronze') }}</h3>
            <div class="tier-price">{{ $t('membership.bronzePrice') }}<span>{{ $t('membership.month') }}</span></div>
            <ul class="tier-features">
              <li><span class="check-icon">✓</span> {{ $t('membership.features.basic') }}</li>
              <li><span class="check-icon">✓</span> {{ $t('membership.features.ai5') }}</li>
              <li><span class="check-icon">✓</span> {{ $t('membership.features.community') }}</li>
            </ul>
            <button class="btn btn-outline btn-block">{{ $t('membership.getStarted') }}</button>
          </div>

          <!-- Gold / High Value -->
          <div class="card tier-card highlight">
            <div class="ribbon">{{ $t('membership.bestValue') }}</div>
            <h3 class="tier-name">{{ $t('membership.gold') }}</h3>
            <div class="tier-price">{{ $t('membership.goldPrice') }}<span>{{ $t('membership.month') }}</span></div>
            <ul class="tier-features">
              <li class="active"><span class="check-icon">✓</span> {{ $t('membership.features.allSilver') }}</li>
              <li class="active"><span class="check-icon">✓</span> {{ $t('membership.features.daily') }}</li>
              <li class="active"><span class="check-icon">✓</span> {{ $t('membership.features.copy3') }}</li>
              <li class="active"><span class="check-icon">✓</span> {{ $t('membership.features.webinars') }}</li>
            </ul>
            <button class="btn btn-primary btn-block">{{ $t('membership.joinGold') }}</button>
          </div>

          <!-- Platinum / Exclusive -->
          <div class="card tier-card">
            <h3 class="tier-name">{{ $t('membership.platinum') }}</h3>
            <div class="tier-price">{{ $t('membership.platinumPrice') }}<span>{{ $t('membership.month') }}</span></div>
            <ul class="tier-features">
              <li><span class="check-icon">✓</span> {{ $t('membership.features.allGold') }}</li>
              <li><span class="check-icon">✓</span> {{ $t('membership.features.unlimited') }}</li>
              <li><span class="check-icon">✓</span> {{ $t('membership.features.mentorship') }}</li>
              <li><span class="check-icon">✓</span> {{ $t('membership.features.reports') }}</li>
            </ul>
            <button class="btn btn-outline btn-block">{{ $t('membership.goPlatinum') }}</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Trading Mastery Challenge (Only for Logged-in Users) -->
    <section v-if="authenticated" class="quiz-section">
      <div class="container">
        <TradingQuiz />
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container text-center">
        <h2 v-if="!authenticated">{{ $t('membership.ready') }}</h2>
        <h2 v-else>{{ $t('membership.readyUpgrade') }}</h2>
        <p v-if="!authenticated">{{ $t('membership.joinDesc') }}</p>
        <p v-else>{{ $t('membership.upgradeDesc') }}</p>
        <button v-if="!authenticated" class="btn btn-primary btn-lg">
          {{ $t('membership.signUp') }}
        </button>
        <button v-else class="btn btn-primary btn-lg">
          {{ $t('membership.upgrade') }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { mockMembershipLevels } from '../services/mockData'
import TradingQuiz from '../components/TradingQuiz.vue'
import { authenticated, userTierInfo, quickDemoLogin, logout } from '../services/authService'

const membershipTiers = ref(mockMembershipLevels)

const userInfo = computed(() => userTierInfo.value || {})

const tierOrder = ['Entry Level Tier', 'Intermediate Tier', 'Advanced Tier', 'Elite Tier', 'Core Tier']

const getTierIcon = (index) => {
  const icons = ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐']
  return icons[index] || '⭐'
}

const getTierStars = (tierName) => {
  const index = tierOrder.indexOf(tierName)
  return getTierIcon(index)
}

const formatNumber = (num) => {
  if (num === undefined || num === null) return '0'
  return num.toLocaleString('en-US')
}

const handleDemoLogin = () => {
  const result = quickDemoLogin()
  if (result.success) {
    console.log('Demo login successful')
  }
}

const handleLogout = () => {
  logout()
}
</script>

<style scoped>
.membership-page {
  padding-top: 4rem;
  padding-bottom: 6rem;
}

.hero-section {
  text-align: center;
  margin-bottom: 5rem;
}

.hero-public h1 {
  font-family: var(--font-display);
  font-size: 3.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #FFD700 0%, #FFF 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-public p {
  font-size: 1.25rem;
  color: var(--text-secondary);
}

.hero-personalized .welcome-badge {
  margin-bottom: 2rem;
}

.welcome-text h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.user-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: var(--radius-md);
  min-width: 150px;
  border: 1px solid var(--border-color);
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-primary);
}

.stat-value.points {
  color: var(--accent-gold);
}

.progress-section {
  max-width: 600px;
  margin: 0 auto;
}

.progress-bar {
  height: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  margin: 1rem 0;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--accent-gold);
  border-radius: 5px;
}

.demo-login-section, .logout-section {
  text-align: center;
  margin-bottom: 3rem;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
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
  text-transform: uppercase;
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

.tier-features li.active {
  color: var(--text-primary);
}

.check-icon {
  margin-right: 1rem;
  color: var(--accent-gold);
}

.btn-block {
  width: 100%;
}

.cta-section {
  margin-top: 5rem;
}

@media (max-width: 900px) {
  .hero-section {
    padding: 0 1rem;
  }
}
</style>
