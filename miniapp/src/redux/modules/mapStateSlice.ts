// 是否第一次配网

import { ReduxState } from '..';
import { RoomDecoded } from '@ray-js/robot-protocol';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const DEFAULT_MAP_STATE = {
  mapId: undefined as any, // map ID 主页地图
  dataMapId: undefined as any,
  decodePathFn: '',
  RCTAreaList: [], // 区域框
  selectRoomData: [] as string[],
  sweepRegionData: [],
  mapData: {} as {
    dataMapId: number;
    width: number;
    height: number;
    origin: { x: number; y: number };
    materialObject: any;
  },
  materialObject: {} as {
    materialMaps: { [key: string]: IMaterialMaterialMaps };
    materials: IMaterialMaterials;
  },
  mapStable: false,
  mapResolution: 5, // 比例尺
  bgWidth: 0,
  bgHeight: 0,
  origin: { x: 0, y: 0 },
  roomInfo: '',
  isEmptyMap: null,
  pilePosition: { theta: 0, startTheta: 0, x: 0, y: 0 },
  pathData: [],
  mapSize: {
    width: 0,
    height: 0,
  },
  curPos: { x: 0, y: 0 },
  foldableRoomIds: [] as string[], // 房间属性折叠数组
  isDebugMode: false, // 当前处于debug模式，可复制地图等数据链接

  version: 2 as 0 | 1 | 2, // 地图解析协议的版本
  roomNum: 0, // 分区个数
  originPath: '',
  originMap: '',
  originCommand: '',
  mapRooms: [] as RoomDecoded[], // 地图房间信息
};

/**
 * Slice
 */
const mapStateSlice = createSlice({
  name: 'mapState',
  initialState: DEFAULT_MAP_STATE,
  reducers: {
    updateMapData(state, action: PayloadAction<AtLeastOne<typeof DEFAULT_MAP_STATE>>) {
      return { ...state, ...action.payload };
    },
  },
});

/**
 * Actions
 */
export const { updateMapData } = mapStateSlice.actions;

/**
 * Selectors
 */
export const selectMapState = (state: ReduxState) => state.mapState;

type SelectMapStateByKey = <T extends keyof typeof DEFAULT_MAP_STATE>(
  key: T
) => (state: ReduxState) => typeof DEFAULT_MAP_STATE[T];
export const selectMapStateByKey: SelectMapStateByKey = key => state => state.mapState[key];

export default mapStateSlice.reducer;
