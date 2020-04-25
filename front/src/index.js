import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore} from 'redux'; 
import {Provider} from 'react-redux'; //Provider (store) englobe l'application entière 
import reducer from './reducer/reducer';
const store = createStore(reducer)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

