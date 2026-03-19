function copyText(text, btn) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function() {
      btn.textContent = 'copied';
      setTimeout(function() { btn.textContent = 'copy'; }, 1500);
    }).catch(function() {
      fallbackCopy(text, btn);
    });
  } else {
    fallbackCopy(text, btn);
  }
}

function fallbackCopy(text, btn) {
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  btn.textContent = 'copied';
  setTimeout(function() { btn.textContent = 'copy'; }, 1500);
}

document.querySelectorAll('.code-block').forEach(function(block) {
  var label = block.querySelector('.code-label');
  var pre = block.querySelector('pre');
  if (!label || !pre) return;
  var btn = document.createElement('button');
  btn.className = 'code-copy-btn';
  btn.textContent = 'copy';
  btn.addEventListener('click', function() {
    copyText(pre.textContent, btn);
  });
  label.appendChild(btn);
});
