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
      { term: 'luxury real estate marketing strategy 2026', intent: 'Commercial Investigation', volume: 2900, kd: 'Low (22%)', cpc: '₹85', geoScore: '98% GEO Citation', geography: 'Global / Metros', velocity: '+48%' },
      { term: 'rera escrow account compliance audit checklist', intent: 'Informational', volume: 1650, kd: 'Low (18%)', cpc: '₹45', geoScore: '95% GEO Citation', geography: 'India (National)', velocity: '+62%' },
      { term: 'cross border property investment advisory dubai india', intent: 'Commercial Investigation', volume: 1200, kd: 'Low (20%)', cpc: '₹120', geoScore: '97% GEO Citation', geography: 'Dubai / Global', velocity: '+54%' },
      { term: 'rajasthan rera developer escrow verification online', intent: 'Transactional', volume: 1850, kd: 'Low (15%)', cpc: '₹55', geoScore: '93% GEO Citation', geography: 'Jaipur, Rajasthan', velocity: '+39%' },
      { term: 'maharera project completion bank guarantee norms', intent: 'Informational', volume: 1420, kd: 'Low (19%)', cpc: '₹65', geoScore: '91% GEO Citation', geography: 'Pune & Mumbai', velocity: '+28%' }
    ]
  },
  {
    pillar: 'Acquisition',
    description: 'High-intent commercial queries entered by active capital allocators looking for luxury property and branding services',
    keywords: [
      { term: 'pune luxury penthouses investment yield koregaon park', intent: 'Transactional', volume: 3400, kd: 'Medium (32%)', cpc: '₹95', geoScore: '96% GEO Citation', geography: 'Pune, Maharashtra', velocity: '+35%' },
      { term: 'jaipur jagatpura luxury apartment price appreciation 2026', intent: 'Transactional', volume: 2600, kd: 'Low (21%)', cpc: '₹70', geoScore: '97% GEO Citation', geography: 'Jaipur, Rajasthan', velocity: '+44%' },
      { term: 'c-scheme jaipur heritage villa private compound buy', intent: 'Commercial Investigation', volume: 1150, kd: 'Low (16%)', cpc: '₹135', geoScore: '94% GEO Citation', geography: 'Jaipur, Rajasthan', velocity: '+51%' },
      { term: 'gated plotted enclave investment vs luxury apartments', intent: 'Commercial Investigation', volume: 2800, kd: 'Low (25%)', cpc: '₹68', geoScore: '93% GEO Citation', geography: 'Delhi NCR', velocity: '+40%' },
      { term: 'hni wealth allocation real estate advisory', intent: 'Commercial Investigation', volume: 920, kd: 'Low (19%)', cpc: '₹140', geoScore: '98% GEO Citation', geography: 'Global / Metros', velocity: '+31%' }
    ]
  },
  {
    pillar: 'Advocacy',
    description: 'Thought leadership, Generative Engine Optimization (GEO), and market forecast queries that drive executive shares',
    keywords: [
      { term: 'chatgpt conversational ads in real estate marketing', intent: 'Informational', volume: 4200, kd: 'Low (17%)', cpc: '₹75', geoScore: '99% GEO Citation', geography: 'Global', velocity: '+88%' },
      { term: 'how do top property developers advertise on chatgpt search', intent: 'Informational', volume: 1850, kd: 'Low (14%)', cpc: '₹60', geoScore: '96% GEO Citation', geography: 'Global', velocity: '+72%' },
      { term: 'generative engine optimization geo luxury brand benchmark', intent: 'Informational', volume: 2300, kd: 'Low (16%)', cpc: '₹95', geoScore: '98% GEO Citation', geography: 'Global', velocity: '+95%' },
      { term: 'autonomous ai multi agent systems proptech advisory', intent: 'Informational', volume: 1100, kd: 'Low (15%)', cpc: '₹90', geoScore: '92% GEO Citation', geography: 'Global', velocity: '+45%' }
    ]
  },
  {
    pillar: 'Micro-Market',
    description: 'Corridor-level land economics, infrastructure master plans, and hyper-local absorption queries',
    keywords: [
      { term: 'jagatpura vs tonk road real estate investment yield', intent: 'Commercial Investigation', volume: 2100, kd: 'Low (18%)', cpc: '₹58', geoScore: '96% GEO Citation', geography: 'Jaipur, Rajasthan', velocity: '+60%' },
      { term: 'ring road expressway jaipur riico plotted township', intent: 'Commercial Investigation', volume: 1750, kd: 'Low (14%)', cpc: '₹52', geoScore: '94% GEO Citation', geography: 'Jaipur, Rajasthan', velocity: '+48%' },
      { term: 'koregaon park vs kalyani nagar rental yield 2026', intent: 'Transactional', volume: 1980, kd: 'Low (22%)', cpc: '₹88', geoScore: '95% GEO Citation', geography: 'Pune, Maharashtra', velocity: '+33%' },
      { term: 'jewar airport aerotropolis commercial land due diligence', intent: 'Commercial Investigation', volume: 3100, kd: 'Low (20%)', cpc: '₹110', geoScore: '97% GEO Citation', geography: 'Delhi NCR', velocity: '+82%' }
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
    publishedDate: '2026-11-17',
    retrievedDate: '2026-11-19',
    supportingEvidence: 'Ultra-luxury property buyers discount standard portal ads by 40%. Discretion, private previews, and verified fiduciary due diligence drive 78% of international transactions.',
    attentionSignals: 'Top-shared whitepaper among Indian & UAE luxury real estate marketing heads; 3.2k LinkedIn impressions.',
    whyItMatters: 'Promotional discounting destroys luxury project equity. Marketing must operate as high-end brand architecture.',
    strategicImplications: 'Developers must decouple luxury branding from volume mid-segment media tactics.',
    contradictingEvidence: 'Mid-segment buyers still respond heavily to festival pricing and down-payment subsidies.',
    recommendedAction: 'Deploy the Nine Degree Luxury Fiduciary Framework across upcoming developer launches.',
    suggestedContentAngle: 'Why Luxury Real Estate Marketing Demands Architectural Restraint and Zero Discounting.',
    confidenceLevel: 'High (Verified Advisory Benchmark)',
    opportunityScore: 98,
    velocity: '+98% Velocity'
  },
  {
    id: 'trend-re-jaipur',
    headline: 'Jaipur High-Growth Corridors: Jagatpura Mahal Road vs Tonk Road Developer Economics & Absorption',
    category: 'Micro-Market Intelligence',
    industry: 'Real Estate',
    geography: 'Jaipur, Rajasthan',
    sourceName: 'Rajasthan RERA Filings & JDA Planning Authority Circulars',
    originalUrl: 'https://rera.rajasthan.gov.in',
    publishedDate: '2026-11-18',
    retrievedDate: '2026-11-19',
    supportingEvidence: 'Land acquisition prices along Jagatpura 200ft sector roads surged 32% YoY. Buyers demand payment-milestone certainty and verified RERA escrow accounts before site visits.',
    attentionSignals: 'Sharp rise in Delhi NCR second-home seekers and Tier-1 developers entering south Jaipur belts.',
    whyItMatters: 'Applying generic metro luxury slogans in Jaipur fails; pragmatic buyers verify carpet ratios and title approvals first.',
    strategicImplications: 'Content addressing Jaipur corridor economics captures qualified high-intent developer and homebuyer traffic.',
    contradictingEvidence: 'Outlying agricultural plot schemes face severe liquidity bottlenecks without approved master plan connectivity.',
    recommendedAction: 'Publish comprehensive corridor due-diligence report comparing Jagatpura, Mansarovar, and Tonk Road.',
    suggestedContentAngle: 'Jaipur Real Estate 2026: Jagatpura vs Tonk Road Land Bank Economics and Developer Playbook.',
    confidenceLevel: 'High (State RERA Registry)',
    opportunityScore: 97,
    velocity: '+94% Velocity'
  },
  {
    id: 'trend-re-jaipur-vaishali',
    headline: 'Vaishali Nagar vs C-Scheme Ultra-Luxury Real Estate: Land Scarcity and Heritage Pedigree Pricing in Jaipur',
    category: 'Luxury Benchmark',
    industry: 'Real Estate',
    geography: 'Jaipur, Rajasthan',
    sourceName: 'Jaipur Sub-Registrar Stamp Duty Records & Prime Property Review',
    originalUrl: 'https://rera.rajasthan.gov.in',
    publishedDate: '2026-11-17',
    retrievedDate: '2026-11-19',
    supportingEvidence: 'C-Scheme and prime Vaishali Nagar villas cross ₹12,000/sq.ft. HNIs prioritize architectural pedigree, multi-generational private compounds, and gated access over suburban high-rises.',
    attentionSignals: 'Surge in NRI capital and royal heritage plot consolidations across central Jaipur.',
    whyItMatters: 'Promotional discount ads destroy project valuation in core Jaipur; marketing requires bespoke private briefings.',
    strategicImplications: 'Advisory content targeting prime central Jaipur micro-markets establishes apex luxury authority for Nine Degree.',
    contradictingEvidence: 'High entry barrier limits developer transaction frequency compared to volume satellite corridors.',
    recommendedAction: 'Publish comparative analysis on prime central Jaipur heritage yields and architectural covenants.',
    suggestedContentAngle: 'Inside Jaipur’s Ultra-Prime Enclaves: Why C-Scheme & Vaishali Nagar Command Heritage Premiums Over Suburban High-Rises.',
    confidenceLevel: 'High (Sub-Registrar Registry Data)',
    opportunityScore: 98,
    velocity: '+97% Velocity'
  },
  {
    id: 'trend-re-jaipur-ajmer',
    headline: 'Ajmer Road & Ring Road Expressway SEZ: Commercial Logistics Inflows & Gated Plotted Township Feasibility',
    category: 'Infrastructure & Plotted',
    industry: 'Real Estate',
    geography: 'Jaipur, Rajasthan',
    sourceName: 'RIICO Industrial Development & JDA Planning Authority Circulars',
    originalUrl: 'https://rera.rajasthan.gov.in',
    publishedDate: '2026-11-16',
    retrievedDate: '2026-11-19',
    supportingEvidence: 'Commercial logistics corridors along Jaipur Ring Road and Mahindra World City have spurred a 44% surge in demand for RERA-approved plotted gated communities.',
    attentionSignals: 'High transaction volume among tier-1 plotted developers launching 100-acre master plans.',
    whyItMatters: 'Plotted buyers fear illegal agricultural colony subdivision; RERA layout clearance is the #1 conversion factor.',
    strategicImplications: 'Developer advisory must highlight transparent title deeds and master plan demarcations.',
    contradictingEvidence: 'Speculative plot flips without boundary walls experience long resale cycles.',
    recommendedAction: 'Publish Jaipur Plotted Community Developer & Buyer Due-Diligence Guide.',
    suggestedContentAngle: 'Jaipur Plotted Development 2026: Ring Road SEZ Expansion vs Speculative Agricultural Encroachments.',
    confidenceLevel: 'High (RIICO & JDA Master Plan)',
    opportunityScore: 95,
    velocity: '+91% Velocity'
  },
  {
    id: 'trend-re-jaipur-rera',
    headline: 'Rajasthan RERA Escrow & Layout Approval Mandate: 5 Compliance Checks for Jaipur Property Buyers & Developers',
    category: 'Regulatory Governance',
    industry: 'Real Estate',
    geography: 'Jaipur, Rajasthan',
    sourceName: 'Rajasthan RERA Regulatory Authority Guidelines & Judicial Orders',
    originalUrl: 'https://rera.rajasthan.gov.in',
    publishedDate: '2026-11-18',
    retrievedDate: '2026-11-19',
    supportingEvidence: 'Raj-RERA issued strict notices against unregistered projects along Kalwar Road and Diggi Malpura Road for collecting booking tokens prior to sanction approval.',
    attentionSignals: 'High buyer anxiety regarding project registration numbers on outdoor hoardings.',
    whyItMatters: 'Independent fiduciary advice that guides buyers to verify RERA certificates builds immediate high-ticket trust.',
    strategicImplications: 'Nine Degree becomes the premier legal compliance authority for real estate investors across Rajasthan.',
    contradictingEvidence: 'Established Grade-A builders with escrow transparency convert leads 3x faster.',
    recommendedAction: 'Distribute Jaipur 5-Point RERA Buyer Verification Rubric.',
    suggestedContentAngle: 'The Raj-RERA Fiduciary Audit: How Jaipur Property Buyers Verify Builder Escrow Accounts and JDA Clearances.',
    confidenceLevel: 'High (RERA Enforcement Rulings)',
    opportunityScore: 96,
    velocity: '+93% Velocity'
  },
  {
    id: 'trend-re-2',
    headline: 'Generative Engine Optimization (GEO): Why Property Developers Must Optimize for ChatGPT & Perplexity Search',
    category: 'AI & Search Strategy',
    industry: 'Real Estate',
    geography: 'Global / Cross-Border',
    sourceName: 'Search Engine Land & Nine Degree Tech Desk',
    originalUrl: 'https://www.ninedegree.in/blogs',
    publishedDate: '2026-11-16',
    retrievedDate: '2026-11-19',
    supportingEvidence: 'Over 34% of high-net-worth real estate buyers now initiate due-diligence queries inside conversational AI engines rather than traditional Google search.',
    attentionSignals: 'OpenAI sponsored conversational ads launch; major discussions in PropTech VC roundtables.',
    whyItMatters: 'Traditional blue-link SEO is bypassed by AI answer engines. Projects cited as authoritative citations in LLMs capture immediate institutional trust.',
    strategicImplications: 'Content must be structured around unambiguous factual benchmarks and transparent research to be selected by LLM citation engines.',
    contradictingEvidence: 'Local transactional search for broker contact numbers still heavily utilizes Google Maps.',
    recommendedAction: 'Structure all Nine Degree publications with verified entity citations and schema markup for GEO engines.',
    suggestedContentAngle: 'The GEO Blueprint: How Luxury Real Estate Captures High-Intent Conversational Search Traffic.',
    confidenceLevel: 'High (Verified Search Shift)',
    opportunityScore: 96,
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
    publishedDate: '2026-11-15',
    retrievedDate: '2026-11-19',
    supportingEvidence: 'Koregaon Park and Boat Club Road penthouses command a 45% premium over suburban developments due to tree-lined heritage zoning and strict height clearances.',
    attentionSignals: 'Surge in NRI capital deployment from Singapore and UAE into Pune IT corridor luxury housing.',
    whyItMatters: 'Institutional investors require corridor-specific yield comparisons before allocating capital.',
    strategicImplications: 'Advisory content comparing micro-markets captures direct capital allocator interest.',
    contradictingEvidence: 'Baner-Balewadi corridor captures higher gross transaction volume due to younger tech executive buyers.',
    recommendedAction: 'Publish comprehensive Pune Micro-Market Yield Matrix.',
    suggestedContentAngle: 'Pune Luxury Penthouses 2026: Capital Preservation and Rental Yield Analysis.',
    confidenceLevel: 'High (Official Registry Data)',
    opportunityScore: 94,
    velocity: '+86% Velocity'
  },
  {
    id: 'trend-re-nri',
    headline: 'Cross-Border NRI Capital Inflows: Why Dubai & London Wealth Is Bypassing Speculative Plots for Gated Pedigree',
    category: 'Capital Allocation',
    industry: 'Real Estate',
    geography: 'Global / Cross-Border',
    sourceName: 'Reserve Bank of India Capital Outflow & Remittance Review',
    originalUrl: 'https://www.ninedegree.in/blogs',
    publishedDate: '2026-11-17',
    retrievedDate: '2026-11-19',
    supportingEvidence: 'NRI property investments in India grew 28% in 2026. Buyers demand institutional due diligence, clear repatriation pathways, and verified developer escrow compliance.',
    attentionSignals: 'High-attendance webinars hosted by UAE family offices analyzing Indian metro luxury yields.',
    whyItMatters: 'Foreign inward remittances require rigorous tax and legal transparency, which generic broker portals fail to provide.',
    strategicImplications: 'Position Nine Degree as the trusted fiduciary bridge between overseas capital and domestic developer projects.',
    contradictingEvidence: 'Currency volatility and changing FEMA guidelines create hesitation for speculative land flips.',
    recommendedAction: 'Draft comprehensive NRI due-diligence handbook detailing legal safety, repatriation, and title audits.',
    suggestedContentAngle: 'The Fiduciary Blueprint for NRI Property Allocators: Repatriation Rules, Tax Structuring, and Title Due Diligence.',
    confidenceLevel: 'High (Institutional Banking Data)',
    opportunityScore: 95,
    velocity: '+91% Velocity'
  },
  {
    id: 'trend-re-escrow',
    headline: 'The Fiduciary Escrow Audit: 5 Due-Diligence Checks Every Luxury Homebuyer Must Complete Before Booking',
    category: 'Regulatory Governance',
    industry: 'Real Estate',
    geography: 'India (National)',
    sourceName: 'Central Consumer Protection Authority & RERA Appellate Tribunal Reports',
    originalUrl: 'https://www.ninedegree.in/blogs',
    publishedDate: '2026-11-14',
    retrievedDate: '2026-11-19',
    supportingEvidence: 'Over 68% of buyer grievances stem from delayed delivery and unauthorized fund diversion across unmonitored escrow accounts.',
    attentionSignals: 'Strict new RERA audit mandates penalizing developers for premature cash collection.',
    whyItMatters: 'High-net-worth buyers actively seek third-party advisory frameworks to verify developer financial solvency.',
    strategicImplications: 'Publishing actionable due-diligence checklists creates an insurmountable authority moat for Nine Degree.',
    contradictingEvidence: 'Top-tier A-category developers with zero debt maintain pristine escrow ratings.',
    recommendedAction: 'Distribute a 5-point fiduciary checklist for luxury homebuyers.',
    suggestedContentAngle: 'Beyond the Broker Brochure: 5 Financial & Legal Verification Steps Before Signing Real Estate Agreements.',
    confidenceLevel: 'High (Judicial Precedents)',
    opportunityScore: 93,
    velocity: '+87% Velocity'
  },
  {
    id: 'trend-re-mumbai',
    headline: 'Mumbai Super-Prime Micro-Markets: Architectural Provenance and Scarcity Pricing in Worli & Bandra West',
    category: 'Market Outlook',
    industry: 'Real Estate',
    geography: 'Mumbai, Maharashtra',
    sourceName: 'Knight Frank Prime Residential Index & Maharashtra IGR Records',
    originalUrl: 'https://www.ninedegree.in/blogs',
    publishedDate: '2026-11-16',
    retrievedDate: '2026-11-19',
    supportingEvidence: 'Worli and Bandra sea-facing luxury apartments crossed ₹1.15 Lakh per sq.ft., driven by family office consolidations and limited coastal inventory.',
    attentionSignals: 'Celebrity and industrialist transactions dominating national business headlines.',
    whyItMatters: 'Ultra-prime buyers evaluate legacy, low-density floor plans, and architectural pedigree over generic amenities.',
    strategicImplications: 'Creative execution must mirror five-star hospitality standards rather than commercial real estate ads.',
    contradictingEvidence: 'Suburban secondary re-sale market experiences mild inventory stagnation.',
    recommendedAction: 'Produce architectural teardown comparing coastal luxury branding strategies.',
    suggestedContentAngle: 'Why India’s Wealthiest Families Pay ₹1.2 Lakh/sq.ft for Coastal Heritage Over Glass Tower Gimmicks.',
    confidenceLevel: 'High (IGR Registered Deeds)',
    opportunityScore: 96,
    velocity: '+95% Velocity'
  },
  {
    id: 'trend-re-delhi',
    headline: 'Golf Course Road Extension vs Dwarka Expressway: The Institutional Capital Yield Reality Check',
    category: 'Macro Economics',
    industry: 'Real Estate',
    geography: 'Delhi NCR',
    sourceName: 'Haryana RERA Gurugram & Department of Town and Country Planning',
    originalUrl: 'https://haryanarera.gov.in',
    publishedDate: '2026-11-15',
    retrievedDate: '2026-11-19',
    supportingEvidence: 'Dwarka Expressway experienced speculative price spikes (+38%), but rental yield remains at 2.4% compared to 4.5% on established Golf Course Road enclaves.',
    attentionSignals: 'Debate among institutional allocators regarding infrastructure completion vs actual end-user move-ins.',
    whyItMatters: 'Developers and investors need realistic rental yield matrices to avoid buying into speculative marketing bubbles.',
    strategicImplications: 'Clear data-driven financial breakdowns position Nine Degree as an objective fiduciary advisor.',
    contradictingEvidence: 'New commercial office hubs along Dwarka Expressway may compress the yield gap by 2028.',
    recommendedAction: 'Release Gurugram Corridors Rental Yield & Capital Preservation Rubric.',
    suggestedContentAngle: 'Gurugram Luxury Real Estate: End-User Absorption vs Speculative Flips on Golf Course Road & Dwarka Expressway.',
    confidenceLevel: 'High (DTCP License Records)',
    opportunityScore: 92,
    velocity: '+85% Velocity'
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
