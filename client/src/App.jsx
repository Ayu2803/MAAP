import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  async function handleSend() {
    if (!message.trim()) return;

    const userMessage = message;

    //fetch is used by react / frontend to send the HTTP request to backend.
    const response = await fetch("http://localhost:5000/api/chat", {

      method : "POST", //method = POST is written because we're sending user reques to backend. It specifies that its a POST request.

      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({  //stringify converts JS value into JSON string
        message: userMessage
      })
    });

      const data = await response.json();  //Response body ko JSON se JavaScript value mein parse kar re h using response.json()

      console.log("Backend reply:", data.reply);

    setMessages([            //This code is show the chat and reply the user in UI
      ...messages,  // It is used to spread the elements of existing array into new array.
      {
        id: Date.now(),      
      },
    ]);

    setMessage("");
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">M</div>
          <h2>MAAP<span>.</span></h2>
        </div>

        <button
          className="new-chat"
          onClick={() => setMessages([])}
        >
          + New Chat
        </button>

        <div className="sidebar-label">WORKSPACE</div>

        <button className="menu-item active">✦ AI Chat</button>
        <button className="menu-item">▤ Knowledge Base</button>
        <button className="menu-item">⌘ AI Agents</button>

        <div className="sidebar-bottom">
          <div className="avatar">A</div>
          <div>
            <strong>Ayushi</strong>
            <p>Free workspace</p>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <span className="status-dot"></span>
            <span>MAAP Workspace</span>
          </div>

          <button className="model-button">
            ✨ AI Assistant ▾
          </button>
        </header>

        <section className="chat-area">
          {messages.length === 0 ? (
            <div className="welcome">
              <div className="welcome-icon">✳</div>

              <p className="eyebrow">YOUR AI WORKSPACE</p>

              <h1>
                One workspace.
                <br />
                <span>Infinite possibilities.</span>
              </h1>

              <p className="subtitle">
                Research, create, analyze and build.
                <br />
                Your AI journey starts here.
              </p>

              <div className="suggestions">
                <button onClick={() => setMessage("Explain AI agents")}>
                  ✦ Explain AI agents
                </button>

                <button onClick={() => setMessage("Help me write code")}>
                  &lt;/&gt; Help me write code
                </button>

                <button onClick={() => setMessage("Analyze a document")}>
                  ▤ Analyze a document
                </button>
              </div>
            </div>
          ) : (
            <div className="messages">
              {messages.map((item) => (
                <div className="message-row" key={item.id}>
                  <div className="avatar message-avatar">A</div>
                  <div className="message-content">
                    <strong>You</strong>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <footer className="composer-wrapper">
          <div className="composer">
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" &&
                  !event.shiftKey
                ) {
                  event.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask MAAP anything..."
              rows={2}
            />

            <div className="composer-bottom">
              <span>✧ AI-powered workspace</span>

              <button
                className="send-button"
                onClick={handleSend}
                disabled={!message.trim()}
              >
                ↑
              </button>
            </div>
          </div>

          <p className="disclaimer">
            MAAP is your unified AI workspace. AI responses will be
            enabled when we connect the backend.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;