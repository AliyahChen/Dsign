import { useState } from "react";
import styled from "styled-components";
import { t } from "i18next";

import trapezoid from "./template2_trapezoid.png";
import church1 from "../church1.jpg";
import church2 from "../church2.jpg";
import church3 from "../church3.jpg";

interface Prop {
  border?: string;
}

const Wrapper = styled.div`
  margin: 0 auto;
  width: 1200px;
  height: 760px;
  position: relative;
  display: flex;
  align-items: center;
`;

const BackgroundImg = styled.div`
  width: 1200px;
  height: 760px;
  background-image: url(${church1});
  background-size: cover;
  background-position: center;
  opacity: 0.9;
`;

const Trapezoid = styled.div`
  height: 100%;
  width: 496px;
  position: absolute;
  right: 0;
  opacity: 0.8;
  background-image: url(${trapezoid});
  background-size: cover;
  background-position: center;
`;

const Context = styled.textarea`
  padding: 10px;
  height: 180px;
  width: 270px;
  color: #ffffff;
  font-size: 24px;
  line-height: 30px;
  position: absolute;
  right: 50px;
  bottom: 280px;
  background-color: transparent;
  border: ${(props: Prop) => props.border};
  &::placeholder {
    color: #b4b4b4;
  }
`;

const ImgContainer = styled.div`
  position: absolute;
  right: 50px;
  bottom: 50px;
  display: flex;
`;

const LeftImg = styled.div`
  height: 200px;
  width: 300px;
  background-image: url(${church2});
  background-size: cover;
  background-position: center;
  box-shadow: 0 0 5px #3c3c3c;
`;

const RightImg = styled.div`
  margin-left: 30px;
  height: 200px;
  width: 200px;
  background-image: url(${church3});
  background-size: cover;
  background-position: center;
  box-shadow: 0 0 5px #3c3c3c;
`;

function Template1() {
  const [inputText, setInputText] = useState("");
  return (
    <Wrapper>
      <BackgroundImg />
      <Trapezoid />
      <Context
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        border={inputText === "" ? "1px solid #b4b4b4" : "none"}
        placeholder={t("type_content")}
      />
      <ImgContainer>
        <LeftImg />
        <RightImg />
      </ImgContainer>
    </Wrapper>
  );
}

export default Template1;
