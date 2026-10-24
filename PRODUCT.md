# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated: 用户明确授权 Agent 自主选择有帮助的改进和实施路线。本轮采用静态 HTML/CSS、浏览器原生 JavaScript 与 GitHub Pages；不引入框架、账户、后端数据库或付费服务。

## Users

用户主要通过中文手机界面使用这些 App，希望说出目标后即可取得能下载使用的结果。访问者要快速找到相应的正式 Android 安装包，不需要理解仓库、分支或发布附件。

## Product Purpose

Agent 在现有公开分发仓库增加手机友好的应用目录：展示用途、正式版本、下载与更新说明。这个入口由 Agent 在本轮综合改进中选择，不冒称用户已审美验收。

## Capabilities and Constraints

- 唯一版本与安装包来源是本仓库既有 catalog.json 和各 apps/*/stable.json；网页不维护第二份版本号或下载地址。
- 已发布的 APK、摘要、原证书、稳定清单和历史 Release 保持原样。没有可用版本或加载失败时不猜下载地址。
- 不请求登录或 GitHub API 认证。静态站点与相对路径 JSON 同源读取，避免页面为每个 App 消耗匿名 API 额度。
- 清单只包含已公开的分发资料。源码连接只在来源已公开时提供；不发布私有内容、账号资料或密钥。
- 所有下载沿正式 GitHub 资产地址，安装由 Android 系统确认。手机现场安装及更新后旧数据保留未因网页测试而得到验证。

## Brand Commitments

沿用已明确的偏好：苹果产品的精致、一致与优秀开源软件的清爽实用。选一套克制、一致的手机操作界面，不做混搭的营销模板，不虚构 App 截图。

## Evidence on Hand

catalog.json 中的真实 App 名称及固定 appId；apps/*/stable.json 中已发布的版本、用途来源、安装包身份和中文更新说明。现有 README 与原项目公开资料用于核实用途和许可。新增网页暂未获得用户的视觉认可。

## Accessibility & Inclusion

中文、小屏和大字优先；最低覆盖 320px 宽、200% 字号、深浅色、键盘焦点和系统减少动效设置。主要下载控件保持可触达；内容不能靠缩字或横向滚动勉强塞入。
