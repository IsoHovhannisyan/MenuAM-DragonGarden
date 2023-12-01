import { useEffect, useState} from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from './pages/HomePage';
import { EntrancePage } from "./pages/EntrancePage";
import { RegisterPage } from "./pages/RegisterPage";
import { Footer } from './components/Footer';
import { FavoritesPage } from "./pages/FavoritesPage";
import { Header } from "./components/Header";
import axios from "axios";




export function App() {

  const currentLanguage = localStorage.getItem('menu-Language') || 'en';

  const [basket, setBasket] = useState([]);
  const [allBasketProducts, setAllBasketProducts] = useState(0);
  const [label, setLabel] = useState([]);


  const loadingLabel = async()=>{
    const All = await axios.get('https://api-storage-tiaw-pi.vercel.app/meals');
    const Label = All.data.filter(el=> el.category == 'Label' && el.lang == currentLanguage);
    setLabel(Label);

  }

  useEffect(()=>{
    loadingLabel();
  },[])


  return (
    <div className="App">
      <Header basket={basket} setBasket={setBasket} allBasketProducts={allBasketProducts} setAllBasketProducts={setAllBasketProducts} label={label} />
      <Routes>
        <Route path='/' element={<HomePage currentLanguage={currentLanguage} basket={basket} setBasket={setBasket} allBasketProducts={allBasketProducts} setAllBasketProducts={setAllBasketProducts} label={label}/>}/>
        <Route path='/entrance' element={<EntrancePage currentLanguage={currentLanguage} label={label}/>} />
        <Route path='/register' element={<RegisterPage currentLanguage={currentLanguage} label={label}/>} />
        <Route path='/favorites' element={<FavoritesPage currentLanguage={currentLanguage}  basket={basket} setBasket={setBasket} allBasketProducts={allBasketProducts} setAllBasketProducts={setAllBasketProducts} label={label}/>} />
      </Routes>
      <Footer label={label}/>
    </div>
  )
}

