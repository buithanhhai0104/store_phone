import React, { memo } from "react";
import { FaStar } from "react-icons/fa";

interface IuserEvaluate {
  userName: string;
  userImg: string;
  userId: number;
  admin: boolean;
}

interface IEvaluateItemsProps {
  evaluateData: {
    id: number;
    userEvaluate: IuserEvaluate;
    rating: number;
    comment: string;
    model: string;
    content: string;
  }[];
}
const EvaluateItem: React.FC<IEvaluateItemsProps> = ({ evaluateData }) => {
  return (
    <div className="flex flex-col bg-white  rounded-xl w-[100%] m-auto">
      {evaluateData.map((item) => {
        return (
          <div className="bg-white border-b-[1px] p-[10px] ">
            <div className="flex items-center gap-[20px]">
              <div className="flex items-center gap-[5px]">
                <img
                  className="h-[40px] w-[40px] rounded-full"
                  src={item.userEvaluate.userImg}
                  alt={item.userEvaluate.userName}
                />
                <p>{item.userEvaluate.userName}</p>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, index) => {
                  const star = index;
                  return (
                    <div>
                      <FaStar
                        className={
                          item.rating <= star
                            ? "text-gray-400"
                            : "text-yellow-300"
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="">
              <p>{item.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(EvaluateItem);
