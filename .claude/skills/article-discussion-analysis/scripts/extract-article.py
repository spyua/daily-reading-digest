#!/usr/bin/env python3
"""
extract-article.py

從 URL 抓取文章純文字內容，便於後續分析。
依賴：requests、beautifulsoup4

用法：
    python extract-article.py <url> [--out output.txt]

範例：
    python extract-article.py https://example.com/article
    python extract-article.py https://example.com/article --out article.txt
"""

import argparse
import sys
from pathlib import Path

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("請先安裝依賴：pip install requests beautifulsoup4 --break-system-packages", file=sys.stderr)
    sys.exit(1)


def extract(url: str) -> dict:
    resp = requests.get(url, timeout=20, headers={
        "User-Agent": "Mozilla/5.0 (article-discussion-analysis skill)"
    })
    resp.raise_for_status()

    soup = BeautifulSoup(resp.text, "html.parser")

    # 優先抓 <article>，否則退回 <main>，否則退回 <body>
    container = soup.find("article") or soup.find("main") or soup.body

    # 移除 script / style / nav / footer / aside
    for tag in container.find_all(["script", "style", "nav", "footer", "aside"]):
        tag.decompose()

    title_tag = soup.find("h1") or soup.find("title")
    title = title_tag.get_text(strip=True) if title_tag else "(無標題)"

    paragraphs = [p.get_text(strip=True) for p in container.find_all(["p", "h2", "h3", "li"])]
    body = "\n\n".join(p for p in paragraphs if p)

    return {"title": title, "url": url, "body": body}


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("url", help="文章網址")
    parser.add_argument("--out", help="輸出檔案（預設：印到 stdout）")
    args = parser.parse_args()

    data = extract(args.url)
    output = f"# {data['title']}\n\nSource: {data['url']}\n\n{data['body']}\n"

    if args.out:
        Path(args.out).write_text(output, encoding="utf-8")
        print(f"已寫入：{args.out}")
    else:
        print(output)


if __name__ == "__main__":
    main()
