import { CommentOutlined, WechatFilled } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { connectState, loginState, userState } from "../store/states";
import { Input } from "../stories/modules/input/Input";
import Image from "next/image";
import userDefault from "../public/image/user_default.png";
import dayjs from "dayjs";

enum MessageType {
  GLOBAL_MESSAGE = "global-message",
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

export const Chat = () => {
  const [isLogin, _setIsLogin] = useRecoilState(loginState);
  const [isOpen, setIsOpen] = useState(false);
  const [isConnect, setIsConnect] = useRecoilState(connectState);
  const [userInfo, _setUserInfo] = useRecoilState(userState);
  const [message, setMessage] = useState<any[]>([]);
  const [value, setValue] = useState("");
  const websocket = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!isLogin || isConnect) {
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
      const { content, user, createdAt } = JSON.parse(data.data);
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
          createdAt: dayjs().unix(),
        })
      );
    }
  };

  const MessageItem = ({ mes }: { mes: Message }) => {
    const [name, setName] = useState(false);
    const [time, setTime] = useState(false);
    const isUser = mes.user._id === userInfo._id;
    return (
      <li className={`flex items-center mb-1 ${isUser && "flex-row-reverse"}`}>
        <div className="flex mx-2">
          <div
            className="relative flex flex-col justify-center items-center"
            onMouseOver={() => setName(true)}
            onMouseLeave={() => setName(false)}
          >
            <Image
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
                className={`absolute top-1 bg-white min-w-max px-2 py-1 rounded-md ${
                  isUser ? "left-11" : "right-11"
                }`}
              >
                {mes.user.name}
              </div>
            )}
          </div>
        </div>
        <div
          className="relative"
          onMouseOver={() => setTime(true)}
          onMouseLeave={() => setTime(false)}
        >
          <p className="rounded-md p-2 bg-amber-100 ">{mes.content}</p>
          {time && (
            <div
              className={`absolute top-1 bg-white min-w-max px-2 py-1 rounded-md ${
                isUser ? "right-11" : "left-11"
              }`}
            >
              {dayjs.unix(mes.createdAt ?? 0).format("YYYY/MM/DD HH:mm")}
            </div>
          )}
        </div>
      </li>
    );
  };

  return (
    <>
      {isLogin && (
        <div className="fixed bottom-12 left-[calc(80vw_-_72px)] z-10">
          <div className="relative">
            {isOpen && (
              <div className="absolute -top-[450px] right-0 w-80 border-4 border-solid border-primary bg-c-bg rounded-md">
                <div className="p-4 border-b border-b-primary text-center">
                  即時群聊
                </div>
                <ul className="min-h-[300px] py-4 px-2">
                  {message.map((mes, index) => (
                    <MessageItem mes={mes} key={index} />
                  ))}
                </ul>
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
