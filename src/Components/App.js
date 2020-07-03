import React from 'react';
import Router from "Components/Router"
import GlobalStyles from "Components/GlobalStyles"
import Theme from 'Components/Theme';

function App() {
  return (
    <>
      <Router/>
      <GlobalStyles theme={Theme}/>
    </>
  );
}

export default App;
