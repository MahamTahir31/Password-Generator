import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  // useRef hook

  const passRef = useRef(null)


  // for optimisation
  const passwordGen = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "~!@#$%^&*()_+{}:<>?';,./\|-="

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)


  }, [length, numAllowed, charAllowed, setPassword])

  const copytoclip = useCallback(() => {

    passRef.current?.select()
    passRef.current?.setSelectionRange(0, 999)
    window.navigator.clipboard.writeText(password)
    const button = document.getElementById("copyButton");

    button.addEventListener("click", function () {
      button.textContent = "Copied!";

      setTimeout(function () {
        button.textContent = "Copy";
      }, 2000);
    });

  }, [password])



  // for running 
  useEffect(() => {
    passwordGen()
  }, [length, numAllowed, charAllowed, passwordGen])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-10 bg-slate-500">
        <h1 className='text-4xl text-center text-white my-3'>Password Generator</h1>
        <div className="flex shadow-md rounded-lg overflow-hidden mb-4 mt-4">
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passRef}
          />
          <button
            id='copyButton'
            onClick={copytoclip}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {
                setLength(e.target.value)
              }}
            />
            <label className=''>Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={() => {
                setNumAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
