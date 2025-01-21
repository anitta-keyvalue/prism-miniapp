import React, { FC, useState } from 'react';
import { View, Text } from 'ray';

import Strings from '@/i18n';
import SwitchBox from '@/components/SwitchBox';
import { useSendDp } from '@/hooks/useSendDp';
import { autoHyperArmMoppingCode } from '@/constant/dpCodes';

const MopSettings: FC = () => {
  const { sendDP } = useSendDp();

  const [currentAutoHyperArmValue, setAutoHyperArmValue] = useState<boolean>(false);
  const [currentMopCycleFrequency, setMopCycleFrequency] = useState<string>('1');

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
              currentMopCycleFrequency === '1' ? '' : 's'
            }`}</Text>
            right arrow
          </View>
        </View>
      </View>
    </View>
  );
};

export default MopSettings;
