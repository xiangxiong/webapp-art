import Cart from './pages/cart';
import Home from './pages/home';
import Enter from './pages/user/entering';
import Pending from './pages/user/pending';
import Pay from './pages/user/pay';
import Applcation from './pages/user/application';
import addressList from './pages/user/addressList';
import addAddress from './pages/user/addAddress';
import Detail  from './pages/shop/detail';
import SubmitOrder from './pages/order/submit';
import PayOrder from './pages/order/pay';

export default [
    {
        path: "/",
        component: Home,
        exact: true,
        key: 'home'
    },
    {
        path: "/cart",
        component: Cart,
        exact: true,
        key: 'cart'
    },
    {
        path: "/enter",
        component: Enter,
        exact: true,
        key: 'enter'
    },
    {
        path: "/application",
        component: Applcation,
        exact: true,
        key: 'application'
    }
    ,
    {
        path: "/pend",
        component: Pending,
        exact: true,
        key: 'pend'
    }
    ,
    {
        path: "/pay",
        component: Pay,
        exact: true,
        key: 'pay'
    },
    {
        path: "/addressList",
        component: addressList,
        exact: true,
        key: 'addressList'
    },
    {
        path: "/addAddress",
        component: addAddress,
        exact: true,
        key: 'addAddress'
    },
    {
        path: "/detail",
        component: Detail,
        exact: true,
        key: 'detail'
    },
    {
        path:"/submitorder",
        component:SubmitOrder,
        exact: true,
        key:'submitorder'
    },
    {
        path:"/payorder",
        component:PayOrder,
        exact: true,
        key:'payorder'
    }
];
