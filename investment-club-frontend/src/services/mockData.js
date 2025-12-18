// Enhanced mock data with trading records
// Enhanced mock data with trading records
export const mockTraders = [
    {
        id: '1',
        name: 'Alex Mercer',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        totalProfit: '+124.5%',
        winRate: '68%',
        aum: '2,500,000',
        strategy: 'Trend Following',
        bio: 'Professional trader with 8 years of experience in equity markets. Specializes in identifying long-term breakouts and riding major trends. Former analyst at a top hedge fund.',
        monthlyPnL: '+$12,450',
        followers: 1205,
        rank: 1,
        status: 'active',
        joinDate: '2023-01-15',
        performanceData: [
            { date: '2023-01', value: 100 },
            { date: '2023-02', value: 112 },
            { date: '2023-03', value: 108 },
            { date: '2023-04', value: 125 },
            { date: '2023-05', value: 135 },
            { date: '2023-06', value: 150 },
            { date: '2023-07', value: 145 },
            { date: '2023-08', value: 160 },
            { date: '2023-09', value: 180 },
            { date: '2023-10', value: 175 },
            { date: '2023-11', value: 200 },
            { date: '2023-12', value: 224 }
        ],
        positions: [
            { symbol: 'NVDA', size: '25%', entry: 420.50, current: 485.00, pnl: '+15.3%' },
            { symbol: 'META', size: '20%', entry: 295.00, current: 335.20, pnl: '+13.6%' },
            { symbol: 'AMD', size: '15%', entry: 105.20, current: 118.50, pnl: '+12.6%' },
            { symbol: 'Cash', size: '40%', entry: 1.00, current: 1.00, pnl: '0%' }
        ]
    },
    {
        id: '2',
        name: 'Sarah Chen',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        totalProfit: '+89.2%',
        winRate: '72%',
        aum: '1,800,000',
        strategy: 'Mean Reversion',
        bio: 'Statistical arbitrage specialist finding inefficiencies in market pricing. Focuses on tech and biotech sectors with a disciplined risk management approach.',
        monthlyPnL: '+$8,920',
        followers: 980,
        rank: 2,
        status: 'active',
        joinDate: '2023-03-22',
        performanceData: [
            { date: '2023-03', value: 100 },
            { date: '2023-04', value: 105 },
            { date: '2023-05', value: 112 },
            { date: '2023-06', value: 120 },
            { date: '2023-07', value: 118 },
            { date: '2023-08', value: 135 },
            { date: '2023-09', value: 145 },
            { date: '2023-10', value: 155 },
            { date: '2023-11', value: 170 },
            { date: '2023-12', value: 189 }
        ],
        positions: [
            { symbol: 'AAPL', size: '30%', entry: 175.00, current: 189.50, pnl: '+8.2%' },
            { symbol: 'GOOGL', size: '25%', entry: 132.00, current: 138.50, pnl: '+4.9%' },
            { symbol: 'MSFT', size: '20%', entry: 350.00, current: 370.00, pnl: '+5.7%' },
            { symbol: 'Cash', size: '25%', entry: 1.00, current: 1.00, pnl: '0%' }
        ]
    },
    {
        id: '3',
        name: 'Michael Ross',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        totalProfit: '+210.1%',
        winRate: '65%',
        aum: '5,200,000',
        strategy: 'Global Macro',
        bio: 'Macro-economic expert analyzing global trends to position for big moves. Trades across equities, commodities, and currencies.',
        monthlyPnL: '+$5,100',
        followers: 850,
        rank: 3,
        status: 'active',
        joinDate: '2022-11-05',
        performanceData: [
            { date: '2023-01', value: 100 },
            { date: '2023-03', value: 140 },
            { date: '2023-05', value: 130 },
            { date: '2023-07', value: 180 },
            { date: '2023-09', value: 200 },
            { date: '2023-11', value: 280 },
            { date: '2023-12', value: 310 }
        ],
        positions: [
            { symbol: 'GLD', size: '40%', entry: 180.00, current: 195.00, pnl: '+8.3%' },
            { symbol: 'USO', size: '30%', entry: 70.00, current: 75.00, pnl: '+7.1%' },
            { symbol: 'Cash', size: '30%', entry: 1.00, current: 1.00, pnl: '0%' }
        ]
    }
]

// Chief Analyst Profile Data
export const chiefAnalyst = {
    name: 'GARY JOE BARTAK',
    title: 'Chief Analyst',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    yearsOfExperience: 32,
    totalTrades: 587,
    winRate: '88%',
    activePositions: 10,
    monthlyPnL: '+$0.00',
    totalPnL: '+$6,382,884.40'
}

// Trading Records (Last 3 months)
export const tradingRecords = [
    {
        id: '1',
        country: 'USA',
        symbol: 'MARA',
        status: 'Active',
        entryDate: 'Oct 31, 2025',
        entryPrice: '$13.17',
        currentPrice: '$11.52',
        quantity: 185000,
        entryAmount: '$2,436,450.00',
        marketValue: '$2,131,200.00',
        plRatio: '-12.53%',
        plAmount: '-$305,250.00',
        chartData: 'https://via.placeholder.com/300x150/0a1929/00e676?text=MARA+Chart'
    },
    {
        id: '2',
        country: 'USA',
        symbol: 'AAPL',
        status: 'Active',
        entryDate: 'Nov 15, 2025',
        entryPrice: '$185.50',
        currentPrice: '$195.20',
        quantity: 5000,
        entryAmount: '$927,500.00',
        marketValue: '$976,000.00',
        plRatio: '+5.23%',
        plAmount: '+$48,500.00',
        chartData: 'https://via.placeholder.com/300x150/0a1929/00e676?text=AAPL+Chart'
    },
    {
        id: '3',
        country: 'USA',
        symbol: 'TSLA',
        status: 'Closed',
        entryDate: 'Sep 20, 2025',
        entryPrice: '$240.00',
        currentPrice: '$265.80',
        quantity: 3000,
        entryAmount: '$720,000.00',
        marketValue: '$797,400.00',
        plRatio: '+10.75%',
        plAmount: '+$77,400.00',
        chartData: 'https://via.placeholder.com/300x150/0a1929/00e676?text=TSLA+Chart'
    },
    {
        id: '4',
        country: 'USA',
        symbol: 'NVDA',
        status: 'Active',
        entryDate: 'Oct 10, 2025',
        entryPrice: '$495.00',
        currentPrice: '$520.30',
        quantity: 2000,
        entryAmount: '$990,000.00',
        marketValue: '$1,040,600.00',
        plRatio: '+5.11%',
        plAmount: '+$50,600.00',
        chartData: 'https://via.placeholder.com/300x150/0a1929/00e676?text=NVDA+Chart'
    },
    {
        id: '5',
        country: 'USA',
        symbol: 'MSFT',
        status: 'Active',
        entryDate: 'Nov 01, 2025',
        entryPrice: '$378.50',
        currentPrice: '$385.90',
        quantity: 1500,
        entryAmount: '$567,750.00',
        marketValue: '$578,850.00',
        plRatio: '+1.95%',
        plAmount: '+$11,100.00',
        chartData: 'https://via.placeholder.com/300x150/0a1929/00e676?text=MSFT+Chart'
    },
    {
        id: '6',
        country: 'USA',
        symbol: 'GOOGL',
        status: 'Active',
        entryDate: 'Oct 25, 2025',
        entryPrice: '$142.80',
        currentPrice: '$138.20',
        quantity: 4000,
        entryAmount: '$571,200.00',
        marketValue: '$552,800.00',
        plRatio: '-3.22%',
        plAmount: '-$18,400.00',
        chartData: 'https://via.placeholder.com/300x150/0a1929/ff1744?text=GOOGL+Chart'
    }
]

export const mockVideos = [
    {
        id: '1',
        title: 'Advanced Trading Strategies for 2024',
        thumbnail: 'https://via.placeholder.com/400x225/002140/FFD700?text=Video+1',
        duration: '15:30',
        views: 12450,
        uploadDate: '2023-12-01',
        status: 'published'
    },
    {
        id: '2',
        title: 'Risk Management Fundamentals',
        thumbnail: 'https://via.placeholder.com/400x225/002140/FFD700?text=Video+2',
        duration: '22:15',
        views: 8920,
        uploadDate: '2023-11-28',
        status: 'published'
    },
    {
        id: '3',
        title: 'Market Analysis Techniques',
        thumbnail: 'https://via.placeholder.com/400x225/002140/FFD700?text=Video+3',
        duration: '18:45',
        views: 15300,
        uploadDate: '2023-11-20',
        status: 'published'
    }
]

export const mockStrategies = [
    {
        id: '1',
        name: 'Momentum Breakout Strategy',
        creator: 'Alex Mercer',
        type: 'Momentum',
        riskLevel: 'Medium',
        expectedROI: '45-60%',
        winRate: '68%',
        status: 'active',
        createdDate: '2023-06-15'
    },
    {
        id: '2',
        name: 'Value Investing Framework',
        creator: 'Sarah Chen',
        type: 'Value',
        riskLevel: 'Low',
        expectedROI: '25-35%',
        winRate: '72%',
        status: 'active',
        createdDate: '2023-07-20'
    },
    {
        id: '3',
        name: 'Swing Trading System',
        creator: 'Michael Ross',
        type: 'Swing',
        riskLevel: 'High',
        expectedROI: '60-80%',
        winRate: '65%',
        status: 'active',
        createdDate: '2023-05-10'
    }
]

export const mockAIStockPicks = [
    {
        id: '1',
        ticker: 'AAPL',
        companyName: 'Apple Inc.',
        signal: 'Strong Buy',
        confidence: '92%',
        currentPrice: '$185.50',
        targetPrice: '$210.00',
        generatedDate: '2023-12-10'
    },
    {
        id: '2',
        ticker: 'TSLA',
        companyName: 'Tesla Inc.',
        signal: 'Buy',
        confidence: '85%',
        currentPrice: '$240.20',
        targetPrice: '$280.00',
        generatedDate: '2023-12-09'
    },
    {
        id: '3',
        ticker: 'NVDA',
        companyName: 'NVIDIA Corporation',
        signal: 'Strong Buy',
        confidence: '95%',
        currentPrice: '$495.00',
        targetPrice: '$550.00',
        generatedDate: '2023-12-08'
    }
]

export const mockMembershipLevels = [
    {
        id: '1',
        levelName: 'Entry Level Tier',
        fee: '>=$20,000',
        memberCount: 520,
        features: [
            'Standard Market Analysis',
            'Community Access',
            'Standard Support',
            'Trading Strategy Sharing'
        ]
    },
    {
        id: '2',
        levelName: 'Intermediate Tier',
        fee: '>=$100,000',
        memberCount: 310,
        features: [
            'Real-time Market Analysis Support',
            'VIP Community Access',
            'Trading Strategy Sharing'
        ]
    },
    {
        id: '3',
        levelName: 'Advanced Tier',
        fee: '>=$300,000',
        memberCount: 185,
        features: [
            'Personal Trading Advisor',
            'Custom Strategy Development',
            'Early Access to New Features',
            'Exclusive Trading Events'
        ]
    },
    {
        id: '4',
        levelName: 'Elite Tier',
        fee: '>=$500,000',
        memberCount: 85,
        features: [
            '24/7 Dedicated Trading Advisor',
            'AI Quantitative Strategy',
            'Global Finance Summit Invitation',
            'Exclusive Investment Opportunities',
            'One-on-One Trading Guidance'
        ]
    },
    {
        id: '5',
        levelName: 'Core Tier',
        fee: '>=$800,000',
        memberCount: 35,
        features: [
            'All Privileges',
            'Join Gary Strategy Club and attend the annual meeting',
            'Quarterly dividend networking events for resource sharing'
        ]
    }
]

export const mockAnnouncements = [
    {
        id: '1',
        title: 'Platform Maintenance Notice',
        type: 'Maintenance',
        publishTime: '2023-12-01 10:00:00',
        content: 'Scheduled maintenance on December 15th from 2-4 AM EST.'
    },
    {
        id: '2',
        title: 'New AI Stock Picker Features',
        type: 'Feature Update',
        publishTime: '2023-11-28 09:30:00',
        content: 'We\'ve enhanced our AI algorithms with improved accuracy.'
    },
    {
        id: '3',
        title: 'Holiday Trading Hours',
        type: 'News',
        publishTime: '2023-11-20 14:15:00',
        content: 'Updated trading hours for the holiday season.'
    }
]
