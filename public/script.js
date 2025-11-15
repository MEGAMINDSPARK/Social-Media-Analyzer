const fileInput = document.getElementById('fileInput');
const uploadZone = document.getElementById('uploadZone');
const textInput = document.getElementById('textInput');
const extractBtn = document.getElementById('extractBtn');
const analyzeBtn = document.getElementById('analyzeBtn');

const extractedTextEl = document.getElementById('extractedText');
const suggestionsEl = document.getElementById('suggestions');
const qualityScoreEl = document.getElementById('qualityScore');
const sentimentLabelEl = document.getElementById('sentimentLabel');
const suggestCountEl = document.getElementById('suggestCount');
const meterFill = document.getElementById('meterFill');
const skeletonWrap = document.getElementById('skeletonWrap');

let selectedFile = null;

fileInput.addEventListener('change', () => {
  if (fileInput.files.length > 0) {
    selectedFile = fileInput.files[0];
    extractedTextEl.textContent = 'File ready — click Extract Text';
  }
});

/* Drag & Drop */
uploadZone.addEventListener('dragenter', (e) => {
  e.preventDefault();
  uploadZone.classList.add('dragover');
});
uploadZone.addEventListener('dragover', (e) => e.preventDefault());
uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('dragover'));
uploadZone.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadZone.classList.remove('dragover');
  const f = e.dataTransfer.files?.[0];
  if (f) {
    selectedFile = f;
    fileInput.value = ''; // Clear file input to avoid conflict
    extractedTextEl.textContent = 'File ready — click Extract Text';
  }
});

/* Skeleton helper */
function showSkeleton(on = true) {
  skeletonWrap.innerHTML = on
    ? `<div style="width:120px;height:14px;background:linear-gradient(90deg,#eef2ff,#f7f9ff,#eef2ff);border-radius:8px;animation:sk 1s linear infinite"></div>`
    : '';
}

/* Backend calls */
async function postFile(file) {
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch('/upload', { method: 'POST', body: fd });
  return res.json();
}
async function postAnalyze(text) {
  const res = await fetch('/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  return res.json();
}

/* Extract button */
extractBtn.addEventListener('click', async () => {
  if (!selectedFile) {
    extractedTextEl.textContent = 'No file selected — paste text or upload a file first.';
    return;
  }
  showSkeleton(true);
  extractedTextEl.textContent = 'Extracting…';
  try {
    const data = await postFile(selectedFile);
    showSkeleton(false);
    if (data?.ok) {
      const t = data.text || '';
      textInput.value = t;
      extractedTextEl.textContent = t || '(no text found)';
    } else {
      extractedTextEl.textContent = 'Extraction error: ' + (data?.error || 'Unknown');
    }
  } catch (err) {
    showSkeleton(false);
    extractedTextEl.textContent = 'Extraction failed: ' + (err.message || err);
  }
});

/* Analyze button */
analyzeBtn.addEventListener('click', async () => {
  const text = (textInput.value || '').trim();
  if (!text) {
    alert('Please paste or extract some text before analyzing.');
    return;
  }

  suggestionsEl.innerHTML = '';
  qualityScoreEl.textContent = '…';
  sentimentLabelEl.textContent = '…';
  suggestCountEl.textContent = '…';
  meterFill.style.width = '0%';
  showSkeleton(true);

  try {
    const res = await postAnalyze(text);
    showSkeleton(false);

    if (!res?.ok) {
      suggestionsEl.innerHTML = `<li>${escapeHtml(res?.error || 'Analyze failed')}</li>`;
      return;
    }

    const sug = res.suggestions || [];
    suggestionsEl.innerHTML = sug.length
      ? sug.map(s => `<li>${escapeHtml(s)}</li>`).join('')
      : '<li>No suggestions — your post looks optimized.</li>';

    const score = Math.max(20, Math.min(98, 82 - (sug.length * 6)));
    qualityScoreEl.textContent = `${score}%`;

    const sentiment = inferSentiment(sug);
    sentimentLabelEl.textContent = sentiment.label;
    sentimentLabelEl.className = sentiment.className || '';
    suggestCountEl.textContent = sug.length;
    meterFill.style.width = sentiment.value + '%';
  } catch (err) {
    showSkeleton(false);
    suggestionsEl.innerHTML = `<li>Error: ${escapeHtml(err.message || err)}</li>`;
  }
});

/* Helpers */
function escapeHtml(s) {
  return String(s).replace(/[&<>"]/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'
  }[m]));
}
function inferSentiment(suggestions) {
  const txt = (suggestions || []).join(' ').toLowerCase();
  if (txt.includes('negative') || txt.includes('reframe')) {
    return { label: 'Negative', value: 12, className: 'muted bad' };
  }
  if (
    txt.includes('positive') ||
    txt.includes('good for engagement') ||
    txt.includes('tone is positive')
  ) {
    return { label: 'Positive', value: 86, className: 'positive' };
  }
  return { label: 'Neutral', value: 48, className: 'muted' };
}