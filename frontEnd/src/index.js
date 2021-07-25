import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(<BrowserRouter> <App/> </BrowserRouter>, document.getElementById('root'));
/* ALLOWS FOR THE REACT APP TO BE RUN WRAPPED IN A BROWSERROUTER COMPONENT, THIS MEANS
THAT THE APP CAN UTILIZE ROUTE AND LINK COMPONENTS (ALLOWS TO SWITCH BETWEEN PAGES) */