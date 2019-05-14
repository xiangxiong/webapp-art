import React from 'react';
import {Route} from 'react-router-dom';
import User from './pages/user';
import Cart from './pages/cart';
import Home from './pages/home';

export default [
    {
      path: "/",
      component: Home,
      exact:true,
      loadData: Home.loadData,
      key: 'home',
      routes:[
          // {
          //   path: "/ttt",
          //   component: Cart,
          //   exact:true,
          //   key:'ttt'
          // }
      ]
    },
    {
        path: "/cart",
        component: Cart,
        exact:true,
        key:'login'
    }
];