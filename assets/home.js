(function () {
  'use strict';
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Count-up for the stats strip (static when reduced motion is requested). */
  var counts = [].slice.call(document.querySelectorAll('.count'));
  function run(el) {
    var to = +el.getAttribute('data-to');
    if (reduce || to === 0) { el.textContent = to; return; }
    var t0 = null;
    function f(ts) {
      if (t0 === null) t0 = ts;
      var k = Math.min((ts - t0) / 900, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(f);
    }
    requestAnimationFrame(f);
  }
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: .6 });
    counts.forEach(function (c) { c.textContent = '0'; io.observe(c); });
  }

  /* Quiz: three rounds built from the real samples. */
  var LIST = ['Sodium', 'Lithium', 'Iris Shaders', 'Fabric API', 'Mod Menu'];
  var ROUNDS = [
    { q: 'The pack lists five mods. One file in the mods folder is not on that list. Which one?', list: LIST,
      files: [['sodium.jar', '1.1 MB'], ['lithium.jar', '0.6 MB'], ['iris.jar', '2.1 MB'], ['fabric-api.jar', '2.4 MB'], ['modmenu.jar', '0.3 MB'], ['performance-helper.jar', '19 MB']], ans: 5,
      why: 'It is not on the pack’s list, and it is far larger than a performance tweak should be. In the "pack with no mods" sample, the single file in the mods folder was a 19 MB stealer. An unlisted file in a mods folder deserves suspicion.' },
    { q: 'Every name matches the list this time, but one file has the wrong size. Which one?', list: ['Sodium', 'Lithium', 'Iris Shaders', 'Fabric API'],
      files: [['sodium.jar', '1.1 MB'], ['lithium.jar', '0.6 MB'], ['iris.jar', '2.1 MB'], ['fabric-api-0.118.7.jar', '19 MB']], ans: 3,
      why: 'The real Fabric API is only a few megabytes. A 19 MB file with the same name hides something else inside, as in the "fake Fabric API" sample, where a 20 MB scrambled program sat inside the jar.' },
    { q: 'Look at each mod’s details. Which one does not add up?', list: null,
      files: [['Sodium', 'by JellySquid · 1.1 MB'], ['Lithium', 'by JellySquid · 0.6 MB'], ['Performance Helper', 'by "Mojang" · 6 KB · "logs on load"'], ['Iris Shaders', 'by coderbot · 2.1 MB']], ans: 2,
      why: 'Mojang does not publish mods like this one. A tiny file with a vague description and an official-sounding author is typical of a dropper, like the extra mod in the BetterSurvival sample.' }
  ];

  var root = document.getElementById('quiz-root');
  if (!root) return;
  var round = 0, score = 0, answered = false;

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  function render() {
    root.innerHTML = '';
    if (round >= ROUNDS.length) { done(); return; }
    var r = ROUNDS[round]; answered = false;
    var head = el('div', 'q-head');
    head.appendChild(el('span', 'chip', 'Round ' + (round + 1) + ' of ' + ROUNDS.length));
    head.appendChild(el('span', 'q-score', 'Score: ' + score));
    root.appendChild(head);
    root.appendChild(el('p', 'q-q', r.q));
    var grid = el('div', 'q-grid');
    if (r.list) {
      var left = el('div', 'panel'); left.appendChild(el('h3', null, 'What the pack lists'));
      var ul = el('ul', 'q-list'); r.list.forEach(function (n) { ul.appendChild(el('li', null, n)); }); left.appendChild(ul); grid.appendChild(left);
    }
    var right = el('div', 'panel'); right.appendChild(el('h3', null, r.list ? 'What is in the mods folder' : 'Mod details'));
    var wrap = el('div', 'q-files'); wrap.setAttribute('role', 'group'); wrap.setAttribute('aria-label', 'Choose one');
    r.files.forEach(function (f, i) {
      var b = el('button', 'q-file'); b.type = 'button';
      b.appendChild(el('strong', null, f[0])); b.appendChild(el('span', null, f[1]));
      var tag = el('span', 'q-tag'); tag.setAttribute('aria-hidden', 'true'); b.appendChild(tag);
      b.addEventListener('click', function () { pick(i, wrap, r); });
      wrap.appendChild(b);
    });
    right.appendChild(wrap); grid.appendChild(right); root.appendChild(grid);
    var fb = el('div', 'q-fb'); fb.setAttribute('role', 'status'); fb.setAttribute('aria-live', 'polite'); root.appendChild(fb);
  }

  function pick(i, wrap, r) {
    if (answered) return; answered = true;
    var ok = i === r.ans; if (ok) score++;
    [].forEach.call(wrap.children, function (b, k) {
      b.setAttribute('aria-disabled', 'true');
      if (k === r.ans) { b.classList.add('right'); b.querySelector('.q-tag').textContent = '✓ The odd one'; }
      else if (k === i) { b.classList.add('wrong'); b.querySelector('.q-tag').textContent = '✗ Not this one'; }
    });
    var fb = root.querySelector('.q-fb');
    fb.innerHTML = '';
    fb.appendChild(el('p', 'q-res', ok ? 'Correct.' : 'Not quite.'));
    fb.appendChild(el('p', null, r.why));
    var nx = el('button', 'btn primary', round === ROUNDS.length - 1 ? 'See your result' : 'Next round'); nx.type = 'button';
    nx.addEventListener('click', function () { round++; render(); var h = document.getElementById('quiz-h'); if (h) h.scrollIntoView({ block: 'start' }); });
    fb.appendChild(nx); nx.focus();
    root.querySelector('.q-score').textContent = 'Score: ' + score;
  }

  function done() {
    var msg = score === 3 ? 'You caught all three.' : score === 2 ? 'Two out of three. Good eye.' : score === 1 ? 'One out of three. These are designed to be easy to miss.' : 'None this time. That is exactly why these work.';
    var box = el('div', 'q-done');
    box.appendChild(el('p', 'q-big', score + ' / ' + ROUNDS.length));
    box.appendChild(el('p', null, msg + ' Each sample page shows the same warning signs in more detail.'));
    var again = el('button', 'btn ghost', 'Play again'); again.type = 'button';
    again.addEventListener('click', function () { round = 0; score = 0; render(); });
    var go = el('a', 'btn primary', 'Read the samples'); go.href = '#samples';
    var row = el('div', 'actions'); row.appendChild(go); row.appendChild(again); box.appendChild(row);
    root.appendChild(box);
  }

  render();
})();
