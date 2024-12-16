import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order for frontend
const placeOrder = async (req, res) => {
	
	const frontend_url = "https://agri-mart-bc58d.web.app/";

	try{
		const newOrder = new orderModel({
			userId:req.body.userId,
			items:req.body.items,
			amount:req.body.amount,
			address:req.body.address
		})
		await newOrder.save();
		await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}});

		const line_items = req.body.items.map((item)=>({
			price_data:{
				currency: "thb",
				product_data:{
					name:item.name
				},
				unit_amount:item.price*100
			},
			quantity:item.quantity
		}))

		line_items.push({
			price_data:{
				currency: "thb",
				product_data:{
					name:"Delivery Charge"
				},
				unit_amount:2*100
			},
			quantity:1
		})

		const session = await stripe.checkout.sessions.create({
			line_items: line_items,
			mode: "payment",
			success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
			cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
		})

		res.json({success:true,session_url: session.url})

	}catch (error){
		console.log(error);
		res.json({success:false,message:"Error"})
	}


}
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}
const userOrders = async (req, res) => {
    try {
        const userId = req.body.userId;
        const orders = await orderModel.find({ userId: userId });
        
        res.json({
            success: true,
            data: orders
        });
    } catch (error) {
        res.json({
            success: false,
            message: "Error fetching orders"
        });
    }
}
//Listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().sort({ date: -1 });
        res.json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.error("List orders error:", error);
        res.json({
            success: false,
            message: "Error fetching orders"
        });
    }
}
// api for updating order status
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.json({
                success: false,
                message: "Order not found"
            });
        }

        await orderModel.findByIdAndUpdate(orderId, { status });
        
        res.json({
            success: true,
            message: "Order status updated"
        });
    } catch (error) {
        console.error("Update order status error:", error);
        res.json({
            success: false,
            message: "Error updating order status"
        });
    }
}

const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        
        // ตรวจสอบว่ามีออเดอร์นี้หรือไม่
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.json({
                success: false,
                message: "Order not found"
            });
        }

        // ลบออเดอร์
        await orderModel.findByIdAndDelete(orderId);
        
        res.json({
            success: true,
            message: "Order deleted successfully"
        });
    } catch (error) {
        console.error("Delete order error:", error);
        res.json({
            success: false,
            message: "Error deleting order"
        });
    }
};

export {
    placeOrder,
    verifyOrder,
    userOrders,
    listOrders,
    updateOrderStatus,
    deleteOrder
}