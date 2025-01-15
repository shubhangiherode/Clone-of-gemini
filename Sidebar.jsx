import React, { useState, useContext } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { prevPrompts, setRecentPrompt, onSent, newChat } = useContext(Context);

  // Function to load a selected prompt
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt); // Set the selected prompt as recent
    await onSent(prompt); // Trigger sending the prompt
  };

  return (
    <div className="sidebar">
      <div className="top">
        {/* Menu Icon */}
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="Menu Icon"
        />

        {/* New Chat */}
        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="Plus Icon" />
          {extended ? <p>New Chat</p> : null}
        </div>

        {/* Recent Prompts */}
        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.length > 0 ? (
              prevPrompts.map((item, index) => {
                // Truncate the text with '...'
                const truncatedText =
                  item.length > 18 ? `${item.slice(0, 18)}...` : item;

                return (
                  <div
                    key={index}
                    className="recent-entry"
                    onClick={() => loadPrompt(item)} // Load the prompt on click
                  >
                    <img src={assets.message_icon} alt="Message Icon" />
                    <p>{truncatedText}</p>
                  </div>
                );
              })
            ) : (
              <p className="no-recent">No recent prompts available.</p>
            )}
          </div>
        )}
      </div>

      {/* Sidebar Bottom */}
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="Help Icon" />
          {extended ? <p>Help</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="Activity Icon" />
          {extended ? <p>Activity</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="Settings Icon" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
