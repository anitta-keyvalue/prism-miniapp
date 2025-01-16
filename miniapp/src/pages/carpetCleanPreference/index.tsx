/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable dot-notation */
import React, { FC, useEffect, useState } from 'react';
import { View, getDevInfo, getVoiceList, device, Text } from '@ray-js/ray';
import { decodeVoice0x35 } from '@ray-js/robot-protocol';
import { Cell, CellGroup, Toast } from '@ray-js/smart-ui';
import { useDpSchema, useProps } from '@ray-js/panel-sdk';
import Strings from '@/i18n';
import { voiceDataCode } from '@/constant/dpCodes';
import { useSendDp } from '@/hooks/useSendDp';

import styles from './index.module.less';
import SwitchBox from '../doNotDisturb/switchBox';

const CarpetCleanPreference: FC = () => {
  const { getDeviceInfo } = device;
  const { sendDP } = useSendDp();
  const [currentPreference, setCurrentPreference] = useState<string>('');

  const dpState = useProps(state => state);

  //   console.log("dpSchema", dpSchema);
  // eslint-disable-next-line dot-notation
  console.log('dpState', dpState['carpet_clean_prefer']);

  useEffect(() => {
    getDeviceInfo({
      deviceId: 'vdevo173631844770274',
    })
      .then(res => {
        console.log(res.schema);
        const schema = res.schema || [];
        const carpetCleanPrefer = schema.find(item => item.code === 'carpet_clean_prefer');
        const propertyValue = carpetCleanPrefer ? carpetCleanPrefer.property.range : null;
        console.log('Property Value:', propertyValue);
        setCurrentPreference(dpState['carpet_clean_prefer']);
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
    <View className={styles.container}>
      <View className={styles.header}>
        <Text className={styles.title}>{Strings.getLang('dsc_carpet_clean_preference')}</Text>
        <View className={styles.pageBox}>
          <View className={styles.contentBox}>
            <View className={styles.spaceLine} />
            <SwitchBox
              title={Strings.getLang('dsc_auto_boost')}
              label={Strings.getLang('')}
              enable={false}
              onSwitchChange={v => {}}
            />
            <View className={styles.spaceLine} />
            <CellGroup inset>
              <Cell
                className={styles.cellGroup}
                title={Strings.getLang('dsc_carpet_clean_preference_1')}
                label="start time"
                isLink
                onClick={() => {}}
              />
              <Cell
                title={Strings.getLang('dsc_carpet_clean_preference_2')}
                label="end time"
                isLink
                onClick={() => {}}
              />
            </CellGroup>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CarpetCleanPreference;
