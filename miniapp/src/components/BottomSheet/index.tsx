import React, { FC, ReactNode } from 'react';
import { Image } from '@ray-js/ray';

import res from '@/res';
import styles from './index.module.less';

interface Props {
  children: ReactNode;
  onClose: () => void;
}

const BottomSheet: FC<Props> = ({ children, onClose }) => {
  return (
    <>
      <Image src={res.leftArrow} className={styles.backButton} onClick={onClose} />
      {children}
    </>
  );
};

export default BottomSheet;
