import { useState, useCallback, useEffect, useRef } from 'react';

import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState('');
  const [charAllowed, setCharAllowed] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(false);

  const generatePassword = useCallback(() => {
    let password = '';

    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*()_-+=[]{}|';

    for (let i = 1; i < length; i++) {
      // generate a random num
      const index = Math.floor(Math.random() * str.length + 1);
      password += str.charAt(index);
    }

    setPassword(password);
  }, [length, charAllowed, numberAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, charAllowed, numberAllowed, generatePassword]);

  const passwordRef = useRef(null);

  const copyPasswordToClipBoard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  return (
    <div className="text-center mt-4 sm:w-[500px] sm:h-38 h-68 w-88 bg-gray-800 rounded p-3 shadow-2xl ring-1 ring-slate-900/5">
      <h4 className="text-white p-2">Password Generator</h4>
      <div className="my-2 p-2 sm:p-0">
        <input
          type="text"
          className="bg-white text-orange-400 sm:w-80 p-1 rounded sm:rounded-r-none sm:rounded-l-md outline-none w-full"
          value={password}
          readOnly
          placeholder="Password"
          ref={passwordRef}
        />
        <button
          className="bg-blue-500 p-1 sm:rounded-r-md px-2 sm:rounded-l-none cursor-pointer rounded w-full sm:w-24 mt-2"
          onClick={copyPasswordToClipBoard}
        >
          copy
        </button>
      </div>
      <div className="text-orange-400 flex justify-center gap-3 my-5 flex-col items-center sm:flex-row sm:items-baseline">
        <div className="flex gap-2">
          <input
            type="range"
            min="8"
            max="30"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-32 cursor-pointer"
          />
          <label htmlFor="password-length">Length: {length}</label>
        </div>
        <div className="flex gap-1">
          <input
            type="checkbox"
            name="numbers"
            id="numbers"
            defaultChecked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="numbers">Numbers</label>
        </div>

        <div className="flex gap-1">
          <input
            type="checkbox"
            name="characters"
            id="characters"
            defaultChecked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="characters">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
