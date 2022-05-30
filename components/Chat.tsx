import { CommentOutlined, WechatFilled } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { connectState, loginState } from "../store/states";
import { Input } from "../stories/modules/input/Input";

export const Chat = () => {
  const [isLogin, _setIsLogin] = useRecoilState(loginState);
  const [isOpen, setIsOpen] = useState(false);
  const [isConnect, setIsConnect] = useRecoilState(connectState);
  const [message, setMessage] = useState<any[]>([]);
  const [value, setValue] = useState("");
  const websocket = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!isLogin || isConnect) {
      return;
    }
    websocket.current = new WebSocket("wss:metawall-websocket.herokuapp.com/?");
    websocket.current.onopen = () => {
      setIsConnect(true);
      console.log("open connection");
    };
    websocket.current.onclose = () => {
      setIsConnect(false);
      console.log("close connection");
    };
    websocket.current.onmessage = data => {
      setMessage(prev => [...prev, JSON.parse(data.data)]);
    };
  }, [isLogin, isConnect]);

  const sendMessage = () => {
    if (websocket?.current) {
      websocket.current.send(JSON.stringify(value));
    }
  };

  return (
    <>
      {isLogin && (
        <div className="fixed bottom-12 left-[calc(80vw_-_72px)] z-10">
          <div className="relative">
            {isOpen && (
              <div className="absolute -top-[450px] right-0 w-80 border-4 border-solid border-primary bg-c-bg rounded-md">
                <div className="p-4 border-b border-b-primary text-center">
                  header
                </div>
                <div className="min-h-[300px] p-4">
                  {message.map((content, index) => (
                    <div key={index}>{content}</div>
                  ))}
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
