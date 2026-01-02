# 简单食谱（PWA）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/xxw02121/chifan)

一键生成一荤一素+米饭的健康家常菜单，适配手机浏览器 / 添加到主屏幕离线可用，内置 DeepSeek 代理改写做法与 AI 生成新菜（未配置也可用）。

## 本地运行
1. 安装依赖：`npm install`
2. 启动开发：`npm run dev`
3. 浏览器打开：`http://localhost:3000`

## 环境变量
在本地或 Vercel 设置：
- `DEEPSEEK_API_KEY`（必填才能调用 DeepSeek，不填则自动回退到本地菜谱步骤/兜底生成）
- `DEEPSEEK_BASE_URL`（可选，默认 `https://api.deepseek.com`）
- `DEEPSEEK_MODEL`（可选，默认 `deepseek-chat`）

## 部署到 Vercel（最少操作）
1. 点击顶部 **Deploy with Vercel** 按钮（或在 Vercel 里新建项目，仓库指向本项目代码）。
2. 授权 GitHub 并导入仓库。
3. 在 Vercel 项目设置里添加环境变量：`DEEPSEEK_API_KEY`（以及可选 BASE_URL/MODEL）。
4. 点击 Deploy，等待构建完成即可访问。

> 提示：按钮指向你的仓库 `xxw02121/chifan`，若改了仓库名请同步更新链接。

## PWA / 添加到主屏幕
- iPhone（Safari）：打开站点 → 底部“分享”按钮 → 选择“添加到主屏幕”，图标即会出现在桌面，可像小程序一样一键打开。
- 安卓（Chrome）：菜单“三点”→“添加到主屏幕”。
- 已注册 service worker，离线可打开最近缓存的页面与本地菜谱；manifest 已设置中文名称与图标。

## 功能速览
- 今日推荐：一键生成一荤一素 + 米饭，控制总耗时≤25分钟、总油≤2.5茶匙；支持换一组、收藏、不喜欢（影响未来7天抽中概率）。
- 本周计划：生成7天菜单，倾向复用食材；可单独“换这天”；自动合并购物清单并可一键复制。
- 菜谱详情：查看食材、用油、步骤，支持调用 DeepSeek 改写更家常的做法（Key 缺失自动使用本地步骤）。
- AI 生成菜谱：在首页可输入口味/食材，AI 产出新菜谱并保存到本地菜谱库参与随机（Key 缺失自动用兜底模板）。
- 收藏/我的菜：收藏的菜会出现在“收藏”页，保存在当前设备，可随时查看详情或取消。
- 偏好：不吃辣/牛/鱼、预算省一点，最近吃过有权重衰减；数据存 localStorage。

## FAQ
- **为什么不能把 API Key 放前端？** Key 暴露在前端会被抓包盗用导致费用风险，已通过 Next.js API Route `/api/llm/rewrite`/`/api/llm/generate` 代理调用，Key 仅存放在服务端环境变量。
- **没配 Key 能用吗？** 可以。未配置 `DEEPSEEK_API_KEY` 时，自动使用本地菜谱的固定步骤/兜底生成，不会影响生成菜单。
- **离线可用程度？** 首次打开后，静态资源、首页/周计划页面会被 service worker 缓存。无网络时仍能查看缓存页面和本地兜底菜谱。若清理缓存需重新联网加载一次。
