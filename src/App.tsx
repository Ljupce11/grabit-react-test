import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';

import { ErrorMessageContext } from './context/ErrorMessageContext';
import { Navbar } from './components/shared/Navbar/Navbar';
import { ErrorModal } from './components/shared/ErrorModal/ErrorModal';
import { Dashboard } from './components/main/Dashboard/Dashboard';
import { BucketDetails } from './components/main/BucketDetails/BucketDetails';

function App() {
  const [errorMessage, setErrorMessage] = useState(null)

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        {
          errorMessage &&
          <ErrorModal
            errorMessage={errorMessage}
            show={errorMessage ? true : false}
            onHide={() => setErrorMessage(null)} />
        }
        <Switch>
          <ErrorMessageContext.Provider value={{ errorMessage, setErrorMessage }}>
            <Route exact path="/" component={Dashboard} />
            <Route path="/buckets/:bucketId" component={BucketDetails} />
          </ErrorMessageContext.Provider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
