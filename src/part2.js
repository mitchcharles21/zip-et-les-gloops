<script>
(() => {
'use strict';
const $ = (id) => document.getElementById(id);
const rnd = (a, b) => a + Math.random() * (b - a);
const ri = (a, b) => Math.floor(rnd(a, b + 1));
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;

/* ---------------------------------------------------------------- save */
const SAVE_KEY = 'zip-gloops-v1';
const save = {
  lang: 'fr', music: true, voice: true, stars: 0, stickers: 0, lv: { count: 1, numbers: 1, add: 1, letters: 1, first: 1, drive: 1, place: 1, colors: 1, race: 1, sub: 1, compare: 1, clock: 1, shapes: 1, pattern: 1, sight: 1, syl: 1, rhyme: 1, geo: 1, hunt: 1 },
  st: { right: 0, first: 0, rounds: 0, perfect: 0, best: 0, place: 0, drive: 0, chals: 0, alldays: 0, adv: 0, bought: 0, race: 0, art: 0, stories: 0, paths: 0, mode: {} },
  spent: 0, shop: { owned: {}, eq: { hat: '', glasses: '', zip: 'blue', car: 'red' } },
  ach: {}, day: null, dayStreak: { last: '', n: 0 }, adv: { stop: 0, friends: [] }, acc: {}, path: null, name: ''
};
try {
  const d = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
  if (d && typeof d === 'object') {
    if (d.lang === 'fr' || d.lang === 'en') save.lang = d.lang;
    if (typeof d.name === 'string') save.name = d.name.replace(/[<>&"]/g, '').trim().slice(0, 12);
    save.music = d.music !== false; save.voice = d.voice !== false;
    save.stars = Math.max(0, d.stars | 0); save.stickers = Math.max(0, d.stickers | 0);
    if (d.lv) for (const k in save.lv) save.lv[k] = clamp(d.lv[k] | 0 || 1, 1, 3);
    if (d.st && typeof d.st === 'object') {
      for (const k in save.st) if (k !== 'mode') save.st[k] = Math.max(0, d.st[k] | 0);
      if (d.st.mode && typeof d.st.mode === 'object') for (const k in d.st.mode) save.st.mode[k] = Math.max(0, d.st.mode[k] | 0);
    }
    save.spent = Math.max(0, Math.min(d.spent | 0, save.stars));
    if (d.shop && typeof d.shop === 'object') {
      if (d.shop.owned && typeof d.shop.owned === 'object') for (const k in d.shop.owned) if (d.shop.owned[k]) save.shop.owned[k] = true;
      if (d.shop.eq && typeof d.shop.eq === 'object') for (const k in save.shop.eq) if (typeof d.shop.eq[k] === 'string') save.shop.eq[k] = d.shop.eq[k];
    }
    if (d.ach && typeof d.ach === 'object') for (const k in d.ach) if (d.ach[k]) save.ach[k] = true;
    if (d.day && typeof d.day === 'object' && typeof d.day.d === 'string' && Array.isArray(d.day.ch)) save.day = d.day;
    if (d.dayStreak && typeof d.dayStreak.last === 'string') save.dayStreak = { last: d.dayStreak.last, n: Math.max(0, d.dayStreak.n | 0) };
    if (d.acc && typeof d.acc === 'object') for (const k in d.acc) if (typeof d.acc[k] === 'number') save.acc[k] = clamp(d.acc[k], 0, 1);
    if (d.path && typeof d.path.d === 'string' && Array.isArray(d.path.steps)) { const st = d.path.steps.filter((x) => typeof x === 'string').slice(0, 5); save.path = { d: d.path.d, steps: st, idx: clamp(d.path.idx | 0, 0, st.length) }; }
    if (d.adv && typeof d.adv === 'object') { save.adv.stop = clamp(d.adv.stop | 0, 0, 4); if (Array.isArray(d.adv.friends)) save.adv.friends = d.adv.friends.filter((x) => typeof x === 'string'); }
  }
} catch (e) { /* storage unavailable: play without saving */ }
function nameLine(line, always) {
  if (!save.name || (!always && Math.random() > 0.4)) return line;
  return line.replace(/\s*[!.]\s*$/, '') + ', ' + save.name + ' !';
}
const persist = () => { try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch (e) { /* ignore */ } };
let L = save.lang;

/* ---------------------------------------------------------------- text */
const UI = {
  fr: { logo2: 'et les Gloops', start: 'Jouer !', m_count: 'Compter', m_numbers: 'Les nombres', m_add: 'Additions', m_letters: 'Les lettres', m_first: 'Première lettre', album: 'Mes autocollants', again: 'Encore !', menu: 'Menu', newsticker: 'Nouvel autocollant !', yay: 'Youpi !', back: 'Retour', home: 'Menu', music: 'Son', listen: 'Écouter', m_drive: 'En voiture', m_place: 'Les mots', m_colors: 'Les couleurs', snd_music: 'Musique', snd_voice: 'Voix', m_race: 'Course', m_paint: 'Dessin', m_stories: 'Histoires', p_undo: 'Annuler', p_erase: 'Gomme', p_clear: 'Effacer', p_save: 'Garder', s_listen: 'Écouter', s_again: 'Relire', s_more: 'Autres histoires', s_title: 'Quelle histoire ?', s_q: 'Questions', shop: 'Boutique', tab_hat: 'Chapeaux', tab_glasses: 'Lunettes', tab_zip: 'Couleur de Zip', tab_car: 'Couleur de la voiture', m_adv: 'Aventure', adv_sub: 'Aide tes nouveaux amis !', trophies: 'Trophées', album_btn: 'Autocollants', chal_title: 'Défis du jour', ach_title: 'Mes trophées', go: 'On y va !', next: 'Suivant' },
  en: { logo2: '& the Gloops', start: 'Play!', m_count: 'Counting', m_numbers: 'Numbers', m_add: 'Adding', m_letters: 'Letters', m_first: 'First letter', album: 'My stickers', again: 'Again!', menu: 'Menu', newsticker: 'New sticker!', yay: 'Yay!', back: 'Back', home: 'Menu', music: 'Sound', listen: 'Listen', m_drive: 'Road trip', m_place: 'Spelling', m_colors: 'Colors', snd_music: 'Music', snd_voice: 'Voice', m_race: 'Race', m_paint: 'Paint', m_stories: 'Stories', p_undo: 'Undo', p_erase: 'Eraser', p_clear: 'Clear', p_save: 'Save', s_listen: 'Listen', s_again: 'Read again', s_more: 'More stories', s_title: 'Which story?', s_q: 'Questions', shop: 'Shop', tab_hat: 'Hats', tab_glasses: 'Glasses', tab_zip: 'Zip color', tab_car: 'Car color', m_adv: 'Adventure', adv_sub: 'Help your new friends!', trophies: 'Trophies', album_btn: 'Stickers', chal_title: 'Daily challenges', ach_title: 'My trophies', go: "Let's go!", next: 'Next' }
};
const TX = {
  fr: {
    praise: [`Bravo !`, 'Super !', `Bien joué !`, 'Génial !', `Youpi !`, 'Excellent !', `Tu es fort !`],
    again: ['Essaie encore !', 'Presque ! Essaie encore !', 'Oups ! Essaie encore !'],
    hello: `Salut ! Je suis Zip ! Choisis un jeu !`,
    roundTitle: [`Bravo !`, 'Super travail !', `Quelle belle partie !`],
    roundText: (f, n) => `Tu as trouvé ${f} sur ${n} du premier coup !`,
    albumCount: (n, t) => `${n} sur ${t}`,
    next: (k) => `Encore ${k} étoile${k > 1 ? 's' : ''} pour le prochain !`,
    full: 'Tu as tous les autocollants !',
    sayStickers: 'Un nouvel autocollant !',
    shopHave: (n) => `Tu as ${n} ⭐`, shopMore: (k) => `Encore ${k} étoile${k > 1 ? 's' : ''} !`, shopYay: 'Super choix !',
    achNew: 'Nouveau trophée !', chalDone: 'Défi réussi !', chalAll: 'Les 3 défis du jour !',
    stopTitle: (i, n) => `Ami ${i} sur ${n}`, advDone: 'Bravo ! Tu as aidé tous tes amis !', advDoneT: 'Aventure terminée !'
  },
  en: {
    praise: [`Great job!`, 'Super!', `Well done!`, 'Awesome!', `Yay!`, `You did it!`, 'Fantastic!'],
    again: ['Try again!', 'Almost! Try again!', 'Oops! Try again!'],
    hello: `Hi! I'm Zip! Pick a game!`,
    roundTitle: [`Great job!`, 'Super work!', `What a round!`],
    roundText: (f, n) => `You got ${f} out of ${n} on the first try!`,
    albumCount: (n, t) => `${n} of ${t}`,
    next: (k) => `${k} more star${k > 1 ? 's' : ''} for the next one!`,
    full: 'You have every sticker!',
    sayStickers: 'A new sticker!',
    shopHave: (n) => `You have ${n} ⭐`, shopMore: (k) => `${k} more star${k > 1 ? 's' : ''}!`, shopYay: 'Great choice!',
    achNew: 'New trophy!', chalDone: 'Challenge done!', chalAll: 'All 3 daily challenges!',
    stopTitle: (i, n) => `Friend ${i} of ${n}`, advDone: 'You helped all your friends!', advDoneT: 'Adventure complete!'
  }
};
const NUMW = {
  fr: ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze'],
  en: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve']
};
const nw = (n) => NUMW[L][n];
const LETSAY = {
  fr: { A: 'a', B: 'bé', C: 'cé', D: 'dé', E: 'eu', F: 'effe', G: 'gé', H: 'hache', I: 'i', J: 'ji', K: 'ka', L: 'elle', M: 'emme', N: 'enne', O: 'o', P: 'pé', Q: 'ku', R: 'erre', S: 'esse', T: 'té', U: 'u', V: 'vé', W: 'double vé', X: 'ix', Y: 'i grec', Z: 'zèd' },
  en: { A: 'ay', B: 'bee', C: 'cee', D: 'dee', E: 'ee', F: 'eff', G: 'gee', H: 'aitch', I: 'eye', J: 'jay', K: 'kay', L: 'el', M: 'em', N: 'en', O: 'oh', P: 'pee', Q: 'cue', R: 'are', S: 'ess', T: 'tee', U: 'you', V: 'vee', W: 'double you', X: 'ex', Y: 'why', Z: 'zee' }
};
const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const ITEMS = [
  { e: '🍎', fr: "de pommes", en: 'apples' }, { e: '⭐', fr: "d'étoiles", en: 'stars' }, { e: '🐟', fr: 'de poissons', en: 'fish' },
  { e: '🎈', fr: 'de ballons', en: 'balloons' }, { e: '🐥', fr: 'de poussins', en: 'chicks' }, { e: '🚗', fr: "d'autos", en: 'cars' },
  { e: '🌸', fr: 'de fleurs', en: 'flowers' }, { e: '🍪', fr: 'de biscuits', en: 'cookies' }, { e: '🐞', fr: 'de coccinelles', en: 'ladybugs' },
  { e: '🦋', fr: 'de papillons', en: 'butterflies' }
];
const VOC = {
  fr: [['ananas', '🍍', 'A'], ['banane', '🍌', 'B'], ['chat', '🐱', 'C'], ['dauphin', '🐬', 'D'], ['éléphant', '🐘', 'E'], ['fraise', '🍓', 'F'], ['girafe', '🦒', 'G'], ['hibou', '🦉', 'H'], ['île', '🏝️', 'I'], ['jus', '🧃', 'J'], ['koala', '🐨', 'K'], ['lion', '🦁', 'L'], ['maison', '🏠', 'M'], ['nuage', '☁️', 'N'], ['orange', '🍊', 'O'], ['pomme', '🍎', 'P'], ['renard', '🦊', 'R'], ['soleil', '☀️', 'S'], ['tortue', '🐢', 'T'], ['vache', '🐮', 'V'], ['wagon', '🚃', 'W'], ['zèbre', '🦓', 'Z']],
  en: [['apple', '🍎', 'A'], ['banana', '🍌', 'B'], ['cat', '🐱', 'C'], ['dog', '🐶', 'D'], ['elephant', '🐘', 'E'], ['fish', '🐟', 'F'], ['giraffe', '🦒', 'G'], ['hat', '🎩', 'H'], ['ice cream', '🍦', 'I'], ['juice', '🧃', 'J'], ['kite', '🪁', 'K'], ['lion', '🦁', 'L'], ['moon', '🌙', 'M'], ['nose', '👃', 'N'], ['orange', '🍊', 'O'], ['pizza', '🍕', 'P'], ['queen', '👑', 'Q'], ['rabbit', '🐰', 'R'], ['sun', '☀️', 'S'], ['tree', '🌳', 'T'], ['umbrella', '☂️', 'U'], ['violin', '🎻', 'V'], ['whale', '🐳', 'W'], ['zebra', '🦓', 'Z']]
};
VOC.fr.push(['arbre', '🌳', 'A'], ['avion', '✈️', 'A'], ['abeille', '🐝', 'A'], ['bateau', '⛵', 'B'], ['ballon', '⚽', 'B'], ['bonbon', '🍬', 'B'], ['biscuit', '🍪', 'B'], ['bébé', '👶', 'B'],
  ['camion', '🚚', 'C'], ['canard', '🦆', 'C'], ['carotte', '🥕', 'C'], ['cerise', '🍒', 'C'], ['citron', '🍋', 'C'], ['cheval', '🐴', 'C'], ['chien', '🐶', 'C'], ['clé', '🔑', 'C'],
  ['dragon', '🐉', 'D'], ['dent', '🦷', 'D'], ['dé', '🎲', 'D'], ['étoile', '⭐', 'E'], ['escargot', '🐌', 'E'], ['fleur', '🌸', 'F'], ['fusée', '🚀', 'F'], ['fromage', '🧀', 'F'],
  ['gâteau', '🎂', 'G'], ['glace', '🍦', 'G'], ['guitare', '🎸', 'G'], ['hérisson', '🦔', 'H'], ['kiwi', '🥝', 'K'], ['lune', '🌙', 'L'], ['livre', '📖', 'L'], ['lapin', '🐰', 'L'], ['loup', '🐺', 'L'], ['lait', '🥛', 'L'],
  ['mouton', '🐑', 'M'], ['melon', '🍈', 'M'], ['miel', '🍯', 'M'], ['moto', '🏍️', 'M'], ['montre', '⌚', 'M'], ['main', '✋', 'M'], ['nez', '👃', 'N'], ['noix', '🥜', 'N'],
  ['ours', '🐻', 'O'], ['oiseau', '🐦', 'O'], ['oignon', '🧅', 'O'], ['papillon', '🦋', 'P'], ['poisson', '🐟', 'P'], ['poire', '🍐', 'P'], ['pizza', '🍕', 'P'], ['panda', '🐼', 'P'], ['pingouin', '🐧', 'P'], ['pain', '🍞', 'P'],
  ['requin', '🦈', 'R'], ['robot', '🤖', 'R'], ['rose', '🌹', 'R'], ['raisin', '🍇', 'R'], ['singe', '🐵', 'S'], ['serpent', '🐍', 'S'], ['tomate', '🍅', 'T'], ['train', '🚂', 'T'], ['tigre', '🐯', 'T'], ['tambour', '🥁', 'T'],
  ['vélo', '🚲', 'V'], ['voiture', '🚗', 'V'], ['violon', '🎻', 'V'], ['volcan', '🌋', 'V'], ['yoyo', '🪀', 'Y']);
VOC.en.push(['ant', '🐜', 'A'], ['airplane', '✈️', 'A'], ['ball', '⚽', 'B'], ['bear', '🐻', 'B'], ['bee', '🐝', 'B'], ['bus', '🚌', 'B'], ['bird', '🐦', 'B'], ['bed', '🛏️', 'B'], ['bread', '🍞', 'B'], ['boat', '⛵', 'B'],
  ['car', '🚗', 'C'], ['cake', '🎂', 'C'], ['cow', '🐮', 'C'], ['clock', '🕐', 'C'], ['carrot', '🥕', 'C'], ['cherry', '🍒', 'C'], ['duck', '🦆', 'D'], ['drum', '🥁', 'D'], ['dragon', '🐉', 'D'], ['dice', '🎲', 'D'],
  ['egg', '🥚', 'E'], ['eye', '👁️', 'E'], ['flower', '🌸', 'F'], ['frog', '🐸', 'F'], ['fox', '🦊', 'F'], ['grapes', '🍇', 'G'], ['goat', '🐐', 'G'], ['guitar', '🎸', 'G'], ['horse', '🐴', 'H'], ['house', '🏠', 'H'], ['heart', '❤️', 'H'],
  ['ice', '🧊', 'I'], ['jeep', '🚙', 'J'], ['key', '🔑', 'K'], ['kiwi', '🥝', 'K'], ['leaf', '🍃', 'L'], ['lemon', '🍋', 'L'], ['monkey', '🐵', 'M'], ['mouse', '🐭', 'M'], ['milk', '🥛', 'M'], ['mushroom', '🍄', 'M'],
  ['nut', '🥜', 'N'], ['owl', '🦉', 'O'], ['octopus', '🐙', 'O'], ['pear', '🍐', 'P'], ['pig', '🐷', 'P'], ['penguin', '🐧', 'P'], ['panda', '🐼', 'P'], ['robot', '🤖', 'R'], ['rose', '🌹', 'R'], ['rocket', '🚀', 'R'],
  ['snake', '🐍', 'S'], ['star', '⭐', 'S'], ['snail', '🐌', 'S'], ['shoe', '👟', 'S'], ['sock', '🧦', 'S'], ['tiger', '🐯', 'T'], ['train', '🚂', 'T'], ['turtle', '🐢', 'T'], ['truck', '🚚', 'T'],
  ['van', '🚐', 'V'], ['watch', '⌚', 'W'], ['worm', '🐛', 'W'], ['yo-yo', '🪀', 'Y']);
const COLORS = [
  { id: 'red', hex: '#ff4b4b', fr: 'rouge', en: 'red' }, { id: 'blue', hex: '#3b8cff', fr: 'bleu', en: 'blue' }, { id: 'yellow', hex: '#ffd23c', fr: 'jaune', en: 'yellow' }, { id: 'green', hex: '#3ecb5c', fr: 'vert', en: 'green' },
  { id: 'orange', hex: '#ff9a3d', fr: 'orange', en: 'orange' }, { id: 'purple', hex: '#9b5de5', fr: 'violet', en: 'purple' }, { id: 'pink', hex: '#ff8fc7', fr: 'rose', en: 'pink' }, { id: 'brown', hex: '#9a6a43', fr: 'brun', en: 'brown' }
];
const COLOR_ITEMS = [
  ['🍓', 'la fraise', 'the strawberry', 'red'], ['🍅', 'la tomate', 'the tomato', 'red'], ['🍌', 'la banane', 'the banana', 'yellow'], ['🍋', 'le citron', 'the lemon', 'yellow'], ['🌽', 'le maïs', 'the corn', 'yellow'],
  ['🐸', 'la grenouille', 'the frog', 'green'], ['🥝', 'le kiwi', 'the kiwi', 'green'], ['🥒', 'le concombre', 'the cucumber', 'green'], ['🐢', 'la tortue', 'the turtle', 'green'],
  ['💧', "la goutte d'eau", 'the water drop', 'blue'], ['🐳', 'la baleine', 'the whale', 'blue'], ['🍊', "l'orange", 'the orange', 'orange'], ['🥕', 'la carotte', 'the carrot', 'orange'], ['🦊', 'le renard', 'the fox', 'orange'],
  ['🍇', 'le raisin', 'the grapes', 'purple'], ['🌸', 'la fleur', 'the flower', 'pink'], ['🐷', 'le cochon', 'the pig', 'pink'], ['🐻', "l'ours", 'the bear', 'brown']
];
const SHOP = {
  hat: [{ id: 'party', p: 10, ic: '🎉', fr: 'Chapeau de fête', en: 'Party hat' }, { id: 'cap', p: 15, ic: '🧢', fr: 'Casquette', en: 'Cap' }, { id: 'top', p: 20, ic: '🎩', fr: 'Haut-de-forme', en: 'Top hat' }, { id: 'crown', p: 25, ic: '👑', fr: 'Couronne', en: 'Crown' }],
  glasses: [{ id: 'shades', p: 15, ic: '🕶️', fr: 'Lunettes de soleil', en: 'Sunglasses' }, { id: 'hearts', p: 20, ic: '😍', fr: 'Lunettes cœur', en: 'Heart glasses' }, { id: 'stars', p: 25, ic: '🤩', fr: 'Lunettes étoile', en: 'Star glasses' }],
  zip: [{ id: 'blue', p: 0, hex: '#4cc9f0', fr: 'Bleu', en: 'Blue' }, { id: 'green', p: 12, hex: '#3ecb7a', fr: 'Vert', en: 'Green' }, { id: 'purple', p: 12, hex: '#a07bff', fr: 'Violet', en: 'Purple' }, { id: 'pink', p: 12, hex: '#ff7eb6', fr: 'Rose', en: 'Pink' }, { id: 'orange', p: 12, hex: '#ff9a3d', fr: 'Orange', en: 'Orange' }],
  car: [{ id: 'red', p: 0, hex: '#ff5a5a', fr: 'Rouge', en: 'Red' }, { id: 'blue', p: 12, hex: '#4a8cff', fr: 'Bleu', en: 'Blue' }, { id: 'gold', p: 15, hex: '#ffc93c', fr: 'Or', en: 'Gold' }, { id: 'pink', p: 12, hex: '#ff7eb6', fr: 'Rose', en: 'Pink' }, { id: 'green', p: 12, hex: '#3ecb7a', fr: 'Vert', en: 'Green' }]
};
for (const k in save.shop.eq) if (save.shop.eq[k] && !SHOP[k].some((x) => x.id === save.shop.eq[k])) save.shop.eq[k] = k === 'zip' ? 'blue' : k === 'car' ? 'red' : '';
const balance = () => save.stars - save.spent;
const STICKERS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🦉', '🦄', '🐝', '🦋', '🐢', '🐙', '🐬'];
const STICKER_EVERY = 12;
const ROUND_LEN = 8;
const CHARS = [
  { id: 'bibi', e: '🐰', n: 'Bibi', mode: 'count',
    fr: { need: "Salut ! Je suis Bibi. J'ai perdu le compte de mes carottes ! Peux-tu m'aider à compter ?", thanks: "Merci ! Maintenant je sais combien j'ai de carottes !" },
    en: { need: "Hi! I'm Bibi. I lost count of my carrots! Can you help me count?", thanks: 'Thank you! Now I know how many carrots I have!' } },
  { id: 'pingo', e: '🐧', n: 'Pingo', mode: 'drive',
    fr: { need: 'Bonjour ! Je suis Pingo. Je suis en retard pour la fête sur la glace ! Peux-tu me conduire ?', thanks: 'Merci ! Je suis arrivé à temps pour la fête !' },
    en: { need: "Hello! I'm Pingo. I'm late for the party on the ice! Can you drive me there?", thanks: 'Thank you! I made it to the party on time!' } },
  { id: 'lulu', e: '🦉', n: 'Lulu', mode: 'place',
    fr: { need: "Hou hou ! Je suis Lulu. Le vent a emporté mes lettres ! Peux-tu les remettre à leur place ?", thanks: 'Merci ! Mes mots sont tout réparés !' },
    en: { need: "Hoo hoo! I'm Lulu. The wind blew away my letters! Can you put them back?", thanks: 'Thank you! My words are all fixed!' } },
  { id: 'momo', e: '🐵', n: 'Momo', mode: 'add',
    fr: { need: "Ouh ouh ! Je suis Momo. J'ai trop de bananes et je ne sais plus les additionner ! Aide-moi !", thanks: 'Merci ! Je peux faire un énorme smoothie !' },
    en: { need: "Ooh ooh! I'm Momo. I have so many bananas and I can't add them up! Help me!", thanks: 'Thank you! Now I can make a giant smoothie!' } },
  { id: 'drako', e: '🐲', n: 'Drako', mode: 'mix',
    fr: { need: 'Rooaar ! Je suis Drako, le petit dragon. Montre-moi tout ce que tu sais faire !', thanks: 'Bravo ! Tu es le meilleur ami des Gloops !' },
    en: { need: "Rooaar! I'm Drako, the little dragon. Show me everything you can do!", thanks: 'Hooray! You are the best friend of the Gloops!' } }
];
const STOP_LEN = 3;

/* ---------------------------------------------------------------- question generators */
const recent = {};
function pickFresh(list, key) {
  const r = recent[key] || (recent[key] = []);
  let pool = list.filter((w) => !r.includes(w[0])); if (!pool.length) pool = list;
  const w = pick(pool); r.push(w[0]); while (r.length > Math.min(16, Math.floor(list.length / 2))) r.shift();
  return w;
}
function numOptions(n, min, max, count) {
  const set = new Set([n]);
  let guard = 0;
  while (set.size < count && guard++ < 80) { const v = n + ri(-3, 3); if (v >= min && v <= max) set.add(v); }
  for (let v = min; set.size < count && v <= max; v++) set.add(v);
  return shuffle([...set]).map((v) => ({ val: String(v), label: String(v), say: nw(v) }));
}
function letOptions(pool, ans, count) {
  const set = new Set([ans]);
  const others = shuffle(pool.filter((c) => c !== ans));
  for (const c of others) { if (set.size >= count) break; set.add(c); }
  return shuffle([...set]).map((c) => ({ val: c, label: c, say: LETSAY[L][c] }));
}
const rowsOf = (n, fs, gone = 0, emoji) => {
  const per = n > 5 ? Math.ceil(n / 2) : n;
  let html = '', k = 0;
  while (k < n) {
    const take = Math.min(per, n - k);
    html += '<div class="row">';
    for (let j = 0; j < take; j++, k++) html += `<span class="it${k >= n - gone ? ' gone' : ''}" style="--i:${k};font-size:${fs}px">${emoji}</span>`;
    html += '</div>';
  }
  return html;
};
const GEN = {
  count(lv) {
    const max = lv === 1 ? 5 : lv === 2 ? 8 : 10, n = ri(1, max), it = pick(ITEMS);
    const t = L === 'fr' ? `Combien ${it.fr} ?` : `How many ${it.en}?`;
    return { vis: rowsOf(n, n > 6 ? 34 : 42, 0, it.e), text: t, say: t, ans: String(n), opts: numOptions(n, 1, Math.max(max, 5), lv === 1 ? 3 : 4), hint: L === 'fr' ? `C'est le ${nw(n)} !` : `It's ${nw(n)}!` };
  },
  numbers(lv) {
    if (lv === 3) {
      const n = ri(1, 9);
      const t = L === 'fr' ? `Quel nombre vient après ${n} ?` : `What number comes after ${n}?`;
      return { vis: `<div class="big">${n} → ?</div>`, text: t, say: L === 'fr' ? `Quel nombre vient après ${nw(n)} ?` : `What number comes after ${nw(n)}?`, ans: String(n + 1), opts: numOptions(n + 1, 1, 10, 4), hint: L === 'fr' ? `C'est le ${nw(n + 1)} !` : `It's ${nw(n + 1)}!` };
    }
    const n = lv === 1 ? ri(1, 5) : ri(0, 10);
    const t = L === 'fr' ? `Trouve le ${n}` : `Find the number ${n}`;
    const vis = lv === 1 ? `<div class="big">${nw(n)}</div>` : '<div class="pic">👂</div>';
    return { vis, text: t, say: L === 'fr' ? `Trouve le ${nw(n)}` : `Find the number ${nw(n)}`, ans: String(n), opts: numOptions(n, lv === 1 ? 1 : 0, lv === 1 ? 5 : 10, lv === 1 ? 3 : 4), hint: L === 'fr' ? `C'est le ${nw(n)} !` : `It's ${nw(n)}!` };
  },
  add(lv) {
    let a, b, sub = false;
    if (lv === 1) { a = ri(1, 4); b = ri(1, 5 - a); }
    else if (lv === 2) { a = ri(1, 9); b = ri(1, 10 - a); }
    else if (Math.random() < 0.5) { a = ri(2, 10); b = ri(1, a - 1); sub = true; }
    else { a = ri(1, 9); b = ri(1, 10 - a); }
    const r = sub ? a - b : a + b, fs = a + b > 8 || a > 8 ? 24 : a + b > 5 ? 30 : 38;
    const em = pick(ITEMS).e;
    let vis;
    if (sub) vis = rowsOf(a, a > 6 ? 26 : 32, b, em) + `<div class="big eq">${a} − ${b} = ?</div>`;
    else vis = `<div class="row">${rowsOf(a, fs, 0, em).replace(/<\/?div[^>]*>/g, '')}<span class="big" style="font-size:${fs}px;margin:0 4px">+</span>${rowsOf(b, fs, 0, em).replace(/<\/?div[^>]*>/g, '')}</div><div class="big eq">${a} + ${b} = ?</div>`;
    const op = sub ? (L === 'fr' ? 'moins' : 'minus') : 'plus';
    const t = L === 'fr' ? `Combien font ${a} ${op} ${b} ?` : `What is ${a} ${op} ${b}?`;
    return { vis, text: t, say: L === 'fr' ? `Combien font ${nw(a)} ${op} ${nw(b)} ?` : `What is ${nw(a)} ${op} ${nw(b)}?`, ans: String(r), opts: numOptions(r, 0, 10, lv === 1 ? 3 : 4), hint: L === 'fr' ? `${nw(a)} ${op} ${nw(b)}, ça fait ${nw(r)} !` : `${nw(a)} ${op} ${nw(b)} is ${nw(r)}!` };
  },
  letters(lv) {
    const pool = lv === 1 ? ALPHA.slice(0, 6) : lv === 2 ? ALPHA.slice(0, 16) : ALPHA;
    const c = pick(pool), s = LETSAY[L][c];
    if (lv === 3) {
      const t = L === 'fr' ? `Trouve la majuscule de « ${c.toLowerCase()} »` : `Find the capital letter for “${c.toLowerCase()}”`;
      return { vis: `<div class="big">${c.toLowerCase()}</div>`, text: t, say: L === 'fr' ? `Trouve la majuscule de la lettre ${s}` : `Find the capital letter for ${s}`, ans: c, opts: letOptions(pool, c, 4), hint: L === 'fr' ? `C'est la lettre ${s} !` : `It's the letter ${s}!` };
    }
    const t = L === 'fr' ? `Trouve la lettre ${c}` : `Find the letter ${c}`;
    return { vis: lv === 1 ? `<div class="big">${c}</div>` : '<div class="pic">👂</div>', text: t, say: L === 'fr' ? `Trouve la lettre ${s}` : `Find the letter ${s}`, ans: c, opts: letOptions(pool, c, lv === 1 ? 3 : 4), hint: L === 'fr' ? `C'est la lettre ${s} !` : `It's the letter ${s}!` };
  },
  first(lv) {
    const list = VOC[L], [w, e, c] = pickFresh(list, 'first' + L), pool = [...new Set(list.map((x) => x[2]))], s = LETSAY[L][c];
    const t = L === 'fr' ? `Quelle lettre commence « ${w} » ?` : `Which letter does “${w}” start with?`;
    return { vis: `<div class="pic">${e}</div>${lv < 3 ? `<div class="word">${w}</div>` : ''}`, text: t, say: L === 'fr' ? `Par quelle lettre commence le mot ${w} ?` : `Which letter does the word ${w} start with?`, ans: c, opts: letOptions(pool, c, lv === 1 ? 3 : 4), hint: L === 'fr' ? `${w} commence par la lettre ${s} !` : `${w} starts with the letter ${s}!` };
  },
  colors(lv) {
    const fr = L === 'fr', pool = COLORS.slice(0, lv === 1 ? 4 : 8), cnt = lv === 1 ? 3 : 4;
    const mk = (c, label) => ({ val: c.id, label, say: c[L], hex: c.hex });
    if (lv === 3) {
      const it = pick(COLOR_ITEMS.filter((x) => !(recent.ci || []).includes(x[0]))), col = COLORS.find((c) => c.id === it[3]);
      recent.ci = (recent.ci || []).concat(it[0]).slice(-8);
      const t = fr ? `De quelle couleur est ${it[1]} ?` : `What color is ${it[2]}?`;
      const opts = shuffle([col].concat(shuffle(COLORS.filter((c) => c.id !== col.id)).slice(0, cnt - 1))).map((c) => mk(c, ''));
      return { vis: `<div class="pic">${it[0]}</div>`, text: t, say: t, ans: col.id, opts, hint: fr ? `C'est ${col.fr} !` : `It's ${col.en}!` };
    }
    const col = pick(pool), opts = shuffle([col].concat(shuffle(pool.filter((c) => c.id !== col.id)).slice(0, cnt - 1))).map((c) => mk(c, lv === 1 ? c[L] : ''));
    const t = fr ? `Trouve la couleur ${col.fr}` : `Find the color ${col.en}`;
    return { vis: `<div class="pic">${lv === 1 ? '🎨' : '👂'}</div>`, text: t, say: t, ans: col.id, opts, hint: fr ? `C'est ${col.fr} !` : `It's ${col.en}!` };
  },
  drive(lv) {
    if (lv === 3) {
      const a = ri(1, 5), b = ri(1, 5), r = a + b;
      return { vis: `<div class="big eq">${a} + ${b}</div>`, text: L === 'fr' ? `Prends la route qui vaut ${a} plus ${b}` : `Take the road that is ${a} plus ${b}`,
        say: L === 'fr' ? `Prends la route qui vaut ${nw(a)} plus ${nw(b)}` : `Take the road that is ${nw(a)} plus ${nw(b)}`, ans: String(r), opts: numOptions(r, 2, 10, 5),
        hint: L === 'fr' ? `${nw(a)} plus ${nw(b)}, ça fait ${nw(r)} !` : `${nw(a)} plus ${nw(b)} is ${nw(r)}!` };
    }
    const max = lv === 1 ? 5 : 10, n = ri(lv === 1 ? 1 : 0, max);
    return { vis: lv === 1 ? `<div class="big">${n}</div>` : '<div class="pic">🚗</div>', text: L === 'fr' ? `Conduis Zip vers le ${n}` : `Drive Zip to number ${n}`,
      say: L === 'fr' ? `Conduis Zip vers le ${nw(n)}` : `Drive Zip to number ${nw(n)}`, ans: String(n), opts: numOptions(n, lv === 1 ? 1 : 0, max, lv === 1 ? 3 : 4),
      hint: L === 'fr' ? `C'est la route du ${nw(n)} !` : `It's the road to ${nw(n)}!` };
  },
  place(lv) {
    const words = VOC[L].filter((w) => /^[a-z]+$/.test(w[0]) && w[0].length >= 3 && w[0].length <= (lv === 3 ? 6 : 5));
    const [w, e] = pickFresh(words, 'place' + L + lv), ch = w.toUpperCase().split('');
    let blanks;
    if (lv === 1) blanks = [0];
    else if (lv === 2) blanks = ch.length >= 4 ? shuffle(ch.map((_, i) => i)).slice(0, 2).sort((a, b) => a - b) : [0, ch.length - 1];
    else blanks = ch.map((_, i) => i);
    const need = blanks.map((i) => ch[i]);
    const extraN = lv === 1 ? 2 : lv === 2 ? 2 : 1;
    const others = shuffle(ALPHA.filter((c) => !need.includes(c))).slice(0, extraN);
    return { kind: 'place', vis: `<div class="pic">${e}</div>`, word: w, letters: ch, blanks, tiles: shuffle(need.concat(others)),
      text: L === 'fr' ? `Écris le mot « ${w} »` : `Spell the word “${w}”`, say: L === 'fr' ? `Écris le mot ${w}` : `Spell the word ${w}`, ans: '',
      hint: L === 'fr' ? `${w} s'écrit ${ch.join(', ')} !` : `${w} is spelled ${ch.join(', ')}!` };
  }
};

/* ---------------------------------------------------------------- audio */
const Snd = (() => {
  let ac = null, master, musicG, sfxG, noiseBuf, timer = null, step = 0, nextT = 0, track = 'menu', musicOn = save.music, voiceOn = save.voice, ducked = false;
  const mf = (m) => 440 * Math.pow(2, (m - 69) / 12);
  const SONGS = {
    menu: { bpm: 116, bass: [48, 45, 41, 43, 48, 45, 41, 43], shake: true,
      mel: [76, 0, 79, 76, 72, 76, 79, 0, 81, 0, 79, 76, 74, 76, 72, 0, 77, 0, 81, 77, 74, 77, 81, 0, 79, 0, 83, 79, 74, 79, 74, 0,
        72, 76, 79, 84, 79, 76, 72, 0, 69, 72, 76, 81, 76, 72, 69, 0, 72, 77, 81, 84, 81, 77, 72, 0, 71, 74, 79, 83, 79, 74, 71, 0] },
    play: { bpm: 92, bass: [48, 45, 41, 43, 48, 45, 41, 43], shake: false,
      mel: [72, 76, 79, 76, 72, 76, 79, 76, 69, 72, 76, 72, 69, 72, 76, 72, 65, 69, 72, 69, 65, 69, 72, 69, 67, 71, 74, 71, 67, 71, 74, 71,
        72, 76, 79, 84, 79, 76, 79, 76, 69, 72, 76, 81, 76, 72, 76, 72, 65, 69, 72, 77, 72, 69, 72, 69, 67, 71, 74, 79, 74, 71, 74, 71] }
  };
  function init() {
    if (ac) return;
    try {
      const C = window.AudioContext || window.webkitAudioContext;
      if (!C) return;
      ac = new C();
      master = ac.createGain(); master.gain.value = (musicOn || voiceOn) ? 0.9 : 0; master.connect(ac.destination);
      musicG = ac.createGain(); musicG.gain.value = musicOn ? 0.2 : 0; musicG.connect(master);
      sfxG = ac.createGain(); sfxG.gain.value = 0.55; sfxG.connect(master);
      noiseBuf = ac.createBuffer(1, ac.sampleRate * 0.4, ac.sampleRate);
      const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    } catch (e) { ac = null; }
  }
  function unlock() { init(); if (ac && ac.state === 'suspended') ac.resume(); if (musicOn) startMusic(); try { Voice.prime(); } catch (e) { /* ignore */ } }
  function pluck(m, t, dur, vol, out) {
    const f = mf(m), g = ac.createGain(), g2 = ac.createGain();
    const o = ac.createOscillator(), o2 = ac.createOscillator();
    o.type = 'sine'; o2.type = 'triangle'; o.frequency.value = f; o2.frequency.value = f * 2; g2.gain.value = 0.25;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); o2.connect(g2); g2.connect(g); g.connect(out || musicG);
    o.start(t); o2.start(t); o.stop(t + dur + 0.05); o2.stop(t + dur + 0.05);
  }
  function tone(type, f0, f1, t, dur, vol, out) {
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = type; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(out || sfxG); o.start(t); o.stop(t + dur + 0.05);
  }
  function noise(t, dur, vol, hp, out) {
    const s = ac.createBufferSource(), g = ac.createGain(), f = ac.createBiquadFilter();
    s.buffer = noiseBuf; f.type = 'highpass'; f.frequency.value = hp;
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(out || sfxG); s.start(t); s.stop(t + dur + 0.02);
  }
  function playStep(st, t) {
    const sg = SONGS[track], bar = Math.floor(st / 8), i = st % 8, n = sg.mel[st];
    if (n) pluck(n, t, track === 'menu' ? 0.32 : 0.5, track === 'menu' ? 0.42 : 0.34);
    const root = sg.bass[bar % 8];
    if (i === 0) pluck(root - 12 + 12, t, 0.55, 0.5);
    if (i === 4) pluck(root + 7 - (root + 7 > 55 ? 12 : 0), t, 0.4, 0.3);
    if (sg.shake && i % 2 === 1) noise(t, 0.05, 0.05, 7000, musicG);
    if (!sg.shake && i === 4) noise(t, 0.06, 0.035, 6000, musicG);
  }
  function tick() {
    if (!ac) return;
    const sg = SONGS[track];
    while (nextT < ac.currentTime + 0.25) {
      playStep(step, nextT);
      nextT += 60 / sg.bpm / 2; step = (step + 1) % 64;
    }
  }
  function startMusic() {
    if (!ac || timer) return;
    nextT = ac.currentTime + 0.08;
    timer = setInterval(tick, 60);
  }
  function stopMusic() { if (timer) { clearInterval(timer); timer = null; } }
  function applyMaster() { if (!ac) return; master.gain.cancelScheduledValues(ac.currentTime); master.gain.setTargetAtTime((musicOn || voiceOn) ? 0.9 : 0, ac.currentTime, 0.03); musicG.gain.cancelScheduledValues(ac.currentTime); musicG.gain.setTargetAtTime(musicOn ? (ducked ? 0.06 : 0.2) : 0, ac.currentTime, 0.03); }
  function Snd_duck(sec) { if (!ac || !musicOn) return; musicG.gain.setTargetAtTime(0.05, ac.currentTime, 0.05); setTimeout(() => { if (!ducked && ac && musicOn) musicG.gain.setTargetAtTime(0.2, ac.currentTime, 0.15); }, sec * 1000); }
  return {
    unlock,
    get on() { return musicOn; },
    get voiceOn() { return voiceOn; },
    setMusic(on) { musicOn = on; save.music = on; persist(); if (!ac) return; applyMaster(); if (on) startMusic(); else stopMusic(); },
    setVoice(on) { voiceOn = on; save.voice = on; persist(); applyMaster(); },
    setTrack(n) { if (track !== n) { track = n; step = 0; if (ac) nextT = ac.currentTime + 0.1; } },
    duckFor(sec) { Snd_duck(sec); },
    duck(on) { ducked = on; if (ac && musicOn) musicG.gain.setTargetAtTime(on ? 0.06 : 0.2, ac.currentTime, 0.12); },
    suspend(h) { if (!ac) return; if (h) ac.suspend(); else ac.resume(); },
    shoot() { if (!ac) return; const t = ac.currentTime; tone('sine', 420, 1100, t, 0.2, 0.28); noise(t, 0.1, 0.08, 4000); },
    pop() { if (!ac) return; const t = ac.currentTime; tone('triangle', 800, 140, t, 0.2, 0.5); noise(t, 0.12, 0.2, 2500); },
    good() { if (!ac) return; const t = ac.currentTime; [72, 76, 79, 84].forEach((m, k) => pluck(m, t + k * 0.085, 0.5, 0.55, sfxG)); },
    bad() { if (!ac) return; const t = ac.currentTime; tone('sine', 360, 270, t, 0.2, 0.3); tone('sine', 280, 210, t + 0.16, 0.26, 0.28); },
    click() { if (!ac) return; tone('sine', 700, 900, ac.currentTime, 0.08, 0.3); },
    star() { if (!ac) return; pluck(91, ac.currentTime, 0.3, 0.35, sfxG); },
    sticker() { if (!ac) return; const t = ac.currentTime; [72, 76, 79, 84, 88, 91].forEach((m, k) => pluck(m, t + k * 0.1, 0.7, 0.5, sfxG)); },
    honk() { if (!ac) return; const t = ac.currentTime; [0, 0.22].forEach((o) => { tone('square', 349, 349, t + o, 0.16, 0.1); tone('square', 440, 440, t + o, 0.16, 0.1); }); },
    vroom() { if (!ac) return; const t = ac.currentTime; tone('sawtooth', 80, 240, t, 0.85, 0.07); noise(t, 0.5, 0.04, 400); },
    drop() { if (!ac) return; const t = ac.currentTime; pluck(79, t, 0.3, 0.45, sfxG); noise(t, 0.05, 0.1, 3000); },
    whoosh() { if (!ac) return; const t = ac.currentTime; noise(t, 0.25, 0.06, 1500); }
  };
})();

/* ---------------------------------------------------------------- voice */
const Voice = (() => {
  let voices = [], utter = null, safety = 0;
  const ok = 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
  const load = () => { try { voices = speechSynthesis.getVoices() || []; } catch (e) { voices = []; } };
  if (ok) { load(); try { speechSynthesis.addEventListener('voiceschanged', load); } catch (e) { /* ignore */ } }
  const pickVoice = (lang) => {
    const prefs = lang === 'fr' ? ['fr-CA', 'fr-FR', 'fr'] : ['en-CA', 'en-US', 'en-GB', 'en'];
    for (const p of prefs) { const v = voices.find((x) => x.lang && x.lang.replace('_', '-').toLowerCase().startsWith(p.toLowerCase())); if (v) return v; }
    return null;
  };
  const speakBtn = $('speak');
  const done = () => { Snd.duck(false); speakBtn.classList.remove('talk'); clearTimeout(safety); };
  let primed = false, warned = false;
  const warn = () => { if (warned) return; warned = true; Prog.toast('🔇', L === 'fr' ? 'Pas de voix sur cet appareil' : 'No voice on this device', L === 'fr' ? 'Essaie Chrome ou Safari' : 'Try Chrome or Safari'); };
  return {
    ok, warn,
    prime() {
      if (!ok || primed) return; primed = true;
      try { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; speechSynthesis.speak(u); } catch (e) { /* ignore */ }
    },
    say(text, cb) {
      if (!ok || !text || !Snd.voiceOn) { if (cb) setTimeout(cb, 0); return; }
      try {
        const busy = speechSynthesis.speaking || speechSynthesis.pending;
        if (busy) speechSynthesis.cancel();
        try { speechSynthesis.resume(); } catch (e) { /* ignore */ }
        const u = new SpeechSynthesisUtterance(text);
        utter = u;
        u.lang = L === 'fr' ? 'fr-CA' : 'en-US';
        const v = pickVoice(L); if (v) { u.voice = v; u.lang = v.lang; }
        u.rate = 0.84; u.pitch = 1.12; u.volume = 1;
        u.onstart = () => { Snd.duck(true); speakBtn.classList.add('talk'); };
        u.onend = () => { if (utter === u) done(); if (cb) cb(); };
        u.onerror = (ev) => { if (utter === u) done(); if (ev && (ev.error === 'not-allowed' || ev.error === 'synthesis-unavailable' || ev.error === 'language-unavailable')) warn(); };
        const go = () => { try { speechSynthesis.speak(u); } catch (e) { done(); } };
        if (busy) setTimeout(go, 80); else go();
        clearTimeout(safety); safety = setTimeout(done, 9000);
      } catch (e) { done(); }
    },
    stop() { if (!ok) return; try { speechSynthesis.cancel(); } catch (e) { /* ignore */ } done(); }
  };
})();
