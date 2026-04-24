#!/usr/bin/env bash
# scaffold-report.sh
# 產生一份空白的 Article Analysis 報告骨架。
#
# 用法：
#   ./scaffold-report.sh "文章標題" [full|short]
#
# 範例：
#   ./scaffold-report.sh "DevOps is Dying" full
#   ./scaffold-report.sh "AI 取代初階工程師" short

set -euo pipefail

TITLE="${1:-未命名文章}"
MODE="${2:-full}"

# 轉為安全的檔名（空白變底線、移除特殊字元）
SLUG=$(echo "$TITLE" | sed 's/[^A-Za-z0-9\u4e00-\u9fa5]/_/g' | cut -c1-80)
DATE=$(date +%Y%m%d)
OUTFILE="analysis-${DATE}-${SLUG}.md"

if [[ "$MODE" == "short" ]]; then
cat > "$OUTFILE" <<EOF
# ${TITLE} — Analysis

> 產生時間：$(date '+%Y-%m-%d %H:%M')

## 核心問題

## 主要觀點

## 解法

## 盲點

## 修正建議

## 關鍵字

## 結論
EOF
else
cat > "$OUTFILE" <<EOF
# Article and Discussion Analysis: ${TITLE}

> 產生時間：$(date '+%Y-%m-%d %H:%M')

## 1. 此篇文章探討什麼問題？

- 表層議題：
- 底層真正的問題：
- 為何重要：
- 誰會被影響：
- 產業 / 職涯轉變意涵：

## 2. 觀點結構是什麼？

| Layer               | Argument | Meaning |
| ------------------- | -------- | ------- |
| Problem framing     |          |         |
| Cause               |          |         |
| Impact              |          |         |
| Suggested direction |          |         |
| Final thesis        |          |         |

## 3. 是否有解決方案？

- 解法層級（L0~L4）：
- 作者提出的解法：
- 是否可執行：
- 缺少什麼：
- 如何補強：

## 4. 是否有盲點？

### A. 誇大

### B. 缺少企業脈絡

### C. 缺少維運現實

### D. 缺少人才培育問題

### E. 缺少治理模型

## 5. 如果有盲點，建議解決方案是什麼？

| Blind Spot | Why It Matters | Recommended Fix |
| ---------- | -------------- | --------------- |

## 6. 歸納關鍵字學習

| Keyword | 中文說明 | Why It Matters | Learn Next |
| ------- | -------- | -------------- | ---------- |

## 7. 對使用者的實務 / 職涯建議

### A. 職涯定位

### B. 技術學習路徑（P0~P3）

### C. 企業導入建議

## 8. 最終結論

EOF
fi

echo "已建立：${OUTFILE}"
