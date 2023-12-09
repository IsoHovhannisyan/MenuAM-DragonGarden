import { useState, useEffect } from 'react';
import '../css/RegisterPage.css'
import BurgerPng from '../images/burger.png';
import Logo from '../images/logo.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast} from 'react-hot-toast';


export function RegisterPage({label, setEntry}) {

  const [phoneNumber, setPhoneNumber] = useState("");
  const [resPhoneNumber, setResPhoneNumber]= useState(false);
  const [email, setEmail] = useState("");
  const [resEmail, setResEmail] = useState(false);
  const [password, setPassword]= useState("");
  const [resPassword, setResPassword]= useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resConfirmPassword, setResConfirmPassword] = useState(false)

  const [errMessage, setErrMessage] = useState('');
  const [resErrMessage, setResErrMessage] = useState(false);
  const [registeredMsg, setRegisteredMsg]= useState(false);

  const navigate = useNavigate();

  

  const phoneNumberFunc = (value)=>{
    if(value.split('374').indexOf('') === 0 && value.length === 11){
      setResPhoneNumber(true);
     }else{
      setResPhoneNumber(false);
     }
     setPhoneNumber(value);
  }

  const emailFunc = (value)=>{
    if(value.includes('@') && value[0] !== '@' && value.split('@')[1] == "mail.ru" || value.split('@')[1] == "gmail.com"){
      setResEmail(true)
    }else{
      setResEmail(false)
    }

    setEmail(value)
  };

  const passwordFunc = (value)=>{

    if(!value.includes(' ') && value.length >= 4){
      setResPassword(true);
    }else{
      setResPassword(false);
    }
    ConfirmPwd(confirmPassword);
    setPassword(value);
    
  }

  const ConfirmPwd = (value)=>{
    if(value === password){
      setResConfirmPassword(true)
    }
    else{
      setResConfirmPassword(false)
    }

    setConfirmPassword(value);
  }

  const submitHandler = async(e)=>{
    e.preventDefault();

    if(resPhoneNumber && resEmail && resPassword && resConfirmPassword){
      const registerUser = {
        name: email.split('@')[0],
        email,
        password,
      }
      try{
        toast.loading('Sending Request', {id: 1});
          const User = await axios.post("https://menuam-backend-register-and-login.vercel.app/api/user/register", registerUser,{
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        });
        toast.success('Success', {id: 1});

        setRegisteredMsg(true);
        setEntry(true);
        localStorage.setItem('entry', true);
        


      }catch(err){
        if(err.response.status == 409){
          setErrMessage(label[0]?.errorMessage?.[0]);
          setResErrMessage(true)
        }
      }
    }else{
      setErrMessage(label[0]?.errorMessage?.[1]);
      setResErrMessage(true);
    }

  }

  console.log(resEmail);

  useEffect(()=>{
    window.scroll({ top: 0 })
},[])



  return (

    <>
      <Toaster />
     {registeredMsg ? <div className='w-[100%] h-[500px]'>
            <div className=' flex justify-center items-center w-full h-full'>
              <i className=" text-[10rem] fa-solid fa-check text-green-600"></i>
            </div>
            <div className=' w-full flex justify-center items-center'>
              <button className='GoToHomePageBtn' onClick={()=>navigate('/')}>{label[0]?.favorites?.[1]}</button>
            </div>
            
            </div>:
            <div className='register flex justify-center items-center relative top-0 left-0 right-0 bg-white'>
            <div className='burgerpicture'>
                    <img src={BurgerPng} alt="" className='burger-img'/>
                </div>
                    <form className="form" onSubmit={submitHandler}>
                    <div className='logo'>
                      <img src={Logo} alt="" className=' mb-[.5rem]'/>
                    </div>
                     <h2 className='text-[1.6rem] font-bold  mb-[1rem]'>{label[0]?.registerPage?.[0]}</h2>
                     {resErrMessage && <h2 className=' text-red-500 text-[1rem] mb-[.5rem]'>{errMessage}</h2>}
                     <p className=' text-[12px] pb-2'> {resPhoneNumber ? <div>{label[0]?.registerPage?.[1]} <i className="fa-solid fa-check text-green-600"></i></div>: <div>{phoneNumber.length > 0 ? <div>{label[0]?.registerPage?.[1]} <i className="fa-solid fa-xmark text-red-600"></i></div>: label[0]?.registerPage?.[1] }</div> } </p>
                     <input type="number" onChange={(e)=> phoneNumberFunc(e.target.value)} placeholder="+374 55 55 55" className=' border-solid border-slate-300 pt-[3px] pb-[3px] pl-[7px] text-[12px] rounded-[.5rem] w-full mb-3'/>
                     <p className=' text-[12px] pb-2'>{resEmail ? <div>{label[0]?.registerPage?.[2]} <i className="fa-solid fa-check text-green-600"></i></div>: email.length > 0 ? <div>{label[0]?.registerPage?.[2]}  <i className="fa-solid fa-xmark text-red-600"></i> </div>: label[0]?.registerPage?.[2]  } </p>
                     <input type="email" onChange={(e)=> emailFunc(e.target.value)} placeholder={label[0]?.registerPage?.[3]} className=' border-solid border-slate-300 pt-[3px] pb-[3px] pl-[7px] text-[12px] rounded-[.5rem] w-full mb-3'/>
                     <p className='text-[12px] pb-2'>{resPassword ? <div>{label[0]?.registerPage?.[4]} <i className="fa-solid fa-check text-green-600"></i> </div> : password.length > 0 ? <div>{label[0]?.registerPage?.[4]} <i className="fa-solid fa-xmark text-red-600"></i> </div>:  label[0]?.registerPage?.[4]  }</p>
                     <input type="password" onChange={(e)=>passwordFunc(e.target.value)} placeholder={label[0]?.registerPage?.[5]} className=' border-solid border-slate-300 pt-[3px] pb-[3px] pl-[7px] text-[12px] rounded-[.5rem] w-full mb-3' />
                     <p className='text-[12px] pb-2'>{resConfirmPassword ? <div>{label[0]?.registerPage?.[6]} <i className="fa-solid fa-check text-green-600"></i></div> : confirmPassword.length > 0 ? <div>{label[0]?.registerPage?.[6]} <i className="fa-solid fa-xmark text-red-600"></i> </div>: label[0]?.registerPage?.[6] }</p>
                     <input type="password" onChange={(e)=> ConfirmPwd(e.target.value)} placeholder={label[0]?.registerPage?.[7]} className=' border-solid border-slate-300 pt-[3px] pb-[3px] pl-[7px] text-[12px] rounded-[.5rem] w-full mb-3' />
        
                     <input type="checkbox" id="checkbox1" className='w-[1rem] pt-[500px]'/>
                     <label htmlFor="checkbox1" className='ml-[7px] text-[10px]'>{label[0]?.registerPage?.[8]} <a href="# "className="terms-and-conditions" to='#'><span className=' text-red-700'>{label[0]?.registerPage?.[9]}</span></a></label>
                    
                    <div className='robot mb-[10px]'>
                     <input type ="checkbox"  className='mr-2'/>{label[0]?.registerPage?.[10]}  <i className="fa-solid fa-robot"></i>
                    </div>
        
                     <input type="submit" value={label[0]?.registerPage?.[11]} className='bg-red-700 text-[.9rem] py-2 text-center rounded-xl text-white font-bold w-full cursor-pointer'/>
                    <div className='continue'>
                      <div className='solid'></div><p className='text-[1rem] w-[39%] text-center'>{label[0]?.registerPage?.[12]}</p><div className='solid'></div>
                    </div>
                     <a href="https://www.facebook.com/" className='bg-blue-700 py-2 text-[.9rem] px-[7rem] rounded-xl text-white font-bold cursor-pointer  flex justify-center items-center gap-3'> <i className="fa-brands fa-facebook"></i> Facebook</a>
                     <a href="https://www.facebook.com/" className=' bg-slate-300 py-2 text-[.9rem] px-[7rem] rounded-xl text-gray-600 font-bold cursor-pointer flex justify-center items-center gap-3'> <i className="fa-brands fa-google"></i> Google</a>
                   
                     
                  
                  </form>
            </div>
            }
    </>
    

  )
}
