import { useState } from 'react';


function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiURL = import.meta.env.VITE_API_URL

  const [length, setLength] = useState(500);
  const [paragraphs, setParagraphs] = useState(1);
  const [result, setResult] = useState([]);


  async function handleClick(){
    try{
      const response = await fetch(`${apiURL}?max_length=${length}&paragraphs=${paragraphs}`, {method: 'GET', headers: {'X-Api-Key': apiKey}});
      if(!response.ok) throw new Error('API Response was not ok');
      const data = await response.json();
      setResult(data.text);
    }catch(error){
      console.error('Error:',error);
    }
  }

  return (
    <div id="main">
      <div id="container">
         <div id="paragraph-input-container" className="input-container">
            <label htmlFor="paragraph">Paragraphs:</label>
            <input id="paragraph" type="number" placeholder="Number of Paragraphs (Optional)" onChange={(e)=>setParagraphs(parseInt(e.target.value))}/>
          </div>
          <div id="length-input-container" className="input-container">
            <label htmlFor="length">Max Length:</label>
            <input id="length" type="number" placeholder="Max Length (Optional)" onChange={(e)=>setLength(parseInt(e.target.value))}/>
          </div>
          <div id="result" className="input-container" style={result.length === 0 ? {display: "none"} : {display: "flex"}}>
            <textarea value={result} readOnly></textarea>
          </div>
          <button onClick={handleClick}>Generate</button>
      </div>
    </div>
  )
}

export default App
