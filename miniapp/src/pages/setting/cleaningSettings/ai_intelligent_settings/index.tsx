/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable dot-notation */
import React, { FC, useEffect, useState } from 'react';
import { View, device, Text } from '@ray-js/ray';
import { useProps } from '@ray-js/panel-sdk';
import Strings from '@/i18n';
import { useSendDp } from '@/hooks/useSendDp';
import res from '@/res';
import { aiDetection, aiObstacleAvoidance, aiCleaning } from '@/constant/dpCodes';

import styles from './index.module.less';
import SwitchBox from '../../../../components/SwitchBox';

const CarpetCleanPreference: FC = () => {
  const { getDeviceInfo } = device;
  const { sendDP } = useSendDp();

  const [aiDetect, setAiDetect] = useState<boolean>(false);
  const [aiObstacleAvoid, setAiObstacleAvoidance] = useState<boolean>(false);
  const [aiClean, setAiCleaning] = useState<boolean>(false);

  const dpState = useProps(state => state);

  useEffect(() => {
    getDeviceInfo({
      deviceId: 'vdevo173631844770274',
    })
      .then(res => {
        setAiDetect(dpState[aiDetection]);
        setAiObstacleAvoidance(dpState[aiObstacleAvoidance]);
        setAiCleaning(dpState[aiCleaning]);
      })
      .catch(error => {
        console.log(error);
      });

  }, []);

  return (
    <View className={styles.container}>
      <Text className={styles.title}>{Strings.getLang('dsc_ai_intelligent_recognition')}</Text>
      <View className={styles.pageBox}>
        <View className={styles.contentBox}>
          <View className={styles.autoBoostWrapper}>
            <SwitchBox
              title={Strings.getLang('dsc_ai_detect')}
              label=""
              enable={aiDetect}
              onSwitchChange={v => {
                setAiDetect(v.detail);
                sendDP(aiDetection, v.detail);
              }}
            />
          </View>
          <View className={styles.autoBoostWrapper}>
            <SwitchBox
              title={Strings.getLang('dsc_ai_obstacle_avoidance')}
              label=""
              enable={aiObstacleAvoid}
              onSwitchChange={v => {
                setAiObstacleAvoidance(v.detail);
                sendDP(aiObstacleAvoidance, v.detail);
              }}
            />
          </View>
          <View className={styles.autoBoostWrapper}>
            <SwitchBox
              title={Strings.getLang('dsc_ai_cleaning')}
              label=""
              enable={aiClean}
              onSwitchChange={v => {
                setAiCleaning(v.detail);
                sendDP(aiCleaning, v.detail);
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CarpetCleanPreference;
