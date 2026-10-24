# CognitiveBench.com Reaction Time Test MVP — Cursor 开发 TODO

> 把本文件放到项目根目录，命名为 `TODO.md`。让 Cursor 按顺序执行，每完成一项就勾选；不要擅自扩大范围。遇到需要产品决策的问题，记录到文末“待确认问题”，不要自行引入数据库、账号、支付或 CMS。

## 交付目标

在 `cognitivebench.com` 上线一个英文 Reaction Time Test。用户可以在桌面端或移动端完成 5 轮测试，查看平均值、中位数、最佳成绩和基础结果解释，并把最近成绩保存在本地浏览器。

首版只做 Reaction Time Test。代码结构需要方便以后加入 Number Memory、Visual Memory、Sequence Memory 和 Stroop，但本次不开发这些测试。

## 产品定位

**Brand:** CognitiveBench  
**Positioning:** Free browser-based cognitive tests with personal benchmarks.  
**Homepage H1:** Free Cognitive Tests  
**Reaction page H1:** Reaction Time Test

首版只提供娱乐和一般自我评估工具，不提供医疗诊断、正式心理测评或临床建议。

## MVP 成功条件

- 用户无需注册即可开始测试。

- 一次测试包含 5 个有效回合。

- 测试结束后显示平均值、中位数、最佳值和 5 次明细。

- 最近 10 次完整测试保存在 `localStorage`。

- 页面刷新后仍能看到最近一次结果。

- 桌面端、移动端键盘和触摸操作可用。

- 核心文字、链接和元数据存在于初始 HTML 中，不依赖客户端 JavaScript 才出现。

- `/`、`/tests/`、`/tests/reaction-time/`、`/methodology/`、`/privacy/`、`/terms/` 和 `/disclaimer/` 可以访问。

- Lighthouse mobile 的 Performance、Accessibility、Best Practices、SEO 四项均达到 90 分以上，若第三方脚本导致下降，记录原因。

- 无账号、支付、数据库、后台、排行榜、AI 功能和博客。

## 非目标

本次不要开发：

- 用户注册、登录和云同步

- Stripe、Creem、订阅或一次性付款

- 数据库、Supabase、Firebase 或服务端成绩存储

- 公共排行榜和用户资料页

- 正式 IQ 分数或智力诊断

- 年龄常模或未经验证的科学百分位

- Number Memory、Visual Memory、Sequence Memory、Stroop 的实际游戏逻辑

- 博客、CMS、邮件系统和多语言版本

- 广告和 Affiliate

- “提高智商”“预防痴呆”“治疗 ADHD”等功效声明

## 建议技术栈

若项目尚未初始化，使用：

- Next.js,App Router

- TypeScript

- Tailwind CSS

- ESLint

- Vitest + Testing Library

- Playwright

- Vercel 或 Cloudflare Pages 部署

使用当前稳定版本。初始化后把实际版本写入 `README.md`，不要在代码中依赖未确认的版本特性。

内容页默认使用 Server Components 或静态生成。Reaction Time Test 的交互部分使用独立 Client Component。不要把整站做成 CSR-only SPA.

## 建议目录结构

```plaintext
app/
├── layout.tsx
├── page.tsx
├── robots.ts
├── sitemap.ts
├── tests/
│   ├── page.tsx
│   └── reaction-time/
│       ├── page.tsx
│       └── opengraph-image.tsx        # 可选，时间不足则后置
├── methodology/page.tsx
├── privacy/page.tsx
├── terms/page.tsx
└── disclaimer/page.tsx

components/
├── site-header.tsx
├── site-footer.tsx
├── test-card.tsx
└── reaction-time/
    ├── reaction-test.tsx
    ├── test-stage.tsx
    ├── result-summary.tsx
    ├── attempt-table.tsx
    └── recent-results.tsx

lib/
├── analytics.ts
├── reaction-time.ts
├── storage.ts
└── constants.ts

types/
└── tests.ts

tests/
├── unit/
└── e2e/
```

未来测试统一使用 `/tests/[test-slug]/`，不要创建子域名。

# 开发任务

## 项目初始化

- [x] 初始化 Next.js + TypeScript + Tailwind CSS 项目。

- [x] 启用 ESLint，并增加 `typecheck`、`test`、`test:e2e` 和 `build` scripts.

- [x] 创建 `.env.example`，只放公开配置项名称，不提交密钥。

- [x] 创建基础 `README.md`，写明安装、开发、测试和构建命令。

- [x] 配置全局字体、颜色、最大内容宽度、按钮和 focus 样式。

- [x] 设置站点常量：品牌名、站点 URL、默认 title 和默认 description。

**验收：** 新环境按 README 执行后可以启动；`lint`、`typecheck` 和 `build` 通过。

## 全站布局与导航

- [x] 创建响应式 Header，包含 Home、Tests、Methodology.

- [x] 创建 Footer，包含 Privacy、Terms、Disclaimer.

- [x] 添加 Skip to content 链接。

- [x] 所有交互元素提供可见的键盘 focus 状态。

- [x] 设置英文页面语言为 `en`。

- [x] 设置基础 metadata、favicon 占位和 canonical URL.

**验收：** 在 320px、768px 和 1440px 视口下无横向滚动；只用键盘可以访问全部导航链接。

## 首页 `/`

- [x] 使用 H1 `Free Cognitive Tests`。

- [x] 添加一句定位说明：免费测试 reaction time、memory 和 attention，并比较个人成绩。

- [x] 首屏显示 Reaction Time Test 主卡片和明确 CTA：`Start the Reaction Time Test`。

- [x] 为 Number Memory、Visual Memory、Sequence Memory 和 Stroop 添加 `Coming soon` 卡片，但不可伪装成可用链接。

- [x] 添加简短的非医疗说明，并链接到 Disclaimer。

- [x] 不添加空洞统计数字、虚构用户数量或未经验证的科学背书。

**首页 metadata:**

```plaintext
Title: Free Cognitive Tests – Reaction Time, Memory & Attention
Description: Take free browser-based tests for reaction time, memory and attention. Compare your scores and track your progress.
```

**验收：** 关闭 JavaScript 后，H1、定位、Reaction CTA、测试列表和免责声明仍存在于 HTML 中。

## Tests 聚合页 `/tests/`

- [x] 列出 Reaction Time Test，并标记为可用。

- [x] 列出四个未来测试并标记为 Coming soon。

- [x] 每个测试用统一的数据结构渲染，字段至少包括 `slug`、`name`、`description`、`status`。

- [x] 不为 Coming soon 项创建空页面。

**验收：** 后续新增测试只需添加配置和对应路由，不需要改写聚合页布局。

## Reaction Time Test 页面 `/tests/reaction-time/`

- [x] 服务端输出页面标题、简介、操作说明、误差说明、FAQ 和相关链接。

- [x] 首屏尽快出现 `Start Test`，不要用大面积装饰 Hero 挡住工具。

- [x] 解释测试流程：5 rounds；等待区域变色后点击或触摸；提前点击不计入成绩。

- [x] 明确提示设备、屏幕刷新率、浏览器、鼠标和触摸输入会影响结果。

- [x] 页面下方解释成绩仅适合娱乐和一般自我比较，不是医疗或临床测评。

- [x] 结果出现后推荐返回 Tests 页面，但不要添加尚未可用的测试 CTA。

**Reaction 页面 metadata:**

```plaintext
Title: Reaction Time Test – Check Your Visual Response Speed | CognitiveBench
Description: Take a free reaction time test, complete five rounds, and compare your average, median and best response times.
```

## Reaction Test 状态机

不要用一组互相冲突的布尔值管理状态。实现明确状态：

```plaintext
idle → waiting → ready → result → waiting ... → complete
                  ↘ false-start → waiting
```

- [x] `idle`：显示说明和 Start Test。

- [x] `waiting`：显示 `Wait for green…`，随机等待 1.5–4.5 秒。

- [x] `ready`：记录高精度开始时间，显示绿色区域和 `Click now!`。

- [x] 用户在 `ready` 点击时，用 `performance.now()` 计算毫秒差。

- [x] `result`：显示本轮成绩和下一轮按钮；短暂结果展示不要自动跳过得让用户来不及阅读。

- [x] `false-start`：用户在 waiting 阶段点击时显示 `Too soon`，该回合不计入 5 次有效成绩。

- [x] 完成 5 个有效回合后进入 `complete`。

- [x] 组件卸载、重启测试或切换状态时清理所有 timeout。

- [x] 页面失去可见性后回到前台时，如果当前处于 waiting 或 ready，取消该回合并提示重新开始，避免后台计时产生错误。

- [x] 测试中禁用文本选择、拖拽和双击缩放造成的误操作，但不能破坏页面其他区域的无障碍操作。

- [x] 支持鼠标、触摸、Enter 和 Space；一次用户操作只能记录一次。

- [x] 测试区域设置合适的 `touch-action`，避免触摸延迟或页面滚动干扰。

## 计分与结果

- [x] 将 5 次有效成绩保留为整数毫秒数组。

- [x] 计算平均值、排序后的中位数、最佳值和最慢值。

- [x] 平均值采用四舍五入整数显示。

- [x] 不显示未经数据支持的“全球百分位”。

- [x] 使用中性区间解释，文案写成产品反馈而非科学常模；如果没有可靠依据，使用 `Your five-round average` 等描述，不标注 `excellent` 或 `below average`。

- [x] 显示 5 次明细表。

- [x] 提供 `Try Again`。

- [x] 提供 `Copy Result`，复制内容包含站点名、平均值、最佳值和页面 URL。

- [x] 使用 Web Share API 时提供 Copy fallback.

- [x] 分享行为只在用户主动点击后触发。

建议复制文本：

```plaintext
I averaged {average} ms with a best time of {best} ms on the CognitiveBench Reaction Time Test. Try it: https://cognitivebench.com/tests/reaction-time/
```

## 本地存储

定义带版本号的数据结构：

```typescript
type ReactionTestSession = {
  id: string;
  completedAt: string;
  attempts: number[];
  average: number;
  median: number;
  best: number;
};

type ReactionHistoryV1 = {
  version: 1;
  sessions: ReactionTestSession[];
};
```

- [x] 使用固定 key，例如 `cognitivebench:reaction-history:v1`。

- [x] 只在客户端访问 `localStorage`。

- [x] 保存最近 10 次完整测试，新的排在前面。

- [x] 写入前校验数据；读取异常或 JSON 损坏时安全回退为空记录。

- [x] 页面加载后显示最近一次成绩和最多 10 条历史。

- [x] 提供 `Clear history`，执行前弹出确认。

- [x] Privacy 页面明确说明成绩默认只保存在当前浏览器，不上传到 CognitiveBench 服务器。

**验收：** 完成测试后刷新页面，结果仍存在；清除浏览器数据后历史消失；损坏 localStorage 内容不会导致页面崩溃。

## 内容与可信度页面

### `/methodology/`

- [x] 解释测试从颜色变化到用户输入之间的浏览器测量方法。

- [x] 解释硬件、显示刷新率、输入设备、系统负载和浏览器会影响结果。

- [x] 说明不同设备上的成绩不适合直接比较。

- [x] 说明重复练习可能提高该任务表现，但不要外推为一般智力提升。

### `/privacy/`

- [x] 说明首版不要求账号。

- [x] 说明测试成绩保存在浏览器 localStorage。

- [x] 列出实际使用的分析工具；未接入前不要声称使用某工具。

- [x] 说明用户可通过 Clear history 或浏览器设置删除本地数据。

- [x] 提供联系邮箱占位符 `[CONTACT_EMAIL]`，上线前必须替换。

### `/terms/`

- [x] 说明服务按现状提供。

- [x] 禁止把结果用于就业、教育录取、医疗诊断或其他高风险决策。

- [x] 写明最低使用年龄策略；如未做儿童合规，建议限定 13 岁以上并在上线前确认。

- [x] 提供联系邮箱占位符，上线前替换。

### `/disclaimer/`

必须清楚包含以下含义，可调整英文表达但不能削弱：

> CognitiveBench provides browser-based tests for entertainment and general self-assessment. The results are not medical advice, a diagnosis, an IQ score, or a standardized clinical evaluation. If you are concerned about changes in memory, attention, reaction time, or other cognitive abilities, consult a qualified healthcare professional.

- [x] 不使用“scientifically proven”或“clinically validated”，除非未来有可核验依据。

- [x] 不声明测试可以预防痴呆、改善 ADHD 或提高智商。

## SEO

- [x] 每个正式页面设置唯一 title、description 和 canonical.

- [x] 创建 `sitemap.ts`，只包含正式可访问页面。

- [x] 创建 `robots.ts`，允许正常抓取生产站；预览环境使用平台设置避免索引。

- [x] 添加 Open Graph 和 Twitter Card 基础 metadata.

- [x] 全站只使用一个清晰 H1，标题层级顺序合理。

- [x] Header、Footer 和正文内链使用普通 `<a>` 输出的可抓取链接。

- [x] 为面包屑添加 `BreadcrumbList` JSON-LD.

- [x] Reaction 页面可添加与页面真实内容一致的 `WebApplication` JSON-LD.

- [x] FAQ JSON-LD 只能包含页面上实际可见的问答；如果没有可见 FAQ 就不要添加。

- [x] 不生成 doorway pages，不为 `is 200ms good` 等变体批量创建薄页面。

- [x] 暂不声称任何年龄或全球 percentile。

**验收：** 查看页面源代码可以看到 title、description、H1、说明文字和内部链接；Rich Results Test 不出现结构化数据错误。

## Accessibility

- [x] 测试不依赖颜色作为唯一状态提示，同时显示文字。

- [x] 主要状态变化使用合适的 `aria-live`，避免每毫秒更新造成读屏噪音。

- [x] 触控区域最小 44×44 CSS 像素。

- [x] 文本和背景满足 WCAG AA 对比度。

- [x] 支持 `prefers-reduced-motion`。

- [x] 测试区域有可理解的 accessible name 和操作说明。

- [x] 键盘用户可以开始、完成、重试、复制结果和清除历史。

- [x] 不自动抢夺焦点；必要的焦点移动应可预测。

## Analytics

首版使用一个轻量、隐私友好的分析方案，或暂时只接入 Vercel Analytics。不要同时接入多个分析平台。

封装统一事件函数；没有配置分析服务时为安全 no-op。

建议事件：

```plaintext
reaction_test_view
reaction_test_start
reaction_false_start
reaction_round_complete
reaction_test_complete
reaction_test_retry
reaction_result_copy
reaction_result_share
reaction_history_clear
```

- [x] `reaction_round_complete` 不发送可识别个人的信息。

- [x] `reaction_test_complete` 可以发送分桶后的平均值，不发送精确历史数组；建议桶为 `<200`、`200–249`、`250–299`、`300–399`、`400+`。

- [x] 不把测试结果放进 URL query、日志、页面 title 或第三方广告参数。

- [x] 分析脚本不得阻塞测试交互。

- [x] Privacy 页面与实际接入保持一致。

## 测试

### Unit tests

- [x] 平均值计算正确。

- [x] 奇数数组中位数计算正确。

- [x] 最佳值和最慢值计算正确。

- [x] 非法输入被拒绝或安全处理。

- [x] 本地存储 schema 读取、写入、截断到 10 条正确。

- [x] localStorage JSON 损坏时返回空记录。

- [x] 状态机不允许 waiting 状态的点击计入有效成绩。

- [x] 完成 5 个有效回合后进入 complete。

### E2E tests

为随机等待提供可测试的依赖注入或测试模式，不要让 E2E 每次真实等待 1.5–4.5 秒。

- [x] 用户能从首页进入 Reaction Time Test。

- [x] 用户能开始并完成 5 个有效回合。

- [x] false start 不增加有效回合数。

- [x] 完成后显示 average、median、best 和 5 条明细。

- [x] Try Again 会清空当前测试并重新开始。

- [x] 完成记录在刷新后仍存在。

- [x] Clear history 能删除记录。

- [x] 键盘 Enter 或 Space 能完成测试。

- [x] 404 页面存在且能返回首页。

## 性能与稳定性

- [x] 不加载大型 UI 组件库。

- [x] 首页和 Reaction 页面首屏不使用视频或大图。

- [x] 字体优先使用系统字体或 Next.js 字体优化。

- [x] 避免测试进行期间触发布局位移。

- [x] 清理所有 timer 和事件监听器。

- [x] 在页面切到后台、窗口失焦和浏览器休眠恢复后不生成异常成绩。

- [x] 生产构建无 console error.

- [x] 404、客户端异常和 localStorage 不可用时有安全回退。

## 部署

- [x] 在 Git 仓库创建 `main` 分支和合理的 `.gitignore`。

- [ ] 配置预览部署和生产部署。

- [ ] 将 `cognitivebench.com` 连接到生产项目。

- [ ] 配置 `www.cognitivebench.com` 与裸域的唯一主版本，并将另一版本 301 到主版本。

- [ ] 强制 HTTPS.

- [ ] 设置生产环境站点 URL。

- [ ] 确认预览域名不被搜索引擎索引。

- [ ] 部署后运行 `lint`、`typecheck`、unit、E2E 和 production build.

## 上线前内容检查

- [ ] 替换所有 `[CONTACT_EMAIL]`。

- [x] 搜索项目，确认没有 lorem ipsum、虚构统计、假评价和未完成占位文案。

- [x] 确认 Coming soon 卡片不可误导点击。

- [x] 确认所有链接有效。

- [x] 确认 Privacy、Terms 和 Disclaimer 与真实功能一致。

- [x] 确认没有 medical diagnosis、improve IQ、prevent dementia、treat ADHD 等表述。

- [x] 确认分享 URL 使用生产域名。

## 上线后检查

- [ ] 将 sitemap 提交到 Google Search Console.

- [ ] 使用 URL Inspection 检查首页和 Reaction 页面。

- [ ] 检查 canonical 是否指向生产 URL。

- [ ] 检查 robots.txt 和 sitemap.xml.

- [ ] 在真实 iPhone Safari、Android Chrome、Windows Chrome 和 macOS Safari 上完成一次测试。

- [ ] 检查触摸、鼠标、Enter 和 Space 输入。

- [ ] 检查 Web Share API 不可用时的复制 fallback.

- [ ] 跑一次 Lighthouse mobile，并记录基线。

- [ ] 观察 404、前端异常和测试完成事件是否正常。

- [ ] 上线 7 天后复盘测试开始率、完成率、false-start 比例、重试率和分享率。

# 最终验收清单

Cursor 在宣布完成前，必须逐项确认：

- [x] `npm run lint` 通过。

- [x] `npm run typecheck` 通过。

- [x] `npm run test` 通过。

- [x] `npm run test:e2e` 通过。

- [x] `npm run build` 通过。

- [x] 用户可以完成 5 个有效回合。

- [x] 提前点击不会被记录。

- [x] 后台切换不会产生异常成绩。

- [x] 平均值、中位数、最佳值和明细正确。

- [x] 最近 10 次完整测试可以保存、读取和清除。

- [x] JavaScript 关闭时仍能看到核心文本、导航和免责声明。

- [x] 全站没有账户、支付和数据库依赖。

- [x] 生产页面没有虚构基准或医疗功效声明。

- [ ] 生产域、canonical、sitemap 和 robots 配置正确。

# Cursor 执行规则

1. 先阅读整个 TODO，再开始修改代码。

2. 按任务顺序执行；完成后在本文件勾选。

3. 每完成一个可独立验证的阶段，就运行相关测试。

4. 不为了“未来扩展”引入数据库、状态管理框架、微服务或复杂抽象。

5. 共享逻辑只在出现第二个真实使用点时抽象；测试配置的数据结构可以提前统一。

6. 不安装用途重叠的依赖。

7. 不修改已确定的品牌、URL、页面标题和免责声明含义。

8. 遇到缺失的产品决策，写入下方“待确认问题”，继续处理不依赖该决策的任务。

9. 最终回复必须列出：完成项、未完成项、测试结果、已知问题和部署 URL。

# 待确认问题

- [ ] 生产联系邮箱是什么？

- [ ] 选择 Vercel 还是 Cloudflare Pages?

- [ ] 是否接入 Vercel Analytics，还是首版完全不接第三方分析？

- [ ] 最低使用年龄是否确定为 13 岁以上？

- [ ] `cognitivebench.com` 的裸域还是 `www` 作为 canonical 主版本？建议裸域。

## 实施备注（自动记录）

- 暂未部署到生产；部署平台、域名主版本、联系邮箱和 Analytics 仍待确认。
- Terms 暂按建议写为 13 岁以上，并注明上线前需最终确认。
- Canonical / 分享 URL 暂按裸域 `https://cognitivebench.com` 实现（与待确认建议一致）。
- Analytics 封装为安全 no-op；仅当 `NEXT_PUBLIC_ANALYTICS_ENABLED=true` 时尝试发送。
- GitHub 仓库：https://github.com/bluescorpio/CognitiveBench （本地 `origin` 已指向该地址）。
