
import GooglePng from '../images/google-play.png'
import AppStorePng from '../images/app-store.png';
import Visa from '../images/visa.avif';
import '../css/Footer.css'


export function Footer({label}) {

  return (
    <div className='Footer w-[100%] h-[21rem] mt-[5rem] bg-slate-50 shadow-inner shadow-slate-500 '>
    

      <div className='clients flex justify-between p-[2rem]'>

      <div>
      <h2 className=' font-bold pb-[.5rem]'>{label[0]?.footer?.[0]}</h2>
      <p><a href="#">{label[0]?.footer?.[1]}լ</a></p>
      </div>

      <div>
      <h2 className=' font-bold pb-[.5rem]'>{label[0]?.footer?.[2]}</h2>
      <p><a href="#">{label[0]?.footer?.[3]}</a></p>
      </div>

      <div>
      <h2 className=' font-bold pb-[.5rem]'>{label[0]?.footer?.[4]}</h2>
      <p className=' leading-8'><a href="#">{label[0]?.footer?.[5]}</a></p>
      <p className=' leading-8'><a href="#">{label[0]?.footer?.[6]}</a></p>
      <p className=' leading-8'><a href="#">{label[0]?.footer?.[7]}</a></p>
      <p className=' leading-8'><a href="#">{label[0]?.footer?.[8]}</a></p>
      </div>

      <div>
      <h2 className=' font-bold pb-[.5rem]'>{label[0]?.footer?.[9]}</h2>
      <p><a href="#">{label[0]?.footer?.[10]}</a></p>
      </div>

      </div>
      
      <div className='social flex gap-[13rem] pl-[2rem] pb-[2rem]'>

        <div className='follow'>

        <h2 className=' font-bold pb-[.5rem]'>{label[0]?.footer?.[11]}</h2>

        <div className='icons flex items-center gap-4 mt-[1rem]'>

        <div className='round w-8 h-8 border-solid border-2 border-red-600 rounded-full text-center text-red-600'><a href="https://www.linkedin.com/showcase/menu-am/about/"><i className="fa-brands fa-linkedin-in"></i></a></div>
        <div className='round w-8 h-8 border-solid border-2 border-red-600 rounded-full text-center text-red-600'><a href="https://www.instagram.com/menu.am/"><i className="fa-brands fa-square-instagram"></i></a></div>
        <div className='round w-8 h-8 border-solid border-2 border-red-600 rounded-full text-center text-red-600'><a href="https://www.facebook.com/www.menu.am/"><i className="fa-brands fa-facebook-f"></i></a></div>
        <div className='round w-8 h-8 border-solid border-2 border-red-600 rounded-full text-center text-red-600'><a href="https://www.facebook.com/www.menu.am/"><i className="fa-brands fa-tiktok"></i></a></div>
        <div className='round w-8 h-8 border-solid border-2 border-red-600 rounded-full text-center text-red-600'><a href="https://www.youtube.com/c/MenuAm222000"><i className="fa-brands fa-youtube"></i></a></div>

        </div>

        </div>

      <div className='pay_methods'>
      <h2 className=' font-bold pb-[.5rem]'>{label[0]?.footer?.[12]}</h2>
      <div className='cards pt-[1rem] flex gap-[1rem]'>
        <div className=' w-[2rem] h-[2rem]'><img src={Visa} alt="" /></div>
        <div className=' w-[2rem] h-[2rem]'><img src={Visa} alt="" /></div>
        <div className=' w-[2rem] h-[2rem]'><img src={Visa} alt="" /></div>
        <div className=' w-[2rem] h-[2rem]'><img src={Visa} alt="" /></div>
        <div className=' w-[2rem] h-[2rem]'><img src={Visa} alt="" /></div>
        <div className=' w-[2rem] h-[2rem]'><img src={Visa} alt="" /></div>
      
      </div>
      </div>

      <div className='picture flex w-[5rem] h-[2rem] gap-2 mt-[1rem]'>
        <img src={GooglePng} alt="" className='img'/>
        <img src={AppStorePng} alt="" className='img'/>
      </div>


      </div>
     
     
      <div className='protect bg-red-700 h-[3rem]'>
        <p className='text-white font-bold text-xs p-[.5rem]'>{label[0]?.footer?.[13]}</p>
      </div>

    </div>

    
  )

}

