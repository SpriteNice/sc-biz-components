import { ComponentInfo } from './constants';

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
  },
};
