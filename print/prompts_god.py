# -*- coding: utf-8 -*-
"""Letters to God (Volume I): one deep prompt and seven daily lines for each of the 48 commands.

21 are carried over word for word from the first generator (matched by command name); 27 were written
for the 48-command edition in the same voice (marked "new"). Review before printing for customers.
"""

PROMPTS = {
 1: dict(  # Repent (v1 generator)
  deep="Name one direction you have been facing that is not toward Him. Write it plainly, the way you would report it to someone who already knows. Then write what turning would look like by Friday: one step small enough to be seen.",
  daily=["Name the direction I was facing this morning.", "What did I choose today that I would not sign my name to?", "Write the turn in one sentence.", "Where is the smallest place I can turn today?", "What am I still defending?", "What did turning cost me, and what did it return?", "Dear God, the thing I am done carrying is..."]),
 2: dict(  # Follow Me (v1 generator)
  deep="Write down what you would have to leave at the shore to follow: a net, a schedule, a version of yourself. Then describe, as a witness would, the first ten minutes after you leave it.",
  daily=["What am I holding that slows my walking?", "Who or what was I following this morning, honestly?", "Where did I hear the call and hesitate?", "What is one net I can set down today?", "What did following look like at the smallest scale today?", "Whose footsteps am I in?", "Dear God, I am coming as far as..."]),
 3: dict(  # Rejoice (v1 generator)
  deep="List three things that happened this week that you did not thank Him for at the time. Write each as a short letter of thanks, dated the day it happened. Notice which one your body remembers first.",
  daily=["One thing that made me glad without reason.", "What did I receive today that I did not earn?", "Where did joy show up sideways today?", "Who made me laugh, and did I say so?", "What small thing is worth a full sentence of thanks?", "What am I rejoicing over that no one else knows about?", "Dear God, the gladness I could not hold back was..."]),
 4: dict(  # Let Your Light Shine (new)
  deep="Write down one good thing you do that almost no one sees, and one you do mostly so it will be seen. Then name one small work this week that could make someone look past you and toward Him. Describe it as it would look from across the room.",
  daily=["Where did I dim myself today to stay comfortable?", "What good did I do that pointed back at me?", "Where did I see something of God in someone today?", "What would it cost me to be seen doing right?", "Where is my light blocked by my need for credit?", "What small work could I do tomorrow without signing it?", "Dear God, let what they see in me today be..."]),
 5: dict(  # Honor God’s Law (new)
  deep="Choose one of the old commands you have quietly treated as optional. Write why you set it aside and what you told yourself at the time. Then write what keeping it this week would require, in plain terms, not in principle.",
  daily=["Which rule did I bend today and call it freedom?", "What did I teach someone today by how I acted?", "Where did I keep the letter and miss the heart?", "What small command did I keep when no one checked?", "Which of His words do I argue with most?", "What would honoring this look like tomorrow?", "Dear God, the command I keep stepping around is..."]),
 6: dict(  # Be Reconciled (v1 generator)
  deep="Is there a gift you are trying to bring while something stands unresolved with someone? Describe the gift, describe the gap, and describe the first sentence you would say to close it. You do not have to send it yet.",
  daily=["Who comes to mind when I am quiet?", "What is unfinished between us?", "What part of this is mine to own?", "What would I say if I went first?", "What am I waiting for them to do?", "One message I could send today.", "Dear God, help me walk toward..."]),
 7: dict(  # Do Not Lust (new)
  deep="Lust is wanting that uses. Write about one place your attention has been taking rather than seeing: a person, an image, a thing you do not have. Be honest and brief. Then write what you will remove, block or walk away from this week, and what you will put in its place.",
  daily=["Where did my eyes go today that my heart followed?", "What was I hungry for underneath the wanting?", "Whom did I reduce to a use today?", "What did I cut off or walk away from?", "When did I see someone whole instead of in pieces?", "What is one door I can close tonight?", "Dear God, keep my eyes on..."]),
 8: dict(  # Keep Your Word (v1 generator)
  deep="Make a list of the promises you made this month, including the small ones (\"I'll call you,\" \"I'll be there\"). Mark which you kept. Choose one you did not, and write to Him what you will do about it.",
  daily=["What did I say yes to today that I meant?", "Where did I say yes and mean no?", "One promise I owe someone.", "What did I say I would do and have not done?", "Where can I say less and mean more?", "Whose trust am I still holding?", "Dear God, let my yes be..."]),
 9: dict(  # Go the Second Mile (new)
  deep="Recall a time this month when someone asked more of you than was fair. Write what you gave, what you held back, and what you felt. Then choose one demand this week you will meet twice over, freely, and write how you will do it without keeping score.",
  daily=["Who took from me today, and what did I want back?", "Where did I resist when I could have yielded?", "What did I give beyond what was asked?", "What score am I still keeping?", "Whose request did I treat as an interruption?", "What would the second mile look like tomorrow?", "Dear God, help me give the cloak also when..."]),
 10: dict(  # Love Your Enemies (v1 generator)
  deep="Write the name of the person you would least like to pray for. Describe what they did in three plain sentences, no adjectives. Then write one sentence of blessing over them, even if it costs you something to write it.",
  daily=["Who is hardest to think about kindly?", "What do I imagine they are afraid of?", "One sentence of blessing for them.", "What would I lose by letting this go?", "What have I been rehearsing that I can stop rehearsing?", "One quiet good I can do for them.", "Dear God, what You see in them that I cannot is..."]),
 11: dict(  # Be Perfect (v1 generator)
  deep="Perfect here means whole, finished, complete. Where in your life is something started and never brought to completion: a conversation, a project, a repair? Write what finished would look like, and what you would need from Him to finish it.",
  daily=["What is half-done in my life?", "Where am I whole today?", "Where am I divided against myself?", "What one thing can I finish today?", "What am I calling \"good enough\" that is not?", "Where did wholeness show up today?", "Dear God, make whole in me..."]),
 12: dict(  # Practice Secret Disciplines (v1 generator)
  deep="Describe your closet: the actual place, the actual time. If you do not have one, design it here in detail. Then write what you would say to Him there that you have never said with anyone listening.",
  daily=["Where did I pray today, and was anyone watching?", "What did I do today only for Him?", "What do I do for the audience that I could do in secret?", "What would I say if no one could ever read it?", "Ten quiet minutes: what did they hold?", "What did I hide that I could have brought to Him?", "Dear God, what I have never said aloud is..."]),
 13: dict(  # Lay Up Treasures in Heaven (v1 generator)
  deep="Look at where your money, time, and attention went this week. Write it as an inventory. Circle what will still exist in ten years. Write to Him about the gap between the two columns.",
  daily=["What did I spend today that will not last?", "What did I give today that will?", "What am I storing up out of fear?", "One hour I spent well, one I did not.", "What would I keep if everything else rusted?", "Who benefited from something I did today?", "Dear God, I want to invest in..."]),
 14: dict(  # Seek God’s Kingdom (v1 generator)
  deep="Write out your list of worries in the order they occupy you. Now rewrite it with His kingdom at the top. What changes about the order of the list, and what changes about the order of your day?",
  daily=["What did I put first this morning?", "What am I anxious about, in one line?", "What does \"first\" look like on today's calendar?", "Where did I see the kingdom at work today?", "What do I want that I have not asked Him for?", "What was added that I did not chase?", "Dear God, the first thing I hand You is..."]),
 15: dict(  # Judge Not (v1 generator)
  deep="Recall the last verdict you passed on someone, out loud or silently. Write the verdict, then write what you did not know about them when you passed it. Ask Him to show you the whole of the person.",
  daily=["Who did I sum up too quickly today?", "What did I assume and not check?", "Where did I judge myself the same way?", "What do I not know about them?", "One person I can look at again.", "What verdict am I ready to withdraw?", "Dear God, give me Your eyes for..."]),
 16: dict(  # Do Not Throw Pearls to Pigs (new)
  deep="Some of what is holy to you has been handed to people or places that trampled it. Write about one such time without blaming yourself or them. Then name what you will keep close this season, and who has earned the right to hear it.",
  daily=["What did I share today that I wish I had kept?", "Where did I keep something holy safe?", "Who handles my tender things with care?", "What conversation should I stop having?", "Where did I argue when I should have been quiet?", "What deserves my best attention tomorrow?", "Dear God, the treasure I am learning to guard is..."]),
 17: dict(  # Ask, Seek, Knock (v1 generator)
  deep="Write three requests in three registers. One you are asking, plainly. One you are seeking, still searching for the shape of. One you are knocking on, a door you can see and cannot open. Leave space after each for the answer.",
  daily=["What am I asking for today?", "What am I still looking for?", "Which door have I stopped knocking on?", "What did I receive that I forgot I asked for?", "Where did a door open?", "What is the request under the request?", "Dear God, I am asking..."]),
 18: dict(  # Do Unto Others (v1 generator)
  deep="Write what you most want from people right now: patience, honesty, a call, room. Then write who in your life is waiting for exactly that from you, and what you will do about it this week.",
  daily=["What did I want from someone today?", "Did I give it to anyone?", "Who needed patience from me?", "What would I want if I were them?", "One thing I did for someone that I would want done for me.", "Where did I fall short of this?", "Dear God, make me the kind of neighbor..."]),
 19: dict(  # Choose the Narrow Way (new)
  deep="Name one decision in front of you where the wide road is easy and well travelled. Describe both paths plainly: where each leads by the end of the year. Then write the first narrow step, the one you can take before Friday.",
  daily=["Where did I follow the crowd today?", "What easy yes did I give that I regret?", "Where did I choose the harder right thing?", "What is the gate I keep walking past?", "Who walks the narrow way beside me?", "What will I refuse tomorrow, gently?", "Dear God, the narrow step in front of me is..."]),
 20: dict(  # Beware of False Prophets (new)
  deep="Think of a voice you have trusted that promised much and bore little fruit: a teacher, a feed, a habit of mind. Write what it told you and what it produced in you. Then write how you will test the voices you listen to this week.",
  daily=["Whose voice shaped my mood today?", "What promise sounded too good this week?", "What good fruit did I see in someone I trust?", "Where was I told only what I wanted to hear?", "What did I believe today without testing it?", "Which voice will I turn down tomorrow?", "Dear God, teach me to hear the difference between..."]),
 21: dict(  # Pray for Laborers (new)
  deep="Look at the harvest around you: the people who need care, truth or help that no one is bringing. Write the names or places that come to mind. Then pray, on the page, for the people who will be sent, and ask plainly whether one of them is you.",
  daily=["Where did I see a need today that no one met?", "Who is working hard and unseen near me?", "Whom can I pray for by name tonight?", "What work is waiting that I keep avoiding?", "Who carried more than their share today?", "What field am I standing in without noticing?", "Dear God, send help to..."]),
 22: dict(  # Be Wise as Serpents (new)
  deep="Describe a situation where you are among people or systems that do not wish you well. Write what wisdom would look like there: what to watch, what to say, what not to say. Then write what harmlessness would look like: where you will refuse to wound, even when you could.",
  daily=["Where was I naive today?", "Where was I sharp when I needed to be gentle?", "What did I notice before it could hurt me?", "Whom did I refuse to wound when I could have?", "What am I walking into tomorrow with open eyes?", "Where is innocence still possible for me?", "Dear God, give me wisdom for..."]),
 23: dict(  # Fear Not (v1 generator)
  deep="Write the fear in its smallest, most specific form: not \"the future\" but the exact thing you picture. Read it back. Then write what you know about Him that the fear does not account for.",
  daily=["What was I afraid of today?", "What is the worst version, in one sentence?", "What is the most likely version?", "Where did my body hold the fear?", "What did I do anyway?", "What do I know about Him that the fear leaves out?", "Dear God, I am afraid of..."]),
 24: dict(  # Hear God’s Voice (new)
  deep="Sit for five minutes before you write, without a phone, music or plan. Then write down everything you heard: outside, inside, and anything that felt addressed to you. End with one sentence you think God may have been saying this week, and what you will do about it.",
  daily=["What did I hear today that I almost ignored?", "When did I stop long enough to listen?", "What noise could I turn off tomorrow?", "What keeps repeating in my life lately?", "Whose voice did I hear God through today?", "What did the silence tell me?", "Dear God, I am listening for..."]),
 25: dict(  # Take My Yoke (v1 generator)
  deep="A yoke is a shared load. Describe what you are pulling right now, alone. Then describe what it would mean to let Him take the other side of it. What would you set down first?",
  daily=["What am I carrying alone?", "Where did I feel tired in my soul today?", "What would rest look like this evening?", "What did I try to force today?", "Where was I gentle, and where was I not?", "What am I learning slowly?", "Dear God, take the other side of..."]),
 26: dict(  # Honor Your Parents (v1 generator)
  deep="Write a letter to a parent, or to whoever raised you, that you may never send. Begin with something they got right. Tell Him what you inherited from them, the gift and the weight, and ask Him to sort which is which.",
  daily=["One thing my mother or father did well.", "What did I inherit that I am grateful for?", "What do I carry that was never mine to carry?", "When did I last thank them, in words?", "What do I understand about them now that I did not then?", "Who raised me in the ways that mattered?", "Dear God, bless them in..."]),
 27: dict(  # Beware of Leaven (new)
  deep="Leaven is small and it spreads. Name one small attitude you have picked up from the people or places around you: a cynicism, a pride, a habit of performing. Trace where it came from and where it has spread in you. Then write how you will keep it out of the week ahead.",
  daily=["What small thing changed my mood for the whole day?", "Whose attitude did I catch today?", "Where did I perform instead of pray?", "What rose in me today that I did not choose?", "What conversation left me worse than it found me?", "What will I keep out of tomorrow?", "Dear God, remove from me the small thing that..."]),
 28: dict(  # Deny Yourself (v1 generator)
  deep="Write down the self you defend most: the reputation, the role, the story you tell about yourself. What would it mean to lay it down for a day? Describe the day.",
  daily=["What did I defend today that was not worth defending?", "Where did I need to be right?", "What did I want that I could lay down?", "What is my cross today, in plain terms?", "Where did I choose the harder good?", "Who benefited when I stepped back?", "Dear God, I set down..."]),
 29: dict(  # Do Not Despise Little Ones (new)
  deep="Think of someone you overlook: a child, someone new, someone who cannot repay you or does not impress you. Write what you know about them and what you have assumed. Then write one way you will honor them this week, as if their angel were watching.",
  daily=["Whom did I overlook today?", "Who is small in my eyes, and why?", "When did a child or someone new teach me something?", "Where was I impatient with someone weaker?", "Whose face will I look into tomorrow?", "What does it mean that heaven watches over them?", "Dear God, open my eyes to..."]),
 30: dict(  # Go to Offenders (new)
  deep="Name someone who has wronged you and whom you have talked about more than talked to. Write what happened in three sentences, as fairly as you can. Then write what you would say to them alone, and decide whether this is the week to say it.",
  daily=["Whom did I talk about today instead of talk to?", "What hurt am I still rehearsing?", "What would I say if we were alone?", "Where did I avoid a conversation I owe?", "What part of this is mine?", "What is the kindest honest sentence I could say?", "Dear God, give me courage to go to..."]),
 31: dict(  # Beware of Covetousness (new)
  deep="List three things you have wanted this month that you do not have. Beside each, write what you believe having it would give you. Then write what your life actually consists of this week: the things no purchase could add or take away.",
  daily=["What did I want today that I did not need?", "Whose life did I compare mine to?", "What did I buy, or plan to buy, to feel better?", "What do I already have that I forgot to see?", "When did enough feel like enough today?", "What will I not reach for tomorrow?", "Dear God, my life consists of..."]),
 32: dict(  # Forgive Offenders (v1 generator)
  deep="Write the offense in one paragraph, exactly as it happened. Then write the sentence \"I forgive you for...\" and finish it with the specific thing. If you cannot yet, write that instead, and ask Him for the strength to.",
  daily=["What am I holding against someone?", "How old is this grudge?", "What has it been costing me?", "What would forgiving look like in action?", "Where do I need forgiving, too?", "Can I say it, even to the empty room?", "Dear God, I release..."]),
 33: dict(  # Honor Marriage (new)
  deep="Write about a covenant in your life: your marriage, the marriage you came from, or one you hope for. Describe what holds it together and what has pulled at it. Then write one act of faithfulness you will choose this week, small enough to actually do.",
  daily=["What did I do today that honored a promise?", "Where did I let something come between us?", "What do I need to say that I have not said?", "Whose marriage has taught me faithfulness?", "Where did I choose us over me today?", "What kindness can I plan for tomorrow?", "Dear God, guard the covenant of..."]),
 34: dict(  # Be a Servant (new)
  deep="Write down the place where you most want to be great: at work, at home, in a room you walk into. Then describe what serving there would look like instead, task by task. Choose one of those tasks for this week, preferably one no one will thank you for.",
  daily=["Where did I want to be first today?", "Whom did I serve without being asked?", "What task did I consider beneath me?", "Who served me today, and did I notice?", "Where did I lead by going lower?", "What can I do tomorrow for someone who cannot return it?", "Dear God, make me a servant in..."]),
 35: dict(  # Be a House of Prayer (new)
  deep="Picture your days as a house. Write which rooms are given to prayer and which have been turned into markets: selling, scrolling, bargaining. Then choose one time and one place this week that will be kept for prayer only, and write what you will do there.",
  daily=["When did I pray today, and where?", "What crowded out prayer this morning?", "Where have I made a market of something holy?", "What would a cleared room in my day look like?", "Whom did I pray with, or for?", "What will I clear out tomorrow to make room?", "Dear God, make this house..."]),
 36: dict(  # Ask in Faith (new)
  deep="Write one request you have stopped asking because you stopped expecting an answer. Write it plainly, the way you first asked it. Then write what you honestly believe about it now, and ask again, on the page, believing as much as you can today.",
  daily=["What did I ask for today, and did I expect it?", "Where did doubt get the last word?", "What mountain am I standing in front of?", "What prayer was answered that I forgot to notice?", "When did I act as if God would come through?", "What will I ask for tomorrow, boldly?", "Dear God, I am asking again for..."]),
 37: dict(  # Bring in the Poor (new)
  deep="Look at your table: the people you invite, eat with, help and spend time with. Write who is there and who is never there. Then plan one invitation this week to someone who cannot repay you, and write what it will take to make it happen.",
  daily=["Who did I spend time with today, and why them?", "Whom did I help who could not return it?", "Where did I choose comfort over welcome?", "Who has no one to eat with this week?", "What did I receive from someone with little?", "What invitation can I make tomorrow?", "Dear God, set a place at my table for..."]),
 38: dict(  # Render to Caesar (new)
  deep="Write what you owe and to whom: taxes, bills, promises, time, respect. Be specific. Then write what bears God's image and belongs only to Him: your attention, your worship, yourself. Where have the two been confused this month?",
  daily=["What did I pay today, and what did I hold back?", "Where did I give the world what belongs to God?", "What debt am I avoiding?", "What bears His image in me?", "Where did I honor authority well today?", "What will I give to God first tomorrow?", "Dear God, what is Yours in me is..."]),
 39: dict(  # Love the Lord (v1 generator)
  deep="Heart, soul, mind: take them one at a time. For each, write one sentence about where it was pointed this week. Where the answer is somewhere else, say where, and say it to Him directly.",
  daily=["Where did my heart go first this morning?", "What did my mind return to all day?", "Where was I most fully present today?", "What competes with Him for the front of my attention?", "One act today that was simply for Him.", "What would loving Him with my mind look like this week?", "Dear God, what I want to give You back is..."]),
 40: dict(  # Love Your Neighbor (new)
  deep="Choose one neighbor, literally the person nearest you at home, at work or on your street. Write what you know about their week and what you do not. Then write how you would want to be treated in their place, and do one piece of that this week.",
  daily=["Who was my neighbor today?", "How did I treat them compared with how I treat myself?", "What need did I notice and walk past?", "Whose name do I not know yet?", "Where did love cost me something today?", "What will I do for my neighbor tomorrow?", "Dear God, teach me to love..."]),
 41: dict(  # Await My Return (new)
  deep="If you knew the hour, what would you finish, mend or stop before it came? Write the list honestly. Then choose one item and write what readiness looks like this week: not panic, but the steady way of someone expecting a guest.",
  daily=["What did I leave undone today that matters?", "Where was I asleep to what is coming?", "What would I want to be found doing?", "What am I putting off because I think there is time?", "When did I live today like someone expecting Him?", "What will I make ready tomorrow?", "Dear God, find me ready in..."]),
 42: dict(  # Celebrate the Lord’s Supper (new)
  deep="Remember the last time you took the bread and the cup, or the last time a meal felt holy. Write what you remember: the people, the words, what you felt. Then write how you will come to the table this week, and what you want to remember when you do.",
  daily=["What did I receive today that I did not earn?", "Where did I remember Him today?", "What meal today can I give thanks for?", "What broken thing was offered to me?", "Whom do I need to be at peace with before the table?", "How will I come to the table next?", "Dear God, as I remember You..."]),
 43: dict(  # Watch and Pray (v1 generator)
  deep="Watch means notice. Write the pattern you have seen in yourself: the time of day, the mood, the place where you lose ground. Then write your watch for the week, and the prayer you will say when you see it coming.",
  daily=["When did I feel most tempted today?", "What was going on just before?", "Where was the flesh weak, where was the spirit willing?", "What would a watchman have noticed about my day?", "What did I do at the point of choosing?", "What is my prayer for the hour I struggle most?", "Dear God, keep watch with me over..."]),
 44: dict(  # Feed My Sheep (new)
  deep="Jesus asked Peter three times whether he loved Him, and each time gave him someone to care for. Write your answer to the question as honestly as Peter did. Then name the people in your care right now, and one way you will feed them this week.",
  daily=["Who depends on me right now?", "Did I love Him today by caring for them?", "Whom did I feed, in any sense, today?", "Where did I neglect someone in my care?", "Who has fed me lately?", "What will I bring to someone tomorrow?", "Dear God, You know that I love You, so..."]),
 45: dict(  # Baptize My Disciples (new)
  deep="Write about your own beginning in faith, or the beginning you are still waiting for: where, when, with whom, what it meant. Then write about one person whose first step you could support, and what that would look like in practice.",
  daily=["What did my faith begin with?", "Where did I see someone take a first step?", "What would it mean to be marked as His today?", "Whom could I encourage toward a beginning?", "What did I let be washed away today?", "What does belonging to Him change tomorrow?", "Dear God, I belong to You, and so..."]),
 46: dict(  # Teach Them to Obey My Commands (new)
  deep="Of the commands you have written with in this book so far, which one have you actually lived? Write about it the way a teacher would: what it asked, what it cost, what it changed. Then write whom you could pass it on to, and how.",
  daily=["Which command did I keep today?", "What did I teach today without speaking?", "Whom am I learning from, and do they know it?", "Where did I know the right thing and not do it?", "What would I tell a new believer about this week?", "Whom will I walk alongside tomorrow?", "Dear God, You are with me always, even..."]),
 47: dict(  # Receive God’s Power (v1 generator)
  deep="Tarrying is waiting on purpose. Where are you rushing ahead of power you have not yet received? Describe the waiting you are being asked to do, and what you will do with your hands while you wait.",
  daily=["Where did I run ahead today?", "What am I waiting for?", "Where did I feel strength that was not mine?", "What did I try in my own power?", "What would it mean to receive instead of produce?", "How did I wait well, or badly?", "Dear God, I am waiting for..."]),
 48: dict(  # Make Disciples (new)
  deep="Look back at the people you have walked with this year. Write the names of those who are closer to Christ because you were in their life, and the names of those who brought you closer. Then write the next person you are called to walk with, and the first step.",
  daily=["Who is following Jesus a little closer because of me?", "Who did that for me?", "What did I share of my faith today?", "Where was I afraid to say His name?", "Who is ready for an invitation?", "What will I say or do tomorrow?", "Dear God, send me to..."]),
}
