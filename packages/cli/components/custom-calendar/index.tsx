import { Calendar } from 'antd';
import React from 'react';

interface TableProProps {
  onChange?: (date: any, mode: 'month' | 'year') => void;
}

const TablePro: React.FC<TableProProps> = ({ onChange }) => {
  return <Calendar />;
};

export default TablePro;