import React from "react";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

const QuestionBox = styled(Box)`
    //width: 100%;
    width: 48rem;
    //max-width: 940px;
    height: 200px;
    border-radius: 20px;
    margin-top: 20px;
    background-color: #fff;
    padding: 28px 40px;
    text-align: left;
`;

const CategoryQuestionBox = ({ title }) => {
    const questions = [
        "질문 1: 취약 유형 문제 파악하기 위한 데이터 테이블 추천",
        "질문 2: 사용자별 문제 추천을 위해 참고하면 좋을 데이터 테이블 추천",
        "질문 3: 사용자별 문제 추천을 위해 참고하면 좋을 데이터 테이블 추천"
    ];

  return (
      <QuestionBox className="bg-white rounded-[20px] shadow">
          <div className="text-[#7E7E7E] text-lg font-semibold font-['Pretendard'] text-left">{title} 의 질문리스트</div>
          <ul className="mt-4">
              {questions.map((question, index) => (
                  <li key={index} className="text-[#7E7E7E] text-lg font-['Pretendard'] mt-2">{question}</li>
              ))}
          </ul>
      </QuestionBox>
  );
};
export default CategoryQuestionBox;
