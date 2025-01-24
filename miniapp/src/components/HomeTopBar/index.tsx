import { statusCode } from '@/constant/dpCodes';
import Strings from '@/i18n';
import { selectSystemInfoByKey } from '@/redux/modules/systemInfoSlice';
import { useProps } from '@ray-js/panel-sdk';
import { Text, View, device, Image } from '@ray-js/ray';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import res from '@/res';

import styles from './index.module.less';

const HomeTopBar = () => {
  const statusBarHeight = useSelector(selectSystemInfoByKey('statusBarHeight'));
  const { getDeviceInfo } = device;
  const [deviceName, setDeviceName] = useState<string>('');
  const dpState = useProps(state => state);

  useEffect(() => {
    getDeviceInfo({
      deviceId: 'vdevo173631844770274',
    })
      .then(res => {
        console.log(res);
        setDeviceName(res.name);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <View className={styles.container} style={{ paddingTop: `${statusBarHeight}px` }}>
      <View className={styles.topbar}>
        <Image src={res.leftArrow} style={{ width: '47rpx', height: '48rpx' }} />
        <Text className={clsx(styles.topbarText)}>{deviceName}</Text>
      </View>
    </View>
  );
};

export default HomeTopBar;
