
import '../css/Meals.css';

export function Meals({meals, favoriteMeal, categoriesArr, showDetail, setShowDetail, mealById, addToBasket}) {

  return (
    <div>
        {
            
            categoriesArr.map((elem,index) => {
                return <div key={index}>                      
                    <h2 className='CategoryName'>{elem}</h2>
                    <div className='Meals'>
                        {
                            meals.map((el) => {
                                if(elem === el.category){
                                    return <div key={el.id} className='Meal'>
                                                <div className='image cursor-pointer'  onClick={()=> {
                                                setShowDetail(!showDetail);
                                                mealById(el.id);
                                                }}>
                                                    <img src={el.url} alt="" />
                                                </div>
                
                                                <div className='title'>{el.title.length > 20 ? el.title.slice(0, 20) + ' ...': el.title}</div>
                
                                                <div className='PriceAndIcons'>
                                                    <div className='price'>
                                                        {el.price}
                                                    </div>

                                                    <div className='icons'>
                                                        <i onClick={()=>favoriteMeal(el.id, el)} className={ el.favorite !== 'false'  ? 'favorites fa-solid fa-heart ">': 'fa-solid fa-heart'}></i>
                                                        <i className="fa-solid fa-cart-shopping" onClick={()=> addToBasket(el) }></i>
                                                    </div>
                                    
                                                </div>
                                    </div>
                                }
                            })
                        }
                    </div>
                </div>
            })
        }
    </div>
  )
}
