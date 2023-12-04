
import DragonJpeg from '../images/dragon.jpeg'

export default function Detail({detailRef, showDetail, setShowDetail, label, meal, favoriteMeal, quantity, addToBasket, minus, plus, mealPrice}) {
  return (
    <div className='detail' ref={detailRef} >
            <div className='dragon'>
                <div className=' flex justify-center items-center gap-4'>
                    <img src={DragonJpeg} alt="" />
                    <p className=' text-[14px]'>{label[0]?.detail?.[0]}</p>
                </div>

                <div className='dragonIcons'>
                    <i onClick={()=>favoriteMeal(meal)} className={ meal?.favorite === "true"  ? 'favorites fa-solid fa-heart ">': 'fa-solid fa-heart'}></i>
                    <i className="fa-solid fa-xmark cursor-pointer" onClick={()=>setShowDetail(!showDetail)}></i>
                </div>
            </div>
            <div>
                <div className='box m-[12px] pb-[14px] flex gap-3 border-b-2 '>
                    <div className='w-[49%]'>
                        <img src={meal?.url} alt="" className=' w-full h-full rounded-[.5rem]' />
                    </div>
                    <div className=' relative'>
                        <div>
                            <h3 className=' text-[14px]'>{meal?.title}</h3>
                            <p className='text-[12px]'>{meal?.descr}</p>
                        </div>
                        <div className=' absolute bottom-0 flex'>
                            <div>
                                
                            </div>
                            <span onClick={()=> minus()} className=' text-[.9rem] pl-[.5rem] pr-[.5rem] mr-[.5rem] rounded-md cursor-pointer select-none bg-slate-300'>-</span>
                            <span>{quantity}</span>
                            <span onClick={() => plus()} className=' text-[.9rem] pl-[.5rem] pr-[.5rem] ml-[.5rem] mr-[.5rem] rounded-md select-none cursor-pointer bg-slate-300'>+</span>
                            <span>{mealPrice * quantity}{meal?.price?.[meal?.price?.length-1]}</span>
                            {quantity > 1? <span className=' flex justify-start items-start text-[.7rem] ml-2 transition-[.4s] text-gray-400'>{meal?.price}</span>: <span></span>}
                        </div>
                    </div>
                </div>
                <div className='pl-[12px] pr-[12px]'>
                <textarea  placeholder={label[0]?.detail?.[1]} className=''></textarea>
                <div className='flex justify-center items-center'>
                    <button className='' onClick={()=> {
                        addToBasket(meal);
                        setShowDetail(false);
                    }}
                    >{label[0]?.detail?.[2]}</button>
                </div>
                
                </div>
                

                <div></div>
            </div>
            
        </div>
  )
}
