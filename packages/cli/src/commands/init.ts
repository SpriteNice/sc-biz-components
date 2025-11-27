import prompts from 'prompts';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

export async function init() {
  console.log(chalk.blue.bold('\n🚀 初始化组件库配置\n'));

  const response = await prompts([
    {
      type: 'text',
      name: 'componentsPath',
      message: '组件安装路径:',
      initial: 'src/sc-components',
    },
  ]);

  if (!response.componentsPath) {
    console.log(chalk.yellow('\n已取消'));
    return;
  }

  const config = {
    componentsPath: response.componentsPath,
  };

  try {
    // 创建配置文件
    await fs.writeJSON(path.join(process.cwd(), 'sc-components.json'), config, { spaces: 2 });

    // 创建组件目录
    await fs.ensureDir(path.join(process.cwd(), response.componentsPath));

    console.log(chalk.green('\n✅ 初始化完成！\n'));
    console.log(chalk.gray('现在你可以运行：'));
    console.log(chalk.cyan('sc-components list') + chalk.gray('     - 查看所有组件'));
    console.log(chalk.cyan('sc-components add button') + chalk.gray(' - 添加组件\n'));
  } catch (error) {
    console.error(chalk.red('❌ 初始化失败:'), error.message);
    process.exit(1);
  }
}
