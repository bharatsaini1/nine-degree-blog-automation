export const INITIAL_BRAND_PROFILE = {
  brandName: 'Nine Degree',
  tagline: 'Global Strategic Marketing, Brand Architecture & Editorial Advisory',
  primaryIndustry: 'Real Estate & Built Environment',
  keyMicroMarkets: [
    'Global / Dubai Branded Residences',
    'London Prime Central',
    'Mumbai (BKC, Worli, Bandra)',
    'Pune (Koregaon Park, Kalyani Nagar)',
    'Delhi NCR (Golf Course Road, Aerocity)',
    'Jaipur (Jagatpura-Mahal Rd, C-Scheme)'
  ],
  targetAudiences: [
    { id: 'hni', name: 'Global HNIs & Capital Allocators', painPoint: 'Cross-border tax structuring, escrow due-diligence, asset illiquidity' },
    { id: 'developers', name: 'Tier-1 Luxury Real Estate Developers', painPoint: 'High buyer acquisition cost, brand commoditization, sample flat trust gap' },
    { id: 'advisory', name: 'Institutional Property Funds & Family Offices', painPoint: 'Micro-market yield predictability, regulatory risk exposure' }
  ],
  bannedCliches: [
    'delve', 'tapestry', 'beacon of innovation', 'crucial role', 'in today’s fast-paced world',
    'game changer', 'unleash', 'testament', 'revolutionize', 'in conclusion'
  ],
  editorialVoiceRules: [
    'Collective advisory authority ("We observe", "Nine Degree research indicates")',
    'Hard financial and regulatory benchmarks (RERA, circle rates, rental yields, escrow audit compliance)',
    'Zero generic fluff; deep corridor-specific macroeconomic and brand reasoning'
  ]
};

export const INITIAL_COMPETITORS = [
  {
    id: 'comp-1',
    name: 'Housing.com Research Bureau',
    url: 'https://housing.com/news/luxury-real-estate-trends',
    industry: 'Real Estate',
    geography: 'India / National',
    positioning: 'Broad aggregator data focusing on macro price appreciation trends',
    strengths: 'High search visibility, massive index of portal listings',
    gaps: 'Completely ignores micro-market RERA escrow audit defaults, builder cash crunches, and ground-level buyer due diligence',
    evidence: 'RERA audit circulars show persistent escrow non-compliance in Tier-1 satellite projects',
    counterAngle: 'The Fiduciary Escrow Test: Due-Diligence Checklist for HNI Property Buyers',
    status: 'Monitored',
    lastChecked: '2026-11-14'
  },
  {
    id: 'comp-2',
    name: 'Knight Frank / International Wealth Briefs',
    url: 'https://knightfrank.com/research/wealth-report-2026',
    industry: 'Real Estate',
    geography: 'Global / Dubai / London',
    positioning: 'High-level macro wealth reports treating entire cities as homogeneous blocks',
    strengths: 'Global reach, comprehensive cross-border asset allocation charts',
    gaps: 'Lacks micro-corridor yield granularity; fails to address how luxury developers win buyer trust amidst generative search disruption',
    evidence: 'High-ticket buyers discount portal brochure claims by 40% and rely on independent fiduciary advisory',
    counterAngle: 'Luxury vs Mid-Segment Real Estate Marketing: Creative Positioning & Discreet Media Buying',
    status: 'Monitored',
    lastChecked: '2026-11-15'
  },
  {
    id: 'comp-3',
    name: 'PropTiger Advisory Desk',
    url: 'https://proptiger.com/guide/tier-2-realty-outlook',
    industry: 'Real Estate',
    geography: 'Tier-1 & Tier-2 Growth Metros',
    positioning: 'Broker-centric listings promotion disguised as editorial articles',
    strengths: 'Clean chart UI, national quarterly transaction volume statistics',
    gaps: 'No localized economic nuance; fails to distinguish between prime inner-city yields vs speculative highway plots',
    evidence: 'Rental yields in established luxury enclaves average 4.8% while outlying speculative plots deliver under 2.2%',
    counterAngle: 'Micro-Market Yield Matrix: Capital Allocation Across High-Growth Prime Corridors',
    status: 'Monitored',
    lastChecked: '2026-11-16'
  }
];

export const INITIAL_KEYWORD_CLUSTERS = [
  {
    pillar: 'Authority',
    description: 'High-trust, regulatory, and institutional due-diligence keywords that establish Nine Degree as the apex global advisory',
    keywords: [
      { term: 'luxury real estate marketing strategy 2026', intent: 'Commercial Investigation', volume: 2900, kd: 'Low (22%)', cpc: '₹85' },
      { term: 'rera escrow account compliance audit checklist', intent: 'Informational', volume: 1650, kd: 'Low (18%)', cpc: '₹45' },
      { term: 'cross border property investment advisory dubai india', intent: 'Commercial Investigation', volume: 1200, kd: 'Low (20%)', cpc: '₹120' }
    ]
  },
  {
    pillar: 'Acquisition',
    description: 'High-intent commercial queries entered by active capital allocators looking for luxury property and branding services',
    keywords: [
      { term: 'pune luxury penthouses investment yield koregaon park', intent: 'Transactional', volume: 3400, kd: 'Medium (32%)', cpc: '₹95' },
      { term: 'gated plotted enclave investment vs luxury apartments', intent: 'Commercial Investigation', volume: 2800, kd: 'Low (25%)', cpc: '₹68' },
      { term: 'hni wealth allocation real estate advisory', intent: 'Commercial Investigation', volume: 920, kd: 'Low (19%)', cpc: '₹140' }
    ]
  },
  {
    pillar: 'Advocacy',
    description: 'Thought leadership, Generative Engine Optimization (GEO), and market forecast queries that drive executive shares',
    keywords: [
      { term: 'chatgpt conversational ads in real estate marketing', intent: 'Informational', volume: 4200, kd: 'Low (17%)', cpc: '₹75' },
      { term: 'how do top property developers advertise on chatgpt search', intent: 'Informational', volume: 1850, kd: 'Low (14%)', cpc: '₹60' },
      { term: 'autonomous ai multi agent systems proptech advisory', intent: 'Informational', volume: 1100, kd: 'Low (15%)', cpc: '₹90' }
    ]
  }
];

export const INITIAL_TRENDS = [
  {
    id: 'trend-re-1',
    headline: 'Luxury vs Mid-Segment Real Estate Marketing: The Creative & Media Strategy Divergence',
    category: 'Customer Behaviour',
    industry: 'Real Estate',
    geography: 'Global / Dubai / Mumbai',
    sourceName: 'Nine Degree Global Intelligence Bureau & HNI Survey',
    originalUrl: 'https://www.ninedegree.in/blogs',
    publishedDate: '2026-11-13',
    retrievedDate: '2026-11-16',
    supportingEvidence: 'Ultra-luxury property buyers discount standard portal ads by 40%. Discretion, private previews, and verified fiduciary due diligence drive 78% of international transactions.',
    attentionSignals: 'Top-shared whitepaper among Indian & UAE luxury real estate marketing heads; 3.2k LinkedIn impressions.',
    whyItMatters: 'Promotional discounting destroys luxury project equity. Marketing must operate as high-end brand architecture.',
    strategicImplications: 'Developers must decouple luxury branding from volume mid-segment media tactics.',
    contradictingEvidence: 'Mid-segment buyers still respond heavily to festival pricing and down-payment subsidies.',
    recommendedAction: 'Deploy the Nine Degree Luxury Fiduciary Framework across upcoming developer launches.',
    suggestedContentAngle: 'Why Luxury Real Estate Marketing Demands Architectural Restraint and Zero Discounting.',
    confidenceLevel: 'High (Verified Advisory Benchmark)',
    opportunityScore: 97,
    velocity: '+98% Velocity'
  },
  {
    id: 'trend-re-2',
    headline: 'Generative Engine Optimization (GEO): Why Property Developers Must Optimize for ChatGPT & Perplexity',
    category: 'Technology Development',
    industry: 'Technology & AI',
    geography: 'Global / Cross-Border',
    sourceName: 'Search Engine Land & Nine Degree Editorial Desk',
    originalUrl: 'https://www.ninedegree.in/blogs',
    publishedDate: '2026-11-05',
    retrievedDate: '2026-11-16',
    supportingEvidence: 'Over 34% of high-net-worth real estate buyers now initiate due-diligence queries inside conversational AI engines rather than Google search.',
    attentionSignals: 'OpenAI ad format expansion discussions; active debates in PropTech VC roundtables.',
    whyItMatters: 'Traditional blue-link SEO is being bypassed by AI synthesis. Brands cited as authoritative citations in LLMs capture immediate trust.',
    strategicImplications: 'Content must be structured around unambiguous factual benchmarks and transparent research to be selected by LLM citation engines.',
    contradictingEvidence: 'Local transactional search for broker contact numbers still heavily utilizes Google Maps.',
    recommendedAction: 'Structure all Nine Degree publications with verified entity citations and schema markup for GEO engines.',
    suggestedContentAngle: 'The GEO Blueprint: How Luxury Real Estate Captures High-Intent Conversational Search Traffic.',
    confidenceLevel: 'High (Verified Search Shift)',
    opportunityScore: 95,
    velocity: '+92% Velocity'
  },
  {
    id: 'trend-re-3',
    headline: 'Pune Prime Residential Hubs: Koregaon Park vs Kalyani Nagar Luxury Capital Allocation',
    category: 'Emerging Trend',
    industry: 'Real Estate',
    geography: 'Pune, Maharashtra',
    sourceName: 'MahaRERA Registry & Prime Residential Quarterly',
    originalUrl: 'https://maharera.mahaonline.gov.in',
    publishedDate: '2026-11-06',
    retrievedDate: '2026-11-16',
    supportingEvidence: 'Koregaon Park and Boat Club Road penthouses command a 45% premium over suburban developments due to tree-lined heritage zoning and strict height clearances.',
    attentionSignals: 'Surge in NRI capital deployment from Singapore and UAE into Pune IT corridor luxury housing.',
    whyItMatters: 'Institutional investors require corridor-specific yield comparisons before allocating capital.',
    strategicImplications: 'Advisory content comparing micro-markets captures direct capital allocator interest.',
    contradictingEvidence: 'Baner-Balewadi corridor captures higher gross transaction volume due to younger tech executive buyers.',
    recommendedAction: 'Publish comprehensive Pune Micro-Market Yield Matrix.',
    suggestedContentAngle: 'Pune Luxury Penthouses 2026: Capital Preservation and Rental Yield Analysis.',
    confidenceLevel: 'High (Official Registry Data)',
    opportunityScore: 93,
    velocity: '+86% Velocity'
  },
  {
    id: 'trend-mfg-1',
    headline: 'B2B Enterprise AI Adoption: Why Precision Manufacturing Demands Autonomous Agent Bureaus',
    category: 'Technology Development',
    industry: 'Manufacturing',
    geography: 'India / Global',
    sourceName: 'Industry 4.0 Global Index & Ministry of Heavy Industries',
    originalUrl: 'https://industry40.gov.in/reports/autonomous-agents',
    publishedDate: '2026-11-12',
    retrievedDate: '2026-11-16',
    supportingEvidence: 'Tier-1 precision engineering and EV component manufacturers are replacing legacy ERP dashboards with multi-agent predictive maintenance systems.',
    attentionSignals: '₹2,200 Cr PLI modernization investments announced across North India industrial hubs.',
    whyItMatters: 'Export readiness for German and US supply chains requires real-time telemetry and zero-defect QA audits.',
    strategicImplications: 'B2B industrial marketing must shift from product specification brochures to consultative operational ROI frameworks.',
    contradictingEvidence: 'Legacy machine integration remains an integration hurdle for smaller Tier-3 vendors.',
    recommendedAction: 'Develop executive B2B framework on consultative enterprise positioning.',
    suggestedContentAngle: 'How B2B Manufacturing Companies Use Autonomous AI to Improve Sales Conversion.',
    confidenceLevel: 'High (Verified Industrial Benchmark)',
    opportunityScore: 91,
    velocity: '+80% Velocity'
  }
];

export const INITIAL_AI_MODELS = {
  gemini: {
    name: 'Google Gemini',
    provider: 'google',
    status: 'connected',
    apiKeyMasked: 'AQ.Ab8RN••••••••••••••••••••••••••••••••',
    activeModel: 'gemini-2.5-flash',
    supportedModels: ['gemini-2.5-flash', 'gemini-2.5-pro', 'nano-banana-pro-preview'],
    assignedDepartments: ['DPT 1: Intake & Trend Scorer', 'DPT 2: Fact & Competitor Research', 'DPT 4: Visual Studio']
  },
  claude: {
    name: 'Anthropic Claude',
    provider: 'anthropic',
    status: 'ready_to_connect',
    apiKeyMasked: '',
    activeModel: 'claude-3-5-sonnet-20241022',
    supportedModels: ['claude-3-5-sonnet-20241022', 'claude-3-5-haiku-20241022', 'claude-3-opus-20240229'],
    assignedDepartments: ['DPT 3: Master Editorial Bureau']
  },
  openai: {
    name: 'OpenAI',
    provider: 'openai',
    status: 'ready_to_connect',
    apiKeyMasked: '',
    activeModel: 'gpt-4o',
    supportedModels: ['gpt-4o', 'gpt-4o-mini', 'o1-preview'],
    assignedDepartments: ['DPT 5: QA & SEO Audit Gate']
  }
};
