import { Request, Response } from 'express';
import * as userBehaviorService from '../services/userBehaviorService';
import { success, error } from '../utils/responseUtil';

export const addUserBehavior = async (req: Request, res: Response): Promise<void> => {
  try {
    const userBehavior = await userBehaviorService.addUserBehavior(req.body);
    res.status(200).json(success(userBehavior));
  } catch (err: any) {
    res.status(200).json(error(500, err.message));
  }
};
