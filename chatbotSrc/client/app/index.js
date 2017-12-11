/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable react/react-in-jsx-scope */

/* ----------  External Libraries  ---------- */

import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';

/* ----------  Local Components  ---------- */

import App from './app.jsx';

/* ----------  Styles  ---------- */

import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../public/style.css';

// Simple initializer for attaching the Preferences App to the DOM
window.attachApp = (userId) => {
  /**
   * getContext is only available on iOS and Android,
   * so show an error page if userId is undefined
   */

   ReactDOM.render(<App/> document.getElementById('content'));
};
