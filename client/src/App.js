import './App.css';
import { useState } from 'react';

import ChatMessage from './components/ChatMessage';

const App = () => {

  const [input, setInput] = useState('');
  const [chatlog, setChatlog] = useState([])

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    let newChatlog = [...chatlog, { role: 'user', content: input }]
    setChatlog(newChatlog);
    setInput('');

    const response = await fetch(
      'http://localhost:5000/chat',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ chatlog: newChatlog })
      }
    );

    const data = await response.json();

    setChatlog([...newChatlog, { role: 'assistant', content: data.response }]);
  }

  const handleNewChat = () => {
    setChatlog([]);
  };

  return (
    <div>
      <aside>

        <div onClick={handleNewChat}>
          New Chat
        </div>

      </aside>

      <section>

        {
          chatlog.map((c, i) => {
            return (
              <div key={i}>
                <ChatMessage role={c.role} content={c.content}></ChatMessage>
              </div>
            )
          })
        }

        <div>
          <form onSubmit={handleInputSubmit}>
            <input
              value={input}
              onChange={(e) => { setInput(e.target.value) }}
              rows="1"
              placeholder="Type your message here...">
            </input>
          </form>
        </div>

      </section>
    </div>
  );
}

export default App;
