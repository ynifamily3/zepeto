import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Gnb = styled.div`
  display: flex;
  align-items: center;
  margin-top: 44px;
  height: 56px;
  & > div:not(:first-child) {
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 1em;
  }
  & > div > img {
    width: 50%;
  }
  .Oval-Copy {
    width: 36px;
    height: 36px;
    background-color: #f1f3f8;
    border-radius: 48px;
  }
`;
const Today = styled.div`
  flex: 1;
  font-size: 2em;
`;
const Ad = styled.div`
  display: flex;
  width: 100%;
  min-width: 339px;
  border-radius: 96px;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f1f3f8;
`;
const AdLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  font-size: 3em;
  border-radius: 80px;

  background-color: #ffffff;
`;
const AdRight = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  justify-content: center;
  line-height: 2em;
  & > em {
    font-weight: bold;
    font-style: normal;
  }
`;
const Crew = styled.div`
  display: flex;
  flex-direction: column;
`;
const CrewTop = styled.div`
  display: flex;
  padding-top: 1em;
  padding-bottom: 1em;
  flex-direction: row;
  align-items: center;
  & > div:first-child {
    flex: 1;
    font-size: 1.5em;
  }
`;

const CrewBody = styled.div`
  display: flex;
  flex-direction: column;
`;
const CrewElem = styled.div`
  display: flex;
  & > div {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  & > div:first-child {
    background: ${props => (props.color ? props.color : "white")};
  }
  & > div > img {
    width: 150px;
  }
`;

const Style = styled.div``;

const StyleTop = styled.div`
  font-size: 1.5em;
`;

const StyleBody = styled.div`
  width: 100%;
  height: 225px;
  display: flex;
  justify-content: center;
  position: relative;

  .cls {
    /* */
  }
  .styleImage {
    /* height: 100px; */
  }
`;

const Rectangle = styled.div`
  width: 339px;
  height: 225px;
  border-radius: 20px;
  background: ${props => (props.color ? props.color : "wheat")};
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 100%;
  }
  .cls {
    position: absolute;
  }
`;

const NavWrapper = styled.div`
  width: 100%;
  position: relative;
  overflow-x: scroll;
`;

const Nav = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
`;

const LatestCard = styled.li`
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-right: 1em;
  width: 106px;
  height: 165px;
  text-align: center;
  & > div {
    background: ${props => (props.color ? props.color : "white")};
    border-radius: 20px;
    margin-bottom: 0.5em;
  }
  & > div > img {
    width: 106px;
  }
`;
const LatestEmoji = styled.div``;

interface Crew {
  _id: string;
  name: string;
  description: string;
  coverImage: string;
  bgColor: string; // css
}

interface StyleType {
  _id: string;
  hashCode: string;
  postCount: number;
  country: string;
  profileImage: string;
  name: string;
  followerCount: number;
  post: {
    _id: string;
    reactions: { lovely: string };
    postText: string;
    images: string[];
    updated: number;
    zzzId: string;
    styleIdx: string;
    bgColor: string;
    keywords: string[];
    created: number;
  };
}

interface Latest {
  food: number;
  emoji: number;
  foodUpdated: number;
  emojiUpdate: number;
  updated: number;
  _id: string;
  name: string;
  coverImage: string;
  hashCode: string;
  bgColor: string;
  photobooth: string;
}

const App = () => {
  const endPoint: string = "https://api.zzz.studio/api/me/trend?country=ko";

  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩중?

  const [latestState, setLatestState] = useState<Latest[]>([]); // latest 정보

  const [crewState, setCrewState] = useState<Crew[]>([]); // 크루 정보.
  const [styleState, setStyleState] = useState<StyleType[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  useEffect(() => {
    axios.get(endPoint).then(res => {
      const { data } = res;
      const { isSuccess } = data;
      if (!isSuccess) {
        console.log("failed to connecting");
      } else {
        setIsLoading(false);
        const { crews }: { crews: Crew[] } = data.result;
        const { styles }: { styles: StyleType[] } = data.result;
        const { latest }: { latest: Latest[] } = data.result;
        console.log(crews);
        setCrewState(crews.slice(0, 4)); // 4개만 씀.
        setStyleState(styles);
        setLatestState(latest);
      }
    });
  }, []);

  // Interval
  useEffect(() => {
    if (styleState.length > 1) {
      const interval = setInterval(() => {
        // console.log("this will ve ");
        setCurrentIdx((currentIdx + 1) % styleState.length);
        // console.log(currentIdx);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [styleState, currentIdx]);

  return (
    <div className="App">
      <Gnb>
        <Today className="bold">today</Today>
        <div className="refresh">
          <img src="/img/refresh.png" alt="새로고침" />
        </div>
        <div className="Oval-Copy">
          <img src="/img/menu.png" alt="메뉴" />
        </div>
      </Gnb>
      <NavWrapper>
        <Nav>
          {latestState.map((x: Latest, i: number) => {
            return (
              <LatestCard key={x._id} color={x.bgColor}>
                <div>
                  <LatestEmoji></LatestEmoji>
                  <img src={x.coverImage} />
                </div>
                <span className="bold">{x.name}</span>
              </LatestCard>
            );
          })}
        </Nav>
      </NavWrapper>
      <Ad>
        <AdLeft>
          <span role="img" aria-label="home">
            🏠
          </span>
        </AdLeft>
        <AdRight>
          <em>주말에 집에서 뒹굴하는 사람?</em>
          <span>소울메이트에서 만나보자</span>
        </AdRight>
      </Ad>
      <Crew>
        <CrewTop>
          <div>주목받는 크루</div>
          <div>더보기</div>
        </CrewTop>
        <CrewBody>
          {crewState.map((x: Crew, i: number) => {
            return (
              <CrewElem key={x._id} color={x.bgColor}>
                <div>
                  <img src={x.coverImage} alt="holder" />
                </div>
                <div>
                  <em>{x.name}</em>
                  <div>{x.description}</div>
                </div>
              </CrewElem>
            );
          })}
        </CrewBody>
      </Crew>
      <Style>
        <StyleTop>
          <div>주목받는 스타일</div>
        </StyleTop>
        <StyleBody>
          <Rectangle color={styleState[currentIdx]?.post.bgColor}>
            <img
              className="styleImage"
              src={styleState[currentIdx]?.profileImage}
              alt="주목받는 스타일 이미지"
            />
            <div className="cls">
              {styleState[currentIdx]?.post.reactions.lovely}
            </div>
          </Rectangle>
        </StyleBody>
      </Style>
    </div>
  );
};

export default App;
