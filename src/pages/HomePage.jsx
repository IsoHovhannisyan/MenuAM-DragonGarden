
import axios from 'axios';
import '../css/HomePage.css';
import { useState, useEffect, useRef } from 'react';
import { Meals } from '../components/Meals';
import { Salads } from '../components/Salads';
import { Soups } from '../components/Soups';
import ChickenDishes from '../components/ChickenDishes';
import { VealDishes } from '../components/VealDishes';
import { PorkDishes } from '../components/PorkDishes';
import PictureJpg from '../images/picture.jpg'
import DragonJpeg from '../images/dragon.jpeg';
import SearchMeals from '../components/SearchMeals';
import Detail from '../components/Detail';


export  function HomePage({currentLanguage, basket, setBasket, allBasketProducts, setAllBasketProducts, label}) {

  const [meals, setMeals] = useState([]);
  const [meal, setMeal] = useState({});
  const [filteredMeals, setfilteredMeals] = useState([]);
  const [filteredSearchMeals, setFilteredSearchMeals] = useState([]);
  const [searchValue, setSearchValue]= useState('');
  const [notFoundValue, setNotFoundValue] = useState('');
  const [toggle, setToggle] = useState(1);
  const [showDetail, setShowDetail] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [categoryName, setCategoryName] = useState('');
  const detailRef = useRef();
  
  let mealPrice = +(meal?.price?.split(`${meal?.price?.[meal?.price?.length-1]}`)[0]);

  let filteredCategories = new Set(meals.map(el=> el.category));
  let categoriesArr = [...filteredCategories];
  


  useEffect(()=> {
      loadingMeals();
      DisabledScroll();
      window.addEventListener("mousedown", handleClickOutSide);
  },[showDetail]);

  useEffect(()=>{
    const interval = setInterval(() => {
        searchMeal(searchValue);
        MealByCategory(categoryName);
    }, 50);

    return () => clearInterval(interval);

  })

  const loadingMeals = async()=> {
      const MealsData = await axios.get('https://api-storage-tiaw-pi.vercel.app/meals');
      const MealsLang = MealsData.data.filter(el => el.lang === currentLanguage && el.category !== 'Label')
      setMeals(MealsLang);

      
  }

  const mealById = async(id)=>{
    const Meal = await axios.get('https://api-storage-tiaw-pi.vercel.app/meals/'+ id);
    setMeal(Meal.data);
  }

  const MealByCategory = (name)=> {
      const FilteredMeals = meals.filter((el)=> el.category == name);
      setfilteredMeals(FilteredMeals);
      setCategoryName(name);
  }

  const searchMeal = (value) => {
            setNotFoundValue('')
            const SearchMeal = meals.filter(el => el.category.toLowerCase().includes(value.toLowerCase()));
            setFilteredSearchMeals(SearchMeal);
            setSearchValue(value);
            if(SearchMeal.length === 0){
                if(currentLanguage == 'en')
                setNotFoundValue('0 results for ' + '"' + value.toUpperCase() + '"');
                if(currentLanguage == 'am')
                setNotFoundValue('0 արդյունք ' + '"' + value.toUpperCase() + '"-ի համար');
            }

            
    }
    



  const favoriteMeal = async(id, product)=>{
    let id2 = 0;
    if(id <=47){
        if(product.favorite == 'false'){
            await axios.put('https://api-storage-tiaw-pi.vercel.app/meals/'+ id, {
            ...product,
            "favorite": "true"
        });
        id2 = id + 47;
        const FavMealOnLangChange = await axios.get('https://api-storage-tiaw-pi.vercel.app/meals/'+ id2);
        await axios.put('https://api-storage-tiaw-pi.vercel.app/meals/'+ id2,{
            ...FavMealOnLangChange.data,
            "favorite": "true"
        })
        }else{
            await axios.put('https://api-storage-tiaw-pi.vercel.app/meals/'+ id, {
            ...product,
            "favorite": "false"
        });
        id2 = id + 47;
        const FavMealOnLangChange = await axios.get('https://api-storage-tiaw-pi.vercel.app/meals/'+ id2);
        await axios.put('https://api-storage-tiaw-pi.vercel.app/meals/'+id2,{
            ...FavMealOnLangChange.data,
            "favorite": "false"
        });
        
        }
    }
    else{
        if(product.favorite == 'false'){
            await axios.put('https://api-storage-tiaw-pi.vercel.app/meals/'+ id, {
            ...product,
            "favorite": "true"
        });
        id2 = id - 47;
        const FavMealOnLangChange = await axios.get('https://api-storage-tiaw-pi.vercel.app/meals/'+ id2);
        await axios.put('https://api-storage-tiaw-pi.vercel.app/meals/'+ id2,{
            ...FavMealOnLangChange.data,
            "favorite": "true"
        })
        }else{
            await axios.put('https://api-storage-tiaw-pi.vercel.app/meals/'+ id, {
            ...product,
            "favorite": "false"
        });
        id2 = id - 47;
        const FavMealOnLangChange = await axios.get('https://api-storage-tiaw-pi.vercel.app/meals/'+ id2);
        await axios.put('https://api-storage-tiaw-pi.vercel.app/meals/'+id2,{
            ...FavMealOnLangChange.data,
            "favorite": "false"
        });
        
        }
    }

    loadingMeals();
    mealById(id);
    
}

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
     <img src={PictureJpg} alt=""/>
     <div className='Homepage'>
                
                <div className='Left'>
                    <div className='Dragon-Garden '>
                        <img src={DragonJpeg} alt="" />
                        <div className=' flex justify-between items-center mb-[.4rem] mt-[.2rem]'>
                            <div className=' font-semibold'>{label[0]?.homepPageDragon?.[0]}</div>
                            <div><i className="fa-solid fa-star"></i><span>4.7</span></div>
                        </div>
                        <div className=' flex justify-between items-center mb-[.1rem]'>
                            <div className=' text-[.7rem]'>
                            {label[0]?.homepPageDragon?.[1]}
                            </div >
                            <div className=' text-[.7rem]'>{label[0]?.homepPageDragon?.[2]}</div>
                        </div>
                        <div className=' flex justify-between items-center '>
                            <div className=' text-[.7rem]'>
                            {label[0]?.homepPageDragon?.[3]}
                            </div>
                            <div className=' text-[.7rem]'>11:00-00:40</div>
                        </div>
                    </div>
                    <div className='Category'>
                        
                        <div className='SearchDiv'>
                            <i className="SearchIcone fa-solid fa-magnifying-glass"></i>
                            <input type="text"
                             placeholder={label[0]?.homePageSearch?.[0]}
                             className='Search'
                             onClick={()=> setToggle(0)}
                             onChange={(e)=> searchMeal(e.target.value)}
                             />
                        </div>
                        <div>
                            <button onClick={()=> setToggle(1)} className={toggle === 1 ? 'btn-color': 'btn'}>{label[0]?.homepPageCategory?.[0]} </button>
                        </div>
                        {
                            categoriesArr.map((el, index) => <div key={index} >
                                <button value={el} className={toggle === index+2 ? 'btn-color': 'btn'} onClick={(e)=> {
                                setToggle(index+2);
                                MealByCategory(e.target.value);
                                }}> 
                                {el}
                                </button>
                            </div>)
                        }
                    </div>
                </div>
                    
                
                <div className='Components'>
                    <div className={toggle === 0 ? "box show": 'box'}> {notFoundValue || <SearchMeals  filteredSearchMeals={filteredSearchMeals}  showDetail={showDetail} setShowDetail={setShowDetail} mealById={mealById}  addToBasket={addToBasket} favoriteMeal={favoriteMeal} />}</div>
                    <div className={toggle === 1 ? "box show": 'box'}> {<Meals  meals={meals} categoriesArr={categoriesArr} showDetail={showDetail} setShowDetail={setShowDetail} mealById={mealById} addToBasket={addToBasket} favoriteMeal={favoriteMeal} setMeals={setMeals} />}</div>
                    <div className={toggle === 2 ? "box show": 'box'}> {<Salads filteredMeals={filteredMeals} showDetail={showDetail} setShowDetail={setShowDetail} mealById={mealById}  addToBasket={addToBasket} favoriteMeal={favoriteMeal}/>}</div>
                    <div className={toggle === 3 ? "box show": 'box'}> {<Soups filteredMeals={filteredMeals} showDetail={showDetail} setShowDetail={setShowDetail} mealById={mealById}  addToBasket={addToBasket} favoriteMeal={favoriteMeal}/>}</div>
                    <div className={toggle === 4 ? "box show": 'box'}> {<ChickenDishes filteredMeals={filteredMeals} showDetail={showDetail} setShowDetail={setShowDetail} mealById={mealById}  addToBasket={addToBasket} favoriteMeal={favoriteMeal}/>}</div>
                    <div className={toggle === 5 ? "box show": 'box'}> {<VealDishes filteredMeals={filteredMeals} showDetail={showDetail} setShowDetail={setShowDetail} mealById={mealById}  addToBasket={addToBasket} favoriteMeal={favoriteMeal}/>}</div>
                    <div className={toggle === 6 ? "box show": 'box'}> {<PorkDishes filteredMeals={filteredMeals} showDetail={showDetail} setShowDetail={setShowDetail} mealById={mealById}  addToBasket={addToBasket} favoriteMeal={favoriteMeal}/>}</div>
                </div>
     </div>

     <div className={showDetail ? 'background active': 'background'}>
        <Detail detailRef={detailRef} showDetail={showDetail} setShowDetail={setShowDetail} label={label} meal={meal} favoriteMeal={favoriteMeal} quantity={quantity} addToBasket={addToBasket} minus={minus} plus={plus} mealPrice={mealPrice}/>
     </div>
    
    </div>

  )
}
