import { useState, useEffect } from "react";
import Icon from '@mdi/react';
import { mdilAccount } from '@mdi/light-js';

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

  useEffect(() => {
    // TODO: fetch messaged users!
    setMessagedUsers([
      {
        id: 1,
        firstName: "Jay",
        lastName: "Won",
        messages: [
          {
            who: "from",
            msg: "Have you watch the recent From season 3 episode titled 'Revelations'?",
          },
          {
            who: "to",
            msg: "HAHA thats quite an episode! It turns out the townspeople sacrificed their children for eternal life!"
          },
        ]
      },
      {
        id: 2,
        firstName: "Jay",
        lastName: "Lost",
        messages: [
          {
            who: "from",
            msg: "Have you watch the recent From season 3 episode titled 'Revelations'?",
          },
          {
            who: "to",
            msg: "HAHA thats quite an episode! It turns out the townspeople sacrificed their children for eternal life!"
          },
        ]
      }
    ]);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    
    const newState = [...messagedUsers];
    newState[selectedIdx].messages.push({ who: "to", msg: fd.get("message") });
    setMessagedUsers(newState);

    e.target.reset();
  };

  return (
    <>
      <section className="messages">
        <h2 className="message-sidebar-title">Messages</h2>
        <ul className="messaged-users-list">
          {messagedUsers.map((msg, idx) => (
              <MessageLi
                key={msg.id}
                name={msg.firstName + " " + msg.lastName}
                message={msg.messages[msg.messages.length - 1].msg}
                selected={selectedIdx === idx}
                setSelected={() => setSelectedIdx(idx)}
              />
            )
          )}
        </ul>
      </section>
      <section className="chat-interface">
        <header>
          <h2 className="message-sidebar-title ">{messagedUsers.length ? messagedUsers[selectedIdx].firstName + " " + messagedUsers[selectedIdx].lastName : null}</h2>
        </header>
  
        <section className="chat-box">
          <div className="exchanges">
            {
              messagedUsers.length ? (
                messagedUsers[selectedIdx].messages.map((msg, idx) => (
                  (msg.who === "from") ? (
                    <div className="message-exchange left">
                      <div className="user-detail">
                        <div className="profile-pic">
                          <Icon
                            path={mdilAccount}
                            title="User Profile"
                            size={1.5}
                          />
                        </div>
                        <p className="who">{messagedUsers.length ? messagedUsers[selectedIdx].firstName + " " + messagedUsers[selectedIdx].lastName : null}</p>
                      </div>
                      <p className="msg">{msg.msg}</p>
                    </div>
                  ) : (
                    <div className="message-exchange right">
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
                      <p className="msg">{msg.msg}</p>
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

export default Message;
