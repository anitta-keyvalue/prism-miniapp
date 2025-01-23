import React, { FC, useState } from 'react';
import { View, Text, Image } from 'ray';

import Strings from '@/i18n';
import { useSendDp } from '@/hooks/useSendDp';
import { autoHyperArmMoppingCode, mopExtendFrequencyCode } from '@/constant/dpCodes';
import res from '@/res';
import SwitchBox from '@/components/SwitchBox/switchBox';

import styles from './index.module.less';

const MopSettings: FC = () => {
  const { sendDP } = useSendDp();

  const [currentAutoHyperArmValue, setAutoHyperArmValue] = useState<boolean>(false);
  const [currentMopCycleFrequency, setMopCycleFrequency] = useState<string>('1');

  return (
    <View className={styles.container}>
      <Text className={styles.title}>{Strings.getLang('dsc_mop_settings')}</Text>
      <View className={styles.content}>
        <SwitchBox
          title={Strings.getLang('dsc_auto_hyper_arm_mopping')}
          label=""
          enable={currentAutoHyperArmValue}
          onSwitchChange={v => {
            setAutoHyperArmValue(v.detail);
            sendDP(autoHyperArmMoppingCode, v.detail);
          }}
        />
        <View className={styles.cycleFrequencyWrapper}>
          <Text className={styles.label}>{Strings.getLang('dsc_mop_cycle_frequency')}</Text>
          <View className={styles.rightSection}>
            <Text className={styles.frequencyText}>{`${currentMopCycleFrequency} time${
              currentMopCycleFrequency === '1' ? '' : 's'
            }`}</Text>
            <Image src={res.rightArrow} className={styles.arrow} />
          </View>
        </View>
      </View>
      {/* <BottomSheet isOpen={false} onClose={() => null}>
        <Text>{Strings.getLang('dsc_mop_cycle_frequency')}</Text>
        <Text>{Strings.getLang('dsc_mop_cycle_frequency_desc')}</Text>
        <View>
          <View
            // className={styles.preference}
            onClick={() => {
              sendDP(mopExtendFrequencyCode, '1');
              setMopCycleFrequency('1');
            }}
          >
            <View className={styles.frequencyContent}>
              <Text className={styles.heading}>1 time</Text>
              <Text className={styles.description}>
                {Strings.getLang('dsc_mop_cycle_frequency_desc_1')}
              </Text>
            </View>
            <Image
              src={res.tick}
              className={`${styles.tick} ${currentMopCycleFrequency === '1' ? styles.show : ''}`}
              // style={{
              //   height: '16px',
              //   width: '16px',
              // }}
            />
          </View>
          <View className={styles.divider} />
          <View
            // className={styles.preference}
            onClick={() => {
              sendDP(mopExtendFrequencyCode, '3');
              setMopCycleFrequency('3');
            }}
          >
            <View className={styles.frequencyContent}>
              <Text className={styles.heading}>3 times</Text>
              <Text className={styles.description}>
                {Strings.getLang('dsc_mop_cycle_frequency_desc_3')}
              </Text>
            </View>
            <Image
              src={res.tick}
              className={`${styles.tick} ${currentMopCycleFrequency === '3' ? styles.show : ''}`}
              // style={{
              //   height: '16px',
              //   width: '16px',
              // }}
            />
          </View>
          <View className={styles.divider} />
          <View
            // className={styles.preference}
            onClick={() => {
              sendDP(mopExtendFrequencyCode, '5');
              setMopCycleFrequency('5');
            }}
          >
            <View className={styles.frequencyContent}>
              <Text className={styles.heading}>5 times</Text>
              <Text className={styles.description}>
                {Strings.getLang('dsc_mop_cycle_frequency_desc_5')}
              </Text>
            </View>
            <Image
              src={res.tick}
              className={`${styles.tick} ${currentMopCycleFrequency === '5' ? styles.show : ''}`}
              // style={{
              //   height: '16px',
              //   width: '16px',
              // }}
            />
          </View>
        </View>
      </BottomSheet> */}
    </View>
  );
};

export default MopSettings;
