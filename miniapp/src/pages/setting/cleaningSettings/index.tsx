import React, { FC, useState } from 'react';
import { router, Text, View } from '@ray-js/ray';

import { support } from '@/devices';
import { carpetCleanPreferCode, mopExtendFrequencyCode } from '@/constant/dpCodes';
import Strings from '@/i18n';
import BottomSheet from '@/components/BottomSheet';

import SettingsOption from '../settingsOption';
import styles from './index.module.less';
import CarpetSettings from './carpetSettings';

const CleaningSettings: FC = () => {
  const [isCarpetSettingsOpen, setIsCarpetSettingsOpen] = useState(false);

  const options = [
    {
      dpCode: carpetCleanPreferCode,
      title: Strings.getLang('dsc_carpet_settings'),
      onClick: () => {
        setIsCarpetSettingsOpen(true);
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
      <BottomSheet isOpen={isCarpetSettingsOpen} onClose={() => setIsCarpetSettingsOpen(false)}>
        <CarpetSettings />
      </BottomSheet>
    </View>
  );
};
export default CleaningSettings;
