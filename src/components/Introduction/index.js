import React from 'react';
import Support from '../../assets/images/hugo-navigation-support.png';
import Access from '../../assets/images/hugo-location-access.png';
import { IntroContainer } from './styled';

const Introduction = () => {
  return (
    <IntroContainer>
      <div className="container">
        <div className="row">
          <div className="col-6 col-6 mt-auto mb-auto">
            <h2>Bắt đầu chuyến xe của bạn</h2>
            <p>
              Là người sẽ mang những chuyến xe cũng như những trải nghiệm cho
              Khách hàng. Các tài xế luôn là những người hiểu rõ Khách hàng cần
              những gì là tốt nhất. Tất nhiên, chúng tôi có những Quy định cụ
              thể để đảm bảo lợi ích lớn nhất cho tất cả các bên.
            </p>
          </div>
          <div className="col-6">
            <img src={Support} alt="support" />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <img src={Access} alt="support" />
          </div>
          <div className="col-6 col-6 mt-auto mb-auto">
            <h2>Chọn chuyến đi mà bạn muốn</h2>
            <p>
              Là người sẽ mang những chuyến xe cũng như những trải nghiệm cho
              Khách hàng. Các tài xế luôn là những người hiểu rõ Khách hàng cần
              những gì là tốt nhất. Tất nhiên, chúng tôi có những Quy định cụ
              thể để đảm bảo lợi ích lớn nhất cho tất cả các bên.
            </p>
          </div>
        </div>
      </div>
    </IntroContainer>
  );
};

export default Introduction;
