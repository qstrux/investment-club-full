<template>
  <div class="quiz-container">
    <!-- Quiz Header -->
    <div class="quiz-header">
      <div class="quiz-icon">🎯</div>
      <div>
        <h2>Trading Mastery Challenge</h2>
        <p>Prove Your Market Expertise</p>
      </div>
      <div class="quiz-stats">
        <div class="stat-item">
          <span class="stat-number">{{ currentQuestion }}/{{ totalQuestions }}</span>
          <div class="stat-label">QUESTIONS</div>
        </div>
        <div class="stat-item">
          <span class="stat-number score">{{ score }}</span>
          <div class="stat-label">SCORE</div>
          <div class="stat-percent">{{ scorePercentage }}%</div>
        </div>
      </div>
    </div>

    <!-- Quiz Content -->
    <div v-if="!quizStarted && !quizCompleted" class="quiz-start">
      <div class="start-card">
        <h3>Ready to Test Your Trading Knowledge?</h3>
        <p>Answer 10 questions to earn rewards and unlock exclusive benefits!</p>
        
        <div class="difficulty-selector">
          <h4>Select Difficulty:</h4>
          <div class="difficulty-options">
            <button 
              :class="['difficulty-btn', { active: selectedDifficulty === 'mixed' }]"
              @click="selectedDifficulty = 'mixed'"
            >
              <span class="diff-icon">🎲</span>
              <span>Mixed</span>
            </button>
            <button 
              :class="['difficulty-btn', { active: selectedDifficulty === 'beginner' }]"
              @click="selectedDifficulty = 'beginner'"
            >
              <span class="diff-icon">🌱</span>
              <span>Beginner</span>
            </button>
            <button 
              :class="['difficulty-btn', { active: selectedDifficulty === 'intermediate' }]"
              @click="selectedDifficulty = 'intermediate'"
            >
              <span class="diff-icon">📈</span>
              <span>Intermediate</span>
            </button>
            <button 
              :class="['difficulty-btn', { active: selectedDifficulty === 'advanced' }]"
              @click="selectedDifficulty = 'advanced'"
            >
              <span class="diff-icon">🏆</span>
              <span>Advanced</span>
            </button>
          </div>
        </div>

        <button class="btn btn-primary btn-lg" @click="startQuiz">
          Start Challenge
        </button>
      </div>
    </div>

    <!-- Question Display -->
    <div v-else-if="quizStarted && !quizCompleted" class="quiz-question">
      <button class="nav-btn prev" @click="previousQuestion" :disabled="currentQuestion === 1">
        ← Previous Question
      </button>

      <div class="question-card">
        <div class="question-header">
          <span class="category-badge">{{ currentQuestionData.category }}</span>
          <span class="difficulty-badge" :class="currentQuestionData.difficulty">
            {{ currentQuestionData.difficulty }}
          </span>
        </div>

        <h3 class="question-text">{{ currentQuestionData.question }}</h3>

        <div class="options-grid">
          <div 
            v-for="option in currentQuestionData.options" 
            :key="option.id"
            :class="['option-card', { 
              selected: selectedAnswer === option.id,
              correct: showResult && option.id === currentQuestionData.correctAnswer,
              incorrect: showResult && selectedAnswer === option.id && option.id !== currentQuestionData.correctAnswer
            }]"
            @click="selectAnswer(option.id)"
          >
            <div class="option-letter">{{ option.id }}</div>
            <div class="option-text">{{ option.text }}</div>
            <div v-if="showResult && option.id === currentQuestionData.correctAnswer" class="check-icon">✓</div>
            <div v-if="showResult && selectedAnswer === option.id && option.id !== currentQuestionData.correctAnswer" class="cross-icon">✗</div>
          </div>
        </div>

        <div v-if="showResult" class="explanation-box">
          <h4>💡 Explanation</h4>
          <p>{{ currentQuestionData.explanation }}</p>
          <div class="points-earned" v-if="lastAnswerCorrect">
            +{{ currentQuestionData.points }} points!
          </div>
        </div>

        <button 
          v-if="!showResult"
          class="btn btn-primary btn-block"
          @click="submitAnswer"
          :disabled="!selectedAnswer"
        >
          Submit Answer
        </button>

        <button 
          v-else
          class="btn btn-primary btn-block"
          @click="nextQuestion"
        >
          {{ currentQuestion < totalQuestions ? 'Next Question →' : 'View Results' }}
        </button>
      </div>
    </div>

    <!-- Results Screen -->
    <div v-else-if="quizCompleted" class="quiz-results">
      <div class="results-card">
        <div class="results-header">
          <div class="grade-badge" :class="'grade-' + results.grade.toLowerCase()">
            {{ results.badge }}
          </div>
          <h2>{{ results.title }}</h2>
          <p class="grade-text">Grade: {{ results.grade }}</p>
        </div>

        <div class="score-display">
          <div class="score-circle">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" class="score-bg"></circle>
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                class="score-fill"
                :style="{ strokeDashoffset: 283 - (283 * results.percentage / 100) }"
              ></circle>
            </svg>
            <div class="score-text">
              <span class="percentage">{{ results.percentage }}%</span>
              <span class="label">Score</span>
            </div>
          </div>
        </div>

        <div class="results-stats">
          <div class="stat-box">
            <span class="stat-icon">✓</span>
            <span class="stat-value">{{ results.correctAnswers }}/{{ results.totalQuestions }}</span>
            <span class="stat-label">Correct</span>
          </div>
          <div class="stat-box">
            <span class="stat-icon">⏱️</span>
            <span class="stat-value">{{ results.duration }}s</span>
            <span class="stat-label">Time</span>
          </div>
          <div class="stat-box">
            <span class="stat-icon">⭐</span>
            <span class="stat-value">{{ results.score }}</span>
            <span class="stat-label">Points</span>
          </div>
        </div>

        <div class="message-box">
          <p>{{ results.reward.message }}</p>
        </div>

        <div class="rewards-section">
          <h3>🎁 Rewards Earned</h3>
          
          <div class="reward-item">
            <span class="reward-icon">💰</span>
            <div>
              <strong>{{ results.reward.rewards.points }} Points</strong>
              <p>Added to your account</p>
            </div>
          </div>

          <div v-if="results.reward.rewards.badges.length > 0" class="reward-item">
            <span class="reward-icon">🏅</span>
            <div>
              <strong>Badges</strong>
              <p>{{ results.reward.rewards.badges.join(', ') }}</p>
            </div>
          </div>

          <div v-if="results.reward.rewards.unlocks.length > 0" class="reward-item">
            <span class="reward-icon">🔓</span>
            <div>
              <strong>Unlocked</strong>
              <ul>
                <li v-for="unlock in results.reward.rewards.unlocks" :key="unlock">{{ unlock }}</li>
              </ul>
            </div>
          </div>
        </div>

        <div v-if="results.achievements && results.achievements.length > 0" class="achievements-section">
          <h3>🏆 Achievements</h3>
          <div v-for="achievement in results.achievements" :key="achievement.id" class="achievement-card">
            <span class="achievement-icon">{{ achievement.icon }}</span>
            <div>
              <strong>{{ achievement.name }}</strong>
              <p>{{ achievement.description }}</p>
              <span class="achievement-points">+{{ achievement.points }} points</span>
            </div>
          </div>
        </div>

        <div class="action-buttons">
          <button class="btn btn-secondary" @click="reviewAnswers">
            Review Answers
          </button>
          <button class="btn btn-primary" @click="retakeQuiz">
            Take Another Quiz
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { quizManager } from '../services/quizService'

// State
const quizStarted = ref(false)
const quizCompleted = ref(false)
const selectedDifficulty = ref('mixed')
const questions = ref([])
const currentQuestion = ref(1)
const selectedAnswer = ref(null)
const showResult = ref(false)
const lastAnswerCorrect = ref(false)
const score = ref(0)
const results = ref(null)

// Computed
const totalQuestions = computed(() => questions.value.length || 10)
const currentQuestionData = computed(() => questions.value[currentQuestion.value - 1] || {})
const scorePercentage = computed(() => {
  if (totalQuestions.value === 0) return 0
  const maxScore = questions.value.slice(0, currentQuestion.value - 1).reduce((sum, q) => sum + (q.points || 10), 0)
  return maxScore > 0 ? Math.round((score.value / maxScore) * 100) : 0
})

// Methods
const startQuiz = () => {
  const quiz = quizManager.startQuiz(selectedDifficulty.value)
  questions.value = quiz.questions
  quizStarted.value = true
  currentQuestion.value = 1
  score.value = 0
}

const selectAnswer = (answerId) => {
  if (!showResult.value) {
    selectedAnswer.value = answerId
  }
}

const submitAnswer = () => {
  if (!selectedAnswer.value) return
  
  const result = quizManager.submitAnswer(
    currentQuestionData.value.id,
    selectedAnswer.value
  )
  
  lastAnswerCorrect.value = result.isCorrect
  if (result.isCorrect) {
    score.value += result.points
  }
  
  // Add correct answer and explanation to current question
  currentQuestionData.value.correctAnswer = result.correctAnswer
  currentQuestionData.value.explanation = result.explanation
  currentQuestionData.value.points = result.points
  
  showResult.value = true
}

const nextQuestion = () => {
  if (currentQuestion.value < totalQuestions.value) {
    currentQuestion.value++
    selectedAnswer.value = null
    showResult.value = false
  } else {
    completeQuiz()
  }
}

const previousQuestion = () => {
  if (currentQuestion.value > 1) {
    currentQuestion.value--
    selectedAnswer.value = null
    showResult.value = false
  }
}

const completeQuiz = () => {
  results.value = quizManager.completeQuiz()
  quizCompleted.value = true
  quizStarted.value = false
}

const retakeQuiz = () => {
  quizStarted.value = false
  quizCompleted.value = false
  currentQuestion.value = 1
  selectedAnswer.value = null
  showResult.value = false
  score.value = 0
  results.value = null
}

const reviewAnswers = () => {
  // TODO: Implement review mode
  alert('Review mode coming soon!')
}
</script>

<style scoped>
.quiz-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.quiz-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background: var(--card-background);
  border: 2px solid var(--accent-gold);
  border-radius: var(--radius-lg);
  margin-bottom: 2rem;
}

.quiz-icon {
  font-size: 3rem;
}

.quiz-header h2 {
  margin: 0 0 0.25rem 0;
  color: var(--accent-gold);
}

.quiz-header p {
  margin: 0;
  color: var(--text-secondary);
}

.quiz-stats {
  margin-left: auto;
  display: flex;
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent-gold);
}

.stat-number.score {
  color: var(--success-green);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
}

.stat-percent {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.quiz-start {
  display: flex;
  justify-content: center;
}

.start-card {
  background: var(--card-background);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 3rem;
  text-align: center;
  max-width: 600px;
}

.start-card h3 {
  margin-top: 0;
  font-size: 1.75rem;
  color: var(--accent-gold);
}

.difficulty-selector {
  margin: 2rem 0;
}

.difficulty-selector h4 {
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.difficulty-options {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.difficulty-btn {
  background: var(--background-light);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 1rem;
  cursor: pointer;
  transition: all var(--transition-normal);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-primary);
}

.difficulty-btn:hover {
  border-color: var(--accent-gold);
  transform: translateY(-2px);
}

.difficulty-btn.active {
  background: linear-gradient(135deg, #1a2332, #0a1929);
  border-color: var(--accent-gold);
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
}

.diff-icon {
  font-size: 2rem;
}

.quiz-question {
  position: relative;
}

.nav-btn {
  background: var(--accent-gold);
  color: var(--primary-dark-blue);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-sm);
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 1.5rem;
  transition: all var(--transition-normal);
}

.nav-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.question-card {
  background: var(--card-background);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 2rem;
}

.question-header {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.category-badge,
.difficulty-badge {
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 600;
}

.category-badge {
  background: rgba(255, 215, 0, 0.2);
  color: var(--accent-gold);
  border: 1px solid var(--accent-gold);
}

.difficulty-badge {
  border: 1px solid var(--border-color);
}

.difficulty-badge.beginner {
  background: rgba(0, 230, 118, 0.2);
  color: var(--success-green);
  border-color: var(--success-green);
}

.difficulty-badge.intermediate {
  background: rgba(255, 215, 0, 0.2);
  color: var(--accent-gold);
  border-color: var(--accent-gold);
}

.difficulty-badge.advanced {
  background: rgba(255, 23, 68, 0.2);
  color: #ff1744;
  border-color: #ff1744;
}

.question-text {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  color: var(--text-primary);
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.option-card {
  background: var(--background-light);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;
}

.option-card:hover {
  border-color: var(--accent-gold);
  transform: translateX(4px);
}

.option-card.selected {
  border-color: var(--accent-gold);
  background: linear-gradient(135deg, #1a2332, #0a1929);
}

.option-card.correct {
  border-color: var(--success-green);
  background: rgba(0, 230, 118, 0.1);
}

.option-card.incorrect {
  border-color: #ff1744;
  background: rgba(255, 23, 68, 0.1);
}

.option-letter {
  width: 40px;
  height: 40px;
  background: var(--accent-gold);
  color: var(--primary-dark-blue);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.option-text {
  flex: 1;
  color: var(--text-primary);
}

.check-icon,
.cross-icon {
  position: absolute;
  right: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
}

.check-icon {
  color: var(--success-green);
}

.cross-icon {
  color: #ff1744;
}

.explanation-box {
  background: linear-gradient(135deg, #1a2332, #0a1929);
  border: 1px solid var(--accent-gold);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.explanation-box h4 {
  margin: 0 0 0.75rem 0;
  color: var(--accent-gold);
}

.explanation-box p {
  margin: 0;
  line-height: 1.6;
  color: var(--text-secondary);
}

.points-earned {
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(0, 230, 118, 0.2);
  border: 1px solid var(--success-green);
  border-radius: var(--radius-sm);
  color: var(--success-green);
  font-weight: 700;
  text-align: center;
}

.quiz-results {
  display: flex;
  justify-content: center;
}

.results-card {
  background: var(--card-background);
  border: 2px solid var(--accent-gold);
  border-radius: var(--radius-lg);
  padding: 3rem;
  max-width: 700px;
  width: 100%;
}

.results-header {
  text-align: center;
  margin-bottom: 2rem;
}

.grade-badge {
  width: 100px;
  height: 100px;
  margin: 0 auto 1rem;
  font-size: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 3px solid var(--accent-gold);
}

.grade-badge.grade-a {
  background: linear-gradient(135deg, #00e676, #00c853);
}

.grade-badge.grade-b {
  background: linear-gradient(135deg, #ffd700, #ffa000);
}

.grade-badge.grade-c {
  background: linear-gradient(135deg, #64b5f6, #1976d2);
}

.grade-badge.grade-d {
  background: linear-gradient(135deg, #ff9800, #f57c00);
}

.grade-badge.grade-f {
  background: linear-gradient(135deg, #ff1744, #d50000);
}

.results-header h2 {
  margin: 0 0 0.5rem 0;
  color: var(--accent-gold);
}

.grade-text {
  font-size: 1.25rem;
  color: var(--text-secondary);
}

.score-display {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.score-circle {
  position: relative;
  width: 200px;
  height: 200px;
}

.score-circle svg {
  transform: rotate(-90deg);
}

.score-bg {
  fill: none;
  stroke: var(--background-light);
  stroke-width: 8;
}

.score-fill {
  fill: none;
  stroke: var(--accent-gold);
  stroke-width: 8;
  stroke-dasharray: 283;
  stroke-dashoffset: 283;
  transition: stroke-dashoffset 1s ease;
}

.score-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.percentage {
  display: block;
  font-size: 3rem;
  font-weight: 700;
  color: var(--accent-gold);
}

.label {
  display: block;
  font-size: 1rem;
  color: var(--text-secondary);
}

.results-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-box {
  background: var(--background-light);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-icon {
  font-size: 2rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.message-box {
  background: linear-gradient(135deg, #1a2332, #0a1929);
  border: 1px solid var(--accent-gold);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.message-box p {
  margin: 0;
  font-size: 1.125rem;
  color: var(--text-secondary);
}

.rewards-section,
.achievements-section {
  margin-bottom: 2rem;
}

.rewards-section h3,
.achievements-section h3 {
  margin: 0 0 1rem 0;
  color: var(--accent-gold);
}

.reward-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: var(--background-light);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  margin-bottom: 1rem;
}

.reward-icon {
  font-size: 2rem;
}

.reward-item strong {
  display: block;
  margin-bottom: 0.25rem;
  color: var(--text-primary);
}

.reward-item p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.reward-item ul {
  margin: 0.5rem 0 0 0;
  padding-left: 1.25rem;
}

.reward-item li {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.achievement-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--background-light);
  border: 1px solid var(--accent-gold);
  border-radius: var(--radius-md);
  margin-bottom: 1rem;
}

.achievement-icon {
  font-size: 2.5rem;
}

.achievement-card strong {
  display: block;
  color: var(--accent-gold);
}

.achievement-card p {
  margin: 0.25rem 0;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.achievement-points {
  color: var(--success-green);
  font-weight: 600;
  font-size: 0.875rem;
}

.action-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .quiz-header {
    flex-wrap: wrap;
  }
  
  .quiz-stats {
    width: 100%;
    justify-content: center;
  }
  
  .options-grid {
    grid-template-columns: 1fr;
  }
  
  .difficulty-options {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .results-stats {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    grid-template-columns: 1fr;
  }
}
</style>
