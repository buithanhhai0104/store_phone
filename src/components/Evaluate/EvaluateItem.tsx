import React, { memo } from "react";
import { FaStar } from "react-icons/fa";

interface IuserEvaluate {
  user_name: string;
  user_img: string;
  userId: number;
}

interface IEvaluateItemsProps {
  evaluateData: {
    id: string;
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
      {evaluateData.map((item, index) => {
        return (
          <div key={index} className="bg-white border-b-[1px] p-[10px] ">
            <div className="flex items-center gap-[20px]">
              <div className="flex items-center gap-[5px]">
                <img
                  className="h-[40px] w-[40px] rounded-full"
                  src={item.userEvaluate.user_img}
                  alt={item.userEvaluate.user_name}
                />
                <p>{item.userEvaluate.user_name}</p>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, index) => {
                  const star = index;
                  return (
                    <div key={index}>
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
