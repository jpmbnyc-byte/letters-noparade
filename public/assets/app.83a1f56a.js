"use strict";
(function(){
const IMG={"belongs_body":"/assets/belongs_body.17ebee8b.jpg","belongs_future":"/assets/belongs_future.ece12b44.jpg","belongs_god":"/assets/belongs_god.b56d2b46.jpg","cover_body":"/assets/cover_body.4862d08b.jpg","cover_future":"/assets/cover_future.9f4c9c48.jpg","cover_god":"/assets/cover_god.1a82ac21.jpg","hero_set":"/assets/hero_set.ba4c2bf3.jpg","hero_set_sq":"/assets/hero_set_sq.3c02dd11.jpg","spread_daily_body":"/assets/spread_daily_body.ab844dea.jpg","spread_daily_future":"/assets/spread_daily_future.404f0434.jpg","spread_daily_god":"/assets/spread_daily_god.6c2d482a.jpg","spread_deep_body":"/assets/spread_deep_body.dc0740e5.jpg","spread_deep_future":"/assets/spread_deep_future.4d705ba4.jpg","spread_deep_god":"/assets/spread_deep_god.f67777ad.jpg","spread_full_body":"/assets/spread_full_body.c51359dd.jpg","spread_full_future":"/assets/spread_full_future.26e1a054.jpg","spread_full_god":"/assets/spread_full_god.e7338d9a.jpg","spread_review_body":"/assets/spread_review_body.8ac9f698.jpg","spread_review_future":"/assets/spread_review_future.a63b692b.jpg","spread_review_god":"/assets/spread_review_god.4dfc11d8.jpg","trio_covers":"/assets/trio_covers.32646dca.jpg","wrap_body":"/assets/wrap_body.1db9d785.jpg","wrap_future":"/assets/wrap_future.ac1e3d55.jpg","wrap_god":"/assets/wrap_god.d9cba3b1.jpg"};
const ROUTES=[{"id":"home","path":"/","title":"Letters to God | Prayer journals dated to the moon","desc":"Hardcover prayer journals that turn with the moon. One command of Jesus a week, 48 in all, printed to order with your name and your start date.","img":"hero_set"},{"id":"shop","path":"/shop/","title":"Shop the journals | Letters to God","desc":"Three hardcover journals and a set, from $28. Each is printed to order with your name and dates set to the real phases of the moon.","img":"hero_set"},{"id":"pdp-god","path":"/books/letters-to-god/","title":"Letters to God, Volume I | Letters to God","desc":"The direct volume. A hardcover prayer journal with one command of Jesus a week in the King James words, dated to the moon. From $28.","img":"cover_god"},{"id":"pdp-future","path":"/books/letters-to-future-me/","title":"Letters to Future Me, Volume II | Letters to God","desc":"The forward volume. Write to the person you are becoming, station by station, and read it back in a year. From $28.","img":"cover_future"},{"id":"pdp-body","path":"/books/letters-to-my-body/","title":"Letters to My Body, Volume III | Letters to God","desc":"The somatic volume. Begin in the breath, the jaw and the hands, then write what happened. Dated to the moon. From $28.","img":"cover_body"},{"id":"pdp-set","path":"/books/the-trilogy/","title":"The trilogy, all three volumes | Letters to God","desc":"All three volumes at twelve moons each: one year, three ways to write it. $129 for three separate books, against $144 apart.","img":"hero_set"},{"id":"about","path":"/about/","title":"About | Letters to God","desc":"Letters to God is a NO PARADE journal from Bayonne, New Jersey. Why procession not parade, why the moon, why 48 commands, why three volumes.","img":"trio_covers"},{"id":"faqs","path":"/faqs/","title":"FAQs | Letters to God","desc":"Answers on personalizing, start dates, the 48 commands, shipping and returns.","img":"trio_covers"},{"id":"delivery","path":"/delivery-and-returns/","title":"Delivery and returns | Letters to God","desc":"How printing and shipping work, what to expect, and what we do if something arrives wrong.","img":"trio_covers"},{"id":"terms","path":"/terms/","title":"Terms of sale | Letters to God","desc":"The terms that apply to orders placed on this store.","img":"trio_covers"},{"id":"privacy","path":"/privacy/","title":"Privacy | Letters to God","desc":"What we collect, who handles it, and how to ask us to delete it.","img":"trio_covers"},{"id":"contact","path":"/contact/","title":"Contact | Letters to God","desc":"Write to us about an order, a gift, a bulk purchase or anything else.","img":"trio_covers"},{"id":"thank-you","path":"/thank-you/","title":"Thank you | Letters to God","desc":"Your order is in. Here is what happens next.","img":"trio_covers","noindex":true}];
const FAQ=[{"group":"Ordering and personalizing","items":[{"q":"Is every copy really different?","a":"Yes. Your name is printed on the belongs-to page, and every station is dated to the real phases of the moon, counted from your start date in your time zone. Two people who order on different days hold different books."},{"q":"How do I choose a start date?","a":"Pick the day you would like to begin. Your first station is the next New Moon on or after that date, and the rest follow the moon. We suggest a date two weeks out, so the book reaches you before the first station arrives."},{"q":"What if I start late, or fall behind?","a":"There is no wrong pace. Skip a station, write in the margins, come back at the next New Moon. Some weeks you will fill a page and some weeks a line."},{"q":"Can I order one for someone else?","a":"Yes. Type their name, choose a date on or after they will receive it, and the book is theirs. A cart can hold several books, each with its own name and dates. Each checkout ships to one address, so books going to different homes need separate orders."},{"q":"Can I change an order after I pay?","a":"Write to us as soon as you can. Your files are made after payment and go to print within a day or so; before that we can fix a name or a date, and after that we cannot."}]},{"group":"The books","items":[{"q":"Which volume should I begin with?","a":"Letters to God if you want to pray directly. Letters to Future Me if you want to write forward and read it back in a year. Letters to My Body if you pray best when you begin in the breath, the jaw and the hands. Most people begin with twelve moons; three and six moons are the first part of the same sequence."},{"q":"What is the difference between one deep prompt and seven short lines?","a":"One deep prompt gives you a single prompt each week and a ruled page to answer it. Seven short lines gives you one short line for each day of the week, dated in the margin, for people who want a small daily habit instead of a weekly sit-down. The commands and the moon dates are the same either way."},{"q":"What are the 48 commands?","a":"They are commands Jesus gave, gathered into a list of 48 and printed in the King James words: Repent, Follow Me, Rejoice, and on through the Sermon on the Mount and beyond. Forty-four come from Matthew, three from Luke and one from John. The list follows a compilation by NewStart Discipleship. Four stations a moon over twelve moons gives one command for each week of the year. Four midpoints a moon ask what changed."},{"q":"What are the midpoints?","a":"Between each pair of stations the moon is a crescent or a gibbous: waxing crescent, waxing gibbous, waning gibbous and waning crescent. Each is a midpoint, halfway in time between the two stations on either side. Each moon has one review spread, right after its opening, with a dated panel for every midpoint that asks what has changed since the station before. The midpoints carry no new command, so the 48 commands are still used once each."},{"q":"Do I need to belong to a church, or agree with everything?","a":"The books are built on the words of Jesus, so they are Christian at the centre. They do not tell you what to conclude. Every prompt is a question, or an instruction to write, and the answers are yours."},{"q":"How are the moon dates worked out?","a":"From standard astronomical formulas for the New Moon, First Quarter, Full Moon and Last Quarter, accurate to within minutes. The phase happens at one moment everywhere; the calendar date it falls on depends on your time zone, so we print it in yours. The four midpoints are dated halfway in time between the two phases on either side."},{"q":"Does the three-volume set come boxed?","a":"No. It ships as three separate books, each at twelve moons, for $129 against $144 apart."}]},{"group":"Shipping and returns","items":[{"q":"Where do you ship?","a":"The United States for now. The King James text is public domain in the United States and not everywhere else, and we are keeping to where we are sure."},{"q":"How long will it take?","a":"Every book is printed after you order it. Allow about 7 to 14 days from order to your door, and you will get a tracking link by email once it ships."},{"q":"What if my book arrives damaged or misprinted?","a":"Write to us within 30 days with a photo and your order number. We will replace it at no cost."},{"q":"Can I return a book I no longer want?","a":"Because each book is printed with your name and your dates, we cannot take back a book for a change of mind. If something is wrong with it, we will make it right."},{"q":"Do you charge sales tax?","a":"Where the law requires it, tax is calculated at checkout before you pay."}]},{"group":"Payment","items":[{"q":"How do I pay, and is it safe?","a":"Checkout is handled by Stripe. Your card details go to Stripe and never touch this site or our servers."}]}];
const DATA={"vol":{"god":{"title":"Letters to God","roman":"I","deep":"Name one direction you have been facing that is not toward Him. Write it plainly, the way you would report it to someone who already knows. Then write what turning would look like by Friday: one step small enough to be seen.","daily":["Name the direction I was facing this morning.","What did I choose today that I would not sign my name to?","Write the turn in one sentence.","Where is the smallest place I can turn today?","What am I still defending?","What did turning cost me, and what did it return?","Dear God, the thing I am done carrying is..."]},"future":{"title":"Letters to Future Me","roman":"II","deep":"Write to the you who will read this a year from now. Name the direction you are turning from today, and describe the person who has kept walking the other way. Tell them what the first week felt like, so they remember it was hard and it was worth it.","daily":["What am I turning from, as of today?","What will I be glad, later, to have changed now?","Date this turn. Describe it in one line.","What would the next me thank me for stopping?","What is the smallest proof that I turned today?","Write the sentence I want to find here in a year.","Dear Future Me, I turned from..."]},"body":{"title":"Letters to My Body","roman":"III","deep":"Turning is a physical act. Stand and turn your whole body slowly toward something you have been avoiding, then sit and write what your body did: the breath, the jaw, the stomach. Then write what it would take for your body to turn the rest of the way.","daily":["Where in my body do I feel what I am avoiding?","Turn my shoulders. What changes in my breath?","Where do I brace before I do what is right?","What does my body do when I lie to myself?","Stand. Face the other way. What do I feel?","What did my body know before my mind did?","Dear Body, I am turning toward..."]}},"names":[[1,"Repent","Matthew 4:17"],[2,"Follow Me","Matthew 4:19"],[3,"Rejoice","Matthew 5:12"],[4,"Let Your Light Shine","Matthew 5:16"],[5,"Honor God’s Law","Matthew 5:17-19"],[6,"Be Reconciled","Matthew 5:24-25"],[7,"Do Not Lust","Matthew 5:28-30"],[8,"Keep Your Word","Matthew 5:37"],[9,"Go the Second Mile","Matthew 5:38-42"],[10,"Love Your Enemies","Matthew 5:44"],[11,"Be Perfect","Matthew 5:48"],[12,"Practice Secret Disciplines","Matthew 6:3-4, 6, 17-18"],[13,"Lay Up Treasures in Heaven","Matthew 6:19-21"],[14,"Seek God’s Kingdom","Matthew 6:33"],[15,"Judge Not","Matthew 7:1-2"],[16,"Do Not Throw Pearls to Pigs","Matthew 7:6"],[17,"Ask, Seek, Knock","Matthew 7:7-8"],[18,"Do Unto Others","Matthew 7:12"],[19,"Choose the Narrow Way","Matthew 7:13-14"],[20,"Beware of False Prophets","Matthew 7:15"],[21,"Pray for Laborers","Matthew 9:38"],[22,"Be Wise as Serpents","Matthew 10:16"],[23,"Fear Not","Matthew 10:28"],[24,"Hear God’s Voice","Matthew 11:15"],[25,"Take My Yoke","Matthew 11:29"],[26,"Honor Your Parents","Matthew 15:4"],[27,"Beware of Leaven","Matthew 16:6"],[28,"Deny Yourself","Matthew 16:24"],[29,"Do Not Despise Little Ones","Matthew 18:10"],[30,"Go to Offenders","Matthew 18:15"],[31,"Beware of Covetousness","Luke 12:15"],[32,"Forgive Offenders","Matthew 18:21-22"],[33,"Honor Marriage","Matthew 19:6"],[34,"Be a Servant","Matthew 20:26-27"],[35,"Be a House of Prayer","Matthew 21:13"],[36,"Ask in Faith","Matthew 21:21-22"],[37,"Bring in the Poor","Luke 14:12-14"],[38,"Render to Caesar","Matthew 22:19-21"],[39,"Love the Lord","Matthew 22:37"],[40,"Love Your Neighbor","Matthew 22:39"],[41,"Await My Return","Matthew 24:42-44"],[42,"Celebrate the Lord’s Supper","Matthew 26:26-27"],[43,"Watch and Pray","Matthew 26:41"],[44,"Feed My Sheep","John 21:15-16"],[45,"Baptize My Disciples","Matthew 28:19"],[46,"Teach Them to Obey My Commands","Matthew 28:20"],[47,"Receive God’s Power","Luke 24:49"],[48,"Make Disciples","Matthew 28:19-20"]]};
const CONFIG=Object.assign({endpoint:"",legalDraft:true,leadTime:"7 to 14 days",prices:{3:28,6:38,12:48,set:129},pages:{3:56,6:100,12:172},ship:{base:5,extra:2},limits:{lines:6,qty:10,books:12}},window.LTG_CONFIG||{});
// Lunar phases, Meeus "Astronomical Algorithms" ch. 49 (main + planetary terms). Accurate to a few minutes.
const RAD = Math.PI / 180;
const sind = d => Math.sin(d * RAD), cosd = d => Math.cos(d * RAD);
function phaseJDE(k, ph) {            // k integer = new moon index; ph 0 new, .25 first quarter, .5 full, .75 last quarter
  k = k + ph;
  const T = k / 1236.85;
  let J = 2451550.09766 + 29.530588861 * k + 0.00015437 * T * T - 0.00000015 * T ** 3 + 0.00000000073 * T ** 4;
  const E = 1 - 0.002516 * T - 0.0000074 * T * T;
  const M = 2.5534 + 29.1053567 * k - 0.0000014 * T * T - 0.00000011 * T ** 3;
  const Mp = 201.5643 + 385.81693528 * k + 0.0107582 * T * T + 0.00001238 * T ** 3 - 0.000000058 * T ** 4;
  const F = 160.7108 + 390.67050284 * k - 0.0016118 * T * T - 0.00000227 * T ** 3 + 0.000000011 * T ** 4;
  const O = 124.7746 - 1.56375588 * k + 0.0020672 * T * T + 0.00000215 * T ** 3;
  let c;
  if (ph === 0) c = -0.4072 * sind(Mp) + 0.17241 * E * sind(M) + 0.01608 * sind(2 * Mp) + 0.01039 * sind(2 * F) + 0.00739 * E * sind(Mp - M) - 0.00514 * E * sind(Mp + M) + 0.00208 * E * E * sind(2 * M) - 0.00111 * sind(Mp - 2 * F) - 0.00057 * sind(Mp + 2 * F) + 0.00056 * E * sind(2 * Mp + M) - 0.00042 * sind(3 * Mp) + 0.00042 * E * sind(M + 2 * F) + 0.00038 * E * sind(M - 2 * F) - 0.00024 * E * sind(2 * Mp - M) - 0.00017 * sind(O);
  else if (ph === 0.5) c = -0.40614 * sind(Mp) + 0.17302 * E * sind(M) + 0.01614 * sind(2 * Mp) + 0.01043 * sind(2 * F) + 0.00734 * E * sind(Mp - M) - 0.00515 * E * sind(Mp + M) + 0.00209 * E * E * sind(2 * M) - 0.00111 * sind(Mp - 2 * F) - 0.00057 * sind(Mp + 2 * F) + 0.00056 * E * sind(2 * Mp + M) - 0.00042 * sind(3 * Mp) + 0.00042 * E * sind(M + 2 * F) + 0.00038 * E * sind(M - 2 * F) - 0.00024 * E * sind(2 * Mp - M) - 0.00017 * sind(O);
  else {
    c = -0.62801 * sind(Mp) + 0.17172 * E * sind(M) - 0.01183 * E * sind(Mp + M) + 0.00862 * sind(2 * Mp) + 0.00804 * sind(2 * F) + 0.00454 * E * sind(Mp - M) + 0.00204 * E * E * sind(2 * M) - 0.0018 * sind(Mp - 2 * F) - 0.0007 * sind(Mp + 2 * F) - 0.0004 * sind(3 * Mp) - 0.00034 * E * sind(2 * Mp - M) + 0.00032 * E * sind(M + 2 * F) + 0.00032 * E * sind(M - 2 * F) - 0.00028 * E * E * sind(Mp + 2 * M) + 0.00027 * E * sind(2 * Mp + M) - 0.00017 * sind(O);
    const W = 0.00306 - 0.00038 * E * cosd(M) + 0.00026 * cosd(Mp) - 0.00002 * cosd(Mp - M) + 0.00002 * cosd(Mp + M) + 0.00002 * cosd(2 * F);
    c += ph === 0.25 ? W : -W;
  }
  const A = [299.77 + 0.107408 * k - 0.009173 * T * T, 251.88 + 0.016321 * k, 251.83 + 26.651886 * k, 349.42 + 36.412478 * k, 84.66 + 18.206239 * k,
             141.74 + 53.303771 * k, 207.14 + 2.453732 * k, 154.84 + 7.30686 * k, 34.52 + 27.261239 * k, 207.19 + 0.121824 * k,
             291.34 + 1.844379 * k, 161.72 + 24.198154 * k, 239.56 + 25.513099 * k, 331.55 + 3.592518 * k];
  const K = [0.000325, 0.000165, 0.000164, 0.000126, 0.00011, 0.000062, 0.00006, 0.000056, 0.000047, 0.000042, 0.00004, 0.000037, 0.000035, 0.000023];
  for (let i = 0; i < 14; i++) c += K[i] * sind(A[i]);
  return J + c;
}
const jdeToMs = jde => (jde - 2440587.5) * 86400000 - 69 * 1000;   // TT to UT: about 69 s in 2026
// Four stations per lunation, starting at the first New Moon on or after startMs.
function lunations(startMs, months) {
  let k = Math.floor(((startMs / 86400000 + 2440587.5) - 2451550.09766) / 29.530588861) - 1;
  while (jdeToMs(phaseJDE(k, 0)) < startMs) k++;
  const out = [];
  for (let m = 0; m < months; m++) out.push([0, 0.25, 0.5, 0.75].map(p => jdeToMs(phaseJDE(k + m, p))));
  return out;
}
// Four midpoints per lunation, halfway in time between neighbouring phases: waxing crescent, waxing gibbous, waning gibbous, waning crescent.
function midpoints(startMs, months) {
  const L = lunations(startMs, months + 1);
  return L.slice(0, months).map((r, m) => [0, 1, 2, 3].map(j => (r[j] + (j < 3 ? r[j + 1] : L[m + 1][0])) / 2));
}
if (typeof module !== "undefined") module.exports = { lunations, midpoints };

/* ===== helpers ===== */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const money = n => "$" + (Math.round(n * 100) / 100).toFixed(Number.isInteger(n) ? 0 : 2);
const STATION = ["New Moon", "First Quarter", "Full Moon", "Last Quarter"];
const MIDPOINT = ["Waxing crescent", "Waxing gibbous", "Waning gibbous", "Waning crescent"];
const ZONES = [["America/New_York", "Eastern"], ["America/Chicago", "Central"], ["America/Denver", "Mountain"], ["America/Phoenix", "Arizona"],
  ["America/Los_Angeles", "Pacific"], ["America/Anchorage", "Alaska"], ["Pacific/Honolulu", "Hawaii"]];
const zoneName = tz => (ZONES.find(z => z[0] === tz) || [0, tz])[1];
const pad = n => String(n).padStart(2, "0");
const isoLocal = d => d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
const plusDays = n => { const d = new Date(); d.setDate(d.getDate() + n); return isoLocal(d); };
function fmt(ms, tz, withTime) {
  let s = new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "short", day: "numeric", month: "short" }).format(ms).replace(",", "");
  if (withTime) s += " · " + new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit", timeZoneName: "short" }).format(ms);
  return s;
}
function guessZone() {
  try { const g = Intl.DateTimeFormat().resolvedOptions().timeZone; if (ZONES.some(z => z[0] === g)) return g; } catch (e) {}
  return "America/New_York";
}
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
};

/* ===== catalogue ===== */
const PRICE = CONFIG.prices, PAGES = CONFIG.pages;
const shipCost = books => CONFIG.ship.base + CONFIG.ship.extra * (books - 1);
const PROD = {
  god: { key: "god", slug: "letters-to-god", roman: "I", title: "Letters to God", kind: "book",
    tag: "The direct volume", blurb: "Write to God the way you would write to someone who already knows.", lens: "Direct. You write to God the way you would write to someone who already knows.",
    teaser: "Each week sets one command of Jesus, in the King James words, beside a prompt that asks for a plain answer: what happened, what you did, and what you will do by Friday.",
    statement: "Say it plainly, <em>the way you would to someone who already knows.</em>", cover: "cover_god", wrap: "wrap_god", belongs: "belongs_god" },
  future: { key: "future", slug: "letters-to-future-me", roman: "II", title: "Letters to Future Me", kind: "book",
    tag: "The forward volume", blurb: "Write forward to the person you are becoming, and read it back in a year.", lens: "Forward. Every station is a letter to the person you are becoming, dated, and readable a year from now.",
    teaser: "Every station is a letter to the person you are becoming. You date it, you tell them what this week was like, and a year on you read it back.",
    statement: "Write to the person you are becoming, <em>and read it back in a year.</em>", cover: "cover_future", wrap: "wrap_future", belongs: "belongs_future" },
  body: { key: "body", slug: "letters-to-my-body", roman: "III", title: "Letters to My Body", kind: "book",
    tag: "The somatic volume", blurb: "Begin in the breath, the jaw and the hands, then write what happened.", lens: "Somatic. The body speaks first: the breath, the jaw, the hands, the gut. Then you write what happened.",
    teaser: "Prayer often starts in the body before it starts in words. Each prompt asks you to stand, breathe or notice, and then to write what your breath, jaw, hands and gut did.",
    statement: "Your body prays first. <em>Begin there.</em>", cover: "cover_body", wrap: "wrap_body", belongs: "belongs_body" },
  set: { key: "set", slug: "the-trilogy", roman: "I, II, III", title: "The trilogy", kind: "set",
    tag: "All three volumes", lens: "One year, three voices.",
    teaser: "All three volumes at twelve moons each. Write to God in the first, forward in the second and from the body in the third. They ship as three separate books, for less than they cost apart.",
    statement: "One year. <em>Three ways to write it.</em>", cover: "trio_covers" }
};
const ORDER = ["god", "future", "body", "set"];
const prodPath = k => "/books/" + PROD[k].slug + "/";
const ICON = {
  moon: '<svg viewBox="0 0 24 24"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/></svg>',
  book: '<svg viewBox="0 0 24 24"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 5.5v16"/><path d="M9 8h7M9 12h7"/></svg>',
  pen: '<svg viewBox="0 0 24 24"><path d="M4 20l1-4L17 4a2 2 0 0 1 3 3L8 19z"/><path d="M14 7l3 3"/></svg>',
  box: '<svg viewBox="0 0 24 24"><path d="M3 8l9-5 9 5v8l-9 5-9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>'
};
function moonSvg(theta, r) {
  r = r || 20;
  const th = ((theta % 360) + 360) % 360, waxing = th <= 180, e = waxing ? th : 360 - th;
  const c = r + 2, k = Math.cos(e * Math.PI / 180), rx = Math.abs(k) * r, sweep = e < 90 ? 0 : 1;
  const lit = e < 1 ? "" : `<path d="M${c} ${c - r} A${r} ${r} 0 0 1 ${c} ${c + r} A${rx} ${r} 0 0 ${sweep} ${c} ${c - r}Z" fill="var(--moon-lit)" ${waxing ? "" : `transform="translate(${2 * c} 0) scale(-1 1)"`}/>`;
  return `<svg viewBox="0 0 ${2 * c} ${2 * c}" aria-hidden="true"><circle cx="${c}" cy="${c}" r="${r}" fill="var(--moon-dark)"/>${lit}<circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="var(--moon-line)" stroke-width="1.2"/></svg>`;
}

/* ===== routing (path mode for the real site, hash mode for the single-file preview) ===== */
const MODE = window.__ROUTE_MODE || "path";
function curPath() {
  let p = MODE === "hash" ? (location.hash || "#/").slice(1).split("?")[0] : location.pathname;
  if (!p.startsWith("/")) p = "/" + p;
  return p.endsWith("/") ? p : p + "/";
}
const curQuery = () => new URLSearchParams(MODE === "hash" ? (location.hash.split("?")[1] || "") : location.search.slice(1));
const href = p => (MODE === "hash" ? "#" + p : p);
const L = (p, text, cls) => `<a data-l="${p}" href="${href(p)}"${cls ? ` class="${cls}"` : ""}>${text}</a>`;
const img = (name, alt, extra) => `<img src="${IMG[name]}" alt="${esc(alt)}"${extra || ""}>`;
const routeFor = p => ROUTES.find(r => r.path === p);
function go(p) {
  closeDrawer(); closeNav();
  if (MODE === "hash") { if (location.hash === "#" + p) route(); else location.hash = p; }
  else { if (location.pathname + location.search !== p) history.pushState({}, "", p); route(); }
}
const PAGES_FN = {}, AFTER = {};
function route() {
  const p = curPath(), r = routeFor(p) || { id: "404", path: p, title: "Page not found | Letters to God", desc: "" };
  const fn = PAGES_FN[r.id] || PAGES_FN["404"];
  const main = $("#main");
  main.innerHTML = fn(r);
  document.title = r.title;
  const md = $('meta[name="description"]'); if (md) md.setAttribute("content", r.desc || "");
  $$(".nav a[data-l]").forEach(a => a.removeAttribute("aria-current"));
  const cur = $(`.nav > a[data-l="${p}"], .navitem > a[data-l="${p}"]`) || (p.startsWith("/books/") && p !== "/books/the-trilogy/" ? $('.navitem > a[data-l="/shop/"]') : null);
  if (cur) cur.setAttribute("aria-current", "page");
  if (AFTER[r.id]) AFTER[r.id](r);
  window.scrollTo(0, 0);
  window.__rendered = r.id;
}

/* ===== chrome: header, footer, drawer ===== */
function nextNewMoon() { return lunations(Date.now(), 1)[0][0]; }
function chrome() {
  const hub = [["Bayonne Athletics", "https://ba-athletics.com"], ["No Parade F.C.", "https://npfc.noparade.store"], ["Human Weather Press", "https://humanweather.press"], ["Human Weather Social", "https://humanweather.social"]];
  const hubLinks = hub.map(h => `<a href="${h[1]}" target="_blank" rel="noopener">${h[0]}</a>`).join("");
  const nm = nextNewMoon();
  return `<a class="skip" href="#main" data-skip>Skip to content</a>
<div class="hubbar"><div class="wrap"><a class="mark" href="https://www.noparade.store/" target="_blank" rel="noopener">NO PARADE</a><nav aria-label="No Parade network">${hubLinks}</nav></div></div>
<div class="announce">Next New Moon: <b>${fmt(nm, guessZone())}</b>. ${L("/shop/", "Start a book on it")} &middot; Printed to order &middot; Ships to the United States</div>
<header class="site"><div class="wrap bar">
  <button class="burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="nav">${ICON.menu}</button>
  <a class="brand" data-l="/" href="${href("/")}">${moonSvg(90, 11)}<span>Letters to God</span></a>
  <nav class="nav" id="nav" aria-label="Main">
    <div class="navhead"><a class="brand" data-l="/" href="${href("/")}">${moonSvg(90, 11)}<span>Letters to God</span></a><button class="x" id="navX" aria-label="Close menu">&times;</button></div>
    <div class="navitem"><a data-l="/shop/" href="${href("/shop/")}">Shop</a><button class="chev" id="chev" aria-label="Show the volumes" aria-expanded="false">${ICON.chev}</button>
      <div class="mega">${ORDER.map(k => `<a data-l="${prodPath(k)}" href="${href(prodPath(k))}">${img(PROD[k].cover, PROD[k].title, ' loading="lazy"')}<b>${PROD[k].title}</b><span>${k === "set" ? money(PRICE.set) + " · three books" : "from " + money(PRICE[3])}</span></a>`).join("")}</div></div>
    ${L("/books/the-trilogy/", "The trilogy")}${L("/about/", "About")}${L("/faqs/", "FAQs")}${L("/contact/", "Contact")}
  </nav>
  <button class="cartbtn" id="cartBtn" aria-label="Open cart, 0 items" aria-haspopup="dialog">${'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>'}<span class="lbl">Cart</span><span class="count" data-n="0">0</span></button>
</div></header>
<main id="main" tabindex="-1"></main>
<footer class="site"><div class="wrap">
  <div class="fgrid">
    <div class="nl"><h3>Peace be with you.</h3><p class="msg" style="max-width:38ch">A short note when a new volume or edition ships. Nothing else, and you can leave at any time.</p>
      <form id="nlForm" novalidate><label class="hp" aria-hidden="true">Website<input type="text" name="hp" tabindex="-1" autocomplete="off"></label><input type="email" id="nlEmail" placeholder="you@example.com" autocomplete="email" aria-label="Email address" required><button class="btn" type="submit">Subscribe</button></form>
      <p class="msg" id="nlMsg" role="status"></p></div>
    <div><h4>Shop</h4><ul>${ORDER.map(k => `<li>${L(prodPath(k), PROD[k].title)}</li>`).join("")}<li>${L("/shop/", "All journals")}</li></ul></div>
    <div><h4>Support</h4><ul><li>${L("/faqs/", "FAQs")}</li><li>${L("/delivery-and-returns/", "Delivery and returns")}</li><li>${L("/contact/", "Contact")}</li><li>${L("/terms/", "Terms of sale")}</li><li>${L("/privacy/", "Privacy")}</li></ul></div>
    <div><h4>No Parade</h4><ul><li>${L("/about/", "About")}</li><li><a href="https://www.noparade.store/" target="_blank" rel="noopener">No Parade</a></li>${hub.map(h => `<li><a href="${h[1]}" target="_blank" rel="noopener">${h[0]}</a></li>`).join("")}</ul></div>
  </div>
  <div class="fbase"><span>&copy; 2026 NO PARADE &middot; Letters to God</span><span>United States &middot; USD</span><span>Scripture: King James Version</span></div>
</div></footer>
<div class="scrim" id="scrim"></div>
<aside class="drawer" id="drawer" role="dialog" aria-modal="true" aria-labelledby="drawerTitle" inert>
  <div class="dhead"><h2 id="drawerTitle">Your cart</h2><button class="x" id="drawerX" aria-label="Close cart">&times;</button></div>
  <div class="dbody" id="cartBody"></div><div class="dfoot" id="cartFoot" hidden></div>
</aside>
<dialog id="dlg"><h3 id="dlgTitle"></h3><p id="dlgBody" class="msg"></p><pre id="dlgPre"></pre><form method="dialog"><button class="btn ghost" value="close">Close</button></form></dialog>`;
}
function openNav() { $("#nav").classList.add("on"); $("#burger").setAttribute("aria-expanded", "true"); document.body.classList.add("locked"); }
function closeNav() { const n = $("#nav"); if (!n) return; n.classList.remove("on"); $("#burger").setAttribute("aria-expanded", "false"); if (!$("#drawer").classList.contains("on")) document.body.classList.remove("locked"); }
let lastFocus = null;
function openDrawer() { lastFocus = document.activeElement; const d = $("#drawer"); d.removeAttribute("inert"); d.classList.add("on"); $("#scrim").classList.add("on"); document.body.classList.add("locked"); setTimeout(() => $("#drawerX").focus(), 30); }
function closeDrawer() { const d = $("#drawer"); if (!d || !d.classList.contains("on")) return; d.classList.remove("on"); d.setAttribute("inert", ""); $("#scrim").classList.remove("on"); document.body.classList.remove("locked"); if (lastFocus && lastFocus.focus) lastFocus.focus(); }
function toast(t) { const e = document.createElement("div"); e.className = "toast"; e.setAttribute("role", "status"); e.textContent = t; document.body.appendChild(e); setTimeout(() => e.remove(), 2600); }
function postJSON(path, body) {
  if (!CONFIG.endpoint) return Promise.reject(new Error("preview"));
  return fetch(CONFIG.endpoint.replace(/\/$/, "") + path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
    .then(async r => { const j = await r.json().catch(() => ({})); if (!r.ok) throw new Error(j.error || "Something went wrong."); return j; });
}

/* ===== shared blocks ===== */
const fromPrice = k => (k === "set" ? money(PRICE.set) : "From " + money(PRICE[3]));
function card(k) {
  const p = PROD[k];
  return `<a class="card ${k}" data-l="${prodPath(k)}" href="${href(prodPath(k))}">
    <div class="ph">${img(p.cover, k === "set" ? "The three volumes of Letters to God side by side" : p.title + ", Volume " + p.roman, ' loading="lazy"')}${k === "set" ? '<span class="badge">Save $15</span>' : ""}</div>
    <div><p class="num">${k === "set" ? "Volumes I, II, III" : "Volume " + p.roman}</p><h3>${p.title}</h3></div>
    <p class="sub">${k === "set" ? "One of each, twelve moons apiece, as three separate books." : p.blurb}</p>
    <p class="from">${fromPrice(k)}</p></a>`;
}
function tiles() {
  const t = [["moon", "Dated to the moon", "Four stations a moon (New Moon, First Quarter, Full Moon, Last Quarter) and four midpoints between them that ask what changed. Every date is calculated for your start day and your time zone."],
    ["book", "Forty-eight commands", "One command of Jesus each week, in the King James words. Twelve moons carry all 48, each one once."],
    ["pen", "Room to answer", "A prompt on the left, a ruled page on the right, and a Full Moon page to look back on the weeks behind you."],
    ["box", "Made for you", "Nothing sits on a shelf. Your copy is generated with your name and your dates, then printed and sent."]];
  return `<div class="tiles">${t.map(x => `<div class="tile">${ICON[x[0]]}<h4>${x[1]}</h4><p>${x[2]}</p></div>`).join("")}</div>`;
}
function commandsList() {
  return `<ul class="cmds">${DATA.names.map((n, i) => `<li><i>${pad(n[0])}</i><span>${esc(n[1])}</span><small>Moon ${Math.floor(i / 4) + 1} · ${STATION[i % 4]} · ${esc(n[2])}</small></li>`).join("")}</ul>`;
}
const accItem = (t, body, open) => `<details${open ? " open" : ""}><summary>${t}</summary><div class="in">${body}</div></details>`;
function faqHtml(groups) {
  return groups.map(g => `<div class="faqgroup"><h2>${esc(g.group)}</h2><div class="acc">${g.items.map(i => accItem(esc(i.q), `<p>${esc(i.a)}</p>`)).join("")}</div></div>`).join("");
}
const crumbs = items => `<nav class="crumbs wrap" aria-label="Breadcrumb">${items.map(i => i[1] ? L(i[1], i[0]) : `<span>${i[0]}</span>`).join(" / ")}</nav>`;
const draftNote = () => CONFIG.legalDraft ? `<p class="draft"><b>Draft.</b> This page is a working draft written for the store. Have it reviewed against your own practices and local law before you take payment, then set <code>legalDraft</code> to <code>false</code> to remove this note.</p>` : "";

/* ===== pages ===== */
PAGES_FN.home = () => `
<section class="hero"><div class="wrap">
  <div>
    <p class="eyebrow">A NO PARADE journal · Dated to the moon</p>
    <h1>One command a week. <em>Twelve moons.</em></h1>
    <p class="lede">A hardcover prayer journal that opens on a real New Moon and turns with the moon. Forty-eight commands of Jesus in the King James words, one at each week&rsquo;s station, and a page left for yours. Printed to order with your name and your start date.</p>
    <div class="cta-row">${L("/shop/", "Shop the journals", "btn")}${L("/about/", "About the books", "btn ghost")}</div>
    <p class="fine">FROM ${money(PRICE[3])} · A5 HARDCOVER · SHIPS TO THE UNITED STATES</p>
  </div>
  <a class="herophoto" data-l="/books/the-trilogy/" href="${href('/books/the-trilogy/')}">${img("hero_set_sq", "The three Letters to God journals by NO PARADE on an oak stool: Volume I standing, Volumes II and III stacked", ' width="1000" height="1000"')}</a>
</div></section>
<div class="phasebar"><div class="wrap"><p>Procession, not parade. The moon keeps its own schedule either way.</p><div class="phases" aria-hidden="true">${[0, 45, 90, 135, 180, 225, 270, 315].map(t => moonSvg(t, 20)).join("")}</div></div></div>
<section class="blk"><div class="wrap">
  <div class="head"><p class="eyebrow">The journals</p><h2>Three ways to write it.</h2><p class="lede">The same 48 commands in three voices. Take the one you need this year, or all three.</p></div>
  <div class="grid">${ORDER.map(card).join("")}</div>
</div></section>
<section class="blk"><div class="wrap">${tiles()}</div></section>
<section class="blk"><div class="wrap duo">
  <div class="spreadbox">${img("spread_deep_god", "A station spread from Letters to God: on the left the command Repent, Matthew 4:17, and a prompt; on the right a ruled writing page", ' class="spread" width="1166" height="827" loading="lazy"')}<p class="figcap">MOON I · STATION 1 · COMMAND 01 OF 48 · A REAL SPREAD FROM VOLUME I</p></div>
  <div><p class="eyebrow">How a week works</p><h2 style="margin-top:14px">A station every time the moon turns.</h2>
    <dl class="kv">
      <div><dt>Left page</dt><dd>One command, in the King James words, and a prompt to answer. In daily mode: seven short lines, one for each day, dated in the margin.</dd></div>
      <div><dt>Right page</dt><dd>Ruled and empty. It is yours.</dd></div>
      <div><dt>The rhythm</dt><dd>Four stations a moon, about a week apart, and four midpoints between them. Twelve moons carry all 48 commands, each once.</dd></div>
    </dl>
    <div class="tscroll" style="margin-top:22px"><table class="tbl"><thead><tr><th>Edition</th><th>Pages</th><th>Commands</th><th>Price</th></tr></thead><tbody>
      ${[3, 6, 12].map(m => `<tr><td>${m} moons</td><td>${PAGES[m]}</td><td>${m === 12 ? "All 48" : "1 to " + m * 4}</td><td>${money(PRICE[m])}</td></tr>`).join("")}</tbody></table></div>
  </div>
</div></section>
<section class="blk"><div class="wrap duo flip">
  <div><p class="eyebrow">At the Full Moon</p><h2 style="margin-top:14px">Look back on the moon just past.</h2><p class="lede" style="margin-top:14px">The third station of every moon adds a reflection page, three questions on the weeks behind you. Each moon opens with a Psalm and closes with a letter, so a year of writing has a shape you can read back.</p></div>
  <div class="spreadbox">${img("spread_full_god", "The Full Moon spread: the command Rejoice on the left, the Full Moon reflection on the right", ' class="spread" width="1166" height="827" loading="lazy"')}<p class="figcap">MOON I · FULL MOON SPREAD</p></div>
</div></section>
<section class="blk"><div class="wrap duo">
  <div class="spreadbox">${img("spread_review_god", "The review spread from Letters to God: two pages, each with two dated panels headed Waxing crescent, Waxing gibbous, Waning gibbous and Waning crescent, each asking what has changed", ' class="spread" width="1166" height="827" loading="lazy"')}<p class="figcap">MOON I · WHAT CHANGED · FOUR MIDPOINTS</p></div>
  <div><p class="eyebrow">Between the stations</p><h2 style="margin-top:14px">Four midpoints ask what changed.</h2><p class="lede" style="margin-top:14px">Halfway between each pair of stations the moon is a crescent or a gibbous. Each moon has one review spread, right after its opening, with a dated panel for each of those four midpoints: waxing crescent, waxing gibbous, waning gibbous and waning crescent. Each asks what has changed since the station before, so you read a year back as a record of change, not only a list of answers.</p></div>
</div></section>
<section class="blk band"><div class="wrap duo flip">
  <div>${img("trio_covers", "The three volumes of Letters to God side by side", ' loading="lazy"')}</div>
  <div><p class="eyebrow">The trilogy</p><h2 style="margin-top:14px">A year, three voices.</h2><p class="lede" style="margin:14px 0 26px">Write to God in Volume I, forward to yourself in Volume II, and from the body in Volume III. Twelve moons each, three separate books, ${money(PRICE.set)} against $144 apart.</p>${L("/books/the-trilogy/", "Personalize the set", "btn")}</div>
</div></section>
<section class="blk"><div class="wrap">
  <div class="head"><p class="eyebrow">Inside every volume</p><h2>Forty-eight commands, one a week.</h2><p class="lede">In the order your moons bring them. Each is printed in the King James words with a prompt beside it.</p></div>
  ${commandsList()}
</div></section>
<section class="blk"><div class="wrap narrow">
  <div class="head"><p class="eyebrow">Questions</p><h2>Before you order.</h2></div>
  <div class="acc">${FAQ[0].items.slice(0, 3).concat(FAQ[1].items.slice(0, 1), FAQ[2].items.slice(0, 2)).map(i => accItem(esc(i.q), `<p>${esc(i.a)}</p>`)).join("")}</div>
  <p style="margin-top:22px">${L("/faqs/", "All questions", "btn ghost")}</p>
</div></section>`;

PAGES_FN.shop = () => `${crumbs([["Home", "/"], ["Shop"]])}
<div class="wrap"><div class="pagehead"><p class="eyebrow">The journals</p><h1>Shop</h1><p class="lede">Three volumes and a set, all printed to order. Choose a volume, set your name and start date, and the moon does the rest.</p></div></div>
<section class="blk" style="border-top:0;padding-top:16px"><div class="wrap"><div class="grid">${ORDER.map(card).join("")}</div></div></section>
<section class="blk"><div class="wrap">${tiles()}</div></section>`;

PAGES_FN.about = () => `${crumbs([["Home", "/"], ["About"]])}
<div class="wrap"><div class="pagehead"><p class="eyebrow">About Letters to God</p><h1>Procession, not parade.</h1></div>
<div class="prose" style="padding-bottom:clamp(48px,8vw,96px)">
  <p class="pull">Prayer keeps time. We wanted a book that did too.</p>
  <h2>Who makes it</h2>
  <p>Letters to God is a NO PARADE journal. NO PARADE is a faith-rooted brand from Bayonne, New Jersey, and its name is a working rule: <em>procession, not parade</em>. A parade is staged to be watched. A procession moves because it is going somewhere, and everyone in it is walking. We borrowed the distinction from Rebecca Solnit, and we use it as the test for everything we make: does it help someone keep walking, or does it only look good going by?</p>
  <p>Our shorthand for the same idea is PBWY, Peace Be With You, the greeting Jesus gives his friends after the resurrection (John 20:19). It is also how this site signs off.</p>
  <h2>The family it belongs to</h2>
  <p>The same brand runs a few projects that share one thesis. <a href="https://npfc.noparade.store" target="_blank" rel="noopener">No Parade F.C.</a> is football culture and apparel with scripture on the things you wear. <a href="https://ba-athletics.com" target="_blank" rel="noopener">Bayonne Athletics</a> is a community brand for Bayonne, made by us for us. <a href="https://humanweather.press" target="_blank" rel="noopener">Human Weather</a> is a somatic wellness project and publication, and the body-first way of paying attention behind Volume III comes from there. Letters to God is the one you write in.</p>
  <h2>Why the moon</h2>
  <p>A month is the oldest calendar there is, and you can read it without a device. The moon is new, then half full, then full, then half again, about a week apart. Those four turns became the four stations of each moon in these books, and the crescent and gibbous moons halfway between them became four midpoints, each with a dated page that asks what has changed. You do not have to remember what day to write. You look up.</p>
  <p>The moon happens at one moment everywhere, and the date it falls on depends on where you live, so every book is dated for your start day and your time zone. The phases come from the standard astronomical formulas in Jean Meeus, <em>Astronomical Algorithms</em>, and we checked them against an independent ephemeris library: across all 48 phases of a year, the largest difference was 28 seconds.</p>
  <h2>Why forty-eight commands</h2>
  <p>Most of us know what Jesus said. It is easier to miss that much of it was an instruction: repent, follow me, rejoice, forgive, watch, go. A list of 48 puts that plainly. Four stations a moon over twelve moons gives one command for every week of the year, each in the King James words, each with a prompt beside it and a page for your answer. Forty-four of the 48 come from Matthew, three from Luke and one from John.</p>
  <p>The list follows a compilation by NewStart Discipleship. The prompts, the layout and the dates are ours.</p>
  <h2>Why three volumes</h2>
  <p>The trilogy rests on <em>koinonia</em>, the Greek word the New Testament uses for shared participation. The idea is prayer that takes the whole person along: spirit, mind and body, held together instead of taking turns. Volume I, Letters to God, is the direct one, a plain conversation. Volume II, Letters to Future Me, writes across time, so that you can read back a year of faithfulness in your own hand. Volume III, Letters to My Body, begins in the breath, the jaw and the hands, and the words come after. The same 48 commands run through all three, so you can take the one you need this year, or all three.</p>
  <h2>Why printed to order</h2>
  <p>Nothing here sits in a warehouse. When you order, your book is generated with your name and your dates, and only then printed and sent. It means a wait of a week or two. It also means there is no unsold stock, and the book in your hands was made for you.</p>
  <h2>How they are made</h2>
  <p>Each book is an A5 hardcover with a matte casewrap cover, in three colours: Deep Indigo for Volume I, Deep Teal for Volume II and Warm Rust for Volume III. Headings are set in Cormorant Garamond and the prompts in IBM Plex Mono. Scripture is the King James Version, which is in the public domain in the United States.</p>
  <p class="cta-row">${L("/shop/", "Shop the journals", "btn")}${L("/contact/", "Write to us", "btn ghost")}</p>
</div></div>`;

PAGES_FN.faqs = () => `${crumbs([["Home", "/"], ["FAQs"]])}
<div class="wrap"><div class="pagehead"><p class="eyebrow">Questions</p><h1>FAQs</h1><p class="lede">Can&rsquo;t find it? ${L("/contact/", "Write to us")}.</p></div>
<div class="narrow" style="padding-bottom:clamp(48px,8vw,96px)">${faqHtml(FAQ)}</div></div>`;

PAGES_FN.delivery = () => `${crumbs([["Home", "/"], ["Delivery and returns"]])}
<div class="wrap"><div class="pagehead"><p class="eyebrow">Delivery and returns</p><h1>How your book gets to you.</h1></div>
<div class="prose" style="padding-bottom:clamp(48px,8vw,96px)">
  <ol class="steps">
    <li><span><b>You order.</b>Your name, start date and time zone are saved with the order.</span></li>
    <li><span><b>We make your files.</b>Your book is generated with your name and every station dated for you, usually within a day of your order.</span></li>
    <li><span><b>It is printed.</b>Printing is done to order by a print partner.</span></li>
    <li><span><b>It ships.</b>You get a tracking link by email.</span></li>
  </ol>
  <h2>How long it takes</h2>
  <p>Allow about ${CONFIG.leadTime} from order to your door. Choose a start date at least two weeks out so the book arrives before your first station. The store suggests one for you.</p>
  <h2>Where we ship</h2>
  <p>Within the United States only, for now. The King James text is public domain in the United States and not everywhere else, so we keep to where we are sure.</p>
  <h2>What shipping costs</h2>
  <div class="tscroll"><table class="tbl"><thead><tr><th>Books in your order</th><th>US shipping</th></tr></thead><tbody>
    ${[1, 2, 3, 4].map(n => `<tr><td>${n}${n === 3 ? " (or one trilogy set)" : ""}</td><td>${money(shipCost(n))}</td></tr>`).join("")}</tbody></table></div>
  <p>Each book after the first adds ${money(CONFIG.ship.extra)}. The exact amount is shown in your cart before you pay.</p>
  <h2>Check your address</h2>
  <p>Each checkout ships to one address. Once your files go to print we cannot change the name, the dates or the address, so check them before you pay. If you notice a mistake, write to us right away.</p>
  <h2>If something is wrong</h2>
  <p>If your book arrives damaged, or misprinted, or with the wrong name or dates from what you ordered, write to us within 30 days with your order number and a photo. We will replace it at no cost.</p>
  <h2>Returns</h2>
  <p>Every book is made for one person, so we cannot take a book back for a change of mind. If it is not right, we will make it right.</p>
  <p>${L("/contact/", "Contact us about an order", "btn")}</p>
  ${draftNote()}
</div></div>`;

PAGES_FN.terms = () => `${crumbs([["Home", "/"], ["Terms of sale"]])}
<div class="wrap"><div class="pagehead"><p class="eyebrow">Terms of sale</p><h1>Terms</h1><p class="updated">Last updated September 20, 2026</p></div>
<div class="prose" style="padding-bottom:clamp(48px,8vw,96px)">
  ${draftNote()}
  <h2>1. Who we are</h2><p>This store is operated by NO PARADE of Bayonne, New Jersey, United States, under the name Letters to God. &ldquo;We&rdquo; means us. &ldquo;You&rdquo; means the person placing an order.</p>
  <h2>2. What you are buying</h2><p>Each book is generated for you from the name, start date and time zone you enter, and then printed to order. You are responsible for entering them correctly. Product pictures show real pages, and the dates in them are examples.</p>
  <h2>3. Prices and payment</h2><p>Prices are in US dollars. Shipping is added at checkout. Where the law requires it, sales tax is added before you pay. Payment is handled by Stripe. We never see or store your card number.</p>
  <h2>4. Production and delivery</h2><p>Because books are printed after you order, the times we give are estimates, not promises. We ship within the United States only. See ${L("/delivery-and-returns/", "Delivery and returns")}.</p>
  <h2>5. Returns and replacements</h2><p>Personalized books cannot be returned for a change of mind. If a book arrives damaged or misprinted, or differs from what you ordered, tell us within 30 days and we will replace it at no cost.</p>
  <h2>6. Cancellations and changes</h2><p>Write to us as soon as you can. Before your files go to print we can correct or cancel an order and refund it. After that we cannot.</p>
  <h2>7. Content and copyright</h2><p>The prompts, layout and design of these books are copyright NO PARADE. Scripture is from the King James Version, which is in the public domain in the United States. The list of 48 commands follows a compilation by NewStart Discipleship. Please do not copy or resell our pages.</p>
  <h2>8. Using this site</h2><p>Use the site lawfully and do not interfere with it. We may change or remove content at any time.</p>
  <h2>9. Liability</h2><p>To the extent the law allows, our liability for any order is limited to the amount you paid for it. Nothing here limits rights you have that cannot be limited by contract.</p>
  <h2>10. Governing law</h2><p>These terms are governed by the laws of the State of New Jersey.</p>
  <h2>11. Changes and contact</h2><p>We may update these terms, and the version in force when you order is the one that applies to that order. Questions: ${L("/contact/", "contact us")}.</p>
</div></div>`;

PAGES_FN.privacy = () => `${crumbs([["Home", "/"], ["Privacy"]])}
<div class="wrap"><div class="pagehead"><p class="eyebrow">Privacy</p><h1>Privacy</h1><p class="updated">Last updated September 20, 2026</p></div>
<div class="prose" style="padding-bottom:clamp(48px,8vw,96px)">
  ${draftNote()}
  <h2>What we collect</h2>
  <ul><li><b>When you order:</b> your email, name, shipping address and phone number (collected by Stripe at checkout and passed to us), and the name, start date and time zone you chose for each book.</li>
  <li><b>When you write to us:</b> your name, email and message.</li>
  <li><b>When you subscribe:</b> your email address.</li></ul>
  <h2>What we do not do</h2>
  <p>We do not sell your information. This site does not use advertising trackers.</p>
  <h2>Who handles it</h2>
  <ul><li><b>Stripe</b> processes payment and collects your shipping details. Your card number goes to Stripe and never to us.</li>
  <li><b>Cloudflare</b> hosts the site and stores our order queue, messages and email list.</li>
  <li><b>Our print partner</b> receives your name, shipping address, phone number and email so it can print and deliver your book.</li></ul>
  <h2>On your device</h2>
  <p>Your cart is kept in your browser&rsquo;s local storage so it is still there if you come back. It is not sent to us until you check out.</p>
  <h2>How long we keep it</h2>
  <p>Order records are kept as long as we need them for support, tax and accounting. Messages are kept until we have answered them. Your email stays on the list until you ask us to remove it.</p>
  <h2>Your choices</h2>
  <p>Ask us to see, correct or delete what we hold about you by writing through the ${L("/contact/", "contact page")}. Ask to leave the email list the same way.</p>
  <h2>Children</h2>
  <p>This store is for adults and is not directed to children under 13.</p>
  <h2>Changes</h2>
  <p>If we change this page we will update the date above.</p>
</div></div>`;

PAGES_FN.contact = () => `${crumbs([["Home", "/"], ["Contact"]])}
<div class="wrap"><div class="pagehead"><p class="eyebrow">Contact</p><h1>Write to us.</h1><p class="lede">About an order, a gift, ten or more copies, or anything else. Include your order number if you have one.</p></div>
<div class="narrow" style="padding-bottom:clamp(48px,8vw,96px);margin-left:0"><form class="form" id="contactForm" novalidate>
  <label class="hp" aria-hidden="true">Website<input type="text" name="hp" tabindex="-1" autocomplete="off"></label>
  <div class="row2"><div class="field"><label for="c-name">Name</label><input type="text" id="c-name" autocomplete="name" maxlength="80"></div>
  <div class="field"><label for="c-email">Email</label><input type="email" id="c-email" autocomplete="email" maxlength="120" required></div></div>
  <div class="field"><label for="c-topic">About</label><select id="c-topic"><option value="order">An order</option><option value="gift">A gift or bulk order</option><option value="press">Press or wholesale</option><option value="other">Something else</option></select></div>
  <div class="field"><label for="c-msg">Message</label><textarea id="c-msg" maxlength="4000" required></textarea></div>
  <div><button class="btn" type="submit">Send message</button></div><p class="msg" id="cMsg" role="status"></p>
</form></div></div>`;

PAGES_FN["thank-you"] = () => {
  const id = (curQuery().get("order") || "").toUpperCase(), ok = /^LTG-[A-Z0-9]{8}$/.test(id);
  return `<div class="wrap"><div class="pagehead"><p class="eyebrow">Order confirmed${ok ? " · " + esc(id) : ""}</p><h1>Thank you.</h1><p class="lede">Your order is in. A receipt is on its way to the email you gave at checkout.</p></div>
  <ol class="steps" style="padding-bottom:24px">
    <li><span><b>We make your files.</b>Your name and every date are set from what you chose, usually within a day.</span></li>
    <li><span><b>Your book is printed.</b>Printed to order, then handed to the carrier.</span></li>
    <li><span><b>It ships.</b>Allow about ${CONFIG.leadTime} in all. You will get a tracking link by email.</span></li>
  </ol>
  <p class="msg" style="max-width:60ch;margin-bottom:24px">Something not right, or a name or date to fix? Write to us right away, before your files go to print${ok ? ", and quote " + esc(id) : ""}.</p>
  <p class="cta-row" style="margin-bottom:clamp(48px,8vw,96px)">${L("/shop/", "Keep browsing", "btn")}${L("/contact/", "Contact us", "btn ghost")}</p></div>`;
};
PAGES_FN["404"] = () => `<div class="wrap"><div class="pagehead"><p class="eyebrow">404</p><h1>Nothing here.</h1><p class="lede">That page has gone or never was.</p><p class="cta-row">${L("/shop/", "Shop the journals", "btn")}${L("/", "Home", "btn ghost")}</p></div></div>`;

AFTER.contact = () => {
  $("#contactForm").addEventListener("submit", async e => {
    e.preventDefault(); const m = $("#cMsg"), f = e.target, b = $("button", f);
    const body = { name: $("#c-name").value, email: $("#c-email").value.trim(), topic: $("#c-topic").value, message: $("#c-msg").value, hp: $("[name=hp]", f).value };
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(body.email)) { m.className = "msg err"; m.textContent = "Add an email so we can reply."; return; }
    if (body.message.trim().length < 5) { m.className = "msg err"; m.textContent = "Write a few words first."; return; }
    b.disabled = true; m.className = "msg"; m.textContent = "Sending";
    try { await postJSON("/contact", body); m.className = "msg ok"; m.textContent = "Sent. We will write back."; f.reset(); }
    catch (er) { m.className = "msg err"; m.textContent = er.message === "preview" ? "This is a preview, so nothing was sent." : er.message + " Nothing was sent."; }
    b.disabled = false;
  });
};
AFTER["thank-you"] = () => { if (/^LTG-[A-Z0-9]{8}$/.test((curQuery().get("order") || "").toUpperCase())) clearCart(); };

/* ===== product page ===== */
const MODES = { deep: ["One deep prompt a week", "a page to write in"], daily: ["Seven short lines a week", "one for each day, dated"] };
function galleryFor(k) {
  const p = PROD[k], alt = p.title;
  if (k === "set") return [["hero_set", "The Letters to God trilogy: three A5 hardcover journals on an oak stool", 0], ["trio_covers", "The three volumes of Letters to God side by side", 0], ["cover_god", "Letters to God, Volume I, indigo cover", 1], ["cover_future", "Letters to Future Me, Volume II, teal cover", 1], ["cover_body", "Letters to My Body, Volume III, rust cover", 1],
    ["spread_deep_god", "A station spread from Volume I", 0], ["spread_full_god", "The Full Moon spread from Volume I", 0], ["spread_review_god", "The review spread from Volume I: what changed at each midpoint", 0]];
  return [[p.cover, alt + ", Volume " + p.roman + ", front cover", 1], [p.wrap, alt + ", full cover with spine and back", 0], [p.belongs, "The belongs-to page, with a name printed on it", 1],
    ["spread_deep_" + k, "A station spread with one deep prompt", 0], ["spread_daily_" + k, "A station spread with seven daily lines", 0], ["spread_full_" + k, "The Full Moon reflection spread", 0], ["spread_review_" + k, "The review spread: four dated midpoints that ask what changed", 0]];
}
function pdpPage(k) {
  const p = PROD[k], set = k === "set", G = galleryFor(k), others = ORDER.filter(x => x !== k);
  const first = G[0];
  const specs = [["Cover", "Hardcover casewrap, matte"], ["Size", "A5, 5.83 by 8.27 in"], ["Pages", `<span id="specPages">${set ? PAGES[12] + " each" : PAGES[12]}</span>`], ["Paper", "Uncoated white"]];
  const opts = set ? `<fieldset><legend>Length</legend><p class="msg">Twelve moons in each of the three books: ${PAGES[12]} pages, all 48 commands.</p></fieldset>` :
    `<fieldset><legend>Length</legend><div class="choices c3">${[3, 6, 12].map(m => `<div class="choice"><input type="radio" name="months" id="m${m}" value="${m}"${m === 12 ? " checked" : ""}><label for="m${m}"><span class="t">${m} moons</span><span class="s">${PAGES[m]} pp · ${money(PRICE[m])}</span></label></div>`).join("")}</div></fieldset>`;
  const sampleBlock = set ? `<div class="grid g3">${["god", "future", "body"].map(x => `<div class="vlens" style="--accent:var(--v-${x})"><p class="eyebrow">Volume ${PROD[x].roman} · ${PROD[x].title}</p><p class="sample"><b>Station 1 · Repent · Matthew 4:17</b>${esc(DATA.vol[x].deep)}</p></div>`).join("")}</div>` :
    `<div class="duo"><div class="spreadbox">${img("spread_deep_" + k, "A station spread from " + p.title, ' class="spread" width="1166" height="827" loading="lazy"')}<p class="figcap">MOON I · STATION 1 · COMMAND 01 OF 48 · A REAL SPREAD FROM VOLUME ${p.roman}</p></div>
      <div class="vlens" style="--accent:var(--v-${k})"><p class="eyebrow">The first prompt</p><p class="sample"><b>Station 1 · Repent · Matthew 4:17</b>${esc(DATA.vol[k].deep)}</p>
      <p class="eyebrow" style="margin-top:14px">Or, in seven-lines mode</p><ol class="sample" style="margin:0;padding-left:14px;list-style-position:inside">${DATA.vol[k].daily.map(d => `<li>${esc(d)}</li>`).join("")}</ol></div></div>`;
  const features = [`${set ? "Three books, " : ""}56, 100 or 172 pages by edition, hardcover casewrap, A5`, "48 commands of Jesus in the King James words, one each week", "Four stations a moon: New Moon, First Quarter, Full Moon, Last Quarter", "Four midpoints a moon (the crescent and gibbous phases): a dated page that asks what changed",
    "A command and a prompt on the left, a ruled page on the right", "A Full Moon reflection, an opening Psalm and a closing letter each moon", "Your name on the belongs-to page", "Every date calculated for your start day and time zone"];
  const details = [["Size", "A5, 5.83 by 8.27 in (14.8 by 21 cm)"], ["Binding", "Hardcover casewrap, matte cover"], ["Pages", "56, 100 or 172, by edition"], ["Paper", "Uncoated white, so ink can dry into the page"],
    ["Type", "Cormorant Garamond and IBM Plex Mono"], ["Scripture", "King James Version"], ["Language", "English"], ["Printing", "On demand, per order, by a print partner"]];
  return `${crumbs([["Home", "/"], ["Shop", "/shop/"], [p.title]])}
<div class="wrap"><div class="pdp">
  <div class="gallery"><div class="gmain" id="gMain"${first[0] === "trio_covers" ? ' data-bg="light"' : ""}>${img(first[0], first[1], ` id="gImg" class="${first[2] ? "shadowed" : ""}"`)}</div>
    <div class="gthumbs">${G.map((g, i) => `<button type="button" data-img="${g[0]}" data-alt="${esc(g[1])}" data-sh="${g[2]}" aria-label="${esc(g[1])}"${i === 0 ? ' aria-current="true"' : ""}>${img(g[0], "", ' loading="lazy"')}</button>`).join("")}</div></div>
  <div class="buy ${k}">
    <p class="num">${set ? "Volumes I, II and III" : "Volume " + p.roman + " · " + p.tag}</p>
    <h1>${p.title}</h1>
    <p class="fine" style="margin-top:-12px">A NO PARADE JOURNAL</p>
    <div class="priceline"><span class="amt" id="pAmt">${money(set ? PRICE.set : PRICE[12])}</span><span class="was" id="pWas">${set ? "Save $15 against buying apart ($144)" : ""}</span></div>
    <p class="teaser">${p.teaser}</p>
    <dl class="specrow">${specs.map(s => `<div><dt>${s[0]}</dt><dd>${s[1]}</dd></div>`).join("")}</dl>
    <form class="form" id="pdpForm" novalidate>
      ${opts}
      <fieldset><legend>How you answer</legend><div class="choices c2">${["deep", "daily"].map((m, i) => `<div class="choice"><input type="radio" name="mode" id="md_${m}" value="${m}"${i === 0 ? " checked" : ""}><label for="md_${m}"><span class="t">${MODES[m][0]}</span><span class="s">${MODES[m][1]}</span></label></div>`).join("")}</div></fieldset>
      <fieldset><legend>Make it yours</legend><div style="display:grid;gap:16px">
        <div class="field"><label for="f-name">Name for the &ldquo;belongs to&rdquo; page</label><input type="text" id="f-name" maxlength="40" autocomplete="off" placeholder="Your name, or the person you are giving it to"><small>Printed on the belongs-to page. Leave blank to write it in yourself.</small></div>
        <div class="row2"><div class="field"><label for="f-start">Start date</label><input type="date" id="f-start"><small>Your first station is the next New Moon on or after this date.</small><button type="button" class="link" id="nmBtn" style="text-align:left">Pick the first New Moon two weeks out</button></div>
        <div class="field"><label for="f-tz">Time zone</label><select id="f-tz">${ZONES.map(z => `<option value="${z[0]}">${z[1]} (${z[0].split("/")[1].replace("_", " ")})</option>`).join("")}</select><small>Dates print in this zone.</small></div></div>
      </div></fieldset>
      <div class="moonbox" aria-live="polite"><p class="eyebrow" id="moonLead">Your first moon</p><div class="dates" id="moonDates"></div>
        <details class="all"><summary>All the dates in ${set ? "each book" : "your book"}</summary><div class="tscroll"><table class="moons" id="moonTable"></table></div></details></div>
      <div class="buyrow"><div class="qty" role="group" aria-label="Quantity"><button type="button" id="qMinus" aria-label="One fewer">&minus;</button><output id="qty" aria-live="polite">1</output><button type="button" id="qPlus" aria-label="One more">+</button></div>
        <button class="btn accent block" type="submit" id="buyBtn">Add to cart</button></div>
      <p class="msg" id="pdpMsg" role="status"></p>
    </form>
    <div class="assure"><span>Printed after you order, with your name and your dates</span><span>Ships to the United States in about ${CONFIG.leadTime}</span><span>Secure checkout by Stripe</span></div>
    <div class="acc">
      ${accItem("Details", `<table class="tbl"><tbody>${details.map(d => `<tr><td>${d[0]}</td><td>${d[1]}</td></tr>`).join("")}</tbody></table>`, true)}
      ${accItem("Features", `<ul>${features.map(f => `<li>${f}</li>`).join("")}</ul>`)}
      ${accItem("Delivery", `<p>Every book is printed after you order it. Allow about ${CONFIG.leadTime} to the United States. You will get a tracking link by email. Shipping is ${money(shipCost(1))} for one book and ${money(CONFIG.ship.extra)} more for each additional book.</p><p>${L("/delivery-and-returns/", "Delivery and returns")}</p>`)}
      ${accItem("Buying it for someone", `<p>Type their name, choose a start date on or after they will receive it, and the book is theirs. Each cart line keeps its own name and dates, so you can add several books for several people. Each checkout ships to one address.</p><p>Ordering ten or more? ${L("/contact/", "Write to us")}.</p>`)}
    </div>
  </div>
</div></div>
<section class="blk statement" style="--accent:var(--v-${set ? "god" : k})"><div class="wrap"><p>${p.statement}</p></div></section>
<section class="blk"><div class="wrap">${tiles()}</div></section>
<section class="blk"><div class="wrap"><div class="head"><p class="eyebrow">From the book</p><h2>${set ? "Three ways into the same command." : "Here is how it reads."}</h2></div>${sampleBlock}</div></section>
<section class="blk"><div class="wrap"><div class="head"><p class="eyebrow">Twelve moons</p><h2>What each moon brings.</h2><p class="lede">All 48 commands, in the order the moons bring them. A 3-moon book holds the first 12 and a 6-moon book the first 24.</p></div>
  <div class="acc">${accItem("See all 48 commands", commandsList())}</div></div></section>
<section class="blk"><div class="wrap"><div class="head"><p class="eyebrow">Others also bought</p><h2>The rest of the shelf.</h2></div><div class="grid g3">${others.map(card).join("")}</div></div></section>`;
}
["god", "future", "body", "set"].forEach(k => { PAGES_FN["pdp-" + k] = () => pdpPage(k); AFTER["pdp-" + k] = () => bindPdp(k); });

function readCfg(k) {
  const set = k === "set";
  return { kind: set ? "set" : "book", ...(set ? {} : { volume: k }), months: set ? 12 : +$("input[name=months]:checked").value, mode: $("input[name=mode]:checked").value,
    name: $("#f-name").value.replace(/\s+/g, " ").trim(), start_date: $("#f-start").value, tz: $("#f-tz").value, qty: +$("#qty").textContent };
}
function stationRows(startIso, months, tz) {
  const L2 = lunations(Date.parse(startIso + "T00:00:00Z"), months);
  return { L: L2, M: midpoints(Date.parse(startIso + "T00:00:00Z"), months), rows: L2[0].map((t, i) => { const n = DATA.names[i]; return `<div class="r"><span style="width:20px;display:block">${moonSvg(i * 90, 9)}</span><span class="d">${fmt(t, tz)}</span><span class="c">${esc(n[1])}</span><span class="p">${STATION[i]} · ${esc(n[2])}</span></div>`; }).join("") };
}
function bindPdp(k) {
  const set = k === "set", tzSel = $("#f-tz");
  tzSel.value = guessZone(); $("#f-start").min = plusDays(0); $("#f-start").max = plusDays(365); $("#f-start").value = plusDays(14);
  $$(".gthumbs button").forEach(b => b.addEventListener("click", () => {
    const i = $("#gImg"); i.src = IMG[b.dataset.img]; i.alt = b.dataset.alt; i.className = b.dataset.sh === "1" ? "shadowed" : ""; const gm = $("#gMain"); if (b.dataset.img === "trio_covers") gm.dataset.bg = "light"; else delete gm.dataset.bg;
    $$(".gthumbs button").forEach(x => x.removeAttribute("aria-current")); b.setAttribute("aria-current", "true");
  }));
  function update() {
    const c = readCfg(k), unit = set ? PRICE.set : PRICE[c.months];
    $("#pAmt").textContent = money(unit);
    if (!set) { $("#pWas").textContent = c.months === 12 ? "or " + money(PRICE[3]) + " for 3 moons" : c.months === 6 ? "or " + money(PRICE[12]) + " for all 12 moons" : "or " + money(PRICE[12]) + " for all 12 moons"; $("#specPages").textContent = PAGES[c.months]; }
    $("#buyBtn").textContent = "Add to cart · " + money(unit * c.qty);
    if (c.start_date) {
      const s = stationRows(c.start_date, c.months, c.tz);
      $("#moonLead").textContent = "Your first moon opens " + fmt(s.L[0][0], c.tz, true);
      $("#moonDates").innerHTML = s.rows;
      $("#moonTable").innerHTML = `<thead><tr><th>Moon</th><th>New</th><th>1st Qtr</th><th>Full</th><th>Last Qtr</th></tr></thead><tbody>` + s.L.map((r, i) => `<tr><td>${i + 1}</td>${r.map(t => `<td>${fmt(t, c.tz)}</td>`).join("")}</tr><tr class="midrow"><td></td><td colspan="4">What changed: ${s.M[i].map(t => fmt(t, c.tz)).join(" · ")}</td></tr>`).join("") + `</tbody>`;
    }
  }
  $$("#pdpForm input, #pdpForm select").forEach(el => { el.addEventListener("input", update); el.addEventListener("change", update); });
  $("#qMinus").addEventListener("click", () => { const q = $("#qty"); q.textContent = Math.max(1, +q.textContent - 1); update(); });
  $("#qPlus").addEventListener("click", () => { const q = $("#qty"); q.textContent = Math.min(CONFIG.limits.qty, +q.textContent + 1); update(); });
  $("#nmBtn").addEventListener("click", () => {
    const tz = tzSel.value, t = lunations(Date.now() + 14 * 864e5, 1)[0][0];
    const parts = new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(t);
    $("#f-start").value = parts; update();
  });
  $("#pdpForm").addEventListener("submit", e => {
    e.preventDefault(); const c = readCfg(k), m = $("#pdpMsg"); m.className = "msg";
    if (!c.start_date) { m.className = "msg err"; m.textContent = "Choose a start date."; $("#f-start").focus(); return; }
    if (c.start_date < plusDays(-1) || c.start_date > plusDays(365)) { m.className = "msg err"; m.textContent = "Choose a start date within the next year."; $("#f-start").focus(); return; }
    const err = addToCart(c); if (err) { m.className = "msg err"; m.textContent = err; return; }
    m.textContent = ""; openDrawer();
  });
  update();
}

/* ===== cart ===== */
const CART_KEY = "ltg.cart.v1", EMAIL_KEY = "ltg.email";
let cart = [], cartEmail = "", cartNotice = "";
const uid = () => Math.random().toString(36).slice(2, 9);
const booksIn = ls => ls.reduce((n, l) => n + l.qty * (l.kind === "set" ? 3 : 1), 0);
const unitOf = l => (l.kind === "set" ? PRICE.set : PRICE[l.months]);
const lineKey = l => [l.kind, l.volume || "", l.months, l.mode, l.name, l.start_date, l.tz].join("|");
function cartTotals() {
  const sub = cart.reduce((n, l) => n + unitOf(l) * l.qty, 0), b = booksIn(cart);
  return { sub, books: b, ship: b ? shipCost(b) : 0, total: sub + (b ? shipCost(b) : 0) };
}
function validLine(l) {
  return l && (l.kind === "book" || l.kind === "set") && (l.kind === "set" || PROD[l.volume] && l.volume !== "set") && PRICE[l.months] && (l.mode === "deep" || l.mode === "daily") &&
    /^\d{4}-\d{2}-\d{2}$/.test(l.start_date || "") && ZONES.some(z => z[0] === l.tz) && Number.isInteger(l.qty) && l.qty >= 1 && l.qty <= CONFIG.limits.qty && typeof l.name === "string";
}
function loadCart() {
  try { const j = JSON.parse(store.get(CART_KEY) || "[]"); cart = Array.isArray(j) ? j.filter(validLine).slice(0, CONFIG.limits.lines) : []; } catch (e) { cart = []; }
  let moved = 0; cart.forEach(l => { l.id = l.id || uid(); if (l.start_date < plusDays(-1)) { l.start_date = plusDays(14); moved++; } });
  if (moved) { cartNotice = `The start date had passed on ${moved} item${moved > 1 ? "s" : ""}, so we moved ${moved > 1 ? "them" : "it"} two weeks out. Check the dates before you pay.`; }
  cartEmail = store.get(EMAIL_KEY) || "";
}
const saveCart = () => store.set(CART_KEY, JSON.stringify(cart));
function clearCart() { cart = []; cartNotice = ""; saveCart(); renderCart(); }
function addToCart(l) {
  const k = lineKey(l), ex = cart.find(x => lineKey(x) === k);
  const next = ex ? cart.map(x => x === ex ? { ...x, qty: x.qty + l.qty } : x) : [...cart, { ...l, id: uid() }];
  if (next.some(x => x.qty > CONFIG.limits.qty)) return "That is the most of one book in a single order. Write to us for a bulk price.";
  if (!ex && cart.length >= CONFIG.limits.lines) return "A cart holds up to six different books. Check out, then order the rest.";
  if (booksIn(next) > CONFIG.limits.books) return "That is more than twelve books. Check out first, or write to us for a bulk price.";
  cart = next; saveCart(); renderCart(); return "";
}
function lineHtml(l) {
  const p = PROD[l.kind === "set" ? "set" : l.volume];
  const first = fmt(lunations(Date.parse(l.start_date + "T00:00:00Z"), 1)[0][0], l.tz);
  return `<div class="line" data-id="${l.id}"><div class="th">${img(p.cover, "")}</div><div>
    <h3>${L(prodPath(p.key), esc(p.title))}</h3>
    <p class="m">${l.kind === "set" ? "Three books · 12 moons each" : l.months + " moons · " + PAGES[l.months] + " pages"}<br>${MODES[l.mode][0]}<br>${l.name ? "For " + esc(l.name) : "Belongs-to page left blank"}<br>First moon ${first} · ${zoneName(l.tz)}</p>
    <div class="r"><div class="qty"><button type="button" data-q="-1" aria-label="One fewer">&minus;</button><output>${l.qty}</output><button type="button" data-q="1" aria-label="One more">+</button></div><span class="pr">${money(unitOf(l) * l.qty)}</span></div>
    <button type="button" class="link" data-rm style="margin-top:8px">Remove</button></div></div>`;
}
function renderCart() {
  const n = cart.reduce((a, l) => a + l.qty, 0), b = $("#cartBtn");
  if (!b) return;
  $(".count", b).textContent = n; $(".count", b).dataset.n = n; b.setAttribute("aria-label", `Open cart, ${n} item${n === 1 ? "" : "s"}`);
  const body = $("#cartBody"), foot = $("#cartFoot");
  if (!cart.length) {
    body.innerHTML = `<div class="empty"><p>Your cart is empty.</p>${L("/shop/", "Shop the journals", "btn")}</div>`; foot.hidden = true; return;
  }
  const t = cartTotals();
  body.innerHTML = (cartNotice ? `<p class="msg err" style="padding-top:14px">${esc(cartNotice)}</p>` : "") + cart.map(lineHtml).join("");
  foot.hidden = false;
  foot.innerHTML = `<div class="tot"><div><span>Subtotal</span><span>${money(t.sub)}</span></div><div><span>US shipping${t.books > 1 ? ", " + t.books + " books" : ""}</span><span>${money(t.ship)}</span></div><div class="grand"><span>Total</span><span>${money(t.total)}</span></div></div>
    <div class="field"><label for="cartEmail">Email for your receipt and tracking</label><input type="email" id="cartEmail" autocomplete="email" placeholder="you@example.com" value="${esc(cartEmail)}"></div>
    <button class="btn accent block" type="button" id="checkoutBtn">Checkout</button>
    <p class="msg" id="checkoutMsg" role="status">Tax, if any, is added at checkout. By checking out you agree to the ${L("/terms/", "terms of sale")}. Personalized books cannot be returned for a change of mind.</p>`;
}
async function checkout() {
  const m = $("#checkoutMsg"), em = $("#cartEmail").value.trim(); cartEmail = em; store.set(EMAIL_KEY, em);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) { m.className = "msg err"; m.textContent = "Add the email your receipt should go to."; $("#cartEmail").focus(); return; }
  const payload = { email: em, lines: cart.map(({ id, ...rest }) => rest) }, t = cartTotals();
  if (!CONFIG.endpoint) {
    $("#dlgTitle").textContent = "Checkout preview";
    $("#dlgBody").textContent = `This page is not connected to Stripe yet, so nothing was sent and no payment was taken. When it is, this is the order it will create: ${money(t.sub)} plus ${money(t.ship)} shipping.`;
    $("#dlgPre").textContent = JSON.stringify(payload, null, 2); $("#dlg").showModal(); return;
  }
  const btn = $("#checkoutBtn"); btn.disabled = true; btn.textContent = "Opening checkout"; m.className = "msg";
  try { const j = await postJSON("/checkout", payload); if (!j.url) throw new Error("Checkout could not start."); location.href = j.url; }
  catch (e) { m.className = "msg err"; m.textContent = e.message + " Nothing was charged. Try again, or write to us."; btn.disabled = false; btn.textContent = "Checkout"; }
}

/* ===== boot ===== */
function boot() {
  const app = $("#app");
  app.innerHTML = chrome();
  loadCart(); renderCart();
  document.addEventListener("click", e => {
    const a = e.target.closest("a[data-l]");
    if (a && !(e.metaKey || e.ctrlKey || e.shiftKey || e.button)) { e.preventDefault(); go(a.getAttribute("data-l")); return; }
    if (e.target.closest("[data-skip]")) { e.preventDefault(); $("#main").focus(); return; }
    if (e.target.closest("#cartBtn")) { openDrawer(); return; }
    if (e.target.closest("#drawerX") || e.target.id === "scrim") { closeDrawer(); return; }
    if (e.target.closest("#navX")) { closeNav(); return; }
    if (e.target.closest("#burger")) { $("#nav").classList.contains("on") ? closeNav() : openNav(); return; }
    if (e.target.closest("#chev")) { const it = e.target.closest(".navitem"); const o = it.classList.toggle("open"); $("#chev").setAttribute("aria-expanded", o); return; }
    if (e.target.closest("#checkoutBtn")) { checkout(); return; }
    const q = e.target.closest("[data-q]"), rm = e.target.closest("[data-rm]");
    if (q || rm) {
      const row = e.target.closest(".line"), l = cart.find(x => x.id === row.dataset.id); if (!l) return;
      if (rm) cart = cart.filter(x => x !== l);
      else { const nq = l.qty + +q.dataset.q; if (nq < 1) cart = cart.filter(x => x !== l); else if (nq <= CONFIG.limits.qty && booksIn(cart) + (+q.dataset.q) * (l.kind === "set" ? 3 : 1) <= CONFIG.limits.books) l.qty = nq; else toast("That is the most in one order. Write to us for a bulk price."); }
      saveCart(); renderCart(); return;
    }
    if (!e.target.closest(".navitem")) $(".navitem") && $(".navitem").classList.remove("open");
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") { closeDrawer(); closeNav(); } });
  document.addEventListener("input", e => { if (e.target.id === "cartEmail") cartEmail = e.target.value; });
  document.addEventListener("submit", async e => {
    if (e.target.id !== "nlForm") return;
    e.preventDefault(); const m = $("#nlMsg"), em = $("#nlEmail").value.trim(), b = $("button", e.target);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) { m.className = "msg err"; m.textContent = "Add a valid email."; return; }
    b.disabled = true; m.className = "msg"; m.textContent = "Adding you";
    try { await postJSON("/subscribe", { email: em, hp: $("[name=hp]", e.target).value, src: curPath() }); m.className = "msg ok"; m.textContent = "You are on the list."; e.target.reset(); }
    catch (er) { m.className = "msg err"; m.textContent = er.message === "preview" ? "This is a preview, so nothing was saved." : er.message; }
    b.disabled = false;
  });
  window.addEventListener(MODE === "hash" ? "hashchange" : "popstate", route);
  window.addEventListener("storage", e => { if (e.key === CART_KEY) { loadCart(); renderCart(); } });
  route();
}
boot();

})();
