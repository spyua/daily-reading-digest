# Core Analysis Framework（8 Steps）

依序執行以下 8 個步驟，不要跳步。

---

## 1. What Problem Is the Article Discussing?

辨識文章底層真正在處理的問題。

**不要停在標題。** 許多文章的標題是為了吸引注意而做的煽動性包裝，例如：

- "DevOps is dead"
- "Don't become X"
- "AI will replace Y"
- "Software engineering is over"

把這些標題轉譯為更精準的問題陳述。

### 範例

**錯誤解讀：**
> DevOps 正在死亡。

**較好的解讀：**
> 低層次、重複性的 DevOps 工作正在被 AI 與自動化壓縮；而高層次的平台、可靠性、治理能力正在變得更有價值。

### 輸出內容應包含

- 表層議題（surface-level topic）
- 底層真正的問題（deeper underlying question）
- 這個議題為何重要
- 誰會被影響
- 這反映了什麼產業或職涯轉變

---

## 2. What Is the Argument Structure?

把文章拆成論證鏈，用以下格式：

```text
Claim 1
  ↓
Supporting reason
  ↓
Example or evidence
  ↓
Conclusion or implication
```

必要時做成表格：

| Layer               | Argument                            | Meaning                            |
| ------------------- | ----------------------------------- | ---------------------------------- |
| Problem framing     | 文章聲稱什麼正在改變                | 說明脈絡                           |
| Cause               | 為何改變正在發生                    | AI、自動化、市場變化等             |
| Impact              | 誰或什麼被影響                      | 角色、工具、實踐                   |
| Suggested direction | 作者的建議                          | 新角色或新策略                     |
| Final thesis        | 文章真正要傳達的訊息                | 濃縮的結論                         |

**不要只做逐段摘要。** 要抽出論證背後的邏輯。

---

## 3. Does the Article Provide a Solution?

判斷文章給出的解法是哪一層級：

| Level | Description                       |
| ----- | --------------------------------- |
| L0    | 沒有解法，只有意見                |
| L1    | 方向性建議                        |
| L2    | 角色或技能建議                    |
| L3    | 實務執行步驟                      |
| L4    | 完整框架或運作模型                |

接著說明：

- 文章提出的解法是什麼
- 是否可執行
- 缺少什麼
- 如何讓它變得更有用

### 範例

> 這篇文章建議從傳統 DevOps 轉往 Platform Engineering、AI 導向的 SRE、以及 AI Infrastructure。方向上是對的，但沒有給出實際的轉職路徑、技能地圖、治理模型、或實作 checklist。

---

## 4. What Are the Blind Spots?

從至少 5 個角度檢視盲點。

### A. 誇大（Overstatement）

檢查文章是否誇大，例如：

- "X is dead"
- "AI will fully replace Y"
- "No one needs to do Z anymore"
- "One prompt can solve it"

把誇大的聲明重新包裝成精準的聲明。

### B. 缺少企業脈絡（Missing Enterprise Context）

檢查文章是否忽略：

- 合規
- 稽核
- 安全
- 審核流程
- 變更管理
- 舊系統
- 成本控制
- 資料保護
- 責任歸屬

這對金融、保險、醫療等受監管產業特別重要。

### C. 缺少維運現實（Missing Operational Reality）

檢查文章是否低估：

- 除錯難度
- 整合複雜度
- 環境差異
- 正式環境事故
- 回滾
- 可觀測性
- 事故應變
- 人工審核

### D. 缺少人才培育問題（Missing Talent Development Problem）

如果文章說 AI 取代初階工作，要問：

> 如果初階工程師不再有實際維運經驗，未來的資深工程師會從哪裡來？

### E. 缺少治理模型（Missing Governance Model）

檢查文章是否說明 AI 產生的成果如何被審核、核准、稽核、部署。

重要問題：

- 誰驗證 AI 的輸出？
- 誰為失敗負責？
- AI 可以修改什麼？
- 什麼需要人工核准？
- 變更如何被追蹤？
- 回滾如何處理？

---

## 5. What Counterpoints Appear in Comments or Discussion?

若有留言內容，把社群反應抽出來分類：

| Comment Type               | Meaning                                  |
| -------------------------- | ---------------------------------------- |
| Agreement                  | 支持文章論點                             |
| Correction                 | 修正或軟化文章                           |
| Rebuttal                   | 直接反對                                 |
| Practical field experience | 補充實務細節                             |
| Career anxiety             | 表達對未來角色的不確定                   |
| Deeper systemic issue      | 提出更大的產業議題                       |
| Low-value comment          | 讚美、垃圾訊息、不相關連結               |

對每個有意義的反論，摘要：

- 留言者在說什麼
- 它強化還是削弱了文章
- 該抽出什麼洞見

### 範例

> 多個留言者拒絕「DevOps 正在死亡」的說法。他們更強的主張是：DevOps 正在擴展為 platform engineering 和 SRE。這讓文章標題變弱，但讓底層趨勢變得更準確。

---

## 6. Recommended Fixes for the Blind Spots

每個主要盲點都要給實際的修正，使用以下格式：

| Blind Spot | Why It Matters | Recommended Fix |
| ---------- | -------------- | --------------- |

### 範例

| Blind Spot                                      | Why It Matters                                                                   | Recommended Fix                                                                                |
| ----------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| 文章誇大 DevOps 即將消失                        | 製造恐慌、誤導職涯規劃                                                           | 把 DevOps 重新定位為從維運工作演化為平台、可靠性、治理工作                                     |
| 假設 AI 產生的 IaC 可直接上線                   | 企業基礎設施需經過安全、稽核、成本、維運審查                                     | 建立 AI-generated IaC 審核 pipeline                                                            |
| 忽略初階工程師培育                              | 未來的資深工程師需要實戰經驗                                                     | 設計 AI 輔助的初階訓練計畫                                                                     |

---

## 7. Extract Learning Keywords

產出關鍵字學習清單，每個關鍵字包含：

- 英文詞
- 繁中說明
- 為何重要
- 下一步學什麼

表格格式：

| Keyword | 中文說明 | Why It Matters | Learn Next |
| ------- | ---- | -------------- | ---------- |

推薦關鍵字清單見 `../assets/keyword-glossary.md`。

---

## 8. Provide Practical Recommendations

依使用者情境，給出以下任一或多種建議：

### A. 職涯建議

回答：

- 使用者該學什麼？
- 該避免什麼？
- 該停止過度重視什麼？
- 什麼技能組合能創造槓桿？
- 什麼角色定位最強？

### 範例

> 不要把自己定位為傳統 DevOps 工程師。把自己定位為能同時結合 Cloud Architecture、Platform Engineering、SRE/AIOps、AI SDLC Governance 的人。

### B. 技術學習路徑

按優先順序分層：

| Priority | Topic                 | Reason                                             |
| -------- | --------------------- | -------------------------------------------------- |
| P0       | Platform Engineering  | DevOps 演化方向中槓桿最大                          |
| P0       | AI SDLC Governance    | 與一般工具使用者的差異化                           |
| P1       | SRE and Observability | 可靠性與 AIOps 的基礎                              |
| P1       | IaC Governance        | 安全使用 AI 產生基礎設施的前提                     |
| P2       | LLMOps / RAG Infra    | 中期重要成長領域                                   |
| P3       | GPU Scheduling        | 只在角色需要深度 AI infra 時學                     |

### C. 企業導入建議

金融 / 企業環境中，必須涵蓋：

- 人工核准邊界
- 稽核日誌
- 權限控管
- 安全審查
- 回滾計畫
- 變更管理
- AI 產生程式碼審查
- Policy-as-code gates
- 事故治理
