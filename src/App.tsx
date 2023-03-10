import { Box, Button, Stack } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";


const App: React.FC = () => {
  const [input, setInput] = useState("Pizza\nWings\nPasta\nHotpot\nSushi");
  const [items, setItems] = useState<string[]>([]);
  const [index, setIndex] = useState(0)


  const handleSubmit = () => {
    setItems( input.split("\n").reverse())
  };

  const incrementIndex = useCallback(() => {

    setIndex(s => s === items.length-2 ? 0 : s + 1)
  }, [setIndex, items])


  const handleLeft = useCallback(() => {
    const copy = [...items]
    const temp = copy[index]
    copy[index] = copy[index+1]
    copy[index+1] = temp 
    setItems(copy);
    incrementIndex()
  }, [setItems, incrementIndex, items, index])

  const handleRight = useCallback(() => {
    incrementIndex()
  }, [incrementIndex])


  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
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
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
          <Stack direction={"row"} spacing={2}>
            <Button variant="contained" onClick={handleLeft}>{items[index]}</Button>
            <p>or</p>
            <Button variant="contained" onClick={handleRight}>{items[index+1]}</Button>
          </Stack>
          <p>Press left or right arrow keys on desktop</p>
          
        </Box>
      )}
      
      {items.length > 0 && (
        <div>
          <p>Your Rankings: </p>
          <ol>
          {[...items].reverse().map((i, index) => <li key={i}>{i}</li>)}
          </ol>
          
        </div>)}
    </Box>
    )
}


export default App