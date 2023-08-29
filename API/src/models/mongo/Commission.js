import mongoose from 'mongoose';

const commissions = new mongoose.Schema({
    sales_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sale',
        required: true,
    },
    advisor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sale',
        required: true,
    },
    commission_amount: {
        type: Number,
        required: true
    }
});

const Commission = mongoose.model('Commission', commissions);

export default Commission;
