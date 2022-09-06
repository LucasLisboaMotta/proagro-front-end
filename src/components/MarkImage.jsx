import React from 'react';
import { bool } from 'prop-types';
import '../style/MarkImage.css';

import check from '../imgs/check-mark.png';
import cross from '../imgs/cross-mark.png';

export default function MarkImage({ isCheck }) {
  return (
    <img
      className="MarkImage"
      alt={isCheck ? 'check-mark-image' : 'cross-mark-image'}
      src={isCheck ? check : cross}
    />
  );
}

MarkImage.propTypes = { isCheck: bool.isRequired };
