#!/usr/bin/env bash
# update-index.sh
# 掃描 topics/ 底下所有 analysis-YYYYMMDD-*.md，重新生成 README.md 索引。
# 用法：在 repo 根目錄執行 `bash update-index.sh`

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$REPO_ROOT"

README="$REPO_ROOT/README.md"

# --- Header ---
cat > "$README" <<'EOF'
# Daily Reading Digest — 每日文章閱讀留存

個人閱讀文章的分析留存庫。每篇文章會轉成結構化分析報告，依主題歸檔、按日期索引，並透過部署在 Vercel 的網站呈現。

🌐 **網站**：https://spyua.github.io/daily-reading-digest/

## 結構

```
daily-reading-digest/
├── README.md                 ← 本檔案（部分自動生成）
├── _inbox/                   ← 還沒分類的文章暫存
├── topics/                   ← 主題資料夾（上站內容源）
│   ├── devops-infra/
│   ├── ai-ml/
│   ├── product-engineering/
│   ├── career-mindset/
│   └── misc/
├── templates/                ← 分析報告模板（含 front-matter 規格）
├── assets/                   ← 共用圖片、附件
├── app/ components/ lib/     ← Next.js 網站原始碼
├── DEPLOY.md                 ← GitHub Pages 部署說明
├── .github/workflows/        ← CI — 自動 build + deploy 到 GH Pages
└── update-index.sh           ← 重新生成本 README 索引的腳本
```

## 檔案命名規則

```
analysis-YYYYMMDD-slug.md
```

範例：`analysis-20260424-mcp-is-dead.md`

每個 `.md` 檔頂部**必須**有 YAML front-matter（欄位規格見 `templates/analysis-template.md`）。

## 工作流程

1. 讀完一篇文章後，用 `article-discussion-analysis` skill 產出分析報告（含 YAML front-matter）
2. 依主題放進 `topics/<主題>/`，若還沒想好類別先丟 `_inbox/`（_inbox 不會上站）
3. `git commit && git push origin main` — GitHub Actions 自動 build + deploy 到 Pages（~2-3 分鐘）
4. （可選）`bash update-index.sh` 更新本 README 索引

## 本地開發

```bash
npm install       # 首次
npm run dev       # 開發，http://localhost:3000
npm test          # 單元測試（lib/posts）
npm run build     # production build
```

部署細節見 [DEPLOY.md](DEPLOY.md)。

---

EOF

# --- 統計 ---
TOTAL=$(find topics _inbox -type f -name 'analysis-*.md' 2>/dev/null | wc -l | tr -d ' ')
echo "**總計：${TOTAL} 篇分析**" >> "$README"
echo "" >> "$README"
echo "最近更新：$(date '+%Y-%m-%d')" >> "$README"
echo "" >> "$README"

# --- 按時間倒序列出全部 ---
echo "## 全部文章（按日期倒序）" >> "$README"
echo "" >> "$README"
echo "| 日期 | 主題 | 標題 |" >> "$README"
echo "| --- | --- | --- |" >> "$README"

find topics _inbox -type f -name 'analysis-*.md' 2>/dev/null | while read -r f; do
  base=$(basename "$f" .md)
  # analysis-YYYYMMDD-slug → extract date and slug
  date_part=$(echo "$base" | sed -E 's/^analysis-([0-9]{8})-.*$/\1/')
  slug_part=$(echo "$base" | sed -E 's/^analysis-[0-9]{8}-(.*)$/\1/')
  # format date as YYYY-MM-DD
  formatted_date="${date_part:0:4}-${date_part:4:2}-${date_part:6:2}"
  # topic = parent dir name
  topic=$(basename "$(dirname "$f")")
  # relative path
  rel_path=$(echo "$f" | sed 's|^\./||')
  printf '%s|%s|%s|[%s](%s)\n' "$date_part" "$formatted_date" "$topic" "$slug_part" "$rel_path"
done | sort -r | awk -F'|' '{printf "| %s | %s | %s |\n", $2, $3, $4}' >> "$README"

echo "" >> "$README"

# --- 按主題分組 ---
echo "## 按主題分類" >> "$README"
echo "" >> "$README"

for topic_dir in topics/*/; do
  topic=$(basename "$topic_dir")
  count=$(find "$topic_dir" -type f -name 'analysis-*.md' 2>/dev/null | wc -l | tr -d ' ')
  if [ "$count" -eq 0 ]; then continue; fi
  echo "### ${topic} (${count})" >> "$README"
  echo "" >> "$README"
  find "$topic_dir" -type f -name 'analysis-*.md' 2>/dev/null | while read -r f; do
    base=$(basename "$f" .md)
    date_part=$(echo "$base" | sed -E 's/^analysis-([0-9]{8})-.*$/\1/')
    slug_part=$(echo "$base" | sed -E 's/^analysis-[0-9]{8}-(.*)$/\1/')
    formatted_date="${date_part:0:4}-${date_part:4:2}-${date_part:6:2}"
    rel_path=$(echo "$f" | sed 's|^\./||')
    printf '%s|- **%s** — [%s](%s)\n' "$date_part" "$formatted_date" "$slug_part" "$rel_path"
  done | sort -r | cut -d'|' -f2 >> "$README"
  echo "" >> "$README"
done

# --- Inbox 區 ---
INBOX_COUNT=$(find _inbox -type f -name 'analysis-*.md' 2>/dev/null | wc -l | tr -d ' ')
if [ "$INBOX_COUNT" -gt 0 ]; then
  echo "## _inbox 待分類 (${INBOX_COUNT})" >> "$README"
  echo "" >> "$README"
  find _inbox -type f -name 'analysis-*.md' 2>/dev/null | while read -r f; do
    base=$(basename "$f" .md)
    date_part=$(echo "$base" | sed -E 's/^analysis-([0-9]{8})-.*$/\1/')
    slug_part=$(echo "$base" | sed -E 's/^analysis-[0-9]{8}-(.*)$/\1/')
    formatted_date="${date_part:0:4}-${date_part:4:2}-${date_part:6:2}"
    rel_path=$(echo "$f" | sed 's|^\./||')
    printf '%s|- **%s** — [%s](%s)\n' "$date_part" "$formatted_date" "$slug_part" "$rel_path"
  done | sort -r | cut -d'|' -f2 >> "$README"
  echo "" >> "$README"
fi

echo "索引已更新：$README（共 ${TOTAL} 篇）"
