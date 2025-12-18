// Simple Authentication State Management
// This is a mock auth system for demonstration purposes
// In production, connect to real backend authentication

import { ref, computed } from 'vue'

// Mock user data
const mockUsers = {
    'demo@example.com': {
        id: 1,
        email: 'demo@example.com',
        name: 'Elite Trader',
        tier: 'Elite Tier',
        totalAUM: 520000,
        points: 2450,
        joinDate: '2023-01-15',
        investments: [
            { id: 1, amount: 250000, date: '2023-01-15', type: 'Initial' },
            { id: 2, amount: 150000, date: '2023-06-20', type: 'Additional' },
            { id: 3, amount: 120000, date: '2023-11-10', type: 'Additional' }
        ],
        achievements: [
            { id: 'first_quiz', name: 'First Steps', earned: true },
            { id: 'six_figure', name: 'Six-Figure Investor', earned: true }
        ],
        quizHistory: [
            { date: '2024-01-10', score: 85, grade: 'B' },
            { date: '2024-02-15', score: 92, grade: 'A' }
        ]
    }
}

// Auth state
const currentUser = ref(null)
const isAuthenticated = ref(false)

// Tier thresholds
const tierThresholds = {
    'Entry Level Tier': { min: 20000, max: 99999 },
    'Intermediate Tier': { min: 100000, max: 299999 },
    'Advanced Tier': { min: 300000, max: 499999 },
    'Elite Tier': { min: 500000, max: 799999 },
    'Core Tier': { min: 800000, max: Infinity }
}

// Calculate user tier based on AUM
export function calculateTier(totalAUM, points = 0) {
    const pointsEquivalent = Math.floor(points / 1000) * 1000
    const effectiveAUM = totalAUM + pointsEquivalent

    if (effectiveAUM >= 800000) return 'Core Tier'
    if (effectiveAUM >= 500000) return 'Elite Tier'
    if (effectiveAUM >= 300000) return 'Advanced Tier'
    if (effectiveAUM >= 100000) return 'Intermediate Tier'
    if (effectiveAUM >= 20000) return 'Entry Level Tier'
    return null
}

// Get progress to next tier
export function getProgressToNextTier(totalAUM, points = 0) {
    const currentTier = calculateTier(totalAUM, points)
    if (!currentTier) return null

    const tierOrder = ['Entry Level Tier', 'Intermediate Tier', 'Advanced Tier', 'Elite Tier', 'Core Tier']
    const currentIndex = tierOrder.indexOf(currentTier)

    if (currentIndex === tierOrder.length - 1) {
        return {
            isMaxTier: true,
            currentTier,
            message: 'You have reached the highest tier!'
        }
    }

    const nextTier = tierOrder[currentIndex + 1]
    const nextThreshold = tierThresholds[nextTier].min
    const pointsEquivalent = Math.floor(points / 1000) * 1000
    const effectiveAUM = totalAUM + pointsEquivalent

    const remaining = nextThreshold - effectiveAUM
    const progress = (effectiveAUM / nextThreshold) * 100

    return {
        isMaxTier: false,
        currentTier,
        nextTier,
        currentAmount: effectiveAUM,
        nextThreshold,
        remaining,
        progressPercentage: Math.min(progress, 100)
    }
}

// Get tier benefits
export function getTierBenefits(tier) {
    const benefits = {
        'Entry Level Tier': [
            'Standard Market Analysis',
            'Community Access',
            'Standard Support'
        ],
        'Intermediate Tier': [
            'Real-time Market Analysis with Priority Support',
            'VIP Community Access',
            'Trading Strategy Sharing'
        ],
        'Advanced Tier': [
            'Personal Trading Advisor',
            'Custom Strategy Development',
            'Early Access to New Features',
            'Exclusive Trading Events'
        ],
        'Elite Tier': [
            '24/7 Dedicated Trading Advisor',
            'AI Quantitative Strategy',
            'Global Finance Summit Invitation',
            'Exclusive Investment Opportunities',
            'One-on-One Trading Guidance'
        ],
        'Core Tier': [
            'All Privileges',
            'Join Gary Strategy Club',
            'Quarterly dividend networking events',
            'Priority access to all features'
        ]
    }

    return benefits[tier] || []
}

// Auth functions
export function login(email, password) {
    // Mock login - in production, call backend API
    const user = mockUsers[email]

    if (user && password === 'demo123') {
        currentUser.value = user
        isAuthenticated.value = true
        localStorage.setItem('user', JSON.stringify(user))
        return { success: true, user }
    }

    return { success: false, error: 'Invalid credentials' }
}

export function logout() {
    currentUser.value = null
    isAuthenticated.value = false
    localStorage.removeItem('user')
}

export function checkAuth() {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
        try {
            currentUser.value = JSON.parse(savedUser)
            isAuthenticated.value = true
            return true
        } catch (e) {
            localStorage.removeItem('user')
        }
    }
    return false
}

// Quick login for demo purposes
export function quickDemoLogin() {
    return login('demo@example.com', 'demo123')
}

// Computed properties
export const user = computed(() => currentUser.value)
export const authenticated = computed(() => isAuthenticated.value)

// User tier info
export const userTierInfo = computed(() => {
    if (!currentUser.value) return null

    const tier = calculateTier(currentUser.value.totalAUM, currentUser.value.points)
    const progress = getProgressToNextTier(currentUser.value.totalAUM, currentUser.value.points)
    const benefits = getTierBenefits(tier)

    return {
        tier,
        totalAUM: currentUser.value.totalAUM,
        points: currentUser.value.points,
        progress,
        benefits,
        name: currentUser.value.name
    }
})

// Initialize auth on load
checkAuth()

export default {
    user,
    authenticated,
    userTierInfo,
    login,
    logout,
    quickDemoLogin,
    checkAuth,
    calculateTier,
    getProgressToNextTier,
    getTierBenefits
}
