const scriptData = [
    {
        // 0-5s
        bg: "file:///C:/Users/Qstrux/.gemini/antigravity/brain/8275d2d1-98b8-4e57-895b-ce60577416ab/scene_hook_trader_1765423724433.png",
        main: "Did You Know?",
        sub: "True professional traders make their most critical decisions before you even wake up.",
        voice: "Did you know? True professional traders often make their most critical decisions before you have even woken up."
    },
    {
        // 5-12s
        bg: "file:///C:/Users/Qstrux/.gemini/antigravity/brain/8275d2d1-98b8-4e57-895b-ce60577416ab/scene_premarket_clock_1765423745222.png",
        main: "Pre-market = Price Discovery",
        sub: "4:00 AM EST. Institutions move.<br>Lower liquidity, but the truest info.",
        voice: "Pre-market is not just early trading. From 4 AM, institutional money is moving. Lower liquidity, but the truest information."
    },
    {
        // 12-20s
        bg: "file:///C:/Users/Qstrux/.gemini/antigravity/brain/8275d2d1-98b8-4e57-895b-ce60577416ab/scene_premarket_clock_1765423745222.png",
        main: "Risk & Opportunity",
        sub: "Read the sentiment first, lead by half a day.<br>But volatility is wilder.",
        voice: "Who reads the sentiment first, leads by half a day. But the risk is higher, and volatility is wilder."
    },
    {
        // 20-30s
        bg: "file:///C:/Users/Qstrux/.gemini/antigravity/brain/8275d2d1-98b8-4e57-895b-ce60577416ab/scene_trading_tools_1765423760659.png",
        main: "Tools > Feelings",
        sub: "Pro Essentials:<br>• Level 2 Depth<br>• Millisecond Execution<br>• Real-time Charts",
        voice: "In day trading, tools matter more than feelings. Pros use Level 2 Depth, Millisecond Execution, and Real-time Charts."
    },
    {
        // 30-40s
        bg: "file:///C:/Users/Qstrux/.gemini/antigravity/brain/8275d2d1-98b8-4e57-895b-ce60577416ab/scene_trading_tools_1765423760659.png",
        main: "Don't Go Unarmed",
        sub: "No tools = Running a triathlon without gear.<br>You are at a disadvantage.",
        voice: "Without these tools, it's like running a triathlon without gear. No matter how hard you try, you're at a disadvantage."
    },
    {
        // 40-50s
        bg: "file:///C:/Users/Qstrux/.gemini/antigravity/brain/8275d2d1-98b8-4e57-895b-ce60577416ab/scene_platform_comparison_1765423776927.png",
        main: "Platform is Key",
        sub: "Hours, commissions, speed...<br>It's not just a choice, it's your edge.",
        voice: "Your platform choice determines your results. Hours, commissions, speed... It's not just a choice, it's your competitive edge."
    },
    {
        // 50-60s
        bg: "file:///C:/Users/Qstrux/.gemini/antigravity/brain/8275d2d1-98b8-4e57-895b-ce60577416ab/scene_cta_guidebook_1765423792795.png",
        main: "Get the Pro Guide",
        sub: "Is your platform holding you back?<br>Comment 'Platform' for the Strategy Guide.",
        voice: "Want to know if your platform is holding you back? Comment Platform to get my Trading Platform Comparison and Strategy Guide."
    }
];

const mainText = document.getElementById('main-text');
const subText = document.getElementById('sub-text');
const bgLayer = document.getElementById('background-layer');
const progressBar = document.getElementById('progress-bar');
const startBtn = document.getElementById('start-btn');
const startOverlay = document.getElementById('start-overlay');

let currentSceneIndex = 0;
let totalScenes = scriptData.length;

startBtn.addEventListener('click', () => {
    startOverlay.classList.add('hidden');
    playScene(0);
});

function playScene(index) {
    if (index >= scriptData.length) {
        console.log("Video Finished");
        return;
    }

    const scene = scriptData[index];
    currentSceneIndex = index;

    // 1. Update Visuals
    updateVisuals(scene);

    // 2. Play Audio (which triggers next scene on end)
    speak(scene.voice, () => {
        // On Audio End
        playScene(index + 1);
    });

    // Update progress bar approximating duration (purely visual estimate now)
    progressBar.style.width = ((index + 1) / totalScenes * 100) + '%';
}

function updateVisuals(scene) {
    mainText.classList.remove('visible');
    subText.classList.remove('visible');

    setTimeout(() => {
        mainText.textContent = scene.main;
        subText.innerHTML = scene.sub;

        // Change BG if needed
        if (!bgLayer.style.backgroundImage.includes(scene.bg)) {
            bgLayer.style.opacity = 0;
            setTimeout(() => {
                bgLayer.style.backgroundImage = `url('${scene.bg}')`;
                bgLayer.style.opacity = 1;
                bgLayer.classList.remove('zoom-effect');
                void bgLayer.offsetWidth;
                bgLayer.classList.add('zoom-effect');
            }, 500);
        }

        setTimeout(() => {
            mainText.classList.add('visible');
            subText.classList.add('visible');
        }, 500);
    }

function speak(text, onEndCallback) {
            if (!window.speechSynthesis) {
                console.warn("Browser does not support TTS");
                setTimeout(onEndCallback, 3000); // Fallback timeout
                return;
            }

            // Cancel any previous
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = 1.0;
            utterance.volume = 1.0;

            // Try to find a good Female English voice
            // Common names: "Microsoft Zira", "Google US English", "Samantha"
            const voices = window.speechSynthesis.getVoices();
            const femaleVoice = voices.find(v =>
                (v.name.includes('Zira') || v.name.includes('Google US English') || v.name.includes('Samantha') || v.name.includes('Female'))
                && v.lang.includes('en')
            ) || voices.find(v => v.lang.includes('en'));

            if (femaleVoice) {
                utterance.voice = femaleVoice;
                console.log("Using voice:", femaleVoice.name);
            }

            utterance.onend = function () {
                if (onEndCallback) onEndCallback();
            };

            utterance.onerror = function (e) {
                console.error("TTS Error:", e);
                if (onEndCallback) onEndCallback();
            };

            window.speechSynthesis.speak(utterance);
        }

// Pre-load voices
window.speechSynthesis.getVoices();
