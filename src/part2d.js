
/* ---------------------------------------------------------------- 1st-grade skills, menu meta, path text */
const APP_VERSION = '2026-11-18.18';
const G1 = ['sub', 'compare', 'clock', 'shapes', 'pattern', 'sight', 'syl', 'rhyme'];
const MODES_G1 = G1;
const MODES_ALL = MODES7.concat(G1, ['geo', 'hunt', 'planets']);
const MODE_META = {
  count: { ico: '🍎', cls: 'm1', cat: 'math', d: { fr: 'Compte les objets', en: 'Count the objects' } },
  numbers: { ico: '7', cls: 'm2', cat: 'math', d: { fr: 'Reconnais les nombres', en: 'Find the numbers' } },
  add: { ico: '2+1', cls: 'm3', cat: 'math', d: { fr: 'Fais des additions', en: 'Add things up' } },
  sub: { ico: '5−2', bg: '#7fd6ff', cat: 'math', d: { fr: 'Fais des soustractions', en: 'Take things away' } },
  compare: { ico: '⚖️', bg: '#ffb36b', cat: 'math', d: { fr: 'Plus grand ou plus petit ?', en: 'Bigger or smaller?' } },
  pattern: { ico: '🔁', bg: '#c9b2ff', cat: 'math', d: { fr: 'Continue la suite', en: 'Continue the pattern' } },
  clock: { ico: '🕒', bg: '#ffe27a', cat: 'math', d: { fr: 'Lis l’heure', en: 'Read the clock' } },
  shapes: { ico: '🔷', bg: '#8fe0c8', cat: 'math', d: { fr: 'Reconnais les formes', en: 'Name the shapes' } },
  letters: { ico: 'Aa', cls: 'm4', cat: 'read', d: { fr: 'Trouve les lettres', en: 'Find the letters' } },
  first: { ico: '🐱', cls: 'm5', cat: 'read', d: { fr: 'Par quelle lettre ça commence ?', en: 'What letter does it start with?' } },
  place: { ico: '🧩', cls: 'm7', cat: 'read', d: { fr: 'Écris des mots', en: 'Spell the words' } },
  sight: { ico: '👀', bg: '#ffc08a', cat: 'read', d: { fr: 'Les mots qu’on voit partout', en: 'Words you see everywhere' } },
  syl: { ico: '👏', bg: '#ff9ec1', cat: 'read', d: { fr: 'Compte les syllabes', en: 'Clap the syllables' } },
  rhyme: { ico: '🎵', bg: '#9fe3ff', cat: 'read', d: { fr: 'Trouve la rime', en: 'Find the rhyme' } },
  drive: { ico: '🚗', cls: 'm6', cat: 'fun', d: { fr: 'Conduis vers la bonne réponse', en: 'Drive to the right answer' } },
  race: { ico: '🏎️', cls: 'm9', cat: 'fun', d: { fr: 'Course : bonnes réponses = vitesse', en: 'Race: right answers = speed' } },
  colors: { ico: '🎨', cls: 'm8', cat: 'disc', d: { fr: 'Apprends les couleurs', en: 'Learn the colors' } },
  planets: { ico: '🪐', bg: '#cbb8ff', cat: 'disc', d: { fr: 'Voyage dans l’espace', en: 'Travel through space' } },
  geo: { ico: '🌍', bg: '#8fd7a8', cat: 'disc', d: { fr: 'Découvre le monde', en: 'Discover the world' } },
  hunt: { ico: '🔍', bg: '#b9d8ff', cat: 'disc', d: { fr: 'Trouve les formes autour de toi', en: 'Find shapes around you' } },
  story: { ico: '📖', bg: '#ffd9a0', cat: 'fun', d: { fr: 'Lis une histoire', en: 'Read a story' } }
};
const CAT_ORDER = { math: ['count', 'numbers', 'add', 'sub', 'compare', 'pattern', 'clock', 'shapes'], read: ['letters', 'first', 'place', 'sight', 'syl', 'rhyme'], fun: ['drive', 'race'], disc: ['colors', 'geo', 'hunt', 'planets'] };
Object.assign(UI.fr, {
  m_sub: 'Soustractions', m_compare: 'Plus ou moins', m_clock: 'L’heure', m_shapes: 'Les formes', m_pattern: 'Les suites', m_sight: 'Mots usuels', m_syl: 'Syllabes', m_rhyme: 'Les rimes', m_story: 'Histoire',
  cat_math: 'Maths', cat_read: 'Lecture', cat_fun: 'Jeux', cat_disc: 'Découvrir', who_edit: '✏️ Modifier', who_done: '✔ Terminé', add_short: 'Ajouter', pe_new: 'Nouveau joueur', pe_edit: 'Modifier le joueur', pe_first: 'Comment tu t’appelles ?', pe_ok: 'OK', pe_del: 'Supprimer ce joueur', m_planets: 'Planètes', st_player: 'Joueur', add_player: '➕ Nouveau joueur', who: 'Qui joue ?', st_data: 'Progression', reset: 'Effacer la progression', del_player: 'Supprimer ce joueur', sure: 'Sûr ? Touche encore', nostore: 'Ce navigateur ne garde pas la progression (mode privé ?)', pl_player: 'Joueur', st_name: 'Prénom', name_ph: 'Écris ton prénom', hi_name: (n) => `Salut ${n} !`, made_with: 'Fait avec Claude', claude_say: 'Salut ! C’est Claude. J’ai aidé à faire ce jeu pour toi. Amuse-toi bien !', m_geo: 'Le monde', m_hunt: 'Chasse aux formes', settings: 'Réglages', upd_btn: 'Chercher une mise à jour', upd_checking: 'Vérification…', upd_ok: 'Le jeu est à jour ✓', upd_new: 'Nouvelle version ! Mise à jour…', upd_fail: 'Impossible de vérifier (pas de connexion ?)', upd_na: 'La mise à jour marche seulement sur le site web', ver: 'Version', st_updates: 'Mises à jour', st_sound: 'Son', play: 'Jouer', play_sub: 'Le parcours du jour', path_title: 'Le parcours de Zip', path_more: 'Un autre parcours', path_menu: 'Menu'
});
Object.assign(UI.en, {
  m_sub: 'Subtracting', m_compare: 'More or less', m_clock: 'Clock', m_shapes: 'Shapes', m_pattern: 'Patterns', m_sight: 'Sight words', m_syl: 'Syllables', m_rhyme: 'Rhymes', m_story: 'Story',
  cat_math: 'Math', cat_read: 'Reading', cat_fun: 'Games', cat_disc: 'Discover', who_edit: '✏️ Edit', who_done: '✔ Done', add_short: 'Add', pe_new: 'New player', pe_edit: 'Edit player', pe_first: 'What is your name?', pe_ok: 'OK', pe_del: 'Delete this player', m_planets: 'Planets', st_player: 'Player', add_player: '➕ New player', who: 'Who is playing?', st_data: 'Progress', reset: 'Erase progress', del_player: 'Delete this player', sure: 'Sure? Tap again', nostore: 'This browser is not saving progress (private mode?)', pl_player: 'Player', st_name: 'Name', name_ph: 'Type your name', hi_name: (n) => `Hi ${n}!`, made_with: 'Made with Claude', claude_say: 'Hi! It’s Claude. I helped make this game for you. Have fun!', m_geo: 'My world', m_hunt: 'Shape hunt', settings: 'Settings', upd_btn: 'Check for updates', upd_checking: 'Checking…', upd_ok: 'The game is up to date ✓', upd_new: 'New version! Updating…', upd_fail: 'Could not check (no connection?)', upd_na: 'Updates only work on the website', ver: 'Version', st_updates: 'Updates', st_sound: 'Sound', play: 'Play', play_sub: 'Today’s path', path_title: 'Zip’s path', path_more: 'Another path', path_menu: 'Menu'
});
const PX = {
  fr: { step: (n, t, name, d) => `Étape ${n} sur ${t} : ${name}. ${d} !`, nice: ['Bravo', 'Super', 'Génial', 'Bien joué'], done: `Parcours terminé ! Reviens demain pour un nouveau parcours !`, sub: (i, t) => i >= t ? 'Parcours terminé ✓' : `Étape ${i + 1} sur ${t}`, doneT: '🎉 Parcours terminé !', doneS: (s) => `+${s} ⭐` },
  en: { step: (n, t, name, d) => `Step ${n} of ${t}: ${name}. ${d}!`, nice: ['Great job', 'Awesome', 'Super', 'Well done'], done: `Path complete! Come back tomorrow for a new path!`, sub: (i, t) => i >= t ? 'Path complete ✓' : `Step ${i + 1} of ${t}`, doneT: '🎉 Path complete!', doneS: (s) => `+${s} ⭐` }
};

const fr_ = () => L === 'fr';
const sayN = (n) => (NUMW[L][n] !== undefined ? NUMW[L][n] : String(n));
function numOpts(n, min, max, count, spread = 3) {
  const set = new Set([n]); let g = 0;
  while (set.size < count && g++ < 120) { const v = n + ri(-spread, spread); if (v >= min && v <= max) set.add(v); }
  for (let v = min; set.size < count && v <= max; v++) set.add(v);
  return shuffle([...set]).map((v) => ({ val: String(v), label: String(v), say: sayN(v) }));
}
const wordOpts = (ans, others, say) => shuffle([ans].concat(others)).map((w) => ({ val: w, label: w, say: say ? say(w) : w }));

GEN.sub = function (lv) {
  let a, b, max = 10;
  if (lv === 1) { a = ri(2, 5); b = ri(1, a - 1); max = 5; }
  else if (lv === 2) { a = ri(4, 10); b = ri(1, a - 1); }
  else { a = ri(11, 20); b = ri(2, 9); max = 20; }
  const r = a - b, em = pick(ITEMS).e;
  const vis = a <= 10 ? rowsOf(a, a > 6 ? 26 : 32, b, em) + `<div class="big eq">${a} − ${b} = ?</div>` : `<div class="big eq" style="font-size:48px">${a} − ${b} = ?</div>`;
  const t = fr_() ? `Combien font ${a} moins ${b} ?` : `What is ${a} minus ${b}?`;
  return { vis, text: t, say: fr_() ? `Combien font ${sayN(a)} moins ${sayN(b)} ?` : `What is ${sayN(a)} minus ${sayN(b)}?`, ans: String(r), opts: numOpts(r, 0, max, lv === 1 ? 3 : 4), hint: `${a} − ${b} = ${r}` };
};
GEN.compare = function (lv) {
  const big = Math.random() < 0.5;
  if (lv === 1 && Math.random() < 0.6) {
    let a = ri(1, 6), b = ri(1, 6); while (b === a) b = ri(1, 6);
    const two = shuffle(ITEMS).filter((x, i, arr) => arr.findIndex((y) => y.e === x.e) === i).slice(0, 2), i1 = two[0], i2 = two[1];
    const t = fr_() ? (big ? 'Où y en a-t-il le plus ?' : 'Où y en a-t-il le moins ?') : (big ? 'Which group has more?' : 'Which group has fewer?');
    const win = big ? (a > b ? i1 : i2) : (a < b ? i1 : i2);
    return { vis: rowsOf(a, 28, 0, i1.e) + '<div style="font-size:18px;line-height:1">⚖️</div>' + rowsOf(b, 28, 0, i2.e), text: t, say: t, ans: win.e, opts: shuffle([i1, i2]).map((x) => ({ val: x.e, label: x.e, say: String(x === i1 ? a : b) })), hint: `${a} / ${b}` };
  }
  const lo = lv === 1 ? 1 : lv === 2 ? 4 : 10, hi = lv === 1 ? 10 : lv === 2 ? 20 : 100, cnt = lv === 3 ? 4 : 3, set = new Set();
  while (set.size < cnt) set.add(ri(lo, hi));
  const nums = [...set], ans = big ? Math.max(...nums) : Math.min(...nums);
  const t = fr_() ? (big ? 'Touche le plus grand nombre' : 'Touche le plus petit nombre') : (big ? 'Tap the biggest number' : 'Tap the smallest number');
  return { vis: '<div class="pic">⚖️</div>', text: t, say: t, ans: String(ans), opts: shuffle(nums).map((v) => ({ val: String(v), label: String(v), say: sayN(v) })), hint: big ? `${ans} ⬆` : `${ans} ⬇` };
};
function clockSvg(h, m) {
  const ha = ((h % 12) + m / 60) * 30, ma = m * 6; let nums = '', ticks = '';
  for (let i = 1; i <= 12; i++) { const a = i * 30 * Math.PI / 180; nums += `<text x="${(Math.sin(a) * 40).toFixed(1)}" y="${(-Math.cos(a) * 40 + 5).toFixed(1)}" text-anchor="middle" font-size="14" font-weight="700" fill="#3a2358">${i}</text>`; }
  return `<svg viewBox="-60 -60 120 120" width="124" height="124" style="display:block;margin:0 auto"><circle r="56" fill="#fff" stroke="#3a2358" stroke-width="5"/>${ticks}${nums}<line x1="0" y1="0" x2="0" y2="-24" stroke="#3a2358" stroke-width="6" stroke-linecap="round" transform="rotate(${ha})"/><line x1="0" y1="0" x2="0" y2="-36" stroke="#ff5a5f" stroke-width="4" stroke-linecap="round" transform="rotate(${ma})"/><circle r="4" fill="#3a2358"/></svg>`;
}
GEN.clock = function (lv) {
  const h = ri(1, 12), kinds = lv === 1 ? [0] : lv === 2 ? [0, 30] : [0, 15, 30], m = pick(kinds);
  const lab = (hh, mm) => `${hh}:${String(mm).padStart(2, '0')}`;
  const wrap = (x) => ((x - 1 + 12) % 12) + 1;
  const spk = (hh, mm) => fr_() ? `${hh} heure${hh > 1 ? 's' : ''}${mm === 30 ? ' et demie' : mm === 15 ? ' et quart' : ''}` : (mm === 0 ? `${hh} o'clock` : mm === 30 ? `half past ${hh}` : `quarter past ${hh}`);
  const set = new Map([[lab(h, m), [h, m]]]); let g = 0; const cnt = lv === 1 ? 3 : 4;
  while (set.size < cnt && g++ < 60) { const hh = Math.random() < 0.5 ? wrap(h + pick([-2, -1, 1, 2])) : h, mm = pick(kinds); set.set(lab(hh, mm), [hh, mm]); }
  const t = fr_() ? 'Quelle heure est-il ?' : 'What time is it?';
  return { vis: clockSvg(h, m), text: t, say: t, ans: lab(h, m), opts: shuffle([...set.entries()]).map(([k, [hh, mm]]) => ({ val: k, label: k, say: spk(hh, mm) })), hint: spk(h, m) };
};
const SHAPE_DEF = {
  circle: { fr: 'Cercle', en: 'Circle', s: 0 }, square: { fr: 'Carré', en: 'Square', s: 4 }, triangle: { fr: 'Triangle', en: 'Triangle', s: 3 }, rectangle: { fr: 'Rectangle', en: 'Rectangle', s: 4 },
  star: { fr: 'Étoile', en: 'Star', s: 0 }, heart: { fr: 'Cœur', en: 'Heart', s: 0 }, diamond: { fr: 'Losange', en: 'Diamond', s: 4 }, oval: { fr: 'Ovale', en: 'Oval', s: 0 }, pentagon: { fr: 'Pentagone', en: 'Pentagon', s: 5 }, hexagon: { fr: 'Hexagone', en: 'Hexagon', s: 6 }
};
function polyPts(n, R, rot, r2) {
  const pts = []; const k = r2 ? n * 2 : n;
  for (let i = 0; i < k; i++) { const a = rot + (i / k) * Math.PI * 2, rr_ = r2 && i % 2 ? r2 : R; pts.push((Math.cos(a) * rr_).toFixed(1) + ',' + (Math.sin(a) * rr_).toFixed(1)); }
  return pts.join(' ');
}
function shapeSvg(id, color) {
  const body = {
    circle: '<circle r="40"/>', square: '<rect x="-36" y="-36" width="72" height="72"/>', rectangle: '<rect x="-50" y="-28" width="100" height="56"/>',
    triangle: '<polygon points="0,-42 46,34 -46,34"/>', diamond: '<polygon points="0,-46 32,0 0,46 -32,0"/>', oval: '<ellipse rx="50" ry="30"/>',
    star: `<polygon points="${polyPts(5, 46, -Math.PI / 2, 19)}"/>`, heart: '<path d="M0,38 C-54,2 -34,-38 0,-14 C34,-38 54,2 0,38Z"/>',
    pentagon: `<polygon points="${polyPts(5, 44, -Math.PI / 2)}"/>`, hexagon: `<polygon points="${polyPts(6, 44, 0)}"/>`
  }[id];
  return `<svg viewBox="-60 -60 120 120" width="116" height="116" style="display:block;margin:0 auto"><g fill="${color}" stroke="#3a2358" stroke-width="5" stroke-linejoin="round">${body}</g></svg>`;
}
GEN.shapes = function (lv) {
  const col = pick(['#ff7a8a', '#ffc93c', '#46d9a6', '#6fb7ff', '#a98bff', '#ff9a5c']);
  if (lv === 3) {
    const id = pick(['triangle', 'square', 'rectangle', 'diamond', 'pentagon', 'hexagon']), s = SHAPE_DEF[id].s;
    const t = fr_() ? 'Combien de côtés a cette forme ?' : 'How many sides does this shape have?';
    return { vis: shapeSvg(id, col), text: t, say: t, ans: String(s), opts: [3, 4, 5, 6].map((v) => ({ val: String(v), label: String(v), say: sayN(v) })), hint: SHAPE_DEF[id][L] + ' : ' + s };
  }
  const pool = lv === 1 ? ['circle', 'square', 'triangle', 'star', 'heart'] : ['circle', 'square', 'triangle', 'rectangle', 'star', 'heart', 'diamond', 'oval'];
  const id = pick(pool), others = shuffle(pool.filter((x) => x !== id)).slice(0, lv === 1 ? 2 : 3);
  const t = fr_() ? 'Quelle est cette forme ?' : 'What shape is this?';
  return { vis: shapeSvg(id, col), text: t, say: t, ans: id, opts: shuffle([id].concat(others)).map((x) => ({ val: x, label: SHAPE_DEF[x][L], say: SHAPE_DEF[x][L] })), hint: SHAPE_DEF[id][L] };
};
const PAT_EMO = ['🔴', '🔵', '🟢', '🟡', '🟣', '🍎', '🍌', '🍇', '🍓', '⭐', '❤️', '🐱', '🐶', '🌸'];
GEN.pattern = function (lv) {
  const t = fr_() ? 'Continue la suite !' : 'Continue the pattern!';
  if (lv === 3) {
    const step = pick([1, 2, 5, 10, -1, -2]); let start;
    if (step === 10) start = ri(0, 5) * 10; else if (step === 5) start = ri(0, 4) * 5; else if (step < 0) start = ri(12, 20); else start = ri(0, 10);
    const seq = [0, 1, 2, 3].map((i) => start + step * i), ans = start + step * 4;
    const vis = `<div class="row">${seq.map((v) => `<span class="big" style="font-size:36px;margin:0 7px">${v}</span>`).join('')}<span class="big" style="font-size:36px;margin:0 7px">?</span></div>`;
    return { vis, text: t, say: t, ans: String(ans), opts: numOpts(ans, Math.max(0, ans - 8), ans + 8, 4, 6), hint: (step > 0 ? '+' : '−') + Math.abs(step) };
  }
  const em = shuffle(PAT_EMO).slice(0, 4); let seq, ans;
  if (lv === 1) { const len = pick([4, 5]); seq = Array.from({ length: len }, (_, i) => em[i % 2]); ans = em[len % 2]; }
  else { const kind = pick(['AAB', 'ABB', 'ABC']), pat = { AAB: [0, 0, 1], ABB: [0, 1, 1], ABC: [0, 1, 2] }[kind]; seq = Array.from({ length: 5 }, (_, i) => em[pat[i % 3]]); ans = em[pat[5 % 3]]; }
  const vis = `<div class="row">${seq.map((e, i) => `<span class="it" style="--i:${i};font-size:36px">${e}</span>`).join('')}<span class="it" style="--i:6;font-size:36px">❓</span></div>`;
  const others = shuffle(em.filter((e) => e !== ans)).slice(0, 2);
  return { vis, text: t, say: t, ans, opts: shuffle([ans].concat(others)).map((e) => ({ val: e, label: e, say: '' })), hint: '' };
};
const SIGHT = {
  fr: ['le', 'la', 'les', 'un', 'une', 'des', 'et', 'est', 'je', 'tu', 'il', 'elle', 'nous', 'vous', 'dans', 'sur', 'avec', 'pour', 'mais', 'pas', 'qui', 'mon', 'ma', 'son', 'de', 'du', 'au', 'en', 'oui', 'non', 'très', 'aussi', 'comme', 'chez', 'sous', 'plus', 'à', 'a', 'ou', 'où'],
  en: ['the', 'and', 'you', 'that', 'was', 'for', 'are', 'with', 'his', 'they', 'have', 'this', 'from', 'not', 'but', 'what', 'all', 'were', 'when', 'your', 'can', 'said', 'there', 'each', 'she', 'how', 'their', 'will', 'one', 'out', 'many', 'then', 'them', 'some', 'her', 'would', 'make', 'like', 'him', 'into']
};
const SENT = {
  fr: [['___ chat dort.', 'Le', ['La', 'Les']], ['___ fleur est belle.', 'La', ['Le', 'Les']], ['Les enfants ___ contents.', 'sont', ['est', 'suis']], ['Tu ___ mon ami.', 'es', ['est', 'suis']], ['Maman ___ un gâteau.', 'fait', ['font', 'fais']],
    ['Marie ___ Paul sont amis.', 'et', ['est', 'à']], ['Il ___ un livre.', 'a', ['à', 'as']], ['Elle va ___ l’école.', 'à', ['a', 'as']], ['Mon papa ___ gentil.', 'est', ['et', 'es']], ['Je joue ___ mon ami.', 'avec', ['sous', 'dans']],
    ['Le poisson est ___ l’eau.', 'dans', ['sur', 'avec']], ['Ce gâteau est ___ bon.', 'très', ['tes', 'les']], ['Je ___ content.', 'suis', ['es', 'est']], ['___ chiens aboient.', 'Les', ['Le', 'La']], ['Nous ___ au parc.', 'allons', ['vais', 'vas']]],
  en: [['I ___ happy.', 'am', ['is', 'are']], ['He ___ happy.', 'is', ['am', 'are']], ['They ___ happy.', 'are', ['is', 'am']], ['She ___ a red ball.', 'has', ['have', 'are']], ['I ___ a dog.', 'have', ['has', 'is']], ['___ is my dog.', 'This', ['These', 'Them']],
    ['I like cats ___ dogs.', 'and', ['the', 'to']], ['We go ___ school.', 'to', ['and', 'is']], ['I play ___ my friend.', 'with', ['from', 'for']], ['Look ___ the bird!', 'at', ['in', 'is']], ['Can you ___ me?', 'help', ['hot', 'hit']], ['The cat ___ a hat.', 'has', ['are', 'am']],
    ['___ you like pizza?', 'Do', ['Is', 'Am']], ['We ___ friends.', 'are', ['is', 'am']], ['The sun ___ hot.', 'is', ['are', 'am']]]
};
GEN.sight = function (lv) {
  const words = SIGHT[L];
  if (lv === 1) {
    const w = pickFresh(words.map((x) => [x]), 'sight' + L)[0], others = shuffle(words.filter((x) => x !== w)).slice(0, 2);
    const t = fr_() ? `Trouve le mot « ${w} »` : `Find the word “${w}”`;
    return { vis: `<div class="big" style="font-size:46px">${w}</div>`, text: t, say: fr_() ? `Trouve le mot ${w}` : `Find the word ${w}`, ans: w, opts: wordOpts(w, others), hint: w };
  }
  const [s, a, d] = pickFresh(SENT[L], 'sent' + L), t = fr_() ? 'Complète la phrase' : 'Complete the sentence';
  const extra = lv === 3 ? [pick(words.filter((x) => x !== a && !d.includes(x) && x.toLowerCase() !== a.toLowerCase()))] : [];
  return { vis: `<div class="word" style="font-size:30px;line-height:1.25">${s.replace('___', '<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>')}</div>`, text: t, say: (fr_() ? 'Complète la phrase : ' : 'Complete the sentence: ') + s.replace('___', ' … '), ans: a, opts: wordOpts(a, d.concat(extra)), hint: s.replace('___', a) };
};
const SYL = {
  fr: [['chat', '🐱'], ['pain', '🍞'], ['main', '✋'], ['fleur', '🌸'], ['loup', '🐺'], ['roi', '👑'], ['lait', '🥛'], ['nez', '👃'], ['pied', '🦶'],
    ['pa-pa', '👨'], ['ma-man', '👩'], ['la-pin', '🐰'], ['bal-lon', '⚽'], ['cha-peau', '🎩'], ['sou-ris', '🐭'], ['gâ-teau', '🎂'], ['vé-lo', '🚲'], ['ro-bot', '🤖'], ['che-val', '🐴'], ['pois-son', '🐟'], ['ca-mion', '🚚'], ['mo-to', '🏍️'], ['ki-wi', '🥝'], ['bé-bé', '👶'], ['oi-seau', '🐦'],
    ['cho-co-lat', '🍫'], ['é-lé-phant', '🐘'], ['pa-pil-lon', '🦋'], ['a-na-nas', '🍍'], ['kan-ga-rou', '🦘'], ['pa-ra-pluie', '☂️'], ['a-rai-gnée', '🕷️'], ['per-ro-quet', '🦜'], ['hé-ris-son', '🦔'], ['tour-ne-sol', '🌻'],
    ['or-di-na-teur', '💻'], ['té-lé-vi-sion', '📺']],
  en: [['cat', '🐱'], ['dog', '🐶'], ['sun', '☀️'], ['tree', '🌳'], ['fish', '🐟'], ['hand', '✋'], ['star', '⭐'], ['book', '📖'], ['frog', '🐸'], ['moon', '🌙'],
    ['ap-ple', '🍎'], ['ti-ger', '🐯'], ['rab-bit', '🐰'], ['flow-er', '🌸'], ['piz-za', '🍕'], ['mon-key', '🐵'], ['ro-bot', '🤖'], ['spi-der', '🕷️'], ['pen-cil', '✏️'], ['pen-guin', '🐧'], ['wa-ter', '💧'], ['ba-by', '👶'],
    ['ba-na-na', '🍌'], ['el-e-phant', '🐘'], ['but-ter-fly', '🦋'], ['di-no-saur', '🦖'], ['to-ma-to', '🍅'], ['um-brel-la', '☂️'], ['com-pu-ter', '💻'], ['kan-ga-roo', '🦘'], ['straw-ber-ry', '🍓'], ['oc-to-pus', '🐙'],
    ['wa-ter-mel-on', '🍉'], ['hel-i-cop-ter', '🚁'], ['tel-e-vi-sion', '📺'], ['al-li-ga-tor', '🐊'], ['cat-er-pil-lar', '🐛']]
};
GEN.syl = function (lv) {
  const maxS = lv === 1 ? 2 : lv === 2 ? 3 : 5, list = SYL[L].filter(([s]) => s.split('-').length <= maxS);
  const [split, e] = pickFresh(list, 'syl' + L), n = split.split('-').length, w = split.replace(/-/g, '');
  const t = fr_() ? `Combien de syllabes dans « ${w} » ?` : `How many syllables in “${w}”?`;
  const top = lv === 1 ? 3 : 4;
  return { vis: `<div class="pic">${e}</div><div class="word">${w}</div>`, text: t, say: fr_() ? `Combien de syllabes dans le mot ${w} ? Tape dans tes mains !` : `How many syllables in the word ${w}? Clap your hands!`, ans: String(n), opts: Array.from({ length: top }, (_, i) => ({ val: String(i + 1), label: String(i + 1), say: sayN(i + 1) })), hint: split.replace(/-/g, ' · ') };
};
const RHY = {
  fr: [[['bateau', '🚢'], ['gâteau', '🎂'], ['château', '🏰'], ['chapeau', '🎩'], ['cadeau', '🎁'], ['vélo', '🚲'], ['seau', '🪣']],
    [['ballon', '⚽'], ['cochon', '🐷'], ['bonbon', '🍬'], ['citron', '🍋'], ['mouton', '🐑'], ['champignon', '🍄'], ['avion', '✈️']],
    [['souris', '🐭'], ['fourmi', '🐜'], ['lit', '🛏️'], ['riz', '🍚'], ['ami', ''], ['radis', '']],
    [['fleur', '🌸'], ['cœur', '❤️'], ['peur', '😱'], ['couleur', '🎨'], ['bonheur', ''], ['sœur', '👭']],
    [['pain', '🍞'], ['main', '✋'], ['lapin', '🐰'], ['jardin', '🌷'], ['chien', '🐶'], ['raisin', '🍇'], ['sapin', '🎄'], ['bain', '🛁']],
    [['pomme', '🍎'], ['homme', '🧑'], ['gomme', '']],
    [['lune', '🌙'], ['dune', '🏜️'], ['plume', '🪶'], ['prune', ''], ['brume', '']],
    [['chat', '🐱'], ['rat', '🐀'], ['plat', '🍽️'], ['bras', '💪'], ['repas', '']]],
  en: [[['cat', '🐱'], ['hat', '🎩'], ['bat', '🦇'], ['rat', '🐀'], ['mat', ''], ['sat', '']], [['dog', '🐶'], ['log', '🪵'], ['frog', '🐸'], ['fog', '🌫️']],
    [['tree', '🌳'], ['bee', '🐝'], ['sea', '🌊'], ['key', '🔑'], ['three', '']], [['star', '⭐'], ['car', '🚗'], ['jar', '🫙'], ['bar', '']],
    [['cake', '🎂'], ['lake', '🏞️'], ['snake', '🐍'], ['rake', '']], [['ball', '⚽'], ['wall', '🧱'], ['tall', ''], ['call', '']],
    [['moon', '🌙'], ['spoon', '🥄'], ['balloon', '🎈'], ['soon', '']], [['hen', '🐔'], ['pen', '🖊️'], ['ten', '🔟'], ['men', '']],
    [['sun', '☀️'], ['run', '🏃'], ['fun', ''], ['bun', '']], [['bed', '🛏️'], ['red', '🔴'], ['head', ''], ['sled', '🛷']],
    [['fish', '🐟'], ['dish', '🍽️'], ['wish', '']], [['boat', '⛵'], ['coat', '🧥'], ['goat', '🐐']]]
};
GEN.rhyme = function (lv) {
  const groups = RHY[L], tg = [];
  groups.forEach((g, gi) => g.forEach((it) => { if (it[1]) tg.push([it[0], it[1], gi]); }));
  const [w, e, gi] = pickFresh(tg, 'rhy' + L), grp = groups[gi];
  const ans = pick(grp.filter((x) => x[0] !== w))[0];
  const others = shuffle(groups.filter((_, i) => i !== gi)).slice(0, lv === 1 ? 2 : 3).map((g) => pick(g)[0]);
  const t = fr_() ? `Quel mot rime avec « ${w} » ?` : `Which word rhymes with “${w}”?`;
  return { vis: `${lv === 3 ? '' : `<div class="pic">${e}</div>`}<div class="word">${w}</div>`, text: t, say: fr_() ? `Quel mot rime avec ${w} ?` : `Which word rhymes with ${w}?`, ans, opts: wordOpts(ans, others), hint: `${w} – ${ans}` };
};

/* ---------------------------------------------------------------- geography + shape hunt */
const LAND = [['🏔️', 'la montagne', 'the mountain'], ['🌋', 'le volcan', 'the volcano'], ['🏝️', 'l’île', 'the island'], ['🏜️', 'le désert', 'the desert'], ['🏖️', 'la plage', 'the beach'], ['🌲', 'la forêt', 'the forest'], ['🌊', 'la mer', 'the sea']];
const HABS = [['🐧', 'le pingouin', 'the penguin', '❄️'], ['🐫', 'le chameau', 'the camel', '🏜️'], ['🐒', 'le singe', 'the monkey', '🌴'], ['🐟', 'le poisson', 'the fish', '🌊'], ['🐻', 'l’ours', 'the bear', '🌲'], ['🦀', 'le crabe', 'the crab', '🏖️'], ['🐢', 'la tortue de mer', 'the sea turtle', '🌊']];
const HAB_ICONS = ['❄️', '🏜️', '🌴', '🌊', '🌲', '🏖️'];
const CANADA = [
  { fr: 'Quel est le drapeau du Canada ?', en: 'Which is the flag of Canada?', vis: '🍁', ans: '🇨🇦', d: ['🇺🇸', '🇫🇷', '🇧🇷'] },
  { fr: 'Quelle feuille est sur le drapeau du Canada ?', en: 'Which leaf is on the flag of Canada?', vis: '🇨🇦', ans: '🍁', d: ['🍂', '🍃'] },
  { fr: 'Quel animal est un symbole du Canada ?', en: 'Which animal is a symbol of Canada?', vis: '🍁', ans: '🦫', d: ['🐪', '🦒', '🐘'] },
  { fr: 'Quelle est la capitale du Canada ?', en: 'What is the capital of Canada?', vis: '🍁', ans: 'Ottawa', d: ['Toronto', 'Calgary'] },
  { fr: 'Quel pays est au sud du Canada ?', en: 'Which country is south of Canada?', vis: '🧭', ans: '🇺🇸', d: ['🇫🇷', '🇧🇷'] }
];
function compassSvg(deg) {
  return `<svg viewBox="-60 -60 120 120" width="124" height="124" style="display:block;margin:0 auto"><circle r="56" fill="#fff" stroke="#3a2358" stroke-width="5"/><text x="0" y="-38" text-anchor="middle" font-size="16" font-weight="700" fill="#3a2358">N</text><g stroke="#3a2358" stroke-width="3"><line x1="0" y1="46" x2="0" y2="52"/><line x1="46" y1="0" x2="52" y2="0"/><line x1="-46" y1="0" x2="-52" y2="0"/></g><g transform="rotate(${deg})"><polygon points="0,-30 9,6 -9,6" fill="#ff5a5f" stroke="#3a2358" stroke-width="3" stroke-linejoin="round"/><rect x="-3" y="6" width="6" height="22" rx="3" fill="#3a2358"/></g><circle r="5" fill="#3a2358"/></svg>`;
}
GEN.geo = function (lv) {
  const kinds = lv === 1 ? ['land', 'hab'] : lv === 2 ? ['hab', 'compass', 'land'] : ['canada', 'compass', 'hab'];
  const k = pick(kinds), fr = fr_();
  if (k === 'land') {
    const [e, f, en] = pickFresh(LAND, 'land'), others = shuffle(LAND.filter((x) => x[0] !== e)).slice(0, 2), t = fr ? `Touche ${f} !` : `Tap ${en}!`;
    return { vis: '<div class="pic">🗺️</div>', text: t, say: t, ans: e, opts: shuffle([[e, f, en]].concat(others)).map((x) => ({ val: x[0], label: x[0], say: fr ? x[1] : x[2] })), hint: fr ? f : en };
  }
  if (k === 'hab') {
    const [a, f, en, h] = pickFresh(HABS, 'hab'), others = shuffle(HAB_ICONS.filter((x) => x !== h)).slice(0, 2), t = fr ? `Où vit ${f} ?` : `Where does ${en} live?`;
    return { vis: `<div class="pic">${a}</div>`, text: t, say: t, ans: h, opts: shuffle([h].concat(others)).map((x) => ({ val: x, label: x, say: '' })), hint: h };
  }
  if (k === 'compass') {
    const dirs = [['N', 0], ['E', 90], ['S', 180], [fr ? 'O' : 'W', 270]], [lab, deg] = pick(dirs), t = fr ? 'Où montre la flèche ?' : 'Where does the arrow point?';
    return { vis: compassSvg(deg), text: t, say: fr ? 'Où montre la flèche ? Nord, l’est, sud ou ouest ?' : 'Where does the arrow point? North, east, south or west?', ans: lab, opts: shuffle(dirs).map(([l]) => ({ val: l, label: l, say: { N: fr ? 'nord' : 'north', E: fr ? 'l’est' : 'east', S: fr ? 'sud' : 'south', O: 'ouest', W: 'west' }[l] })), hint: lab };
  }
  const q = pickFresh(CANADA, 'canada'), t = q[L];
  return { vis: `<div class="pic">${q.vis}</div>`, text: t, say: t, ans: q.ans, opts: shuffle([q.ans].concat(q.d.slice(0, 2))).map((x) => ({ val: x, label: x, say: x.length > 2 && !/\p{Extended_Pictographic}/u.test(x) ? x : '' })), hint: '' };
};
const HUNT = {
  circle: { fr: 'un cercle', en: 'a circle', e: ['⚽', '🍪', '🌕', '🎾', '🪙', '🕒'] },
  triangle: { fr: 'un triangle', en: 'a triangle', e: ['🍕', '⛺', '🔺'] },
  square: { fr: 'un carré', en: 'a square', e: ['🧇', '🎁', '🪟'] },
  rectangle: { fr: 'un rectangle', en: 'a rectangle', e: ['🚪', '📱', '📺', '✉️', '📖'] },
  star: { fr: 'une étoile', en: 'a star', e: ['⭐', '🌟'] },
  heart: { fr: 'un cœur', en: 'a heart', e: ['❤️', '💖'] }
};
GEN.hunt = function (lv) {
  const pool = lv === 1 ? ['circle', 'triangle', 'square'] : ['circle', 'triangle', 'square', 'rectangle', 'star', 'heart'];
  const id = pick(pool), ans = pick(HUNT[id].e), others = shuffle(pool.filter((x) => x !== id)).slice(0, lv === 1 ? 2 : 3).map((x) => pick(HUNT[x].e));
  const t = fr_() ? `Touche ce qui ressemble à ${HUNT[id].fr} !` : `Tap what looks like ${HUNT[id].en}!`;
  return { vis: shapeSvg(id, pick(['#ff7a8a', '#ffc93c', '#46d9a6', '#6fb7ff', '#a98bff'])), text: t, say: t, ans, opts: shuffle([ans].concat(others)).map((e) => ({ val: e, label: e, say: '' })), hint: '' };
};

/* ---------------------------------------------------------------- planets */
const PL = {
  mercury: ['Mercure', 'Mercury', '#b8a99a', 5], venus: ['Vénus', 'Venus', '#f2c27b', 7], earth: ['Terre', 'Earth', '#4aa3ff', 7.5], mars: ['Mars', 'Mars', '#e0553d', 6],
  jupiter: ['Jupiter', 'Jupiter', '#d9a066', 14], saturn: ['Saturne', 'Saturn', '#e8d08a', 11], uranus: ['Uranus', 'Uranus', '#7fe0e0', 9], neptune: ['Neptune', 'Neptune', '#4a63e0', 9]
};
const PL_ORDER = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
const PL_FACTS = [
  ['Quelle planète a des anneaux ?', 'Which planet has rings?', 'saturn'], ['Quelle planète est rouge ?', 'Which planet is red?', 'mars'],
  ['Quelle est la plus grosse planète ?', 'Which planet is the biggest?', 'jupiter'], ['Quelle planète est notre maison ?', 'Which planet is our home?', 'earth'],
  ['Quelle planète est la plus proche du Soleil ?', 'Which planet is closest to the Sun?', 'mercury'], ['Quelle planète est la plus chaude ?', 'Which planet is the hottest?', 'venus'],
  ['Quelle planète est bleue et très loin ?', 'Which planet is blue and very far away?', 'neptune']
];
const SKY = [['☀️', 'le Soleil', 'the Sun'], ['🌙', 'la Lune', 'the Moon'], ['🌍', 'la Terre', 'the Earth'], ['⭐', 'une étoile', 'a star'], ['🪐', 'Saturne', 'Saturn'], ['🚀', 'la fusée', 'the rocket']];
const FR_ORD = ['première', 'deuxième', 'troisième', 'quatrième', 'cinquième', 'sixième', 'septième', 'huitième'];
const EN_ORD = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth'];
function solarSvg(hi) {
  let g = '<circle cx="22" cy="35" r="18" fill="#ffc93c" stroke="#3a2358" stroke-width="3"/>';
  PL_ORDER.forEach((id, i) => {
    const x = 56 + i * 30, r = PL[id][3];
    if (i === hi) g += `<circle cx="${x}" cy="35" r="11" fill="#fff" stroke="#3a2358" stroke-width="3" stroke-dasharray="4 3"/><text x="${x}" y="40" text-anchor="middle" font-size="14" font-weight="700" fill="#3a2358">?</text>`;
    else g += `<circle cx="${x}" cy="35" r="${r}" fill="${PL[id][2]}" stroke="#3a2358" stroke-width="2.5"/>` + (id === 'saturn' ? `<ellipse cx="${x}" cy="35" rx="${r + 5}" ry="3.5" fill="none" stroke="#3a2358" stroke-width="2"/>` : '');
  });
  return `<svg viewBox="0 0 300 70" width="270" height="63" style="display:block;margin:0 auto" aria-hidden="true">${g}</svg>`;
}
GEN.planets = function (lv) {
  const fr = fr_(), kind = pick(lv === 1 ? ['sky'] : lv === 2 ? ['fact', 'sky', 'fact'] : ['order', 'fact', 'order']);
  const nameOf = (id) => PL[id][fr ? 0 : 1];
  const planetOpts = (ans) => shuffle([ans].concat(shuffle(PL_ORDER.filter((x) => x !== ans)).slice(0, 2))).map((id) => ({ val: id, label: nameOf(id), say: nameOf(id) }));
  if (kind === 'sky') {
    const [e, f, en] = pickFresh(SKY, 'sky'), others = shuffle(SKY.filter((x) => x[0] !== e)).slice(0, 2), t = fr ? `Touche ${f} !` : `Tap ${en}!`;
    return { vis: '<div class="pic">🔭</div>', text: t, say: t, ans: e, opts: shuffle([[e, f, en]].concat(others)).map((x) => ({ val: x[0], label: x[0], say: fr ? x[1] : x[2] })), hint: fr ? f : en };
  }
  if (kind === 'fact') {
    const q = pickFresh(PL_FACTS, 'plfact'), t = fr ? q[0] : q[1];
    return { vis: '<div class="pic">🪐</div>', text: t, say: t, ans: q[2], opts: planetOpts(q[2]), hint: nameOf(q[2]) };
  }
  const i = pick([1, 2, 3, 4, 5, 6, 7].filter((k) => lv > 2 || k < 5)), id = PL_ORDER[i], t = fr ? `Quelle planète est la ${FR_ORD[i]} depuis le Soleil ?` : `Which planet is ${EN_ORD[i]} from the Sun?`;
  return { vis: solarSvg(i), text: t, say: t, ans: id, opts: planetOpts(id), hint: nameOf(id) };
};
