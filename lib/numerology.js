// lib/numerology.js
// Core numerology logic (Pythagorean + Chaldean + phone parsing)

const PYTHAG = {
  A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,I:9,
  J:1,K:2,L:3,M:4,N:5,O:6,P:7,Q:8,R:9,
  S:1,T:2,U:3,V:4,W:5,X:6,Y:7,Z:8
};

const CHALDEAN = {
  A:1,B:2,C:3,D:4,E:5,F:8,G:3,H:5,I:1,
  J:1,K:2,L:3,M:4,N:5,O:7,P:8,Q:1,R:2,
  S:3,T:4,U:6,V:6,W:6,X:5,Y:1,Z:7
};

function normalizeName(name=''){
  return String(name || '').toUpperCase().replace(/[^A-Z]/g,'');
}

function reduceToDigit(n){
  n = Number(n);
  while(n > 9 && n !== 11 && n !== 22 && n !== 33){
    let s = String(n).split('').reduce((a,b)=>a+Number(b),0);
    n = s;
  }
  return n;
}

function sumMapping(name, map){
  const s = normalizeName(name).split('').reduce((acc,ch)=>acc + (map[ch]||0),0);
  return { total: s, reduced: reduceToDigit(s) };
}

function lifePathFromDOB(dob){
  if(!dob) return null;
  const d = new Date(dob);
  if(isNaN(d)) return null;
  const parts = (d.getFullYear().toString() + (d.getMonth()+1).toString().padStart(2,'0') + d.getDate().toString().padStart(2,'0')).split('');
  const sum = parts.reduce((a,b)=>a+Number(b),0);
  return reduceToDigit(sum);
}

function soulNumber(name){
  const vowels = normalizeName(name).replace(/[^AEIOU]/g,'');
  const s = vowels.split('').reduce((acc,ch)=>acc + (PYTHAG[ch]||0),0);
  return { total: s, reduced: reduceToDigit(s) };
}

function personalityNumber(name){
  const consonants = normalizeName(name).replace(/[AEIOU]/g,'');
  const s = consonants.split('').reduce((acc,ch)=>acc + (PYTHAG[ch]||0),0);
  return { total: s, reduced: reduceToDigit(s) };
}

function destinyExpression(name){
  return sumMapping(name, PYTHAG);
}

function phoneInfluence(phone){
  if(!phone) return null;
  const digits = String(phone).replace(/[^0-9]/g,'').split('').map(Number);
  if(digits.length === 0) return null;
  const total = digits.reduce((a,b)=>a+b,0);
  const reduced = reduceToDigit(total);
  return { digits, total, reduced };
}

function karmicLessons(name){
  const letters = normalizeName(name);
  const freq = {};
  for(const ch of letters){
    const val = PYTHAG[ch] || 0;
    freq[val] = (freq[val]||0) + 1;
  }
  const missing = [];
  for(let i=1;i<=9;i++) if(!freq[i]) missing.push(i);
  return { freq, missing };
}

export function calculateReport(payload = {}){
  const { name='', dob=null, phone=null, notes='' } = payload;
  const py = destinyExpression(name);
  const ch = sumMapping(name, CHALDEAN);
  const soul = soulNumber(name);
  const personality = personalityNumber(name);
  const lifePath = lifePathFromDOB(dob);
  const phoneInf = phoneInfluence(phone);
  const karmic = karmicLessons(name);

  const pinnacles = {
    first: reduceToDigit((py.reduced || 0) + (lifePath||0)),
    second: reduceToDigit((ch.reduced || 0) + (phoneInf?phoneInf.reduced:0)),
  };

  const report = {
    input: { name, dob, phone, notes },
    pythagorean: py,
    chaldean: ch,
    soul, personality, lifePath, phone: phoneInf, karmic, pinnacles,
    generatedAt: new Date().toISOString()
  };

  report.interpretation = generateInterpretation(report);

  return report;
}

function generateInterpretation(r){
  const lines = [];
  lines.push(`ডেস্টিনি (Pythagorean) সংখ্যা: ${r.pythagorean.reduced} — মৌলিক প্রতিভা ও জীবনের লক্ষ্য নির্দেশ করে।`);
  if(r.lifePath) lines.push(`লাইফ-পাথ: ${r.lifePath} — জন্মদিন থেকে গণনা করা প্রধান পথ।`);
  if(r.soul) lines.push(`সোল নম্বর: ${r.soul.reduced} — অভ্যন্তরীণ ইচ্ছা/আকাঙ্ক্ষা।`);
  if(r.personality) lines.push(`পারসোনালিটি: ${r.personality.reduced} — বহিরাগত ভাবনাপ্রবণতা।`);
  if(r.karmic.missing && r.karmic.missing.length) lines.push(`কর্মিক পাঠ: অনুপস্থিত সংখ্যাগুলো ${r.karmic.missing.join(', ')} — এগুলোতে কাজ করা উচিত।`);
  if(r.phone) lines.push(`ফোন ইনফ্লুয়েন্স: ${r.phone.reduced} — মোবাইল নম্বরও আপনার জীবনের প্যাটার্নে ভূমিকা রাখে।`);
  return lines.join('\n');
}

// CommonJS export for Next.js environments that may require it
if(typeof module !== 'undefined') module.exports = { calculateReport };
