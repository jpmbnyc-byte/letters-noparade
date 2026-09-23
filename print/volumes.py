# -*- coding: utf-8 -*-
"""The three volumes: titles, colours, cover copy and the fixed questions each one asks.

Cover titles, subtitles and back copy match the covers shown on the store. Prompts live in
prompts_<volume>.py, keyed by command number (1-48).
"""
import importlib

OPENER_EPIGRAPHS = [   # one Psalm opens each moon (KJV), shared by all three volumes
 ("Search me, O God, and know my heart: try me, and know my thoughts:", "Psalm 139:23"),
 ("Be still, and know that I am God:", "Psalm 46:10"),
 ("Let the words of my mouth, and the meditation of my heart, be acceptable in thy sight, O LORD, my strength, and my redeemer.", "Psalm 19:14"),
 ("As the hart panteth after the water brooks, so panteth my soul after thee, O God.", "Psalm 42:1"),
 ("I will lift up mine eyes unto the hills, from whence cometh my help. My help cometh from the LORD, which made heaven and earth.", "Psalm 121:1-2"),
 ("One thing have I desired of the LORD, that will I seek after; that I may dwell in the house of the LORD all the days of my life, to behold the beauty of the LORD, and to enquire in his temple.", "Psalm 27:4"),
 ("The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.", "Psalm 34:18"),
 ("As far as the east is from the west, so far hath he removed our transgressions from us.", "Psalm 103:12"),
 ("My soul waiteth for the Lord more than they that watch for the morning: I say, more than they that watch for the morning.", "Psalm 130:6"),
 ("O God, thou art my God; early will I seek thee: my soul thirsteth for thee, my flesh longeth for thee in a dry and thirsty land, where no water is;", "Psalm 63:1"),
 ("When I consider thy heavens, the work of thy fingers, the moon and the stars, which thou hast ordained; What is man, that thou art mindful of him?", "Psalm 8:3-4"),
 ("He appointed the moon for seasons: the sun knoweth his going down.", "Psalm 104:19"),
]

VOLUMES = {
 "god": dict(
  title="Letters to God", lines=("LETTERS", "TO GOD"), roman="I", color="#2C3E50",
  subtitle="A prayer journal in lunar months",
  front_epigraph=("Trust in him at all times; ye people, pour out your heart before him: God is a refuge for us.", "Psalm 62:8"),
  lens="Write to God the way you would write to someone who already knows.",
  back_head="A prayer journal for the long conversation.",
  back_body="Each lunar month holds four stations, one at every turning of the moon, and four midpoints that ask what has changed. Each station opens with one command of Jesus, in the King James words, and leaves the rest of the page to you. Write to God the way you would write to someone who already knows.",
  back_close="No streaks. No scores. The page, the moon, and the One who reads what you write.",
  midpoint_q="Where has God felt near since then, and where has He seemed far?",
  fullmoon_qs=["What was hidden at the New Moon that I can see now?",
               "Where did I pray and feel heard? Where did I pray and feel nothing?",
               "What do I carry into the waning half?"],
  opener_line="THIS MOON I BRING TO GOD", salutation="Dear God,", answered=True),
 "future": dict(
  title="Letters to Future Me", lines=("LETTERS", "TO FUTURE ME"), roman="II", color="#1B4D4D",
  subtitle="A prayer journal written forward in time",
  front_epigraph=("For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.", "Jeremiah 29:11"),
  lens="Every station is a letter to the person you are becoming: dated, and readable a year from now.",
  back_head="A prayer journal written forward in time.",
  back_body="Each lunar month holds four stations, one at every turning of the moon, and four midpoints that ask what has changed. Each station opens with one command of Jesus, in the King James words, and asks you to write to the person you are becoming.",
  back_close="Sealed at every New Moon, and readable a year from now.",
  midpoint_q="What would the person you are becoming want you to notice from these days?",
  fullmoon_qs=["What did I not yet know at the New Moon?",
               "What am I keeping that my future self will thank me for, and what will they wish I had let go?",
               "What do I carry into the waning half?"],
  opener_line="THIS MOON I WRITE TOWARD", salutation="Dear Future Me,", answered=False),
 "body": dict(
  title="Letters to My Body", lines=("LETTERS", "TO MY BODY"), roman="III", color="#8B4513",
  subtitle="A prayer journal for the body that carries you",
  front_epigraph=("I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well.", "Psalm 139:14"),
  lens="Begin in the body: the breath, the jaw, the hands, the gut. Then write what it tells you.",
  back_head="A prayer journal for the body that carries you.",
  back_body="Each lunar month holds four stations, one at every turning of the moon, and four midpoints that ask what has changed. Each station opens with one command of Jesus, in the King James words, and asks the body to speak first: the breath, the jaw, the hands, the gut.",
  back_close="Small practices, no performance. The page, the moon, and the body that has been listening all along.",
  midpoint_q="Where has your body eased since then, and where has it braced?",
  fullmoon_qs=["What did my body know at the New Moon that I can name now?",
               "Where did I breathe easier this moon? Where did I hold my breath?",
               "What does my body carry into the waning half?"],
  opener_line="THIS MOON MY BODY IS CARRYING", salutation="Dear Body,", answered=False),
}

def prompts(key):
    return importlib.import_module("prompts_" + key).PROMPTS
