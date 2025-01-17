import React, { FC, useEffect, useState } from 'react';
import { View, getDevInfo, getVoiceList, device } from '@ray-js/ray';
import { decodeVoice0x35 } from '@ray-js/robot-protocol';
import { Toast } from '@ray-js/smart-ui';
import { useDpSchema, useProps } from '@ray-js/panel-sdk';
import Strings from '@/i18n';
import { voiceDataCode } from '@/constant/dpCodes';
import { useSendDp } from '@/hooks/useSendDp';

import styles from './index.module.less';
import Item from './Item';
import Header from './Header';

const VoicePack: FC = () => {
  const [voices, setVoices] = useState<Voice[]>([]);
  const dpVoiceData = useProps(props => props[voiceDataCode]);
  const { sendDP } = useSendDp();

  const deviceVoice = dpVoiceData ? decodeVoice0x35({ command: dpVoiceData }) : {};

  useEffect(() => {
    const fetchVoices = async () => {
      const res = await getVoiceList({
        devId: getDevInfo().devId,
        offset: 0,
        limit: 100,
      });
      console.log('Voice List:', res.datas);
      setVoices(res.datas);
    };

    fetchVoices();
  }, []);

  return (
    <View className={styles.container}>
      <Header />
    </View>
  );
};

export default VoicePack;
