# CRM Intelligence Helper — Agent Briefing Document

**Project:** Client Intelligence Dashboard for Universal Bankers
**Client:** Raiffeisen Bank (Czech Republic)
**Version:** 1.0 — April 2026
**Purpose:** This document serves as a comprehensive briefing for a code agent tasked with building a prototype CRM Intelligence Helper — a real-time client insight dashboard for branch staff.

---

## 1. Problem Statement

Universal bankers in Raiffeisen Bank branches face a recurring challenge: most client visits are **unannounced walk-ins**. The banker has virtually no preparation time. They need to understand who the client is, what products they hold, what their recent behavior looks like, and what sales opportunities exist — all **within 3 seconds** of pulling up the client record.

Today's systems are fragmented. Data lives across a core banking system, a CRM platform, digital channel logs, and card management systems. None of these present a unified, actionable view. The banker must click through multiple screens, mentally assemble a picture, and hope they don't miss an upsell opportunity or a red flag.

**The goal:** Build a single-screen intelligence dashboard that synthesizes all available client data into an instantly scannable view with embedded sales tips. Design it so ML/AI models can plug in later for predictive scoring.

### 1.1 The 3-Second Rule

The guiding UX principle from stakeholder workshops:

> *"Graficky, přehledně…, aby každý bankéř věděl do 3sec, kdo před ním stojí / na něj mluví"*
> ("Graphically, clearly… so every banker knows within 3 seconds who is standing in front of them / talking to them")

This means: no tables of raw data, no scrolling through transaction lists. The default view must be a visual summary — icons, color-coded indicators, sparklines, and short natural-language sentences.

---

## 2. User Persona

**Primary user:** Universal Banker (Czech: *univerzální bankéř*)

These staff handle everything from basic teller operations to advisory conversations. They serve individual retail clients, but may also encounter small business owners who hold both personal and business accounts. Their workflow is interrupt-driven: a client walks in, the banker identifies them (ID scan, card, or name lookup), and the dashboard must instantly populate.

**Key needs:**
- Instant visual summary of "who is this person"
- Product holdings at a glance (what they have, what's expiring, what's underutilized)
- Recent interactions (did they call, chat, complain, visit another branch?)
- Contextual sales tips (not generic campaigns — personalized nudges based on actual behavior)
- Alerts and flags (birthday, complaint in progress, expiring card, large balance change)

---

## 3. Conceptual Data Map

### 3.1 Data Domains Overview

The dashboard draws from **six core data domains**. Each domain maps to one or more source systems. The diagram below shows the conceptual flow:

```
┌─────────────────────────────────────────────────────────────────────┐
│                     CLIENT IDENTITY (Core Banking)                  │
│  Name, DOB, Address, Segment, GDPR status, linked business entity  │
└─────────────┬───────────────────────────────────────┬───────────────┘
              │                                       │
   ┌──────────▼──────────┐               ┌───────────▼────────────┐
   │   PRODUCT HOLDINGS  │               │   INTERACTION HISTORY  │
   │   (Core Banking +   │               │   (CRM + Digital       │
   │    Card System)      │               │    Channels)           │
   │                      │               │                        │
   │ • Current accounts   │               │ • Branch visits        │
   │ • Savings accounts   │               │ • Call center calls    │
   │ • Debit/credit cards │               │ • Chat/email/voicebot  │
   │ • Loans & mortgages  │               │ • Mobile/internet bank │
   │ • Insurance policies │               │ • Complaints & tickets │
   │ • Pension products   │               │                        │
   └──────────┬───────────┘               └───────────┬────────────┘
              │                                       │
   ┌──────────▼──────────┐               ┌───────────▼────────────┐
   │ TRANSACTIONAL        │               │ BEHAVIORAL SIGNALS     │
   │ BEHAVIOR             │               │ (Clickstream, App      │
   │ (Core Banking +      │               │  Telemetry, CRM)       │
   │  Card System)        │               │                        │
   │                      │               │ • IB/MB login freq.    │
   │ • Spending patterns  │               │ • Feature usage        │
   │ • Income detection   │               │ • Browsing paths       │
   │ • Balance trends     │               │ • Session metrics      │
   │ • Standing orders    │               │ • Campaign responses   │
   │ • Card usage abroad  │               │                        │
   └──────────┬───────────┘               └───────────┬────────────┘
              │                                       │
              └──────────────┬────────────────────────┘
                             │
                  ┌──────────▼──────────┐
                  │   SALES CONTEXT     │
                  │   (CRM + Rules      │
                  │    Engine)           │
                  │                     │
                  │ • Active campaigns  │
                  │ • Open opportunities│
                  │ • NBO candidates    │
                  │ • Cross-sell flags  │
                  │ • Satisfaction (NPS,│
                  │   CSAT, CES)       │
                  └─────────────────────┘
```

### 3.2 Data Source Availability Matrix

Based on stakeholder analysis (image003), here is what data is realistically available today vs. what requires future investment:

| Data Category | Sub-type | Examples (Banking Context) | Available Now? | Treatment Needed |
|---|---|---|---|---|
| **Text Data** | Structured | CRM entries, product databases | ✅ Yes | Tokenization, normalization, deduplication |
| | Unstructured | Chat logs, emails, SMS notes | ✅ Yes | Sentiment tagging, keyword extraction, intent detection |
| | Semi-structured | API feeds (JSON/XML) | ✅ Yes | Parsing, schema validation |
| **Voice Data** | Audio waveforms | Call center recordings, IVR logs | ✅ Yes | Noise reduction, transcription, segmentation |
| | Transcribed text | Call transcriptions | ✅ Yes | Sentiment tagging, keyword extraction |
| **Behavioral Data** | Clickstream | IB/MB page clicks, navigation paths | ✅ Yes | Session merging, anomaly detection |
| | Event data | Abandoned applications, pop-up interactions | ✅ Yes | Event aggregation, anomaly tagging |
| | Heatmaps | Mouse tracking, scroll maps | ❌ No | Pattern recognition, feature tagging |
| **Survey Data** | Structured | CSAT, NPS, CES scores | ✅ Yes | Aggregation, sentiment tagging |
| | Unstructured | Open-ended feedback | ✅ Yes | Text normalization, keyword extraction |
| **Support Data** | Structured | Ticket IDs, resolution codes | ✅ Yes | Schema validation, aggregation |
| | Unstructured | Escalation notes, case logs | ✅ Yes | Intent detection, keyword extraction |
| **Transaction Data** | Structured | Purchase records, card transactions | ✅ Yes | Schema alignment, fraud flags |
| | Event logs | Refunds, chargebacks, reversals | ✅ Yes | Anomaly detection, aggregation |
| **Device / Telemetry** | Structured | App metrics, login metadata | ✅ Yes | Parsing, validation, aggregation |
| | Metadata | Device ID, session timestamps | ✅ Yes | Synchronization, event matching |
| **Image Data** | Any | Product photos, document scans | ❌ No | OCR, feature extraction |
| **Video Data** | Any | Branch camera, video calls | ❌ No | Not in scope for v1 |
| **Social Media** | Any | Comments, mentions, DMs | ❌ No | Not in scope for v1 |

**Key takeaway for the code agent:** Focus on the ✅ sources. The architecture should define interfaces for the ❌ sources so they can be plugged in later, but the prototype should mock or omit them.

### 3.3 Key Entities

**Client** — The central entity. Every other entity connects through a `client_id`.

- `client_id`, `name`, `date_of_birth`, `segment` (retail / affluent / premium), `gdpr_consent_status`, `linked_business_id` (nullable — if the client also has a business account)

**Product** — Anything the client holds or has held.

- `product_id`, `client_id`, `product_type` (enum: current_account, savings_account, debit_card, credit_card, mortgage, consumer_loan, insurance, pension, investment), `status` (active / closed / suspended), `open_date`, `expiry_date`, `tariff_name`, `key_params` (JSON blob — balance, limit, rate, etc.)

**Interaction** — Any contact between the client and the bank.

- `interaction_id`, `client_id`, `channel` (branch / call_center / chat / email / voicebot / chatbot / mobile_app / internet_banking), `timestamp`, `topic_summary`, `sentiment_score` (nullable), `resolved` (boolean), `agent_id`

**Transaction** — Financial movements.

- `transaction_id`, `client_id`, `product_id`, `type` (credit / debit / standing_order / direct_debit), `amount`, `currency`, `merchant_category`, `timestamp`, `is_international` (boolean), `status` (completed / pending / declined)

**Campaign / Offer** — CRM-driven sales actions.

- `campaign_id`, `client_id`, `offer_type`, `status` (new / presented / accepted / declined), `valid_from`, `valid_to`, `priority_score`

**Behavioral Event** — Digital footprint.

- `event_id`, `client_id`, `channel`, `event_type` (login / page_view / feature_use / app_open / session_end), `timestamp`, `metadata` (JSON)

**Satisfaction Score** — Survey results.

- `score_id`, `client_id`, `survey_type` (NPS / CSAT / CES), `score`, `verbatim_text` (nullable), `timestamp`

---

## 4. Screen Definitions

The application consists of **one primary screen** (the Client Dashboard) with **expandable detail panels**. The philosophy: everything important is visible on the main screen; details are one click away but never required for the 3-second scan.

### 4.1 Screen: Client Dashboard (Main View)

**Trigger:** Banker searches for or scans a client. The dashboard loads.

**Layout:** A single-page layout divided into zones. Think of it as a card-based dashboard — not a form, not a table.

```
┌──────────────────────────────────────────────────────────────────┐
│  [A] CLIENT HEADER                                               │
│  Name · Segment badge · Age · 🎂 birthday flag · GDPR status    │
│  Linked business: [company name] or "—"                          │
│  Last visit: 3 days ago (Branch Karlín) · Last call: 12 days ago │
├──────────────┬──────────────┬──────────────┬─────────────────────┤
│ [B] PRODUCTS │ [C] RECENT   │ [D] BEHAVIOR │ [E] SALES TIPS     │
│              │ ACTIVITY     │ SIGNALS      │                     │
│ Card-style   │ Timeline of  │ Visual       │ Prioritized list    │
│ summaries    │ last 5       │ indicators   │ of personalized     │
│ per product  │ interactions │              │ recommendations     │
│ category     │              │              │                     │
└──────────────┴──────────────┴──────────────┴─────────────────────┘
│ [F] ALERTS BAR (bottom or top-pinned, color-coded)               │
└──────────────────────────────────────────────────────────────────┘
```

#### Zone A — Client Header

A persistent top bar showing identity essentials.

- **Client name** in large text
- **Segment badge** — color-coded chip (e.g., green = standard, gold = affluent, black = premium)
- **Age** — computed from DOB, shown as a number
- **Birthday flag** — if the client's birthday is within ±7 days, show a visible indicator (cake icon or highlight)
- **GDPR consent status** — green checkmark or red warning icon
- **Linked business** — if `linked_business_id` exists, show the company name as a clickable chip
- **Last contact summary** — one line: "Last visit: [date] ([branch]) · Last call: [date]"

#### Zone B — Product Holdings

A set of **product cards**, one per product category the client holds. Each card is a compact summary, not a full detail view.

**Debit Card card (example from workshops):**
- Card type (Standard / GOLD) + card image/icon
- Card status (active / blocked / expired) with color indicator
- Expiry date — red if <3 months away
- Last transaction: amount + merchant + date
- Transaction approval rate indicator (if declined transactions exist, flag it)
- Daily/monthly limits vs. current utilization — shown as a mini progress bar
- 3D Secure status — on/off badge
- Digital wallet status — Apple Wallet / Google Pay icons if enrolled

**Credit Card card:**
- Same as debit + additionally:
- Outstanding balance vs. credit limit — visual gauge
- Minimum payment due date
- Revolving vs. transactional usage pattern indicator
- Available disposable amount (LOP)

**Current Account / Payment card:**
- Account type + current monthly fee (tariff)
- Current balance — with a sparkline showing 30-day trend
- Available balance (if different from current)
- Standing orders / direct debits count — clickable to expand
- Incoming vs. outgoing volume this month — simple bar or arrow indicator
- Last fee waived (if applicable)

**Other products** (loans, insurance, pension, investments) follow the same card pattern: type, status, key metric, expiry/renewal date, one behavioral insight.

**Design guidance:** If the client has many products, show the top 4-5 as cards, with a "+N more" expandable link. Order by relevance (active products first, recently used first).

#### Zone C — Recent Activity Timeline

A compact vertical timeline showing the **last 5 interactions** across all channels.

Each entry shows:
- **Channel icon** (branch, phone, chat, email, bot, mobile app, internet banking)
- **Date** (relative: "3 days ago", "2 weeks ago")
- **Summary** — one line (e.g., "Called about card block — resolved", "Chatbot: asked about mortgage rates", "Visited Branch Karlín — opened savings account")
- **Sentiment dot** — green / yellow / red if sentiment analysis is available

Clicking any entry opens a detail panel with the full interaction record.

**Additional items to surface here (from workshops):**
- Last IB/MB login + what the client did there
- CRM communication history — last 5 days, with links to detail
- Active complaint or open ticket — prominently flagged

#### Zone D — Behavioral Signals

A set of **visual indicator tiles** — small, icon-driven, scannable.

- **Channel preference** — icons showing which channels the client uses most (branch / CC / MB), sized by frequency
- **Balance trend** — sparkline or arrow (↑ growing / → stable / ↓ declining) over the last 90 days
- **International activity** — globe icon, lit up if the client has recent international transactions or card usage abroad
- **Digital engagement** — gauge showing IB/MB login frequency (low / medium / high)
- **Online shopping pattern** — cart icon, lit up if frequent e-commerce transactions detected
- **RB Club / loyalty usage** — loyalty icon, showing whether the client actively uses partner discounts
- **Life event signals** — icons for detected events (🏠 property purchase, 👶 new child, 🎓 education, ✈️ frequent travel) — these are placeholders for future ML models

#### Zone E — Sales Tips

The most actionable zone. A **prioritized list of 3-5 contextual recommendations**, each as a compact card.

Each sales tip includes:
- **Headline** — e.g., "Client travels frequently but has no travel insurance"
- **Reasoning** — one sentence explaining why (e.g., "12 international card transactions in the last 90 days, no active travel insurance product")
- **Suggested action** — what the banker should say or offer
- **Priority** — high / medium / low, color-coded
- **Source** — whether this comes from a CRM campaign, a business rule, or (future) an ML model

**Example sales tips derived from stakeholder workshops:**

1. *"Klient cestuje a nemá pojištění"* → Client has international transactions but no travel/property insurance. Suggest travel insurance package.
2. *"Klient nakupuje na internetu a nemá kreditku"* → Client has frequent e-commerce debit card transactions but no credit card. Suggest credit card with cashback on online purchases.
3. *"Klient nakupuje u partnerů RB, ale nevyužívá slev RB klubu"* → Client spends at RB partner merchants but hasn't activated loyalty club. Suggest RB Club enrollment.
4. *"Klient by mohl využít MÚM, když je spokojený"* → Client's satisfaction score is high. Suggest the referral program (MÚM — "Můj účet, můj tip").
5. *"Klient doplácí jinou pojistku/penzijko"* → Client has external insurance or pension payments detected via standing orders to competitors. Suggest consolidation.

**AI-readiness note:** In v1, sales tips are generated by a **rules engine** (if-then logic on available data). The architecture must define a `SalesTipProvider` interface so that ML-based engines (next-best-offer models, churn predictors, life-event detectors) can replace or augment the rules engine without changing the frontend.

#### Zone F — Alerts Bar

A persistent bar (top or bottom) showing time-sensitive flags:

- 🎂 Birthday within ±7 days
- ⚠️ Active complaint or unresolved ticket
- 🔴 Card expiring within 30 days
- 📉 Significant balance drop (>30% in last 30 days)
- 📋 Scheduled meeting today/tomorrow
- 🔒 GDPR consent missing or expiring

Each alert is a dismissible chip. Clicking it scrolls/focuses the relevant dashboard zone.

### 4.2 Screen: Product Detail Panel (Slide-out)

When the banker clicks any product card in Zone B, a **slide-out panel** opens from the right. This panel shows the full product detail — all the granular data that doesn't fit in the 3-second summary.

For a **debit card**, this includes:
- Full card number (masked), card type, linked account
- Complete transaction history (filterable, searchable)
- All limits (POS, ATM, online) with current utilization
- 3D Secure configuration history
- Digital wallet enrollment details
- Card replacement/reissue history

Similar detail panels exist for each product type. **The code agent should design these as reusable, template-driven components** that receive a product type and render the appropriate fields.

### 4.3 Screen: Interaction Detail Panel (Slide-out)

Clicking any interaction in Zone C opens a detail panel showing:
- Full interaction record (transcript, notes, resolution)
- Related tickets or follow-up actions
- Sentiment analysis breakdown (if available)
- Link to CRM record

---

## 5. Architecture Guidance

### 5.1 Principles

1. **API-first** — The dashboard consumes data through a unified API layer. It never connects directly to source systems. This abstraction is critical for both security (the branch app should not have raw database access) and extensibility.

2. **Read-heavy, near-real-time** — This is overwhelmingly a read application. Data freshness target: < 5 minutes for most signals, < 1 minute for transaction data. The API layer should use caching aggressively.

3. **AI-ready interfaces** — Every component that generates insights (sales tips, behavioral signals, alerts) must be behind an interface/contract. V1 implementations use rules; v2+ can swap in ML models.

4. **Offline-tolerant** — Branch networks can be unreliable. The app should cache the last-fetched client profile and degrade gracefully (show stale data with a "last updated" timestamp rather than an error screen).

5. **Responsive but desktop-first** — Primary use is on branch workstations (desktop monitors). Tablet support is a nice-to-have for bankers who walk the floor.

### 5.2 Suggested Component Architecture

```
┌─────────────────────────────────────────────────┐
│                  FRONTEND APP                    │
│                                                  │
│  ClientDashboard                                 │
│   ├── ClientHeader                               │
│   ├── ProductCardsGrid                           │
│   │    ├── DebitCardInsight                       │
│   │    ├── CreditCardInsight                      │
│   │    ├── CurrentAccountInsight                  │
│   │    └── GenericProductInsight                  │
│   ├── ActivityTimeline                            │
│   ├── BehaviorSignals                             │
│   ├── SalesTipsPanel                              │
│   ├── AlertsBar                                   │
│   └── DetailSlideout (generic, content-driven)    │
│                                                  │
│  Services:                                        │
│   ├── ClientService (fetch client profile)        │
│   ├── ProductService (fetch product details)      │
│   ├── InteractionService (fetch interactions)     │
│   ├── BehaviorService (fetch behavioral signals)  │
│   ├── SalesTipService (fetch/generate tips)       │
│   └── AlertService (fetch/compute alerts)         │
│                                                  │
│  Providers (swappable):                           │
│   ├── RuleBasedSalesTipProvider (v1)              │
│   ├── MLSalesTipProvider (v2, future)             │
│   ├── RuleBasedAlertProvider (v1)                 │
│   └── MLAlertProvider (v2, future)                │
└─────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│              API GATEWAY / BFF                   │
│  (Backend-for-Frontend)                          │
│                                                  │
│  Aggregates calls to:                             │
│   • Core Banking API (products, transactions,    │
│     balances)                                     │
│   • CRM API (interactions, campaigns, tickets,   │
│     satisfaction scores)                          │
│   • Card Management API (card details, limits,   │
│     3DS, digital wallet)                          │
│   • Digital Channels API (IB/MB usage, chatbot   │
│     logs, voicebot logs)                          │
│   • Rules Engine (sales tips, alerts)             │
│                                                  │
│  Caching layer (Redis or similar)                 │
│  Authentication (SSO / bank internal IdP)         │
└─────────────────────────────────────────────────┘
```

### 5.3 Rules Engine — Sales Tip Examples (v1)

The code agent should implement these rules as a starting point. Each rule takes available client data as input and outputs a `SalesTip` object (or null if not triggered).

| Rule ID | Condition | Tip Output |
|---|---|---|
| R001 | `has_international_transactions(90d) AND NOT has_product("travel_insurance")` | "Client travels — suggest travel insurance" |
| R002 | `has_ecommerce_transactions(90d, count>5) AND NOT has_product("credit_card")` | "Frequent online shopper — suggest credit card" |
| R003 | `spends_at_rb_partners(90d) AND NOT rb_club_active` | "Shops at RB partners — suggest RB Club" |
| R004 | `nps_score >= 8 AND NOT referral_offered(180d)` | "Satisfied client — suggest referral program (MÚM)" |
| R005 | `has_external_standing_order_to("insurance_company" OR "pension_fund")` | "Pays external insurance/pension — suggest consolidation" |
| R006 | `card_expiry < 30d` | "Card expiring soon — proactively discuss renewal/upgrade" |
| R007 | `balance_drop_pct(30d) > 30%` | "Significant balance drop — check if client needs support" |
| R008 | `has_product("consumer_loan") AND credit_score_improved` | "Credit profile improved — suggest refinancing at better rate" |
| R009 | `birthday_within(7d)` | "Birthday approaching — personal greeting opportunity" |
| R010 | `has_open_complaint AND satisfaction_trend("declining")` | "Active complaint + declining satisfaction — handle with care" |

### 5.4 Mock Data Strategy

For prototyping, the code agent should generate realistic mock data:

- **5-10 fictional clients** covering different segments (standard, affluent, premium) and profiles (young digital-native, family with mortgage, retiree, small business owner)
- **Each client should have:** 2-5 products, 5-15 recent interactions, 30-90 days of transactions, behavioral events, and at least 2-3 triggered sales tips
- **Use Czech names and realistic Czech banking product names** for authenticity
- Mock data should be stored in a structured format (JSON files or an in-memory database) behind the same service interfaces that would connect to real APIs

---

## 6. AI-Readiness Architecture

While v1 uses rule-based logic, the system must be designed so that AI/ML capabilities can be plugged in without frontend changes.

### 6.1 Extension Points

| Capability | V1 (Rules) | V2+ (AI/ML) |
|---|---|---|
| Sales tips generation | If-then rules on client data | Next-Best-Offer model (collaborative filtering, propensity scoring) |
| Churn risk detection | Balance drop + inactivity rules | Churn prediction model (gradient boosting on behavioral features) |
| Life event detection | Not implemented | NLP on transaction descriptions + clustering on spending pattern changes |
| Interaction summary | Raw text display | LLM-generated natural-language summary of recent interactions |
| Client brief | Structured data cards | LLM-generated "elevator pitch" paragraph about the client |
| Anomaly detection | Threshold-based alerts | Isolation forest / autoencoder on transactional patterns |

### 6.2 Provider Interface Pattern

Every insight-generating component should follow this pattern:

```
Interface: InsightProvider<TInput, TOutput>
  - generateInsights(clientData: TInput): TOutput[]
  - getProviderType(): "rules" | "ml" | "llm"
  - getConfidenceScore(): number (0-1, for ML providers)

Concrete implementations:
  - RuleBasedSalesTipProvider implements InsightProvider<ClientProfile, SalesTip>
  - MLSalesTipProvider implements InsightProvider<ClientProfile, SalesTip>
  - LLMClientBriefProvider implements InsightProvider<ClientProfile, NarrativeBrief>
```

The frontend should display the `confidenceScore` when available (e.g., "85% match" on an ML-generated tip) so bankers can calibrate their trust.

---

## 7. Czech-English Glossary

| Czech Term (from workshops) | English Equivalent | Context |
|---|---|---|
| Bankéř | Banker / Universal banker | Primary user |
| Pobočka (pob) | Branch | Physical branch location |
| KC (Klientské centrum) | Client Center / Call Center | Phone support channel |
| MB (Mobilní bankovnictví) | Mobile Banking | Mobile app channel |
| IB (Internetové bankovnictví) | Internet Banking | Web banking channel |
| BÚ (Běžný účet) | Current Account | Primary transactional account |
| SÚ (Spořicí účet) | Savings Account | Interest-bearing account |
| Debetní karta | Debit Card | Card linked to current account |
| Kreditní karta | Credit Card | Revolving credit card |
| Pojištění | Insurance | Travel, life, property, etc. |
| Penzijko (penzijní spoření) | Pension Savings | Supplementary pension product |
| Stavební spoření | Building Savings | Czech-specific regulated savings product |
| Spotřebitelský úvěr | Consumer Loan | Unsecured personal loan |
| Hypotéka | Mortgage | Secured property loan |
| 3D Secure | 3D Secure | Online card payment authentication |
| Peněženka (apple wallet, android) | Digital Wallet | Card enrolled in Apple/Google Pay |
| Trvalý příkaz (trvalka) | Standing Order | Recurring payment instruction |
| Inkaso | Direct Debit | Creditor-initiated recurring payment |
| Stav karty | Card Status | Active / Blocked / Expired |
| Expirace karty | Card Expiry | Card expiration date |
| LOP (Rozpoložitelná částka) | Available Credit / Disposable Amount | Remaining credit limit on credit card |
| Dlužná částka | Outstanding Balance | Amount owed on credit card |
| GDPR / DPPO | GDPR / Data Protection | Consent and compliance status |
| NPS | Net Promoter Score | Customer satisfaction metric |
| CSAT | Customer Satisfaction Score | Post-interaction satisfaction |
| CES | Customer Effort Score | Ease-of-resolution metric |
| MÚM (Můj účet, můj tip) | My Account, My Tip | Referral / recommend-a-friend program |
| RB Klub | RB Club | Raiffeisen loyalty/discount program |
| Voicebot | Voicebot | Automated voice assistant |
| Chatbot | Chatbot | Automated text assistant |
| Scles tipy | Sales Tips | Contextual selling recommendations |
| Měkké indikátory | Soft Indicators | Non-financial behavioral signals |

---

## 8. Acceptance Criteria for the Prototype

The code agent should deliver a working prototype that satisfies the following:

1. **Client search** — A simple search bar (by name or ID) that loads a client dashboard from mock data.
2. **3-second scan** — The main dashboard view loads in <1 second and presents all six zones (header, products, activity, behavior, sales tips, alerts) without scrolling on a standard 1920×1080 monitor.
3. **Product cards** — At minimum: debit card, credit card, and current account cards are fully implemented with all fields from the workshop requirements.
4. **Activity timeline** — Shows the last 5 interactions with channel icons, dates, summaries, and sentiment indicators.
5. **Behavioral signals** — At least 5 visual tiles (channel preference, balance trend, international activity, digital engagement, online shopping pattern) are rendered.
6. **Sales tips** — At least 5 rules from the rules engine (Section 5.3) are implemented and generate contextual tips based on mock client data.
7. **Alerts** — Birthday, expiring card, and balance drop alerts work correctly.
8. **Detail panels** — Clicking a product card opens a slide-out with full details. Clicking an interaction opens a slide-out with the full record.
9. **AI-readiness** — The `InsightProvider` interface pattern is implemented. Swapping the rules engine for an ML provider requires no frontend changes.
10. **Responsive** — The dashboard is usable on screens from 1366×768 to 1920×1080. Tablet (1024×768) is a stretch goal.
11. **Mock data** — At least 5 diverse client profiles are available for demo purposes.
12. **Tech stack** — The code agent may choose the frontend framework. The briefing does not prescribe one. The backend/BFF can be a simple Node.js or Python service serving mock data through REST or GraphQL endpoints.

---

## 9. Out of Scope (for v1)

- Real backend integration (all data is mocked)
- Authentication and authorization (assume the banker is already logged in)
- Image, video, and social media data sources (per availability matrix)
- ML model training or deployment
- Multi-language UI (Czech-only is fine for prototype; English is acceptable too)
- Print or export functionality
- Audit logging

---

## 10. Reference Screenshots

The following workshop screenshots informed this briefing and should be kept alongside this document for reference:

- `image001.png` — "Light" data collection requirements (5 domains: Contacts, Products, Client Behavior, Offers, CEX)
- `image002.png` — Post-workshop detailed requirements (specific product insight cards, sales tips structure)
- `image003.png` — Data source availability matrix (what data types exist, treatment steps, availability status)
