import { statusCode } from '@/constant/dpCodes';
import Strings from '@/i18n';
import { selectSystemInfoByKey } from '@/redux/modules/systemInfoSlice';
import { useProps } from '@ray-js/panel-sdk';
import { Text, View, Image, getDevInfo, getVoiceList, device } from '@ray-js/ray';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import React, { FC, useEffect, useState } from 'react';
import { Grid } from '@ray-js/smart-ui';
import Res from '@/res';

import styles from './index.module.less';

const HomeTopBar = () => {
  const { getDeviceInfo } = device;
  const dpState = useProps(state => state);
  const dpStatus = useProps(props => props[statusCode]) as Status;
  const statusBarHeight = useSelector(selectSystemInfoByKey('statusBarHeight'));
  const [batteryPercentage, setBatteryPercentage] = useState<number>(0);
  const [status, setStatus] = useState<string>('');
  const [cleanArea, setCleanArea] = useState<number>(0);
  const [cleanTime, setCleanTime] = useState<number>(0);

  useEffect(() => {
    getDeviceInfo({
      deviceId: 'vdevo173631844770274',
    })
      .then(res => {
        console.log(res.schema);
        const schema = res.schema || [];
        const batteryPercentage = schema.find(item => item.code === 'battery_percentage');
        const status = schema.find(item => item.code === 'status');
        const batteryValue = batteryPercentage ? batteryPercentage.property.range : null;
        console.log('Property Value:', batteryValue);
        setBatteryPercentage(dpState.battery_percentage);
        setStatus(dpState.status);
        setCleanArea(dpState.clean_area);
        setCleanTime(dpState.clean_time);
        // sendDP('carpet_clean_prefer', 'evade');
      })
      .catch(error => {
        console.log(error);
      });

    ty.setNavigationBarTitle({
      title: Strings.getLang(''),
    });
  }, []);

  return (
    <View className={styles.container} style={{ paddingTop: `${statusBarHeight}px` }}>
      <View className={styles.row}>
        <View className={styles.item}>
          <Text className={styles.itemMainText}>{cleanArea}</Text>
          <View className={styles.subTextLayout}>
            <Image src={Res.cleanArea} className={styles.iconBackGround} />
            <Text className={styles.itemSubText}>
              m<sup>2</sup>
            </Text>
          </View>
        </View>
        <View className={styles.item}>
          <Text className={styles.itemMainText}>{cleanTime}</Text>
          <View className={styles.subTextLayout}>
            <Image src={Res.clock} className={styles.iconBackGround} />
            <Text className={styles.itemSubText}>min</Text>
          </View>
        </View>
        <View className={styles.item}>
          <Text className={styles.itemMainText}>{batteryPercentage}</Text>
          <View className={styles.subTextLayout}>
            <Image src={Res.battery} className={styles.iconBackGround} />
            <Text className={styles.itemSubText}>%</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeTopBar;
