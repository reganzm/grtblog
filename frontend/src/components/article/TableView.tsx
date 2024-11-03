import React from 'react';
import styles from '@/styles/article/TableView.module.scss';

type TableViewProps = React.TableHTMLAttributes<HTMLTableElement>

const TableView: React.FC<TableViewProps> = (props) => {
  return (
    <table {...props} className={`${styles.tableAuto} border-collapse`}>
      {props.children}
    </table>
  );
};

export default TableView;
