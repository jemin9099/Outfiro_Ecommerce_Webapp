const paypal = require("../config/paypal");
const Cart = require("../models/cart");
const orders = require("../models/orders");
const product = require("../models/product");
const createOrder = async (req, res) => {
  try {
    const userId = req.user.user._id;
    const {
      cartItems,
      cartId,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    } = req.body;

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5174/orderSuccess",
        cancel_url: "http://localhost:5174/checkout",
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price,
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: totalAmount.toFixed(2),
          },
          description: "This is the payment description.",
        },
      ],
    };

    paypal.payment.create(create_payment_json, async (error, payment) => {
      if (error) {
        res.status(500).json({
          success: false,
          message: error,
        });
      } else {
        const newOrder = new orders({
          userId,
          cartItems,
          cartId,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
        });
        await newOrder.save();
        
        const approvalURL = payment.links.find(
          (link) => link.rel === "approval_url"
        ).href;

        res.status(201).json({
          success: true,
          approvalURL: approvalURL,
          orderId: newOrder._id,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { orderId , paymentId , PayerID} = req.body;
    
    const order = await orders.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    order.paymentStatus = 'paid',
    order.orderStatus = 'confirmed',
    order.paymentId = paymentId,
    order.payerId = PayerID

    const getCartId = order.cartId

    order.cartItems.forEach(async (item) => {
      const products = await product.findById(item.productId)      
      products.stock = products.stock > 0 ? products.stock - item.quantity : 0
      await products.save()
    })

    await Cart.findByIdAndDelete(getCartId)
    await order.save()
    const capture_payment_json = {
      payer_id: PayerID,
      transactions: [
        {
          amount: {
            currency: "USD",
            total: order.totalAmount,
          },
        },
      ],
    }

    paypal.payment.execute(paymentId, capture_payment_json, async (error, payment) => {
      if (error) {
        res.status(500).json({
          success: false,
          message: error,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Payment captured successfully",
        });
      }
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const fetchOrders = async (req, res) => {
  try {
    const userId = req.user.user._id;
    const page = parseInt(req.query.page) || 1;  // Default to page 1
    const limit = parseInt(req.query.limit) || 5; // Default to 10 items per page
    const skip = (page - 1) * limit;

    let totalOrder
    if(req.query.isAdmin){
      totalOrder = await orders.countDocuments()
    }
    else{
      totalOrder = await orders.countDocuments({ userId })
    }
    const from = (skip + 1);
    let end = (skip + limit) 
    const to = end < totalOrder ? end : totalOrder

    let allOrder = [];
    if(req.query.isAdmin){
      allOrder = await orders.find().skip(skip).limit(limit).lean().exec();
    }
    else{
      allOrder = (await orders.find({ userId }).skip(skip).limit(limit).lean().exec());
    }
    res.status(200).json({  
      success: true,
      message: "Orders fetched successfully",
      data: allOrder,
      pagination: {
        total: totalOrder,
        currentPage: page,
        totalPages: Math.ceil(totalOrder / limit),
        perPage: limit,
        from:from,
        to:to
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { orderStatus } = req.body;
    const updatedOrder = await orders.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: updatedOrder,
    });
  } catch (error) { 
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
module.exports = { createOrder, capturePayment ,fetchOrders , updateOrderStatus};
