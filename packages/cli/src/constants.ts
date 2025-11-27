/**
 * 配置文件名
 */
export const CONFIG_FILE_NAME = 'sc-biz.config.json';

/**
 * 命令名称
 */
export const COMMAND_NAME = 'sc-biz';

/**
 * 默认组件安装路径
 */
export const DEFAULT_COMPONENTS_PATH = 'src/sc-biz-components';

/**
 * 组件信息
 */
export interface ComponentInfo {
  /** 组件唯一标识 */
  name: string;
  /** 显示名称 */
  title: string;
  /** 简短描述 */
  description: string;
  /** 组件类型 */
  type: 'component' | 'hook';
}
