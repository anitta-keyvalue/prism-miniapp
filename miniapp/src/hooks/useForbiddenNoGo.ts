// 扫拖禁区

import { ALL_ZONE_MUN_MAX } from '@/constant';
import { selectMapStateByKey } from '@/redux/modules/mapStateSlice';
import base64Imgs from '@/res/base64Imgs';
import { checkMapPointNumber, createLimitByNum, getFirNum } from '@/utils';
import { addLaserMapArea, getMapPointsInfo } from '@/utils/openApi';
import { convertColorToArgbHex } from '@ray-js/robot-protocol';
import { ENativeMapStatusEnum, Point } from '@ray-js/robot-sdk-types';
import { isUndefined } from 'lodash-es';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const { rDeleteBase64Img, rResizeBase64Img, rRotateBase64Img } = base64Imgs;
export const useForbiddenNoGo = () => {
  const lastTempAreaRef = useRef<{ points: Point[] }>();
  const mapSize = useSelector(selectMapStateByKey('mapSize'));
  const curPos = useSelector(selectMapStateByKey('curPos'));
  const origin = useSelector(selectMapStateByKey('origin'));
  const { width: mapWidth, height: mapHeight } = mapSize;
  const [minAreaWidth, setMinAreaWidth] = useState(10);
  const [bgColor, setBgColor] = useState('rgba(255, 68, 68, 0.05)');
  const [borderColor, setBorderColor] = useState('rgba(255, 68, 68, 1)');
  const [maxLength, setMaxLength] = useState(5);

  const createAreaPoints: (mapId: string) => Promise<{ points: Point[] }> = (mapId: string) => {
    return new Promise((resolve, reject) => {
      let points: { x: number; y: number }[] = [];
      checkMapPointNumber(ALL_ZONE_MUN_MAX, 0, mapId)
        .then(() => {
          const lastTempArea = lastTempAreaRef.current;

          if (lastTempArea) {
            // 如果有临时区域，以上一个为准来偏移
            const [p1, p2, p3, p4] = lastTempArea.points;
            points = [
              { x: p1.x - 10, y: p1.y + 10 },
              { x: p2.x - 10, y: p2.y + 10 },
              { x: p3.x - 10, y: p3.y + 10 },
              { x: p4.x - 10, y: p4.y + 10 },
            ];
          } else if (mapHeight && mapWidth) {
            // 如果有高度和宽度
            const { x: ox, y: oy } = origin;
            const originX = Math.round(mapWidth / 2 - ox);
            const originY = Math.round(mapHeight / 2 - oy);
            points = [
              { x: originX - minAreaWidth, y: originY - minAreaWidth },
              { x: originX + minAreaWidth, y: originY - minAreaWidth },
              { x: originX + minAreaWidth, y: originY + minAreaWidth },
              { x: originX - minAreaWidth, y: originY + minAreaWidth },
            ];
          } else {
            const { x: ox, y: oy } = origin;
            const { x: px, y: py } = curPos;
            const originX = getFirNum([px, ox, 0]);
            const originY = getFirNum([py, oy, 0]);
            points = [
              { x: originX - minAreaWidth, y: originY - minAreaWidth },
              { x: originX + minAreaWidth, y: originY - minAreaWidth },
              { x: originX + minAreaWidth, y: originY + minAreaWidth },
              { x: originX - minAreaWidth, y: originY + minAreaWidth },
            ];
          }
          lastTempAreaRef.current = { points };
          resolve({ points });
        })
        .catch(() => {
          reject();
        });
    });
  };

  const updateConfig = (cfg: {
    areaWidth?: number;
    borderColor?: string;
    maxLength?: number;
    bgColor?: string;
  }) => {
    const { areaWidth } = cfg;
    if (!isUndefined(areaWidth)) {
      setMinAreaWidth(areaWidth);
    }
    if (!isUndefined(cfg.borderColor)) {
      setBorderColor(cfg.borderColor);
    }
    if (!isUndefined(cfg.maxLength)) {
      setMaxLength(cfg.maxLength);
    }
    if (!isUndefined(cfg.bgColor)) {
      setBgColor(cfg.bgColor);
    }
  };

  const getForbiddenNoGoConfig = (points: Point[]) => {
    const config = {
      box: {
        bgColor: convertColorToArgbHex(bgColor),
        borderColor: convertColorToArgbHex(borderColor),
        isDash: false,
        minAreaWidth,
      },
      content: {
        text: '',
        textColor: convertColorToArgbHex('#fff'),
        textSize: 10,
        renameEnable: false,
        rotateEnable: true,
      },
      vertex: {
        showVertexImages: true,
        vertexImages: [rDeleteBase64Img, rRotateBase64Img, rResizeBase64Img],
      },
      unit: {
        // 如果不支持单位显示，就设置为透明色字号
        textColor: borderColor,
      },
      type: ENativeMapStatusEnum.virtualArea,
      viewType: 'dashEdit',
      points,
      extend:
        JSON.stringify({
          forbidType: 'sweep',
        }) || '',
    };
    return config;
  };

  const drawOneForbiddenNoGo = async (mapId: string, points?: Point[]) => {
    let renderPoints = points;
    if (isUndefined(renderPoints)) {
      const { points: newPoints } = await createAreaPoints(mapId);
      renderPoints = newPoints;
    }
    const { data } = (await getMapPointsInfo(mapId)) as any;

    // @ts-ignore
    const existVirtualBox = data.filter(
      i => i.areaType === ENativeMapStatusEnum.virtualArea && i.extend.forbidType === 'sweep'
    );
    const countLimit = createLimitByNum(existVirtualBox, maxLength, 'dsc_max_forbid_sweep_number');
    if (countLimit) {
      return null; // Consider throwing an error or returning a specific message instead of returning null for better error handling.
    }
    const config = getForbiddenNoGoConfig(renderPoints);
    await addLaserMapArea(mapId, config);
    return { area: { ...config, type: ENativeMapStatusEnum.areaSet } };
  };

  return {
    drawOneForbiddenNoGo,
    updateConfig,
    createAreaPoints,
    getForbiddenNoGoConfig,
  };
};
