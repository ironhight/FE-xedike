import React from 'react';
import { WhyContainer } from './styled';
import True from '../../assets/images/img_trust.png';
import Love from '../../assets/images/img_love_car.png';
import Safe from '../../assets/images/img_safe.png';

const WhyChoose = () => {
  return (
    <WhyContainer>
      <div className="container">
        <h1>Tại sao sử dụng XEDIKE.VN?</h1>
        <p className="mb-5">
          Dưới đây là một trong những lí do cho việc lựa chọn.
        </p>
        <div className="row">
          <div className="col-4">
            <img src={True} alt="true" />
            <h5 className="mt-3">Tin tưởng</h5>
            <p>
              Bạn sẽ biết tài xế và bạn đồng hành của bạn là ai. Điều đó giúp
              bạn có những trải nghiệm tốt hơn trên hành trình của mình.
            </p>
          </div>
          <div className="col-4">
            <img src={Safe} alt="safe" />
            <h5 className="mt-3">Chủ động</h5>
            <p>
              Thời gian chờ, số ghế trống, giá cả, chất lượng tài xế, các đánh
              giá, … tất cả sẽ được hiển thị rõ ràng để bạn yên tâm đặt chuyến
              đi.
            </p>
          </div>
          <div className="col-4">
            <img src={Love} alt="love" />
            <h5 className="mt-3">Môi trường</h5>
            <p>
              Mỗi 2 người đi chung một xe tương đương với việc trồng 4 cây xanh
              cho việc hấp thụ khí C02 trong vòng 1 năm.
            </p>
          </div>
        </div>
      </div>
    </WhyContainer>
  );
};

export default WhyChoose;
