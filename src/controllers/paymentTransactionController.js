const mongoose = require("mongoose");
const PaymentTransaction = require("../models/PaymentTransactionModel");
const BalanceAccount = require("../models/balanceAccountModel");

// Helper to determine actor from request
const getActor = (req) => {
    if (req.admin) return { type: "Admin", id: req.admin._id };
    if (req.senior) return { type: "Senior", id: req.senior._id };
    if (req.master) return { type: "Master", id: req.master._id };
    if (req.agent) return { type: "Agent", id: req.agent._id };
    if (req.user) return { type: "User", id: req.user._id };
    return null;
};

const paymentTransactionController = {
    createTransaction: async (req, res) => {
        const actor = getActor(req);
        if (!actor) return res.status(401).json({ message: "Not authorized" });

        const { to, toModel, type, amount, remark = "" } = req.body;
        if (!to || !toModel || !type || !amount) return res.status(400).json({ message: "Missing required fields" });

        let from = actor.id;
        let fromModel = actor.type;
        let toId = to;
        let toModelFinal = toModel;

        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            // Read balances
            const fromInfo = await BalanceAccount.findOne({ owner: from, ownerModel: fromModel }).session(session);
            if (!fromInfo) throw new Error(`BalanceAccount not found for ${fromModel}`);

            const toInfo = await BalanceAccount.findOne({ owner: toId, ownerModel: toModelFinal }).session(session);
            if (!toInfo) throw new Error(`BalanceAccount not found for ${toModelFinal}`);

            let fromAfter;
            let toAfter;
            let fromBefore;
            let toBefore;
            // Calculate new balances
            if (type === "deposit") {
                fromBefore = Number(fromInfo.cashBalance || 0);
                fromAfter = fromBefore - amount;
                if (fromAfter < 0) throw new Error("Insufficient balance for deposit");

                toBefore = Number(toInfo.cashBalance || 0);
                toAfter = toBefore + amount;
            } else if (type === "withdraw") {
                toBefore = Number(toInfo.cashBalance || 0);
                toAfter = toBefore - amount;
                if (toAfter < 0) throw new Error("Insufficient balance for withdraw");

                fromBefore = Number(fromInfo.cashBalance || 0);
                fromAfter = fromBefore + amount;
            } else {
                throw new Error("Invalid transaction type");
            }

            // Update balances
            fromInfo.cashBalance = fromAfter;
            await fromInfo.save({ session });

            toInfo.cashBalance = toAfter;
            toInfo.accountBalance = toAfter;
            await toInfo.save({ session });

            // Record transaction (records from-side before/after)
            const transaction = new PaymentTransaction({
                from,
                fromModel,
                to: toId,
                toModel: toModelFinal,
                type,
                amount,
                beforeBalance: toBefore,
                afterBalance: toAfter,
                remark,
            });

            await transaction.save({ session });

            await session.commitTransaction();
            session.endSession();

            const populated = await PaymentTransaction.findById(transaction._id).populate("from").populate("to");

            return res.status(201).json({ message: "Transaction successful", transaction: populated });
        } catch (error) {
            try {
                await session.abortTransaction();
            } catch (e) {
                // ignore abort errors
            }
            session.endSession();
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    },
};

module.exports = paymentTransactionController;
