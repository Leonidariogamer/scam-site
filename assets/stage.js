(function () {
  'use strict';

  /* Diagram stories. Coordinates are in a 680x410 viewBox.
     k = colour family: gray (normal), coral (malicious on the PC), purple (internet), red (stolen data / attacker).
     st = the step at which the item appears; hl = the step it is highlighted (defaults to st). */
  var CHIPS = function (st) {
    return [
      { x: 40, y: 310, w: 110, h: 44, t: 'Passwords', k: 'red', st: st },
      { x: 165, y: 310, w: 110, h: 44, t: 'Discord', k: 'red', st: st },
      { x: 290, y: 310, w: 110, h: 44, t: 'Wallets', k: 'red', st: st }
    ];
  };
  var BUS = function (st, fromY) {
    return [
      { d: 'M125 ' + fromY + 'V288', st: st, k: 'coral', head: false },
      { d: 'M95 288H345', st: st, k: 'coral', head: false },
      { d: 'M95 288V306', st: st, k: 'coral', head: true },
      { d: 'M220 288V306', st: st, k: 'coral', head: true },
      { d: 'M345 288V306', st: st, k: 'coral', head: true }
    ];
  };

  var STORIES = {
    dropper: {
      nodes: [
        { x: 40, y: 60, w: 110, h: 44, t: 'Modpack zip', k: 'gray', st: 1 },
        { x: 170, y: 60, w: 110, h: 44, t: 'Launcher', k: 'gray', st: 1 },
        { x: 300, y: 60, w: 110, h: 44, t: 'Hidden mod', k: 'coral', st: 2 },
        { x: 490, y: 60, w: 160, h: 56, t: 'File host link', s: 'java.zip', k: 'purple', st: 3 },
        { x: 40, y: 150, w: 170, h: 48, t: 'Local app data', s: 'folder named java', k: 'coral', st: 3 },
        { x: 40, y: 220, w: 170, h: 48, t: 'services.jar', s: 'second stage', k: 'coral', st: 4, hl: 5 }
      ].concat(CHIPS(6)).concat([{ x: 490, y: 304, w: 160, h: 56, t: 'Attacker', s: 'receives stolen data', k: 'red', st: 6 }]),
      arrows: [
        { d: 'M150 82H168', st: 1, k: 'gray', head: true },
        { d: 'M280 82H298', st: 2, k: 'gray', head: true },
        { d: 'M355 104V128H125V148', st: 3, k: 'coral', head: true },
        { d: 'M490 88H455V174H212', st: 3, k: 'purple', head: true, dash: true, pk: '#7F77DD' },
        { d: 'M125 198V218', st: 4, k: 'coral', head: true }
      ].concat(BUS(6, 268)).concat([{ d: 'M400 332H488', st: 6, k: 'red', head: true, dash: true, pk: '#E24B4A' }])
    },

    akita: {
      nodes: [
        { x: 40, y: 60, w: 110, h: 44, t: 'Modpack zip', k: 'gray', st: 1 },
        { x: 170, y: 60, w: 110, h: 44, t: 'Launcher', k: 'gray', st: 1 },
        { x: 300, y: 60, w: 110, h: 44, t: 'Fake mod', k: 'coral', st: 1 },
        { x: 40, y: 150, w: 170, h: 48, t: 'amcik file', s: '20 MB, scrambled', k: 'coral', st: 2 },
        { x: 40, y: 220, w: 170, h: 48, t: 'Spy program', s: 'unscrambled', k: 'coral', st: 3 },
        { x: 240, y: 220, w: 170, h: 48, t: 'Fake updater', s: 'restarts at login', k: 'coral', st: 4 }
      ].concat(CHIPS(5)).concat([{ x: 490, y: 304, w: 160, h: 56, t: 'Attacker', s: 'via a Discord bot', k: 'red', st: 5 }]),
      arrows: [
        { d: 'M150 82H168', st: 1, k: 'gray', head: true },
        { d: 'M280 82H298', st: 1, k: 'gray', head: true },
        { d: 'M355 104V128H125V148', st: 2, k: 'coral', head: true },
        { d: 'M125 198V218', st: 3, k: 'coral', head: true },
        { d: 'M210 244H238', st: 4, k: 'coral', head: true }
      ].concat(BUS(5, 268)).concat([{ d: 'M400 332H488', st: 5, k: 'red', head: true, dash: true, pk: '#E24B4A' }])
    },

    yuno: {
      nodes: [
        { x: 40, y: 60, w: 110, h: 44, t: 'Modpack zip', k: 'gray', st: 1 },
        { x: 170, y: 60, w: 110, h: 44, t: 'Launcher', k: 'gray', st: 1 },
        { x: 300, y: 60, w: 110, h: 44, t: 'swap.jar', k: 'coral', st: 2 },
        { x: 40, y: 150, w: 170, h: 48, t: 'Thief program', s: 'starts with the game', k: 'coral', st: 3 },
        { x: 240, y: 150, w: 170, h: 48, t: 'Startup shortcut', s: 'survives reboots', k: 'coral', st: 5 }
      ].concat(CHIPS(4)).concat([{ x: 490, y: 304, w: 160, h: 56, t: 'Attacker', s: 'receives stolen data', k: 'red', st: 5 }]),
      arrows: [
        { d: 'M150 82H168', st: 1, k: 'gray', head: true },
        { d: 'M280 82H298', st: 2, k: 'gray', head: true },
        { d: 'M355 104V128H125V148', st: 3, k: 'coral', head: true },
        { d: 'M210 174H238', st: 5, k: 'coral', head: true }
      ].concat(BUS(4, 198)).concat([{ d: 'M400 332H488', st: 5, k: 'red', head: true, dash: true, pk: '#E24B4A' }])
    }
  };

  function svgFor(story) {
    var s = '<svg viewBox="0 0 680 410" role="img" aria-labelledby="dg-t dg-d" focusable="false">' +
      '<title id="dg-t">Animated diagram of how the file infects a PC</title>' +
      '<desc id="dg-d">A diagram with boxes and arrows. The numbered steps beside it describe each stage in words.</desc>' +
      '<defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>' +
      '<rect x="20" y="30" width="410" height="360" rx="14" class="dg-frame"/>' +
      '<text x="40" y="48" class="dg-label">Victim PC</text><text x="490" y="48" class="dg-label">Internet</text>';
    story.arrows.forEach(function (a, i) {
      s += '<g class="dg-item" data-st="' + a.st + '"><path id="ar' + i + '" d="' + a.d + '" class="dg-arrow a-' + a.k + '"' + (a.dash ? ' stroke-dasharray="5 4"' : '') + (a.head ? ' marker-end="url(#arrow)"' : '') + '/></g>';
    });
    story.nodes.forEach(function (n) {
      var cx = n.x + n.w / 2;
      s += '<g class="dg-item dg-node n-' + n.k + '" data-st="' + n.st + '" data-hl="' + (n.hl || n.st) + '"><rect x="' + n.x + '" y="' + n.y + '" width="' + n.w + '" height="' + n.h + '" rx="8"/>';
      if (n.s) s += '<text class="dg-t" x="' + cx + '" y="' + (n.y + 18) + '" text-anchor="middle" dominant-baseline="central">' + n.t + '</text><text class="dg-s" x="' + cx + '" y="' + (n.y + n.h - 17) + '" text-anchor="middle" dominant-baseline="central">' + n.s + '</text>';
      else s += '<text class="dg-t" x="' + cx + '" y="' + (n.y + n.h / 2) + '" text-anchor="middle" dominant-baseline="central">' + n.t + '</text>';
      s += '</g>';
    });
    s += '<circle id="pkt" r="5" cx="-20" cy="-20" opacity="0"/></svg>';
    return s;
  }

  function mount(sel, id) {
    var host = document.querySelector(sel), story = STORIES[id];
    if (!host || !story) return;
    host.innerHTML = svgFor(story);
    var q = function (s) { return host.querySelector(s); };
    var items = [].slice.call(host.querySelectorAll('.dg-item'));
    var btns = [].slice.call(document.querySelectorAll('.step-btn'));
    var N = btns.length, step = 1, timer = null, raf = null, visible = true;
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    var playing = !reduce, STEP_MS = 4800, HOLD_MS = 5200;
    var live = document.getElementById('live'), bar = document.querySelector('.progress i');
    var prev = document.getElementById('prev'), next = document.getElementById('next'), tog = document.getElementById('auto'), pkt = q('#pkt');

    function send(i, color) {
      if (raf) cancelAnimationFrame(raf);
      pkt.setAttribute('opacity', '0');
      if (reduce) return;
      var p = q('#ar' + i), L = p.getTotalLength(), t0 = null, dur = 1700;
      pkt.setAttribute('fill', color); pkt.setAttribute('opacity', '1');
      function f(ts) {
        if (t0 === null) t0 = ts;
        var k = Math.min((ts - t0) / dur, 1), pt = p.getPointAtLength(k * L);
        pkt.setAttribute('cx', pt.x); pkt.setAttribute('cy', pt.y);
        if (k < 1) raf = requestAnimationFrame(f); else pkt.setAttribute('opacity', '0');
      }
      raf = requestAnimationFrame(f);
    }

    function render(animate) {
      items.forEach(function (g) {
        var s = +g.getAttribute('data-st'), h = +(g.getAttribute('data-hl') || s);
        g.classList.toggle('on', s <= step);
        g.classList.toggle('cur', s <= step && h === step);
      });
      btns.forEach(function (b, i) { if (i + 1 === step) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); });
      if (bar) bar.style.width = (step / N * 100) + '%';
      if (prev) prev.disabled = step === 1;
      if (live) { live.setAttribute('aria-live', playing ? 'off' : 'polite'); live.textContent = 'Step ' + step + ' of ' + N + ': ' + btns[step - 1].querySelector('strong').textContent + '. ' + btns[step - 1].querySelector('.txt').textContent; }
      if (animate) story.arrows.forEach(function (a, i) { if (a.pk && a.st === step) send(i, a.pk); });
      else pkt.setAttribute('opacity', '0');
    }

    function schedule() {
      clearTimeout(timer);
      if (!playing) return;
      timer = setTimeout(function () {
        if (!visible || document.hidden) { schedule(); return; }
        if (step < N) go(step + 1, true); else go(1, true);
      }, step < N ? STEP_MS : HOLD_MS);
    }
    function go(n, auto) { step = n; render(true); schedule(); if (!auto) { /* manual navigation keeps current play state */ } }
    function setPlaying(on) {
      playing = on;
      if (tog) { tog.firstChild.nodeValue = on ? 'Pause' : 'Play'; tog.setAttribute('aria-pressed', on ? 'true' : 'false'); tog.setAttribute('aria-label', on ? 'Pause the animation' : 'Play the animation'); }
      if (live) live.setAttribute('aria-live', on ? 'off' : 'polite');
      schedule();
    }
    function manual(n) { setPlaying(false); go(n, false); }

    btns.forEach(function (b, i) { b.addEventListener('click', function () { manual(i + 1); }); });
    if (next) next.addEventListener('click', function () { manual(step === N ? 1 : step + 1); });
    if (prev) prev.addEventListener('click', function () { if (step > 1) manual(step - 1); });
    if (tog) tog.addEventListener('click', function () { setPlaying(!playing); });
    document.addEventListener('keydown', function (e) {
      if (e.target && /input|textarea|select/i.test(e.target.tagName)) return;
      if (e.key === 'ArrowRight' && step < N) manual(step + 1);
      if (e.key === 'ArrowLeft' && step > 1) manual(step - 1);
    });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }, { threshold: .25 }).observe(host);

    setPlaying(playing);
    go(1, true);
  }

  window.ScamStage = { mount: mount };
})();
