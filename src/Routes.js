import Cart from './pages/cart';
import Home from './pages/home';

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
    }
];