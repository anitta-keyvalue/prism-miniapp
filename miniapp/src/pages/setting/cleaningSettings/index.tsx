import React, { FC } from "react";
import { CellGroup } from "@ray-js/smart-ui";
import { router } from "@ray-js/ray";

import { support } from "@/devices";
import {
  carpetCleanPreferCode,
  mopExtendFrequencyCode
} from "@/constant/dpCodes";
import Strings from "@/i18n";

import SettingsCell from "../settingsCell";

const CleaningSettings: FC = () => {
  return (
    <CellGroup>
      {support.isSupportDp(carpetCleanPreferCode) && (
        <SettingsCell
          title={Strings.getLang("dsc_carpet_settings")}
          onClick={() => {
            router.push("/carpetSettings");
          }}
        />
      )}
      {support.isSupportDp(mopExtendFrequencyCode) && (
        <SettingsCell
          title={Strings.getLang("dsc_mop_settings")}
          onClick={() => {
            router.push("/mopSettings");
          }}
        />
      )}
    </CellGroup>
  );
};
export default CleaningSettings;
