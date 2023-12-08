import { useRef,useState,useEffect } from 'react'
import { NavLink  as Link} from "react-router-dom";
import { SelectLanguage } from "./SelectLanguage";
import logoPNG from '../images/logo.png'
import '../css/Header.css';

export default function LoggedInHeader({basket, setBasket, allBasketProducts, setAllBasketProducts,label, currentLanguage}) {
    const basketRef = useRef(null);
  const [showBasket, setShowBasket]=useState(false);


  const total = basket?.reduce((sum,el) => sum+el?.price?.split(`${el.price[el.price.length-1]}`)[0]*el?.quantity, 0)

  useEffect(()=> {
    window.addEventListener("mousedown", handleClickOutSide)
  })

  const handleClickOutSide = (e)=>{
    try{
      if(!basketRef.current.contains(e.target)) setShowBasket(!showBasket);
    }catch{}
  }

  const deleteProduct = (id)=> {
    const filteredBasket = basket?.filter(el => {
      if(el.id === id){
        setAllBasketProducts(allBasketProducts - el.quantity);
      }
      if(el.quantity === 0){
        setAllBasketProducts(allBasketProducts-1);
      }
      return el.id !== id
    });
    setBasket(filteredBasket); 
  }

  const plus = (id)=>{
    const newBasket = basket?.map(el => {
      if(el?.id === id) el.quantity = el.quantity + 1;
      return el
    } )
    setAllBasketProducts(allBasketProducts+1);
    setBasket(newBasket);
  }

  const minus = (id)=>{
    const newBasket = basket?.map(el => {
      if(el?.id === id) el.quantity = el.quantity - 1;
      return el
    } );
    setAllBasketProducts(allBasketProducts-1);
    setBasket(newBasket);

    basket.filter(el=> {
      if(el?.quantity === 0) {
        return deleteProduct(id);
      }
    })
  }


  return (
    <div className="Header z-10">
      
    <div className="left">
      <Link to='/' className='Logo'><img src={logoPNG} alt="" /></Link>
      <input type="text" placeholder={label[0]?.header?.[0]} className="Headerinput"/>
    </div>

    <div className="right">

      <div className="Basket relative" onClick={()=>setShowBasket(!showBasket)}>
        <div>
          <i className="fa-solid fa-cart-shopping"></i>
          <div>{allBasketProducts > 0 ? <div className="basketIcone"> <span className=" basketSpan">{allBasketProducts}</span></div>: <div className=" basketicone"></div>}</div>
        </div>
      </div>
      <Link to={`/favorites`}>
        <div className="Heart">
          <i className="fa-solid fa-heart"></i>
        </div>

      </Link>
      <div className="selectLanguage">
        <SelectLanguage currentLanguage={currentLanguage} />
      </div>
      <button className='log_out'><i className="fa-solid fa-right-from-bracket"></i></button>
      
         
      {
        showBasket && <div className="BasketShow absolute top-[4rem] right-[4.5rem] bg-white w-[30rem] h-[25rem] text-white  rounded flex justify-center items-center flex-col"
        ref={basketRef}
        >
          {
            basket == '' ? <div className=" relative w-full h-full flex justify-center items-center m-auto">
            <i className=" absolute top-0 right-0 text-black fa-solid fa-xmark cursor-pointer" onClick={()=>setShowBasket(!showBasket)}></i>  
            <div>
              <div className="EmptyBasket text-black font-bold text-xl mb-12 text-center">{label[0]?.basket?.[0]}</div>
              <div className="BasketIcon flex justify-center items-center"><i className="fa-solid fa-cart-shopping"></i></div>
            </div>
            
          </div>: <div className=" relative w-full h-full">
                  
          <i className=" absolute top-0 right-0 text-black fa-solid fa-xmark cursor-pointer z-10" onClick={()=>setShowBasket(!showBasket)}></i>

                  <div className=" Products relative w-full h-[80%] overflow-auto p-[1rem] ">
                    {
                      basket.map(el => <div className=" box flex justify-between items-center relative">
                        <div className=" flex gap-[.5rem]">
                          <div className="image w-[15%] rounded-md relative">
                            <img src={el.url} alt="" className=" w-full rounded-md " />
                            <div><i className="fa-solid fa-minus absolute right-[-4px] top-[-6px] bg-gray-300 text-gray-500 p-[.1rem] text-[10px] rounded-full cursor-pointer" onClick={()=> deleteProduct(el.id)}></i></div>
                          </div>
                          <span className=" title text-black text-[.8rem] font-[500]">{el.title.length > 30 ? el.title.slice(0,30) + '...': el.title}</span>
                        </div>

                        <div className=" right text-black w-[30%] h-full">
                          <div className=" text-right  absolute top-1 right-0">{el.price.split(`${el.price[el.price.length-1]}`)[0] * el.quantity}{el.price[el.price.length-1]}</div>
                          <div className=" select-none text-right absolute right-0 bottom-2 w-[20%] flex justify-between items-center">
                            <span onClick={()=> minus(el.id)} className=" span cursor-pointer text-[.9rem] pb-[.15rem] pl-[.5rem] pr-[.5rem] text-left rounded-md bg-slate-300">-</span>
                            <span className=" span w-[50%] text-center text-[.8rem]">{el.quantity}</span>
                            <span onClick={()=> plus(el.id)} className=" span cursor-pointer text-[.9rem] pb-[.15rem] pl-[.5rem] pr-[.5rem] text-right rounded-full  bg-slate-300">+</span>
                          </div>
                        </div>
              
                      </div>)
                    }
                  </div>

                  <div className=" Total sticky bottom-0 left-0  text-black h-[19%]">
                    <div className=" flex justify-between items-center">
                      <span>{label[0]?.basket?.[1]}</span>
                      <span> {total}{basket[0]?.price[basket[0].price.length-1]}</span>
                    </div>
                    <div className="flex justify-center items-center">
                      <button className=" text-center">{label[0]?.basket?.[2]}</button>
                    </div>
                    
                  </div> 
          
                  </div> 
          }
          
          </div>
          
         
      }

    </div>
    
    </div>

    
  
  )
}