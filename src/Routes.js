import Cart from './pages/cart';
import Home from './pages/home';
import Enter from './pages/user/entering';
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
];