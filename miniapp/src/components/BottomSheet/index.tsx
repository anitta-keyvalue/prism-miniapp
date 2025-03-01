import React, { FC, ReactNode } from 'react';
import { Image, View } from '@ray-js/ray';

import res from '@/res';

import styles from './index.module.less';

interface Props {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const BottomSheet: FC<Props> = ({ children, isOpen, onClose }) => {
  return (
    <View className={styles.bottomSheetContainer}>
      <View className={styles.background} />
      <View className={`${styles.sheetWrapper} ${isOpen ? styles.open : styles.closed}`}>
        <Image src={res.leftArrow} className={styles.backButton} onClick={onClose} />
        {children}
      </View>
    </View>
  );
};

export default BottomSheet;
