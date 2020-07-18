import React, { Component } from 'react';
import TripItem from '../../components/Trips/TripItem';
import { getHistoryTrips } from '../../services/HistoryTrip/actions.js';
import { connect } from 'react-redux';
import { BodyWrapper, Wrapper } from '../../styled';
import { Skeleton } from 'antd';
import GoBack from '../../components/GoBack';

class HistoryTrips extends Component {
  componentDidMount() {
    this.props.getHistoryTrips();
  }

  render() {
    return (
      <div className="container">
        <GoBack />
        <BodyWrapper>
          <Wrapper>
            <Skeleton active loading={this.props.historyTrips.isLoading}>
              <TripItem
                trips={this.props.historyTrips.data}
                showBtn={false}
                large
                priceFont="30px"
              />
            </Skeleton>
          </Wrapper>
        </BodyWrapper>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    historyTrips: state.HistoryTrips,
  };
};

export default connect(mapStateToProps, { getHistoryTrips })(HistoryTrips);
