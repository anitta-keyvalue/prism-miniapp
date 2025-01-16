import Strings from '@/i18n';
import { Image, router } from '@ray-js/ray';
import { GridItem, Icon } from '@ray-js/smart-ui';
import React, { FC } from 'react';
import res from '@/res';
import styles from './index.module.less';

const SettingButton: FC = () => {
  return (
    <GridItem
      text={Strings.getLang('dsc_settings')}
      onClick={() => {
        router.push('/setting');
      }}
      className={styles.cleanModeItem}
      slot={{
        icon: (
          <Image
            src={res.settings}
            style={{
              height: '64rpx',
              width: '64rpx',
            }}
          />
        ),
      }}
    />
  );
};

export default SettingButton;
