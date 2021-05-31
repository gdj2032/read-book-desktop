import { WindowHeader } from '@/components';
import { Fragment, Component } from 'react';
import CustomRoute from '../routes';
class RouteContainer extends Component {
  render() {
    return (
      <Fragment>
        {/* <WindowHeader /> */}
        <CustomRoute />
      </Fragment>
    );
  }
}
export default RouteContainer;
