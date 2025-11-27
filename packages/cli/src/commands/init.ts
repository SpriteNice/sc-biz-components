import prompts from 'prompts';
import fs from 'fs-extra';
import path from 'node:path';
import chalk from 'chalk';

const CONFIG_FILE_NAME = 'sc-biz-components.json';

export async function init() {
  console.log(chalk.blue.bold('\n🚀 初始化组件库配置\n'));

  // 检查配置文件是否已存在
  const configPath = path.join(process.cwd(), CONFIG_FILE_NAME);
  const configExists = await fs.pathExists(configPath);

  if (configExists) {
    const { overwrite } = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: '配置文件已存在，是否覆盖?',
      initial: false,
    });

    if (!overwrite) {
      console.log(chalk.yellow('\n已取消'));
      return;
    }
  }

  const response = await prompts([
    {
      type: 'text',
      name: 'componentsPath',
      message: '组件安装路径:',
      initial: 'src/sc-biz-components',
      validate: (value) => {
        if (!value.trim()) {
          return '路径不能为空';
        }
        // 验证路径格式（不允许绝对路径）
        if (path.isAbsolute(value)) {
          return '请使用相对路径';
        }
        return true;
      },
    },
  ]);

  // 处理用户取消操作
  if (!response.componentsPath) {
    console.log(chalk.yellow('\n已取消'));
    return;
  }

  const config = {
    componentsPath: response.componentsPath.trim(),
  };

  try {
    const componentsDir = path.join(process.cwd(), config.componentsPath);

    // 创建配置文件
    await fs.writeJSON(configPath, config, { spaces: 2 });
    console.log(chalk.green(`✓ 已创建配置文件: ${CONFIG_FILE_NAME}`));

    // 创建组件目录
    await fs.ensureDir(componentsDir);
    console.log(chalk.green(`✓ 已创建组件目录: ${config.componentsPath}`));

    console.log(chalk.green('\n✅ 初始化完成！\n'));
    console.log(chalk.gray('现在你可以运行：'));
    console.log(chalk.cyan('  sc-biz-components list') + chalk.gray('     - 查看所有组件'));
    console.log(chalk.cyan('  sc-biz-components add button') + chalk.gray(' - 添加组件\n'));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(chalk.red('\n❌ 初始化失败:'), errorMessage);
    process.exit(1);
  }
}
