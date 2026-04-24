# Topic Taxonomy

`topic` 欄位決定三件事：檔案放哪個 `topics/<topic>/` 資料夾、前端 `/topics/[topic]` 路由、`getPostsByTopic()` 過濾結果。**選錯 = 檔案放錯 = 路由錯**。這份表是唯一真相，合法值以外的值不會被接受。

---

## 合法 topic 清單

| topic | 定義 | 典型關鍵字 / 文章主題 |
|---|---|---|
| `ai-ml` | LLM、Agent、RAG、模型、推論、prompt、AI 協議（MCP/A2A）、AI 產品設計、AI 工具生態 | Claude Code, MCP, RAG, embedding, agent, prompt engineering, LLM eval, vector DB |
| `devops-infra` | 平台工程、CI/CD、K8s、IaC、可觀測性、SRE、可靠性工程、雲基礎設施、AIOps | Terraform, ArgoCD, Kubernetes, SLO, observability, platform engineering, incident management |
| `product-engineering` | 產品工程、前端／後端架構、系統設計、API 設計、使用者體驗的工程面向 | API design, system design, frontend architecture, microservices, monolith, DX |
| `career-mindset` | 職涯策略、工程師心態、團隊文化、成長路徑、角色定位、學習方法、產業趨勢對職涯的意涵 | "don't become X", mentorship, IC vs management, learning strategy, burnout, role evolution |
| `misc` | 硬不進前四類的短文或雜談 | 偶爾用；若經常使用代表分類表該擴充 |

---

## 不確定怎麼分？→ `_inbox/`

- **預設寫到 `_inbox/`**（`_inbox/` **不會上站**，`fast-glob` 只掃 `topics/**`）。等使用者確認後再搬到 `topics/<topic>/`。
- **不要**為了「我不知道怎麼分」而塞 `misc`。`misc` 只用於「確定不屬於前四類但想立即上站」。

---

## Tie-breaking：橫跨多類怎麼辦？

大多數技術文章都橫跨多領域。判斷**主 topic** 用這兩條，依序：

1. **作者的核心命題是什麼？** 這篇的 thesis 在講 AI 取代角色（→ career-mindset）？AI 協議選型（→ ai-ml）？平台工程演化（→ devops-infra）？API 架構決策（→ product-engineering）？
2. **讀者從這篇能拿走的最大 takeaway 屬於哪一層？** 讀完後，讀者的主要行動是「我的職涯怎麼走」、「我明天寫的 code 架構怎麼選」、還是「我的 platform 怎麼設計」？

**次要面向改用 `tags` 表達**。一篇文章只有一個 `topic`，但可以有多個 `tags`。

### 範例

| 文章 | 主 topic | 理由 | tags |
|---|---|---|---|
| `MCP is Dead`（為什麼 Claude Code 不該用 MCP） | `ai-ml` | 核心命題是 AI 工具協議的選型 | `mcp, claude-code, ai-protocol, agent` |
| `Don't Become a DevOps Engineer in 2026` | `career-mindset` | 核心命題是職涯該往哪升級；DevOps 只是背景 | `devops, career, sre, platform-engineering, ai-ops` |
| `AI-generated IaC 審核 pipeline` | `devops-infra` | 核心命題是企業怎麼治理 AI 產的 infra code | `iac, ai-sdlc, governance, policy-as-code` |
| `如何用 RAG 做內部知識庫`（偏實作） | `ai-ml` | thesis 在 RAG 架構選型 | `rag, vector-db, enterprise-search` |
| `如何用 RAG 做內部知識庫`（偏產品設計） | `product-engineering` | thesis 在產品決策與 UX | `rag, product-design, internal-tools` |

---

## 現有範例（grounded）

- `topics/ai-ml/analysis-20260424-mcp-is-dead.md` — 主：ai-ml（協議選型）；次（tags）：claude-code、agent
- `topics/career-mindset/analysis-20260424-dont-become-devops-2026.md` — 主：career-mindset（職涯方向）；次（tags）：devops、sre、platform-engineering

---

## 硬規則

- **一篇文章 = 一個 `topic`。** 不要為了迴避選擇而全塞 tags。
- **`topic` 必須是上表列出的 5 個值之一。** `lib/posts.ts::parsePost` 對 topic 沒有白名單驗證，所以打錯字會悄悄產生空 `/topics/<typo>/` 路由。
- **不確定時寫 `_inbox/`，不要寫 `misc`。**
