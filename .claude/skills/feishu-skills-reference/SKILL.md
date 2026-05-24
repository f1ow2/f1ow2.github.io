---
name: feishu-skills-reference
description: 飞书 CLI 常用技能速查表，包含 IM、文档、日历、会议等核心技能
---

# 飞书 CLI 常用技能

使用飞书 CLI(`lark-cli`)操作飞书各项功能。所有技能通过 `/` 斜杠命令调用，已安装并全局可用。

## 核心技能分类

**云文档**: `/lark-doc` — Docx；`/lark-sheets` — 电子表格；`/lark-base` — 多维表格；`/lark-slides` — 幻灯片
**协作**: `/lark-task` — 任务；`/lark-mail` — 邮件；`/lark-approval` — 审批
**文件**: `/lark-drive` — 云空间；`/lark-wiki` — 知识库；`/lark-apps` — 妙搭部署
**工作流**: `/lark-workflow-standup-report` — 日程待办摘要；`/lark-workflow-meeting-summary` — 会议纪要报告

## 注意事项
- 技能已通过 `npx -y skills add https://open.feishu.cn --skill -y` 全局安装
- 使用前需确保 `lark-cli auth status` 显示已登录
- 调用技能时直接使用 `/skill-name` 格式
- 如果没有权限，可以直接申请对应权限