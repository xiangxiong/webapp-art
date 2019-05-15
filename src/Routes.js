import Cart from './pages/cart';
import Home from './pages/home';
import Enter from './pages/user/entering';

export default [
    {
      path: "/",
      component: Home,
      exact:true,
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
        key:'cart'
    },
    {
        path: "/enter",
        component: Enter,
        exact:true,
        key:'enter'
    }
];