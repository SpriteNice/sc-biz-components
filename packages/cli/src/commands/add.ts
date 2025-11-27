import prompts from 'prompts';
import ora from 'ora';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs-extra';

export async function add(components?: string[]) {
  // 读取配置
  const configPath = path.join(process.cwd(), 'sc-components.json');
  if (!(await fs.pathExists(configPath))) {
    console.error(chalk.red('❌ 未找到 sc-components.json，请先运行: sc-components init'));
    process.exit(1);
  }

  const config = await fs.readJSON(configPath);

  // 读取注册表
  const registryPath = path.join(__dirname, '../../cli/registry.json');
  const registry = await fs.readJSON(registryPath);

  // 如果没有指定组件，显示选择列表
  if (!components || components.length === 0) {
    const choices = Object.values(registry).map((comp: any) => ({
      title: `${comp.title} (${comp.name})`,
      value: comp.name,
      description: comp.description,
    }));

    const response = await prompts({
      type: 'multiselect',
      name: 'components',
      message: '选择要添加的组件 (空格选择，回车确认):',
      choices,
      instructions: false,
    });

    if (!response.components || response.components.length === 0) {
      console.log(chalk.yellow('\n未选择任何组件'));
      return;
    }

    components = response.components;
  }

  console.log(chalk.blue(`\n开始添加 ${components.length} 个组件...\n`));

  // 复制每个组件
  for (const componentName of components) {
    const spinner = ora(`添加 ${componentName}`).start();

    try {
      // 检查组件是否存在
      if (!registry[componentName]) {
        throw new Error(`组件 ${componentName} 不存在`);
      }

      // 源路径（CLI 包中的模板）
      const sourcePath = path.join(__dirname, '../../cli/templates', componentName);

      // 目标路径（用户项目）
      const targetPath = path.join(process.cwd(), config.componentsPath, componentName);

      // 检查组件是否已存在
      if (await fs.pathExists(targetPath)) {
        const { overwrite } = await prompts({
          type: 'confirm',
          name: 'overwrite',
          message: `组件 ${componentName} 已存在，是否覆盖？`,
          initial: false,
        });

        if (!overwrite) {
          spinner.info(`${componentName} 已跳过`);
          continue;
        }
      }

      // 复制整个目录
      await fs.copy(sourcePath, targetPath);

      spinner.succeed(chalk.green(`${componentName} 添加成功`));
      console.log(chalk.gray(`  路径: ${config.componentsPath}/${componentName}`));
    } catch (error) {
      spinner.fail(chalk.red(`${componentName} 添加失败`));
      console.error(chalk.red(`  ${error.message}`));
    }
  }

  console.log(chalk.green('\n✅ 完成！\n'));
}
