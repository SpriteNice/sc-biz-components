# SC 业务组件模板库

<p align="center">
  <strong>源码级业务组件管理方案</strong>
</p>

<p align="center">
  一个基于 CLI 的 React 业务组件库，通过复制源码的方式集成组件，让你拥有完全的控制权和灵活性。
</p>

## ✨ 特性

- 🚀 **源码级管理** - 直接复制组件源码到你的项目，完全可定制
- 📦 **CLI 工具** - 通过命令行快速添加和管理组件
- 🎨 **即开即用** - 基于 React + TypeScript + Less 开发
- 📚 **文档完善** - 提供详细的组件文档和示例
- 🔧 **灵活可控** - 组件代码在你的项目中，随时可以修改

## 📦 项目结构

```
sc-biz-components/
├── packages/
│   ├── cli/                    # CLI 工具包
│   │   ├── components/         # 组件模板源码
│   │   │   ├── shine-button/   # ShineButton 组件
│   │   │   └── hooks/          # 自定义 Hooks
│   │   ├── src/
│   │   │   ├── commands/       # CLI 命令
│   │   │   ├── registry.ts     # 组件注册表
│   │   │   └── index.ts        # CLI 入口
│   │   ├── package.json
│   │   └── tsup.config.ts      # 构建配置
│   └── docs/                   # 文档站点
│       ├── docs/               # 文档源文件
│       ├── rspress.config.ts   # 文档配置
│       └── package.json
├── package.json                # 根配置
├── pnpm-workspace.yaml         # pnpm 工作区配置
└── README.md
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- pnpm >= 7.0.0（推荐使用 pnpm）

### 安装依赖

```bash
# 克隆仓库
git clone https://github.com/SpriteNice/sc-biz-components.git
cd sc-biz-components

# 安装依赖
pnpm install
```

## 📖 开发指南

### 1. 开发组件

#### 添加新组件

1. 在 `packages/cli/components/` 目录下创建新组件文件夹：

```bash
packages/cli/components/
└── your-component/
    ├── index.tsx           # 组件源码
    ├── index.module.less   # 组件样式
    └── README.md          # 组件说明（可选）
```

2. 在 `packages/cli/src/registry.ts` 注册组件：

```typescript
export const REGISTRY: Record<string, ComponentInfo> = {
  'your-component': {
    name: 'your-component',
    title: 'YourComponent',
    description: '你的组件描述',
  },
  // ... 其他组件
};
```

3. 更新 `packages/cli/components.d.ts` 添加类型定义（可选）

#### 组件开发规范

- 使用 TypeScript 编写组件
- 使用 CSS Modules (Less) 管理样式
- 组件应该是独立的，尽量减少外部依赖
- 提供清晰的 Props 类型定义
- 遵循 React 最佳实践

### 2. 开发 CLI 工具

#### 本地开发

```bash
# 启动 CLI 开发模式（监听文件变化）
pnpm run dev:cli

# 构建 CLI
pnpm run build:cli
```

#### 本地测试 CLI

在 `packages/cli` 目录下：

```bash
# 构建
pnpm run build

# 全局链接（用于本地测试）
npm link

# 在任意项目中测试
sc-biz init
sc-biz list
sc-biz add shine-button
```

#### CLI 命令说明

- `init` - 初始化配置文件（见 `src/commands/init.ts`）
- `list` - 列出所有可用组件（见 `src/commands/list.ts`）
- `add` - 添加组件到项目（见 `src/commands/add.ts`）

### 3. 开发文档站点

#### 启动文档服务

```bash
# 启动文档开发服务器
pnpm run dev:docs

# 访问 http://localhost:3000
```

#### 构建文档

```bash
# 构建文档站点
pnpm run build:docs

# 构建产物在 packages/docs/doc_build/
```

#### 添加组件文档

1. 在 `packages/docs/docs/components/` 创建 `.mdx` 文件：

```mdx
# YourComponent

组件描述

## 基础用法

:::preview
demo-path: ./demos/your-component-demo.tsx
:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prop1 | 属性说明 | `string` | - |
```

2. 在 `packages/docs/rspress.config.ts` 更新侧边栏配置

## 🚢 部署指南

### 1. 发布 CLI 工具到 npm

#### 准备工作

1. 确保已登录 npm：

```bash
npm login
```

2. 检查 `packages/cli/package.json` 配置：

```json
{
  "name": "create-sc-biz-components",
  "version": "1.0.1",
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  }
}
```

#### 发布流程

```bash
cd packages/cli

# 构建
pnpm run build

# 发布补丁版本（1.0.1 -> 1.0.2）
pnpm run publish:patch

# 发布次版本（1.0.1 -> 1.1.0）
pnpm run publish:minor

# 发布主版本（1.0.1 -> 2.0.0）
pnpm run publish:major
```

或者手动发布：

```bash
cd packages/cli

# 更新版本号
npm version patch  # 或 minor / major

# 发布
npm publish
```

#### 发布检查清单

- [ ] 所有组件都已测试
- [ ] 更新了 CHANGELOG
- [ ] 更新了版本号
- [ ] 构建成功无报错
- [ ] 检查 `files` 字段包含必要文件
- [ ] 测试发布后的包是否可用

### 2. 部署文档站点

#### 部署到 GitHub Pages

1. 配置 `packages/docs/rspress.config.ts`：

```typescript
export default defineConfig({
  // 如果部署到 https://<USERNAME>.github.io/<REPO>/
  base: '/sc-biz-components/',
  // ... 其他配置
});
```

2. 构建文档：

```bash
pnpm run build:docs
```

3. 部署到 GitHub Pages：

方式一：使用 GitHub Actions（推荐）

创建 `.github/workflows/deploy-docs.yml`：

```yaml
name: Deploy Docs

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build docs
        run: pnpm run build:docs
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./packages/docs/doc_build
```

方式二：手动部署

```bash
# 构建
pnpm run build:docs

# 进入构建目录
cd packages/docs/doc_build

# 初始化 git（如果是首次）
git init
git add -A
git commit -m 'deploy'

# 推送到 gh-pages 分支
git push -f git@github.com:SpriteNice/sc-biz-components.git main:gh-pages

cd -
```

#### 部署到 Vercel

1. 导入项目到 Vercel
2. 配置构建设置：
   - **Root Directory**: `packages/docs`
   - **Build Command**: `pnpm run build`
   - **Output Directory**: `doc_build`
3. 部署

#### 部署到 Netlify

1. 在 `packages/docs` 创建 `netlify.toml`：

```toml
[build]
  base = "packages/docs"
  command = "pnpm run build"
  publish = "doc_build"
```

2. 连接 GitHub 仓库并部署

## 🔧 开发脚本说明

```json
{
  "scripts": {
    "dev:cli": "pnpm --filter sc-biz-cli dev",      // 开发 CLI
    "build:cli": "pnpm --filter sc-biz-cli build",  // 构建 CLI
    "dev:docs": "pnpm --filter sc-biz-docs dev",    // 开发文档
    "build:docs": "pnpm --filter sc-biz-docs build" // 构建文档
  }
}
```

## 📝 使用示例

### 用户端使用

1. 安装 CLI：

```bash
npm install -g create-sc-biz-components
```

2. 在项目中初始化：

```bash
sc-biz init
```

3. 添加组件：

```bash
sc-biz add shine-button
```

4. 在代码中使用：

```tsx
import ShineButton from '@components/shine-button';

function App() {
  return <ShineButton>点击我</ShineButton>;
}
```

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

### 代码规范

- 使用 TypeScript
- 遵循 ESLint 规则
- 使用 Prettier 格式化代码
- 编写清晰的提交信息

## 📄 License

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🔗 相关链接

- [在线文档](https://spritennice.github.io/sc-biz-components/)
- [GitHub 仓库](https://github.com/SpriteNice/sc-biz-components)
- [npm 包](https://www.npmjs.com/package/create-sc-biz-components)

## 💡 常见问题

### 如何添加新组件？

1. 在 `packages/cli/components/` 创建组件文件夹
2. 在 `packages/cli/src/registry.ts` 注册组件
3. 在 `packages/docs/docs/components/` 添加文档
4. 构建并测试

### 发布失败怎么办？

- 检查是否已登录 npm
- 确认包名是否已被占用
- 检查 `publishConfig` 配置
- 确保构建成功无报错

### 如何本地调试 CLI？

```bash
cd packages/cli
pnpm run build
npm link
```

然后在测试项目中使用 `sc-biz` 命令即可。

---

<p align="center">
  Made with ❤️ by SpriteNice
</p>
