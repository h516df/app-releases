---
name: "应用库"
description: "中文手机优先的正式 Android 应用下载目录"
colors:
  bg: "#f7f8fa"
  surface: "#fff"
  text: "#20242b"
  muted: "#5b6472"
  line: "#e3e7ed"
  accent: "#005ec4"
  accent-bg: "#e9f2ff"
  focus: "#006ad4"
  subtle: "#eef0f4"
  warning: "#80521b"
  dark-bg: "#17191d"
  dark-surface: "#202329"
  dark-text: "#f0f2f6"
  dark-muted: "#b0b9c8"
  dark-line: "#383e49"
  dark-accent: "#9ac6ff"
  dark-accent-bg: "#233c5d"
  dark-focus: "#94c4ff"
  dark-subtle: "#2b3039"
  dark-warning: "#edc188"
typography:
  display:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif'
    fontSize: "clamp(2.1rem, 6vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.18
    letterSpacing: "-0.025em"
  headline:
    fontSize: "1.15rem"
    fontWeight: 650
    lineHeight: 1.5
  title:
    fontSize: "1.2rem"
    fontWeight: 650
    lineHeight: 1.35
  body:
    fontSize: "1rem"
    lineHeight: 1.5
  description:
    fontSize: "0.95rem"
    lineHeight: 1.6
  label:
    fontSize: "0.95rem"
    fontWeight: 650
    lineHeight: 1.5
  metadata:
    fontSize: "0.82rem"
    lineHeight: 1.5
  checksum:
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace"
    fontSize: "0.8rem"
    lineHeight: 1.65
rounded:
  skip-link: "8px"
  search: "12px"
  app-icon: "14px"
  action: "999px"
  circle: "50%"
spacing:
  page: "1.25rem"
  inline: "0.4rem"
  compact: "0.75rem"
  gap: "1rem"
  row: "1.5rem"
  section: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.accent-bg}"
    textColor: "{colors.accent}"
    typography: "{typography.label}"
    rounded: "{rounded.action}"
    padding: "0.58rem 1.05rem"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.surface}"
  button-unavailable:
    backgroundColor: "{colors.subtle}"
    textColor: "{colors.muted}"
    rounded: "{rounded.action}"
    padding: "0.58rem 1.05rem"
  button-text:
    backgroundColor: "transparent"
    textColor: "{colors.accent}"
    padding: "0.65rem 0.1rem"
  button-icon:
    backgroundColor: "{colors.subtle}"
    textColor: "{colors.text}"
    rounded: "{rounded.circle}"
    height: "44px"
    width: "44px"
  search-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.search}"
    padding: "0.75rem 1rem"
  app-row:
    padding: "1.5rem 0"
  app-icon:
    rounded: "{rounded.app-icon}"
    height: "3.5rem"
    width: "3.5rem"
---

# Design System: 应用库

## Overview

**Creative North Star: "系统式应用目录"**

Operate 操作界面：中性平面、统一蓝色动作、细分隔和小型几何标记，让中文手机用户直接找到应用并下载。沿用用户明确的苹果式精致统一与优秀开源软件的清爽实用；此方向由 Agent 在授权范围内落实，尚无用户审美认可。

本记录合并原有初步设计约定，以 `site/styles.css`、`index.html` 与 `site/app.mjs` 的实际实现为准。方向来源为 `seed:e892b56248183082`；用户偏好优先随机视觉题材，没有用户选卡、批准 comp 或独立 QUALITY BAR 卡。主写手报告已查看浅深色、小屏、大字及桌面，并操作搜索清空、展开说明和断网恢复；文档记录者只读源码，未独立渲染。独立 finish reviewer 报告 `ship`，没有 material fixes；手机安装和更新保数据仍未验。

**Key Characteristics:**
- 中文系统字体与清楚的大小层级。
- 蓝色动作、低彩度中性底色、细线分隔。
- 平面应用行与自绘 SVG 几何标记。
- 跟随系统的深浅主题与小屏、大字号重排。

## Colors

主色是克制的系统蓝，中性色承担阅读、边界与背景；规范值见 frontmatter，未另设第二主色。Sidecar 的八阶 OKLCH 色带由这些现有颜色推导，仅用于设计面板预览；页面没有额外使用这些合成色阶。

### Primary

- **操作蓝 / 深色浅蓝**：`accent` 用于下载、链接、展开状态和品牌标记；`accent-bg` 承载下载按钮与选择文字背景。对应的 `dark-*` token 在暗色主题整体替换。
- **焦点蓝**：`focus` 用于键盘轮廓与搜索框聚焦边界；深色主题使用 `dark-focus`。

### Neutral

- **冷白页面与白色表面**：`bg` 是整页底色；`surface` 是搜索框与跳转链接底色。深色使用 `dark-bg` 与 `dark-surface`。
- **墨色正文与灰色辅助文字**：`text` 承担名称、标题；`muted` 承担用途、版本和安装说明。深色对应同名 `dark-*` token。
- **细灰分隔与浅灰控件**：`line` 划分目录行和文件信息；`subtle` 承载主题按钮与暂无安装包操作，深色同样成对替换。
- **棕色状态提示**：`warning` 仅用于版本读取失败等提示；深色使用更明亮的 `dark-warning`。它是状态色，不是装饰性第二主色。

**The One Action Color Rule.** 所有应用共用同一套动作蓝；应用标记的区分色不扩散到下载按钮或页面主题。

## Typography

**Display Font / Body Font:** 使用 frontmatter `display.fontFamily` 中的平台系统字体栈，子元素继承。用户明确的中文手机与系统一致性要求落实为这套字体；没有下载展示字体。

**Label/Mono Font:** 常规标签仍用系统字体；只有 SHA-256 使用 `checksum` 的等宽栈。

### Hierarchy

- **Display**：`display` 对应页面主标题，响应式放大、紧行距，允许平衡换行。
- **Headline**：`headline` 对应目录分区标题。
- **Title**：`title` 对应应用名称；紧凑布局降到（1.12rem），允许任意位置换行。
- **Body / Description**：基础正文使用 `body`；应用用途使用 `description`，介绍短句为（1.05rem）。
- **Label / Metadata**：动作使用 `label`；版本、大小、日期使用 `metadata`，数字启用等宽数字对齐。
- **Checksum**：校验值按 `checksum` 显示为块级文本并断行；更新说明列表行距为（1.7）。

**The Readable Reflow Rule.** 通过换行和重排容纳长中文、大字与校验值，不把正文缩小来维持桌面三列。

## Layout

页头与页脚最大宽（64rem），主内容最大宽（52rem），共同水平留白为 `spacing.page`。主内容默认上留白（1.9rem）、下留白（3rem）；宽屏从（52rem）开始增加上留白至（2.6rem）。搜索框最大宽（32rem）；安装说明最大宽（42rem）。顶部与底部应用安全区域 inset。

应用列表以细线逐行分隔。默认每行为标记（3.5rem）、可收缩内容和动作三列，列间距为 `spacing.gap`；更新说明跨内容与动作列。行上下留白使用 `spacing.row`，宽屏增至（1.7rem）。版本资料自然换行。

列表容器宽不超过（20rem）时切为两列：标记缩至（3rem），名称在右侧，其余用途、版本、动作与详情跨整行；按钮位于内容下方。该容器断点随根字号变化，同时服务小屏与大字。视口不超过（380px）时收紧页头间距与品牌标记。没有横向滚动式目录或固定底部导航。

## Elevation & Depth

没有阴影、模糊或浮起卡片。层次来自中性背景、搜索框白色表面、浅色动作底与细分隔；焦点轮廓是交互反馈。按钮和链接仅在允许动效时对背景色与文字色执行（120ms ease-out）过渡，没有位移或布局动画。

**The Flat Directory Rule.** 用细分隔和留白组织应用行，沿用当前平面目录，不给每行增加阴影容器。

## Shapes

搜索框采用 `rounded.search`，应用标记采用 `rounded.app-icon`，紧凑标记使用搜索框同等圆角。下载及发行记录为胶囊，主题按钮为圆形；跳转链接使用更小圆角。边界均为（1px）细线。

标记是本页自绘 SVG，常规图标笔画（1.8）、圆头圆角；应用标记内部图形笔画（1.7），默认（1.9rem）。六种应用色由源码的 `data-app` 声明维护，仅帮助辨识条目，不是已获认可的品牌资产，也不提升为全局色板。

## Components

### Buttons

下载与清空搜索共用 `button-primary`：浅蓝底、蓝字、胶囊、最小高度（44px）。悬停使用 `button-primary-hover`；下载图标为（1rem）。发行记录使用低强调的 `button-unavailable`，字号（0.85rem）、字重（500），悬停换为分隔色背景和正文色；它仍是可用链接，不是 disabled 按钮。

刷新是 `button-text`，最小高度（44px），悬停下划线。主题切换是 `button-icon`，悬停使用分隔色背景。真实 disabled 仅用于刷新进行中：等待光标与透明度（0.65）。所有操作遵循全局焦点轮廓（3px，外移 4px），没有额外 active 视觉样式。

### Inputs / Fields

搜索框是带内联搜索 SVG 的单一搜索输入，`search-field` 承载背景、边界与内边距。框聚焦时边界切为焦点色；输入取消自身轮廓并通过父框反馈。输入字号（1rem）、行距（1.6），允许宽度收缩。占位文字为辅助文字色。

### Navigation

页头品牌链接和圆形主题按钮两端对齐；品牌字重（650），几何标记使用动作色。键盘跳转链接仅在聚焦时出现；页脚提供分发仓库链接。没有选中标签页、侧栏或多级导航。

### Application row

平面行包含标记、应用名称、用途、版本资料和下载链接。名称可换行，资料使用等宽数字；紧凑重排见 Layout。文件信息不是独立卡片。Sidecar 使用合成应用与占位版本呈现该组件，不代表新增目录记录。

### Release details

原生 `details/summary` 默认收起；summary 保留原生展开标记、最小高度（44px），展开文字变为动作色。更新说明分组、系统条件、文件名和校验值在展开区；文件信息用细线上分隔。长文件名与 SHA-256 可断行，发行记录链接保持触达高度。

### Status and empty state

读取中、失败与成功信息放在目录上方，失败使用状态色。无结果区居中，包含搜索标记、短解释和清空搜索按钮；恢复后返回同一目录。没有骨架屏、浮层 toast 或另一个错误组件体系。

## Do's and Don'ts

### Do:

- **Do** 使用成对的深浅主题 token，保留焦点与失败状态的区分。
- **Do** 让应用名称、用途、版本与下载形成同一条可扫描目录行。
- **Do** 保持主要操作至少 44px 高度，并让小屏与大字号触发内容重排。
- **Do** 复用自绘 SVG 与系统中文字体，保留长文本换行。

### Don't:

- **Don't** 把应用标记色当作每个应用独立的按钮主题。
- **Don't** 将本页几何标记当成应用已确认的品牌资产。
- **Don't** 为平面目录行添加重复阴影卡片，或为塞入三列而缩小正文。
- **Don't** 把本轮源码与渲染检查记录写成用户审美认可或手机安装验收。
