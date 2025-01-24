import React, { FC } from 'react';
import { router, Text, View } from '@ray-js/ray';

import { support } from '@/devices';
import { carpetCleanPreferCode, mopExtendFrequencyCode } from '@/constant/dpCodes';
import Strings from '@/i18n';

import SettingsOption from '../settingsOption';
import styles from './index.module.less';

const CleaningSettings: FC = () => {
  const options = [
    {
      dpCode: carpetCleanPreferCode,
      title: Strings.getLang('dsc_carpet_settings'),
      onClick: () => {
        router.push('/carpetSettings');
      },
    },
    {
      dpCode: mopExtendFrequencyCode,
      title: Strings.getLang('dsc_mop_settings'),
      onClick: () => {
        router.push('/mopSettings');
      },
    },
  ];

  return (
    <View className={styles.cleaningSettingsWrapper}>
      <View className={styles.title}>
        <Text>{Strings.getLang('dsc_cleaning_settings')}</Text>
      </View>
      <View className={styles.optionsList}>
        {options.map(({ dpCode, onClick, title }) => (
          <>
            {support.isSupportDp(dpCode) && (
              <SettingsOption key={dpCode} label={title} onClick={onClick} />
            )}
          </>
        ))}
      </View>
    </View>
  );
};
export default CleaningSettings;
