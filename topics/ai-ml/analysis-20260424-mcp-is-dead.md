---
title: MCP is Dead
date: 2026-04-24
topic: ai-ml
author: Nick Babich
source_published: 2026-04-06
summary: 為什麼不要在 Claude Code 裡用 MCP，以及該改用什麼
tags: [mcp, claude-code, ai-protocol, agent]
---

# Article and Discussion Analysis: MCP is Dead

> 產生時間：2026-04-24
> 作者：Nick Babich｜發表：2026-04-06｜5 min read｜548 claps / 32 comments
> 副標：Why you should avoid using MCP in Claude Code and what to use instead

---

## 1. 此篇文章探討什麼問題？

### 表層議題

> MCP（Model Context Protocol）已死，不要在 Claude Code 裡用 MCP，改用 CLI + 直接 API + Structured Tool Calling。

作者列了 5 個 MCP 的問題（複雜、不可靠、難維運、吃 token、安全風險），然後建議改走 CLI / 直接 API 的路線。

### 底層真正的問題

> **當 AI 工具生態走向協議化（MCP、A2A、Agent Protocol 等）的同時，工程師應該用哪一層去整合外部服務？協議層到底帶來的是「抽象價值」還是「中間商成本」？**

這篇文章真正在辯論的不是 MCP 會不會死，而是：

> **「通用協議層」vs「精準直連」的權衡——通用性有多貴？可控性有多值錢？**

MCP 的設計初衷是**讓 AI 能像插 USB 一樣接任何工具**。但作者從 Claude Code 的日常使用經驗發現：USB 很方便，但每接一個 USB 裝置你的電腦就變慢、更容易被攻擊、而且你其實只用到那個裝置的一兩個功能。

### 為何重要

- 對 **Claude Code / Cursor / Cline 使用者**：直接影響日常 token 成本與任務成功率。
- 對 **AI 工程師 / Agent 開發者**：影響整合外部服務的架構選擇。
- 對 **企業導入 AI Agent 的決策者**：影響安全、治理、成本模型。
- 對 **MCP 生態從業者**：這類文章會影響工具鏈投資與標準採用。

### 誰會被影響

個人 AI coder、Agent 開發團隊、正在評估是否全面擁抱 MCP 的企業 AI 平台團隊、以及把 MCP 當作萬能解的新手。

### 產業 / 職涯轉變意涵

這不是「MCP 死亡」，而是 MCP 生態**正在從 hype 階段進入務實階段**。未來的差異化不在「會不會裝 MCP」，而在**知道什麼時候用 MCP、什麼時候用直接 API、什麼時候用 structured tool calling**。

---

## 2. 觀點結構是什麼？

作者論證鏈：

```text
MCP 被宣傳為 USB for AI，看起來取代 API
      ↓
但 MCP 在 LLM 與外部工具間多了一個協議層
      ↓
這層帶來 5 個問題（複雜、不可靠、難維運、吃 token、安全）
      ↓
Claude Code 實測：Figma MCP 一個就吃 ~20k tokens
      ↓
結論：MCP 對大多數真實產品是 overkill
      ↓
建議：CLI + Direct API + Structured Tool Calling
```

拆解成論證表：

| Layer               | Argument                                                               | Meaning                                                       |
| ------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------- |
| Problem framing     | MCP 被宣傳得太神，實際使用有 5 個痛點                                  | 建立反潮流立場                                                |
| Cause               | MCP 加了協議層讓 LLM 即時推論規則；tools 全載入 context                | 指向根本設計：動態發現 + 全量載入                             |
| Impact              | 複雜、行為不穩、token 爆、安全漏洞                                     | 對個人 Claude Code 使用者最痛                                 |
| Suggested direction | 改用 CLI + 直接 API + Structured Tool Calling                          | 回到「明確介面 + 嚴格 schema」                                |
| Final thesis        | MCP 像瑞士刀，但真實產品只需要精準工具                                 | 濃縮：**通用性不等於可用性**                                  |

### 幾個該警覺的論證缺陷

1. **標題與主張不對等**：標題「MCP is Dead」，但作者自己說的是「對大多數真實產品是 overkill」——這是嚴重的 headline 誇大。
2. **把「個人 Claude Code 體驗」當作整個 MCP 生態的判決**：作者的抱怨幾乎都來自個人開發者日常，沒有討論企業級 MCP Server（OAuth、Sandbox、Policy）的場景。
3. **Problem #3「Harder to Maintain at Scale」的論證最弱**：只有一句「drift between intended vs actual behavior」加一個 Figma 案例連結，沒有實際數據。

---

## 3. 是否有解決方案？

### 解法層級：**L2（角色或技能建議）偏向 L3**

| Level | Description                       | 本文是否達到 |
| ----- | --------------------------------- | ------------ |
| L0    | 沒有解法，只有意見                | ✅ 超過       |
| L1    | 方向性建議                        | ✅ 超過       |
| L2    | 角色或技能建議                    | ✅ **達到**   |
| L3    | 實務執行步驟                      | ⚠️ **部分**   |
| L4    | 完整框架或運作模型                | ❌ 沒做到     |

### 作者提出的解法

三條替代路徑：

1. **CLI 直接呼叫** — 用命令列與 3rd party 工具互動。
2. **Direct API 呼叫** — 工程師決定何時呼叫、傳什麼、錯誤怎麼處理。
3. **Structured Tool Calling** — 用 OpenAI / Anthropic 的 tool schema 定義嚴格輸入輸出。

另給一個立即可執行的小動作：

- 在 Claude Code 裡跑 `/mcp`，關掉不用的 MCP server。

### 是否可執行

**部分可執行**。「跑 /mcp 關掉沒用的」是具體操作，但「改用 CLI + API + Tool Calling」這個更大的主張缺少：

- 什麼情境下選 MCP、什麼情境下選直接 API 的**決策框架**。
- CLI / API 實作的**安全與治理模式**（作者批評 MCP 的安全問題，但沒說直接 API 怎麼避開同樣的風險）。
- **Tool Calling 與 MCP 的關係**（MCP Server 本身就是一種 Structured Tool Calling 的傳輸層；作者把兩者講成對立，有點混淆）。

### 缺少什麼

- **決策矩陣**：什麼時候用哪個？
- **Token 管理策略**：除了關掉 MCP，還能怎麼做？（Prompt Caching、Tool Filtering、On-demand loading）
- **安全模型**：Prompt Injection 風險在直接 API / Tool Calling 同樣存在，不是 MCP 專屬。

### 如何補強

見第 5 節——補上決策框架、Token 節約戰術、統一的 Agent 安全模型。

---

## 4. 是否有盲點？

### A. 誇大（Overstatement）

最嚴重的誇大是**標題「MCP is Dead」**。分類為 **Partially true**：

- ✅ 真的問題：token 消耗、protocol complexity、Prompt injection 風險。
- ❌ 被誇大：MCP 並沒有死，它還在高速演化（2025-2026 OAuth、Resource Indicator、Streamable HTTP 都在出）。
- ❌ False framing：把 MCP 和 Tool Calling 講成替代關係，但 MCP 本來就是 Tool Calling 的**傳輸層規範**。

### B. 缺少企業脈絡（Missing Enterprise Context）

作者完全從**個人 Claude Code 使用者**視角寫作，沒處理：

- **企業 MCP Server 的治理**：OAuth 2.1、Resource Indicator、Audit Log、權限 Scope。
- **多租戶場景**：一個 MCP Server 要服務全公司，和個人用一次性 MCP 的架構完全不同。
- **合規需求**：金融業要的 audit trail 反而是 MCP 比 CLI 更好做的事（CLI 要自己在每個工程師機器上收集 log，MCP 可以集中）。
- **Tool 治理**：企業需要統一管理哪些 Agent 可以用哪些 Tool。直接 API 反而更難做統一治理。

### C. 缺少維運現實（Missing Operational Reality）

作者說「改用 CLI + API 更可控」，但沒討論：

- CLI 散落在 shell script 裡，**版本管理與審查機制**比 MCP 差。
- Direct API 每一家服務的認證、限流、重試邏輯不同，**開發者要重新發明輪子**。
- MCP 的動態發現（Dynamic Tool Discovery）其實是為了**避免每個 Agent 都要重寫整合邏輯**——這是優點被當缺點寫。
- Token 吃 20k 不是 MCP 的必然問題，是**工具設計的問題**：好的 MCP Server 應該用 `list_tools` 分層、或是用 resource / prompt 而非一次全載 tools。

### D. 缺少人才培育問題（Missing Talent Development）

作者推薦「直接 API + CLI」對 senior 合理，但對 junior 或設計師（作者本人是 Product Designer！）反而**提高門檻**。

MCP 的價值之一就是**讓不會寫 code 的人也能把 AI 接上工具**。推薦 Product Designer 去寫 API client、做 error handling、管理 auth token——這實際上是把工作推回技術專家手上，和作者「給 Designer 的 Claude Code 指南」立場矛盾。

### E. 缺少治理模型（Missing Governance Model）

作者在 Problem #5 提 Prompt Injection 風險，建議改用「直接 API + 嚴格 schema」，但：

- Prompt Injection 是 **LLM + Tool** 的通病，**不是 MCP 獨有**。
- 改用直接 API 仍然會有「untrusted input → LLM reasoning → real-world action」這條鏈。
- 真正該做的治理是：**Tool Permission Scope + Human-in-the-loop + Output validation + Rate limiting + Audit**——這些不管用 MCP 或直接 API 都要做。

把 MCP 講成安全風險的主因，會讓讀者誤以為不用 MCP 就安全了。

---

## 5. 如果有盲點，建議解決方案是什麼？

| Blind Spot                                           | Why It Matters                                                     | Recommended Fix                                                                                                                  |
| ---------------------------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| 標題與內文不對等（「MCP is Dead」vs「對多數產品是 overkill」） | 讓讀者放棄仍有價值的工具                                         | 重新定位為「**什麼情境選 MCP、什麼情境選 Direct API**」的決策問題，而不是「選哪邊」                                               |
| 只從個人 Claude Code 視角寫，忽略企業場景           | 企業場景下 MCP 的治理、audit、集中式權限是優勢而非缺點             | 建立 **個人使用 vs 企業使用**的分層：個人重 token 與啟動速度、企業重治理與稽核                                                    |
| 把 MCP 和 Tool Calling 講成對立                      | MCP 本質就是 Tool Calling 的傳輸規範，兩者不是替代                 | 澄清**技術堆疊**：Tool Calling 是 LLM 能力 → Tool Schema 是介面 → MCP 是跨進程傳輸與發現協議。選擇的是傳輸層，不是要不要 Tool Calling |
| Token 問題被講成 MCP 本質缺陷                        | 這會讓人放棄 MCP，而不是解決真正原因                                | 採用 **Token 節約戰術**：按需啟用（on-demand）、tool scoping、prompt caching、MCP server 設計層級化 API                            |
| 把 Prompt Injection 講成 MCP 專屬安全風險            | 改用直接 API 同樣會中 Prompt Injection，誤導讀者「不用 MCP 就安全」 | 建立**通用 Agent 安全模型**：Tool Scope + HITL + Output Validation + Rate Limiting + Audit——不管底層是 MCP 或 API 都適用           |

### 決策框架：什麼時候用 MCP？什麼時候用 Direct API？

| 情境                                       | 建議           | 理由                                                              |
| ------------------------------------------ | -------------- | ----------------------------------------------------------------- |
| 個人 Claude Code 日常開發，單一工作流      | **Direct API / CLI** | Token 更省、延遲更低、debug 更直接                                |
| 要給整個團隊 / 公司用的共用 AI 能力        | **MCP**        | 集中治理、統一權限、audit 集中收                                  |
| 工具會被多個不同 Agent / 客戶端使用        | **MCP**        | 寫一次，Claude / Cursor / Cline / Claude Desktop 都能用           |
| 只需要幾個固定方法，且工作流穩定           | **Direct API** | 精準控制、無協議開銷                                              |
| 需要動態發現工具（使用者可能裝不同 MCP）   | **MCP**        | 這正是 MCP 設計目標                                               |
| 受監管產業，需要完整 audit trail           | **MCP + OAuth 2.1** | 集中式 log 比散落在 CLI script 好做                              |
| 超高頻 / 低延遲場景（交易、即時資料）      | **Direct API** | 協議層的延遲會累積                                                |
| 新手 / 非工程師使用者想接 AI 到工具        | **MCP**        | 不需要自己寫 client / 處理 auth                                   |

### Token 節約戰術（不必放棄 MCP）

1. **`/mcp` 盤點**：關掉沒用的 server（作者這點對）。
2. **按需啟用**：只在需要時 enable，不要全開。
3. **Tool Scoping**：同一個 MCP Server 只暴露需要的 tool subset。
4. **Prompt Caching**：Anthropic 的 cache control 可以讓 MCP tool schema 不重複付費。
5. **層級化設計**：MCP Server 設計成 `list_categories` → `list_tools_in_category`，避免一次把所有 tool 灌進 context。
6. **Figma MCP 特例**：若常吃 20k，可考慮用 Figma 的 Direct API 做特定任務，把 MCP 留給探索式工作。

### 通用 Agent 安全模型（不論 MCP 或 Direct API 都適用）

| 控制點              | 做什麼                                                  |
| ------------------- | ------------------------------------------------------- |
| Tool Permission     | 最小權限原則，tool scope 按角色分配                     |
| Human-in-the-loop   | 高風險動作（寫入、刪除、正式環境）一律人工核准          |
| Output Validation   | LLM 產出的 tool call 參數要經 schema 驗證 + 業務規則檢查 |
| Input Sanitization  | 來自使用者的 input 進入 LLM 前做 Prompt Injection 偵測   |
| Rate Limiting       | 單一 Agent session 的 tool call 次數上限                |
| Audit Log           | 所有 tool call 記錄：誰、何時、傳什麼參數、結果         |
| Rollback            | 破壞性動作必須有 undo 機制                              |
| Sandboxed Execution | 高風險 tool 在隔離環境執行                              |

---

## 6. 歸納關鍵字學習

| Keyword                     | 中文說明                      | Why It Matters                                            | Learn Next                                                    |
| --------------------------- | ----------------------------- | --------------------------------------------------------- | ------------------------------------------------------------- |
| Model Context Protocol, MCP | 模型上下文協議                | AI Agent 與外部工具整合的開放協議                         | 讀 MCP 官方 spec、OAuth 2.1 授權章節                           |
| Tool Calling                | 工具呼叫                      | LLM 呼叫外部函式的核心能力                                | Anthropic / OpenAI tool use 文件                              |
| Tool Schema                 | 工具介面描述（JSON Schema）   | 嚴格輸入輸出 → 降低 hallucination                         | JSON Schema draft-07 規範、strict mode                        |
| Structured Output           | 結構化輸出                    | 確保 LLM 回傳可解析的格式                                 | Anthropic structured output、OpenAI response_format           |
| MCP Server / Client         | MCP 伺服器 / 客戶端           | 理解 MCP 雙端通訊模型                                     | 自建一個 MCP Server 練手                                      |
| Streamable HTTP Transport   | 可串流 HTTP 傳輸              | MCP 2025 新一代傳輸層                                     | MCP spec 更新紀錄                                             |
| Dynamic Tool Discovery      | 動態工具發現                  | MCP 的核心價值，也是 token 成本來源                       | 對比 gRPC reflection、GraphQL introspection                    |
| Prompt Injection            | 提示注入攻擊                  | LLM + Tool 架構的共通威脅                                 | OWASP LLM Top 10、Simon Willison 的文章                        |
| Prompt Caching              | 提示快取                      | 降低重複 system prompt / tool schema 的 token 成本        | Anthropic cache_control、cache_write vs cache_read             |
| Context Window Management   | 上下文視窗管理                | 決定 Agent 任務成功率                                     | 當 context > 50k 時模型退化；compact / summarize 策略         |
| Tool Scoping                | 工具範圍收斂                  | 不是關掉 MCP，是只暴露這次任務需要的 tool                 | MCP server 的 selective exposure                              |
| OAuth 2.1 for MCP           | MCP 授權標準                  | 企業級 MCP 的身份與權限                                   | Resource Indicator (RFC 8707)                                 |
| Human-in-the-loop           | 人類監督迴圈                  | Agent 責任歸屬的機制                                      | 核准介面設計、可撤回動作                                      |
| Agent Sandboxing            | 代理人沙箱                    | 高風險 Tool 隔離執行                                      | Firecracker、gVisor、E2B                                      |
| 80/20 Rule in Tool Design   | 工具設計的 80/20              | 大多數任務只用到工具的少數方法                            | API 介面精簡化                                                |

---

## 7. 對使用者的實務 / 職涯建議

### A. 個人 Claude Code 使用者（馬上能做）

1. **今天就做 token 審計**：每次新 session 第一件事 `/mcp`，關掉不用的。
2. **建立 MCP 白名單**：列出你「每天都會用到」的 MCP，其他一律預設關閉、按需開啟。
3. **對 Figma / 大型 MCP 特別警覺**：若只需要匯出資料，考慮 Direct API。
4. **善用 Prompt Caching**：固定的 system prompt + tool schema 放在 cache 區塊。

### B. Agent / AI Platform 工程師（中期選擇）

技能優先順序：

| Priority | Topic                                 | Reason                                                          |
| -------- | ------------------------------------- | --------------------------------------------------------------- |
| P0       | Tool Calling + Tool Schema 設計       | 不管底層是 MCP 還是 Direct API，都要會寫好的 tool schema         |
| P0       | Context Window 管理策略               | compact、summarize、tool scoping、prompt caching                 |
| P1       | MCP Server / Client 實作              | 了解協議本質才能判斷何時不用它                                   |
| P1       | Agent 安全模型                        | Prompt Injection 防禦、HITL、Audit、Sandbox                      |
| P2       | OAuth 2.1 for MCP                     | 企業級場景剛性需求                                               |
| P2       | 自建內部 Agent Gateway                | 把 MCP / Direct API 收斂到一個治理層                             |

### C. 企業 AI 平台決策者（架構選擇）

**不要被「MCP is Dead」嚇到**。正確的企業架構應該是：

```text
Agent (Claude / Custom)
    ↓
Internal Agent Gateway （自家的治理層）
    ↓
┌─────────────┬─────────────┬─────────────┐
│ MCP Server  │ Direct API  │ CLI Wrapper │
│ (共用工具)  │ (高頻 / 低延遲) │ (既有工具 bridge) │
└─────────────┴─────────────┴─────────────┘
```

重點不是二選一，而是**在統一的 Gateway 上做權限、審計、速率控制**，底層可以混用。

### D. Avoid（要避免的陷阱）

- 看到一篇「X is Dead」就真的丟掉 X。
- 把 token 問題當成 MCP 本質缺陷（其實是設計與使用方式問題）。
- 以為改用直接 API 就解決 Prompt Injection 安全問題。
- 把「個人使用經驗」推論成「企業架構選擇」。
- 忘記 MCP、Tool Calling、Tool Schema 是**不同層**的東西。

---

## 8. 最終結論

這篇文章方向有料，但標題是典型的 clickbait。作者列的 5 個痛點**都是真的**——token 吃爆、行為漂移、協議複雜、安全風險、難維運——但把這些痛點延伸成「MCP 已死」是嚴重 overreach。

更精準的讀法是：

> **MCP 沒有死。死亡的是「把 MCP 全開、全自動、無治理」的天真用法。AI 工具整合正在從 hype 期進入分層期：個人開發追求精準控制用 Direct API，跨組織共享追求治理與發現用 MCP，所有層都必須套一致的 Agent 安全模型。**

對你的工作與學習建議：

> **不要把自己定位為「會用 MCP 的人」或「不用 MCP 的人」，而是定位為能判斷「什麼情境下選什麼整合方式」並且能為企業建立 Agent Gateway 的人。**

這呼應整個 AI SDLC Governance 的大方向——**低階的「用哪個工具」正在被商品化，高階的「設計治理層」正在升值**。

這才是真正的訊號。
