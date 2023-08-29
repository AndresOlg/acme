import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    advisor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Advisor',
        required: true,
    },
    commission_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Commission',
        required: true,
    },
});

const Sale = mongoose.model('Sale', saleSchema);

export default Sale;
