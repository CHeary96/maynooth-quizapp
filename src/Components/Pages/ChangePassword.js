import React from 'react'
import {useState, useEffect} from 'react'



export const ChangePassword = () => {

    const [isAnimated, setIsAnimated] = useState(false);
    useEffect(() => {
        setIsAnimated(true);
    }, []);


    return (
       

       
        <div  className=" py-10 h-screen w-screen bg-gray-100">         
         
        <div className=" flex flex-col md:w-9/12 m-5  lg:flex-row-reverse lg:justify-around">
            
             

           <div className="grid grid-cols-2 border-t-2 p-3 rounded-md bg-white shadow-lg  border-gray-200 lg:mb-20 lg:mt-10">
               
           <p class="text-white text-base font-thin" ><span class="font-semibold text-black">Change Password</span></p>
           <button class="bg-blue-300 px-2  float-right text-center border rounded-md text-lg text-white lg:h-10 hover:bg-gray-400">Save</button>

                   
      
               <label
                 className="block uppercase tracking-wide mt-5 text-gray-500 text-xs font-bold lg:-mt-10"
                 htmlFor="email"
                >
                 Current Password
               </label>

               <label
                 className="block uppercase tracking-wide mt-5 text-gray-500 text-xs font-bold lg:-mt-10"
                 htmlFor="email"
               >
                 New Password
               </label>

               
               
               

               <input
            
                 type="curPassword"
              
                 name="curPassword"
                 id="curPassword"
                 placeholder=""
                 className=" flex bg-white appearance-none border-2 border-gray-200 rounded px-4 w-11/12 h-10 lg:-mt-16  text-gray-700 leading-tight  focus:bg-white "
                 required
               />

               
               <input
     
               type="name"
               name="name" 
               id="name"
               placeholder=""
               className="bg-white appearance-none border-2 border-gray-200 rounded w-full h-10 py-2 px-4 lg:-mt-16 text-gray-700 leading-tight  focus:bg-white "
               required
               />


            
               
 
        </div>
             
            <img src={process.env.PUBLIC_URL + "/images/password.svg"} className={`${isAnimated ? 'scale-95' : 'translate-y-full'} py-5  max-h-80 lg:h-screen transform transition duration-1000 ease-in-out `}/>
           
          </div>
     
      <div>
     
  </div>
</div>

    
    )
}

export default ChangePassword;