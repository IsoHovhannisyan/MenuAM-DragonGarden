import React from 'react';
import '../css/RegisterPage.css'
import BurgerPng from '../images/burger.png';
import Logo from '../images/logo.png'


export function RegisterPage({label}) {


  return (
    <div className='register flex justify-center items-center relative top-0 left-0 right-0 bg-white'>
    <div className='burgerpicture'>
            <img src={BurgerPng} alt="" className='burger-img'/>
        </div>
     
           <form className="form">
              <div className='logo'>
                <img src={Logo} alt="" className=' mb-[.5rem]'/>
              </div>
               <h2 className='text-[1.6rem] font-bold  mb-[1rem]'>{label[0]?.registerPage?.[0]}</h2>
               <p className=' text-[12px] pb-2'> {label[0]?.registerPage?.[1]} </p>
               <input type="number" placeholder="+374 55 55 55" className=' border-solid border-slate-300 pt-[3px] pb-[3px] pl-[7px] text-[12px] rounded-[.5rem] w-full mb-3'/>
               <p className=' text-[12px] pb-2'>{label[0]?.registerPage?.[2]} </p>
               <input type="number" placeholder={label[0]?.registerPage?.[3]} className=' border-solid border-slate-300 pt-[3px] pb-[3px] pl-[7px] text-[12px] rounded-[.5rem] w-full mb-3'/>
               <p className='text-[12px] pb-2'>{label[0]?.registerPage?.[4]}</p>
               <input type="password" placeholder={label[0]?.registerPage?.[5]} className=' border-solid border-slate-300 pt-[3px] pb-[3px] pl-[7px] text-[12px] rounded-[.5rem] w-full mb-3' />
               <p className='text-[12px] pb-2'>{label[0]?.registerPage?.[6]}</p>
               <input type="password" placeholder={label[0]?.registerPage?.[7]} className=' border-solid border-slate-300 pt-[3px] pb-[3px] pl-[7px] text-[12px] rounded-[.5rem] w-full mb-3' />

               <input type="checkbox" id="checkbox1" className='w-[1rem] pt-[500px]'/>
               <label for="checkbox1" className='ml-[7px] text-[10px]'>{label[0]?.registerPage?.[8]} <a href="# "className="terms-and-conditions" to='#'><span className=' text-red-700'>{label[0]?.registerPage?.[9]}</span></a></label>
              
              <div className='robot mb-[10px]'>
               <input type ="checkbox"  className='mr-2'/>{label[0]?.registerPage?.[10]}  <i className="fa-solid fa-robot"></i>
              </div>

               <input type="submit" value={label[0]?.registerPage?.[11]} className='bg-red-700 text-[.9rem] py-2 text-center rounded-xl text-white font-bold w-full'/>
              <div className='continue'>
                <div className='solid'></div><p className='text-[1rem] w-[39%] text-center'>{label[0]?.registerPage?.[12]}</p><div className='solid'></div>
              </div>
               <a href="https://www.facebook.com/" className='bg-blue-700 py-2 text-[.9rem] px-[7rem] rounded-xl text-white font-bold cursor-pointer  flex justify-center items-center gap-3'> <i className="fa-brands fa-facebook"></i> Facebook</a>
               <a href="https://www.facebook.com/" class=' bg-slate-300 py-2 text-[.9rem] px-[7rem] rounded-xl text-gray-600 font-bold cursor-pointer flex justify-center items-center gap-3'> <i className="fa-brands fa-google"></i> Google</a>
             
               
            
            </form>
    </div>

  )
}
