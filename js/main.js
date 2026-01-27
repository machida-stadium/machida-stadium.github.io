/* ---------------------------------------------------------
   ニュースデータ管理
   --------------------------------------------------------- */

const NEWS_DATA = [

    {
        date: "2026.01.27",
        category: "Notice",
        title: "【メンバー募集】町田の未来を共に描く仲間を募集します！",
        description: "町田の未来を共に考え、行動してくれるメンバーを募集いたします。",
        image: "../images/news-002.png", 
        url: "news-002.html"
    }   ,
    {
        date: "2026.01.27",
        category: "Notice",
        title: "「町田駅周辺にスタジアムを推進する会」公式サイトを仮オープンいたしました。",
        description: "本日、公式サイトを仮公開いたしました。町田駅周辺へのスタジアム構想の情報を順次発信してまいります。",
        image: "../images/news-001.png", // 画像がない場合は自動で「NO IMAGE」になります
        url: "news-001.html"
    }   ,
];

document.addEventListener('DOMContentLoaded', () => {
    // 1. モバイルメニューの制御
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden'); // メニューを表示/非表示
        menuBtn.classList.toggle('active');   // 三本線を「✕」に変える
    });

    // お問い合わせフォームの簡易バリデーション (contact.html用)
    const contactForm = document.querySelector('form');
    if (contactForm && window.location.pathname.includes('contact')) {
        contactForm.addEventListener('submit', () => {
            // 送信ボタンを無効化して二重送信を防止
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerText = "SENDING...";
            }
        });
    }
}
    /**
     * 画像表示用のHTMLを生成する関数
     * 画像がある場合は <img>、ない場合は NO IMAGE のプレースホルダーを返す
     */
    const renderNewsImage = (imgUrl) => {
        if (imgUrl && imgUrl.trim() !== "") {
            return `<div class="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style="background-image: url('${imgUrl}');"></div>`;
        } else {
            // 画像がない場合の「NO IMAGE」デザイン（ネイビーの背景に白文字）
            return `
                <div class="w-full h-full bg-slate-200 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                    <div class="text-center">
                        <div class="text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase mb-1">No Image</div>
                        <div class="w-8 h-[1px] bg-slate-300 mx-auto"></div>
                    </div>
                </div>
            `;
        }
    };

    // 2. トップページの「最新3件」自動表示
    const homeNewsContainer = document.getElementById('news-list-container');
    if (homeNewsContainer) {
        const latestNews = NEWS_DATA.slice(0, 3);
        let html = '';
        latestNews.forEach(item => {
            html += `
                <a href="${item.url}" class="group block no-underline">
                    <div class="overflow-hidden rounded-2xl mb-6 aspect-video bg-gray-100">
                        ${renderNewsImage(item.image)}
                    </div>
                    <div class="space-y-3">
                        <div class="flex items-center gap-4">
                            <span class="text-[10px] font-black py-1 px-3 bg-blue-50 text-blue-600 rounded-full tracking-widest uppercase">${item.category}</span>
                            <time class="text-[10px] font-bold text-gray-400 font-accent uppercase tracking-widest">${item.date}</time>
                        </div>
                        <h4 class="text-lg font-black text-blue-900 group-hover:text-blue-600 transition-colors leading-snug">${item.title}</h4>
                    </div>
                </a>
            `;
        });
        homeNewsContainer.innerHTML = html;
    }

    // 3. ニュース一覧ページの「全件」自動表示
    const archiveNewsContainer = document.getElementById('news-archive-container');
    if (archiveNewsContainer) {
        let html = '';
        NEWS_DATA.forEach(item => {
            html += `
                <article class="news-card bg-white rounded-2xl overflow-hidden border border-gray-100 mb-6">
                    <a href="${item.url}" class="flex flex-col md:flex-row no-underline group">
                        <div class="md:w-1/3 aspect-video md:aspect-auto overflow-hidden bg-gray-100">
                            ${renderNewsImage(item.image)}
                        </div>
                        <div class="p-8 md:w-2/3 flex flex-col justify-center">
                            <div class="flex items-center gap-4 mb-4">
                                <span class="text-[9px] font-black py-1 px-3 bg-blue-50 text-blue-600 rounded-full tracking-widest uppercase">${item.category}</span>
                                <time class="text-[10px] font-bold text-gray-400 font-accent uppercase tracking-widest">${item.date}</time>
                            </div>
                            <h3 class="text-xl md:text-2xl font-black text-blue-900 mb-4 group-hover:text-blue-600 transition">${item.title}</h3>
                            <p class="text-sm text-gray-500 line-clamp-2 leading-relaxed">${item.description}</p>
                        </div>
                    </a>
                </article>
            `;
        });
        archiveNewsContainer.innerHTML = html;
    }
});

/**
 * =========================================================
 * 1. Google Analytics (gtag.js) 一括配信設定
 * =========================================================
 * このJSを読み込んでいるすべてのHTMLで統計が取れるようになります。
 */
(function() {
    const GA_ID = "G-SPDYE4FYEV"; // あなたの測定ID

    // Google Analytics スクリプトを動的にヘッドに追加
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    // dataLayerの設定
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = gtag; // グローバルにアクセス可能にする
    gtag('js', new Date());

    // ページビューを送信
    gtag('config', GA_ID);
})();

/**
 * FAQアコーディオンの制御ロジック
 */
window.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            
            // 1つだけ開くように、他の項目をすべて閉じる
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // クリックした項目の表示/非表示を切り替える
            item.classList.toggle('active');
        });
    });
});

/**
 * SNSシェア機能（X, LINE, リンクコピー）
 */
function shareOnX() {
    const text = "町田駅周辺に、スタジアムを。未来の町田を作るプロジェクトが始動しました。";
    const url = window.location.href;
    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(xUrl, '_blank');
}

function shareOnLine() {
    const url = window.location.href;
    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`;
    window.open(lineUrl, '_blank');
}

function copyPageLink() {
    const url = window.location.href;
    const tempInput = document.createElement("input");
    document.body.appendChild(tempInput);
    tempInput.value = url;
    tempInput.select();
    document.execCommand("copy"); 
    document.body.removeChild(tempInput);

    const msg = document.getElementById("copy-message");
    if (msg) {
        msg.style.opacity = "1";
        setTimeout(() => { msg.style.opacity = "0"; }, 2000);
    }
}