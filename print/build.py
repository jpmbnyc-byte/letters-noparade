# -*- coding: utf-8 -*-
"""Letters to God series: interior + casewrap cover for one order, sized for Lulu.

    python build.py --volume god --months 12 --mode deep --name "Marielle" \
        --start 2026-09-20 --tz America/New_York --out out/

Evolved from the first Letters to God generator (same fonts, colours, drawing helpers, lunar maths
and cover geometry) to the 48-command edition sold on the store: four stations a moon (New Moon,
First Quarter, Full Moon, Last Quarter), four dated midpoints on a review spread, a Full Moon
reflection, a Psalm to open each moon and a letter to close it. 56 / 100 / 172 pages.

Lunar dates come from PyEphem, so a fresh --start regenerates the book for any order date.
Lulu product: A5 hardcover casewrap, matte, standard black & white interior, 60# uncoated white
(0583X0827BWSTDCW060UW444MXX). Colour in the interior prints as greyscale.
"""
import argparse, json, math, os, re, datetime as dt
from zoneinfo import ZoneInfo
import ephem
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor, Color
from reportlab.lib.utils import simpleSplit
from commands import COMMANDS
import volumes as V

HERE = os.path.dirname(os.path.abspath(__file__))
IN = 72.0
TRIM_W, TRIM_H = 5.83 * IN, 8.27 * IN          # Lulu A5
WRAP = 0.75 * IN                                 # casewrap: 0.75 in on every outer edge (verified from Lulu template geometry)

ACCENT = HexColor("#2C3E50")                     # set per volume in main()
INK = HexColor("#1A1A1A")
GRAY = HexColor("#6B6B6B")
RULE = HexColor("#C5CCD3")
CREAM = HexColor("#F5F1E8")
GOLD = HexColor("#C8A96A")

POD_PACKAGE_ID = "0583X0827BWSTDCW060UW444MXX"   # A5 / B&W / standard / casewrap / 60# uncoated white / matte

# ---------- fonts ----------
FD = os.path.join(HERE, "fonts")
for name, f in [("CG-Bold", "cormorant-garamond-latin-700-normal.ttf"),
                ("CG-Reg", "cormorant-garamond-latin-500-normal.ttf"),
                ("CG-Ital", "cormorant-garamond-latin-500-italic.ttf"),
                ("PM-Reg", "ibm-plex-mono-latin-400-normal.ttf"),
                ("PM-Med", "ibm-plex-mono-latin-500-normal.ttf")]:
    pdfmetrics.registerFont(TTFont(name, os.path.join(FD, f)))

# ---------- Lulu spine table (hardcover casewrap), inches ----------
SPINE_TABLE = [(24, 84, 0.25), (85, 140, 0.5), (141, 168, 0.625), (169, 194, 0.6875), (195, 222, 0.75)]
def spine_in(pages):
    for lo, hi, w in SPINE_TABLE:
        if lo <= pages <= hi:
            return w
    raise ValueError("page count outside the rows of the Lulu table this script carries; extend SPINE_TABLE or call /cover-dimensions/")

TARGET_PAGES = {3: 56, 6: 100, 12: 172}
FRONT = 10
PER_MOON = 12      # opener, review spread (2), four station spreads (8), closing letter

STATIONS = [("new", "New Moon", 0), ("first_q", "First Quarter", 90), ("full", "Full Moon", 180), ("last_q", "Last Quarter", 270)]
MIDPOINTS = [("Waxing crescent", "New Moon", 45), ("Waxing gibbous", "First Quarter", 135),
             ("Waning gibbous", "Full Moon", 225), ("Waning crescent", "Last Quarter", 315)]
ORDINAL = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth", "Eleventh", "Twelfth"]

# ---------- lunar math ----------
UTC = ZoneInfo("UTC")
def to_local(d, tz):
    return ephem.Date(d).datetime().replace(tzinfo=UTC).astimezone(tz)

def build_lunations(start_date, months):
    d = ephem.Date(start_date.strftime("%Y/%m/%d"))
    news = [ephem.next_new_moon(d)]
    for _ in range(months):
        news.append(ephem.next_new_moon(ephem.Date(news[-1] + 1)))
    out = []
    for k in range(months):
        t0, t1 = news[k], news[k + 1]
        L = dict(new=t0, end=t1, first_q=ephem.next_first_quarter_moon(t0),
                 full=ephem.next_full_moon(t0), last_q=ephem.next_last_quarter_moon(t0))
        edges = [L["new"], L["first_q"], L["full"], L["last_q"], t1]
        L["mid"] = [ephem.Date((edges[i] + edges[i + 1]) / 2) for i in range(4)]   # halfway in time between stations
        out.append(L)
    return out

# ---------- drawing helpers ----------
def roman(n):
    vals = [(10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I")]
    s = ""
    for v, r in vals:
        while n >= v:
            s += r; n -= v
    return s

def wrap(text, font, size, width):
    return simpleSplit(text, font, size, width)

def spaced(c, text, x, y, font, size, sp, align="l", color=INK):
    c.setFillColor(color)
    w = pdfmetrics.stringWidth(text, font, size) + sp * max(len(text) - 1, 0)
    if align == "c": x -= w / 2
    elif align == "r": x -= w
    t = c.beginText(x, y); t.setFont(font, size); t.setCharSpace(sp); t.textOut(text); t.setCharSpace(0); c.drawText(t)

def spaced_width(text, font, size, sp):
    return pdfmetrics.stringWidth(text, font, size) + sp * max(len(text) - 1, 0)

def moon(c, cx, cy, r, theta, dark=None, light=CREAM, ring=None):
    dark = dark or ACCENT; ring = ring or ACCENT
    th = theta % 360
    waxing = th <= 180
    e = th if waxing else 360 - th
    c.saveState()
    c.setFillColor(dark); c.setStrokeColor(ring); c.setLineWidth(max(r * 0.06, 0.4))
    c.circle(cx, cy, r, stroke=0, fill=1)
    if e > 1.0:
        k = math.cos(math.radians(e))
        n = 60
        pts = [(math.sqrt(max(1 - y * y, 0)), y) for y in [1 - 2 * i / n for i in range(n + 1)]]
        pts += [(k * math.sqrt(max(1 - y * y, 0)), y) for y in [-1 + 2 * i / n for i in range(n + 1)]]
        p = c.beginPath()
        for i, (x, y) in enumerate(pts):
            X = cx + (x if waxing else -x) * r
            Y = cy + y * r
            p.moveTo(X, Y) if i == 0 else p.lineTo(X, Y)
        p.close()
        c.setFillColor(light); c.drawPath(p, stroke=0, fill=1)
    c.setFillColor(Color(0, 0, 0, 0)); c.circle(cx, cy, r, stroke=1, fill=0)
    c.restoreState()

def rules(c, x0, x1, y_top, y_bot, pitch=20, color=RULE, w=0.5):
    c.saveState(); c.setStrokeColor(color); c.setLineWidth(w)
    y = y_top - pitch
    while y >= y_bot - 0.01:
        c.line(x0, y, x1, y); y -= pitch
    c.restoreState()
    return y + pitch

def hairline(c, x0, x1, y, color=RULE, w=0.5):
    c.saveState(); c.setStrokeColor(color); c.setLineWidth(w); c.line(x0, y, x1, y); c.restoreState()

def para(c, text, x, y, width, font, size, leading, color=INK, align="l"):
    c.setFillColor(color); c.setFont(font, size)
    for ln in wrap(text, font, size, width):
        if align == "c": c.drawCentredString(x + width / 2, y, ln)
        else: c.drawString(x, y, ln)
        y -= leading
    return y

def fmt_day(dtl):  return dtl.strftime("%a ") + str(dtl.day) + dtl.strftime(" %b")
def fmt_full(dtl): return fmt_day(dtl) + dtl.strftime(" %Y")
def fmt_time(dtl): return dtl.strftime("%-I:%M %p %Z")
def fmt_long(d):   return d.strftime("%B ") + str(d.day) + d.strftime(", %Y")

def page_header(b, left, right, theta=None):
    c = b.c; x0, x1 = b.bounds(); top = b.H - 0.62 * IN
    spaced(c, left, x0, top, "PM-Reg", 6.8, 1.2, "l", GRAY)
    if theta is None:
        spaced(c, right, x1, top, "PM-Reg", 6.8, 1.2, "r", GRAY)
    else:
        spaced(c, right, x1 - 16, top, "PM-Reg", 6.8, 1.2, "r", GRAY)
        moon(c, x1 - 6, top + 2.3, 5.5, theta)
    hairline(c, x0, x1, top - 8)
    return top - 8

# ---------- interior ----------
class Book:
    def __init__(self, path, title):
        self.c = canvas.Canvas(path, pagesize=(TRIM_W, TRIM_H), pageCompression=1, initialFontName="PM-Reg", initialFontSize=8)
        self.c.setTitle(title); self.c.setAuthor("JP Bobo"); self.c.setSubject(title)
        self.pg = 1
        self.W, self.H = TRIM_W, TRIM_H
    def bounds(self):
        inner, outer = 0.8 * IN, 0.55 * IN
        if self.pg % 2 == 1: return inner, self.W - outer
        return outer, self.W - inner
    def footer(self, folio=True):
        if not folio: return
        self.c.setFillColor(GRAY); self.c.setFont("PM-Reg", 7)
        self.c.drawCentredString(self.W / 2, 0.38 * IN, str(self.pg))
    def end(self, folio=True):
        self.footer(folio); self.c.showPage(); self.pg += 1

def page_half_title(b, v):
    c = b.c; spaced(c, v["title"].upper(), b.W / 2, b.H * 0.62, "CG-Bold", 18, 3, "c", ACCENT); b.end(False)

def page_belongs(b, name, start):
    c = b.c; x0, x1 = b.bounds(); y = b.H * 0.60
    spaced(c, "THIS BOOK BELONGS TO", b.W / 2, y, "PM-Reg", 8, 2, "c", GRAY)
    if name:
        c.setFillColor(ACCENT); c.setFont("CG-Ital", 26); c.drawCentredString(b.W / 2, y - 34, name)
    hairline(c, x0 + 30, x1 - 30, y - 40, ACCENT, 0.75)
    spaced(c, "BEGUN ON", b.W / 2, y - 90, "PM-Reg", 8, 2, "c", GRAY)
    c.setFillColor(ACCENT); c.setFont("CG-Ital", 18); c.drawCentredString(b.W / 2, y - 124, fmt_long(start))
    hairline(c, x0 + 80, x1 - 80, y - 130, ACCENT, 0.75); b.end(False)

def page_title(b, v):
    c = b.c
    moon(c, b.W / 2, b.H * 0.72, 22, 0)
    l1, l2 = v["lines"]
    spaced(c, l1, b.W / 2, b.H * 0.56, "CG-Bold", 40, 4, "c", ACCENT)
    size = 40
    while spaced_width(l2, "CG-Bold", size, 4) > b.W - 1.2 * IN: size -= 1
    spaced(c, l2, b.W / 2, b.H * 0.56 - 44, "CG-Bold", size, 4, "c", ACCENT)
    c.setFillColor(GRAY); c.setFont("CG-Ital", 14); c.drawCentredString(b.W / 2, b.H * 0.56 - 80, v["subtitle"])
    spaced(c, "NO PARADE", b.W / 2, 1.2 * IN, "PM-Med", 9, 3, "c", INK)
    spaced(c, "VOLUME " + v["roman"], b.W / 2, 1.2 * IN - 16, "PM-Reg", 7, 3, "c", GRAY); b.end(False)

def page_copyright(b, v, tzname, mode, months):
    c = b.c; x0, x1 = b.bounds(); y = 2.6 * IN
    lines = [f"{v['title']}, Volume {v['roman']}", "Copyright © 2026 JP Bobo. All rights reserved.", "",
             "Scripture quotations are from the King James Version of the Bible (public domain in the United States). "
             "The list of 48 commands follows a compilation by NewStart Discipleship.", "",
             f"Lunar dates are computed astronomically for the {tzname} time zone and printed for this copy only.",
             f"This copy: {months}-moon edition, {'one deep prompt' if mode == 'deep' else 'seven daily lines'} a week.", "",
             "Set in Cormorant Garamond and IBM Plex Mono, both licensed under the SIL Open Font License.",
             "Printed on demand.", "", "First edition."]
    c.setFillColor(GRAY); c.setFont("PM-Reg", 7)
    for ln in lines:
        for w in wrap(ln, "PM-Reg", 7, x1 - x0) or [""]:
            c.drawString(x0, y, w); y -= 10
    b.end(False)

def page_epigraph(b, v):
    c = b.c; t, ref = v["front_epigraph"]
    w = 250; x = (b.W - w) / 2
    y = para(c, "“" + t + "”", x, b.H * 0.58, w, "CG-Ital", 17, 23, INK, "c")
    spaced(c, "— " + ref.upper() + " (KJV)", b.W / 2, y - 6, "PM-Reg", 7.5, 1.5, "c", GRAY); b.end(False)

def heading(c, text, x, y):
    c.setFillColor(ACCENT); c.setFont("CG-Bold", 24); c.drawString(x, y, text)

def page_how(b, v, months, mode, ncmd):
    c = b.c; x0, x1 = b.bounds(); w = x1 - x0; y = b.H - 1.1 * IN
    heading(c, "How to use this book", x0, y); y -= 34
    letter = {"god": "to God", "future": "to the person you are becoming", "body": "to your body"}[v["key"]]
    paras = [
     f"This book is dated to the real moon. It opens at a New Moon and runs {months} lunar months, about {round(months*29.53)} days.",
     "Each moon holds four stations, one at every turning of the moon: New Moon, First Quarter, Full Moon and Last Quarter. "
     f"Every station opens with one command of Jesus, in the King James words, so each week has its own command. This copy carries "
     + ("all 48, each once." if ncmd == 48 else f"the first {ncmd} of the 48, in order."),
     v["lens"],
     ("Beside each command is one prompt and a page for your own words." if mode == "deep" else
      "Beside each command are seven short lines, one for each day of the week, dated in the margin. Take the one that fits the day."),
     "Between the stations the moon is a crescent or a gibbous. Near the start of each moon, a review spread gives each of these four "
     "midpoints a dated panel that asks what has changed. The midpoints carry no new command.",
     f"Each moon also opens with a Psalm, adds a reflection at the Full Moon, and closes with a letter {letter}.",
     "There is no wrong pace. Skip a station. Write in the margins. The moon keeps its own schedule either way."]
    for p in paras:
        y = para(c, p, x0, y, w, "PM-Reg", 8.2, 12.8, INK) - 8
    b.end()

def page_rhythm(b, tzname):
    c = b.c; x0, x1 = b.bounds(); w = x1 - x0; y = b.H - 1.1 * IN
    heading(c, "The eight phases", x0, y); y -= 30
    y = para(c, "Stations fall on the four principal phases; midpoints fall on the four between them.", x0, y, w, "PM-Reg", 8.5, 13.5, INK) - 20
    names = ["New Moon", "Waxing crescent", "First quarter", "Waxing gibbous", "Full Moon", "Waning gibbous", "Last quarter", "Waning crescent"]
    for i, n in enumerate(names):
        col, row = i % 4, i // 4
        cx = x0 + w / 8 + col * w / 4; cy = y - 28 - row * 92
        moon(c, cx, cy, 20, i * 45)
        c.setFillColor(GRAY); c.setFont("PM-Reg", 6.8)
        c.drawCentredString(cx, cy - 34, n.upper())
        c.setFillColor(ACCENT); c.setFont("PM-Reg", 6)
        c.drawCentredString(cx, cy - 44, "STATION" if i % 2 == 0 else "MIDPOINT")
    y -= 210
    para(c, f"Dates and phases are calculated from astronomical positions of the Sun and Moon and shown in the {tzname} time zone. Near midnight, a phase may fall a day earlier or later where you live.",
         x0, y, w, "PM-Reg", 7.5, 12, GRAY)
    b.end()

def page_commands(b, part, cmds):
    c = b.c; x0, x1 = b.bounds()
    half = (len(cmds) + 1) // 2
    items = cmds[:half] if part == 1 else cmds[half:]
    title = f"The {len(cmds)} commands" if len(cmds) < 48 else "The 48 commands"
    heading(c, title + ("" if part == 1 else " (continued)"), x0, b.H - 1.1 * IN)
    y = b.H - 1.1 * IN - 24
    spaced(c, "ONE A WEEK. FILL THE CIRCLE WHEN YOU WRITE.", x0, y, "PM-Reg", 6.5, 1, "l", GRAY); y -= 24
    pitch = min(36, (y - 0.75 * IN) / max(len(items), 1))
    two_line = pitch >= 30
    for cm in items:
        c.setFillColor(GRAY); c.setFont("PM-Reg", 7.5); c.drawString(x0, y, f"{cm['n']:02d}")
        c.setFillColor(INK); c.setFont("CG-Bold", 13 if two_line else 11.5); c.drawString(x0 + 20, y, cm["name"])
        c.setFillColor(GRAY); c.setFont("PM-Reg", 6.5)
        if two_line: c.drawString(x0 + 20, y - 11, cm["ref"] + " (KJV)")
        else: c.drawRightString(x1 - 18, y, cm["ref"])
        c.setStrokeColor(ACCENT); c.setLineWidth(0.7); c.circle(x1 - 5, y + 2.5, 4.5, stroke=1, fill=0)
        hairline(c, x0, x1, y - (19 if two_line else pitch * 0.38)); y -= pitch
    b.end()

def page_calendar(b, lunas, tz):
    c = b.c; x0, x1 = b.bounds()
    heading(c, "The moons, dated", x0, b.H - 1.1 * IN)
    y = b.H - 1.1 * IN - 34
    cols = [0, 36, 128, 208, 288]
    heads = ["MOON", "NEW MOON", "FIRST QTR", "FULL MOON", "LAST QTR"]
    c.setFillColor(GRAY); c.setFont("PM-Reg", 6.5)
    for cx, h in zip(cols, heads): c.drawString(x0 + cx, y, h)
    hairline(c, x0, x1, y - 6, ACCENT, 0.75); y -= 24
    for i, L in enumerate(lunas):
        vals = [roman(i + 1)] + [fmt_day(to_local(L[k], tz)) for k in ("new", "first_q", "full", "last_q")]
        c.setFont("PM-Reg", 7.5); c.setFillColor(INK)
        for cx, val in zip(cols, vals): c.drawString(x0 + cx, y, val)
        y -= 20
    b.end()

def page_opener(b, v, i, L, tz, cmds):
    c = b.c; x0, x1 = b.bounds()
    epi, ref = V.OPENER_EPIGRAPHS[i % len(V.OPENER_EPIGRAPHS)]
    spaced(c, "MOON " + roman(i + 1), b.W / 2, b.H - 0.85 * IN, "PM-Reg", 7.5, 3, "c", GRAY)
    moon(c, b.W / 2, b.H - 1.6 * IN, 36, 0)
    c.setFillColor(ACCENT); c.setFont("CG-Bold", 28); c.drawCentredString(b.W / 2, b.H - 2.65 * IN, "The " + ORDINAL[i] + " Moon")
    n = to_local(L["new"], tz)
    spaced(c, f"BEGINS AT THE NEW MOON · {fmt_full(n).upper()} · {fmt_time(n)}", b.W / 2, b.H - 2.9 * IN, "PM-Reg", 6.8, 0.8, "c", GRAY)
    ew = 270; ex = (b.W - ew) / 2
    y = para(c, "“" + epi + "”", ex, b.H - 3.4 * IN, ew, "CG-Ital", 12.5, 16.5, INK, "c")
    spaced(c, "— " + ref.upper() + " (KJV)", b.W / 2, y - 2, "PM-Reg", 6.8, 1.2, "c", GRAY)
    y -= 28
    spaced(c, "FOUR STATIONS", x0, y, "PM-Reg", 6.8, 1.5, "l", ACCENT); hairline(c, x0, x1, y - 5, ACCENT, 0.75); y -= 17
    for s, (k, label, _) in enumerate(STATIONS):
        c.setFillColor(INK); c.setFont("PM-Reg", 7)
        c.drawString(x0, y, str(s + 1)); c.drawString(x0 + 14, y, fmt_day(to_local(L[k], tz)))
        c.setFillColor(GRAY); c.drawString(x0 + 70, y, label)
        c.setFillColor(INK); c.drawString(x0 + 150, y, cmds[s]["name"]); y -= 13
    y -= 8
    spaced(c, "FOUR MIDPOINTS", x0, y, "PM-Reg", 6.8, 1.5, "l", ACCENT); hairline(c, x0, x1, y - 5, ACCENT, 0.75); y -= 17
    for s, (label, _, _) in enumerate(MIDPOINTS):
        c.setFillColor(INK); c.setFont("PM-Reg", 7); c.drawString(x0 + 14, y, fmt_day(to_local(L["mid"][s], tz)))
        c.setFillColor(GRAY); c.drawString(x0 + 70, y, label)
        c.setFillColor(INK); c.drawString(x0 + 150, y, "What changed"); y -= 13
    y -= 12
    spaced(c, v["opener_line"], x0, y, "PM-Reg", 6.8, 1.5, "l", ACCENT)
    rules(c, x0, x1, y - 4, 0.75 * IN, 19)
    b.end()

def page_review(b, v, i, L, tz, part):
    c = b.c; x0, x1 = b.bounds(); w = x1 - x0
    y = page_header(b, f"MOON {roman(i+1)} · WHAT CHANGED" + (" · CONTINUED" if part else ""), "")
    bottom = 0.72 * IN
    panel = (y - bottom) / 2
    for j in range(2):
        k = part * 2 + j
        label, since, theta = MIDPOINTS[k]
        top = y - j * panel - 22
        if j: hairline(c, x0, x1, y - j * panel + 4, ACCENT, 0.75)
        moon(c, x0 + 7, top + 4, 7, theta)
        c.setFillColor(INK); c.setFont("CG-Bold", 16); c.drawString(x0 + 22, top, label)
        spaced(c, fmt_day(to_local(L["mid"][k], tz)).upper(), x1, top + 2, "PM-Reg", 6.8, 1.2, "r", GRAY)
        spaced(c, "SINCE THE " + since.upper(), x0 + 22, top - 13, "PM-Reg", 6, 1.3, "l", GRAY)
        yy = para(c, f"What has changed since the {since}, in you or around you? Write what has shifted, even if it is small.",
                  x0, top - 34, w, "PM-Reg", 8, 12.5, INK)
        q2_top = top - panel * 0.55
        rules(c, x0, x1, yy + 4, q2_top + 16, 19)
        yy = para(c, v["midpoint_q"], x0, q2_top, w, "PM-Reg", 8, 12.5, INK)
        rules(c, x0, x1, yy + 4, y - (j + 1) * panel + 14, 19)
    b.end()

def fit_kjv(text, width):
    for size in (13.5, 12.5, 11.5, 10.5):
        lines = wrap("“" + text + "”", "CG-Ital", size, width)
        if len(lines) <= 6: return size
    return 10.5

def page_station_left(b, v, i, s, L, tz, cm, prompt, mode, ncmd):
    c = b.c; x0, x1 = b.bounds(); w = x1 - x0
    key, label, theta = STATIONS[s]
    t = to_local(L[key], tz)
    y = page_header(b, f"MOON {roman(i+1)} · STATION {s+1} OF 4", f"{fmt_day(t)} · {label}".upper(), theta) - 26
    spaced(c, f"COMMAND {cm['n']:02d} OF 48", x0, y, "PM-Reg", 6.8, 1.5, "l", ACCENT); y -= 28
    size = 27
    while pdfmetrics.stringWidth(cm["name"], "CG-Bold", size) > w and size > 20: size -= 1
    for ln in wrap(cm["name"], "CG-Bold", size, w):
        c.setFillColor(ACCENT); c.setFont("CG-Bold", size); c.drawString(x0, y, ln); y -= size + 2
    y += size + 2 - 24
    ks = fit_kjv(cm["kjv"], w)
    y = para(c, "“" + cm["kjv"] + "”", x0, y, w, "CG-Ital", ks, ks * 1.3, INK)
    spaced(c, "— " + cm["ref"].upper() + " (KJV)", x0, y - 1, "PM-Reg", 6.8, 1.2, "l", GRAY)
    y -= 20
    c.setStrokeColor(ACCENT); c.setLineWidth(1); c.line(x0, y, x0 + 26, y); y -= 20
    bottom = 0.72 * IN
    if mode == "deep":
        y = para(c, prompt["deep"], x0, y, w, "PM-Reg", 8.5, 13.5, INK)
        rules(c, x0, x1, y - 2, bottom, 20)
    else:
        step = (y - bottom) / 7.0
        for k, line in enumerate(prompt["daily"]):
            yy = y - k * step
            d = t + dt.timedelta(days=k)
            c.setFillColor(ACCENT); c.setFont("PM-Med", 6.8); c.drawString(x0, yy, d.strftime("%a ").upper() + str(d.day))
            para(c, line, x0 + 34, yy, w - 34, "PM-Reg", 7.8, 11, INK)
            hairline(c, x0, x1, yy - step + 12)
    b.end()

def page_station_right(b, i, s, L, tz, cm):
    key, label, theta = STATIONS[s]
    c = b.c; x0, x1 = b.bounds()
    y = page_header(b, f"{cm['n']:02d} · {cm['name'].upper()}", fmt_day(to_local(L[key], tz)).upper(), theta)
    rules(c, x0, x1, y, 0.72 * IN, 20)
    b.end()

def page_fullmoon(b, v, i, L, tz):
    c = b.c; x0, x1 = b.bounds(); w = x1 - x0
    t = to_local(L["full"], tz)
    top = page_header(b, f"MOON {roman(i+1)} · FULL MOON REFLECTION", fmt_day(t).upper() + " · " + fmt_time(t)) + 8
    moon(c, b.W / 2, top - 62, 28, 180)
    c.setFillColor(ACCENT); c.setFont("CG-Bold", 26); c.drawCentredString(b.W / 2, top - 122, "Full Moon")
    y = top - 148
    bottom = 0.72 * IN
    block = (y - bottom) / 3.0
    for k, p in enumerate(v["fullmoon_qs"]):
        yy = y - k * block
        yy2 = para(c, p, x0, yy, w, "PM-Reg", 8.5, 13.5, INK)
        rules(c, x0, x1, yy2 - 2, yy - block + 8, 19)
    b.end()

def page_letter(b, v, i, L, tz):
    c = b.c; x0, x1 = b.bounds()
    e = to_local(L["end"], tz)
    top = page_header(b, f"MOON {roman(i+1)} · CLOSING LETTER", "NEXT NEW MOON · " + fmt_day(e).upper()) + 8
    c.setFillColor(ACCENT); c.setFont("CG-Ital", 22); c.drawString(x0, top - 48, v["salutation"])
    rules(c, x0, x1, top - 58, 1.0 * IN, 20)
    c.setFillColor(GRAY); c.setFont("CG-Ital", 13); c.drawString(x0, 0.72 * IN, "Yours,")
    b.end()

def page_answered(b):
    c = b.c; x0, x1 = b.bounds(); top = b.H - 0.9 * IN
    heading(c, "Answered prayers", x0, top)
    y = top - 26; cols = [0, 62, 190]
    c.setFillColor(GRAY); c.setFont("PM-Reg", 6.5)
    for cx, h in zip(cols, ["DATE", "THE PRAYER", "HOW IT WAS ANSWERED"]): c.drawString(x0 + cx, y, h)
    hairline(c, x0, x1, y - 6, ACCENT, 0.75)
    ytop = y - 6; yb = 0.72 * IN; yy = ytop
    while yy - 30 >= yb - 0.01:
        yy -= 30; hairline(c, x0, x1, yy)
    for cx in cols[1:]:
        c.setStrokeColor(RULE); c.setLineWidth(0.5); c.line(x0 + cx - 6, ytop, x0 + cx - 6, yy)
    b.end()

def page_notes(b):
    c = b.c; x0, x1 = b.bounds(); top = b.H - 0.62 * IN
    spaced(c, "NOTES", x0, top, "PM-Reg", 6.8, 1.5, "l", GRAY); hairline(c, x0, x1, top - 8)
    rules(c, x0, x1, top - 8, 0.72 * IN, 20); b.end()

def build_interior(path, v, months, start, mode, tzname, name):
    tz = ZoneInfo(tzname)
    lunas = build_lunations(start, months)
    ncmd = months * 4
    cmds = COMMANDS[:ncmd]
    P = V.prompts(v["key"])
    missing = [cm["n"] for cm in cmds if cm["n"] not in P]
    if missing:
        raise SystemExit(f"{v['title']}: prompts are not written yet for command(s) {missing}. Add them to prompts_{v['key']}.py.")
    b = Book(path, f"{v['title']}, Volume {v['roman']}")
    page_half_title(b, v); page_belongs(b, name, start); page_title(b, v); page_copyright(b, v, tzname, mode, months)
    page_epigraph(b, v); page_how(b, v, months, mode, ncmd); page_rhythm(b, tzname)
    page_commands(b, 1, cmds); page_commands(b, 2, cmds); page_calendar(b, lunas, tz)
    assert b.pg - 1 == FRONT, b.pg - 1
    for i, L in enumerate(lunas):
        assert b.pg % 2 == 1                                  # openers land on recto pages
        mc = cmds[i * 4:(i + 1) * 4]
        page_opener(b, v, i, L, tz, mc)
        page_review(b, v, i, L, tz, 0); page_review(b, v, i, L, tz, 1)
        for s in range(4):
            assert b.pg % 2 == 0                              # station spreads open on a verso
            page_station_left(b, v, i, s, L, tz, mc[s], P[mc[s]["n"]], mode, ncmd)
            if s == 2: page_fullmoon(b, v, i, L, tz)
            else: page_station_right(b, i, s, L, tz, mc[s])
        page_letter(b, v, i, L, tz)
    target = TARGET_PAGES[months]
    back = target - (b.pg - 1)
    assert back >= 0, (target, b.pg - 1)
    for k in range(back):
        (page_answered if v["answered"] and k < 4 else page_notes)(b)
    b.c.save()
    return target, lunas

# ---------- cover ----------
def build_cover(path, v, pages, months, guides=False):
    sp = spine_in(pages) * IN
    TW, TH = 2 * TRIM_W + sp + 2 * WRAP, TRIM_H + 2 * WRAP
    c = canvas.Canvas(path, pagesize=(TW, TH), initialFontName="PM-Reg", initialFontSize=8); c.setTitle(v["title"] + " - cover"); c.setAuthor("JP Bobo")
    c.setFillColor(ACCENT); c.rect(0, 0, TW, TH, stroke=0, fill=1)
    bx0 = WRAP; sx0 = WRAP + TRIM_W; fx0 = sx0 + sp
    top = WRAP + TRIM_H; base = WRAP
    # ---- front ----
    fcx = fx0 + TRIM_W / 2
    for k in range(8):
        moon(c, fcx + (k - 3.5) * 30, top - 1.05 * IN, 9, k * 45, dark=ACCENT, light=CREAM, ring=GOLD)
    l1, l2 = v["lines"]
    spaced(c, l1, fcx, base + TRIM_H * 0.52, "CG-Bold", 54, 6, "c", CREAM)
    size = 54
    while spaced_width(l2, "CG-Bold", size, 6) > TRIM_W - 1.1 * IN: size -= 1
    spaced(c, l2, fcx, base + TRIM_H * 0.52 - 58, "CG-Bold", size, 6, "c", CREAM)
    c.setStrokeColor(GOLD); c.setLineWidth(1); c.line(fcx - 40, base + TRIM_H * 0.52 - 84, fcx + 40, base + TRIM_H * 0.52 - 84)
    c.setFillColor(GOLD); c.setFont("CG-Ital", 16); c.drawCentredString(fcx, base + TRIM_H * 0.52 - 110, v["subtitle"])
    spaced(c, "NO PARADE", fcx, base + 0.95 * IN, "PM-Med", 10, 4, "c", CREAM)
    spaced(c, "VOLUME " + v["roman"], fcx, base + 0.95 * IN - 16, "PM-Reg", 7, 3, "c", GOLD)
    # ---- spine (reads top to bottom); type scales with spine width so thin books stay inside it ----
    scx = sx0 + sp / 2
    tsize = min(20, sp * 0.62)
    c.saveState(); c.translate(scx, base + TRIM_H / 2); c.rotate(-90)
    spaced(c, v["title"].upper(), -TRIM_H / 2 + 1.35 * IN, -tsize * 0.3, "CG-Bold", tsize, 3 * tsize / 20, "l", CREAM)
    asize = min(8.5, sp * 0.45)
    spaced(c, "NO PARADE", TRIM_H / 2 - 0.9 * IN, -asize * 0.35, "PM-Med", asize, 3 * asize / 8.5, "r", GOLD)
    c.restoreState()
    moon(c, scx, base + TRIM_H - 0.75 * IN, min(sp * 0.22, 9), 0, dark=ACCENT, light=CREAM, ring=GOLD)
    # ---- back ----
    x = bx0 + 0.75 * IN; w = TRIM_W - 1.5 * IN
    y = top - 1.15 * IN
    c.setFillColor(CREAM); c.setFont("CG-Bold", 21)
    for ln in wrap(v["back_head"], "CG-Bold", 21, w): c.drawString(x, y, ln); y -= 25
    y -= 8
    ncmd = months * 4
    count = ("All 48 commands of Jesus, one a week, each visited once." if ncmd == 48
             else f"The first {ncmd} of the 48 commands of Jesus, one a week.")
    for p in (v["back_body"], f"{months} moons. {count} Dated to the real phases of the moon.", v["back_close"]):
        y = para(c, p, x, y, w, "CG-Reg", 12.5, 17, CREAM) - 9
    c.setStrokeColor(GOLD); c.setLineWidth(0.8); c.line(x, base + 1.05 * IN, x + 26, base + 1.05 * IN)
    spaced(c, f"NO PARADE · {v['title'].upper()} · VOLUME {v['roman']}", x, base + 0.8 * IN, "PM-Reg", 6.5, 1.5, "l", GOLD)
    if guides:
        c.setLineWidth(0.6)
        def box(x0_, y0_, x1_, y1_, col, dash=None):
            c.setStrokeColor(col); c.setDash(*(dash or (1, 0))); c.rect(x0_, y0_, x1_ - x0_, y1_ - y0_, stroke=1, fill=0); c.setDash(1, 0)
        box(0, 0, TW, TH, HexColor("#FF00AA"))                                  # total document
        box(WRAP, WRAP, TW - WRAP, TH - WRAP, HexColor("#00FFFF"))              # trim
        box(WRAP + 0.5 * IN, WRAP + 0.5 * IN, sx0 - 0.5 * IN, TH - WRAP - 0.5 * IN, HexColor("#FFFF00"), (3, 3))   # back safe
        box(fx0 + 0.5 * IN, WRAP + 0.5 * IN, TW - WRAP - 0.5 * IN, TH - WRAP - 0.5 * IN, HexColor("#FFFF00"), (3, 3))  # front safe
        for xx in (sx0, fx0):
            c.setStrokeColor(HexColor("#00FF66")); c.line(xx, 0, xx, TH)         # spine edges
        for xx in (sx0 - 0.25 * IN, fx0 + 0.25 * IN):
            c.setStrokeColor(HexColor("#FF8800")); c.setDash(2, 2); c.line(xx, 0, xx, TH); c.setDash(1, 0)   # hinge
        c.setFillColor(HexColor("#FF00AA")); c.setFont("PM-Reg", 7)
        c.drawString(6, 6, f"PROOF ONLY - DO NOT UPLOAD. pink=total {TW/IN:.3f} x {TH/IN:.3f} in | cyan=trim | yellow=0.5in safe | green=spine {sp/IN:.3f} in | orange=hinge")
    c.showPage(); c.save()
    return TW / IN, TH / IN, sp / IN

def slug(s):
    return re.sub(r"[^A-Za-z0-9]+", "", s or "") or "NoName"

def main():
    global ACCENT
    ap = argparse.ArgumentParser()
    ap.add_argument("--volume", default="god", choices=list(V.VOLUMES))
    ap.add_argument("--months", type=int, default=12, choices=[3, 6, 12])
    ap.add_argument("--start", default=dt.date.today().isoformat())
    ap.add_argument("--mode", default="deep", choices=["deep", "daily"])
    ap.add_argument("--tz", default="America/New_York")
    ap.add_argument("--name", default="", help="printed on the belongs-to page")
    ap.add_argument("--out", default="out")
    a = ap.parse_args()
    v = dict(V.VOLUMES[a.volume], key=a.volume)
    ACCENT = HexColor(v["color"])
    os.makedirs(a.out, exist_ok=True)
    start = dt.date.fromisoformat(a.start)
    tag = f"{slug(v['title'])}_{a.months}mo_{a.mode}_{slug(a.name)}_{a.start}"
    ipath = os.path.join(a.out, f"{tag}_interior.pdf")
    pages, lunas = build_interior(ipath, v, a.months, start, a.mode, a.tz, a.name)
    cpath = os.path.join(a.out, f"{tag}_cover.pdf")
    w, h, sp = build_cover(cpath, v, pages, a.months)
    build_cover(os.path.join(a.out, f"{tag}_cover_GUIDES_proof_only.pdf"), v, pages, a.months, guides=True)
    job = dict(
        volume=f"{v['title']}, Vol. {v['roman']}", name=a.name, pages=pages, months=a.months, mode=a.mode, start_date=a.start, tz=a.tz,
        spine_in=sp, cover_total_in=[round(w, 4), round(h, 4)],
        first_new_moon_utc=ephem.Date(lunas[0]["new"]).datetime().isoformat() + "Z",
        pod_package_id=POD_PACKAGE_ID,
        lulu_product="A5 hardcover casewrap, matte, standard black & white, 60# uncoated white",
        interior_file=os.path.basename(ipath), cover_file=os.path.basename(cpath))
    json.dump(job, open(os.path.join(a.out, f"{tag}_lulu_job.json"), "w"), indent=2)
    print(json.dumps(job, indent=2))

if __name__ == "__main__":
    main()
