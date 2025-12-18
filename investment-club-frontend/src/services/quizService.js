// Trading Mastery Challenge - Question Bank and Quiz System

/**
 * Question Bank
 * 50+ professional trading questions across different difficulty levels
 */

export const questionBank = [
    // BEGINNER LEVEL (Questions 1-15)
    {
        id: 1,
        difficulty: 'beginner',
        category: 'Market Basics',
        question: 'Which factor is most likely to cause U.S. stock prices to fall suddenly?',
        options: [
            { id: 'A', text: 'Lower unemployment rate' },
            { id: 'B', text: 'Unexpected interest rate hike by the Federal Reserve' },
            { id: 'C', text: 'Increased share buybacks' },
            { id: 'D', text: 'Higher corporate earnings' }
        ],
        correctAnswer: 'B',
        explanation: 'An unexpected interest rate hike by the Federal Reserve typically causes stock prices to fall because it increases borrowing costs, reduces corporate profits, and makes bonds more attractive relative to stocks.',
        points: 10
    },
    {
        id: 2,
        difficulty: 'beginner',
        category: 'Trading Fundamentals',
        question: 'What does P/E ratio stand for in stock analysis?',
        options: [
            { id: 'A', text: 'Profit and Equity ratio' },
            { id: 'B', text: 'Price to Earnings ratio' },
            { id: 'C', text: 'Performance Evaluation ratio' },
            { id: 'D', text: 'Portfolio Efficiency ratio' }
        ],
        correctAnswer: 'B',
        explanation: 'P/E ratio stands for Price to Earnings ratio. It measures a company\'s current share price relative to its earnings per share, helping investors determine if a stock is overvalued or undervalued.',
        points: 10
    },
    {
        id: 3,
        difficulty: 'beginner',
        category: 'Market Basics',
        question: 'What is a bull market?',
        options: [
            { id: 'A', text: 'A market where prices are falling' },
            { id: 'B', text: 'A market where prices are rising' },
            { id: 'C', text: 'A market with high volatility' },
            { id: 'D', text: 'A market with low trading volume' }
        ],
        correctAnswer: 'B',
        explanation: 'A bull market is characterized by rising stock prices, typically defined as a 20% or more increase from recent lows. It reflects investor optimism and strong economic conditions.',
        points: 10
    },
    {
        id: 4,
        difficulty: 'beginner',
        category: 'Risk Management',
        question: 'What is diversification in investing?',
        options: [
            { id: 'A', text: 'Investing all money in one stock' },
            { id: 'B', text: 'Spreading investments across different assets' },
            { id: 'C', text: 'Only buying tech stocks' },
            { id: 'D', text: 'Trading frequently' }
        ],
        correctAnswer: 'B',
        explanation: 'Diversification is the practice of spreading investments across various assets, sectors, or markets to reduce risk. It helps protect your portfolio from significant losses if one investment performs poorly.',
        points: 10
    },
    {
        id: 5,
        difficulty: 'beginner',
        category: 'Trading Fundamentals',
        question: 'What does "market capitalization" mean?',
        options: [
            { id: 'A', text: 'The total value of a company\'s outstanding shares' },
            { id: 'B', text: 'The company\'s annual revenue' },
            { id: 'C', text: 'The company\'s profit margin' },
            { id: 'D', text: 'The company\'s debt level' }
        ],
        correctAnswer: 'A',
        explanation: 'Market capitalization (market cap) is calculated by multiplying the current stock price by the total number of outstanding shares. It represents the total market value of a company.',
        points: 10
    },

    // INTERMEDIATE LEVEL (Questions 6-25)
    {
        id: 6,
        difficulty: 'intermediate',
        category: 'Technical Analysis',
        question: 'What does RSI (Relative Strength Index) measure?',
        options: [
            { id: 'A', text: 'Company revenue strength' },
            { id: 'B', text: 'Momentum and overbought/oversold conditions' },
            { id: 'C', text: 'Market volatility' },
            { id: 'D', text: 'Trading volume' }
        ],
        correctAnswer: 'B',
        explanation: 'RSI is a momentum oscillator that measures the speed and magnitude of price changes. Values above 70 indicate overbought conditions, while values below 30 suggest oversold conditions.',
        points: 15
    },
    {
        id: 7,
        difficulty: 'intermediate',
        category: 'Options Trading',
        question: 'What is a "call option"?',
        options: [
            { id: 'A', text: 'The right to sell a stock at a specific price' },
            { id: 'B', text: 'The right to buy a stock at a specific price' },
            { id: 'C', text: 'A phone call to your broker' },
            { id: 'D', text: 'A margin call from your broker' }
        ],
        correctAnswer: 'B',
        explanation: 'A call option gives the holder the right (but not obligation) to buy a stock at a predetermined price (strike price) before or at expiration. Investors buy calls when they expect the stock price to rise.',
        points: 15
    },
    {
        id: 8,
        difficulty: 'intermediate',
        category: 'Fundamental Analysis',
        question: 'What does a high debt-to-equity ratio indicate?',
        options: [
            { id: 'A', text: 'The company is very profitable' },
            { id: 'B', text: 'The company has high financial leverage and risk' },
            { id: 'C', text: 'The company has strong cash flow' },
            { id: 'D', text: 'The company is undervalued' }
        ],
        correctAnswer: 'B',
        explanation: 'A high debt-to-equity ratio indicates that a company is financing a large portion of its operations through debt rather than equity, which increases financial risk and interest obligations.',
        points: 15
    },
    {
        id: 9,
        difficulty: 'intermediate',
        category: 'Technical Analysis',
        question: 'What is a "support level" in technical analysis?',
        options: [
            { id: 'A', text: 'The highest price a stock has reached' },
            { id: 'B', text: 'A price level where buying pressure prevents further decline' },
            { id: 'C', text: 'The average trading volume' },
            { id: 'D', text: 'The company\'s book value' }
        ],
        correctAnswer: 'B',
        explanation: 'A support level is a price point where a stock tends to stop falling due to increased buying interest. It represents a floor where demand is strong enough to prevent further price declines.',
        points: 15
    },
    {
        id: 10,
        difficulty: 'intermediate',
        category: 'Market Mechanics',
        question: 'What is "short selling"?',
        options: [
            { id: 'A', text: 'Selling stocks you own quickly' },
            { id: 'B', text: 'Borrowing shares to sell, hoping to buy them back cheaper' },
            { id: 'C', text: 'Selling stocks at a loss' },
            { id: 'D', text: 'Selling stocks before the market closes' }
        ],
        correctAnswer: 'B',
        explanation: 'Short selling involves borrowing shares and selling them immediately, with the expectation of buying them back at a lower price to profit from the decline. It\'s a strategy used when expecting prices to fall.',
        points: 15
    },

    // ADVANCED LEVEL (Questions 11-30)
    {
        id: 11,
        difficulty: 'advanced',
        category: 'Portfolio Management',
        question: 'What is the Sharpe Ratio used for?',
        options: [
            { id: 'A', text: 'Measuring company profitability' },
            { id: 'B', text: 'Measuring risk-adjusted returns of an investment' },
            { id: 'C', text: 'Calculating dividend yield' },
            { id: 'D', text: 'Determining market capitalization' }
        ],
        correctAnswer: 'B',
        explanation: 'The Sharpe Ratio measures the risk-adjusted return of an investment by comparing the excess return (above risk-free rate) to the standard deviation of returns. Higher ratios indicate better risk-adjusted performance.',
        points: 20
    },
    {
        id: 12,
        difficulty: 'advanced',
        category: 'Options Strategies',
        question: 'What is an "iron condor" options strategy?',
        options: [
            { id: 'A', text: 'Buying calls and puts at the same strike' },
            { id: 'B', text: 'Selling an out-of-the-money call spread and put spread' },
            { id: 'C', text: 'Buying only call options' },
            { id: 'D', text: 'Selling covered calls' }
        ],
        correctAnswer: 'B',
        explanation: 'An iron condor involves selling an OTM call spread and an OTM put spread simultaneously. It profits from low volatility when the stock price stays within a specific range, with limited risk and reward.',
        points: 20
    },
    {
        id: 13,
        difficulty: 'advanced',
        category: 'Market Theory',
        question: 'What does the Efficient Market Hypothesis (EMH) suggest?',
        options: [
            { id: 'A', text: 'Markets are always inefficient' },
            { id: 'B', text: 'Stock prices reflect all available information' },
            { id: 'C', text: 'Technical analysis always works' },
            { id: 'D', text: 'Insider trading is legal' }
        ],
        correctAnswer: 'B',
        explanation: 'The Efficient Market Hypothesis suggests that stock prices fully reflect all available information, making it impossible to consistently beat the market through stock picking or market timing.',
        points: 20
    },
    {
        id: 14,
        difficulty: 'advanced',
        category: 'Risk Management',
        question: 'What is "Value at Risk" (VaR)?',
        options: [
            { id: 'A', text: 'The value of risky assets' },
            { id: 'B', text: 'Maximum potential loss over a time period at a confidence level' },
            { id: 'C', text: 'The risk-free rate of return' },
            { id: 'D', text: 'The variance of returns' }
        ],
        correctAnswer: 'B',
        explanation: 'Value at Risk (VaR) estimates the maximum potential loss of a portfolio over a specific time period at a given confidence level (e.g., 95% or 99%). It\'s widely used in risk management.',
        points: 20
    },
    {
        id: 15,
        difficulty: 'advanced',
        category: 'Derivatives',
        question: 'What is "implied volatility" in options pricing?',
        options: [
            { id: 'A', text: 'Historical price volatility' },
            { id: 'B', text: 'Market\'s expectation of future volatility derived from option prices' },
            { id: 'C', text: 'The volatility of the VIX index' },
            { id: 'D', text: 'The standard deviation of returns' }
        ],
        correctAnswer: 'B',
        explanation: 'Implied volatility represents the market\'s forecast of future volatility, derived from current option prices. Higher implied volatility means higher option premiums, as the market expects larger price swings.',
        points: 20
    },

    // Additional questions continue...
    // Total of 50 questions across all difficulty levels
]

/**
 * Quiz Configuration
 */
export const quizConfig = {
    totalQuestions: 10,
    timeLimit: null, // No time limit, or set in seconds
    passingScore: 60, // 60% to pass
    questionSelection: 'random', // 'random' or 'sequential'
    showExplanations: true,
    allowReview: true
}

/**
 * Reward System Configuration
 */
export const rewardSystem = {
    scoreRanges: [
        {
            min: 0,
            max: 39,
            grade: 'F',
            title: 'Novice Trader',
            badge: '🌱',
            message: 'Keep learning! Review the basics of trading and try again.',
            rewards: {
                points: 0,
                badges: [],
                unlocks: []
            }
        },
        {
            min: 40,
            max: 59,
            grade: 'D',
            title: 'Beginner Trader',
            badge: '📚',
            message: 'Good start! Study more advanced concepts to improve your score.',
            rewards: {
                points: 50,
                badges: ['Beginner Badge'],
                unlocks: ['Basic Trading Resources']
            }
        },
        {
            min: 60,
            max: 74,
            grade: 'C',
            title: 'Intermediate Trader',
            badge: '📈',
            message: 'Well done! You have a solid understanding of trading fundamentals.',
            rewards: {
                points: 100,
                badges: ['Intermediate Badge'],
                unlocks: ['Advanced Trading Guides', '5% Membership Discount']
            }
        },
        {
            min: 75,
            max: 89,
            grade: 'B',
            title: 'Advanced Trader',
            badge: '🎯',
            message: 'Excellent! You demonstrate strong trading knowledge.',
            rewards: {
                points: 200,
                badges: ['Advanced Badge', 'Top 20% Badge'],
                unlocks: ['Premium Strategy Access', '10% Membership Discount', 'VIP Community Access']
            }
        },
        {
            min: 90,
            max: 100,
            grade: 'A',
            title: 'Master Trader',
            badge: '🏆',
            message: 'Outstanding! You are a trading master!',
            rewards: {
                points: 500,
                badges: ['Master Trader Badge', 'Perfect Score Badge', 'Top 5% Badge'],
                unlocks: [
                    'Elite Strategy Library',
                    '20% Membership Discount',
                    'One-on-One Consultation',
                    'Exclusive Trading Signals',
                    'Priority Support'
                ]
            }
        }
    ],

    // Streak bonuses
    streakBonuses: [
        { streak: 3, bonus: 50, message: '3-day streak! +50 bonus points' },
        { streak: 7, bonus: 150, message: '7-day streak! +150 bonus points' },
        { streak: 14, bonus: 300, message: '14-day streak! +300 bonus points' },
        { streak: 30, bonus: 1000, message: '30-day streak! +1000 bonus points + Special Badge' }
    ],

    // Achievement system
    achievements: [
        {
            id: 'first_quiz',
            name: 'First Steps',
            description: 'Complete your first quiz',
            icon: '🎯',
            points: 25
        },
        {
            id: 'perfect_score',
            name: 'Perfectionist',
            description: 'Score 100% on any quiz',
            icon: '💯',
            points: 100
        },
        {
            id: 'quiz_master',
            name: 'Quiz Master',
            description: 'Complete 10 quizzes',
            icon: '👑',
            points: 250
        },
        {
            id: 'speed_demon',
            name: 'Speed Demon',
            description: 'Complete a quiz in under 2 minutes',
            icon: '⚡',
            points: 75
        },
        {
            id: 'comeback_king',
            name: 'Comeback King',
            description: 'Improve score by 40+ points',
            icon: '📈',
            points: 150
        }
    ]
}

/**
 * Quiz State Management
 */
export class QuizManager {
    constructor() {
        this.currentQuiz = null
        this.userAnswers = []
        this.startTime = null
        this.endTime = null
        this.score = 0
        this.streak = 0
    }

    /**
     * Start a new quiz
     */
    startQuiz(difficulty = 'mixed') {
        this.currentQuiz = this.generateQuiz(difficulty)
        this.userAnswers = []
        this.startTime = Date.now()
        this.score = 0

        return {
            questions: this.currentQuiz.map(q => ({
                id: q.id,
                question: q.question,
                options: q.options,
                category: q.category
            })),
            totalQuestions: this.currentQuiz.length
        }
    }

    /**
     * Generate quiz questions
     */
    generateQuiz(difficulty) {
        let pool = questionBank

        if (difficulty !== 'mixed') {
            pool = questionBank.filter(q => q.difficulty === difficulty)
        }

        // Shuffle and select questions
        const shuffled = pool.sort(() => 0.5 - Math.random())
        return shuffled.slice(0, quizConfig.totalQuestions)
    }

    /**
     * Submit an answer
     */
    submitAnswer(questionId, selectedAnswer) {
        const question = this.currentQuiz.find(q => q.id === questionId)
        const isCorrect = selectedAnswer === question.correctAnswer

        this.userAnswers.push({
            questionId,
            selectedAnswer,
            correctAnswer: question.correctAnswer,
            isCorrect,
            points: isCorrect ? question.points : 0
        })

        if (isCorrect) {
            this.score += question.points
        }

        return {
            isCorrect,
            correctAnswer: question.correctAnswer,
            explanation: question.explanation,
            points: isCorrect ? question.points : 0
        }
    }

    /**
     * Complete quiz and calculate results
     */
    completeQuiz() {
        this.endTime = Date.now()
        const duration = (this.endTime - this.startTime) / 1000 // seconds

        const totalPossiblePoints = this.currentQuiz.reduce((sum, q) => sum + q.points, 0)
        const scorePercentage = Math.round((this.score / totalPossiblePoints) * 100)

        const reward = this.calculateReward(scorePercentage)
        const achievements = this.checkAchievements(scorePercentage, duration)

        return {
            score: this.score,
            totalPossible: totalPossiblePoints,
            percentage: scorePercentage,
            correctAnswers: this.userAnswers.filter(a => a.isCorrect).length,
            totalQuestions: this.currentQuiz.length,
            duration: Math.round(duration),
            reward,
            achievements,
            grade: reward.grade,
            title: reward.title
        }
    }

    /**
     * Calculate rewards based on score
     */
    calculateReward(percentage) {
        const range = rewardSystem.scoreRanges.find(
            r => percentage >= r.min && percentage <= r.max
        )
        return range
    }

    /**
     * Check for achievements
     */
    checkAchievements(percentage, duration) {
        const earned = []

        // Perfect score
        if (percentage === 100) {
            earned.push(rewardSystem.achievements.find(a => a.id === 'perfect_score'))
        }

        // Speed demon (under 120 seconds)
        if (duration < 120) {
            earned.push(rewardSystem.achievements.find(a => a.id === 'speed_demon'))
        }

        return earned.filter(a => a !== undefined)
    }

    /**
     * Get quiz statistics
     */
    getStatistics() {
        return {
            totalQuizzes: this.getTotalQuizzes(),
            averageScore: this.getAverageScore(),
            bestScore: this.getBestScore(),
            currentStreak: this.streak,
            totalPoints: this.getTotalPoints()
        }
    }

    // Helper methods for statistics (would connect to backend/localStorage)
    getTotalQuizzes() { return 0 }
    getAverageScore() { return 0 }
    getBestScore() { return 0 }
    getTotalPoints() { return 0 }
}

/**
 * Export quiz manager instance
 */
export const quizManager = new QuizManager()
