// 要素取得
const percentInput = document.getElementById('percent');
const ratio1nInput = document.getElementById('ratio1n');
const rationn1Input = document.getElementById('rationn1');
const degreeInput = document.getElementById('degree');
const clearBtn = document.getElementById('clearBtn');

// 計算処理を行うフラグ（無限ループ防止）
let isCalculating = false;

// パーセントから各値を計算
function calculateFromPercent(percent) {
    if (isCalculating) return;
    isCalculating = true;

    const tanValue = percent / 100;
    const degree = Math.atan(tanValue) * 180 / Math.PI;

    ratio1nInput.value = tanValue.toFixed(2);
    rationn1Input.value = tanValue !== 0 ? (1 / tanValue).toFixed(2) : '';
    degreeInput.value = degree.toFixed(2);

    isCalculating = false;
}

// 1:n（1m進んだら何mの高低差か）から各値を計算
function calculateFromRatio1n(ratio1n) {
    if (isCalculating) return;
    isCalculating = true;

    const degree = Math.atan(ratio1n) * 180 / Math.PI;

    percentInput.value = (ratio1n * 100).toFixed(2);
    rationn1Input.value = ratio1n !== 0 ? (1 / ratio1n).toFixed(2) : '';
    degreeInput.value = degree.toFixed(2);

    isCalculating = false;
}

// n:1（何m進めば1mの高低差になるか）から各値を計算
function calculateFromRationn1(rationn1) {
    if (isCalculating) return;
    isCalculating = true;

    const tanValue = 1 / rationn1;
    const degree = Math.atan(tanValue) * 180 / Math.PI;

    percentInput.value = (tanValue * 100).toFixed(2);
    ratio1nInput.value = tanValue.toFixed(2);
    degreeInput.value = degree.toFixed(2);

    isCalculating = false;
}

// 角度から各値を計算
function calculateFromDegree(degree) {
    if (isCalculating) return;
    isCalculating = true;

    const rad = degree * Math.PI / 180;
    const tanValue = Math.tan(rad);

    percentInput.value = (tanValue * 100).toFixed(2);
    ratio1nInput.value = tanValue.toFixed(2);
    rationn1Input.value = tanValue !== 0 ? (1 / tanValue).toFixed(2) : '';

    isCalculating = false;
}

// 入力イベント
percentInput.addEventListener('input', (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
        calculateFromPercent(value);
    }
});

ratio1nInput.addEventListener('input', (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
        calculateFromRatio1n(value);
    }
});

rationn1Input.addEventListener('input', (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
        calculateFromRationn1(value);
    }
});

degreeInput.addEventListener('input', (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0 && value < 90) {
        calculateFromDegree(value);
    }
});

// クリアボタン
clearBtn.addEventListener('click', () => {
    percentInput.value = '';
    ratio1nInput.value = '';
    rationn1Input.value = '';
    degreeInput.value = '';
});

// Service Worker登録（PWA対応）
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log('Service Worker registration failed'));
    });
}