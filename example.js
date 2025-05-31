function Counter() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  const handleRapidUpdates = () => {
    // Rapid succession of updates
    setCount1(c => c + 1);
    setCount2(c => c + 2);
    setCount3(c => c + 3);
    
    // More updates in the same tick
    setTimeout(() => {
      setCount1(c => c + 10);
      setCount2(c => c + 20);
    }, 0);
  }
}