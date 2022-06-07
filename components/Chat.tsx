import { CommentOutlined, WechatFilled } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import {
  connectState,
  loginState,
  messageState,
  userState,
} from "../store/states";
import { Input } from "../stories/modules/input/Input";
import Image from "next/image";
import userDefault from "../public/image/user_default.png";
import dayjs from "dayjs";
import { fetchMessages } from "../api/message";
import { useRouter } from "next/router";

enum MessageType {
  GLOBAL_MESSAGE = "global-message",
  NOTIFICATION = "notification",
}

interface Message {
  type: string;
  content: string;
  createdAt?: number;
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
}

interface UserInfo {
  _id: string;
  name: string;
  avatar: string;
  gender: string;
}

const MessageItem = ({
  mes,
  userInfo,
  scroll,
}: {
  mes: Message;
  userInfo: UserInfo;
  scroll: number;
}) => {
  const [name, setName] = useState(false);
  const [nameStyle, setNameStyle] = useState({});
  const [timeStyle, setTimeStyle] = useState({});
  const [time, setTime] = useState(false);
  const nameRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);
  const isUser = mes.user._id === userInfo._id;

  useEffect(() => {
    if (nameRef?.current) {
      if (isUser) {
        setNameStyle({
          top: `calc(${nameRef?.current?.offsetTop - scroll ?? 0}px + 8px)`,
          left: `calc(${nameRef?.current?.offsetLeft ?? 0}px + 48px)`,
        });
      } else {
        setNameStyle({
          top: `calc(${nameRef?.current?.offsetTop - scroll ?? 0}px + 8px)`,
          right: 300,
        });
      }
    }
  }, [nameRef?.current, scroll]);

  useEffect(() => {
    if (timeRef?.current) {
      if (isUser) {
        setTimeStyle({
          top: `calc(${timeRef?.current?.offsetTop - scroll ?? 0}px + 8px)`,
          left: `calc(${timeRef?.current?.offsetLeft ?? 0}px - 156px)`,
        });
      } else {
        setTimeStyle({
          top: `calc(${timeRef?.current?.offsetTop - scroll ?? 0}px + 8px)`,
          left: `calc(${
            (timeRef?.current?.offsetLeft ?? 0) +
            (timeRef?.current?.offsetWidth ?? 0)
          }px + 8px)`,
        });
      }
    }
  }, [timeRef?.current, scroll]);

  return (
    <li className={`flex items-center mb-1 ${isUser && "flex-row-reverse"}`}>
      <div className="flex mx-2">
        <div
          className="flex flex-col justify-center items-center"
          ref={nameRef}
          onMouseOver={() => setName(true)}
          onMouseLeave={() => setName(false)}
        >
          <Image
            className="rounded-full"
            src={
              mes.user.avatar && mes.user.avatar !== " "
                ? mes.user.avatar
                : userDefault
            }
            width="40px"
            height="40px"
            objectFit="cover"
          />
          {name && (
            <div
              className={`absolute bg-white min-w-max px-2 py-1 rounded-md`}
              style={nameStyle}
            >
              {mes.user.name}
            </div>
          )}
        </div>
      </div>
      <div
        onMouseOver={() => setTime(true)}
        onMouseLeave={() => setTime(false)}
      >
        <div
          className="rounded-md p-2 bg-amber-100 max-w-[220px] line-clamp-6"
          ref={timeRef}
        >
          {mes.content}
        </div>
        {time && (
          <div
            className={`absolute bg-white w-max px-2 py-1 rounded-md`}
            style={timeStyle}
          >
            {dayjs(mes.createdAt ?? 0).format("YYYY/MM/DD HH:mm")}
          </div>
        )}
      </div>
    </li>
  );
};

export const Chat = () => {
  const [isLogin, _setIsLogin] = useRecoilState(loginState);
  const [isOpen, setIsOpen] = useState(false);
  const [isConnect, setIsConnect] = useRecoilState(connectState);
  const [userInfo, _setUserInfo] = useRecoilState(userState);
  const [messageData, setMessageData] = useRecoilState(messageState);
  const [message, setMessage] = useState<any[]>([]);
  const [value, setValue] = useState("");
  const [toast, setToast] = useState(false);
  const [oldMessage, setOldMessage] = useState(false);
  const [scroll, setScroll] = useState(0);
  const websocket = useRef<WebSocket | null>(null);
  const router = useRouter();

  const getOldMessage = () => {
    fetchMessages().then(data => {
      setMessageData(data);
    });
  };

  useEffect(() => {
    if (!isLogin || router.pathname === "/") {
      return;
    }
    getOldMessage();
  }, [isLogin, router]);

  useEffect(() => {
    if (!toast) {
      return;
    }
    const time = setTimeout(() => setToast(false), 5000);
    return () => clearTimeout(time);
  }, [toast]);

  useEffect(() => {
    if (!isLogin) {
      setIsConnect(false);
      if (websocket?.current) {
        websocket.current.send(
          JSON.stringify({
            isClose: true,
          })
        );
      }
      return;
    }
    if (isConnect) {
      return;
    }
    websocket.current = new WebSocket(
      `wss:metawall-websocket.herokuapp.com/?userId=${userInfo._id}`
    );
    websocket.current.onopen = () => {
      setIsConnect(true);
      console.log("open connection");
    };
    websocket.current.onclose = () => {
      setIsConnect(false);
      console.log("close connection");
    };
    websocket.current.onmessage = data => {
      const { content, user, createdAt, type } = JSON.parse(data.data);
      if (type === MessageType.NOTIFICATION) {
        setToast(content);
        return;
      }
      setMessage(prev => [...prev, { content, user, createdAt }]);
    };
  }, [isLogin, isConnect]);

  const sendMessage = () => {
    if (websocket?.current) {
      websocket.current.send(
        JSON.stringify({
          type: MessageType.GLOBAL_MESSAGE,
          content: value,
          user: {
            _id: userInfo._id,
            name: userInfo.name,
            avatar: userInfo.avatar,
          },
          createdAt: dayjs().valueOf(),
        })
      );
      setValue("");
    }
  };

  return (
    <>
      {isLogin && (
        <div className="fixed bottom-12 left-[calc(80vw_-_72px)] z-10">
          {toast && (
            <div className="fixed top-32 left-0 w-screen flex justify-center">
              <p className="p-2 bg-[#EEC32A] rounded-md">{toast}</p>
            </div>
          )}
          <div className="relative">
            {isOpen && (
              <div className="absolute -top-[450px] right-0 w-80 border-4 border-solid border-primary bg-c-bg rounded-md">
                <div className="p-4 border-b border-b-primary text-center">
                  即時群聊
                </div>
                <div className="relative">
                  <ul
                    className="h-[300px] overflow-y-auto py-4 px-2"
                    onScroll={(e: React.UIEvent<HTMLElement>) => {
                      setScroll((e.target as HTMLElement).scrollTop);
                    }}
                  >
                    <div className="flex justify-center items-center mb-2">
                      <button
                        className="bg-primary font-medium p-2 rounded-md text-white"
                        onClick={() => setOldMessage(!oldMessage)}
                      >
                        {oldMessage ? "關閉以往訊息" : "打開以往訊息"}
                      </button>
                    </div>
                    {oldMessage && (
                      <>
                        {messageData.map((mesData, index) => (
                          <MessageItem
                            mes={mesData}
                            userInfo={userInfo}
                            scroll={scroll}
                            key={index}
                          />
                        ))}
                        <div className="w-full h-0 border-b border-b-soild border-b-primary my-2 " />
                      </>
                    )}
                    {message.map((mes, index) => (
                      <MessageItem
                        mes={mes}
                        userInfo={userInfo}
                        scroll={scroll}
                        key={index}
                      />
                    ))}
                  </ul>
                </div>
                <div className="flex">
                  <Input
                    value={value}
                    onChange={e => setValue(e.target.value)}
                  />
                  <div>
                    <button
                      className="bg-primary w-12 h-12 border-2 border-dark border-solid"
                      onClick={() => sendMessage()}
                    >
                      <CommentOutlined className="text-white text-2xl flex items-center justify-center" />
                    </button>
                  </div>
                </div>
              </div>
            )}
            <WechatFilled
              className={`text-[72px] text-primary ${
                !isOpen && "animate-bounce"
              }`}
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
