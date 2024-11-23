import React, { useEffect, useState, useCallback } from "react";
import { IoIosSend } from "react-icons/io";
import BoxComment from "./BoxComment";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import { addComment, getComment, updateComment } from "../../service/comment";
import { v4 as uuidv4 } from "uuid";
import { IComment, Reply } from "../../../type/comment";

interface ICommentProps {
  id: string;
}

const Comments: React.FC<ICommentProps> = ({ id }) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [valueComment, setValueComment] = useState<string>("");
  const [feedbacks, setFeedbacks] = useState<Record<string, string>>({});
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();

  const fetchComments = useCallback(async () => {
    try {
      if (id) {
        const commentData = await getComment(id);
        setComments(commentData || []);
      }
    } catch (error) {
      console.error("Không thể tải bình luận:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // Thêm bình luận mới
  const handleAddComment = async () => {
    if (!user) {
      alert("Vui lòng đăng nhập để bình luận!");
      navigate(config.routes.login);
      return;
    }
    if (valueComment.trim() === "" || !id) return;

    const commentData: Partial<IComment> = {
      productId: id,
      userComment: {
        userId: user.id,
        userName: user.user_name,
        userImg: user.user_img,
      },
      content: valueComment,
    };

    try {
      await addComment(commentData);
      setValueComment("");
      fetchComments();
    } catch (error) {
      console.error("Không thể thêm bình luận:", error);
    }
  };

  const handleAddFeedback = async (docId: string) => {
    if (!user) {
      alert("Vui lòng đăng nhập để phản hồi!");
      navigate(config.routes.login);
      return;
    }
    const feedbackContent = feedbacks[docId]?.trim();
    if (!feedbackContent) return;

    const newFeedback: Reply = {
      idFeedback: uuidv4(),
      content: feedbackContent,
      user_name: user.user_name,
      user_img: user.user_img,
    };

    try {
      await updateComment(docId, newFeedback);
      setFeedbacks((prev) => ({ ...prev, [docId]: "" }));
      fetchComments();
    } catch (error) {
      console.error("Không thể thêm phản hồi:", error);
    }
  };

  const handleFeedbackChange = (docId: string, value: string) => {
    setFeedbacks((prev) => ({ ...prev, [docId]: value }));
  };

  const handleClickComment = () => {
    if (!user) {
      alert("Vui lòng đăng nhập để hỏi đáp");
      navigate(config.routes.login);
    }
  };

  return (
    <div className="flex-flex-col  flex-1 bg-custom-gradient rounded-xl p-[10px]">
      <b className="text-[24px] mb-2">Hỏi và đáp</b>
      <div className="flex w-[85%] my-0 m-auto relative gap-[10px] justify-center items-center">
        <div className="flex p-[10px] bg-custom-gradient shadow-product rounded-lg mt-1 flex-1 border-[1px]">
          <img
            className="pr-[10px]"
            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:55:0/q:90/plain/https://cellphones.com.vn/media/wysiwyg/chibi2.png"
            alt="User"
          />
          <textarea
            value={valueComment}
            onClick={handleClickComment}
            onChange={(e) => setValueComment(e.target.value)}
            className="border-0 bg-[#2f3033] rounded-xl p-[10px] shadow-inner text-white"
            placeholder="Nhập văn bản không giới hạn và tự động xuống dòng"
            rows={4}
            style={{ width: "90%", resize: "none" }}
          />
        </div>
        <button
          onClick={handleAddComment}
          className="flex absolute bottom-[15%] right-[5%] h-[40px] justify-center items-center gap-[1px] p-[10px] bg-red-500 text-white rounded-xl"
        >
          <IoIosSend />
          <p>Gửi</p>
        </button>
      </div>
      <BoxComment
        dataComment={comments}
        handleAddFeedback={handleAddFeedback}
        valuefeedback={feedbacks}
        setFeedbacks={handleFeedbackChange}
        user={user || undefined}
      />
    </div>
  );
};

export default Comments;
