import React from "react";
import Modal from "react-modal";
import KakaoLogo from "../../assets/img/header/KakaoLogo.png";
import GithubLogo from "../../assets/img/header/GithubLogo.png";
import GoogleLogo from "../../assets/img/header/GoogleLogo.png";

// 모달 스타일 설정
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "320px",
    height: "410px",
    backgroundColor: "#f0f0f0",
    border: "4px solid black",
    overflow: "hidden",
  },
};

const handleOAuth2Login = (clientRegistration) => {
  window.location.href = `${process.env.REACT_APP_API_URL}/oauth2/authorization/${clientRegistration}`;
};

// SignupModal 컴포넌트 정의
function SignupModal({ isOpen, onRequestClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Signup Modal"
    >
      <h2
        style={{
          fontFamily: "Arial", // 폰트 변경
          fontWeight: "bold", // 굵은 글씨체
          fontSize: "24px", // 글씨 크기
          textAlign: "center",
          margin: "20px 0",
          color: "#333", // 글씨 색상
        }}
      >
        Login with
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <button
          onClick={() => handleOAuth2Login("kakao")}
          style={{
            width: "280px",
            height: "70px",
            fontSize: "16px",
            border: "2px solid #333",
            borderRadius: "15px",
            padding: 0,
            backgroundColor: "transparent",
          }}
        >
          <img
            src={KakaoLogo}
            alt="Kakao login"
            style={{ width: "100%", height: "100%" }}
          />
        </button>
        <div style={{ width: "100%", textAlign: "center", margin: "10px 0" }}>
          <hr
            style={{
              width: "85%",
              height: "3px",
              backgroundColor: "#333",
              border: "none",
              margin: "auto",
            }}
          />
          <span
            style={{
              position: "relative",
              top: "-14px",
              background: "#f0f0f0",
              padding: "0 10px",
              color: "#333", // or 텍스트 색상 조정
              fontWeight: "bold", // 굵은 글씨체
            }}
          >
            or
          </span>
        </div>
        <button
          onClick={() => handleOAuth2Login("google")}
          style={{
            width: "280px",
            height: "70px",
            fontSize: "16px",
            border: "2px solid #333",
            borderRadius: "15px",
            padding: 0,
            backgroundColor: "#fff",
          }}
        >
          <img
            src={GoogleLogo}
            alt="Google login"
            style={{ width: "100%", height: "100%" }}
          />
        </button>
        <button
          onClick={() => handleOAuth2Login("github")}
          style={{
            width: "280px",
            height: "70px",
            fontSize: "16px",
            border: "2px solid #333",
            borderRadius: "15px",
            padding: 0,
            backgroundColor: "transparent",
          }}
        >
          <img
            src={GithubLogo}
            alt="GitHub login"
            style={{ width: "100%", height: "100%" }}
          />
        </button>
      </div>
    </Modal>
  );
}

export default SignupModal;
