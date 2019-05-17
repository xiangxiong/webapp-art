import Cart from './pages/cart';
import Home from './pages/home';
import Enter from './pages/user/entering';
import Pending from './pages/user/pending';
import Pay from './pages/user/pay';
import Applcation from './pages/user/application';

export default [
    {
      path: "/",
      component: Home,
      exact:true,
      key: 'home'
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
    },
    {
        path: "/application",
        component: Applcation,
        exact:true,
        key:'application'
    }
    ,
    {
        path: "/pend",
        component: Pending,
        exact:true,
        key:'pend'
    }
    ,
    {
        path: "/pay",
        component: Pay,
        exact:true,
        key:'pay'
    }
];
