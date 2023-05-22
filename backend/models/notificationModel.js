import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
        required: true
      },
      likedBy: {
        type: String,
        required: true
      },
}, { timestamps: true });

const notificationModel = mongoose.model("notification", notificationSchema);

export default notificationModel;