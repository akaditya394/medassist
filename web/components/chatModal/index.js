import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import styles from "./styles.module.scss";
import CloseIcon from "../../images/icons/closeAlt.svg";

const data = [
  { id: 1, text: "How many glass of water I need to drink in a day" },
  { id: 2, text: "How r u" },
  { id: 3, text: "What to do when stung by a bee" },
];

const ChatModal = () => {
  const [value, setValue] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  //   experimental
  const submitHandler = async () => {
    const res = await axios.post("http://localhost:8000/chat", { value });
    console.log(res);
  };

  console.log("value is", value);
  return (
    <>
      <div className={styles.chatBubbleWrapper} onClick={openModal}>
        What can I help you with?
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            position: "fixed",
            zIndex: 1020,
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(255, 255, 255, 0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          content: {
            background: "white",
            width: "50rem",
            maxWidth: "calc(100vw - 2rem)",
            maxHeight: "calc(100vh - 2rem)",
            overflowY: "auto",
            position: "relative",
            border: "1px solid #0F2E53",
            borderRadius: "0.3rem",
          },
        }}
      >
        <div className={styles.inputWrapper}>
          <label>Ask me anything about your health?</label>
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </div>

        <div className={styles.suggestionsWrapper}>
          <div className={styles.label}>Not sure where to start?</div>
          <div className={styles.suggestionsContainer}>
            {data.map((item, index) => {
              return (
                <div
                  className={styles.suggestion}
                  index={index}
                  onClick={() => {
                    setValue(item.text);
                    //    experimental
                    submitHandler();
                  }}
                >
                  {item.text}?
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.line} />
        <div className={styles.openai}>Powered by OpenAI</div>
        <span
          role="button"
          tabIndex="0"
          className={styles.dismiss}
          onClick={closeModal}
        >
          <img src={CloseIcon} alt="close icon" />
        </span>
      </Modal>
    </>
  );
};

export default ChatModal;
