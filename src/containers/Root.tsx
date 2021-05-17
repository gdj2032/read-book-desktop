import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';//在typings文件夹内忽略此错误
import { store, persistor } from '@/store';
import RouteContainer from './RouteContainer';

const Root = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <RouteContainer />
    </PersistGate>
  </Provider>
);

export default Root;
