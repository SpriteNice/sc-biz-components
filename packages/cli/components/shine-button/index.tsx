import React from 'react';
import clsx from 'clsx';
import styles from './index.module.less';

interface ShineButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}

const ShineButton: React.FC<ShineButtonProps> = ({ children, className, style, onClick }) => {
  return (
    <div className={clsx(styles.shineButton, className)} style={style} onClick={onClick}>
      <span className={styles.text}>{children}</span>
    </div>
  );
};

export default ShineButton;
