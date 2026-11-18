import urllib.request
import uuid
import os

boundary = '----WebKitFormBoundary' + uuid.uuid4().hex
fields = {
    'Blog Topic or Strategic Thesis': 'Luxury vs Mid-Segment Real Estate Marketing: What Changes in Message, Media and Creative?',
    'Editorial Voice & Narrative Style': 'Strategic Advisory & Market Positioning (Developer Playbook, RERA Compliance, Land Bank Economics)',
    'Target Audience': 'Property Developers, Builders & Architects (B2B Strategic Advisory)',
    'Micro-Market / Geographic Focus': 'Jaipur Corridors (Jagatpura, Tonk Road, Mansarovar, Vaishali Nagar)',
    'Expert Point Box (Insider Knowledge & Proof Points)': 'In luxury projects, marketing is driven by architectural pedigree and emotional exclusivity; in mid-segment, conversion is driven by payment transparency and site-visit velocity.',
    'Custom Visual & Photo Guidance (Optional)': 'Minimalist modern luxury villa facade at dusk warm ambient lighting reflection pool 8k',
    'Target Primary SEO Keyword (Optional)': 'luxury vs mid-segment real estate marketing',
    'Gemini API Key (Optional)': os.environ.get('GEMINI_API_KEY', 'YOUR_GEMINI_API_KEY')
}

body = bytearray()
for key, val in fields.items():
    body.extend(f'--{boundary}\r\n'.encode('utf-8'))
    body.extend(f'Content-Disposition: form-data; name="{key}"\r\n\r\n'.encode('utf-8'))
    body.extend(f'{val}\r\n'.encode('utf-8'))
body.extend(f'--{boundary}--\r\n'.encode('utf-8'))

url = 'http://localhost:5678/form/nine-degree-blog'
req = urllib.request.Request(url, data=body, headers={'Content-Type': f'multipart/form-data; boundary={boundary}'})

print('Submitting multipart form to Multi-Agent Orchestrator...')
try:
    res = urllib.request.urlopen(req, timeout=120)
    html = res.read().decode('utf-8')
    print('SUCCESS! Response length:', len(html))
    with open('D:/n8n workflows/output/generated_live_blog.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print('Successfully generated and saved blog to D:/n8n workflows/output/generated_live_blog.html!')
except Exception as e:
    print('Error:', e)
