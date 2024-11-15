import React, { useEffect, useState, useCallback } from "react";
import { IoIosSend } from "react-icons/io";
import BoxComment from "./BoxComment/BoxComment";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface ICommentProps {
  model: string | undefined;
}

interface Reply {
  content: string;
  img: string;
  name: string;
}

interface IuserComment {
  userId: string;
  userName: string;
  userImg: string;
  admin: boolean;
}

interface Comment {
  id: number;
  productId: string;
  userComment: IuserComment;
  replies: Reply[];
  content: string;
}

const Comments: React.FC<ICommentProps> = ({ model }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [feedbacks, setFeedbacks] = useState<string>("");
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  // Hàm render bình luận
  const fetchComments = useCallback(async () => {
    try {
      if (model) {
        const response = await fetch(
          `http://localhost:3001/comments?productId=${model}`
        );
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error("Không thể tải bình luận:", error);
    }
  }, [model]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleAddComment = async () => {
    if (user) {
      if (newComment.trim() === "" || !model) return;

      const commentData = {
        productId: model,
        userComment: {
          userId: user.id,
          userName: user.username,
          userImg: user.img,
          admin: user.admin,
        },
        content: newComment,
      };

      try {
        await fetch(`http://localhost:3001/comments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(commentData),
        });
        setNewComment("");
        // Gọi lại fetchComments để cập nhật danh sách bình luận
        fetchComments();
      } catch (error) {
        console.error("Không thể thêm bình luận:", error);
      }
    }
  };

  const handleAddFeedback = async (id: number) => {
    if (feedbacks) {
      try {
        await fetch(`http://localhost:3001/comments/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            replies: [
              ...(comments.find((item) => item.id === id)?.replies || []),
              {
                content: feedbacks,
                name: user?.username,
                img: user?.img,
              },
            ],
          }),
        });
        setFeedbacks("");
        fetchComments(); // Gọi lại hàm fetch để cập nhật bình luận
      } catch (error) {
        console.error("Không thể thêm phản hồi:", error);
      }
    }
  };

  const handleClickComment = () => {
    if (!user) {
      alert("Vui lòng đăng nhập để hỏi đáp");
      navigate(config.routes.login);
    }
  };

  return (
    <div className="flex-flex-col  flex-1 bg-custom-gradient  mt-[20px] rounded-xl p-[10px] ">
      <b className="text-[24px] mb-2">Hỏi và đáp</b>
      <div className="flex  w-[85%] my-0 m-auto relative gap-[10px] justify-center items-center">
        <div className="flex p-[10px]  bg-custom-gradient shadow-product rounded-lg mt-1 flex-1 border-[1px]">
          <img
            className="pr-[10px]"
            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:55:0/q:90/plain/https://cellphones.com.vn/media/wysiwyg/chibi2.png"
            alt=""
          />
          <textarea
            value={newComment}
            onClick={handleClickComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="border-0 bg-[#2f3033] rounded-xl p-[10px] shadow-inner text-white"
            placeholder="Nhập văn bản không giới hạn và tự động xuống dòng"
            rows={4}
            style={{ width: "90%", resize: "none" }}
          />
        </div>
        <button
          onClick={handleAddComment}
          className="flex absolute bottom-[15%] right-[5%]  h-[40px] justify-center items-center gap-[1px] p-[10px] bg-red-500 text-white rounded-xl"
        >
          <IoIosSend />
          <p>Gửi</p>
        </button>
      </div>
      <BoxComment
        dataComment={comments || []}
        handleAddFeedback={handleAddFeedback}
        valuefeedback={feedbacks}
        setFeedbacks={setFeedbacks}
      />
    </div>
  );
};

export default Comments;
