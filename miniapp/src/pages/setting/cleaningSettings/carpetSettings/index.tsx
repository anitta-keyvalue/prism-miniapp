/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable dot-notation */
import React, { FC, useEffect, useState } from 'react';
import { View, device, Text, Image } from '@ray-js/ray';
import { useProps } from '@ray-js/panel-sdk';
import Strings from '@/i18n';
import { useSendDp } from '@/hooks/useSendDp';
import res from '@/res';
import SwitchBox from '@/components/SwitchBox/switchBox';
import { carpetCleanPreferCode } from '@/constant/dpCodes';

import styles from './index.module.less';

const CarpetSettings: FC = () => {
  const { getDeviceInfo } = device;
  const { sendDP } = useSendDp();

  const [currentPreference, setCurrentPreference] = useState<string>('');
  const [currentAutoBoostValue, setAutoBoostValue] = useState<boolean>(false);

  const dpState = useProps(state => state);

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
        setAutoBoostValue(dpState['auto_boost']);
        sendDP('carpet_clean_prefer', 'evade');
      })
      .catch(error => {
        console.log(error);
      });

    // ty.setNavigationBarTitle({
    //   title: Strings.getLang(''),
    // });
  }, []);

  return (
    <View className={styles.carpetSettingsContainer}>
      <Text className={styles.title}>{Strings.getLang('dsc_carpet_settings')}</Text>
      <>
        <View className={styles.autoBoostWrapper}>
          <SwitchBox
            title={Strings.getLang('dsc_auto_boost')}
            label=""
            enable={currentAutoBoostValue}
            onSwitchChange={v => {
              setAutoBoostValue(v.detail);
              sendDP('auto_boost', v.detail);
            }}
          />
        </View>
        <Text className={styles.heading}>{Strings.getLang('dsc_carpet_clean_preference')}</Text>
        <View className={styles.preferenceWrapper}>
          <View
            className={styles.preference}
            onClick={() => {
              sendDP(carpetCleanPreferCode, 'adaptive');
              setCurrentPreference('adaptive');
            }}
          >
            <View className={styles.preferenceContent}>
              <Text className={styles.heading}>
                {Strings.getLang('dsc_carpet_clean_preference_1')}
              </Text>
              <Text className={styles.description}>
                {Strings.getLang('dsc_carpet_clean_preference_1_desc')}
              </Text>
            </View>
            <Image
              src={res.tick}
              className={`${styles.tick} ${currentPreference === 'adaptive' ? styles.show : ''}`}
            />
          </View>
          <View className={styles.divider} />
          <View
            className={styles.preference}
            onClick={() => {
              sendDP(carpetCleanPreferCode, 'evade');
              setCurrentPreference('evade');
            }}
          >
            <View className={styles.preferenceContent}>
              <Text className={styles.heading}>
                {Strings.getLang('dsc_carpet_clean_preference_2')}
              </Text>
              <Text className={styles.description}>
                {Strings.getLang('dsc_carpet_clean_preference_2_desc')}
              </Text>
            </View>
            <Image
              src={res.tick}
              className={`${styles.tick} ${currentPreference === 'evade' ? styles.show : ''}`}
            />
          </View>
        </View>
      </>
    </View>
  );
};

export default CarpetSettings;
