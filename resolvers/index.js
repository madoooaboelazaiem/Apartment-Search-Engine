// const { getToken } = require('../services/jwt');

// const {
//   handleEmailLogin,
//   handleMobileLogin,
//   handleUsernameLogin,
//   handleAdminLogin,
// } = require('./utils/login');

// const { validateAndGetUser } = require('../../services/user');
// const { sendEmail } = require('../../services/mail/mail');

const { userResolvers } = require('./userResolvers');
const { appartmentResolvers } = require('./appartmentResolvers');

module.exports = {
  Query: {
    ...userResolvers.Query,
    ...appartmentResolvers.Query,
    // searchForCoupons: async (_, args, { user, dataSources }) => {
    //   const modelName =
    //     user && user.role === 'user' ? 'Merchant' : 'Customer';
    //   const getAndValidateUser = await validateAndGetUser(
    //     user,
    //     dataSources,
    //     modelName,
    //   );
    //   if (!getAndValidateUser.success)
    //     return {
    //       success: false,
    //       message: getAndValidateUser.message,
    //       nodes: [],
    //       edges: [],
    //       pageInfo: null,
    //       totalCount: 0,
    //     };

    //   const brands = await dataSources.brands.searchForBrandsByName({
    //     brandSearchInput: args.searchInput,
    //   });

    //   const brandsIds = brands && brands.map((brand) => brand._id);

    //   let getCouponsByName = await dataSources.coupons.searchForCouponsByName({
    //     couponSearchInput: args.searchInput,
    //     language: getAndValidateUser.userData.language,
    //     brandsIds,
    //   });

    //   const { nodes, edges, pageInfo, totalCount } = paginateData({
    //     data: getCouponsByName,
    //     after: args.after,
    //     before: args.before,
    //     first: args.first,
    //     last: args.last,
    //   });
    //   return {
    //     success: true,
    //     message: 'Coupon_Fetched_Successfully',
    //     nodes,
    //     edges,
    //     pageInfo,
    //     totalCount,
    //   };
    // },

    // // Get location of the current logged in user and add it to the query
    // filterCoupons: async (_, args, { user, dataSources }) => {
    //   const modelName =
    //     user && user.role === 'user' ? 'Merchant' : 'Customer';
    //   const getAndValidateUser = await validateAndGetUser(
    //     user,
    //     dataSources,
    //     modelName,
    //   );
    //   if (!getAndValidateUser.success)
    //     return {
    //       success: false,
    //       message: getAndValidateUser.message,
    //       coupons: {},
    //     };
    //   if (
    //     getAndValidateUser.userData.location &&
    //     getAndValidateUser.userData.location.length === 0
    //   )
    //     return {
    //       success: false,
    //       message: 'Address_Location_Not_Found',
    //       coupons: {},
    //     };

    //   !isEmpty(args.sortInput)
    //     ? args.sortInput
    //     : (args.sortInput = { distance: true });

    //   let filterCoupons = await dataSources.coupons.filterCoupons({
    //     filterInputs: args.filterInput,
    //     sortInput: args.sortInput,
    //     location: getAndValidateUser.userData.location,
    //     language: getAndValidateUser.userData.language,
    //   });
    //   const { nodes, edges, pageInfo, totalCount } = paginateData({
    //     data: filterCoupons,
    //     after: args.after,
    //     before: args.before,
    //     first: args.first,
    //     last: args.last,
    //   });

    //   return {
    //     success: true,
    //     message: 'Coupon_Filtered_Fuccessfully',
    //     coupons: {
    //       nodes,
    //       edges,
    //       pageInfo,
    //       totalCount,
    //     },
    //   };
    // },

    // wishlist: async (_, args, { user, dataSources }) => {
    //   const getAndValidateUser = await validateAndGetUser(
    //     user,
    //     dataSources,
    //     modelName,
    //   );
    //   if (!getAndValidateUser.success)
    //     return {
    //       success: false,
    //       message: getAndValidateUser.message,
    //       nodes: [],
    //       edges: [],
    //       pageInfo: null,
    //       totalCount: 0,
    //     };
    //   const getWishlist = await dataSources.customers.fetchCustomersWishlist(
    //     getAndValidateUser.userData._id,
    //   );
    //   if (!getWishlist.wishlist || getWishlist.wishlist.length === 0)
    //     return {
    //       success: false,
    //       message: 'Wishlist_Empty',
    //       nodes: [],
    //       edges: [],
    //       pageInfo: null,
    //       totalCount: 0,
    //     };
    //   const translateResult = await dataSources.coupons.translateCoupons({
    //     language: getAndValidateUser.userData.language,
    //     coupons: getWishlist.wishlist,
    //   });
    //   const { nodes, edges, pageInfo, totalCount } = paginateData({
    //     data: translateResult,
    //     after: args.after,
    //     before: args.before,
    //     first: args.first ? args.first : 10,
    //     last: args.last,
    //   });
    //   return {
    //     success: true,
    //     message: 'Wishlist_Fetched_Successfully',
    //     nodes,
    //     edges,
    //     pageInfo,
    //     totalCount,
    //   };
    // },
  },

  // Warning Fix: To be changed with best practices of defining type resolution for unions/interfaces
  Node: {
    __resolveType() {
      return null;
    },
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...appartmentResolvers.Mutation,
  },
};
