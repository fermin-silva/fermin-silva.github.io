(function () {
  'use strict';

  // ══════════════════════════════════════
  // ── i18n Module ──
  // ══════════════════════════════════════

  var I18N_KEY = 'gymlog_locale';
  var SUPPORTED = ['en', 'es'];
  var FALLBACK = 'en';

  var i18nData = {};
  var i18nEl = document.getElementById('i18n-data');
  if (i18nEl) {
    try { i18nData = JSON.parse(i18nEl.textContent); } catch (e) { /* ignore */ }
  }

  function getLocale() {
    var stored = localStorage.getItem(I18N_KEY);
    if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
    var nav = (navigator.language || '').slice(0, 2).toLowerCase();
    return SUPPORTED.indexOf(nav) !== -1 ? nav : FALLBACK;
  }

  function setLocale(loc) {
    localStorage.setItem(I18N_KEY, loc);
  }

  var currentLocale = getLocale();

  function t(key) {
    function resolve(obj, key) {
      var parts = key.split('.');
      for (var i = 0; i < parts.length; i++) {
        if (obj == null || typeof obj !== 'object') return undefined;
        obj = obj[parts[i]];
      }
      return (obj != null && typeof obj !== 'object') ? String(obj) : undefined;
    }
    var lang = i18nData[currentLocale] || {};
    return resolve(lang, key) || resolve(i18nData[FALLBACK] || {}, key) || key;
  }

  function applyLocale() {
    document.documentElement.lang = currentLocale;

    // data-i18n="key" → lookup from i18nData
    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      els[i].textContent = t(els[i].getAttribute('data-i18n'));
    }

    // data-i18n-en / data-i18n-es → use direct attribute
    var inlineEls = document.querySelectorAll('[data-i18n-en]');
    for (var j = 0; j < inlineEls.length; j++) {
      var el = inlineEls[j];
      el.textContent = el.getAttribute('data-i18n-' + currentLocale) ||
                       el.getAttribute('data-i18n-en');
    }

    // data-i18n-count + data-i18n-unit → "N translated-word"
    var unitEls = document.querySelectorAll('[data-i18n-unit]');
    for (var k = 0; k < unitEls.length; k++) {
      var uel = unitEls[k];
      uel.textContent = uel.getAttribute('data-i18n-count') + ' ' + t(uel.getAttribute('data-i18n-unit'));
    }

    // Update <title>
    var rp = document.querySelector('.routine-page');
    if (rp) {
      var rName = rp.getAttribute('data-name-' + currentLocale) ||
                  rp.getAttribute('data-name-en');
      if (rName) document.title = rName + ' \u2014 GymLog';
    }
  }

  // ── Language toggle ──
  var langSwitch = document.querySelector('.lang-switch');
  if (langSwitch) {
    langSwitch.addEventListener('click', function () {
      currentLocale = currentLocale === 'en' ? 'es' : 'en';
      setLocale(currentLocale);
      applyLocale();
      // Re-render week label if on routine page
      if (typeof renderWeek === 'function') renderWeek();
    });
  }

  // ── Hamburger menu ──
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
    });
  }

  // ── Apply locale immediately (before routine logic) ──
  applyLocale();

  // ══════════════════════════════════════
  // ── Routine page logic ──
  // ══════════════════════════════════════

  var routinePage = document.querySelector('.routine-page');
  if (!routinePage) return; // landing page — done

  var slug = routinePage.dataset.slug;
  var weekOffset = 0;

  var weekLabel = document.querySelector('.week-label');
  var prevBtn = document.querySelector('.week-prev');
  var nextBtn = document.querySelector('.week-next');
  var checkboxes = routinePage.querySelectorAll('.exercise-item input[type="checkbox"]');

  if (!prevBtn || !nextBtn || !weekLabel) return;

  // ── Date helpers ──

  function getMondayOfWeek(offset) {
    var now = new Date();
    var day = now.getDay();
    var diff = day === 0 ? -6 : 1 - day;
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() + diff + offset * 7);
  }

  function getISOWeek(date) {
    var d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return d.getUTCFullYear() + '-W' + String(weekNo).padStart(2, '0');
  }

  function formatWeekLabel(monday) {
    var langData = i18nData[currentLocale] || i18nData[FALLBACK] || {};
    var months = langData.months || ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    var start = months[monday.getMonth()] + ' ' + monday.getDate();
    var end = months[sunday.getMonth()] + ' ' + sunday.getDate();
    return start + ' \u2013 ' + end;
  }

  function storageKey() {
    return 'gymlog_' + slug + '_' + getISOWeek(getMondayOfWeek(weekOffset));
  }

  // ── Load / save state ──

  function loadState() {
    try {
      return JSON.parse(localStorage.getItem(storageKey())) || {};
    } catch (e) {
      return {};
    }
  }

  function saveState(state) {
    localStorage.setItem(storageKey(), JSON.stringify(state));
  }

  // ── Render ──

  // Expose renderWeek so lang toggle can call it
  window.renderWeek = renderWeek;

  function renderWeek() {
    var monday = getMondayOfWeek(weekOffset);
    weekLabel.textContent = formatWeekLabel(monday);
  }

  function render() {
    renderWeek();
    nextBtn.disabled = weekOffset >= 0;

    var state = loadState();

    for (var i = 0; i < checkboxes.length; i++) {
      var cb = checkboxes[i];
      var item = cb.closest('.exercise-item');
      var key = item.dataset.key;
      var checked = !!state[key];
      cb.checked = checked;
      item.classList.toggle('checked', checked);
    }

    updateAllProgress();
  }

  // ── Progress counters ──

  function updateAllProgress() {
    var sections = routinePage.querySelectorAll('.exercise-section');
    for (var i = 0; i < sections.length; i++) {
      var section = sections[i];
      var items = section.querySelectorAll('.exercise-item');
      var checkedItems = section.querySelectorAll('.exercise-item.checked');
      var counter = section.querySelector('.progress-counter');
      if (counter) {
        counter.textContent = checkedItems.length + ' / ' + items.length;
      }
    }
  }

  // ── Events ──

  prevBtn.addEventListener('click', function () {
    weekOffset--;
    render();
  });

  nextBtn.addEventListener('click', function () {
    if (weekOffset < 0) {
      weekOffset++;
      render();
    }
  });

  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('change', function () {
      var item = this.closest('.exercise-item');
      var key = item.dataset.key;
      item.classList.toggle('checked', this.checked);

      var state = loadState();
      state[key] = this.checked;
      saveState(state);

      updateAllProgress();
    });
  }

  // ── PWA Install ──

  var deferredPrompt = null;
  var installBtn = document.createElement('button');
  installBtn.className = 'install-btn';
  installBtn.innerHTML = '<span class="install-icon">&#8615;</span> ' + t('install.button');
  document.body.appendChild(installBtn);

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.classList.add('visible');
  });

  installBtn.addEventListener('click', function () {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function () {
      deferredPrompt = null;
      installBtn.classList.remove('visible');
    });
  });

  window.addEventListener('appinstalled', function () {
    installBtn.classList.remove('visible');
    deferredPrompt = null;
  });

  // ── iOS Safari: show install button that triggers a share-sheet tooltip ──
  var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  var isInStandalone = window.navigator.standalone === true;

  if (isIOS && !isInStandalone) {
    installBtn.classList.add('visible');
    installBtn.addEventListener('click', function () {
      // Open native share sheet (requires HTTPS — works on production)
      if (navigator.share) {
        navigator.share({ title: document.title, url: window.location.href }).catch(function () {});
      }
      // Always show tooltip
      var tip = document.querySelector('.ios-install-tip');
      if (!tip) {
        tip = document.createElement('div');
        tip.className = 'ios-install-tip';
        tip.innerHTML = t('install.ios_hint');
        document.body.appendChild(tip);
        setTimeout(function () { if (tip) tip.remove(); }, 5000);
      }
    });
  }

  // ── Service Worker Registration ──

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/rutina/' }).catch(function () {});
  }

  // ── Init ──
  render();
})();
