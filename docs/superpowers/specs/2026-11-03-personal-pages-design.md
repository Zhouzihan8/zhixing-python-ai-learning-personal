# 个人学习站的 GitHub Pages 版本

## 目标

为个人学习版提供独立、固定的公开网址，作为 ChatGPT Sites 之外的第二个托管入口。课程页保留知识树、正文、交互演示和指向作者本机 VS Code 实践文件的链接。

## 边界

- 不改 `D:\学习\学习网站` 本机学习站。
- 不改现有 `zhixing-python-ai-learning` 公开仓库。
- 新仓库只放个人版静态站点、Pages 发布配置和说明；不复制练习下载包。
- 本机路径入口只在作者电脑上有意义。公开站点不能远程访问作者电脑。
- GitHub Pages 的可达性受地区网络、运营商和代理策略影响，不承诺所有网络都可用。

## 考虑过的方式

- 继续只使用 ChatGPT Sites：维护简单，但不满足增加独立访问域名的需求。
- 使用本机服务器：可连接本机 Python 和 VS Code，但网址依赖本机运行状态和网络环境。
- 新建 GitHub Pages 仓库：公开静态内容，提供固定 HTTPS 项目网址，并与 ChatGPT Sites 分开发布。采用此方案。

## 发布方式

将个人版 `dist` 的站点文件复制到仓库 `site/`，GitHub Actions 使用 Pages artifact workflow 部署。源码与正式 Pages 网址均可公开访问。
