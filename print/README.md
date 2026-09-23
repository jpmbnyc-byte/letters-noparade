# Print files for Lulu

Makes the two PDFs Lulu needs for one order: the **interior** and the **cover** (full wrap with spine).

```bash
cd print
pip install -r requirements.txt
python build.py --volume god --months 12 --mode deep \
  --name "Marielle" --start 2026-09-20 --tz America/New_York --out out/
```

| Option | Values |
|---|---|
| `--volume` | `god` (Letters to God), `future` (Letters to Future Me), `body` (Letters to My Body) |
| `--months` | `3`, `6`, `12` → 56, 100, 172 pages |
| `--mode` | `deep` (one prompt a week) or `daily` (seven dated lines a week) |
| `--name` | printed on the belongs-to page |
| `--start` | the customer's start date; the book opens at the first New Moon on or after it |
| `--tz` | the customer's time zone (the same list the store offers) |

Output in `out/`: `…_interior.pdf`, `…_cover.pdf` (upload these two), `…_cover_GUIDES_proof_only.pdf`
(trim, spine and safe-area lines, for checking only, **never upload**), and `…_lulu_job.json`.

## Lulu product
A5 · Hardcover Casewrap · **Matte** · **Standard Black & White** · **60# White (uncoated)**
= `0583X0827BWSTDCW060UW444MXX`. Lulu list price: $12.08 / $13.18 / $14.98 for 56 / 100 / 172 pages, plus shipping.
The interior's navy/teal/rust accents print as greys; the cover prints in full colour.

On lulu.com (manual orders): Create → Print Book → choose the options above → upload the interior and cover PDFs.

## What each moon contains (12 pages)
Opener with a Psalm (recto) · "What changed" review spread (four dated midpoints) · four station spreads
(command + prompt on the left, ruled page on the right; the Full Moon station's right page is the Full Moon reflection) ·
closing letter. Front matter is 10 pages; the rest is answered-prayers and notes pages up to the page count.

## Files
- `build.py`: the generator (evolved from the first Letters to God generator: same fonts, colours, helpers, lunar maths)
- `commands.py`: the 48 commands, names/references as on the store, KJV text from the NewStart Discipleship list
- `volumes.py`: titles, colours, cover copy and the fixed questions for each volume
- `prompts_god.py`: all 48 weeks for Letters to God (21 from the first generator, 27 new; review before selling)
- `prompts_future.py`, `prompts_body.py`: only week 1 so far; the generator refuses editions that need missing weeks
- `fonts/`: Cormorant Garamond and IBM Plex Mono (SIL Open Font License)
