import ossApiInstance from '@/api/ossApi';
import {
  deviceTimerCode,
  directionControlCode,
  disturbTimeSetCode,
  mapResetCode,
  statusCode,
  switchGoCode,
  voiceDataCode,
  carpetCleanPreferCode,
} from '@/constant/dpCodes';
import { devices, support } from '@/devices';
import Strings from '@/i18n';
import { selectMapStateByKey } from '@/redux/modules/mapStateSlice';
import { fetchMultiMaps } from '@/redux/modules/multiMapsSlice';
import { robotIsNotWorking } from '@/utils/robotStatus';
import { useActions } from '@ray-js/panel-sdk';
import { router, View, Text } from '@ray-js/ray';
import { Cell, CellGroup, Dialog, DialogInstance } from '@ray-js/smart-ui';
import { useInterval } from 'ahooks';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SettingsCell from './settingsCell';
import styles from './index.module.less';

const Setting: FC = () => {
  const dispatch = useDispatch();
  const actions = useActions();
  const isEmptyMap = useSelector(selectMapStateByKey('isEmptyMap'));

  useEffect(() => {
    dispatch(fetchMultiMaps());
  }, []);

  const handleNavToMapEdit = async () => {
    if (!robotIsNotWorking(devices.common.model.props[statusCode] as Status)) {
      try {
        await DialogInstance.confirm({
          context: this,
          title: Strings.getLang('dsc_tips'),
          icon: true,
          message: Strings.getLang('dsc_robot_is_working_tips'),
          confirmButtonText: Strings.getLang('dsc_confirm'),
          cancelButtonText: Strings.getLang('dsc_cancel'),
        });
        actions[switchGoCode].set(false);
      } catch (err) {
        //
      }
    } else {
      router.push('/mapEdit');
    }
  };

  const handleResetMap = () => {
    DialogInstance.confirm({
      context: this,
      title: Strings.getLang('dsc_tips'),
      icon: true,
      message: Strings.getLang('dsc_reset_map_content'),
      confirmButtonText: Strings.getLang('dsc_confirm'),
      cancelButtonText: Strings.getLang('dsc_cancel'),
    })
      .then(() => {
        actions[mapResetCode].set(true);
        ty.showToast({ title: Strings.getLang('dsc_put_dp_success') });
      })
      .catch(() => {
        //
      });
  };

  useInterval(
    () => {
      ossApiInstance.updateAuthentication();
    },
    60 * 60 * 1000,
    {
      immediate: true,
    }
  );

  return (
    <View className={styles.container}>
      <Text className={styles.heading}>{Strings.getLang('dsc_device_settings')}</Text>
      <CellGroup>
        <SettingsCell
          title={Strings.getLang('dsc_multi_map')}
          onClick={() => {
            router.push('/multiMap');
          }}
        />
        {isEmptyMap === false && (
          <SettingsCell title={Strings.getLang('dsc_map_edit')} onClick={handleNavToMapEdit} />
        )}
        {support.isSupportDp(mapResetCode) && (
          <SettingsCell title={Strings.getLang('dsc_reset_map')} onClick={handleResetMap} />
        )}
        {!isEmptyMap && (
          <SettingsCell
            title={Strings.getLang('dsc_preference')}
            onClick={() => {
              router.push('/cleanPreference');
            }}
          />
        )}
        {support.isSupportDp(deviceTimerCode) && (
          <SettingsCell
            title={Strings.getLang('dsc_timer_title')}
            onClick={() => {
              router.push('/timing');
            }}
          />
        )}
        {support.isSupportDp(disturbTimeSetCode) && (
          <SettingsCell
            title={Strings.getLang('dsc_do_not_disturb')}
            onClick={() => {
              router.push('/doNotDisturb');
            }}
          />
        )}
        <SettingsCell
          title={Strings.getLang('dsc_clean_records')}
          onClick={() => {
            router.push('/cleanRecords');
          }}
        />

        {support.isSupportDp(voiceDataCode) && (
          <SettingsCell
            title={Strings.getLang('dsc_voice_pack')}
            onClick={() => {
              router.push('/voicePack');
            }}
          />
        )}
        {support.isSupportDp(directionControlCode) && (
          <SettingsCell
            title={Strings.getLang('dsc_manual')}
            onClick={() => {
              router.push('/manual');
            }}
          />
        )}
        <SettingsCell
          title={Strings.getLang('dsc_cleaning_settings')}
          onClick={() => {
            router.push('/cleaningSettings');
          }}
        />
      </CellGroup>
      <Dialog id="smart-dialog" customClass="my-custom-class" />
    </View>
  );
};

export default Setting;
