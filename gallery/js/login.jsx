import React from 'react';
import { render } from 'react-dom';
import Topbar from './topbar';

render(
  <><Topbar logname={''} /><div className='account-background'>
    <div className='account-view'>
      <h1>Log In</h1>
      <form action="/accounts/?target=/" method="post">
        <input type="hidden" name="operation" value="login" />
        <label htmlFor="username">Username</label><br />
        <input type="text" name="username" id="username" /><br />
        <label htmlFor="password">Password</label><br />
        <input type="password" name="password" id="password" /><br />
        <input type="submit" value="log in" /><br />
      </form>
      don't have an account? <a href='/accounts/create/'>create one.</a>
    </div>
  </div></>,
  document.getElementById("reactEntry"),
);
