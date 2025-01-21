import React from 'react';
import { Text, View } from '@ray-js/ray';
import { SmartEvent, Switch } from '@ray-js/smart-ui';

import styles from './index.module.less';

interface Props {
  title: string;
  label: string;
  enable: boolean;
  onSwitchChange: (value: SmartEvent<boolean>) => void;
}

const SwitchBox = (props: Props) => {
  const { onSwitchChange, title, label } = props;

  return (
    <View className={styles.switchBox}>
      <View className={styles.head}>
        <Text className={styles.title}>{title}</Text>
        <Switch
          checked={props.enable}
          onChange={onSwitchChange}
          activeColor="#2B6EEB"
          size="middle"
          stopClickPropagation
        />
      </View>
      <Text className={styles.description}>{label}</Text>
    </View>
  );
};

export default SwitchBox;
