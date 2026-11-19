import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        if self._pageNumber == 1:
            return  # Skip cover page
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#71717a"))
        
        # Header
        self.drawString(54, 11 * 72 - 36, "Nine Degree Strategic Editorial OS 2.0 — Operations Manual & IDE Guide")
        self.setStrokeColor(colors.HexColor("#e4e4e7"))
        self.setLineWidth(0.5)
        self.line(54, 11 * 72 - 42, 8.5 * 72 - 54, 11 * 72 - 42)
        
        # Footer
        self.line(54, 45, 8.5 * 72 - 54, 45)
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(8.5 * 72 - 54, 32, page_str)
        self.drawString(54, 32, "CONFIDENTIAL & PROPRIETARY — NINE DEGREE BRAND ADVISORY")
        self.restoreState()

def create_manual_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()
    
    # Custom Brand Palette
    c_primary = colors.HexColor("#e43d25")   # Nine Degree Vermilion
    c_dark = colors.HexColor("#111114")      # Obsidian Black
    c_charcoal = colors.HexColor("#27272a")  # Slate Charcoal
    c_muted = colors.HexColor("#71717a")     # Muted Gray
    c_card_bg = colors.HexColor("#f8fafc")   # Light Gray Card
    c_border = colors.HexColor("#e2e8f0")    # Border Gray

    # Typography Styles
    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=26,
        leading=32,
        textColor=c_dark,
        spaceAfter=8
    )

    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=c_primary,
        spaceAfter=20
    )

    h1_style = ParagraphStyle(
        'Heading1_Custom',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
        textColor=c_dark,
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'Heading2_Custom',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=c_primary,
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=c_charcoal,
        spaceAfter=6
    )

    bullet_style = ParagraphStyle(
        'Bullet_Custom',
        parent=body_style,
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=4
    )

    code_style = ParagraphStyle(
        'Code_Custom',
        parent=styles['Code'],
        fontName='Courier',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor("#0f172a"),
        backColor=colors.HexColor("#f1f5f9"),
        borderPadding=6,
        spaceAfter=6
    )

    callout_style = ParagraphStyle(
        'Callout_Text',
        parent=body_style,
        fontSize=9,
        leading=13,
        textColor=colors.HexColor("#0f172a")
    )

    story = []

    # =========================================================================
    # COVER / HEADER PAGE
    # =========================================================================
    story.append(Spacer(1, 20))
    story.append(Paragraph("NINE DEGREE STRATEGIC EDITORIAL OS 2.0", subtitle_style))
    story.append(Paragraph("Comprehensive Operations Manual & Antigravity IDE Setup Guide", title_style))
    story.append(Paragraph("<b>Version:</b> 2.0.0 &nbsp;|&nbsp; <b>Author:</b> Nine Degree Strategic Architecture Bureau &nbsp;|&nbsp; <b>Date:</b> November 2026", body_style))
    story.append(Spacer(1, 8))
    story.append(HRFlowable(width="100%", thickness=2, color=c_primary, spaceBefore=4, spaceAfter=14))

    # Executive Abstract Box
    abstract_text = (
        "<b>Executive Summary:</b> The Nine Degree Strategic Editorial OS is a fiduciary-grade, "
        "multi-agent intelligence and publishing operating system tailored for real estate brand advisory, "
        "high-intent investor signal monitoring, and Generative Engine Optimization (GEO). "
        "This manual provides step-by-step instructions for collaborators on downloading and running the code "
        "using the <b>Antigravity IDE & CLI (<code>agy</code>)</b>, walks through every one of the 14 interactive features, "
        "and details production deployment onto Cloudflare Pages and n8n."
    )
    abstract_table = Table([[Paragraph(abstract_text, callout_style)]], colWidths=[504])
    abstract_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#fff1f0")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#ffccc7")),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(abstract_table)
    story.append(Spacer(1, 14))

    # =========================================================================
    # CHAPTER 1: DOWNLOADING & RUNNING WITH ANTIGRAVITY IDE & CLI
    # =========================================================================
    story.append(Paragraph("Chapter 1: Getting Started with Antigravity IDE & CLI (<code>agy</code>)", h1_style))
    story.append(Paragraph(
        "Follow these steps to set up the project on your machine using <b>Antigravity IDE</b> and the <b>Antigravity CLI (<code>agy</code>)</b>:",
        body_style
    ))

    setup_steps = [
        ("Step 1: Clone the GitHub Repository", 
         "Open your terminal or command prompt and clone the repository onto your computer:<br/>"
         "<code>git clone https://github.com/bharatsaini1/nine-degree-blog-automation.git</code><br/>"
         "<code>cd nine-degree-blog-automation</code>"),
        ("Step 2: Open in Antigravity IDE",
         "Launch the <b>Antigravity IDE</b>. Click <b>File ➔ Open Folder...</b> and select the cloned repository directory.<br/>"
         "<i>Tip:</i> If using the Antigravity command line tool, simply run: <code>agy open .</code> from your terminal."),
        ("Step 3: Install Dashboard Dependencies",
         "Navigate to the dashboard frontend folder and install the required packages:<br/>"
         "<code>cd \"blog automation/dashboard\"</code><br/>"
         "<code>npm install</code>"),
        ("Step 4: Launch the Local Vite Server",
         "Start the local development server:<br/>"
         "<code>npm run dev</code><br/>"
         "The dashboard will be accessible immediately in Chrome at: <b>http://localhost:3333</b>."),
        ("Step 5: (Optional) Launch Local n8n Automation Engine",
         "If you wish to test real-time background multi-agent workflows locally:<br/>"
         "Run <code>n8n start</code> in a separate terminal. n8n will start on port <b>5678</b>. "
         "The Vite dashboard has a built-in proxy that automatically forwards all <code>/n8n/*</code> webhook calls to port 5678.")
    ]

    for title, desc in setup_steps:
        t = Table([[Paragraph(f"<b>{title}</b>", h2_style)], [Paragraph(desc, body_style)]], colWidths=[504])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), c_card_bg),
            ('BOX', (0,0), (-1,-1), 1, c_border),
            ('TOPPADDING', (0,0), (-1,-1), 6),
            ('BOTTOMPADDING', (0,0), (-1,-1), 6),
            ('LEFTPADDING', (0,0), (-1,-1), 10),
            ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ]))
        story.append(t)
        story.append(Spacer(1, 6))

    story.append(PageBreak())

    # =========================================================================
    # CHAPTER 2: SYSTEM ARCHITECTURE & 5-DEPARTMENT MULTI-AGENT ENGINE
    # =========================================================================
    story.append(Paragraph("Chapter 2: System Architecture & 5-Department Multi-Agent Framework", h1_style))
    story.append(Paragraph(
        "The system operates on an interconnected multi-agent pipeline divided into 5 autonomous departments. "
        "Every publication must satisfy strict fiduciary and compliance criteria before release.",
        body_style
    ))

    departments_data = [
        ["Department", "Agent Role", "Core Responsibilities & Output"],
        ["Dept 1", "Market Signal Ingestion", "Scans real estate news, RERA registries, macroeconomic trends, and competitor SERPs."],
        ["Dept 2", "Topic & Strategy Validator", "Runs 100-point opportunity scoring formula (fiduciary moat, search intent, GEO citation potential)."],
        ["Dept 3", "Chief Real Estate Analyst", "Synthesizes data-backed strategic advisories, circle rates, escrow milestones, and court precedents."],
        ["Dept 4", "Visual Studio Designer", "Generates and formats 4K architectural visuals, infographics, and hero cover figures."],
        ["Dept 5", "QA & Governance Gatekeeper", "Audits drafts against Banned AI Clichés, verifies RERA references, and requires Human Executive sign-off."]
    ]
    dept_table = Table(departments_data, colWidths=[64, 140, 300])
    dept_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_dark),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,0), 9),
        ('BOTTOMPADDING', (0,0), (-1,0), 6),
        ('TOPPADDING', (0,0), (-1,0), 6),
        ('BACKGROUND', (0,1), (-1,-1), colors.white),
        ('GRID', (0,0), (-1,-1), 0.5, c_border),
        ('FONTNAME', (0,1), (-1,-1), 'Helvetica'),
        ('FONTSIZE', (0,1), (-1,-1), 8.5),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,1), (-1,-1), 6),
        ('BOTTOMPADDING', (0,1), (-1,-1), 6),
    ]))
    story.append(dept_table)
    story.append(Spacer(1, 14))

    # =========================================================================
    # CHAPTER 3: FEATURE-BY-FEATURE OPERATIONAL MANUAL (ALL 14 MODULES)
    # =========================================================================
    story.append(Paragraph("Chapter 3: Detailed Feature-by-Feature Operational Manual", h1_style))
    story.append(Paragraph(
        "The Nine Degree Strategic Editorial OS features 14 fully dynamic modules. Below is an exhaustive operational guide for each view:",
        body_style
    ))

    modules = [
        ("1. Executive Overview", 
         "The central mission-control cockpit for CMOs and strategists.",
         "• <b>Live Telemetry:</b> Shows verified trends ingested, monitored competitors, validated backlog topics, and active agent departments.<br/>"
         "• <b>Clickable KPI Cards:</b> Clicking any metric card navigates directly to that specific section (e.g., clicking 'Validated Backlog' opens the Backlog).<br/>"
         "• <b>Recommended Actions:</b> Displays top priority editorial theses ready for 1-click Studio dispatch.<br/>"
         "• <b>Intelligence Delta:</b> Summarizes real estate policy shifts and search intent movements since yesterday."),
        
        ("2. Intelligence Feed",
         "Real-time stream of macroeconomic, regional, and competitive market signals.",
         "• <b>Live Search Bar:</b> Filter signals instantly by keyword (e.g., 'pune', 'luxury', 'escrow').<br/>"
         "• <b>Metro Corridor Filter:</b> Dropdown to narrow signals to Global/Cross-Border, Pune Prime, Mumbai Luxury, Jaipur, etc.<br/>"
         "• <b>Multi-Criteria Sorting:</b> Sort signals by Relevance Score, Trend Velocity, or Publication Date.<br/>"
         "• <b>1-Click 'Save to Backlog':</b> Instantly queues any trending signal into the Opportunity Backlog with animated toast confirmation."),
        
        ("3. Trend Radar Global",
         "Visual radar monitoring cross-border NRI flows, luxury buyer behavior, and generative search shifts.",
         "• <b>Signal Ingestion:</b> Cards display verified supporting evidence, why it matters, and Nine Degree editorial angle.<br/>"
         "• <b>Direct Studio Dispatch:</b> Clicking 'Send to Studio' pre-populates the Content Studio brief with the selected trend thesis."),

        ("4. Topic & Strategy Validator",
         "The core mathematical underwriting gate operated by Department 2.",
         "• <b>100-Point Scoring Engine:</b> Runs algorithms analyzing Fiduciary Moat, GEO Citation Potential, Brand Defense, and Commercial Intent.<br/>"
         "• <b>Live n8n Webhook:</b> Clicking 'Run Multi-Agent Validation' triggers port 5678 to run real-time SERP audits.<br/>"
         "• <b>Validation History Drawer:</b> Past topic audits are permanently recorded and can be reviewed at any time."),

        ("5. Competitor Intelligence",
         "Real-time monitoring of rival portals and national brokerage houses.",
         "• <b>Competitor Tracking Table:</b> Monitors Housing.com, Knight Frank, PropTiger, and local consultancies.<br/>"
         "• <b>Trigger Live SERP Audit:</b> Scans Google Search and Generative AI engines to discover keyword gaps competitors have overlooked.<br/>"
         "• <b>CRUD Management:</b> Add or remove tracked competitors with automatic schedule computation."),

        ("6. Opportunity Backlog",
         "Interactive pipeline management moving ideas from discovery to live publication.",
         "• <b>Status Workflow:</b> Move topics through 4 states: <code>Queued</code> ➔ <code>Validated</code> ➔ <code>In Production</code> ➔ <code>Published</code>.<br/>"
         "• <b>+ Ingest Opportunity Modal:</b> Create custom editorial theses with micro-market selection and target audience tags.<br/>"
         "• <b>Search & Tab Filtering:</b> Filter backlog items by workflow state with real-time counters."),

        ("7. Content Studio",
         "The full editorial synthesis environment operated by Department 3.",
         "• <b>Inline Edit Mode:</b> Toggle 'Edit Text' to modify title, subtitle, executive summary, and section headings directly on the page.<br/>"
         "• <b>Multi-Agent Generation:</b> Synthesizes research-backed, long-form advisories passivated against AI clichés.<br/>"
         "• <b>Export Markdown:</b> 1-click download of the complete publication formatted as clean Markdown (<code>.md</code>)."),

        ("8. Visual Studio",
         "Department 4 asset generation for 4K architectural figures and hero covers.",
         "• <b>Asset Gallery:</b> High-resolution architectural renders tailored to real estate corridors.<br/>"
         "• <b>Assign to Article:</b> 1-click 'Set as Hero' or 'Set as Body' assigns selected image directly to the active article draft.<br/>"
         "• <b>+ Ingest Custom URL:</b> Ingest custom CDN links for high-res architectural photographer assets."),

        ("9. Publishing Performance & Registry",
         "Fiduciary gate and permanent archive of authorized publications.",
         "• <b>Human Executive Sign-off Gate:</b> In accordance with Editorial Principle 3, publishing requires explicit human checkbox verification.<br/>"
         "• <b>Persistent CMS Registry:</b> Archived articles are saved locally with word count, quality scores, and readership metrics.<br/>"
         "• <b>Live Reader Modal:</b> Click 'Read Post' to view the formatted dossier in a clean reader modal with full citations."),

        ("10. Agent Control Room",
         "Fine-tuning and prompt engineering cockpit for all 5 departments.",
         "• <b>System Prompt Editor:</b> Edit departmental instructions directly and save to persistent storage.<br/>"
         "• <b>Live Dry-Run Simulator:</b> Execute test agent runs and observe live terminal execution output.<br/>"
         "• <b>Departmental Telemetry:</b> Monitor latency, token counts, and API costs per department."),

        ("11. AI Model Control",
         "Multi-agent routing between Google Gemini and Anthropic Claude.",
         "• <b>Writer Model Selector:</b> Choose between Gemini 2.5 Flash/Pro and Claude 3.5 Sonnet as the primary author.<br/>"
         "• <b>Routing Matrix:</b> Configure specialized models per department.<br/>"
         "• <b>Masked API Keys:</b> Secure input fields for custom Gemini and Claude API keys."),

        ("12. Brand Governance & Knowledge Base",
         "Guarding brand voice, domestic micro-markets, and anti-cliché dictionaries.",
         "• <b>Advisory Voice Rules:</b> Add or remove core editorial mandates.<br/>"
         "• <b>Tracked Corridors:</b> Manage key micro-markets (e.g., Goa Coastal Reserve, Jaipur C-Scheme, Pune Prime).<br/>"
         "• <b>Banned AI Cliché Dictionary:</b> Add or unban robotic filler phrases automatically rejected by Department 5 QA."),

        ("13. System Settings & Storage Engine",
         "Telemetry, engine diagnostics, and multi-tenant data management.",
         "• <b>Ping Engine (Port 5678):</b> Live ping testing connection health and millisecond latency to n8n webhook.<br/>"
         "• <b>Export Dossier (JSON):</b> 1-click download of all persistent state (trends, backlog, published articles, rules).<br/>"
         "• <b>Import Backup (JSON):</b> Restore entire workspace state from a JSON backup.<br/>"
         "• <b>Factory Reset:</b> Clear browser cache and reset to default verified seeds."),

        ("14. SEO & GEO Intelligence",
         "Generative Engine Optimization (GEO) and search volume matrices.",
         "• <b>Corridor Clusters:</b> Tracked keywords with search volume, difficulty, and citation potential.<br/>"
         "• <b>GEO Benchmark Metrics:</b> Evaluates probability of being cited by ChatGPT Search, Perplexity, and Google AI Overviews.")
    ]

    for title, summary, details in modules:
        content = [
            Paragraph(f"<b>{title}</b>", h2_style),
            Paragraph(f"<i>{summary}</i>", ParagraphStyle('Ital', parent=body_style, textColor=c_muted)),
            Spacer(1, 2),
            Paragraph(details, body_style)
        ]
        t = Table([[content]], colWidths=[504])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.white),
            ('BOX', (0,0), (-1,-1), 1, c_border),
            ('TOPPADDING', (0,0), (-1,-1), 6),
            ('BOTTOMPADDING', (0,0), (-1,-1), 6),
            ('LEFTPADDING', (0,0), (-1,-1), 10),
            ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ]))
        story.append(t)
        story.append(Spacer(1, 6))

    story.append(PageBreak())

    # =========================================================================
    # CHAPTER 4: CLOUDFLARE PAGES & ZERO COLD-START DEPLOYMENT GUIDE
    # =========================================================================
    story.append(Paragraph("Chapter 4: Cloudflare Pages & Zero-Cold-Start Deployment Guide", h1_style))
    story.append(Paragraph(
        "This project has been engineered for zero-config static deployment on <b>Cloudflare Pages</b> "
        "and continuous background execution on <b>Render</b> or <b>Koyeb</b>.",
        body_style
    ))

    cf_guide = [
        ("Cloudflare Pages Deployment",
         "1. In Cloudflare, navigate to <b>Workers & Pages ➔ Create application ➔ Pages tab</b>.<br/>"
         "2. Connect your GitHub repository: <code>nine-degree-blog-automation</code>.<br/>"
         "3. <b>Build Command:</b> <code>npm run build</code>.<br/>"
         "4. <b>Build Output Directory:</b> <code>dist</code>.<br/>"
         "5. <b>Deploy Command:</b> Leave completely <b>blank / empty</b> (Cloudflare Pages publishes <code>dist</code> automatically).<br/>"
         "6. Click <b>Save and Deploy</b>. Your dashboard will be live at <code>https://your-project.pages.dev</code>."),
        ("Eliminating Cold Starts on n8n Backend",
         "If deploying the n8n backend on Render's free tier, prevent the 15-minute inactivity spin-down by setting up a free keep-alive monitor:<br/>"
         "1. Register a free account at <b>cron-job.org</b> or <b>uptimerobot.com</b>.<br/>"
         "2. Add a monitor hitting <code>https://your-n8n-url.onrender.com/healthz</code> every <b>5 minutes</b>.<br/>"
         "3. Because Render receives traffic every 5 minutes, it <b>never goes to sleep</b>. Result: <b>Zero cold starts</b>.")
    ]

    for title, text in cf_guide:
        t = Table([[Paragraph(f"<b>{title}</b>", h2_style)], [Paragraph(text, body_style)]], colWidths=[504])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), c_card_bg),
            ('BOX', (0,0), (-1,-1), 1, c_border),
            ('TOPPADDING', (0,0), (-1,-1), 8),
            ('BOTTOMPADDING', (0,0), (-1,-1), 8),
            ('LEFTPADDING', (0,0), (-1,-1), 10),
            ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ]))
        story.append(t)
        story.append(Spacer(1, 8))

    # Concluding Signature
    story.append(Spacer(1, 14))
    story.append(HRFlowable(width="100%", thickness=1, color=c_primary, spaceBefore=4, spaceAfter=8))
    story.append(Paragraph(
        "<b>Nine Degree Strategic Real Estate Brand Advisory</b> &nbsp;|&nbsp; "
        "Global Signal Ingestion & Multi-Agent Editorial Engine &nbsp;|&nbsp; All Rights Reserved 2026",
        ParagraphStyle('FooterNotice', parent=body_style, fontSize=8, textColor=c_muted, alignment=1)
    ))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"[PDF Generator] Successfully generated: {filename}")

if __name__ == '__main__':
    target_path = sys.argv[1] if len(sys.argv) > 1 else "Nine_Degree_OS_Operations_Manual.pdf"
    create_manual_pdf(target_path)
