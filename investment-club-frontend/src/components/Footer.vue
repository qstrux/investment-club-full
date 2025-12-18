<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h4>US Elite Investment Club</h4>
          <p>Professional • Insightful • Profitable</p>
        </div>
        
        <div class="footer-section">
          <h5>Quick Links</h5>
          <router-link to="/traders">Traders</router-link>
          <router-link to="/strategies">Strategies</router-link>
          <router-link to="/membership">Membership</router-link>
        </div>
        
        <div class="footer-section">
          <h5>Resources</h5>
          <router-link to="/videos">Videos</router-link>
          <router-link to="/ai-picks">AI Picks</router-link>
          <router-link to="/leaderboard">Leaderboard</router-link>
        </div>
        
        <div class="footer-section">
          <h5>Contact</h5>
          <p>Email: info@useliteinvest.com</p>
          <p>Phone: +1 (555) 123-4567</p>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2024 US Elite Investment Club. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--primary-dark-blue);
  border-top: 2px solid var(--accent-gold);
  margin-top: auto;
  padding: 3rem 0 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h4 {
  color: var(--accent-gold);
  margin-bottom: 0.5rem;
}

.footer-section h5 {
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-size: 1rem;
}

.footer-section p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.footer-section a {
  display: block;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  transition: color var(--transition-fast);
}

.footer-section a:hover {
  color: var(--accent-gold);
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.footer-bottom p {
  color: var(--text-secondary);
  font-size: 0.875rem;
}
</style>
