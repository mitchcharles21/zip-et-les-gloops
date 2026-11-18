
/* ---------------------------------------------------------------- 1st-grade skills, menu meta, path text */
const APP_VERSION = '2026-11-18.19';
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
function compassSvg(deg) {
  return `<svg viewBox="-60 -60 120 120" width="124" height="124" style="display:block;margin:0 auto"><circle r="56" fill="#fff" stroke="#3a2358" stroke-width="5"/><text x="0" y="-38" text-anchor="middle" font-size="16" font-weight="700" fill="#3a2358">N</text><g stroke="#3a2358" stroke-width="3"><line x1="0" y1="46" x2="0" y2="52"/><line x1="46" y1="0" x2="52" y2="0"/><line x1="-46" y1="0" x2="-52" y2="0"/></g><g transform="rotate(${deg})"><polygon points="0,-30 9,6 -9,6" fill="#ff5a5f" stroke="#3a2358" stroke-width="3" stroke-linejoin="round"/><rect x="-3" y="6" width="6" height="22" rx="3" fill="#3a2358"/></g><circle r="5" fill="#3a2358"/></svg>`;
}
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

/* ---------------------------------------------------------------- artwork (SVG pictures) */
const INKC = '#3a2358';
const ART = {};
(() => {
  const ball = (id, fill, inner, r) => {
    r = r || 40;
    return `<clipPath id="k-${id}"><circle cx="50" cy="50" r="${r}"/></clipPath><circle cx="50" cy="50" r="${r}" fill="${fill}"/><g clip-path="url(#k-${id})">${inner}<ellipse cx="${50 + r * 0.55}" cy="50" rx="${r * 0.55}" ry="${r}" fill="#2a1a4a" opacity=".13"/></g><ellipse cx="${50 - r * 0.38}" cy="${50 - r * 0.42}" rx="${r * 0.22}" ry="${r * 0.12}" transform="rotate(-35 ${50 - r * 0.38} ${50 - r * 0.42})" fill="#fff" opacity=".4"/><circle cx="50" cy="50" r="${r}" fill="none" stroke="${INKC}" stroke-width="4"/>`;
  };
  const cr = (x, y, r, c) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/><circle cx="${x - r * 0.2}" cy="${y - r * 0.2}" r="${r * 0.7}" fill="#fff" opacity=".18"/>`;
  ART.mercury = ball('me', '#b9aea3', cr(34, 40, 7, '#8f857b') + cr(64, 34, 5, '#8f857b') + cr(58, 64, 9, '#8f857b') + cr(33, 66, 5, '#8f857b') + cr(76, 52, 4, '#8f857b'));
  ART.venus = ball('ve', '#f6c47c', '<path d="M8 36 Q34 24 58 36 T96 32" stroke="#e39f57" stroke-width="6" fill="none"/><path d="M4 54 Q32 42 58 56 T98 52" stroke="#eab36a" stroke-width="6" fill="none"/><path d="M10 72 Q36 62 62 74 T98 70" stroke="#e39f57" stroke-width="6" fill="none"/>');
  ART.earth = ball('ea', '#3f9cf5', '<path d="M28 26 Q42 16 52 28 Q48 40 38 44 Q26 46 20 36Z" fill="#4fcf6a"/><path d="M52 54 Q68 46 78 58 Q76 74 64 82 Q54 74 52 54Z" fill="#4fcf6a"/><path d="M18 58 Q28 52 34 62 Q30 74 22 70Z" fill="#4fcf6a"/><ellipse cx="68" cy="30" rx="12" ry="4.5" fill="#fff" opacity=".85"/><ellipse cx="30" cy="80" rx="12" ry="4" fill="#fff" opacity=".85"/><ellipse cx="42" cy="54" rx="9" ry="3.5" fill="#fff" opacity=".7"/>');
  ART.mars = ball('ma', '#e2673f', '<ellipse cx="38" cy="44" rx="11" ry="6" fill="#b84a2e"/><ellipse cx="64" cy="58" rx="13" ry="7" fill="#b84a2e"/><ellipse cx="44" cy="70" rx="8" ry="4" fill="#b84a2e"/><ellipse cx="50" cy="13" rx="16" ry="6" fill="#fff" opacity=".9"/>');
  ART.jupiter = ball('ju', '#e8b985', '<rect x="0" y="22" width="100" height="9" fill="#c98a55"/><rect x="0" y="36" width="100" height="7" fill="#f3d6ac"/><rect x="0" y="46" width="100" height="10" fill="#b87545"/><rect x="0" y="60" width="100" height="7" fill="#f3d6ac"/><rect x="0" y="70" width="100" height="9" fill="#c98a55"/><ellipse cx="62" cy="60" rx="10" ry="6.5" fill="#d9553a" stroke="#a23b28" stroke-width="2.5"/>');
  ART.neptune = ball('ne', '#4466e6', '<path d="M6 40 Q34 30 60 40 T98 36" stroke="#2f48bd" stroke-width="7" fill="none"/><path d="M10 66 Q36 58 62 68 T98 64" stroke="#2f48bd" stroke-width="6" fill="none"/><path d="M24 30 Q40 24 58 28" stroke="#dfe8ff" stroke-width="3.5" fill="none" stroke-linecap="round"/><ellipse cx="60" cy="52" rx="9" ry="5.5" fill="#22349a"/>');
  ART.uranus = `<g transform="rotate(64 50 50)"><ellipse cx="50" cy="50" rx="42" ry="9" fill="none" stroke="${INKC}" stroke-width="8"/><ellipse cx="50" cy="50" rx="42" ry="9" fill="none" stroke="#c9f3f3" stroke-width="4"/></g>` + ball('ur', '#8fe3e3', '<path d="M6 44 Q34 38 60 46 T98 42" stroke="#74cfd0" stroke-width="5" fill="none"/><path d="M10 62 Q36 56 62 64 T98 60" stroke="#a8f0f0" stroke-width="4" fill="none"/>', 31) + `<g transform="rotate(64 50 50)"><path d="M8 50 A42 9 0 0 0 92 50" fill="none" stroke="${INKC}" stroke-width="8"/><path d="M8 50 A42 9 0 0 0 92 50" fill="none" stroke="#c9f3f3" stroke-width="4"/></g>`;
  ART.saturn = `<g transform="rotate(-20 50 50)"><ellipse cx="50" cy="50" rx="44" ry="14" fill="none" stroke="${INKC}" stroke-width="11"/><ellipse cx="50" cy="50" rx="44" ry="14" fill="none" stroke="#f3dfa0" stroke-width="6"/></g>` + ball('sa', '#ecd28b', '<rect x="0" y="36" width="100" height="6" fill="#d8b866"/><rect x="0" y="52" width="100" height="8" fill="#d8b866"/><rect x="0" y="66" width="100" height="5" fill="#f3dfa0"/>', 28) + `<g transform="rotate(-20 50 50)"><path d="M6 50 A44 14 0 0 0 94 50" fill="none" stroke="${INKC}" stroke-width="11"/><path d="M6 50 A44 14 0 0 0 94 50" fill="none" stroke="#f3dfa0" stroke-width="6"/></g>`;
  let rays = '';
  for (let i = 0; i < 8; i++) { const a = (i * Math.PI) / 4; rays += `<line x1="${50 + Math.cos(a) * 34}" y1="${50 + Math.sin(a) * 34}" x2="${50 + Math.cos(a) * 46}" y2="${50 + Math.sin(a) * 46}" stroke="#ffb52e" stroke-width="8" stroke-linecap="round"/>`; }
  ART.sun = rays + ball('su', '#ffd23f', '', 28);
  ART.moon = ball('mo', '#ece8f2', cr(36, 40, 9, '#cdc7d9') + cr(62, 36, 6, '#cdc7d9') + cr(58, 66, 11, '#cdc7d9') + cr(34, 68, 5, '#cdc7d9'), 38);
  let sp = '';
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, r = i % 2 ? 17 : 42; sp += `${50 + Math.cos(a) * r},${54 + Math.sin(a) * r} `; }
  ART.star = `<polygon points="${sp}" fill="#ffd34d" stroke="${INKC}" stroke-width="4" stroke-linejoin="round"/><ellipse cx="40" cy="36" rx="7" ry="3.5" transform="rotate(-35 40 36)" fill="#fff" opacity=".5"/>`;
  // ---- scenes
  const scene = (id, bg, inner) => `<clipPath id="f-${id}"><rect x="3" y="3" width="94" height="94" rx="16"/></clipPath><g clip-path="url(#f-${id})"><rect width="100" height="100" fill="${bg}"/>${inner}</g><rect x="3" y="3" width="94" height="94" rx="16" fill="none" stroke="${INKC}" stroke-width="4"/>`;
  const sunC = (x, y) => `<circle cx="${x}" cy="${y}" r="9" fill="#ffd34d"/>`;
  const palm = (x, y, s) => `<path d="M${x} ${y} Q${x + 4 * s} ${y - 16 * s} ${x - 2 * s} ${y - 30 * s}" stroke="#8a5a3c" stroke-width="${5 * s}" fill="none" stroke-linecap="round"/><g fill="#3fb86a" stroke="${INKC}" stroke-width="1.5"><path d="M${x - 2 * s} ${y - 30 * s} Q${x - 16 * s} ${y - 40 * s} ${x - 26 * s} ${y - 30 * s} Q${x - 14 * s} ${y - 32 * s} ${x - 2 * s} ${y - 30 * s}Z"/><path d="M${x - 2 * s} ${y - 30 * s} Q${x + 12 * s} ${y - 40 * s} ${x + 22 * s} ${y - 30 * s} Q${x + 10 * s} ${y - 32 * s} ${x - 2 * s} ${y - 30 * s}Z"/><path d="M${x - 2 * s} ${y - 30 * s} Q${x - 8 * s} ${y - 46 * s} ${x - 16 * s} ${y - 48 * s} Q${x - 6 * s} ${y - 40 * s} ${x - 2 * s} ${y - 30 * s}Z"/><path d="M${x - 2 * s} ${y - 30 * s} Q${x + 4 * s} ${y - 46 * s} ${x + 12 * s} ${y - 48 * s} Q${x + 2 * s} ${y - 40 * s} ${x - 2 * s} ${y - 30 * s}Z"/></g>`;
  const pine = (x, y, s) => `<rect x="${x - 3 * s}" y="${y - 6 * s}" width="${6 * s}" height="${10 * s}" fill="#8a5a3c"/><polygon points="${x},${y - 38 * s} ${x - 15 * s},${y - 14 * s} ${x + 15 * s},${y - 14 * s}" fill="#2f9e5a" stroke="${INKC}" stroke-width="2"/><polygon points="${x},${y - 26 * s} ${x - 19 * s},${y - 2 * s} ${x + 19 * s},${y - 2 * s}" fill="#38b866" stroke="${INKC}" stroke-width="2"/>`;
  ART.mountain = scene('mt', '#bfe6ff', `${sunC(80, 20)}<polygon points="-5,86 28,42 60,86" fill="#7d86b8"/><polygon points="26,86 62,20 106,86" fill="#5f6aa3"/><polygon points="62,20 51,38 58,34 62,41 67,34 74,38" fill="#fff"/><polygon points="28,42 21,52 27,49 29,53 34,49 38,53" fill="#fff"/><rect y="80" width="100" height="20" fill="#6fcf6a"/>`);
  ART.volcano = scene('vo', '#ffd9c0', `<circle cx="38" cy="18" r="8" fill="#cfc6d9"/><circle cx="52" cy="11" r="9" fill="#cfc6d9"/><circle cx="66" cy="19" r="7" fill="#cfc6d9"/><circle cx="46" cy="30" r="4" fill="#ffb02e"/><circle cx="58" cy="27" r="3" fill="#ff7a2e"/><polygon points="36,42 64,42 94,90 6,90" fill="#8a5a3c"/><ellipse cx="50" cy="42" rx="14" ry="4.5" fill="#ff7a2e"/><path d="M42 44 Q39 62 33 78 L43 76 Q46 60 48 46Z" fill="#ff7a2e"/><path d="M56 45 Q60 60 62 76 L68 74 Q64 58 60 45Z" fill="#ff9f43"/><rect y="86" width="100" height="14" fill="#5a8f4a"/>`);
  ART.island = scene('is', '#bfe6ff', `${sunC(82, 20)}<rect y="56" width="100" height="44" fill="#3fa8f0"/><path d="M-5 62 Q10 58 22 62 T48 62 T78 62 T105 62" stroke="#fff" stroke-width="2.5" fill="none"/><path d="M-5 80 Q10 76 22 80 T48 80 T78 80 T105 80" stroke="#8fd3ff" stroke-width="3" fill="none"/><ellipse cx="50" cy="68" rx="32" ry="10" fill="#f4d58a" stroke="${INKC}" stroke-width="2.5"/>${palm(54, 66, 1)}`);
  ART.desert = scene('de', '#ffe7b0', `<circle cx="78" cy="24" r="11" fill="#ffb52e"/><path d="M-5 68 Q25 50 50 66 T105 60 L105 105 L-5 105Z" fill="#f2c36b"/><path d="M-5 84 Q30 70 60 84 T105 80 L105 105 L-5 105Z" fill="#e5a94a"/><rect x="22" y="40" width="9" height="34" rx="4.5" fill="#3fb86a" stroke="${INKC}" stroke-width="2.5"/><path d="M22 58 H15 V48" fill="none" stroke="#3fb86a" stroke-width="7" stroke-linecap="round"/><path d="M31 54 H38 V45" fill="none" stroke="#3fb86a" stroke-width="7" stroke-linecap="round"/>`);
  ART.beach = scene('be', '#bfe6ff', `${sunC(20, 20)}<rect y="44" width="100" height="24" fill="#3fa8f0"/><path d="M-5 62 Q15 56 30 62 T60 60 T105 62 L105 70 L-5 70Z" fill="#fff"/><path d="M-5 68 Q50 58 105 70 L105 105 L-5 105Z" fill="#f6dc9a"/><line x1="66" y1="50" x2="60" y2="88" stroke="#8a5a3c" stroke-width="3.5" stroke-linecap="round"/><path d="M42 56 Q64 32 86 56Z" fill="#ff5a5f" stroke="${INKC}" stroke-width="2.5"/><path d="M58 44 Q64 38 70 44 L68 56 L60 56Z" fill="#fff"/>`);
  ART.forest = scene('fo', '#cfeeff', `<rect y="78" width="100" height="22" fill="#6fcf6a"/>${pine(24, 82, 0.9)}${pine(78, 80, 0.95)}${pine(50, 90, 1.25)}`);
  ART.sea = scene('se', '#8fd3ff', `<rect y="52" width="100" height="48" fill="#3fa8f0"/><path d="M-5 56 Q10 50 22 56 T48 56 T78 56 T105 56" stroke="#fff" stroke-width="3" fill="none"/><path d="M-5 76 Q10 70 22 76 T48 76 T78 76 T105 76" stroke="#8fd3ff" stroke-width="3.5" fill="none"/><path d="M-5 92 Q10 86 22 92 T48 92 T78 92 T105 92" stroke="#8fd3ff" stroke-width="3.5" fill="none"/><polygon points="50,52 50,20 70,52" fill="#fff" stroke="${INKC}" stroke-width="2.5"/><polygon points="46,52 46,28 32,52" fill="#ffd34d" stroke="${INKC}" stroke-width="2.5"/><path d="M26 54 H74 L66 66 H34Z" fill="#ff5a5f" stroke="${INKC}" stroke-width="2.5"/>`);
  ART.arctic = scene('ar', '#d9f1ff', `<polygon points="-5,78 28,32 58,78" fill="#bfe3f7"/><polygon points="40,78 72,26 105,78" fill="#a9d6f0"/><polygon points="28,32 20,45 26,42 29,46 34,42 38,46" fill="#fff"/><polygon points="72,26 62,42 68,38 72,44 77,38 83,42" fill="#fff"/><rect y="74" width="100" height="26" fill="#fff"/><circle cx="16" cy="18" r="2.5" fill="#fff"/><circle cx="48" cy="12" r="2" fill="#fff"/><circle cx="86" cy="14" r="2.5" fill="#fff"/><circle cx="62" cy="62" r="2" fill="#bfe3f7"/>`);
  ART.jungle = scene('ju2', '#bff0c8', `<rect y="80" width="100" height="20" fill="#3fa05a"/><path d="M12 0 Q20 20 10 40" stroke="#2f9e5a" stroke-width="3" fill="none"/><path d="M80 0 Q70 24 84 44" stroke="#2f9e5a" stroke-width="3" fill="none"/>${palm(28, 84, 1.25)}${palm(72, 84, 1.05)}<circle cx="50" cy="70" r="5" fill="#ff7a8a"/><circle cx="48" cy="69" r="2" fill="#ffd34d"/>`);
  // ---- flags
  const flag = (id, inner) => `<clipPath id="g-${id}"><rect x="8" y="24" width="84" height="52" rx="4"/></clipPath><g clip-path="url(#g-${id})">${inner}</g><rect x="8" y="24" width="84" height="52" rx="4" fill="none" stroke="${INKC}" stroke-width="4"/>`;
  ART.flag_ca = flag('ca', '<rect x="8" y="24" width="84" height="52" fill="#fff"/><rect x="8" y="24" width="21" height="52" fill="#e0343b"/><rect x="71" y="24" width="21" height="52" fill="#e0343b"/><path d="M50 30 L54 40 L61 36 L58 47 L67 44 L63 53 L69 56 L56 61 L56 70 L51 68 L51 74 L49 74 L49 68 L44 70 L44 61 L31 56 L37 53 L33 44 L42 47 L39 36 L46 40Z" fill="#e0343b"/>');
  let stripes = '', dots = '';
  for (let i = 0; i < 7; i++) stripes += `<rect x="8" y="${24 + i * 7.43}" width="84" height="7.43" fill="${i % 2 ? '#fff' : '#d93a3a'}"/>`;
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) dots += `<circle cx="${14 + c * 8}" cy="${30 + r * 8}" r="1.6" fill="#fff"/>`;
  ART.flag_us = flag('us', `${stripes}<rect x="8" y="24" width="38" height="29.7" fill="#2d3a8c"/>${dots}`);
  ART.flag_fr = flag('fr', '<rect x="8" y="24" width="28" height="52" fill="#2d4fc4"/><rect x="36" y="24" width="28" height="52" fill="#fff"/><rect x="64" y="24" width="28" height="52" fill="#e0343b"/>');
  ART.flag_br = flag('br', '<rect x="8" y="24" width="84" height="52" fill="#2fae5a"/><polygon points="50,29 82,50 50,71 18,50" fill="#ffd34d"/><circle cx="50" cy="50" r="12" fill="#2d3a8c"/><path d="M39 49 Q50 44 61 52" stroke="#fff" stroke-width="2.6" fill="none"/>');
})();
const svgDoc = (k, s) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${s}" height="${s}">${ART[k]}</svg>`;
const artTag = (k, s) => `<span class="art" style="display:inline-block;width:${s}px;height:${s}px;line-height:0">${svgDoc(k, s)}</span>`;
const IMGS = {};
function imgFor(k) {
  if (!IMGS[k]) { const im = new Image(); im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgDoc(k, 200)); IMGS[k] = im; }
  return IMGS[k];
}

/* ---------------------------------------------------------------- world + planets (pictures) */
const imgOpts = (keys, nameOf) => keys.map((k) => { imgFor(k); return { val: k, label: '', img: k, say: nameOf(k) }; });
const LAND = [['mountain', 'la montagne', 'the mountain'], ['volcano', 'le volcan', 'the volcano'], ['island', 'l’île', 'the island'], ['desert', 'le désert', 'the desert'], ['beach', 'la plage', 'the beach'], ['forest', 'la forêt', 'the forest'], ['sea', 'la mer', 'the sea']];
const HAB_NAME = { arctic: ['la banquise', 'the ice'], desert: ['le désert', 'the desert'], jungle: ['la jungle', 'the jungle'], sea: ['la mer', 'the sea'], forest: ['la forêt', 'the forest'], beach: ['la plage', 'the beach'] };
const HABS = [['🐧', 'le pingouin', 'the penguin', 'arctic'], ['🐫', 'le chameau', 'the camel', 'desert'], ['🐒', 'le singe', 'the monkey', 'jungle'], ['🐟', 'le poisson', 'the fish', 'sea'], ['🐻', 'l’ours', 'the bear', 'forest'], ['🦀', 'le crabe', 'the crab', 'beach'], ['🐢', 'la tortue de mer', 'the sea turtle', 'sea']];
const FLAGN = { flag_ca: ['le Canada', 'Canada'], flag_us: ['les États-Unis', 'the United States'], flag_fr: ['la France', 'France'], flag_br: ['le Brésil', 'Brazil'] };
const CANADA = [
  { fr: 'Quel est le drapeau du Canada ?', en: 'Which one is the flag of Canada?', vis: '<div class="pic">🍁</div>', ans: 'flag_ca', d: ['flag_us', 'flag_fr', 'flag_br'], img: true },
  { fr: 'Quelle feuille est sur le drapeau du Canada ?', en: 'Which leaf is on the flag of Canada?', vis: artTag('flag_ca', 100), ans: '🍁', d: ['🍂', '🍃'] },
  { fr: 'Quel animal est un symbole du Canada ?', en: 'Which animal is a symbol of Canada?', vis: artTag('flag_ca', 100), ans: '🦫', d: ['🐪', '🦒', '🐘'] },
  { fr: 'Quelle est la capitale du Canada ?', en: 'What is the capital of Canada?', vis: artTag('flag_ca', 100), ans: 'Ottawa', d: ['Toronto', 'Calgary'], txt: true },
  { fr: 'Quel pays est au sud du Canada ?', en: 'Which country is south of Canada?', vis: compassSvg(180), ans: 'flag_us', d: ['flag_fr', 'flag_br'], img: true }
];
GEN.geo = function (lv) {
  const fr = fr_(), L2 = fr ? 0 : 1, k = pick(lv === 1 ? ['land', 'hab'] : lv === 2 ? ['hab', 'compass', 'land'] : ['canada', 'compass', 'hab']);
  if (k === 'land') {
    const e = pickFresh(LAND, 'land'), others = shuffle(LAND.filter((x) => x[0] !== e[0])).slice(0, 2), t = fr ? `Touche ${e[1]} !` : `Tap ${e[2]}!`;
    return { vis: '<div class="pic">🗺️</div>', text: t, say: t, ans: e[0], opts: imgOpts(shuffle([e[0]].concat(others.map((x) => x[0]))), (key) => LAND.find((x) => x[0] === key)[L2 + 1]), hint: e[L2 + 1] };
  }
  if (k === 'hab') {
    const [a, f, en, h] = pickFresh(HABS, 'hab'), others = shuffle(Object.keys(HAB_NAME).filter((x) => x !== h)).slice(0, 2), t = fr ? `Où vit ${f} ?` : `Where does ${en} live?`;
    return { vis: `<div class="pic">${a}</div>`, text: t, say: t, ans: h, opts: imgOpts(shuffle([h].concat(others)), (key) => HAB_NAME[key][L2]), hint: HAB_NAME[h][L2] };
  }
  if (k === 'compass') {
    const dirs = [['N', 0], ['E', 90], ['S', 180], [fr ? 'O' : 'W', 270]], [lab, deg] = pick(dirs), t = fr ? 'Où montre la flèche ?' : 'Where does the arrow point?';
    return { vis: compassSvg(deg), text: t, say: fr ? 'Où montre la flèche ? Nord, l’est, sud ou ouest ?' : 'Where does the arrow point? North, east, south or west?', ans: lab, opts: shuffle(dirs).map(([l]) => ({ val: l, label: l, say: { N: fr ? 'nord' : 'north', E: fr ? 'l’est' : 'east', S: fr ? 'sud' : 'south', O: 'ouest', W: 'west' }[l] })), hint: lab };
  }
  const q = pickFresh(CANADA.map((x, i) => [i, x]), 'canada')[1], t = q[fr ? 'fr' : 'en'];
  if (q.img) return { vis: q.vis, text: t, say: t, ans: q.ans, opts: imgOpts(shuffle([q.ans].concat(q.d.slice(0, 2))), (key) => FLAGN[key][L2]), hint: FLAGN[q.ans][L2] };
  return { vis: q.vis, text: t, say: t, ans: q.ans, opts: shuffle([q.ans].concat(q.d.slice(0, 2))).map((x) => ({ val: x, label: x, say: q.txt ? x : '' })), hint: q.txt ? q.ans : '' };
};

const PL = { mercury: ['Mercure', 'Mercury'], venus: ['Vénus', 'Venus'], earth: ['Terre', 'Earth'], mars: ['Mars', 'Mars'], jupiter: ['Jupiter', 'Jupiter'], saturn: ['Saturne', 'Saturn'], uranus: ['Uranus', 'Uranus'], neptune: ['Neptune', 'Neptune'] };
const PL_ORDER = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
const PL_FACTS = [
  ['Quelle planète a des anneaux ?', 'Which planet has rings?', 'saturn'], ['Quelle planète est rouge ?', 'Which planet is red?', 'mars'],
  ['Quelle est la plus grosse planète ?', 'Which planet is the biggest?', 'jupiter'], ['Quelle planète est notre maison ?', 'Which planet is our home?', 'earth'],
  ['Quelle planète est la plus proche du Soleil ?', 'Which planet is closest to the Sun?', 'mercury'], ['Quelle planète est la plus chaude ?', 'Which planet is the hottest?', 'venus'],
  ['Quelle planète est bleue et très loin ?', 'Which planet is blue and very far away?', 'neptune']
];
const SKY = [['sun', 'le Soleil', 'the Sun'], ['moon', 'la Lune', 'the Moon'], ['earth', 'la Terre', 'the Earth'], ['star', 'une étoile', 'a star'], ['saturn', 'Saturne', 'Saturn']];
const FR_ORD = ['première', 'deuxième', 'troisième', 'quatrième', 'cinquième', 'sixième', 'septième', 'huitième'];
const EN_ORD = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth'];
function solarSvg(hi) {
  const R = [7, 10, 10, 8, 18, 16, 12, 12], BR = { saturn: 28, uranus: 31 };
  let g = `<g transform="translate(26 40) scale(.46) translate(-50 -50)">${ART.sun}</g>`, x = 50;
  PL_ORDER.forEach((id, i) => {
    const r = R[i]; x += 4 + r;
    if (i === hi) g += `<circle cx="${x}" cy="40" r="${Math.max(r, 11)}" fill="#fff" stroke="${INKC}" stroke-width="3" stroke-dasharray="4 3"/><text x="${x}" y="45" text-anchor="middle" font-size="15" font-weight="700" fill="${INKC}">?</text>`;
    else g += `<g transform="translate(${x} 40) scale(${r / (BR[id] || 40)}) translate(-50 -50)">${ART[id]}</g>`;
    x += r;
  });
  return `<svg viewBox="0 0 ${x + 8} 80" width="${x + 8}" height="80" style="display:block;margin:0 auto;max-width:100%;height:auto" aria-hidden="true">${g}</svg>`;
}
GEN.planets = function (lv) {
  const fr = fr_(), nm = (id) => PL[id][fr ? 0 : 1], kind = pick(lv === 1 ? ['sky'] : lv === 2 ? ['ident', 'fact', 'sky', 'fact'] : ['order', 'fact', 'ident', 'order']);
  const pics = (ans) => imgOpts(shuffle([ans].concat(shuffle(PL_ORDER.filter((x) => x !== ans)).slice(0, 2))), nm);
  if (kind === 'sky') {
    const e = pickFresh(SKY, 'sky'), others = shuffle(SKY.filter((x) => x[0] !== e[0])).slice(0, 2), t = fr ? `Touche ${e[1]} !` : `Tap ${e[2]}!`;
    return { vis: '<div class="pic">🔭</div>', text: t, say: t, ans: e[0], opts: imgOpts(shuffle([e[0]].concat(others.map((x) => x[0]))), (key) => SKY.find((x) => x[0] === key)[fr ? 1 : 2]), hint: fr ? e[1] : e[2] };
  }
  if (kind === 'ident') {
    const id = pickFresh(PL_ORDER.map((x) => [x]), 'plid')[0], t = fr ? 'Quelle est cette planète ?' : 'Which planet is this?';
    return { vis: artTag(id, 100), text: t, say: t, ans: id, opts: shuffle([id].concat(shuffle(PL_ORDER.filter((x) => x !== id)).slice(0, 2))).map((x) => ({ val: x, label: nm(x), say: nm(x) })), hint: nm(id) };
  }
  if (kind === 'fact') {
    const q = pickFresh(PL_FACTS, 'plfact'), t = fr ? q[0] : q[1];
    return { vis: '<div class="pic">🔭</div>', text: t, say: t, ans: q[2], opts: pics(q[2]), hint: nm(q[2]) };
  }
  const i = pick([1, 2, 3, 4, 5, 6, 7].filter((k) => lv > 2 || k < 5)), id = PL_ORDER[i], t = fr ? `Quelle planète est la ${FR_ORD[i]} depuis le Soleil ?` : `Which planet is ${EN_ORD[i]} from the Sun?`;
  return { vis: solarSvg(i), text: t, say: t, ans: id, opts: pics(id), hint: nm(id) };
};
