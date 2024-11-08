import mongoose, { Document, Schema } from 'mongoose';

/**
 * 用户行为表
 */
interface IUserBehavior extends Document {
  id: string;
  articleId: string;
  type: string;
  value: number;
  date: Date;
}

/**
 * 这里说明一下 type
 * 1 代表阅读文章，其对应权重为 0.5
 * 2 代表点赞文章，其对应权重为 2
 * 3 代表评论文章，其对应权重为 1
 * 4 代表分享文章，其对应权重为 1.5
 * 5 代表收藏文章，其对应权重为 1.5
 * 6 代表阅读时间，要配合 value 字段，value 代表阅读时间，单位为秒
 */
const userBehaviorSchema: Schema = new Schema({
  id: { type: String, required: true },
  articleId: { type: String, required: true },
  type: { type: String, required: true },
  value: { type: Number, required: false },
  date: { type: Date, required: true },
});

const UserBehaviorModel = mongoose.model<IUserBehavior>('UserBehavior', userBehaviorSchema);

export default UserBehaviorModel;
