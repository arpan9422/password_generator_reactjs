import { useState, useCallback, useEffect, useRef} from 'react'


function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumallowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(true);
  const [Password, setPassword] = useState("")
  const passeordref = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy"
    if(numAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_+-=[]{}`~"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numAllowed, charAllowed, setPassword])


  const copyPasswordToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(Password)
  },[Password])

 useEffect(() => {
  passwordGenerator()
 }, [length, numAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-6 my-8 py-4 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center text-xl ">Password Generator</h1>
        <div className="flex  rounded-lg overflow-hidden mb-4 p-3">
          <input   
          type="text"
          value={Password}
          className='outline-none w-full py-1 px-3 rounded-sm'
          placeholder='password'
          readOnly
          ref={passeordref}
          />
          <button
          onClick={copyPasswordToClipboard}
          className='bg-blue-700 px-2 rounded-sm text-white'>copy</button>
        </div>
        <div className='flex text-md gap-x-2'>
          <div className=' flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={50}
            value={length}
            className='cursor-pointer '
            onChange={(e) => {setLength(e.target.value)}}
             />
             <label>length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
           <input 
           type="checkbox"
           defaultChecked={numAllowed}
           id="numberInput"
           onChange={() => {
            setNumallowed((prev) => !prev)
           }} />
           <label>Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
           <input 
           type="checkbox"
           defaultChecked={charAllowed}
           id="numberInput"
           onChange={() => {
            setCharAllowed((prev) => !prev)
           }} />
           <label>character</label>
          </div>
        </div>
      </div>
    </>   
  )
}

export default App
