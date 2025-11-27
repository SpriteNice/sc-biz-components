import { Card } from 'antd';
import React from 'react';
import styles from './index.module.less';

interface CustomCardProps {
  title: string;
  content: string;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, content }) => {
  return (
    <Card title={title} style={{ width: 300 }}>
      <p className={styles.content}>{content}</p>
    </Card>
  );
};

export default CustomCard;
