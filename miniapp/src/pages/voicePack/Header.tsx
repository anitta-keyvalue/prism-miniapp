import React, { FC, useMemo, useState } from 'react';
import { Text, View, Image } from '@ray-js/ray';
import Strings from '@/i18n';
import { volumeSetCode } from '@/constant/dpCodes';
import { Slider } from '@ray-js/smart-ui';
import { useActions, useProps } from '@ray-js/panel-sdk';
import { devices } from '@/devices';
import { useThrottleFn } from 'ahooks';

import { THEME_COLOR } from '@/constant';
import Res from '@/res';
import styles from './index.module.less';

const Header: FC = () => {
  const actions = useActions();
  const dpVolumnSet = useProps(props => props[volumeSetCode]);
  const [sliderValue, setSliderValue] = useState(dpVolumnSet);

  const {
    property: { min, max, step },
  } = useMemo(() => devices.common.getDpSchema()[volumeSetCode], []);

  const handleChange = useThrottleFn(
    (value: number) => {
      setSliderValue(value);
    },
    { wait: 100 }
  ).run;

  const handleAfterChange = () => {
    actions[volumeSetCode].set(sliderValue, { debounce: 400 });
  };

  return (
    <View className={styles.header}>
      <Text className={styles.title}>{Strings.getLang('dsc_voice_pack')}</Text>
      <View className={styles.sliderRow}>
        <Image src={Res.volumeMin} className={styles.icon} />
        <View className={styles.slider}>
          <Slider
            min={min}
            max={max}
            step={step}
            value={sliderValue}
            minTrackRadius="10rpx"
            maxTrackHeight="20rpx"
            minTrackHeight="20rpx"
            thumbWidth="30rpx"
            thumbHeight="30rpx"
            thumbRadius="30rpx"
            thumbColor="#FFFFFF"
            thumbBorderStyle="solid 2px #2B6EEB"
            minTrackColor="#2B6EEB"
            onChange={handleChange}
            onAfterChange={handleAfterChange}
          />
        </View>
        <Image src={Res.volumeMax} className={styles.icon} />
      </View>
    </View>
  );
};

export default Header;
