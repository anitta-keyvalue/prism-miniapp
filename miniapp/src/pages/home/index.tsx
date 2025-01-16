/* eslint-disable no-irregular-whitespace */
import HomeTopBar from '@/components/HomeTopBar';
import store from '@/redux';
import { freezeMapUpdate, setLaserMapStateAndEdit } from '@/utils/openApi';
import { View } from '@ray-js/ray';
import { ENativeMapStatusEnum } from '@ray-js/robot-sdk-types';
import React, { FC, useState } from 'react';
import { useDpSchema, useProps } from '@ray-js/panel-sdk';

import ControllerBar from './ControllerBar';
import styles from './index.module.less';
import Map from './Map';

const Home: FC = () => {
  const [mapStatus, setMapStatus] = useState<ENativeMapStatusEnum>(ENativeMapStatusEnum.normal); // 地图状态

  /**
   * 修改地图状态&地图编辑状态
   * @param status 地图状态
   */
  const setMapStatusChange = (status: number) => {
    const { mapId } = store.getState().mapState;
    const edit = status !== ENativeMapStatusEnum.normal;
    // 当切换为选区清扫时,冻结地图,阻止地图更新
    if (status === ENativeMapStatusEnum.mapClick) {
      freezeMapUpdate(mapId, true);
    }
    // 切换回来时恢复地图
    if (status === ENativeMapStatusEnum.normal) {
      freezeMapUpdate(mapId, false);
    }

    setLaserMapStateAndEdit(mapId, { state: status, edit: edit || false });
    setMapStatus(status);
  };

  //   export default () => {
  //     // When the project starts, automatically pull the product schema information corresponding to the productId on the developer platform
  //  const dpSchema = useDpSchema();

  //  // Read dpState data from the device model
  //     const dpState = useProps(state => state); // Get all dpState
  //  const switch = useProps(state => state.switch); // Get values ​where dpCode is switch

  //  console.log("dpSchema", dpSchema); // Print to view the contents of dpSchema
  //     console.log("dpState", dpState); // Print to view the contents of dpState

  //  return <View>hello world</View>;
  //     };

  return (
    <View className={styles.container}>
      {/* Topbar */}
      <HomeTopBar />
      {/* 实时地图 */}
      <Map mapStatus={mapStatus} />
      {/* 操作栏 */}
      <ControllerBar mapStatus={mapStatus} setMapStatus={setMapStatusChange} />
    </View>
  );
};

export default Home;
