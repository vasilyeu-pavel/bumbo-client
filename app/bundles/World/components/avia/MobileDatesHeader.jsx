import React from 'react';
import classNames from 'classnames';

const MobileDatesHeader = ({selectDates, typeInput, СheaperButton}) => {
const arrNames = ['Дата вылета', 'Дата прилёта']
  return (
    <div className = "MobileDatesHeader">
      <p>{arrNames[typeInput]}</p>
      <div className="mobile-header-dates">{selectDates ? selectDates : 'выберите дату'}</div>
      { СheaperButton ? <div className="mobile-header-button">
      	{СheaperButton}
      </div>
      : null }
    </div>
  );
};

export default MobileDatesHeader;
