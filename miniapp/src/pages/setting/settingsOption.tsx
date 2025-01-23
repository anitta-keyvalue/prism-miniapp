import React, { FC } from 'react';
import { Image, Text, View } from 'ray';

import res from '@/res';

import styles from './index.module.less';

interface Props {
  label: string;
  onClick: () => void;
  rightSectionText?: string;
}

const SettingsOption: FC<Props> = ({ label, onClick, rightSectionText }) => {
  return (
    <View className={styles.optionWrapper} onClick={onClick}>
      <Text className={styles.optionLabel}>{label}</Text>
      <View className={styles.rightSection}>
        <Text className={styles.rightSectionText}>{rightSectionText}</Text>
        <Image src={res.rightArrow} className={styles.arrow} />
      </View>
    </View>
  );
};

export default SettingsOption;
