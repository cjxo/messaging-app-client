import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Icon from '@mdi/react';
import { mdilAccount } from '@mdi/light-js';
import api from "../api/api";

const MessageLi = ({ name, message, selected, setSelected }) => {
  const [hover, setHover] = useState(false);

  const truncLength = Math.min(30, message.length);
  const trunced = truncLength < message.length;
  const truncated = message.substring(0, truncLength);
  return (
    <li>
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={setSelected}
        className={selected ? "selected" : ""}
      >
        <div className="profile-pic">
          <Icon
            path={mdilAccount}
            title="User Profile"
            size={1.5}
            color={(hover || selected) ? "#e5e9ff" : "black"}
          />
        </div>

        <div className="detail">
          <p className="name">{name}</p>
          <p className="brief-latest-message">{truncated + (trunced ? "..." : "")}</p>
        </div>
      </button>
    </li>
  );
};

const Message = () => {
  const [messagedUsers, setMessagedUsers] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [maxExchangesHeight, setMaxExchangesHeight] = useState(0);
  const [maxMessageListHeight, setMaxMessageListHeight] = useState(0);

  useEffect(() => {
    // TODO: fetch messaged users!
    const fetchMessagedUsers = async () => {
      const result = await api.message.getAll();
      console.log(result);
      setMessagedUsers([
        ...result.users,
      ]);
    };
    
    fetchMessagedUsers();

    const updateMaxHeight = () => {
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight
      const h2Element = document.querySelector(".messages > .section-title");
      const headerElement = document.querySelector(".chat-interface > header");
      const formElement = document.querySelector(".chat-box > form");
      if (headerElement && formElement && h2Element) {
        const viewportHeight = window.innerHeight;
        setMaxExchangesHeight(viewportHeight - (headerElement.offsetHeight + formElement.offsetHeight) - 1);
        setMaxMessageListHeight(viewportHeight - h2Element.offsetHeight * 2.5 - 3); // WHY?
        return true;
      }

      return false;
    };

    const observer = new MutationObserver(() => {
      if (updateMaxHeight()) {
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener('resize', updateMaxHeight);

    return () => {
      window.removeEventListener('resize', updateMaxHeight);
    };
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    
    const newState = [...messagedUsers];
    if (messagedUsers[selectedIdx].messages[0]) {
      newState[selectedIdx].messages.push(fd.get("message"));
      newState[selectedIdx].who.push("to");
    } else {
      newState[selectedIdx].messages = [fd.get("message")];
      newState[selectedIdx].who = ["to"];
    }

    setMessagedUsers(newState);

    api.message.sendTo(messagedUsers[selectedIdx].id, fd.get("message"));

    e.target.reset();
  };

  return (
    <>
      <section className="messages">
        <h2 className="section-title">Messages</h2>
        <ul
          className="messaged-users-list"
          style={{ maxHeight: maxMessageListHeight }}
        >
          {messagedUsers.map((msg, idx) => (
              <MessageLi
                key={msg.id}
                name={msg.first_name + " " + msg.last_name}
                message={msg.messages[msg.messages.length - 1] || ""}
                selected={selectedIdx === idx}
                setSelected={() => setSelectedIdx(idx)}
              />
            )
          )}
        </ul>
      </section>
      <section className="chat-interface">
        <header>
          <h2 className="section-title">{messagedUsers.length ? messagedUsers[selectedIdx].first_name + " " + messagedUsers[selectedIdx].last_name : null}</h2>
        </header>
  
        <section className="chat-box">
          <div className="exchanges" style={{ maxHeight: maxExchangesHeight }}>
            {
              (messagedUsers.length && messagedUsers[selectedIdx].messages[0]) ? (
                messagedUsers[selectedIdx].messages.map((msg, idx) => (
                  (messagedUsers[selectedIdx].who[idx] === "from") ? (
                    <div className="message-exchange left" key={idx}>
                      <div className="user-detail">
                        <div className="profile-pic">
                          <Icon
                            path={mdilAccount}
                            title="User Profile"
                            size={1.5}
                          />
                        </div>
                        <p className="who">{messagedUsers.length ? messagedUsers[selectedIdx].first_name + " " + messagedUsers[selectedIdx].last_name : null}</p>
                      </div>
                      <p className="msg">{msg}</p>
                    </div>
                  ) : (
                    <div className="message-exchange right" key={idx}>
                      <div className="user-detail">
                        <p className="who">You</p>
                        <div className="profile-pic">
                          <Icon
                            path={mdilAccount}
                            title="User Profile"
                            size={1.5}
                          />
                        </div>
                      </div>
                      <p className="msg">{msg}</p>
                    </div>
                  )
                ))
              ) : (
                null
              )
            }
          </div>

          <form onSubmit={onSubmit}>
            <textarea rows="4" name="message" required></textarea>
            <button>Send</button>
          </form>
        </section>
      </section>
    </>
  );
};

MessageLi.propTypes = {
  name: PropTypes.string.isRequired, 
  message: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  setSelected: PropTypes.func.isRequired,
}

export default Message;