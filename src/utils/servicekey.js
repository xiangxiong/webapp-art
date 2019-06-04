/**
 * Created by huhaibin on 2019/5/15.
 */

//获取广告位接口
export const AppAdCommon = 'Art.Service.CMS.Dto.Request.AppAdCommonRequest';

//获取快报消息接口
export const NewsPager = 'Art.Service.Info.Dto.Request.NewsPagerRequest';

//为你推荐
export const GuessUserLikeProducts = 'Art.Service.Product.Dto.Api.GuessUserLikeProductsRequest';

//获取用户详情
export const CustomerDetail = 'Art.Service.Customer.Dto.Api.CustomerDetailRequest';

//获取精选商品接口[热销商品]
export const ProductCommend = 'Art.Service.Product.Dto.Request.ProductCommendRequest';

//用户申请入驻
export const CreateIntertionalPartener = 'Art.Service.Product.Dto.Api.CreateIntertionalPartenerRequest';

//艺商城分类信息返回
export const QueryCategoryList = 'Art.Service.Product.Dto.Api.QueryCategoryListRequest';

//获取保证金缴纳列表
export const Dict = 'Art.Service.Basis.Dto.DictRequest';

//收货地址列表
export const AddressList = 'Art.Service.Customer.Dto.Api.AddressListRequest';

//添加收货地址
export const AddressAdd = 'Art.Service.Customer.Dto.Api.AddressAddRequest';

//更新收货地址
export const AddressUpdate = 'Art.Service.Customer.Dto.Api.AddressUpdateRequest';

//删除收货地址
export const AddressDelete = 'Art.Service.Customer.Dto.Api.AddressDeleteRequest';

//设为默认收货地址
export const AddressSetDefault = 'Art.Service.Customer.Dto.Api.AddressSetDefaultRequest';

//获取商城商品详情
export const WorthGoodsDetail = 'Art.Service.Product.Dto.Request.WorthGoodsDetailRequest';

//买家/卖家 订单列表
export const QueryCustomerOrderList = 'Art.Service.Order.Dto.Request.api.QueryCustomerOrderListRequest';

//卖家/买家 订单详情
export const GetOrderDetail = 'Art.Service.Order.Dto.Request.api.GetOrderDetailRequest';

//按主单号获取的订单详情
export const POrderInfo = 'Art.Service.Order.Dto.Request.api.POrderInfoRequest';

//创建订单
export const CreateOrder = 'Art.Service.Order.Dto.Request.api.CreateOrderRequest';

//查询商家入驻意向信息
export const QueryIntertionalPartener = 'Art.Service.Product.Dto.Api.QueryIntertionalPartenerRequest';

//获取商品评价列表
export const ProductComment = 'Art.Service.Customer.Dto.Api.ProductCommentRequest';

/**
 *  发布商品.
 *  */
export const PUBLISH_PRODUCT_API = 'Art.Service.Product.Dto.Api.ProviderPublishProductRequest';

// 获取二级分类.
export const PUBLISH_USER_TYPE = 'Art.Service.Product.Dto.Api.QueryCategoryListRequest';

/*
  用户登录
*/
export const GET_WECHAT_API = 'Art.Service.Customer.Dto.Api.GetWeChatUserRequest';

// 获取商家作品库
export const GET_MERCHANT_PRODUCT_LIST = 'Art.Service.Product.Dto.Api.MerchantProductListRequest';

// 微信登录.
export const WX_PARENTER_LOGIN = 'Art.Service.Customer.Dto.Api.PartnerLoginRequest';

// 绑定手机
export const WX_BINDPHONE = 'Art.Service.Customer.Dto.Api.PartnerBindPhoneRequest';

// 发送短信
export const WX_SENDMESSAGE_API = 'Art.Service.Customer.Dto.Api.SendMessageRequest';

// 查询字典数据接口
export const DIC_ITEM_API = 'Art.Service.Basis.Dto.DictRequest';

// 上传视频接口
export const VIDEO_UPLOADER_API = 'Art.Service.Product.Dto.Request.Vod.VodUploadRequest';

// 商品库下架
export const SHOP_STORE_OFFLINE_API = 'Art.Service.Product.Dto.Api.UpdateProductStatusRequest'

// 获取微信相关的配置参数
export const GET_WECHAT_OAUTH_API = 'Art.Service.Customer.Dto.Api.GetWeChatOAuthRequest';

// 绑定用户信息
export const BIND_WECHAT_USERNAME = 'Art.Service.Customer.Dto.Api.PartnerSetPwRequest';

// 更新意向商家保证金信息
export const UPDATE_PARTENER_DEPOSIT = 'Art.Service.Product.Dto.Api.UpdatePartenerDepositRequest';

// 获取推荐的艺术家
export const GET_RECOMMEND_AUTHOR_LIST = 'Art.Service.Product.Dto.Request.GetRecommendAuthorListRequest';

// 查询用户卡包
export const ACCOUNT_LIST = 'Art.Service.Customer.Dto.Api.AccountListRequest';

// 创建用户银行卡
export const CARD_ADD = 'Art.Service.Customer.Dto.Api.CardAddRequest';

// 余额提现
export const DESPOSITS = 'Art.Service.Customer.Dto.Api.DespositsRequest';

// 余额提现日志记录
export const DESPOSITS_RECORD = 'Art.Service.Customer.Dto.Api. DespositsRecordRequest';

// 艺术大家分类
export const ART_CATEGORY_API = 'Art.Service.Product.Dto.Request.GetAllCategoryAuthorListRequest';

// 大师详情
export const ART_MASTER_DETAIL_API = 'Art.Service.Product.Dto.Request.GetAuthorDetailRequest';

// 查询购物车列表
export const QUERY_CAR_LIST = 'Art.Service.Order.Dto.Request.api.QueryCarListRequest';

// 添加或修改购物车数量
export const MODIFY_CART = 'Art.Service.Order.Dto.Request.api.ModifyCartRequest';

// 批量删除或清空购物车
export const BATCH_DEL_CART = 'Art.Service.Order.Dto.Request.api.BatchDelCartRequest';

// 大师商品列表
export const ART_MASTER_GET_PRODUCT_API = 'Art.Service.Product.Dto.Request.GetProductsListByProviderRequest';

// 社区列表
export const ART_COMMUNITY_LIST_API = 'Art.Service.Info.Dto.Request.Api.CommunityTopicListRequest';

// 社区详情
export const ART_COMMUNITY_DETAIL_API = 'Art.Service.Info.Dto.Request.Api.CommunityTopicDetailRequest';

// 发布话题
export const ART_COMMUNITY_PUBLISH_API = 'Art.Service.Info.Dto.Request.Api.PublishTopicCommentRequest';

// 获取话题评论列表
export const ART_COMMUNITY_COMMENT_LIST_API = 'Art.Service.Info.Dto.Request.Api.TopicCommentListRequest';

// 发布社区话题
export const ART_COMMUNITY_PUBLISH_TOPIC_API = 'Art.Service.Info.Dto.Request.Api.PublishTopicInfoRequest';

// 关注接口.
export const ART_COMMUNITY_COLLECTIN_API = 'Art.Service.Customer.Dto.Api.CollectInRequest';

// 用户/关注/喜欢/收藏相关
export const COLLECTIN = 'Art.Service.Customer.Dto.Api.CollectInRequest';