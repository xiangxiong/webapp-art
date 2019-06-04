import Cart from './pages/cart';
import Home from './pages/home';
import Enter from './pages/user/entering';
import Pending from './pages/user/pending';
import Pay from './pages/user/pay';
import Applcation from './pages/user/application';
import addressList from './pages/address/addressList';
import addAddress from './pages/address/addAddress';
import Detail  from './pages/shop/detail';
import SubmitOrder from './pages/order/submit';
import PayOrder from './pages/order/pay';
import Works from './pages/user/works';
import OrderList from './pages/order/orderList';
import OrderDetails from './pages/order/orderDetails';
import Oauth from './pages/user-login/oauth';
import WorkList from  './pages/user/worklist';
import Bind from './pages/user-login/bind';
import Success from './pages/user/pay/Success';
import Community from './pages/community';
import CommunityDetail from './pages/community/detail';
import Category from './pages/category';
import BankLlist from './pages/withdraw/bankLlist/index';
import Withdraw from './pages/withdraw/index';
import WithdrawDetails from './pages/withdraw/withdrawDetails/index';
import  WithdrawList from './pages/withdraw/withdrawList/index';
import  BankCardList from './pages/bankCard/bankCardList/index';
import  AddBankCard from './pages/bankCard/addBankCard/index';
import ShopHomePage from './pages/shop/home';
import Search from './pages/search/index';
import MasterDetail from './pages/master/detail';
import Loadable from "react-loadable"; 
import Loading from './components/loading';

const LoadCategory = Loadable({
    loader: () => import("./pages/category"),
    loading: Loading,
    timeout: 1000
})

const LoadMasterDetail = Loadable({
    loader: () => import("./pages/master/detail"),
    loading: Loading,
    timeout: 1000
})

const LoadHome = Loadable({
    loader: () => import("./pages/home"),
    loading: Loading,
    timeout: 1000
});

export default [
    {
        path: "/home",
        component: LoadHome,
        exact: true,
        key: 'home'
    },
    {
        path: "/",
        component: Home,
        exact: true,
        key: 'index'
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
        path: "/masterDetail/detail",
        component: Detail,
        exact: true,
        key: 'masterDetail/detail'
    },
    {
        path: "/detail",
        component: Detail,
        exact: true,
        key: 'detail'
    },
    {
        path: "/submitorder",
        component: SubmitOrder,
        key: 'submitorder'
    },
    {
        path: "/payorder",
        component: PayOrder,
        exact: true,
        key: 'payorder'
    },
    {
        path: "/work",
        component: Works,
        key: 'work'
    },
    {
        path: "/orderList",
        component: OrderList,
        exact: true,
        key: 'orderList'
    },
    {
        path: "/orderDetails",
        component: OrderDetails,
        exact: true,
        key: 'orderDetails'
    },
    {
        path: "/oauth",
        component: Oauth,
        key: 'oauth'
    }
    ,
    {
        path: "/worklist",
        component: WorkList,
        key: 'worklist'
    }
    ,
    {
        path: "/bind",
        component: Bind,
        key: 'bind'
    }
    ,
    {
        path: "/success",
        component: Success,
        key: 'success'
    },
    {
        path: "/community",
        component: Community,
        key: 'community'
    },
    {
        path: "/communitydetail",
        component: CommunityDetail,
        key: 'communitydetail'
    },
    {
        path:"/shopHomepage",
        component:ShopHomePage,
        key:'shopHomepage'
    },
    {
        path: "/bankLlist",
        component: BankLlist,
        key: 'bankLlist'
    },
    {
        path: "/withdraw",
        component: Withdraw,
        key: 'withdraw'
    },
    {
        path: "/withdrawDetails",
        component: WithdrawDetails,
        key: 'withdrawDetails'
    },
    {
        path: "/withdrawList",
        component: WithdrawList,
        key: 'withdrawList'
    },
    {
        path: "/bankCardList",
        component: BankCardList,
        key: 'bankCardList'
    },
    {
        path: "/addBankCard",
        component: AddBankCard,
        key: 'addBankCard'
    },
    {
        path:"/masterDetail/:id",
        component:LoadMasterDetail,
        key:'masterDetail'
    },
    {
        path: "/category",
        component: LoadCategory,
        key: 'category'
    },
    {
        path: "/search",
        component: Search,
        key: 'search'
    },
];





