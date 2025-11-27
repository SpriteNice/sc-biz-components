#!/usr/bin/env node
import { Command } from 'commander';
import { init } from './commands/init';
import { add } from './commands/add';
import { list } from './commands/list';

const program = new Command();

program.name('sc-biz-components').description('SC业务组件模板库 CLI 工具').version('1.0.0');

program.command('init').description('初始化项目配置').action(init);

program.command('add [components...]').description('添加组件到项目').action(add);

program.command('list').description('列出所有可用组件').action(list);

program.parse();
