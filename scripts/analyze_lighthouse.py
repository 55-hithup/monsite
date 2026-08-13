import json
import sys

path = r"C:\Users\Alex\Desktop\Pro\SEO\devspupai lighthouse\www.devsupai.fr-20260812T224159.json"

with open(path, 'r', encoding='utf-8') as f:
    data = json.load(f)

sys.stdout.reconfigure(encoding='utf-8')

print("=== LIGHTHOUSE CATEGORY SCORES ===")
for cat_id, cat in data.get("categories", {}).items():
    print(f"  {cat.get('title')}: {cat.get('score', 0) * 100:.0f}/100")

print("\n=== METRIC NUMERIC VALUES ===")
audits = data.get("audits", {})
metrics = [
    "first-contentful-paint", "largest-contentful-paint", "total-blocking-time",
    "cumulative-layout-shift", "speed-index", "interactive"
]
for m in metrics:
    if m in audits:
        a = audits[m]
        print(f"  {a.get('title')}: {a.get('displayValue')} (score: {a.get('score')})")

print("\n=== AUDITS TO IMPROVE (score < 1.0 or savings > 0) ===")
for audit_id, audit in audits.items():
    score = audit.get("score")
    details = audit.get("details", {})
    overall_savings = details.get("overallSavingsMs", 0) if isinstance(details, dict) else 0
    bytes_savings = details.get("overallSavingsBytes", 0) if isinstance(details, dict) else 0
    if (score is not None and score < 1) or overall_savings > 0 or bytes_savings > 0:
        title = audit.get("title")
        display = audit.get("displayValue", "")
        print(f"\n* [{audit_id}] {title} (score: {score}) {display}")
        if isinstance(details, dict) and "items" in details:
            for item in details["items"][:5]:
                url = item.get("url") or item.get("source", {}).get("url") or ""
                wasted = item.get("wastedBytes") or item.get("wastedMs") or ""
                print(f"    - {url} | wasted: {wasted}")
