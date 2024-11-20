import React, { memo } from "react";
import { TiMessages } from "react-icons/ti";

interface IuserComment {
  userId: string;
  userImg: string;
  userName: string;
}

interface IBoxCommentProps {
  user: any;
  handleAddFeedback: (id: string) => void;
  valuefeedback: Record<string, string>;
  setFeedbacks: (docId: string, value: string) => void;
  dataComment: {
    productId: string;
    content: string;
    userComment: IuserComment;
    replies: {
      idFeedback: string;
      content: string;
      user_name: string;
      user_img: string;
    }[];
    docId: string;
  }[];
}

const BoxComment: React.FC<IBoxCommentProps> = ({
  dataComment,
  handleAddFeedback,
  valuefeedback,
  setFeedbacks,
  user,
}) => {
  const handleFeedback = () => {
    if (!user) {
      alert("Vui lòng đăng nhập");
      return;
    }
  };
  return (
    <>
      {dataComment.map((item) => (
        <div
          className="mt-[20px] border-[1px] p-[10px] shadow-product rounded-xl"
          key={item.docId}
        >
          <div className="p-[10px pb-[20px]">
            <div>
              <div className="flex gap-[5px] items-center mb-[10px]">
                <img
                  className="w-[35px] h-[35px] rounded-full"
                  src={item.userComment.userImg}
                  alt={item.userComment.userName}
                />
                <p className="text-[18px] ml-1 font-medium">
                  {item.userComment.userName}
                </p>
              </div>
              <div className="w-[90%] m-auto bg-[#2f3033] text-white p-[10px] rounded-xl">
                <div>{item.content}</div>
                <div
                  onClick={handleFeedback}
                  className="flex justify-end items-center gap-[3px] text-red-600 font-semibold cursor-pointer"
                >
                  <TiMessages />
                  Trả lời
                </div>
              </div>
            </div>
            <div className="ml-[10%] mt-4 flex flex-col gap-[15px]">
              {item.replies &&
                item.replies.map((reply) => (
                  <div key={reply.idFeedback}>
                    <div className="flex gap-[5px] items-center mb-[10px]">
                      <img
                        className="w-[35px] h-[35px] rounded-full"
                        src={reply.user_img}
                        alt={reply.user_name}
                      />
                      <p className="text-[18px] ml-1 font-medium">
                        {reply.user_name}
                      </p>
                    </div>
                    <div className="w-[85%] m-auto ml-[10%] bg-[#2f3033] text-white p-[10px] rounded-xl">
                      {reply.content}
                    </div>
                  </div>
                ))}
              <div className="w-full mt-5 relative">
                <b className="text-[#ffff] p-[5px] mb-[5px] inline-block">
                  Phản hồi:
                </b>
                <textarea
                  value={valuefeedback[item.docId] || ""}
                  onChange={(e) => setFeedbacks(item.docId, e.target.value)}
                  className="border-0 h-[60px] rounded-xl p-[10px] shadow-inner"
                  placeholder="Nhập văn bản phản hồi"
                  rows={4}
                  style={{ width: "100%", resize: "none" }}
                />
                <div
                  onClick={() => handleAddFeedback(item.docId)}
                  className="flex absolute bottom-5 right-4 justify-end items-center gap-[3px] text-red-600 font-semibold cursor-pointer"
                >
                  <TiMessages />
                  Gửi
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default memo(BoxComment);
