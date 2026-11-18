
/* ---------------------------------------------------------------- trophies + daily challenges */
const MODES7 = ['count', 'numbers', 'add', 'letters', 'first', 'drive', 'place', 'colors', 'race'];
const ACH = [
  { id: 'first', ic: '🌟', fr: ['Premier pas', 'Réponds juste à une question'], en: ['First step', 'Answer a question correctly'], ok: (s) => s.st.right >= 1 },
  { id: 'streak5', ic: '🔥', fr: ['En feu !', '5 bonnes réponses de suite'], en: ['On fire!', '5 right answers in a row'], ok: (s) => s.st.best >= 5 },
  { id: 'streak10', ic: '🚀', fr: ['Fusée !', '10 bonnes réponses de suite'], en: ['Rocket!', '10 right answers in a row'], ok: (s) => s.st.best >= 10 },
  { id: 'streak20', ic: '👑', fr: ['Roi des séries', '20 bonnes réponses de suite'], en: ['Streak king', '20 right answers in a row'], ok: (s) => s.st.best >= 20 },
  { id: 'perfect', ic: '💯', fr: ['Partie parfaite', 'Une partie sans aucune erreur'], en: ['Perfect round', 'A round with no mistakes'], ok: (s) => s.st.perfect >= 1 },
  { id: 'rounds10', ic: '🎮', fr: ['Joueur', 'Termine 10 parties'], en: ['Player', 'Finish 10 rounds'], ok: (s) => s.st.rounds >= 10 },
  { id: 'rounds5day', ic: '📅', fr: ['Grande journée', '5 parties en une journée'], en: ['Big day', '5 rounds in one day'], ok: (s) => s.day && s.day.rounds >= 5 },
  { id: 'stars50', ic: '⭐', fr: ['50 étoiles', 'Gagne 50 étoiles'], en: ['50 stars', 'Earn 50 stars'], ok: (s) => s.stars >= 50 },
  { id: 'stars100', ic: '🌠', fr: ['100 étoiles', 'Gagne 100 étoiles'], en: ['100 stars', 'Earn 100 stars'], ok: (s) => s.stars >= 100 },
  { id: 'stars250', ic: '💫', fr: ['250 étoiles', 'Gagne 250 étoiles'], en: ['250 stars', 'Earn 250 stars'], ok: (s) => s.stars >= 250 },
  { id: 'stick5', ic: '🎟️', fr: ['Collectionneur', '5 autocollants'], en: ['Collector', '5 stickers'], ok: (s) => s.stickers >= 5 },
  { id: 'stick12', ic: '🎁', fr: ['Super collection', '12 autocollants'], en: ['Super collection', '12 stickers'], ok: (s) => s.stickers >= 12 },
  { id: 'stick24', ic: '🦄', fr: ['Album complet', 'Tous les autocollants'], en: ['Full album', 'Every sticker'], ok: (s) => s.stickers >= 24 },
  { id: 'explorer', ic: '🧭', fr: ['Explorateur', 'Termine une partie de chaque jeu'], en: ['Explorer', 'Finish a round of every game'], ok: (s) => MODES7.every((m) => (s.st.mode[m] || 0) > 0) },
  { id: 'driver', ic: '🚗', fr: ['Bon chauffeur', '10 bonnes routes en voiture'], en: ['Good driver', '10 right roads in Road trip'], ok: (s) => s.st.drive >= 10 },
  { id: 'speller', ic: '🔤', fr: ['Champion des mots', 'Écris 5 mots'], en: ['Word champ', 'Spell 5 words'], ok: (s) => s.st.place >= 5 },
  { id: 'lv3', ic: '🎓', fr: ['Niveau 3 !', 'Atteins le niveau 3 dans un jeu'], en: ['Level 3!', 'Reach level 3 in a game'], ok: (s) => Object.values(s.lv).some((v) => v >= 3) },
  { id: 'chal1', ic: '🎯', fr: ['Premier défi', 'Réussis un défi du jour'], en: ['First challenge', 'Complete a daily challenge'], ok: (s) => s.st.chals >= 1 },
  { id: 'chal5', ic: '🏅', fr: ['5 défis', 'Réussis 5 défis du jour'], en: ['5 challenges', 'Complete 5 daily challenges'], ok: (s) => s.st.chals >= 5 },
  { id: 'chal3', ic: '🥇', fr: ['Journée de champion', 'Réussis les 3 défis du même jour'], en: ['Champion day', 'Complete all 3 challenges in one day'], ok: (s) => s.st.alldays >= 1 },
  { id: 'days3', ic: '🗓️', fr: ['Fidèle', 'Joue 3 jours de suite'], en: ['Loyal', 'Play 3 days in a row'], ok: (s) => s.dayStreak.n >= 3 },
  { id: 'shop1', ic: '🛍️', fr: ['Premier achat', 'Achète un article à la boutique'], en: ['First purchase', 'Buy an item in the shop'], ok: (s) => s.st.bought >= 1 },
  { id: 'shop5', ic: '🎩', fr: ['Bien habillé', 'Achète 5 articles'], en: ['Dressed up', 'Buy 5 items'], ok: (s) => s.st.bought >= 5 },
  { id: 'friend1', ic: '🤝', fr: ['Premier ami', 'Aide un ami dans l’aventure'], en: ['First friend', 'Help a friend in the adventure'], ok: (s) => s.adv.friends.length >= 1 },
  { id: 'advall', ic: '🐲', fr: ['Héros de l’aventure', 'Termine l’aventure'], en: ['Adventure hero', 'Finish the adventure'], ok: (s) => s.st.adv >= 1 },
  { id: 'path1', ic: '🧭', fr: ['Premier parcours', 'Termine un parcours de Zip'], en: ['First path', 'Finish a Zip path'], ok: (s) => s.st.paths >= 1 },
  { id: 'path5', ic: '🗺️', fr: ['Grand voyageur', 'Termine 5 parcours'], en: ['Great traveler', 'Finish 5 paths'], ok: (s) => s.st.paths >= 5 },
  { id: 'skills', ic: '🎓', fr: ['Super élève', 'Joue une partie de chaque jeu de 1re année'], en: ['Super student', 'Play every 1st-grade game once'], ok: (s) => MODES_G1.every((m) => (s.st.mode[m] || 0) > 0) },
  { id: 'racer', ic: '🏁', fr: ['Pilote de course', 'Gagne une course'], en: ['Race driver', 'Win a race'], ok: (s) => s.st.race >= 1 },
  { id: 'racer3', ic: '🏎️', fr: ['Champion de course', 'Gagne 3 courses'], en: ['Race champion', 'Win 3 races'], ok: (s) => s.st.race >= 3 },
  { id: 'artist', ic: '🎨', fr: ['Artiste', 'Fais un dessin'], en: ['Artist', 'Make a drawing'], ok: (s) => s.st.art >= 1 },
  { id: 'reader', ic: '📖', fr: ['Lecteur', 'Lis une histoire'], en: ['Reader', 'Read a story'], ok: (s) => s.st.stories >= 1 },
  { id: 'reader3', ic: '📚', fr: ['Grand lecteur', 'Lis les 7 histoires'], en: ['Bookworm', 'Read all 7 stories'], ok: (s) => ['s_bibi', 's_pingo', 's_drako', 's_momo', 's_lulu', 's_zip', 's_tina'].every((k) => (s.st.mode[k] || 0) > 0) }
];

const Prog = (() => {
  const two = (n) => String(n).padStart(2, '0');
  const keyOf = (d) => d.getFullYear() + '-' + two(d.getMonth() + 1) + '-' + two(d.getDate());
  const hashStr = (s) => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
  const seeded = (seed) => () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  let streak = 0;
  const queue = []; let showing = false;

  function newDay(d) {
    const r = seeded(hashStr(d));
    const A = [{ type: 'right', n: r() < 0.5 ? 10 : 14 }, { type: 'first', n: r() < 0.5 ? 6 : 8 }, { type: 'stars', n: r() < 0.5 ? 10 : 14 }];
    const B = [{ type: 'streak', n: r() < 0.5 ? 3 : 4 }, { type: 'rounds', n: 2 }];
    const m = MODES_ALL[Math.floor(r() * MODES_ALL.length)];
    const ch = [A[Math.floor(r() * 3)], B[Math.floor(r() * 2)], { type: 'mode', n: 1, mode: m }].map((c, i) => Object.assign({ id: 'c' + i }, c));
    return { d, ch, done: {}, rounds: 0, right: 0, first: 0, stars: 0, best: 0, mode: {}, all: false };
  }
  function ensureDay() {
    const d = keyOf(new Date());
    if (!save.day || save.day.d !== d) save.day = newDay(d);
    return save.day;
  }
  function touchDay() {
    const D = ensureDay();
    if (save.dayStreak.last !== D.d) {
      const y = keyOf(new Date(Date.now() - 86400000));
      save.dayStreak.n = save.dayStreak.last === y ? save.dayStreak.n + 1 : 1; save.dayStreak.last = D.d;
    }
    return D;
  }
  const val = (c) => {
    const D = save.day;
    switch (c.type) {
      case 'right': return D.right; case 'first': return D.first; case 'stars': return D.stars;
      case 'streak': return D.best; case 'rounds': return D.rounds; case 'mode': return D.mode[c.mode] || 0;
      default: return 0;
    }
  };
  const label = (c) => {
    const n = c.n, fr = L === 'fr';
    switch (c.type) {
      case 'right': return fr ? `Réponds juste à ${n} questions` : `Answer ${n} questions correctly`;
      case 'first': return fr ? `${n} bonnes réponses du premier coup` : `${n} right answers on the first try`;
      case 'stars': return fr ? `Gagne ${n} étoiles` : `Earn ${n} stars`;
      case 'streak': return fr ? `${n} bonnes réponses de suite` : `${n} right answers in a row`;
      case 'rounds': return fr ? `Termine ${n} parties` : `Finish ${n} rounds`;
      case 'mode': return (fr ? 'Joue une partie : ' : 'Play a round: ') + (UI[L]['m_' + c.mode] || '');
      default: return '';
    }
  };

  function toast(ic, title, sub) { queue.push({ ic, title, sub }); next(); }
  function next() {
    if (showing || !queue.length) return;
    showing = true;
    const q = queue.shift(), el = $('toast');
    el.querySelector('.ti').textContent = q.ic; el.querySelector('.tt').textContent = q.title; el.querySelector('.ts').textContent = q.sub;
    el.hidden = false; el.classList.remove('out'); void el.offsetWidth; el.classList.add('in');
    Snd.star(); setTimeout(() => Snd.good(), 120);
    setTimeout(() => { el.classList.remove('in'); el.classList.add('out'); }, 3000);
    setTimeout(() => { el.hidden = true; showing = false; next(); }, 3400);
  }

  function check() {
    const D = ensureDay(); let bonus = 0;
    D.ch.forEach((c) => {
      if (!D.done[c.id] && val(c) >= c.n) { D.done[c.id] = true; save.st.chals++; bonus += 3; toast('🎯', TX[L].chalDone, label(c)); }
    });
    if (!D.all && D.ch.every((c) => D.done[c.id])) { D.all = true; save.st.alldays++; bonus += 5; toast('🥇', TX[L].chalAll, '+5 ⭐'); }
    ACH.forEach((a) => {
      if (!save.ach[a.id] && a.ok(save)) { save.ach[a.id] = true; bonus += 2; toast(a.ic, TX[L].achNew, a[L][0]); }
    });
    if (bonus) addStars(bonus);
    persist(); updateBtn();
  }
  function answer(first) {
    const D = touchDay();
    save.st.right++; D.right++;
    if (first) { save.st.first++; D.first++; streak++; } else streak = 0;
    if (streak > save.st.best) save.st.best = streak;
    if (streak > D.best) D.best = streak;
  }
  function round(mode, perfect) {
    const D = touchDay();
    save.st.rounds++; D.rounds++; D.mode[mode] = (D.mode[mode] || 0) + 1; save.st.mode[mode] = (save.st.mode[mode] || 0) + 1;
    if (perfect) save.st.perfect++;
  }
  function updateBtn() {
    const D = ensureDay(), n = D.ch.filter((c) => D.done[c.id]).length;
    $('trcount').textContent = n + '/' + D.ch.length;
  }
  function render() {
    const D = ensureDay();
    $('chal-list').innerHTML = D.ch.map((c) => {
      const v = Math.min(val(c), c.n), done = !!D.done[c.id];
      return `<div class="chal${done ? ' done' : ''}"><span class="ci">${done ? '✅' : '🎯'}</span><div class="cx"><b>${label(c)}</b><i class="bar"><u style="width:${Math.round((v / c.n) * 100)}%"></u></i></div><span class="cn">${v}/${c.n}</span></div>`;
    }).join('');
    let n = 0;
    $('ach-list').innerHTML = ACH.map((a) => {
      const on = !!save.ach[a.id]; if (on) n++;
      return `<div class="ach${on ? ' on' : ''}"><span class="ai">${on ? a.ic : '🔒'}</span><div><b>${a[L][0]}</b><small>${a[L][1]}</small></div></div>`;
    }).join('');
    $('ach-count').textContent = n + ' / ' + ACH.length;
  }
  return { toast, ensureDay, answer, miss() { streak = 0; }, round, check, render, updateBtn, get streak() { return streak; } };
})();
