import { useState } from 'react'
import './App.css'

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('https://joyman-ai-assistant.kazeso-kazewo.workers.dev', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      console.log("data")
      console.log(data)
      if (data.error) {
        setError(data.error);
      } else {
        setResponse(data.response);
      }
    } catch (err) {
      setError('Failed to fetch the API. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>ジョイマンっぽい単語ジェネレーター</h2>
      <form onSubmit={handleSubmit}>
        <label>
          テキストを入力してください:
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              marginLeft: '10px',
              padding: '5px',
              fontSize: '16px',
            }}
          />
        </label>
        <button
          type="submit"
          style={{
            marginLeft: '10px',
            padding: '5px 10px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
          disabled={loading}
        >
          {loading ? '生成中...' : '生成'}
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}

      {response && (
        <div style={{ marginTop: '20px' }}>
          <h2>生成結果:</h2>
          <p style={{ padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>{response}</p>
        </div>
      )}
    </div>
  );
};


// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

export default App
