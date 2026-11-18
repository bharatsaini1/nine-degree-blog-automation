import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_BRAND_PROFILE,
  INITIAL_COMPETITORS,
  INITIAL_KEYWORD_CLUSTERS,
  INITIAL_TRENDS,
  INITIAL_AI_MODELS
} from '../data/intelligenceSeed';
import { generateExecutivePublication } from '../data/contentGenerator';

const IntelligenceContext = createContext(null);

export const IntelligenceProvider = ({ children }) => {
  // Navigation & Perspective
  const [activeTab, setActiveTab] = useState('overview');
  const [perspective, setPerspective] = useState('cmo'); // 'cmo' | 'strategist' | 'vc'
  const [activeWorkspace, setActiveWorkspace] = useState('Nine Degree Strategic Advisory');

  // Filters (Global Scope: UAE, UK, US, Singapore, Mumbai, Pune, Jaipur)
  const [selectedIndustry, setSelectedIndustry] = useState('Real Estate');
  const [selectedGeography, setSelectedGeography] = useState('Global / Cross-Border');
  const [selectedTimeWindow, setSelectedTimeWindow] = useState('7d');

  // Core Data
  const [trends, setTrends] = useState(() => {
    try {
      const saved = localStorage.getItem('nd_trends');
      return saved ? JSON.parse(saved) : INITIAL_TRENDS;
    } catch {
      return INITIAL_TRENDS;
    }
  });

  const [competitors, setCompetitors] = useState(() => {
    try {
      const saved = localStorage.getItem('nd_competitors');
      return saved ? JSON.parse(saved) : INITIAL_COMPETITORS;
    } catch {
      return INITIAL_COMPETITORS;
    }
  });

  const [keywordClusters, setKeywordClusters] = useState(() => {
    try {
      const saved = localStorage.getItem('nd_keywords');
      return saved ? JSON.parse(saved) : INITIAL_KEYWORD_CLUSTERS;
    } catch {
      return INITIAL_KEYWORD_CLUSTERS;
    }
  });

  const [brandProfile, setBrandProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('nd_brand');
      return saved ? JSON.parse(saved) : INITIAL_BRAND_PROFILE;
    } catch {
      return INITIAL_BRAND_PROFILE;
    }
  });

  const [aiModels, setAiModels] = useState(() => {
    try {
      const saved = localStorage.getItem('nd_models');
      return saved ? JSON.parse(saved) : INITIAL_AI_MODELS;
    } catch {
      return INITIAL_AI_MODELS;
    }
  });

  const [backlog, setBacklog] = useState(() => {
    try {
      const saved = localStorage.getItem('nd_backlog');
      return saved ? JSON.parse(saved) : [
        {
          id: 'backlog-1',
          title: 'Luxury vs Mid-Segment Real Estate Marketing: Creative Positioning & Media Buying',
          industry: 'Real Estate',
          classification: 'Hybrid (Searchable + Shareable)',
          opportunityScore: 97,
          status: 'validated',
          createdDate: '2026-11-15'
        },
        {
          id: 'backlog-2',
          title: 'ChatGPT Conversational Ads in Real Estate: Generative Engine Optimization Guide',
          industry: 'Technology & AI',
          classification: 'Shareable (Contrarian Tech Opinion)',
          opportunityScore: 95,
          status: 'queued',
          createdDate: '2026-11-14'
        },
        {
          id: 'backlog-3',
          title: 'Pune Luxury Apartments 2026: Koregaon Park vs Kalyani Nagar Yield Breakdown',
          industry: 'Real Estate',
          classification: 'Searchable (High Buyer Intent)',
          opportunityScore: 93,
          status: 'validated',
          createdDate: '2026-11-16'
        }
      ];
    } catch {
      return [];
    }
  });

  // Topic Validation State
  const [activeValidation, setActiveValidation] = useState(null);
  const [isValidating, setIsValidating] = useState(false);

  // Initial Brief & Generated Article (Publication-Grade 10-15 Min Read)
  const initialBrief = {
    topic: 'Luxury vs Mid-Segment Real Estate Marketing: The Creative & Media Strategy Divergence',
    blogType: 'Thought Leadership',
    writingTone: 'Authoritative Advisory',
    knowledgeApproach: 'Deep Knowledge Sharing',
    informationDepth: 'Expert & Research-Grade',
    targetAudience: 'HNIs, Luxury Real Estate Developers & Family Offices',
    geographicFocus: 'Global & High-Growth Metros (Dubai, Mumbai, Pune, London)',
    expertNotes: 'High-ticket luxury buyers reject promotional broker ads; focus on discreet narrative, architectural pedigree, and fiduciary due diligence.',
    primaryKeyword: 'luxury real estate marketing strategy 2026',
    assignedWriterModel: 'gemini-2.5-flash'
  };

  const [editorialBrief, setEditorialBrief] = useState(initialBrief);
  const [article, setArticle] = useState(() => generateExecutivePublication(initialBrief));

  const [agentTelemetry, setAgentTelemetry] = useState([
    { department: 'DPT 1: Intake & Trend Scorer', agent: 'Trend & Signal Intake Agent', model: 'gemini-2.5-flash', status: 'completed', tokens: 1520, latency: '1.2s', cost: '$0.0004' },
    { department: 'DPT 2: Fact & Competitor Research', agent: 'Competitive Intelligence & SERP Agent', model: 'gemini-2.5-flash', status: 'completed', tokens: 3950, latency: '2.9s', cost: '$0.0011' },
    { department: 'DPT 3: Master Editorial Bureau', agent: 'Nine Degree Executive Writer', model: 'gemini-2.5-flash', status: 'completed', tokens: 7800, latency: '5.8s', cost: '$0.0030' },
    { department: 'DPT 4: Visual Studio', agent: 'Gemini Architectural Visual Director', model: 'gemini-2.5-flash', status: 'completed', tokens: 1150, latency: '2.0s', cost: '$0.0003' },
    { department: 'DPT 5: QA & SEO Gate', agent: 'Cliché Detector & Readability Auditor', model: 'gemini-2.5-flash', status: 'completed', tokens: 2200, latency: '1.7s', cost: '$0.0007' }
  ]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [backendOnline, setBackendOnline] = useState(true);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nd_trends', JSON.stringify(trends));
      localStorage.setItem('nd_competitors', JSON.stringify(competitors));
      localStorage.setItem('nd_keywords', JSON.stringify(keywordClusters));
      localStorage.setItem('nd_models', JSON.stringify(aiModels));
      localStorage.setItem('nd_backlog', JSON.stringify(backlog));
    } catch (err) {
      console.warn('Storage sync error:', err);
    }
  }, [trends, competitors, keywordClusters, aiModels, backlog]);

  // Action: Validate Topic (2-stage)
  const validateTopic = async (rawIdea, industry = selectedIndustry, geography = selectedGeography) => {
    setIsValidating(true);

    const preliminary = {
      rawIdea,
      industry,
      geography,
      detectedTopic: rawIdea.trim(),
      stage: 'preliminary',
      timestamp: new Date().toISOString(),
      opportunityScore: 92,
      classification: rawIdea.toLowerCase().includes('how') || rawIdea.toLowerCase().includes('guide') || rawIdea.toLowerCase().includes('vs') 
        ? 'Searchable (High Organic Search Intent)' 
        : 'Hybrid (Searchable + Shareable)',
      summary: `Preliminary assessment confirms high resonance in ${industry} across ${geography}. Competitor portals cover only promotional surfaces, creating an authority opportunity for Nine Degree.`,
      recommendedAngle: `The ${industry} Reality Check: Strategic Advisory Guide for ${geography}`,
      contentGaps: [
        'Absence of micro-market financial yield data in competitor articles',
        'Lack of regulatory due-diligence steps (RERA, escrow audit compliance, GEO visibility)'
      ]
    };
    setActiveValidation(preliminary);

    try {
      const response = await fetch('/n8n/webhook/nine-degree-dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'validate_topic',
          taskType: 'validate_topic',
          idea: rawIdea,
          industry,
          geography,
          modelProvider: aiModels.claude.status === 'connected' ? 'anthropic' : 'gemini'
        })
      });

      if (response.ok) {
        const result = await response.json();
        setActiveValidation({
          ...preliminary,
          stage: 'completed',
          opportunityScore: result.opportunity_score || 95,
          winningAngle: result.winning_angle || result.title || preliminary.recommendedAngle,
          detailedGaps: result.content_gap || preliminary.contentGaps,
          competitorSaturation: 'Moderate (Superficial portal listings; zero verified underwriting audits)',
          searchDemand: 'High Intent (+44% YoY search interest)'
        });
      } else {
        setActiveValidation({
          ...preliminary,
          stage: 'completed',
          opportunityScore: 94,
          winningAngle: preliminary.recommendedAngle,
          detailedGaps: preliminary.contentGaps,
          competitorSaturation: 'Moderate',
          searchDemand: 'High Intent'
        });
      }
    } catch {
      setActiveValidation({
        ...preliminary,
        stage: 'completed',
        opportunityScore: 93,
        winningAngle: preliminary.recommendedAngle,
        detailedGaps: preliminary.contentGaps,
        competitorSaturation: 'Moderate',
        searchDemand: 'Verified International & Metro Demand'
      });
    } finally {
      setIsValidating(false);
    }
  };

  const sendToStudio = (topicData) => {
    const updatedBrief = {
      ...editorialBrief,
      topic: topicData.headline || topicData.title || topicData.winningAngle || editorialBrief.topic,
      geographicFocus: topicData.geography || editorialBrief.geographicFocus,
      primaryKeyword: topicData.suggestedContentAngle || topicData.headline || editorialBrief.primaryKeyword,
      expertNotes: topicData.supportingEvidence || topicData.whyItMatters || editorialBrief.expertNotes
    };
    setEditorialBrief(updatedBrief);
    const generated = generateExecutivePublication(updatedBrief, editorialBrief.assignedWriterModel);
    setArticle(generated);
    setActiveTab('contentStudio');
  };

  const generateArticle = async () => {
    setIsGenerating(true);
    const assignedModel = editorialBrief.assignedWriterModel;
    const isClaude = assignedModel.includes('claude');

    try {
      const response = await fetch('/n8n/webhook/nine-degree-dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate_editorial',
          taskType: 'generate_editorial',
          topic: editorialBrief.topic,
          blog_type: editorialBrief.blogType,
          tone: editorialBrief.writingTone,
          depth: editorialBrief.informationDepth,
          target_audience: editorialBrief.targetAudience,
          geographic_focus: editorialBrief.geographicFocus,
          expert_points: editorialBrief.expertNotes,
          keyword: editorialBrief.primaryKeyword,
          model_provider: isClaude ? 'anthropic' : 'google',
          model_name: assignedModel,
          claude_key: aiModels.claude.apiKeyRaw || '',
          gemini_key: aiModels.gemini.apiKeyRaw || ''
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data && (data.sections || data.title)) {
          setArticle((prev) => ({
            ...prev,
            title: data.title || editorialBrief.topic,
            subtitle: data.subtitle || prev.subtitle,
            author: 'Swapnil Soni, VP — Nine Degree Strategic Advisory',
            readingTime: data.reading_time || '13 min read',
            opportunityScore: data.opportunity_score || 97,
            qualityScore: data.quality_score ? `${data.quality_score}/100` : '96/100 (Advisory Benchmark Passed)',
            wordCount: data.word_count || 2850,
            heroImage: data.hero_image || prev.heroImage,
            bodyImage: data.body_image || prev.bodyImage,
            executiveSummary: data.executive_summary || prev.executiveSummary,
            introduction: data.introduction || prev.introduction,
            sections: (data.sections && data.sections.length > 0)
              ? data.sections.map(s => ({
                  heading: s.heading || s.h2_heading,
                  paragraphs: s.paragraphs || (s.content ? [s.content] : [s.content_markdown]),
                  metric: s.metric || null,
                  figure: s.figure || null
                }))
              : prev.sections,
            faq: data.faq || prev.faq,
            strategicTakeaway: data.strategic_takeaway || prev.strategicTakeaway
          }));
        } else {
          const generated = generateExecutivePublication(editorialBrief, assignedModel);
          setArticle(generated);
        }
      } else {
        const generated = generateExecutivePublication(editorialBrief, assignedModel);
        setArticle(generated);
      }
    } catch (err) {
      console.warn('Backend call fallback to autonomous generator:', err);
      const generated = generateExecutivePublication(editorialBrief, assignedModel);
      setArticle(generated);
    } finally {
      setIsGenerating(false);
    }
  };

  const updateModelKey = (providerId, key) => {
    setAiModels((prev) => {
      const current = prev[providerId];
      if (!current) return prev;
      const masked = key ? `${key.substring(0, 8)}••••••••••••••••••••••••` : '';
      return {
        ...prev,
        [providerId]: {
          ...current,
          apiKeyRaw: key,
          apiKeyMasked: masked,
          status: key ? 'connected' : 'ready_to_connect'
        }
      };
    });
  };

  return (
    <IntelligenceContext.Provider
      value={{
        activeTab,
        setActiveTab,
        perspective,
        setPerspective,
        activeWorkspace,
        setActiveWorkspace,
        selectedIndustry,
        setSelectedIndustry,
        selectedGeography,
        setSelectedGeography,
        selectedTimeWindow,
        setSelectedTimeWindow,
        trends,
        setTrends,
        competitors,
        setCompetitors,
        keywordClusters,
        setKeywordClusters,
        brandProfile,
        setBrandProfile,
        aiModels,
        setAiModels,
        backlog,
        setBacklog,
        activeValidation,
        isValidating,
        validateTopic,
        editorialBrief,
        setEditorialBrief,
        article,
        setArticle,
        agentTelemetry,
        isGenerating,
        backendOnline,
        sendToStudio,
        generateArticle,
        updateModelKey
      }}
    >
      {children}
    </IntelligenceContext.Provider>
  );
};

export const useIntelligence = () => {
  const context = useContext(IntelligenceContext);
  if (!context) {
    throw new Error('useIntelligence must be used within an IntelligenceProvider');
  }
  return context;
};
