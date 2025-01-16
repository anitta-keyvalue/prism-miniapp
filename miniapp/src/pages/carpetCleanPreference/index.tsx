import React, { FC, useEffect, useState } from 'react';
import { View, getDevInfo, getVoiceList, device} from '@ray-js/ray';
import { decodeVoice0x35 } from '@ray-js/robot-protocol';
import { Toast } from '@ray-js/smart-ui';
import Strings from '@/i18n';
import { voiceDataCode } from '@/constant/dpCodes';
import { useSendDp } from '@/hooks/useSendDp';
import { useDpSchema, useProps } from "@ray-js/panel-sdk";


import styles from './index.module.less';

const CarpetCleanPreference: FC = () => {
  const { getDeviceInfo } = device;
  const { sendDP } = useSendDp();
  const [currentPreference, setCurrentPreference] = useState<string>('');

  const dpState = useProps((state) => state);

//   console.log("dpSchema", dpSchema);
  console.log("dpState", dpState['carpet_clean_prefer']);

  useEffect(() => {
    getDeviceInfo({
        deviceId: 'vdevo173631844770274',
      })
        .then((res) => {
        console.log(res.schema);
        const schema = res.schema || [];
        const carpetCleanPrefer = schema.find(item => item.code === 'carpet_clean_prefer');
        const propertyValue = carpetCleanPrefer ? carpetCleanPrefer.property.range : null;
        console.log('Property Value:', propertyValue);
        setCurrentPreference(dpState['carpet_clean_prefer']);
        // sendDP('carpet_clean_prefer', 'evade');
        })
        .catch((error) => {
          console.log(error);
        });

    ty.setNavigationBarTitle({
      title: Strings.getLang('dsc_carpet_clean_preference'),
    });
  }, []);

  return (
    <View className={styles.container}>
      <Toast id="smart-toast" />
    </View>
  );
};

export default CarpetCleanPreference;
