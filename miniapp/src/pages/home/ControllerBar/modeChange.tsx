import { modeCode } from '@/constant/dpCodes';
import { usePoseClean } from '@/hooks';
import Strings from '@/i18n';
import store from '@/redux';
import { mapExtrasUpdated } from '@/redux/modules/mapExtrasSlice';
import { selectMapStateByKey, updateMapData } from '@/redux/modules/mapStateSlice';
import { setLaserMapSplitType } from '@/utils/openApi';
import { EMapSplitStateEnum, ENativeMapStatusEnum } from '@ray-js/robot-sdk-types';
import { Grid, GridItem, Icon } from '@ray-js/smart-ui';
import clsx from 'clsx';
import React, { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { emitter } from '@/utils';
import res from '@/res';
import { Image } from '@ray-js/ray';
import styles from './index.module.less';

type Props = {
  setMapStatus: (status: number) => void;
  modeState: Mode;
  setModeState: (mode: Mode) => void;
};

const ModeChange: FC<Props> = ({ modeState, setMapStatus, setModeState }) => {
  const dispatch = useDispatch();
  const { drawPoseCleanArea } = usePoseClean();

  const isEmptyMap = useSelector(selectMapStateByKey('isEmptyMap'));
  const roomNum = useSelector(selectMapStateByKey('roomNum'));

  /**
   * 增加一个指哪扫哪的移动点
   */
  const addPosPoints = async () => {
    const { mapId } = store.getState().mapState;
    drawPoseCleanArea(mapId);
  };

  /**
   * 切换清扫模式
   * @param modeValue
   * @param mapStatus
   */
  const handleSwitchMode = (modeValue: string, mapStatus: number) => {
    const { mapId } = store.getState().mapState;

    setMapStatus(mapStatus);

    // 是否是切换到选区清扫
    if (mapStatus === ENativeMapStatusEnum.mapClick) {
      setLaserMapSplitType(mapId, EMapSplitStateEnum.click);
    }

    if (mapStatus === ENativeMapStatusEnum.normal) {
      setLaserMapSplitType(mapId, EMapSplitStateEnum.normal);
    }

    // 指哪扫哪如果不需要点击地图，立即生成一个可移动区时
    if (mapStatus === 1) {
      addPosPoints();
    }

    dispatch(updateMapData({ selectRoomData: [] }));
    dispatch(mapExtrasUpdated({ appointData: [], sweepRegionData: [] }));

    emitter.emit('reorganizationRCTAreaList');
  };

  const modes = useMemo(() => {
    return [
      // 全屋清扫
      {
        text: 'Auto',
        mode: 'smart',
        mapStatus: ENativeMapStatusEnum.normal,
        disabled: false,
        icon: res.auto,
      },
      // 选区清扫
      {
        text: 'Room',
        mode: 'select_room',
        mapStatus: ENativeMapStatusEnum.mapClick,
        disabled: isEmptyMap !== false || roomNum === 0,
        icon: res.room,
      },
      // 指哪扫哪
      {
        text: 'Area',
        mode: 'pose',
        mapStatus: ENativeMapStatusEnum.pressToRun,
        disabled: isEmptyMap !== false,
        icon: res.area,
      },
      // 划区清扫
      {
        text: 'Custom',
        mode: 'zone',
        mapStatus: ENativeMapStatusEnum.areaSet,
        disabled: isEmptyMap !== false,
        icon: res.custom,
      },
    ] as const;
  }, [isEmptyMap, roomNum]);

  return (
    <Grid customClass={styles.full} border={false}>
      {modes.map(({ text, mode, disabled, mapStatus, icon }) => {
        const isActive = mode === modeState;
        return (
          <GridItem
            key={mode}
            text={text}
            onClick={() => {
              if (disabled) return;
              setModeState(mode);
              handleSwitchMode(mode, mapStatus);
            }}
            className={clsx(
              styles.cleanModeItem,
              isActive && styles.active,
              disabled && styles.disabled
            )}
            slot={{
              icon: (
                <Image
                  src={icon}
                  style={{ width: '44rpx', height: '44rpx', color: isActive ? '#D5EAFF' : '#000' }}
                />
              ),
            }}
          />
        );
      })}
    </Grid>
  );
};

export default ModeChange;
