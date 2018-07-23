import React from 'react';
import AviaSearchItemLine from './AviaSearchItemLine';

const AviaSearchItem = props => {
  const { flightData, tourData } = props;

  const { flightTo, flightBack } = flightData.transitions;

  const { link } = tourData;

  return (
    <div className="avia-search-item">
      <div className='avia-search-item-col-logo'>
        {flightData.firstPoint.airline}
      </div>
      <div className='avia-search-item-col-content'>
        { flightData.firstPoint && <AviaSearchItemLine flightData={flightData.firstPoint} transition={flightTo} flightTo={true}  /> }

        { flightData.lastPoint && <AviaSearchItemLine flightData={flightData.lastPoint} transition={flightBack} flightTo={false}  /> }

        <div className="avia-search-item__row _bottom">
          <div className="avia-search-item__cell _additional-info">
            {
              tourData.medinsurance && (
                <div className="avia-search-item__insurance">
                  <span className="avia-search-item__insurance-ico"></span>
                  <span>Страховка</span>
                </div>
              )
            }
            {
              tourData.transfer && (
                <div className="avia-search-item__transfer">
                  <span className="avia-search-item__transfer-ico"></span>
                  <span>Трансфер</span>
                </div>
              )
            }
          </div>
          <div className="avia-search-item__cell">
            <a className="avia-search-item__btn" href={link} target="_blank">Купить за {tourData.price}руб</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AviaSearchItem;
