import React, { useState } from "react";
import { TiMessages } from "react-icons/ti";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

interface IuserComment {
  userId: string;
  userImg: string;
  userName: string;
  admin: boolean;
}

interface IBoxCommentProps {
  handleAddFeedback: (id: number) => void;
  valuefeedback: string;
  setFeedbacks: (value: string) => void;
  dataComment: {
    productId: string;
    content: string;
    userComment: IuserComment;
    replies: {
      content: string;
      img: string;
      name: string;
    }[];
    id: number;
  }[];
}

const BoxComment: React.FC<IBoxCommentProps> = ({
  dataComment,
  handleAddFeedback,
  valuefeedback,
  setFeedbacks,
}) => {
  const user = useSelector((state: RootState) => state.user.user);

  const [showInputFeedback, setShowInputFeedback] = useState<boolean>(false);

  const handleFeedback = () => {
    if (!user) {
      alert("Vui lòng đăng nhập");
      return;
    }
    if (!user.admin) {
      alert("QTV mới có thể trả lời");
      return;
    }
    setShowInputFeedback(true);
  };

  return (
    <>
      {dataComment.map((item) => (
        <div
          className="mt-[20px] border-[1px] p-[10px] shadow-product rounded-xl"
          key={item.id}
        >
          <div className="p-[10px pb-[20px]  ">
            <div>
              <div className="flex gap-[5px] items-center mb-[10px]">
                <img
                  className="w-[35px] h-[35px] rounded-full"
                  src={item.userComment.userImg}
                  alt={item.userComment.userName}
                />
                <p className="text-[18px] ml-1 font-medium ">
                  {item.userComment.userName}
                  {item.userComment.admin ? (
                    <b className="text-red-500 text-[14px]"> QTV</b>
                  ) : null}
                </p>
              </div>
              <div className="w-[90%] m-auto  bg-[#2f3033] text-white p-[10px] rounded-xl ">
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

            {item.replies && item.replies.length > 0 && (
              <div className="ml-[10%] mt-2">
                {item.replies.map((reply, index) => (
                  <div>
                    <div key={index}>
                      <div className="flex gap-[5px] items-center mb-[10px]">
                        <img
                          className="w-[35px] h-[35px] rounded-full"
                          src={reply.img}
                          alt={reply.name}
                        />
                        <p className="text-[18px] ml-1 font-medium">
                          {reply.name}
                          <b className="text-red-500 text-[14px]"> QTV</b>
                        </p>
                      </div>
                    </div>
                    <div className="w-[85%] m-auto ml-[10%] bg-[#2f3033] text-white p-[10px] rounded-xl ">
                      {reply.content}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showInputFeedback ? (
              <div className="w-full mt-10 relative">
                <textarea
                  value={valuefeedback || ""}
                  onChange={(e) => setFeedbacks(e.target.value)}
                  className="border-0 h-[60px] bg-[#2f3033] rounded-xl p-[10px] shadow-inner text-white"
                  placeholder="Nhập văn bản không giới hạn và tự động xuống dòng"
                  rows={4}
                  style={{ width: "100%", resize: "none" }}
                />
                <div
                  onClick={() => handleAddFeedback(item.id)}
                  className="flex absolute bottom-5 right-4 justify-end items-center gap-[3px] text-red-600 font-semibold cursor-pointer"
                >
                  <TiMessages />
                  Gửi
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </>
  );
};

export default BoxComment;
