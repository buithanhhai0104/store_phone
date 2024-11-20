import React, { useCallback, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import EvaluateItem from "./EvaluateItem";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import { addEvalute, getEvalute } from "../../service/evaluate";

interface EvaluateProps {
  id: string;
  model: string;
}

interface IuserEvaluate {
  user_name: string;
  user_img: string;
  userId: number;
}

interface IEvaluate {
  id: string;
  userEvaluate: IuserEvaluate;
  rating: number;
  comment: string;
  model: string;
  content: string;
}

const Evaluate: React.FC<EvaluateProps> = ({ id, model }) => {
  const [evaluateData, setEvaluateData] = useState<IEvaluate[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [valueEvaluate, setValueEvaluate] = useState<string>("");
  const [selectReview, setSelectReview] = useState<number>(0);
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();
  const listStar = [
    { star: 1 },
    { star: 2 },
    { star: 3 },
    { star: 4 },
    { star: 5 },
  ];

  const fetchEvaluate = useCallback(async () => {
    try {
      const evaluateData = await getEvalute(id);
      if (evaluateData) {
        setEvaluateData(evaluateData);
      }
    } catch (error) {
      console.error("Không thể tải bình luận:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchEvaluate();
  }, [fetchEvaluate]);

  const calculateAverageRating = useCallback(() => {
    if (evaluateData.length === 0) return 0;
    const totalRating = evaluateData.reduce(
      (sum, evaluate) => sum + evaluate.rating,
      0
    );
    return totalRating / evaluateData.length;
  }, [evaluateData]);

  useEffect(() => {
    setAverageRating(calculateAverageRating());
  }, [calculateAverageRating]);

  const handleAddEvaluate = async () => {
    if (selectReview === 0 || valueEvaluate === "") {
      alert("vui lòng nhập số sao và nội dung đánh giá");
      return;
    }
    const cursorEvaluate = {
      content: valueEvaluate,
      userEvaluate: {
        user_name: user?.user_name,
        user_img: user?.user_img,
        userId: user?.id,
      },
      rating: selectReview,
      productId: id,
    };
    try {
      await addEvalute(cursorEvaluate);
      setAverageRating(0);
      setSelectReview(0);
      setValueEvaluate("");
      fetchEvaluate();
    } catch (error) {
      console.error("Không thể thêm đánh giá:", error);
    }
  };

  const handlecheckUser = () => {
    if (!user) {
      alert("Vui lòng đăng nhập để hỏi đáp");
      navigate(config.routes.login);
    }
  };

  return (
    <div className="flex flex-col flex-1 gap-[10px]  bg-custom-gradient rounded-xl p-[10px]  ">
      <div className="flex flex-col bg-white w-[95%] m-auto p-[10px]  h-[200px] mt-[20px] rounded-xl  shadow-product">
        <b className="text-[20px] p-[5px]">Đánh giá & nhận xét {model}</b>
        <div className="flex w-full justify-between p-[10px]">
          <div className="flex flex-col justify-center items-center border-r-[1px] flex-1 border-r-slate-500">
            <p className="text-[24px]">{averageRating.toFixed(1)}/5</p>
            <div className="flex gap-[10px] py-[10px]">
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} className="text-yellow-300" />
              ))}
            </div>
            <p>{evaluateData.length} đánh giá</p>
          </div>
          <div className="w-[60%]">
            {listStar.map((item) => {
              const numberOfRatings = evaluateData.filter(
                (e) => e.rating === item.star
              ).length;
              return (
                <div
                  key={item.star}
                  className="flex justify-center items-center gap-[10px]"
                >
                  <div className="flex justify-center items-center">
                    <p>{item.star}</p>
                    <FaStar className="text-yellow-300" />
                  </div>
                  <div className="max-w-[75%] w-[60%] h-[8px] rounded-2xl bg-red-700"></div>
                  <div>{numberOfRatings} đánh giá</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className=" flex flex-col   ">
        <div className=" relative w-[90%] m-auto  rounded-xl">
          <textarea
            onClick={handlecheckUser}
            value={valueEvaluate || ""}
            onChange={(e) => setValueEvaluate(e.target.value)}
            className="border-[1px] bg-[#2f3033] rounded-xl p-[10px] shadow-indigo-50 text-white"
            placeholder="Nhập văn bản không giới hạn và tự động xuống dòng"
            rows={4}
            style={{ width: "100%", resize: "none" }}
          />
          <div
            onClick={handleAddEvaluate}
            className="flex absolute bottom-5 right-4 justify-end items-center gap-[3px] text-red-600 font-semibold cursor-pointer"
          >
            Gửi
          </div>
          <div className="flex gap-[5px] absolute bottom-[20%] left-5 text-[30px] cursor-pointer">
            {listStar.map((item, index) => {
              const starIndex = index + 1;
              return (
                <button
                  key={index}
                  value={item.star}
                  onClick={() => setSelectReview(item.star)}
                >
                  <FaStar
                    className={
                      starIndex <= selectReview
                        ? `text-yellow-300`
                        : "text-gray-400"
                    }
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <EvaluateItem evaluateData={evaluateData} />
    </div>
  );
};

export default Evaluate;
