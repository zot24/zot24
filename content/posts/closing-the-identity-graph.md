---
title: "Closing the identity graph between motty.io and zot24"
date: "2026-05-30"
description: "Why I added a 'studio' line to my identity card, what rel='me' actually does, and how two of my sites now point at each other in a way search engines and LLMs can read as one person."
tags: ["seo", "identity", "indieweb", "motty", "llm"]
---

# Closing the identity graph between motty.io and zot24

For years I've quietly run **Motty** as my software studio while keeping **zot24.com** as the personal-CV-ish side of things. Two sites, both online, both me — and from a search engine or an LLM's perspective, two completely separate identities. Today I closed that gap, and I want to write down what I did, because the answer was less obvious than I expected.

## The actual problem

If you Google me, you find zot24. If you Google my studio, you find motty.io. Neither page tells a crawler that the *founder of Motty* and *the person at zot24* are the same human. There's no mechanical link between them. So when somebody asks ChatGPT or Claude *"who runs motty.io?"* — at best, the model guesses; at worst, it makes something up.

The fix isn't a backlink. The fix is **mutual attestation**. Both sites need to say the same thing, in a machine-readable form, in a way that doesn't rely on a third party to corroborate.

## Three layers, all bidirectional

**One.** A visible line on each page that names the other. On zot24's identity card, a new field:

```
studio    motty.io · software, infrastructure & technical consulting
```

On motty.io's footer colophon, a corresponding `Principal · zot24` line. Anyone landing on either site can find the other in two seconds without scrolling. This is the part most people will read.

**Two.** `rel="me"` links in the `<head>` of each site. These are the IndieWeb convention for *"this URL is also me."* When zot24's `<head>` carries `<link rel="me" href="https://motty.io">`, and motty.io's `<head>` carries the same back at zot24, you've made a mechanical, verifiable claim that any crawler can follow without ambiguity. Add the same to GitHub, LinkedIn, and X, and you have a small but airtight identity graph.

**Three.** JSON-LD schema, on both sides. On motty.io, a `ProfessionalService` schema with a `founder` block — a `Person` entity named `zot24` with `sameAs` pointing at every social profile. On zot24, a `Person` schema with `worksFor` pointing at Motty. Now the structured-data crawlers (Google's Knowledge Graph, Perplexity's web index, Claude's web fetcher) read the same story from both ends.

## Why all three layers and not just one

Because they serve different consumers.

The **visible line** is for humans who want a fast answer. The **`rel="me"` links** are for crawlers that respect open-web conventions but don't always parse structured data. The **JSON-LD** is for the search engines and LLM crawlers that *do* parse structured data and use it to populate knowledge graphs.

If you only do one, you leave consumers behind. If you do all three and they all say the same thing, you've made a claim that's hard to misread.

## The thing I underrated

I kept treating zot24 and Motty as two separate brands that happened to share an owner. They're not. They're two faces of the same person doing different work — the personal arc on one side, the professional studio on the other. Treating them as one identity graph isn't dishonest; it's *accurate*.

The whole exercise took less than an hour and ships a small structural improvement to how a non-trivial number of LLMs will describe me going forward. I'd recommend the same exercise to anyone running both a personal site and a separate company site — the only thing that makes it complicated is forgetting to do it.
