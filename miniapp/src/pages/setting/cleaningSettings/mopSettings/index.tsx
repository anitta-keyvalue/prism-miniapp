import React, { FC, useState, useEffect } from 'react';
import { View, device, Text } from '@ray-js/ray';
import Strings from '@/i18n';
import SwitchBox from '@/components/SwitchBox/switchBox';
import { useSendDp } from '@/hooks/useSendDp';
import {
  autoHyperArmMoppingCode,
  autoHyperArmValue,
  mopCycleFrequency,
  mopExtendFrequencyCode,
} from '@/constant/dpCodes';
import { useProps } from '@ray-js/panel-sdk';

const MopSettings: FC = () => {
  const { sendDP } = useSendDp();
  const { getDeviceInfo } = device;

  const [currentAutoHyperArmValue, setAutoHyperArmValue] = useState<boolean>(false);
  const [currentMopCycleFrequency, setMopCycleFrequency] = useState<number>(1);

  const dpState = useProps(state => state);

  useEffect(() => {
    getDeviceInfo({
      deviceId: 'vdevo173631844770274',
    })
      .then(res => {
        setAutoHyperArmValue(dpState[autoHyperArmValue]);
        setMopCycleFrequency(dpState[mopExtendFrequencyCode]);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <View>
      <Text>{Strings.getLang('dsc_mop_settings')}</Text>
      <View>
        <SwitchBox
          title={Strings.getLang('dsc_auto_hyper_arm_mopping')}
          label=""
          enable={currentAutoHyperArmValue}
          onSwitchChange={v => {
            setAutoHyperArmValue(v.detail);
            sendDP(autoHyperArmMoppingCode, v.detail);
          }}
        />
        <View>
          <Text>{Strings.getLang('dsc_mop_cycle_frequency')}</Text>
          <View>
            <Text>{`${currentMopCycleFrequency} time${
              currentMopCycleFrequency === 1 ? '' : 's'
            }`}</Text>
            right arrow
          </View>
        </View>
      </View>
    </View>
  );
};

export default MopSettings;
