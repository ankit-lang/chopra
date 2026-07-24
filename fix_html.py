import re

with open('src/app/[locale]/vacancy/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Strip out html, body, doctype, head
content = re.sub(r'<\s*!\s*DOCTYPE[^>]*>', '', content, flags=re.IGNORECASE)
content = re.sub(r'<\/?html[^>]*>', '', content, flags=re.IGNORECASE)
content = re.sub(r'<head>[\s\S]*?<\/head>', '', content, flags=re.IGNORECASE)
content = re.sub(r'<\/?body[^>]*>', '', content, flags=re.IGNORECASE)

# Replace class with className
content = re.sub(r'\bclass=', 'className=', content)

# Replace onclick with onClick
content = re.sub(r'\bonclick=', 'onClick=', content)

# Replace HTML comments with JSX comments
content = re.sub(r'<!--(.*?)-->', r'{/* \1 */}', content, flags=re.DOTALL)

# Handle styles
content = re.sub(r'<style>([\s\S]*?)<\/style>', r'<style>{`\1`}</style>', content, flags=re.IGNORECASE)

# Handle scripts - extract and remove
content = re.sub(r'<script[\s\S]*?<\/script>', '', content, flags=re.IGNORECASE)

# Fix unclosed tags for input and br, hr, img, meta
def close_tags(match):
    tag = match.group(0)
    if not tag.endswith('/>') and not tag.endswith('</'+match.group(1)+'>'):
        return tag[:-1] + ' />'
    return tag

content = re.sub(r'<(input|img|br|hr|meta)[^>]*>', close_tags, content, flags=re.IGNORECASE)

# Wrap in a React component
react_code = f'''"use client"
import React, {{ useState }} from "react";

export default function VacancyPage() {{
  const [expandedJob, setExpandedJob] = useState(null);

  const toggleJob = (jobId) => {{
    if (expandedJob === jobId) {{
      setExpandedJob(null);
    }} else {{
      setExpandedJob(jobId);
    }}
  }};

  return (
    <div className="min-h-screen bg-[#fdf8f3]">
      {{/* Custom styles required for the new design */}}
      <style>{{`
        /* card hover lift */
        .job-card {{
          transition: transform 0.25s ease, box-shadow 0.3s ease;
        }}
        .job-card:hover {{
          transform: translateY(-6px);
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.2);
        }}
        /* expanded content smooth reveal */
        .expanded-content {{
          transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }}
        /* custom scroll for long content */
        .details-scroll {{
          max-height: 480px;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #b8860b #f5e6d3;
        }}
        .details-scroll::-webkit-scrollbar {{
          width: 5px;
        }}
        .details-scroll::-webkit-scrollbar-track {{
          background: #f5e6d3;
          border-radius: 8px;
        }}
        .details-scroll::-webkit-scrollbar-thumb {{
          background: #b8860b;
          border-radius: 8px;
        }}
        /* form input focus */
        .form-input:focus {{
          outline: none;
          ring: 2px solid #b8860b;
          border-color: #b8860b;
        }}
        /* subtle grain overlay */
        .grain {{
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
        }}
        /* badge pulse */
        @keyframes pulse-soft {{
          0%, 100% {{ opacity: 1; }}
          50% {{ opacity: 0.7; }}
        }}
        .badge-pulse {{
          animation: pulse-soft 2s infinite;
        }}
      `}}</style>

      {content}
    </div>
  );
}}
'''

# The original HTML had hardcoded strings like onclick="toggleJob('waiter')"
# Let's fix those conditional classes
react_code = re.sub(r'id="(.*?)-expanded"\s*className="(.*?)\s*hidden"',
                    r'id="\1-expanded" className={{`\2 ${{expandedJob === "\1" ? "" : "hidden"}}`}}', react_code)

# Fix onclick handlers
react_code = re.sub(r'onClick="toggleJob\(\'(.*?)\'\)"', r'onClick={{() => toggleJob("\1")}}', react_code)

# Fix onsubmit handlers
react_code = re.sub(r'onsubmit="[^"]*"', r'onSubmit={{(e) => {{ e.preventDefault(); alert("✅ Application submitted! We will contact you soon."); }} }}', react_code)

with open('src/app/[locale]/vacancy/page.tsx', 'w', encoding='utf-8') as f:
    f.write(react_code)
