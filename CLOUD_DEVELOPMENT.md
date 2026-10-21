# 云端开发 · app-releases

自 2026-10-21 起，后续源码开发、测试与构建默认在云端执行。

[在浏览器创建开发工作区](https://codespaces.new/h516df/app-releases)。选择本仓库的开发容器；首次创建会安装固定主版本工具与项目依赖。用完停止工作区，避免持续计费。也可以在 Codex 云端拉取本仓库，运行 `bash .devcontainer/setup.sh` 后使用同一检查入口。

```bash
bash cloud/check.sh
```

GitHub Actions 的 **Cloud development** 在 PR、main 推送及手动运行时检查。通过结果绑定当前提交；构建和模拟器通过不能替代实体手机验收。依赖与缓存可重建，代码必须提交到分支并推送，临时工作区不是长期资料备份。

## 当前边界

这里只维护公开分发元数据；不复制私有源码、密钥或小说资料，不改动稳定清单或历史 Release。

原 README、AGENTS 与交接文件中的 Windows 路径作为历史恢复线索保留；云端开发不依赖这些路径。生产运行与发布步骤按本节边界处理，不自动运行旧的本机派发、安装、隧道或签名脚本。凭据通过平台 Secrets 注入，不能进入源码、日志或构建附件；私有项目继续保持私有。

## 配置依据

- [Dev Container 规范](https://containers.dev/implementors/json_reference/)
- [GitHub Codespaces](https://docs.github.com/en/codespaces/overview)
