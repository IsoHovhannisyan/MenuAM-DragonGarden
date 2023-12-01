import { useEffect, useRef, useState } from 'react'
import img1 from '../images/picture.jpg'
import favoritePNG from '../images/favorite.png'
import '../css/FavoritesPage.css';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import DragonJpeg from '../images/dragon.jpeg';

export function FavoritesPage({currentLanguage, basket, setBasket, allBasketProducts, setAllBasketProducts, label}) {

    const [favoriteMeals, setFavoriteMeals] = useState([]);
    const [favoriteMeal, setFavoriteMeal] = useState({});
    const [showDetail, setShowDetail]= useState(false);
    const [quantity, setQuantity] = useState(1);
    const detailRef = useRef(null);
    const navigate = useNavigate();

    

    let mealPrice = +(favoriteMeal?.price?.split(`${favoriteMeal?.price?.[favoriteMeal?.price?.length-1]}`)[0]);

    const dislikeFunc = async(id, product)=>{
        let id2 = 0;
        if(id<=47){
            await axios.put('https://api-storage-tiaw-pi.vercel.app/meals/'+ id, {
                ...product,
                "favorite": "false"
            })
            id2=id+47;
            const FavMealOnLangChange = await axios.get('https://api-storage-tiaw-pi.vercel.app/meals/'+ id2);
            await axios.put('https://api-storage-tiaw-pi.vercel.app/meals/'+id2,{
                ...FavMealOnLangChange.data,
                "favorite": "false"
            });
        }
        else{
            await axios.put('https://api-storage-tiaw-pi.vercel.app/meals/'+ id, {
                ...product,
                "favorite": "false"
            })
            id2=id-47;
            const FavMealOnLangChange = await axios.get('https://api-storage-tiaw-pi.vercel.app/meals/'+ id2);
            await axios.put('https://api-storage-tiaw-pi.vercel.app/meals/'+id2,{
                ...FavMealOnLangChange.data,
                "favorite": "false"
            });
        }

        setShowDetail(false);
        const filteredFavoriteMeals = favoriteMeals.filter(el => el.id !== id);
        setFavoriteMeals(filteredFavoriteMeals);
    }

    const favoriteMealDetail = async(id)=>{
        const FavMeal = await axios.get('https://api-storage-tiaw-pi.vercel.app/meals/'+ id);
        setFavoriteMeal(FavMeal.data);
    }

    const loadingFavoriteMeals = async()=>{
        const FavMeals = await axios.get('https://api-storage-tiaw-pi.vercel.app/meals');
        setFavoriteMeals(FavMeals.data.filter(el => el.favorite === 'true' && el.lang == currentLanguage));
    }

    useEffect(()=> {
        loadingFavoriteMeals();
        DisabledScroll();
        window.addEventListener("mousedown", handleClickOutSide);
    },[showDetail])

    const DisabledScroll = ()=>{
        if(showDetail) {
            document.body.style.overflow = 'hidden';
        }
        else document.body.style.overflow = 'auto'
    }

      const handleClickOutSide = (e)=> {
        try{
          if(!detailRef.current.contains(e.target)) {
            setShowDetail(false);
            setQuantity(1);
          }
        }catch{
    
        }
    }

    const addToBasket = (product)=>{
        const index = basket.findIndex(el => el.id === product.id);
    
        if(index === -1){
    
            let newProduct = {
                ...product,
                quantity: quantity
            }
    
            setAllBasketProducts(allBasketProducts + quantity);
            setBasket([...basket, newProduct]);
    
        }else{
            let newProduct = basket.map(el=> {
                if(el.id === product.id) el.quantity = el.quantity + quantity;
                    return el;
            });
    
            setAllBasketProducts(allBasketProducts + quantity);
    
            setBasket(newProduct);
        }
      }

    const minus = ()=> {
        if(quantity !== 1){
            setQuantity(quantity - 1);
        }
      }
    
      const plus = ()=> {
        setQuantity(quantity + 1);
      }

  return (
    <div>
        <img src={img1} alt=""/>
        {favoriteMeals == '' ? <div className='FavEmpty transition-none'>
            <h2 className='favH2'>{label[0]?.favorites?.[0]}</h2>
            <img src={favoritePNG} alt="" />
            <div className=' flex justify-center items-center'>
                <div className='LinkDiv' onClick={()=> navigate('/')}>
                     <button className='btn'>{label[0]?.favorites?.[1]}</button>
                </div>
            </div>
            
        </div> : <div>
            <div className=' heading'>{label[0]?.favorites?.[2]}</div>
            <div className='FavoriteMeals transition-none'>
            {
                favoriteMeals.map(el=> <div key={el.id} className='Meal'>
                    <div className='image cursor-pointer' onClick={()=> {
                        favoriteMealDetail(el.id);
                        setShowDetail(!showDetail);
                    }}>
                        <img src={el.url} alt="" />
                    </div>

                    <div className='title'>{el?.title?.length > 20 ? el?.title?.slice(0, 20) + ' ...': el?.title}</div>

                    <div className='PriceAndIcons'>
                        <div className='price'>
                            {el.price}
                        </div>

                        <div className='icons'>
                            <i onClick={()=> dislikeFunc(el.id, el)}  className={ el.favorite !== 'false'  ? 'favorites fa-solid fa-heart ">': 'fa-solid fa-heart'}></i>
                            <i className="fa-solid fa-cart-shopping" onClick={()=> addToBasket(el) }></i>
                        </div>
    
                    </div>
                </div>)
            }
        </div>
        </div>
         }

<div className={showDetail ? 'background active': 'background'}>
        <div className='detail' ref={detailRef} >
            <div className='dragon'>
                <div className=' flex justify-center items-center gap-4'>
                    <img src={DragonJpeg} alt="" />
                    <p className=' text-[14px]'>Դռագոն Գարդեն</p>
                </div>

                <div className='dragonIcons'>
                <i onClick={()=>dislikeFunc(favoriteMeal.id, favoriteMeal)} className={ favoriteMeal.favorite !== 'false'  ? 'favorites fa-solid fa-heart ">': 'fa-solid fa-heart'}></i>
                    <i className="fa-solid fa-xmark cursor-pointer" onClick={()=>setShowDetail(!showDetail)}></i>
                </div>
            </div>
            <div>
                <div className='box m-[12px] pb-[14px] flex gap-3 border-b-2 '>
                    <div className='w-[49%]'>
                        <img src={favoriteMeal?.url} alt="" className=' w-full h-full rounded-[.5rem]' />
                    </div>
                    <div className=' relative'>
                        <div>
                            <h3 className=' text-[14px]'>{favoriteMeal?.title}</h3>
                            <p className='text-[12px]'>{favoriteMeal?.descr}</p>
                        </div>
                        <div className=' absolute bottom-0 flex'>
                            <div>
                                
                            </div>
                            <span onClick={()=> minus()} className=' text-[.9rem] pl-[.5rem] pr-[.5rem] mr-[.5rem] rounded-md cursor-pointer select-none bg-slate-300'>-</span>
                            <span>{quantity}</span>
                            <span onClick={() => plus()} className=' text-[.9rem] pl-[.5rem] pr-[.5rem] ml-[.5rem] mr-[.5rem] rounded-md select-none cursor-pointer bg-slate-300'>+</span>
                            <span>{mealPrice * quantity}{favoriteMeal?.price?.[favoriteMeal?.price?.length-1]}</span>
                            {quantity > 1? <span className=' flex justify-start items-start text-[.7rem] ml-2 transition-[.4s] text-gray-400'>{favoriteMeal?.price}</span>: <span></span>}
                        </div>
                    </div>
                </div>
                <div className='pl-[12px] pr-[12px]'>
                <textarea name="" placeholder='Պատվերի մեկնաբանություն' className=''></textarea>
                <div className='flex justify-center items-center'>
                    <button className='' onClick={()=> {
                        addToBasket(favoriteMeal);
                        setShowDetail(false);
                    }}
                    >Ավելացնել զամբյուղ</button>
                </div>
                
                </div>
                

                <div></div>
            </div>
            
        </div>
     </div>
        
    </div>
  )
}
