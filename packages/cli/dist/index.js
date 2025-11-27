#!/usr/bin/env node

// ../../node_modules/.pnpm/tsup@8.5.0_jiti@2.6.1_postcss@8.5.6_tsx@4.20.6_typescript@5.9.3/node_modules/tsup/assets/esm_shims.js
import path from "path";
import { fileURLToPath } from "url";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();

// src/index.ts
import { Command } from "commander";

// src/commands/init.ts
import prompts from "prompts";
import fs from "fs-extra";
import path2 from "path";
import chalk from "chalk";

// src/constants.ts
var CONFIG_FILE_NAME = "sc-biz.config.json";
var COMMAND_NAME = "sc-biz";
var DEFAULT_COMPONENTS_PATH = "src/sc-biz-components";

// src/commands/init.ts
async function init() {
  console.log(chalk.blue.bold("\n\u{1F680} \u521D\u59CB\u5316\u7EC4\u4EF6\u5E93\u914D\u7F6E\n"));
  const configPath = path2.join(process.cwd(), CONFIG_FILE_NAME);
  const configExists = await fs.pathExists(configPath);
  if (configExists) {
    const { overwrite } = await prompts({
      type: "confirm",
      name: "overwrite",
      message: "\u914D\u7F6E\u6587\u4EF6\u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6?",
      initial: false
    });
    if (!overwrite) {
      console.log(chalk.yellow("\n\u5DF2\u53D6\u6D88"));
      return;
    }
  }
  const response = await prompts([
    {
      type: "text",
      name: "componentsPath",
      message: "\u7EC4\u4EF6\u5B89\u88C5\u8DEF\u5F84:",
      initial: DEFAULT_COMPONENTS_PATH,
      validate: (value) => {
        if (!value.trim()) {
          return "\u8DEF\u5F84\u4E0D\u80FD\u4E3A\u7A7A";
        }
        if (path2.isAbsolute(value)) {
          return "\u8BF7\u4F7F\u7528\u76F8\u5BF9\u8DEF\u5F84";
        }
        return true;
      }
    }
  ]);
  if (!response.componentsPath) {
    console.log(chalk.yellow("\n\u5DF2\u53D6\u6D88"));
    return;
  }
  const config = {
    componentsPath: response.componentsPath.trim()
  };
  try {
    const componentsDir = path2.join(process.cwd(), config.componentsPath);
    await fs.writeJSON(configPath, config, { spaces: 2 });
    console.log(chalk.green(`\u2713 \u5DF2\u521B\u5EFA\u914D\u7F6E\u6587\u4EF6: ${CONFIG_FILE_NAME}`));
    await fs.ensureDir(componentsDir);
    console.log(chalk.green(`\u2713 \u5DF2\u521B\u5EFA\u7EC4\u4EF6\u76EE\u5F55: ${config.componentsPath}`));
    console.log(chalk.green("\n\u2705 \u521D\u59CB\u5316\u5B8C\u6210\uFF01\n"));
    console.log(chalk.gray("\u73B0\u5728\u4F60\u53EF\u4EE5\u8FD0\u884C\uFF1A"));
    console.log(chalk.cyan("  sc-biz-components list") + chalk.gray("     - \u67E5\u770B\u6240\u6709\u7EC4\u4EF6"));
    console.log(chalk.cyan("  sc-biz-components add button") + chalk.gray(" - \u6DFB\u52A0\u7EC4\u4EF6\n"));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(chalk.red("\n\u274C \u521D\u59CB\u5316\u5931\u8D25:"), errorMessage);
    process.exit(1);
  }
}

// src/commands/add.ts
import prompts2 from "prompts";
import ora from "ora";
import chalk2 from "chalk";
import path3 from "path";
import fs2 from "fs-extra";

// src/registry.ts
var REGISTRY = {
  "shine-button": {
    name: "shine-button",
    title: "\u81EA\u5B9A\u4E49\u6309\u94AE",
    description: "\u652F\u6301\u591A\u79CD\u6837\u5F0F\u548C\u4EA4\u4E92\u7684\u6309\u94AE\u7EC4\u4EF6",
    type: "component"
  },
  "use-counter": {
    name: "use-counter",
    title: "useCounter",
    description: "\u4E00\u4E2A\u7B80\u5355\u7684\u8BA1\u6570\u5668 Hook",
    type: "hook"
  }
};

// src/commands/add.ts
async function add(components) {
  const configPath = path3.join(process.cwd(), CONFIG_FILE_NAME);
  if (!await fs2.pathExists(configPath)) {
    console.error(chalk2.red(`\u274C \u672A\u627E\u5230 ${CONFIG_FILE_NAME}\uFF0C\u8BF7\u5148\u8FD0\u884C:  ${COMMAND_NAME} init`));
    process.exit(1);
  }
  const config = await fs2.readJSON(configPath);
  if (!components || components.length === 0) {
    const choices = Object.values(REGISTRY).map((comp) => ({
      title: `${comp.title} (${comp.name})`,
      value: comp.name,
      description: comp.description
    }));
    const response = await prompts2({
      type: "multiselect",
      name: "components",
      message: "\u9009\u62E9\u8981\u6DFB\u52A0\u7684\u7EC4\u4EF6 (\u7A7A\u683C\u9009\u62E9\uFF0C\u56DE\u8F66\u786E\u8BA4):",
      choices,
      instructions: false
    });
    if (!response.components || response.components.length === 0) {
      console.log(chalk2.yellow("\n\u672A\u9009\u62E9\u4EFB\u4F55\u7EC4\u4EF6"));
      return;
    }
    components = response.components;
  }
  if (!components || components.length === 0) {
    return;
  }
  console.log(chalk2.blue(`
\u5F00\u59CB\u6DFB\u52A0 ${components.length} \u4E2A\u7EC4\u4EF6...
`));
  for (const componentName of components) {
    const spinner = ora(`\u6DFB\u52A0 ${componentName}`).start();
    try {
      if (!REGISTRY[componentName]) {
        throw new Error(`\u7EC4\u4EF6 ${componentName} \u4E0D\u5B58\u5728`);
      }
      const sourcePath = path3.join(__dirname, "../components", componentName);
      const targetPath = path3.join(process.cwd(), config.componentsPath, componentName);
      if (await fs2.pathExists(targetPath)) {
        spinner.stop();
        const { overwrite } = await prompts2({
          type: "confirm",
          name: "overwrite",
          message: `\u7EC4\u4EF6 ${componentName} \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`,
          initial: false
        });
        if (!overwrite) {
          spinner.info(`${componentName} \u5DF2\u8DF3\u8FC7`);
          continue;
        }
        spinner.start(`\u6DFB\u52A0 ${componentName}`);
      }
      if (!await fs2.pathExists(sourcePath)) {
        throw new Error(`\u6A21\u677F\u6587\u4EF6\u4E0D\u5B58\u5728: ${sourcePath}`);
      }
      await fs2.copy(sourcePath, targetPath, { overwrite: true });
      spinner.succeed(chalk2.green(`${componentName} \u6DFB\u52A0\u6210\u529F`));
      console.log(chalk2.gray(`  \u8DEF\u5F84: ${config.componentsPath}/${componentName}`));
    } catch (error) {
      spinner.fail(chalk2.red(`${componentName} \u6DFB\u52A0\u5931\u8D25`));
      console.error(chalk2.red(`  ${error.message}`));
    }
  }
  console.log(chalk2.green("\n\u2705 \u5B8C\u6210\uFF01\n"));
}

// src/commands/list.ts
import chalk3 from "chalk";
import Table from "cli-table3";
async function list() {
  console.log(chalk3.blue.bold("\n\u{1F4E6} \u53EF\u7528\u7EC4\u4EF6\u5217\u8868\n"));
  const table = new Table({
    head: [chalk3.cyan("\u7EC4\u4EF6\u540D"), chalk3.cyan("\u7C7B\u578B"), chalk3.cyan("\u6807\u9898"), chalk3.cyan("\u63CF\u8FF0")],
    colWidths: [20, 12, 20, 40]
  });
  const components = Object.values(REGISTRY);
  const sortedComponents = components.sort((a, b) => {
    if (a.type === b.type) return a.name.localeCompare(b.name);
    return a.type === "component" ? -1 : 1;
  });
  sortedComponents.forEach((component) => {
    const typeLabel = component.type === "component" ? "\u7EC4\u4EF6" : "Hook";
    const typeColor = component.type === "component" ? chalk3.blue : chalk3.magenta;
    table.push([
      chalk3.green(component.name),
      typeColor(typeLabel),
      component.title,
      chalk3.gray(component.description)
    ]);
  });
  console.log(table.toString());
  const componentCount = components.filter((c) => c.type === "component").length;
  const hookCount = components.filter((c) => c.type === "hook").length;
  console.log(
    chalk3.gray(`
\u5171 ${components.length} \u4E2A\uFF08\u7EC4\u4EF6: ${componentCount}\uFF0CHook: ${hookCount}\uFF09
`)
  );
}

// src/index.ts
var program = new Command();
program.name(COMMAND_NAME).description("SC\u4E1A\u52A1\u7EC4\u4EF6\u6A21\u677F\u5E93 CLI \u5DE5\u5177").version("1.0.0");
program.command("init").description("\u521D\u59CB\u5316\u9879\u76EE\u914D\u7F6E").action(init);
program.command("add [components...]").description("\u6DFB\u52A0\u7EC4\u4EF6\u5230\u9879\u76EE").action(add);
program.command("list").description("\u5217\u51FA\u6240\u6709\u53EF\u7528\u7EC4\u4EF6").action(list);
program.parse();
