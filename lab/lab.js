// 掃碼體驗室共用：教學模擬橫幅、揭曉流程、網址參數。所有模擬都只在這支手機的瀏覽器裡執行，不會送出任何資料。
const LAB = {
  param(name, fallback = '') { return new URLSearchParams(location.search).get(name) ?? fallback; },
  banner(root = '..') {
    const b = document.createElement('div');
    b.className = 'sim-banner';
    b.innerHTML = '<b>教學模擬</b><span>IoT 資安課程｜本頁不會傳送或保存你輸入的任何內容</span>' +
                  `<a href="${root}/index.html">回體驗室</a>`;
    document.body.prepend(b);
  },
  // steps: [{text, note, state:'done'|'stop'|'harm'}]
  steps(el, steps) {
    el.innerHTML = '<ol class="steps">' + steps.map(s =>
      `<li class="${s.state}">${s.text}${s.note ? `<small>${s.note}</small>` : ''}</li>`).join('') + '</ol>';
  },
  show(id) { const e = document.getElementById(id); e.classList.add('show'); e.scrollIntoView({behavior: 'smooth', block: 'start'}); },
  // 送出前清空表單：模擬頁永遠不讀取、不保存輸入內容。
  wipe(form) { form.querySelectorAll('input[type=text]').forEach(i => { i.value = ''; }); },
};
// 主要網域（教學版）：與 qr_python/lab_core.py 同規則，另加入 github.io（公共後綴清單也收錄它）。
LAB.SUFFIXES = new Set(['example','test','com','net','org','edu','gov','tw','io','com.tw','net.tw','org.tw','edu.tw','gov.tw','idv.tw','github.io']);
LAB.mainDomain = host => {
  if (!host) return null;
  const labels = host.toLowerCase().replace(/\.$/, '').split('.');
  if (labels.every(l => /^\d+$/.test(l)) || host.includes(':')) return null;
  for (let size = labels.length; size > 0; size--) {
    const suffix = labels.slice(-size).join('.');
    if (LAB.SUFFIXES.has(suffix)) return size === labels.length ? null : labels.slice(-size - 1).join('.');
  }
  return null;
};
