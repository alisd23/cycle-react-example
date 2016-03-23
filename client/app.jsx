import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';

ReactDOM.render(<Root />, document.getElementById('root'));

if (module.onReload) {
  module.onReload(() => {
    console.log('reload');
    return true;
  });
}
