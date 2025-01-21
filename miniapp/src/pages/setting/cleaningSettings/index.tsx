import React, { FC } from 'react';
import { Cell, CellGroup } from '@ray-js/smart-ui';
import { router } from '@ray-js/ray';

import { support } from '@/devices';
import { carpetCleanPreferCode, mopExtendFrequencyCode } from '@/constant/dpCodes';
import Strings from '@/i18n';

const CleaningSettings: FC = () => {
  return (
    <CellGroup>
      {support.isSupportDp(carpetCleanPreferCode) && (
        <Cell
          title={Strings.getLang('dsc_carpet_settings')}
          isLink
          onClick={() => {
            router.push('/carpetSettings');
          }}
        />
      )}
      {support.isSupportDp(mopExtendFrequencyCode) && (
        <Cell
          title={Strings.getLang('dsc_mop_settings')}
          isLink
          onClick={() => {
            router.push('/mopSettings');
          }}
        />
      )}
    </CellGroup>
  );
};

export default CleaningSettings;
