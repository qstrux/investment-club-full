<template>
  <div class="auth-page">
    <div class="auth-card">
      <h2 class="text-gradient-gold">{{ isLogin ? $t('auth.loginTitle') : $t('auth.registerTitle') }}</h2>
      
      <form @submit.prevent="handleSubmit">
        <div v-if="!isLogin" class="form-group">
          <label>{{ $t('auth.name') }}</label>
          <input v-model="form.name" type="text" required>
        </div>
        
        <div class="form-group">
          <label>{{ $t('auth.email') }}</label>
          <input v-model="form.email" type="email" required>
        </div>
        
        <div class="form-group">
          <label>{{ $t('auth.password') }}</label>
          <input v-model="form.password" type="password" required>
        </div>
        
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        
        <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
          {{ loading ? '...' : (isLogin ? $t('auth.loginBtn') : $t('auth.registerBtn')) }}
        </button>
      </form>
      
      <div class="auth-footer">
        <p v-if="isLogin">
          {{ $t('auth.noAccount') }} 
          <a href="#" @click.prevent="isLogin = false">{{ $t('auth.registerLink') }}</a>
        </p>
        <p v-else>
          {{ $t('auth.hasAccount') }} 
          <a href="#" @click.prevent="isLogin = true">{{ $t('auth.loginLink') }}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '../services/api'

const router = useRouter()
const route = useRoute()

const isLogin = ref(true)
const loading = ref(false)
const error = ref('')

const form = ref({
  name: '',
  email: '',
  password: ''
})

// Check if user is redirected here with a plan query (e.g. ?plan=gold)
// We can use this to enhance the UX after registration
const plan = route.query.plan

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  
  try {
    let response
    if (isLogin.value) {
      response = await api.login({
        email: form.value.email,
        password: form.value.password
      })
    } else {
      response = await api.register(form.value)
    }
    
    // Store token and user
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user', JSON.stringify(response.data.user))
    
    // Redirect logic
    // If there was a plan selected, we could redirect to checkout or dashboard
    if (plan) {
      // For now, simpler redirect
      router.push('/leaderboard') 
    } else {
      router.push('/')
    }
    
    // Force reload/update header state (simple way)
    window.location.reload()
    
  } catch (err) {
    console.error(err)
    error.value = err.response?.data?.message || 'Authentication failed'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background-dark);
  padding: 2rem;
}

.auth-card {
  background: var(--card-background);
  padding: 3rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  width: 100%;
  max-width: 450px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.auth-card h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  background: var(--background-light);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  color: white;
}

.form-group input:focus {
  outline: none;
  border-color: var(--accent-gold);
}

.btn-block {
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  margin-top: 1rem;
}

.auth-footer {
  margin-top: 2rem;
  text-align: center;
}

.auth-footer a {
  color: var(--accent-gold);
  text-decoration: none;
}

.error-message {
  color: #ff1744;
  background: rgba(255, 23, 68, 0.1);
  padding: 0.75rem;
  border-radius: var(--radius-sm);
  margin-bottom: 1rem;
  text-align: center;
}
</style>
