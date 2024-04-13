import ChatList from "../ChatList";

const ChatUi = ({ messages }: { messages: Message[]}) => {
  return (
    <div className="flex flex-col justify-between w-full h-full ">
      <ChatList messages={messages} />
    </div>
  );
};

export default ChatUi;
