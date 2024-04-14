import ChatList from "../ChatList";

const ChatUi = ({ messages }: { messages: Message[]}) => {
  return (
    <div className="flex p-5 flex-col custom-scrollbar  justify-between w-full h-full ">
      <ChatList messages={messages} />
    </div>
  );
};

export default ChatUi;
