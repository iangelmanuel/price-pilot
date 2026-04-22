# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm lint         # ESLint check
```

There is no test suite. Verify changes by running the dev server and exercising the UI.

## What This App Does

**PricePilot** is an internal admin tool for Importex (Colombian e-commerce/dropshipping). It:
1. Calculates final COP sale prices from Amazon USD source prices using a live TRM rate
2. Generates WhatsApp marketing messages in Spanish via AI (OpenRouter)

The app is Spanish-first — UI, prompts, and all business copy are in Spanish.

## Architecture

**Stack:** Next.js App Router · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui · Vercel AI SDK

**State:** Single React Context (`ProductProvider`) hydrated from/synced to `localStorage` key `price-pilot:price-settings:v2`. All pricing configuration and product fields live here. Access via `useProduct()` hook.

**Routing:** One route group `(dashboard)/` with two pages — `crear-producto` (the cotizador, main feature) and `dashboard` (analytics stub).

**Server boundary:** The only Server Action is `app/actions/generateWhatsappAiMessage.ts` (AI message generation). Everything else is client-side.

## Key Data Flows

### Price Calculation
All math runs client-side in real time. Formula:
```
finalCOP = (usdPrice × (trm + commission)) × (1 + percentageIncrease/100) + deliveryCost + (costPerPound × pounds)
```
- TRM auto-fetches from `https://hexarate.paikama.co/api/rates/USD/COP/latest` on load
- Two shipping modes: `amazon` (direct) and `casillero` (freight forwarder)
- Two product categories: `general` and `ropa` (clothing)

### AI Message Generation
`generateWhatsappAiMessage` (Server Action):
1. Validates input with Zod
2. Calls OpenRouter (or OpenAI) — falls back through: configured model → discovered free models → hardcoded fallbacks
3. Streams the response back via Vercel AI SDK
4. If no API key is set, returns a locally generated template message (no error thrown)

### Copy Actions
`useCopyPayloadActions` builds several clipboard payloads:
- Final COP price (number only)
- Generated WhatsApp message
- "Gemini payload" — formatted prompt for pasting into Google Gemini manually
- "Admin payload" — source link, coupon, USD price, pounds

## Environment Variables

All optional. The app degrades gracefully with no API key (uses template messages).

| Variable | Purpose |
|---|---|
| `OPENROUTER_API_KEY` | Primary AI provider key |
| `OPENAI_API_KEY` | Fallback AI key |
| `OPENROUTER_BASE_URL` | Custom endpoint (default: openrouter.ai) |
| `OPENROUTER_MODEL` | Specific model ID |
| `OPENROUTER_MODEL_CANDIDATES` | Comma-separated fallback model IDs |
| `OPENROUTER_SITE_URL` | Referer header for OpenRouter |
| `OPENROUTER_APP_NAME` | X-Title header for OpenRouter |

## Component Organization

```
app/components/
  cotizador/          # Main pricing calculator (12 components)
  cotizador-rapido/   # Quick-quote feature
  dashboard/          # Analytics overview
  shared/             # Sidebar, Topbar
  ui/                 # shadcn primitives (button, card, input, badge, etc.)
app/hook/             # Custom hooks (useProduct, useTheme, useKeyboardShortcuts, ...)
app/utils/            # Pure utilities (formatCurrency, buildGeminiPayload, parseDecimalInput)
app/actions/          # Server Actions
app/provider/         # ProductProvider context + localStorage sync
```

`CotizadorLayout.tsx` orchestrates the main page — left panel (config/source) and right panel (result/preview), with a tab switcher on mobile.

## Conventions

- **Number parsing:** Colombian locale uses `,` as decimal separator. Use `parseDecimalInput()` from `app/utils/parseDecimalInput.ts` for any user-entered numeric field.
- **Currency display:** `formatUsd()` and `formatCop()` from `app/utils/formatCurrency.ts` — never format currencies ad hoc.
- **Tailwind CSS 4:** Uses `@import "tailwindcss"` and CSS variables (no `tailwind.config.js` needed for most changes). Dark mode is toggled via `.dark` class on `<html>`.
- **shadcn/ui path alias:** Components are at `@/app/components/ui/` (not the default `@/components/ui/`).
- **localStorage migration:** If adding new fields to ProductProvider state, handle migration from `v2` (see existing `v1→v2` pattern in `ProductProvider.tsx`).
