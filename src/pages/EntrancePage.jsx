import React from 'react';
import '../css/EntrancePage.css';
import BurgerPng from '../images/burger.png';
import Logo from '../images/logo.png'


export  function EntrancePage({label}) {

   
  return (
    <div className='entrance'>
        <div className='burgerpicture'>
            <img src={BurgerPng} alt="" className='burger-img'/>
        </div>
     
           <form className="form">
              <div className='logo'>
                <img src={Logo} alt="" className=' mb-[.5rem]'/>
              </div>
               <h2 className='text-[1.6rem] font-bold  mb-[2rem]'>{label[0]?.entrancePage?.[0]}</h2>
               <p className=' text-[12px] pb-2'>{label[0]?.entrancePage?.[1]}</p>
               <input type="number" placeholder={label[0]?.entrancePage?.[2]} className=' border-solid border-slate-300 pt-[3px] pb-[3px] pl-[7px] text-[12px] rounded-[.5rem] w-full mb-3'/>
               <p className=' text-[12px] pb-2'>{label[0]?.entrancePage?.[3]}</p>
               <input type="password" placeholder={label[0]?.entrancePage?.[4]} className=' border-solid border-slate-300 pt-[3px] pb-[3px] pl-[7px] text-[12px] rounded-[.5rem] w-full mb-3'/>
               <p className='text-[13px] text-right pb-2 underline pl-[5rem]'>{label[0]?.entrancePage?.[5]}</p>
               <input type="submit" value={label[0]?.entrancePage?.[6]} className='bg-red-700 text-[.9rem] py-2 px-[7rem] rounded-xl text-white font-bold w-full'/>
               <div className='continue'>
                <div className='solid'></div><p className='text-[1rem] w-[39%] text-center'>{label[0]?.entrancePage?.[7]}</p><div className='solid'></div>
               </div>
               <a href="https://www.facebook.com/" className='bg-blue-700 py-2 text-[.9rem] px-[7rem] rounded-xl text-white font-bold cursor-pointer  flex justify-center items-center gap-3'> <i className="fa-brands fa-facebook"></i> Facebook</a>
               <a href="https://www.facebook.com/" className=' bg-slate-300 py-2 text-[.9rem] px-[7rem] rounded-xl text-gray-600 font-bold cursor-pointer flex justify-center items-center gap-3'> <i className="fa-brands fa-google"></i> Google</a>
             
               <input type="checkbox" id="checkbox1" className='w-[1rem] pt-[500px]'/>
               <label for="checkbox1" className='ml-[7px] text-[10px]'>{label[0]?.entrancePage?.[8]} <a href="# "className="terms-and-conditions" to='#'><span className=' text-red-700'>{label[0]?.entrancePage?.[9]}</span></a></label>
               
            <div className='robot'>
               <input type ="checkbox"  className='mr-2'/>{label[0]?.entrancePage?.[10]}  <i className="fa-solid fa-robot"></i>
            </div>
            
            </form>

          

        </div>

  )
}
