import React from 'react';
import styles from '@/styles/article/TableView.module.scss';
import { ScrollArea } from '@radix-ui/themes';

type TableViewProps = React.TableHTMLAttributes<HTMLTableElement>

const TableView: React.FC<TableViewProps> = (props) => {
  return (
    <ScrollArea>
      <table {...props} className={`${styles.tableAuto} border-collapse`}>
        {props.children}
      </table>
    </ScrollArea>
  );
};

export default TableView;
