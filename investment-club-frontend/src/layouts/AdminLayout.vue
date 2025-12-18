<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <div class="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <nav class="sidebar-nav">
        <router-link to="/admin" class="nav-item" active-class="active" exact>
          📊 Dashboard
        </router-link>
        <router-link to="/admin/content" class="nav-item" active-class="active">
          📝 Manage Content
        </router-link>
        <a href="#" @click.prevent="logout" class="nav-item logout">
          🚪 Logout
        </a>
      </nav>
    </aside>
    
    <main class="admin-content">
      <header class="admin-header">
        <div class="user-info">
          <span>Welcome, {{ user?.username || 'Admin' }}</span>
        </div>
      </header>
      <div class="content-wrapper">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()
const user = ref(null)

onMounted(() => {
  const userStr = localStorage.getItem('user')
  if (userStr) {
    user.value = JSON.parse(userStr)
  }
})

const logout = () => {
  api.logout()
  router.push('/login')
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f0f2f5; 
  color: #333;
}

.admin-sidebar {
  width: 260px;
  background: var(--bg-deep);
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 4px 0 20px rgba(0,0,0,0.2);
  z-index: 10;
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0,0,0,0.2);
}

.sidebar-header h2 {
  color: var(--accent-gold);
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.sidebar-nav {
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-item {
  padding: 1rem 1.5rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.95rem;
  border-left: 3px solid transparent;
}

.nav-item:hover, .nav-item.active {
  background: linear-gradient(90deg, rgba(255, 215, 0, 0.1) 0%, transparent 100%);
  color: var(--accent-gold);
  border-left-color: var(--accent-gold);
}

.nav-item.logout {
  margin-top: auto;
  color: var(--danger);
  border-left-color: transparent;
}

.nav-item.logout:hover {
  background: rgba(255, 85, 85, 0.1);
}

.admin-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f4f6f8; /* Keep light mode for admin readability */
}

.admin-header {
  background: white;
  padding: 1rem 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid #e0e0e0;
}

.user-info {
  font-weight: 600;
  color: #2c3e50;
}

.content-wrapper {
  padding: 2rem;
  overflow-y: auto;
}
</style>
