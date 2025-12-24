const CountdownTimer = (() => {
    const config = {
        targetDate: "2026-02-17",
        targetName: "春节",
    };

    function updateCountdown() {
        const elements = ['eventName', 'eventDate', 'daysUntil', 'countRight']
            .map(id => document.getElementById(id));
        
        if (elements.some(el => !el)) return;
        
        const [eventName, eventDate, daysUntil, countRight] = elements;
        const now = new Date();
        const target = new Date(config.targetDate);
        
        eventName.textContent = config.targetName;
        eventDate.textContent = config.targetDate;
        daysUntil.textContent = Math.round((target - now.setHours(0,0,0,0)) / 86400000);
        
        countRight.innerHTML = Object.entries(config.units)
            .map(([key, {text, unit}]) => {
                const {remaining, percentage} = calculators[key]();
                return `
                    <div class="cd-count-item">
                        <div class="cd-item-name">${text}</div>
                        <div class="cd-item-progress">
                            <div class="cd-progress-bar" style="width: ${percentage}%; opacity: ${percentage/100}"></div>
                            <span class="cd-percentage ${percentage >= 46 ? 'cd-many' : ''}">${percentage.toFixed(2)}%</span>
                            <span class="cd-remaining ${percentage >= 60 ? 'cd-many' : ''}">
                                <span class="cd-tip">还剩</span>${remaining}<span class="cd-tip">${unit}</span>
                            </span>
                        </div>
                    </div>
                `;
            }).join('');
    }

    function injectStyles() {
        const styles = `
            .card-countdown .item-content {
                display: flex;
            }
            .cd-count-left {
                position: relative;
                display: flex;
                flex-direction: column;
                line-height: 1.8;
                align-items: center;
                justify-content: center;
                border: 1px solid #000;
                border-radius: 8px;
            }
            .cd-count-left .cd-text {
                font-size: 14px;
            }
            .cd-count-left .cd-name {
                font-weight: bold;
                font-size: 18px;
            }
            .cd-count-left .cd-time {
                font-size: 30px;
                font-weight: bold;
                background-image: linear-gradient(
                    to right,
                    orangered,
                    orange,
                    gold,
                    lightgreen,
                    cyan,
                    dodgerblue,
                    mediumpurple,
                    hotpink,
                    orangered
                  );
                  background-size: 110vw;
                  -webkit-background-clip: text;
                  color: rgba(0,0,0,0.1); /* transparent IE 不支持 */
                  animation: sliding 30s linear infinite;
                }
                @keyframes sliding{
                  to{
                    background-position:  -2000vw;
                  }
                }
                .posts-expand .post-title {
                  background-image: linear-gradient(
                    to right,
                    orangered,
                    orange,
                    gold,
                    lightgreen,
                    cyan,
                    dodgerblue,
                    mediumpurple,
                    hotpink,
                    orangered
                  );
                  background-size: 110vw;
                  -webkit-background-clip: text;
                  color: rgba(0,0,0,0.1); /* transparent IE 不支持 */
                  animation: sliding 30s linear infinite;
                }
                @keyframes sliding{
                  to{
                    background-position:  -2000vw;
                  }
                }
            }
            .cd-count-left .cd-date {
                font-size: 12px;
                opacity: 0.6;
            }
        `;

        const styleSheet = document.createElement("style");
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    let timer;
    const start = () => {
        injectStyles();
        updateCountdown();
        timer = setInterval(updateCountdown, 600000);
    };
    
    ['pjax:complete', 'DOMContentLoaded'].forEach(event => document.addEventListener(event, start));
    document.addEventListener('pjax:send', () => timer && clearInterval(timer));
    
    return { start, stop: () => timer && clearInterval(timer) };
})();