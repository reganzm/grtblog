import UserBehavior from '../models/userBehaviorModel';

export const addUserBehavior = async (userBehaviorData: any) => {
  const userBehavior = new UserBehavior(userBehaviorData);
  userBehavior.set('date', new Date());
  // 这里如果是阅读时间，需要不断累加
  if (userBehaviorData.type === '6') {
    const userBehaviorList = await UserBehavior.find({
      id: userBehaviorData.id,
      articleId: userBehaviorData.articleId,
      type: '6',
    });
    if (userBehaviorList.length === 0) {
      return await userBehavior.save();
    }
    const totalReadTime = userBehaviorList.reduce((acc, cur) => acc + cur.value, 0);
    // 如果超过 300 秒，就不再累加
    if (totalReadTime >= 300) {
      return userBehavior;
    }
  }
  return await userBehavior.save();
};
