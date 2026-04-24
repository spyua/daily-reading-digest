---
title: Don't Become a DevOps Engineer in 2026
date: 2026-04-24
topic: career-mindset
author: Dhanush N
source_url: https://dhanushnehru.medium.com/dont-become-a-devops-engineer-in-2026-f2e94541e700
source_published: 2026-03-02
summary: AI 正在壓縮傳統 DevOps 的低階執行工作，工程師該往 Platform / SRE / AI Infra 架構判斷層升級
tags: [devops, career, sre, platform-engineering, ai-ops]
---

# Article and Discussion Analysis: Don't Become a DevOps Engineer in 2026

> 產生時間：2026-04-24
> 文章連結：https://dhanushnehru.medium.com/dont-become-a-devops-engineer-in-2026-f2e94541e700
> 作者：Dhanush N｜發表：2026-03-02｜4 min read｜527 claps / 21 comments

---

## 1. 此篇文章探討什麼問題？

### 表層議題

> 2026 年還該不該成為 DevOps Engineer？

作者在標題直接喊話「不要在 2026 年成為 DevOps 工程師」，並將 Terraform 撰寫、Pipeline 照看、3 AM PagerDuty 列為正在被 AI 取代的工作。

### 底層真正的問題

> 當 AI Agent、AIOps、自動化平台越來越成熟後，傳統 DevOps 的工作價值會如何變化？工程師應該往哪裡升級？

文章真正的命題不是「DevOps 是否死亡」，而是：**在 AI 壓縮低階執行工作的時代，工程師要往哪一層抽象移動才能維持價值。**

### 為何重要

- 對**正在學 DevOps 的新人**：影響學習方向投資。
- 對**已在 DevOps / SRE 工作的人**：影響接下來 3~5 年的轉型路徑。
- 對**平台團隊主管**：影響招聘標準、內訓設計、工具投資。
- 對**CTO / VP Engineering**：影響組織設計與 AI 導入策略。

### 誰會被影響

只會「操作工具」的 DevOps 工程師、純腳本維運人員、Junior 工程師、以及仍把 DevOps 視為「幫 Dev 打雜」的組織。

### 產業 / 職涯轉變意涵

從「會用工具的人」轉向「能設計平台、定義治理、承擔可靠性責任的人」。DevOps 正在分裂為兩條路徑：**往下被商品化、往上成為 Platform / SRE / AI Infra 架構判斷者**。

---

## 2. 觀點結構是什麼？

作者的論證鏈如下：

```text
過去建議：學 Linux + K8s + CI/CD 成為 DevOps
      ↓
2026 年 AI Agent 可以直接產 IaC、跑安全檢查、開 PR
      ↓
AIOps / LAM 已能做事件關聯、預測、自動修復
      ↓
傳統 DevOps 操作層被壓縮
      ↓
但企業仍需平台、可靠性、AI Infra
      ↓
建議轉向 AI Infra / LLMOps、Platform Engineering、SRE with AI
```

拆解成論證表：

| Layer               | Argument                                                             | Meaning                                          |
| ------------------- | -------------------------------------------------------------------- | ------------------------------------------------ |
| Problem framing     | 傳統 DevOps 角色正迅速變成 legacy                                     | 強勢開場，建立急迫感                             |
| Cause               | AI Agent 寫 IaC 更快更準；AIOps 做預測與自動修復                      | 指向 AI 與自動化的成熟                           |
| Impact              | 寫 IaC、看 Pipeline、3 AM 救火變得廉價                                | 指名哪些工作會被壓縮                             |
| Suggested direction | 轉向 AI Infra / LLMOps / Platform Engineering / SRE with AI          | 提供三條替代路徑                                 |
| Final thesis        | 管理機器的人會被獎勵，與 AI 競爭產出樣板程式碼的人會被淘汰            | 濃縮結論：往上走，別停在 YAML                    |

---

## 3. 是否有解決方案？

### 解法層級：**L2（角色或技能建議）**

| Level | Description                       | 本文是否達到 |
| ----- | --------------------------------- | ------------ |
| L0    | 沒有解法，只有意見                | ✅ 超過       |
| L1    | 方向性建議                        | ✅ 超過       |
| L2    | 角色或技能建議                    | ✅ **達到**   |
| L3    | 實務執行步驟                      | ❌ 沒做到     |
| L4    | 完整框架或運作模型                | ❌ 沒做到     |

### 作者提出的解法

推薦三條職涯轉向：

1. **AI Infrastructure Engineer / LLMOps Engineer** — 從 Web 流量轉向模型流量、GPU、RAG、模型部署。
2. **Platform Engineer** — 建立自助式平台、內部開發者入口、標準化 paved road。
3. **SRE with AI Focus** — 從 bash 腳本維運轉向用 AI 分析 telemetry、預測事故、自動修復。

### 是否可執行

方向正確但**不可直接執行**。文章沒有給出：

- 從現職轉過去的技能差距評估。
- 學習順序或優先級。
- 第一個可以做的實作練習或 PoC。
- 如何在履歷與作品上呈現差異化。
- 如何判斷公司是否值得待下去（還在 L1 操作層 vs 已走向 L3 平台層）。

### 缺少什麼

- **轉職路徑地圖**（從 L1 走到 L5 要經過哪些能力）。
- **企業導入治理框架**（AI 產出如何被審查）。
- **初階人才培育模型**（Junior 少了實戰機會怎麼辦）。

### 如何補強

把作者的「三條路徑」擴充為：**DevOps 五層分層模型** × **AI SDLC Governance 治理框架** × **Junior 六階段訓練模型**。這三件事原文都沒做，但這是讓建議真正可落地的關鍵（見第 5 節）。

---

## 4. 是否有盲點？

### A. 誇大（Overstatement）

標題「Don't Become a DevOps Engineer in 2026」屬於**流量標題**，與作者自己在留言區的修正「DevOps isn't dying, it's expanding. AI is a tool, not a replacement.」明顯矛盾。

這是典型的「標題煽動 + 內文修正」結構。分類為 **Partially true**：方向對，但修辭過度，讓讀者誤以為整個 DevOps 領域不值得投入。

### B. 缺少企業脈絡（Missing Enterprise Context）

作者描述的 AI Agent 工作流——「寫 prompt → AI 生成 IaC → 跑安全檢查 → 開 PR → 秒級完成」——預設的是一個**寬鬆、新創、低監管**的環境。在金融、保險、醫療、受監管產業，這個流程會被以下約束打斷：

- Shared VPC / Private Service Connect / 防火牆規則
- 跨境資料落地要求
- IAM 最小權限與服務帳號繼承
- 稽核日誌與變更單
- 資安審查 / Penetration Test
- 成本中心與預算歸屬
- 命名規範與標籤強制

AI 可以產初稿，但不知道企業內部的這些約束。

### C. 缺少維運現實（Missing Operational Reality）

「AIOps 讓 3 AM PagerDuty 消失」是過度樂觀的說法。留言區已有從業者指出：**Resilience、self-healing、Runbook、auto-scaling 本來就是 DevOps 十年來的核心。** AI 不是發明這些，只是加速事件關聯與 RCA 草稿。

在正式環境中，AI 自動修復仍然會受限於：

- 變更審核流程
- 回滾機制的複雜度
- 跨系統依賴的不可見副作用
- 無狀態 vs 有狀態服務的差異
- 事故責任歸屬（AI 不能當事故當事人）

### D. 缺少人才培育問題（Missing Talent Development）

這是原文最大的盲點。文章鼓吹 AI 取代初階工作，但沒有回答：

> **如果 Junior 不再有寫 Terraform、修 Pipeline、處理 PagerDuty 的實戰機會，未來的 Senior 從哪裡來？**

架構判斷不是看文章就會，它來自於真實場景中的除錯經驗、上線經驗、事故經驗、權限踩雷經驗。AI 代勞了這些「低階執行工作」的同時，也抽走了初階工程師的**經驗積累通道**。

### E. 缺少治理模型（Missing Governance Model）

文章說「AI 產 IaC → 跑安全檢查 → 開 PR」，但沒有回答：

- 誰驗證 AI 的輸出？
- 誰為 AI 產物的失敗負責？
- AI 可以修改什麼、不可以修改什麼？
- 哪些動作必須人工核准？
- 變更如何被追蹤與稽核？
- 回滾如何處理？

這套治理模型在金融、保險、電信、公部門是**必要的**，而不是「做不做都可以」。

---

## 5. 如果有盲點，建議解決方案是什麼？

| Blind Spot                                         | Why It Matters                                               | Recommended Fix                                                                                                                    |
| -------------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| 標題把「角色演化」講成「職位死亡」                 | 造成恐慌、誤導職涯規劃、讓人放棄仍然有價值的領域             | 用 **DevOps 五層分層模型**：L1 操作層下降、L2 自動化層加速、L3 平台層上升、L4 可靠性層上升、L5 治理架構層大幅上升。目標是往上移動。 |
| 高估 AI Agent 產出 IaC 的直接可用性                | 金融 / 受監管產業有權限、命名、合規、成本等隱性約束          | 建立 **AI-generated IaC 審查管線**：AI 初稿 → 靜態檢查 → Policy-as-Code → 安全掃描 → 成本估算 → 架構審查 → 測試驗證 → 人工核准。      |
| 低估 DevOps / SRE 既有的自癒與韌性設計             | 把 AIOps 寫成「新革命」，貶低了已有工程資產                  | 定位 **AIOps 為既有可靠性工程的強化**，用五級成熟度導入：L1 提醒 → L2 關聯 → L3 建議 → L4 半自動 → L5 全自動。金融業謹守 L1~L3。    |
| 忽略 Junior 培育問題                               | 未來 Senior 斷層、組織失去人才接班                           | 設計 **Junior 六階段訓練模型**：AI 產生 → 人工審查 → 失敗案例 → Runbook 操作 → 架構推理 → 正式審查。讓 Junior 學會審查 AI，而非依賴 AI。  |
| 缺少 AI Agent 治理模型                             | 金融 / 醫療 / 政府場景無法直接套用自由工作流                 | 建立 **AI SDLC Governance 框架**：Context Governance + Permission Control + Human Approval + Change Traceability + Rollback + Evaluation。 |

### DevOps 五層分層模型（核心框架）

| 層級       | 工作內容                             | 未來價值              |
| ---------- | ------------------------------------ | --------------------- |
| L1 操作層  | 寫 YAML、修 Pipeline、手動部署       | **下降**              |
| L2 自動化層 | IaC、CI/CD、Runbook、監控            | 仍重要，會被 AI 加速  |
| L3 平台層  | IDP、Golden Path、自助式部署         | **上升**              |
| L4 可靠性層 | SLO、Incident、AIOps、自動修復邊界   | **上升**              |
| L5 治理架構層 | 權限、資安、法遵、AI Agent Governance | **大幅上升**          |

**目標：不要停在 L1 / L2，往 L3~L5 移動。**

### AIOps 分級導入（金融業版）

| 等級      | 說明                   | 金融業建議            |
| --------- | ---------------------- | --------------------- |
| L1 提醒   | AI 偵測異常並通知      | ✅ 優先導入           |
| L2 關聯   | 合併告警、整理事件     | ✅ 優先導入           |
| L3 建議   | 推薦 Runbook / 處理方式 | ✅ 優先導入           |
| L4 半自動 | 人工核准後執行修復     | ⚠️ 限低風險場景       |
| L5 全自動 | AI 直接修復正式環境    | ❌ 僅無狀態、低風險   |

**適合自動化：** 無狀態服務擴容、重啟異常 Pod、清理暫存檔、重送失敗訊息、產 RCA 草稿、整理事故時間線。

**不適合自動化：** 改正式資料庫 Schema、改核心 IAM 權限、執行高風險 SQL、修改交易邏輯、變更正式環境網路策略。

---

## 6. 歸納關鍵字學習

| Keyword                      | 中文說明                    | Why It Matters                                        | Learn Next                                                   |
| ---------------------------- | --------------------------- | ----------------------------------------------------- | ------------------------------------------------------------ |
| DevOps                       | 開發與維運整合實踐          | 本質是改善軟體交付系統，不是「寫 YAML」                | Google SRE Book、Accelerate 四個指標                          |
| Platform Engineering         | 平台工程                    | DevOps 演化方向中槓桿最大                             | Team Topologies、Humanitec / Backstage 案例                   |
| Internal Developer Platform  | 內部開發者平台（IDP）       | 把 DevOps 能力產品化，讓整個組織都能自助              | Backstage、Port、Humanitec                                    |
| Golden Path                  | 黃金路徑                    | 降低開發者決策疲勞、減少踩雷                          | Spotify / Netflix 的 paved road 實踐                          |
| Infrastructure as Code, IaC  | 基礎設施即程式碼            | AI 時代最需要被治理的產出                             | Terraform、OpenTofu、Pulumi；重點在**審查機制**                |
| Policy as Code               | 政策即程式碼                | 把合規從文件變成自動檢查                              | OPA / Conftest / Kyverno / Sentinel                           |
| GitOps                       | 以 Git 為真實來源的維運     | 可稽核、可回滾、適合金融業                            | ArgoCD、Flux                                                  |
| SRE                          | 網站可靠性工程              | 把可靠性工程化、量化                                  | SLI / SLO / Error Budget / Toil Reduction                     |
| SLI / SLO / Error Budget     | 指標 / 目標 / 錯誤預算      | 可靠性管理的共同語言                                  | Google SRE Book 前三章                                        |
| Observability                | 可觀測性                    | AIOps 與事故處理的前提                                | Logs + Metrics + Traces；OpenTelemetry                        |
| AIOps                        | AI 驅動的維運               | 強化既有可靠性工程，不是取代                          | Anomaly detection、告警關聯、自動 RCA                          |
| Incident Management          | 事故管理                    | 正式環境品質的最後防線                                | PagerDuty / Incident.io、Blameless Postmortem                 |
| LLMOps                       | 大型語言模型維運            | AI 應用上線後的治理                                   | Prompt 版本管理、Model Serving、推論成本                       |
| AI Infrastructure            | AI 基礎設施                 | 高薪工程的新藍海                                      | GPU 調度、推論服務化、模型 Gateway                             |
| GPU Scheduling               | GPU 排程                    | 成本與效率的瓶頸                                      | Ray、Kubernetes device plugin、MIG                             |
| Vector Database              | 向量資料庫                  | RAG 的基礎                                            | pgvector、Pinecone、Milvus、Qdrant                             |
| RAG Pipeline                 | 檢索增強生成管線            | 企業 AI 應用的主流架構                                | Chunking、embedding、retrieval 策略                            |
| **AI SDLC Governance**       | **AI 軟體開發週期治理**     | **差異化的關鍵能力，金融業剛性需求**                  | AI-generated code review、audit trail、approval gate          |
| Agent Permission             | 代理人權限控管              | Agentic 系統的安全邊界                                | 最小權限、工具白名單、OAuth Scope                              |
| Context Governance           | 上下文治理                  | 資料不洩漏、提示不被污染                              | Prompt injection 防禦、PII 過濾                                |
| Human-in-the-loop            | 人類監督迴圈                | AI 系統責任歸屬的機制                                 | 核准流程設計、可撤回動作、審查介面                             |

---

## 7. 對使用者的實務 / 職涯建議

### A. 職涯定位

**不要把自己定位為：**

> Traditional DevOps Engineer（會用工具的人）

**要把自己定位為：**

> **Cloud Platform / AI SDLC / SRE-oriented Platform Architect**（能設計企業級 AI 雲端開發平台的人）

### B. 技術學習路徑（P0~P3）

| Priority | Topic                        | Reason                                                    |
| -------- | ---------------------------- | --------------------------------------------------------- |
| P0       | Platform Engineering + IDP   | DevOps 演化方向中槓桿最大，直接對應 L3 平台層              |
| P0       | AI SDLC Governance           | 與一般工具使用者的差異化，金融業剛性需求                    |
| P1       | SRE + Observability + SLO    | L4 可靠性層的地基，AIOps 的前提                            |
| P1       | IaC Governance + Policy-as-Code | 安全使用 AI 產生基礎設施的前提                           |
| P2       | LLMOps / RAG Infrastructure  | 中期重要成長領域，但先把 L3/L4 打穩再進                     |
| P3       | GPU Scheduling / 模型訓練    | 只在角色真的需要深度 AI infra 時才學                       |

### C. 企業導入建議（金融業版）

在金融業推動 AI DevOps / AIOps 時，必須建立的治理框架：

| 面向                  | 管控內容                                       |
| --------------------- | ---------------------------------------------- |
| Context Governance    | AI 可以讀哪些文件、程式碼、Log、事故紀錄        |
| Permission Control    | AI 可以執行哪些命令、修改哪些檔案               |
| Human Approval        | 哪些動作必須人工核准（正式環境、IAM、Schema）   |
| Change Traceability   | AI 產出與修改都要留 audit trail                 |
| Security Review       | 權限、Secret、網路、資料風險審查                |
| Deployment Gate       | 正式環境部署前的品質閘門                        |
| Incident Logging      | AI 建議與執行結果要留紀錄                       |
| Rollback Policy       | AI 相關變更必須能快速回復                       |
| Evaluation            | 定期評估 AI 導入後的品質、效率、事故率           |

### D. Junior 培育模式（組織管理者視角）

若你負責帶人或設計內訓，建議六階段：

1. **AI 產生** — 讓 Junior 看 AI 如何產出初稿
2. **人工審查** — 要求 Junior 找出 AI 產物的問題
3. **失敗案例** — 給錯誤的 IaC / Pipeline / K8s 設定讓他除錯
4. **Runbook 操作** — 依 Runbook 處理模擬事故
5. **架構推理** — 要求說明為什麼這樣設計，而不是只貼答案
6. **正式審查** — Senior Review 後才允許進入較高風險環境

這樣 Junior 不會被 AI 養成複製貼上工程師，而是**逐步養成能審查 AI 的工程師**。

### E. Avoid（要避免的陷阱）

- 只學工具（Terraform / Kubernetes / Jenkins 當作終點）
- 追每一個 AI 新框架（追 hype 不累積深度）
- 把 prompt 使用當作深度工程能力
- 忽略 SDLC 成熟度（CI/CD 品質、Review 文化、SLO）
- 假設 AI 產的基礎設施可直接上正式環境

---

## 8. 最終結論

這篇文章的標題是流量包裝，但底層訊號是真的：**低階 DevOps 操作正在被壓縮，高階平台與治理能力正在升值。**

作者本人在留言區已經自我修正「DevOps isn't dying, it's expanding」，所以不要被標題嚇跑。正確的解讀是：

> **DevOps 沒有死亡；死亡的是只會重複操作、缺乏架構判斷、缺乏平台思維的低階 DevOps。AI 會降低樣板產出的成本，但會提高架構審查、系統可靠性、平台治理與 AI Agent 管控的價值。**

對你的職涯來說，這篇文章的價值不是提醒你「不要學 DevOps」，而是提醒你：

> **不要把自己卡在工具操作層。你要往平台層、可靠性層、治理層、AI SDLC 層移動。**

職涯主線建議定為：

> **Cloud Platform Architecture + Platform Engineering + SRE/AIOps + AI SDLC Governance**

更口語地說：

> **你不是要成為會寫 YAML 的人，而是要成為能設計企業級 AI 雲端開發平台的人。**

這才是未來比較有槓桿的方向。
