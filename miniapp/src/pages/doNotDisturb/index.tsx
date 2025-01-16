import { THEME_COLOR } from '@/constant';
import { useDisturbTime } from '@/hooks/useDisturbTime';
import Strings from '@/i18n';
import { utils } from '@ray-js/panel-sdk';
import { View, Text } from '@ray-js/ray';
import { Button, Cell, CellGroup, DateTimePicker, Popup } from '@ray-js/smart-ui';
import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import SwitchBox from './switchBox';

const { toFixedString } = utils;
const DoNotDisturb = () => {
  const [sPopVisible, setSPopVisible] = useState(false);
  const [ePopVisible, setEPopVisible] = useState(false);
  const { disturbTimeSetData, setDisturbTimeSetData, updateDpValue } = useDisturbTime();
  console.log('disturbTimeSetData', disturbTimeSetData);
  useEffect(() => {
    ty.setNavigationBarTitle({
      title: Strings.getLang(''),
    });
    updateDpValue({
      ...disturbTimeSetData,
      enable: false,
    });
    updateDpValue({
      ...disturbTimeSetData,
      enable: false,
    });
  }, []);
  //   const { enable, startHour, startMinute, endHour, endMinute } = disturbTimeSetData;
  return (
    <View className={styles.header}>
      <Text className={styles.title}>{Strings.getLang('dsc_do_not_disturb')}</Text>
      <View className={styles.pageBox}>
        <View className={styles.contentBox}>
          <View className={styles.spaceLine} />
          <SwitchBox
            title={Strings.getLang('dsc_do_not_disturb')}
            label={Strings.getLang('dsc_disturb_time_set_tip')}
            enable={false}
            onSwitchChange={v => {
              // const data = {
              //   ...disturbTimeSetData,
              //   enable: !enable,
              // };
              // setDisturbTimeSetData(data);
            }}
          />
          <View className={styles.spaceLine} />
          <CellGroup inset>
            <Cell
              className={styles.cellGroup}
              title={Strings.getLang('dsc_do_not_disturb_start_time')}
              label="start time"
              isLink
              onClick={() => setSPopVisible(true)}
            />
            <Cell
              title={Strings.getLang('dsc_do_not_disturb_end_time')}
              label="end time"
              isLink
              onClick={() => setEPopVisible(true)}
            />
          </CellGroup>
        </View>
        <Popup
          show={sPopVisible}
          onClose={() => {
            setSPopVisible(false);
          }}
          position="bottom"
        >
          <DateTimePicker
            type="time"
            value={Date.now()}
            onCancel={() => {
              setSPopVisible(false);
            }}
            confirmButtonText={Strings.getLang('dsc_confirm')}
            cancelButtonText={Strings.getLang('dsc_cancel')}
            onConfirm={v => {
              const [startHour, startMinute] = '23';
              const data = {
                ...disturbTimeSetData,
                startHour: Number(startHour),
                startMinute: Number(startMinute),
              };
              setDisturbTimeSetData(data);
              setSPopVisible(false);
            }}
          />
        </Popup>
        <Popup
          show={ePopVisible}
          onClose={() => {
            setEPopVisible(false);
          }}
          position="bottom"
        >
          <DateTimePicker
            type="time"
            value={Date.now()}
            onCancel={() => {
              setEPopVisible(false);
            }}
            onConfirm={v => {
              const [endHour, endMinute] = '12';
              const data = {
                ...disturbTimeSetData,
                endHour: Number(endHour),
                endMinute: Number(endMinute),
              };
              setEPopVisible(false);
              setDisturbTimeSetData(data);
            }}
          />
        </Popup>
        <View className={styles.buttonBox}>
          <Button
            block
            color="#282829"
            onClick={() => {
              updateDpValue(disturbTimeSetData);
            }}
          >
            {Strings.getLang('dsc_save')}
          </Button>
        </View>
      </View>
    </View>
  );
};
export default DoNotDisturb;
