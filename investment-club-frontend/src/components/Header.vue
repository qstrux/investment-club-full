<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <router-link to="/" class="logo">
          <h2>US Elite Investment Club</h2>
        </router-link>
        
        <nav class="nav-menu">
          <router-link to="/" class="nav-link">{{ $t('nav.home') }}</router-link>
          <router-link to="/trading-records" class="nav-link">{{ $t('nav.tradingRecords') }}</router-link>
          <router-link to="/traders" class="nav-link">{{ $t('nav.traders') }}</router-link>
          <router-link to="/videos" class="nav-link">{{ $t('nav.videos') }}</router-link>
          <router-link to="/strategies" class="nav-link">{{ $t('nav.strategies') }}</router-link>
          <router-link v-if="isLoggedIn" to="/diagnosis" class="nav-link">{{ $t('nav.diagnosis') }}</router-link>
          <router-link to="/ai-picks" class="nav-link">{{ $t('nav.aiPicks') }}</router-link>
          <router-link to="/leaderboard" class="nav-link">{{ $t('nav.leaderboard') }}</router-link>
          
          <template v-if="!isLoggedIn">
            <router-link to="/login" class="nav-link">{{ $t('nav.login') }}</router-link>
            <router-link to="/leaderboard" class="nav-link btn-primary">{{ $t('nav.joinNow') }}</router-link>
          </template>
          
          <template v-else>
            <a href="#" @click.prevent="logout" class="nav-link">{{ $t('nav.logout') }}</a> 
          </template>

          <button class="lang-btn" @click="toggleLanguage">
            {{ locale === 'zh' ? 'EN' : '中文' }}
          </button>
        </nav>
        
        <div class="mobile-controls">
           <button class="lang-btn mobile" @click="toggleLanguage">
            {{ locale === 'zh' ? 'EN' : '中' }}
          </button>
          <button class="mobile-menu-btn" @click="toggleMobileMenu">
            ☰
          </button>
        </div>
      </div>
    </div>
    
    <div v-if="mobileMenuOpen" class="mobile-menu">
      <router-link to="/" class="mobile-nav-link" @click="closeMobileMenu">{{ $t('nav.home') }}</router-link>
      <router-link to="/trading-records" class="mobile-nav-link" @click="closeMobileMenu">{{ $t('nav.tradingRecords') }}</router-link>
      <router-link to="/traders" class="mobile-nav-link" @click="closeMobileMenu">{{ $t('nav.traders') }}</router-link>
      <router-link to="/videos" class="mobile-nav-link" @click="closeMobileMenu">{{ $t('nav.videos') }}</router-link>
      <router-link to="/strategies" class="mobile-nav-link" @click="closeMobileMenu">{{ $t('nav.strategies') }}</router-link>
      <router-link v-if="isLoggedIn" to="/diagnosis" class="mobile-nav-link" @click="closeMobileMenu">{{ $t('nav.diagnosis') }}</router-link>
      <router-link to="/ai-picks" class="mobile-nav-link" @click="closeMobileMenu">{{ $t('nav.aiPicks') }}</router-link>
      <router-link to="/leaderboard" class="mobile-nav-link" @click="closeMobileMenu">{{ $t('nav.leaderboard') }}</router-link>
      <template v-if="!isLoggedIn">
        <router-link to="/login" class="mobile-nav-link" @click="closeMobileMenu">{{ $t('nav.login') }}</router-link>
        <router-link to="/leaderboard" class="mobile-nav-link" @click="closeMobileMenu">{{ $t('nav.joinNow') }}</router-link>
      </template>
      <template v-else>
        <a href="#" @click.prevent="logout" class="mobile-nav-link">{{ $t('nav.logout') }}</a>
      </template>
    </div>
  </header>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const route = useRoute()
const { locale } = useI18n()
const mobileMenuOpen = ref(false)
const isLoggedIn = ref(false)

const checkLoginStatus = () => {
  isLoggedIn.value = !!localStorage.getItem('token')
}

onMounted(() => {
  checkLoginStatus()
})

watch(
  () => route.path,
  () => {
    checkLoginStatus()
    mobileMenuOpen.value = false
  }
)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  isLoggedIn.value = false
  mobileMenuOpen.value = false
  router.push('/login')
}

const toggleLanguage = () => {
  locale.value = locale.value === 'zh' ? 'en' : 'zh'
}
</script>

<style scoped>
.header {
  background-color: rgba(2, 12, 27, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  height: var(--header-height);
  display: flex;
  align-items: center;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.logo h2 {
  color: var(--accent-gold);
  margin: 0;
  font-size: 1.25rem;
  letter-spacing: 0.5px;
  font-weight: 700;
  text-transform: uppercase;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.3));
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  color: var(--text-secondary);
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
  font-size: 0.9rem;
  position: relative;
  white-space: nowrap;
}

.nav-link:hover,
.nav-link.router-link-active:not(.btn-primary) {
  color: var(--accent-gold);
  background: rgba(255, 255, 255, 0.05);
}

.nav-link:not(.btn-primary)::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: var(--accent-gold);
  transition: width 0.3s ease;
  box-shadow: 0 0 10px var(--accent-gold);
}

.nav-link:hover::after,
.nav-link.router-link-active:not(.btn-primary)::after {
  width: 80%;
}

.nav-link.btn-primary {
  padding: 0.5rem 1.25rem;
  color: var(--bg-deep) !important;
  background: var(--accent-gold);
}

.nav-link.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4);
}

.lang-btn {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.2);
  color: var(--text-secondary);
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.lang-btn:hover {
  border-color: var(--accent-gold);
  color: var(--accent-gold);
}

.mobile-controls {
  display: none;
  align-items: center;
  gap: 1rem;
}

.mobile-menu-btn {
  background: none;
  border: none;
  color: var(--accent-gold);
  font-size: 1.5rem;
  cursor: pointer;
}

.mobile-menu {
  display: none;
  position: absolute;
  top: var(--header-height);
  left: 0;
  right: 0;
  background: var(--bg-deep);
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding: 1rem;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-nav-link {
  color: var(--text-primary);
  padding: 0.75rem;
  border-radius: var(--radius-md);
  transition: background-color 0.2s;
}

.mobile-nav-link:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--accent-gold);
}

@media (max-width: 1100px) {
  .nav-menu {
    display: none;
  }
  
  .mobile-controls {
    display: flex;
  }
  
  .mobile-menu-btn {
    display: block;
  }
  
  .mobile-menu {
    display: flex;
  }
}
</style>
