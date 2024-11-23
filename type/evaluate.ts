interface IuserEvaluate {
  user_name: string;
  user_img: string;
  userId: number;
}

export interface IEvaluate {
  id: string;
  userEvaluate: IuserEvaluate;
  rating: number;
  comment: string;
  model: string;
  content: string;
}
