# 知行 · 我的 Python 与 AI 学习书桌

**在线学习站：** <https://zhouzihan8.github.io/zhixing-python-ai-learning-personal/>

这是个人学习版，独立于 [公开课程版](https://github.com/Zhouzihan8/zhixing-python-ai-learning) 和本地学习站。课程正文、知识树、浏览器交互演示均可直接打开；本仓库不附带练习下载包。

## 使用

1. 打开在线站点，从知识树进入第一课，或搜索知识点。
2. 先读讲解并预测演示结果，再运行示例、修改输入或条件。
3. 需要保存代码时，点击课程中的 VS Code 入口，在自己的电脑上打开已有实践文件。

课程中的 VS Code 与“本机 Python / VS Code”入口按站点所有者的本机目录配置，只适用于作者电脑。其他访问者可以浏览课程、运行浏览器中的小型 Python 演示；不能通过网页访问作者本机文件或本机服务。在线 Python 演示通过 Pyodide CDN 加载运行时，首次运行需要能访问该 CDN；PyTorch、GPU、完整模型推理和 MySQL 服务等练习需在本机环境中完成。

## 发布与更新

GitHub Pages 由 `.github/workflows/pages.yml` 自动发布 `site/`。更新时，将个人站点源目录 `D:\学习\个人学习\07_个人站点托管源\dist` 中的网页文件和 `content/course.json` 同步到 `site/`，不要复制 `dist/downloads/`，然后提交并推送到 `main`。

GitHub Pages 与 ChatGPT Sites 使用不同域名，能作为相互独立的访问入口；网络运营商、地区策略或代理规则仍可能影响任何单一服务，无法承诺在所有网络环境下都可达。

## 许可证

本仓库采用 MIT License。课程中引用的外部资料以各课标注为准。
