import { View, Text, Image } from '@ray-js/ray';
import React, { FC } from 'react';
import res from '@/res';
import styles from './index.module.less';

type Props = {
  onClick: () => void;
  title: string;
};

const SettingsCell: FC<Props> = ({ onClick, title }) => {
  return (
    <>
      <View className={styles.settingsCell} onClick={onClick}>
        <Text style={{ color: 'black', fontSize: '16px', fontWeight: '400' }}>{title}</Text>
        <Image
          src={res.rightArrow}
          style={{
            height: '24rpx',
            width: '20rpx',
          }}
        />
      </View>
      <View className={styles.divider} />
    </>
  );
};

export default SettingsCell;
