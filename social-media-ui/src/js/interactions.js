(function () {
  function parseCount(node) {
    if (!node) return null;
    var txt = (node.textContent || '').trim();
    var n = parseInt(txt, 10);
    return isNaN(n) ? null : n;
  }

  function replaceLastNumberInText(node, newValue) {
    var text = node.textContent || '';
    var replaced = text.replace(/(\d+)(?!.*\d)/, String(newValue));
    node.textContent = replaced;
  }

  function onLikeClick(btn) {
    var isPressed = btn.getAttribute('aria-pressed') === 'true';
    var nextPressed = !isPressed;

    // Determine current count
    var countSpan = btn.querySelector('span');
    var current = null;
    if (countSpan) {
      current = parseCount(countSpan);
    } else {
      var match = (btn.textContent || '').match(/(\d+)(?!.*\d)/);
      current = match ? parseInt(match[1], 10) : 0;
    }

    if (current === null || isNaN(current)) current = 0;

    // Compute next count
    var next = nextPressed ? current + 1 : Math.max(0, current - 1);

    // Apply UI updates
    btn.setAttribute('aria-pressed', String(nextPressed));
    if (countSpan) {
      countSpan.textContent = String(next);
    } else {
      replaceLastNumberInText(btn, next);
    }
  }

  document.addEventListener('click', function (ev) {
    var target = ev.target;
    if (!target) return;
    var btn = target.closest && target.closest('button.action[aria-pressed]');
    if (!btn) return;
    ev.preventDefault();
    onLikeClick(btn);
  });
})(); 