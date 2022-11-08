import i18next, { t as i18t } from "i18next";
import { useTranslation } from "react-i18next";
import { useState, useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

import language from "./language-icon.png";
import logo from "./Logo.png";
import member from "./user-icon.png";
import friends from "./friends-icon.png";

interface Prop {
  img?: string;
  size?: string;
  borderBtm?: string;
}

const laguages = [
  { code: "en", name: "English", country_code: "GB" },
  { code: "fr", name: "Français", country_code: "FR" },
  { code: "zh", name: "中文", country_code: "TW" },
  { code: "ja", name: "日本語", country_code: "JP" },
];

const Wrapper = styled.div`
  padding: 0 30px;
  width: 100vw;
  height: 80px;
  color: #c4c4c4;
  background-color: #3c3c3c;
  position: fixed;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(Link)`
  width: 155px;
  height: 45px;
  background-image: url(${logo});
  &:hover {
    cursor: pointer;
  }
`;

const Context = styled(Link)`
  margin-left: 30px;
  font-size: 20px;
  text-decoration: none;
  color: #c4c4c4;
`;

const RightContainer = styled.div`
  display: flex;
`;

const Icon = styled.div`
  height: 35px;
  width: 35px;
  position: relative;
  background-image: ${(props: Prop) => props.img};
  background-size: cover;
  background-position: center;
  & + & {
    margin-left: 20px;
  }
  &:hover {
    cursor: pointer;
  }
`;

const LanguageOptionsContainer = styled.div`
  width: 110px;
  padding: 10px;
  position: absolute;
  top: 37px;
  right: 0;
  border: 1px solid #787878;
  background-color: white;
  z-index: 1;
`;

const Language = styled.div`
  font-size: ${(props: Prop) => props.size};
  color: #3c3c3c;
  border-bottom: ${(props: Prop) => props.borderBtm};
  text-align: center;
  & + & {
    margin-top: 16px;
  }
`;

const SignBtn = styled.button`
  margin-left: 20px;
  padding: 0 20px;
  height: 35px;
  color: #ffffff;
  font-size: 18px;
  background-color: transparent;
  border: 1px solid #616161;
  border-radius: 5px;
  &:hover {
    box-shadow: 1px 1px 5px #616161;
    cursor: pointer;
  }
`;

function LanguageOptions() {
  return (
    <LanguageOptionsContainer>
      <Language size="16px" borderBtm="1px solid #3c3c3c">
        {i18t("languages")}
      </Language>
      {laguages.map((lng) => (
        <Language
          key={`${lng.code}`}
          size="14px"
          onClick={() => {
            i18next.changeLanguage(lng.code);
          }}
        >
          {lng.name}
        </Language>
      ))}
    </LanguageOptionsContainer>
  );
}

function Header() {
  const { avatar, isLogin, logout } = useContext(AuthContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showLanghagesIcon, setShowLanguagesIcon] = useState(false);
  return (
    <Wrapper>
      <LeftContainer>
        <Logo to="portfolioBricks" />
        <Context to="createNewProject">{t("create")}</Context>
        <Context to="favoriteList">{t("favorite_list")}</Context>
      </LeftContainer>
      <RightContainer>
        {isLogin ? (
          <>
            <Icon
              img={`url(${friends})`}
              onClick={() => {
                navigate("/friendList");
              }}
            />
            <Icon
              img={avatar ? `url(${avatar})` : `url(${member})`}
              onClick={() => {
                navigate("/portfile");
              }}
            />
          </>
        ) : (
          ""
        )}

        <Icon
          img={`url(${language})`}
          onClick={() => {
            setShowLanguagesIcon((prev) => !prev);
          }}
        >
          {showLanghagesIcon ? <LanguageOptions /> : ""}
        </Icon>
        {isLogin ? (
          <SignBtn
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            {t("logout")}
          </SignBtn>
        ) : (
          <SignBtn
            onClick={() => {
              navigate("/login");
            }}
          >
            {t("login")}
          </SignBtn>
        )}
      </RightContainer>
    </Wrapper>
  );
}

export default Header;
