import ChatList from "../ChatList";

const ChatUi = ({ messages }: { messages: Message[]}) => {
  return (
    <div className="flex flex-col custom-scrollbar  justify-between w-full h-full ">
      <ChatList messages={messages} />
    </div>
  );
};

export default ChatUi;
