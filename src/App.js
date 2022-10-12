import "./App.css";
import { useState } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import bot from "./images/bot.svg";
import user from "./images/user.svg";
import axios from "axios";
import {
  MainContainer,
  ChatContainer,
  ConversationHeader,
  MessageList,
  Message,
  MessageInput,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
// import { useRef } from "react";

function App() {
  const [currentbotid, setcurrentbotid] = useState("teamchatbot" + Date.now());
  const [sessionAttributes, setsessionAttributes] = useState({});
  const [dummyarr, setdummyarr] = useState([
    {
      message: "Hello my friend",
      sender: currentbotid,
      direction: "incoming",
    },
  ]);
  // const datastr = "";
  const handleSubmit = async (message) => {
    console.log(message);
    // await(async () => {
    setdummyarr((current) => [
      ...current,
      {
        message: message.trim(),
        sender: "User",
        direction: "outgoing",
      },
    ]);
    try {
      // const response = await axios.post("http://localhost:3001/callLex", {
      //   message: message,
      //   userid: currentbotid,
      //   sessionAttributes: sessionAttributes,
      // });

      //Using the EC2 instance level get

      const response = await axios.post(process.env.REACT_APP_LEXURI, {
        message: message,
        userid: currentbotid,
        sessionAttributes: sessionAttributes,
      });
      setsessionAttributes(response["sessionAttributes"]);
      setdummyarr((current) => [
        ...current,
        {
          message: response["data"]["message"],
          sender: currentbotid,
          direction: "incoming",
        },
      ]);
    } catch (err) {
      setdummyarr((current) => [
        ...current,
        {
          message: "Server Down",
          sender: currentbotid,
          direction: "incoming",
        },
      ]);
    }
    // })();
  };
  return (
    <div className="textspace">
      {/* <div className="actualchatbox"> */}
      <MainContainer className="mainchatbot">
        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Content userName="Chatbot" />
          </ConversationHeader>
          <MessageList scrollBehavior="smooth" autoScrollToBottom={true}>
            {dummyarr.map((element, index) => {
              return (
                <Message model={element} key={index}>
                  <Avatar
                    src={element.sender === "User" ? user : bot}
                    name="Bot"
                  />
                </Message>
              );
            })}
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            attachButton={false}
            onSend={handleSubmit}
          />
        </ChatContainer>
      </MainContainer>
      {/* </div> */}
    </div>
  );
}

export default App;
