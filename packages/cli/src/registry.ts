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

/**
 * 组件注册表
 */
export const REGISTRY: Record<string, ComponentInfo> = {
  'shine-button': {
    name: 'shine-button',
    title: '自定义按钮',
    description: '支持多种样式和交互的按钮组件',
    type: 'component',
  },
  'use-counter': {
    name: 'use-counter',
    title: 'useCounter',
    description: '一个简单的计数器 Hook',
    type: 'hook',
  }
};
