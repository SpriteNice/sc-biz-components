import chalk from 'chalk';
import Table from 'cli-table3';
import fs from 'fs-extra';
import path from 'path';

export async function list() {
  console.log(chalk.blue.bold('\n📦 可用组件列表\n'));

  // 读取注册表
  const registryPath = path.join(__dirname, '../../cli/registry.json');
  const registry = await fs.readJSON(registryPath);

  const table = new Table({
    head: [chalk.cyan('组件名'), chalk.cyan('标题'), chalk.cyan('描述')],
    colWidths: [20, 20, 50],
  });

  Object.values(registry).forEach((component: any) => {
    table.push([chalk.green(component.name), component.title, chalk.gray(component.description)]);
  });

  console.log(table.toString());
  console.log(chalk.gray(`\n共 ${Object.keys(registry).length} 个组件\n`));
}
