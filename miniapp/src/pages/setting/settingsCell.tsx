import { Button, Text, Image } from '@ray-js/ray';
import React, { FC } from 'react';
import res from '@/res';

type Props = {
  onClick: () => void;
  title: string;
};

const SettingsCell: FC<Props> = ({ onClick, title }) => {
  return (
    <Button
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: '16px 24',
      }}
      onClick={onClick}
    >
      <Text style={{ color: 'black', fontSize: '16px', fontWeight: '400' }}>{title}</Text>
      <Image
        src={res.rightArrow}
        style={{
          height: '16px',
          width: '16px',
        }}
      />
    </Button>
  );
};

export default SettingsCell;
