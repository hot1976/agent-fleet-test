# Phase 3 实施文档

# Agent 舰队系统 - Phase 3 部署指南

> 实施日期： 2026-03-19
> 实施人： 主控

## Phase 3 目标
将 Agent 舰队从单线程执行升级为**企业级 CI/CD 平台**：
提供自动化测试、自改进学习、多维度审查、自动清理等能力。

## 新增功能

### 1. CI/CD 集成
- GitHub Actions 自动测试
- 代码质量检查
- 覆盖率报告
- 自动化部署

### 2. Ralph Loop 自改进
- 成功/失败模式记录
- Prompt 模板优化
- Agent 选择策略改进
- 定期总结分析
### 3. 多模型协作审查
- 郭+黄+主控 三重审查
- 综合评分机制
- 自动评论生成
- 代码质量报告
### 4. 自动清理
- 旧 worktree 清理
- 已完成任务归档
- 旧分支清理
- 存储空间优化

## 文件结构
```
.github/workflows/agent-fleet/
├── ci.yml              # CI/CD 主工作流
├── multi-review.yml   # 多模型审查工作流
├── cleanup.yml         # 自动清理工作流
├── config.yml          # Ralph Loop 配置
├── memory/            # 学习记录目录
    ├── memory.json       # Ralph Loop 数据存储
    └── templates/       # Prompt 模板
        ├── coding-success.md
        ├── coding-failure.md
        └── review-feedback.md
```

## 配置

### CI/CD 配置 (config.yml)
```yaml
ralph_loop:
  enabled: true
  storage_path: .ralph-loop/memory.json
  max_entries: 100
  learning_mode: passive
  record_threshold: 0.7
```

### Ralph Loop 数据存储 (memory.json)
```json
{
  "entries": [],
  "stats": {
    "total_successes": 0,
    "total_failures": 0,
    "total_improvements": 0,
    "last_updated": "2026-03-19T01:35:00Z"
  }
}
```

## 使用方法

### 1. CI/CD
```powershell
# 本地测试 CI 工作流
act -C .github/workflows/agent-fleet/ci.yml -W

# 手动触发 CI
gh workflow run agent-fleet-ci.yml
```
### 2. Ralph Loop
```powershell
# 记录成功经验
.\.clawdbot\submit-lesson.ps1 -Type success -TaskId task-xxx -Summary "..." -Details "..."

# 记录失败教训
.\.clawdbot\submit-lesson.ps1 -Type failure -TaskId task-xxx -Summary "..." -Details "..." -Error "..." -Solution "..."
```
### 3. 多模型审查
```powershell
# 触发审查
gh workflow run multi-review.yml
```
### 4. 自动清理
```powershell
# 手动触发清理
gh workflow run cleanup.yml

# 清理是自动触发（每天凌晨 2 点）
```

## 下一步

- 测试 CI 工作流
- 配置 GitHub 仓库
- 创建测试任务验证完整流程

- 监控 Ralph Loop 学习效果
- 优化 Agent 选择策略

