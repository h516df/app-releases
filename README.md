# Android 正式安装包

统一公开分发仓库：`h516df/app-releases`。固定数字 **repoID：1426495445**，所有者 ID：`155412647`。仓库显示名和 App 显示名可变，数字 repoID 与下列 appId 不变；勿删除重建此仓库。

仅发布经核验的正式 APK、中文更新说明、SHA256 校验清单及必要分发资料。APK 保持原字节和原签名。这里不存放私有源码、源仓库 Issues、个人数据、配置、凭据或签名私钥；源码仓库可见性不因分发改变。

## 固定入口

客户端保存数字 repoID，以 `appId + channel` 定位，当前 channel 为 `stable`：

- 总目录：`GET https://api.github.com/repositories/1426495445/contents/catalog.json?ref=main`
- 每 App：`GET https://api.github.com/repositories/1426495445/contents/apps/<appId>/stable.json?ref=main`
- 以上请求使用 `Accept: application/vnd.github.raw+json`，可匿名访问；普通 JSON 响应则解码 Contents API 的 base64 `content`。
- `appId` 为 `walkpaint`、`jiyixia`、`liuzheba`、`kaifanla`、`xiayizhang`。不得根据显示名推断 appId 或包名。
- 不用仓库级 `/releases/latest` 判断任何 App 的最新版本。Release 标签按 `<appId>-<channel>-v<versionName>` 隔离。

## 清单契约 v1

每个入口都有 `schemaVersion`（1）、`repositoryId`、`appId`、`channel`、`status`。

`status: unavailable` 表示本分发入口暂无已验证正式包，没有版本或下载地址；这不代表源项目没有版本。客户端显示“暂无可用版本”，不得当成可更新或错误回退到别的 App。

`status: published` 额外包含真实的 `applicationId`（Android 包名）和 `release`：

| 字段 | 含义 |
| --- | --- |
| `versionCode` / `versionName` | APK 内真实版本；仅 versionCode 大于已安装版本才提示更新 |
| `signingCertificateSha256` | 原签名证书的 SHA256，64 位小写十六进制；客户端仍须与已安装应用证书核对 |
| `minSdk` / `abis` | APK 实际最低 Android API 和支持的 ABI |
| `tag` / `releaseId` | 本仓库指定发布身份，不使用全库 latest |
| `notes` | 中文 `新增`、`改进`、`修复`、`说明` 数组，沿用既有更新工具格式 |
| `apk` | `assetId`、`fileName`、公开 HTTPS `url`、精确字节 `size` 和 `sha256` |
| `source` | 原正式发布的 repoID、Release ID、标签、APK 资产 ID 和官方来源 URL |
| `verification` | 目标公开 APK 本次匿名下载时间、字节数及 SHA256 |

清单、APK 包名、版本、原证书、最低系统及 ABI 必须一致；下载后验证字节数/SHA256和签名，再交给 Android 系统覆盖安装。仅允许 GitHub 与官方 GitHub 资产域名，不把认证传给跳转域名，不在 App 中放令牌。

## 发布顺序

复用维护方已有发布工具，不在本仓库存放私有工具源码或项目配置。先独立核对源正式 Release 和原包身份；不存在相同内容时才创建按 App 隔离的草稿，上传原 APK、原中文说明及原 SHA256 文件。核对远端资产后公开 Release；随后实际匿名下载目标资产，验证精确大小/SHA256和原签名，通过后最后更新对应稳定清单。失败时保留原稳定入口和历史发布，不删除或覆盖已有附件，不把旧包冒充新版本。

GitHub 网页可能自动提供该分发仓库自身的 Source code zip/tar；本仓库不复制任何源 App 源码压缩包。
