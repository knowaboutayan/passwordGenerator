import { useState } from 'react'
import './App.css'
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false);
  const [uppercaseAllowed, setUppercaseAllowed] = useState(false)
  const [password, setPassword] = useState("");
  const passwordGenerate = () => {
    const lowerLetter = "abcdefghijklmnopqrstuvwxyz";
    const upperLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const number = "1234567890"
    const specialChar = "~!@#$%^*){|?>}<:`)\\,/=]-:'\"*[";
    let characters = lowerLetter;
    let passwordIs = "";
    if (uppercaseAllowed)
      characters = characters.concat(upperLetter);
    if (numberAllowed)
      characters = characters.concat(number);
    if (specialCharAllowed)
      characters = characters.concat(specialChar);
    for (let i = 0; i < length; i++)
      passwordIs += characters.charAt(Math.floor(Math.random() * characters.length));
    setPassword(passwordIs);

   
  }

  useEffect(() => passwordGenerate(), [length, uppercaseAllowed, numberAllowed, specialCharAllowed])
  const passwordRef = useRef(null);
  const [copy, setcopyStatus] = useState(false)
  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
    setcopyStatus(true);
    setTimeout(() => setcopyStatus(false), 5000);
  }, [password]);
  return (
    <>
      <h2>
        PASSWORD GENERATOR
      </h2>

      <div><input type='text' placeholder='PASSWORD' value={password} ref={passwordRef} readOnly /><button style={{ backgroundColor: copy ? "green" : "" }} onClick={copyToClipboard}> {(copy) ? "copied!" : "copy"}</button></div>
      <div>
        <label>length:<input type='range' min={8} max={100} value={length} onChange={(e) => setLength(e.target.value)} placeholder='range' />({length})</label>
        <label><input type="checkbox" value={uppercaseAllowed} onChange={() => setUppercaseAllowed((pre) => !pre)} />UPPERCASE</label>
        <label><input type="checkbox" value={numberAllowed} onChange={() => setNumberAllowed((pre) => !pre)} />numbers</label>
        <label><input type="checkbox" value={specialCharAllowed} onChange={() => setSpecialCharAllowed((pre) => !pre)} />special characters</label>
      </div>


    </>
  )
}

export default App
