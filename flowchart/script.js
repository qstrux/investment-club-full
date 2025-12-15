// Flowchart Interactive Controls
document.addEventListener('DOMContentLoaded', () => {
    const flowchart = document.getElementById('flowchart');
    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');
    const resetZoomBtn = document.getElementById('resetZoom');
    const downloadSVGBtn = document.getElementById('downloadSVG');
    
    let currentZoom = 1;
    const zoomStep = 0.2;
    const minZoom = 0.5;
    const maxZoom = 3;
    
    // Zoom In
    zoomInBtn.addEventListener('click', () => {
        if (currentZoom < maxZoom) {
            currentZoom += zoomStep;
            applyZoom();
        }
    });
    
    // Zoom Out
    zoomOutBtn.addEventListener('click', () => {
        if (currentZoom > minZoom) {
            currentZoom -= zoomStep;
            applyZoom();
        }
    });
    
    // Reset Zoom
    resetZoomBtn.addEventListener('click', () => {
        currentZoom = 1;
        applyZoom();
    });
    
    // Apply zoom transformation
    function applyZoom() {
        flowchart.style.transform = `scale(${currentZoom})`;
        flowchart.style.transformOrigin = 'top center';
    }
    
    // Download SVG
    downloadSVGBtn.addEventListener('click', () => {
        const svgData = flowchart.outerHTML;
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = svgUrl;
        downloadLink.download = 'application-process-flowchart.svg';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(svgUrl);
    });
    
    // Add interactive hover effects to nodes
    const nodes = document.querySelectorAll('.node');
    nodes.forEach((node, index) => {
        node.addEventListener('mouseenter', (e) => {
            node.style.filter = 'brightness(1.15) drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2))';
        });
        
        node.addEventListener('mouseleave', (e) => {
            node.style.filter = '';
        });
        
        // Add click animation
        node.addEventListener('click', () => {
            node.classList.add('active');
            setTimeout(() => {
                node.classList.remove('active');
            }, 2000);
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === '+' || e.key === '=') {
            e.preventDefault();
            zoomInBtn.click();
        } else if (e.key === '-' || e.key === '_') {
            e.preventDefault();
            zoomOutBtn.click();
        } else if (e.key === '0') {
            e.preventDefault();
            resetZoomBtn.click();
        }
    });
    
    // Mouse wheel zoom (with Ctrl key)
    const wrapper = document.querySelector('.flowchart-wrapper');
    wrapper.addEventListener('wheel', (e) => {
        if (e.ctrlKey) {
            e.preventDefault();
            if (e.deltaY < 0) {
                // Scroll up - zoom in
                if (currentZoom < maxZoom) {
                    currentZoom += zoomStep / 2;
                    applyZoom();
                }
            } else {
                // Scroll down - zoom out
                if (currentZoom > minZoom) {
                    currentZoom -= zoomStep / 2;
                    applyZoom();
                }
            }
        }
    });
    
    // Add entrance animation
    setTimeout(() => {
        nodes.forEach((node, index) => {
            setTimeout(() => {
                node.style.opacity = '0';
                node.style.transform = 'translateY(20px)';
                node.style.transition = 'all 0.5s ease';
                
                setTimeout(() => {
                    node.style.opacity = '1';
                    node.style.transform = 'translateY(0)';
                }, 50);
            }, index * 30);
        });
    }, 100);
    
    // Add step counter
    const stepInfo = document.createElement('div');
    stepInfo.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        font-size: 0.875rem;
        font-weight: 600;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        display: none;
    `;
    document.body.appendChild(stepInfo);
    
    nodes.forEach((node, index) => {
        node.addEventListener('mouseenter', () => {
            const stepNum = node.getAttribute('data-step');
            stepInfo.textContent = `Step ${stepNum} of ${nodes.length}`;
            stepInfo.style.display = 'block';
        });
        
        node.addEventListener('mouseleave', () => {
            stepInfo.style.display = 'none';
        });
    });
    
    console.log('🎨 Flowchart loaded successfully!');
    console.log('💡 Keyboard shortcuts:');
    console.log('  + or = : Zoom in');
    console.log('  - or _ : Zoom out');
    console.log('  0      : Reset zoom');
    console.log('  Ctrl + Mouse Wheel : Zoom in/out');
});
