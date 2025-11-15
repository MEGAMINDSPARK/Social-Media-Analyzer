const POSITIVE = ['excited','great','love','happy','amazing','awesome','good','congrats','congratulations'];
const NEGATIVE = ['hate','bad','terrible','awful','disgusting','worst','horrible','annoyed','angry'];
const CTA_WORDS = ['share','comment','like','follow','subscribe','join','try','check','visit','click'];

const FILLER_WORDS = ['um', 'uh', 'maybe', 'kinda', 'sort of'];
const STRONG_OPENERS = ['Introducing', 'Exciting news', 'Big update', 'We’re thrilled', 'New release'];
const COMPLEXITY_THRESHOLD = 22; // average word length for readability check


function countHashtags(text){
	return text.match(/#\w+/g) || [];
}

function containsEmoji(text){
	// improved emoji coverage
	return /[\p{Emoji}]/u.test(text);
}


function checkSentiment(text){
	const t = text.toLowerCase();
	let score = 0;

	POSITIVE.forEach(w => { if (t.includes(w)) score++; });
	NEGATIVE.forEach(w => { if (t.includes(w)) score--; });

	if (score > 0) return 'positive';
	if (score < 0) return 'negative';
	return 'neutral';
}


function checkHashtags(text){
	const tags = countHashtags(text);
	const suggestions = [];

	if (tags.length === 0){
		suggestions.push('Consider adding 2–3 relevant hashtags to expand reach and discoverability.');
	} else if (tags.length < 2){
		suggestions.push('Including an additional hashtag or two may help increase visibility.');
	}

	return suggestions;
}


function checkLength(text){
	const len = text.length;
	const suggestions = [];

	if (len < 40)
		suggestions.push('The message feels brief — adding context or a key detail may enhance clarity and engagement.');

	if (len > 280)
		suggestions.push('The content is quite long — simplifying or tightening the message could improve readability.');

	return suggestions;
}


function checkCTA(text){
	const t = text.toLowerCase();
	for (const w of CTA_WORDS) if (t.includes(w)) return [];

	return ['Consider adding a clear call-to-action (CTA) to guide engagement, such as asking for feedback or inviting discussion.'];
}


function checkEmojis(text){
	if (containsEmoji(text)) return [];
	return ['Adding a subtle, relevant emoji can make the post more visually engaging while staying professional.'];
}


function checkFillerWords(text){
	const t = text.toLowerCase();
	const found = FILLER_WORDS.filter(w => t.includes(w));
	if (found.length > 0)
		return ['You may want to remove informal filler words to maintain a polished, professional tone.'];
	return [];
}


function checkOpener(text){
	const first = text.trim().split(/\s+/).slice(0, 5).join(' ').toLowerCase();
	const hasStrongOpener = STRONG_OPENERS.some(op => first.includes(op.toLowerCase()));

	if (!hasStrongOpener)
		return ['The opening sentence could be more compelling — consider starting with a clear value point or strong hook.'];

	return [];
}


function checkReadability(text){
	const words = text.split(/\s+/);
	if (words.length < 5) return [];

	const avgLength = words.reduce((s,w) => s + w.length, 0) / words.length;

	if (avgLength > COMPLEXITY_THRESHOLD)
		return ['The text may be overly complex — using simpler phrasing can improve readability and audience retention.'];

	return [];
}


function analyzeText(text){
	const suggestions = [];
	const sentiment = checkSentiment(text);

	// sentiment suggestions
	if (sentiment === 'negative')
		suggestions.push('The overall tone appears negative — reframing statements in a more constructive or neutral manner may improve audience response.');
	else if (sentiment === 'positive')
		suggestions.push('The tone is positive and engaging — this typically supports stronger audience interaction.');

	// add modular checks
	suggestions.push(...checkHashtags(text));
	suggestions.push(...checkLength(text));
	suggestions.push(...checkCTA(text));
	suggestions.push(...checkEmojis(text));
	suggestions.push(...checkFillerWords(text));
	suggestions.push(...checkOpener(text));
	suggestions.push(...checkReadability(text));

	// remove duplicates + empty values
	const uniq = [...new Set(suggestions)].filter(Boolean);
	return uniq;
}

module.exports = { analyzeText };
