import * as React from 'react';
import Root from '@/containers/Root';
import './App.scss';
import { isMac } from '@/utils';

class App extends React.Component {

  componentDidMount() {
    if (isMac) {
      // const nativeTheme = window.require('electron').nativeTheme;
      // const { nativeTheme } = window;
      // const isDark = nativeTheme.shouldUseDarkColors;
      // console.log('isDark: ', isDark);
      // //mac
      // nativeTheme.addListener('updated', (e) => {
      //   console.log('i am changed')
      //   if (nativeTheme.shouldUseDarkColors) {
      //     console.log('i am dark.')
      //   } else {
      //     console.log('i am light.')
      //   }
      // })
    }
  }

  render() {
    return (
      <Root />
    );
  }
}

export default App;
