// client/src/components/App.js
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Search from "./Search";
import MessageList from "./MessageList";
import NewMessage from "./NewMessage";

const testUser = { username: "Duane" };

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  
  // State for UX
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use Environment Variable for the API URL
  const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5555";

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`${API_URL}/messages`)
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw new Error("Failed to fetch messages from the server.");
        }
      })
      .then((data) => {
        setMessages(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Could not connect to the server. Is Flask running?");
        setIsLoading(false);
      });
  }, [API_URL]);

  function handleAddMessage(newMessage) {
    setMessages([...messages, newMessage]);
  }

  function handleDeleteMessage(id) {
    const updatedMessages = messages.filter((message) => message.id !== id);
    setMessages(updatedMessages);
  }

  function handleUpdateMessage(updatedMessageObj) {
    const updatedMessages = messages.map((message) => {
      if (message.id === updatedMessageObj.id) {
        return updatedMessageObj;
      } else {
        return message;
      }
    });
    setMessages(updatedMessages);
  }

  const displayedMessages = messages.filter((message) =>
    message.body.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className={isDarkMode ? "dark-mode" : ""}>
      <Header isDarkMode={isDarkMode} onToggleDarkMode={setIsDarkMode} />
      <Search search={search} onSearchChange={setSearch} />
      
      {/* Conditional Rendering Logic */}
      {error ? (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <p style={{ color: "#ff4d4d", fontWeight: "bold" }}>⚠️ {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      ) : isLoading ? (
        <h2 style={{ textAlign: "center", marginTop: "2rem" }}>Loading messages...</h2>
      ) : (
        <MessageList
          messages={displayedMessages}
          currentUser={testUser}
          onMessageDelete={handleDeleteMessage}
          onUpdateMessage={handleUpdateMessage}
        />
      )}

      <NewMessage currentUser={testUser} onAddMessage={handleAddMessage} />
    </main>
  );
}

export default App;