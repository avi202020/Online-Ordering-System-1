const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const OrderModel = require('../models/OrderSchema');

// ==============================================
// @desc      Place New Order
// @route     POST /order/
// @access    Public
// ==============================================
exports.placeorder = asyncHandler(async (req,res, next) => {
    // Add user to req,body
    // console.log(req)
  req.body.user = req.user.id;

  const newOrder = await OrderModel.create(req.body);

  res.status(200).json({
    success: true,
    data: newOrder.id
  });
})

// @desc      Get orders
// @route     GET /order?shipppingStatus=Unshipped&sort=totalPrice
// req.query === axios.params
// @access    Public
exports.getordersByUserID = asyncHandler(async (req, res, next) => {
  let queryOrders;

  // console.log(req.query);


  // get query
  let reqQuery = {...req.query}

  // Fields to exclude
  const removeFields = ['sort'];

  // Loop over removeFields and delete unneeded fields from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);
  
  // add User ID to the query
  reqQuery.user = req.user.id

  if (reqQuery.shippingStatus !== "") {
    reqQuery.shippingStatus = req.query.shippingStatus.split(',')    
  } else {
    delete reqQuery['shippingStatus']
  }


  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // const removeFields
  queryOrders = OrderModel.find(JSON.parse(queryStr))


  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort;
    queryOrders = queryOrders.sort(sortBy);
  } else {
    queryOrders = queryOrders.sort('receiverFirstName');
  }

  const ordersByUserId = await queryOrders;

  if (!ordersByUserId) {
    return next(
      new ErrorResponse(`Orders not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: ordersByUserId})
});