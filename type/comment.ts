export interface Reply {
  idFeedback: string;
  content: string;
  user_name: string;
  user_img: string;
}

interface IuserComment {
  userId: string;
  userName: string;
  userImg: string;
}

export interface IComment {
  productId: string;
  userComment: IuserComment;
  replies: Reply[];
  content: string;
  docId: string;
}
