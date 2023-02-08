import { Box, Button, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";


const App: React.FC = () => {
  const [input, setInput] = useState("Pizza\nWings\nPasta\nHotpot\nSushi");
  const [items, setItems] = useState<string[]>([]);
  const [index, setIndex] = useState(0)


  const handleSubmit = () => {
    setItems( input.split("\n"))
  };

  const incrementIndex = () => {

    setIndex(s => s === items.length-2 ? 0 : s + 1)
  }


  const handleLeft = () => {
    

    const copy = [...items]
    const temp = copy[index]
    copy[index] = copy[index+1]
    copy[index+1] = temp 
    setItems(copy);
    incrementIndex()
  };

  const handleRight = () => {
    incrementIndex()
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      console.log(`Key pressed: ${event.key}`);

      if (event.key === "ArrowLeft") {
        handleLeft()
      }

      if (event.key === "ArrowRight") {
        handleRight()
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleLeft, handleRight]);

  

  return (
    <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: "64px"}} >
      <br/>
      <p>Enter a list of items, each item on a new line</p>
      <textarea value={input} onChange={e => setInput(e.target.value)} rows={10}/>
      <br/>
      <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      <br/>
      <br/>
      {items.length > 0 && (
        <div>
          <div>
            {items[index]} or {items[index+1]}
          </div>
          <br/>
          <Stack direction={"row"} spacing={2}>
            <Button variant="contained" onClick={handleLeft}>Left</Button>
            <Button variant="contained" onClick={handleRight}>Right</Button>
          </Stack>
          
        </div>
      )}
      
      {items.length > 0 && (
        <div>
          <p>Your Rankings: </p>
          <ol>
          {items.map((i, index) => <li key={i}>{i}</li>)}
          </ol>
          
        </div>)}
    </Box>
    )
}


export default App