import { model, Schema } from "mongoose";

const paymentSchema = new Schema({
    razorpay_payment_id: {
        type: String,
        required: true
    },
    razorpay_subscription_id: {
        type: String,
        required: true
    },
    razorpay_signture: {
        type: String,
        required: String
    }
});

const Payment = model('Payment', paymentSchema);

export default Payment;