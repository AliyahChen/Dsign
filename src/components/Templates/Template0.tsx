import styled from "styled-components";
import { t } from "i18next";
import { useState } from "react";
import miho1 from "../miho1.jpg";
import miho2 from "../miho2.jpg";

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
  background-image: url(${miho1});
  background-size: cover;
  background-position: center;
  opacity: 0.7;
`;

const MiddleContainer = styled.div`
  padding: 100px 80px 50px 30px;
  width: 450px;
  height: 100%;
  position: absolute;
  left: 300px;
  background-color: #616161;
  opacity: 0.9;
  box-shadow: 1px 0 3px #616161, -1px 0 3px #616161;
`;

const Context = styled.textarea`
  padding: 10px;
  height: 100%;
  width: 100%;
  color: #ffffff;
  font-size: 24px;
  line-height: 30px;
  background-color: transparent;
  border: ${(props: Prop) => props.border};
  &::placeholder {
    color: #b4b4b4;
  }
`;

const RightPhoto = styled.div`
  height: 85%;
  width: 450px;
  background-image: url(${miho2});
  background-size: cover;
  background-position: center;
  position: absolute;
  right: 50px;
  z-index: 1;
  box-shadow: 0 0 5px #3c3c3c;
`;

function Template0() {
  const [inputText, setInputText] = useState("");
  return (
    <Wrapper>
      <BackgroundImg />
      <MiddleContainer>
        <Context
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          border={inputText === "" ? "1px solid #b4b4b4" : "none"}
          placeholder={t("type_content")}
        />
      </MiddleContainer>
      <RightPhoto />
    </Wrapper>
  );
}

export default Template0;
