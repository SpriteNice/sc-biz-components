import chalk from 'chalk';
import Table from 'cli-table3';
import { REGISTRY } from '../registry';
import { ComponentInfo } from '../constants';

export async function list() {
  console.log(chalk.blue.bold('\n📦 可用组件列表\n'));

  const table = new Table({
    head: [chalk.cyan('组件名'), chalk.cyan('类型'), chalk.cyan('标题'), chalk.cyan('描述')],
    colWidths: [20, 12, 20, 40],
  });

  const components = Object.values(REGISTRY);

  // 按类型分组排序：component 在前，hook 在后
  const sortedComponents = components.sort((a, b) => {
    if (a.type === b.type) return a.name.localeCompare(b.name);
    return a.type === 'component' ? -1 : 1;
  });

  sortedComponents.forEach((component: ComponentInfo) => {
    const typeLabel = component.type === 'component' ? '组件' : 'Hook';
    const typeColor = component.type === 'component' ? chalk.blue : chalk.magenta;

    table.push([
      chalk.green(component.name),
      typeColor(typeLabel),
      component.title,
      chalk.gray(component.description),
    ]);
  });

  console.log(table.toString());

  const componentCount = components.filter((c) => c.type === 'component').length;
  const hookCount = components.filter((c) => c.type === 'hook').length;

  console.log(
    chalk.gray(`\n共 ${components.length} 个（组件: ${componentCount}，Hook: ${hookCount}）\n`)
  );
}
