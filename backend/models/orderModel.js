import mongoose from "mongoose";
import moment from 'moment-timezone';

const orderSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    items: {type: Array, required: true},
    amount: {type: Number, required: true},
    address: {type: Object, required: true},
    status: {type: String, default: "Food Processing"},
    date: {
        type: Date,
        default: function() {
            return moment().tz('Asia/Bangkok').toDate();
        }
    },
    payment: {type: Boolean, default: false}
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;