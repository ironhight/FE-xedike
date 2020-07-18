import React from 'react';
import { withRouter } from 'react-router-dom';
import { Wrapper } from './styled';
import { Icon } from 'antd';

const index = props => {
    return (
        <Wrapper onClick={() => props.history.goBack()}>
            <Icon type="arrow-left" className="mr-1" />
            Back
        </Wrapper>
    );
};

export default withRouter(index);
