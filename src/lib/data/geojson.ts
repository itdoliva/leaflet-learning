export  const loadStatesData = async () => {
  const response = await fetch("https://leafletjs.com/examples/choropleth/us-states.js")
  const jsText = await response.text()

  return new Function(`
    ${jsText};

    if (typeof statesData !== "undefined") {
      return statesData;
    }
    
  `)()
}