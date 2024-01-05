import {useState,useCallback,useEffect,useRef} from "react";

function App(){

    let [password,setPassword]= useState();
    let [length,setLength]= useState(8); // default lenght is 8
    let [numberAllowed,setNumberAllowed]= useState(false);
    let [charectorAllowed,setCharectorAllowed]= useState(false);

    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var pass="";

    // Password Generator function with useCallback Hook
    const passwordGenerator= useCallback(()=>{

        if(charectorAllowed) str+= "~!@#$%^&*()_+[]{}|?/<>";
        if(numberAllowed) str+= "0123456789";

        for(let i=1;i<= length;i++){
            let ran= Math.floor(Math.random()*str.length);
            pass += str[ran];
        }
        setPassword(pass);
    },[length,numberAllowed,charectorAllowed,password]);


    useEffect(()=>{
        passwordGenerator();
    },[length,numberAllowed,charectorAllowed]);

    let passwordRef= useRef(null);

    function copyClipBoard(){
        window.navigator.clipboard.writeText(password);
        passwordRef.current?.select();
    }

   return( <div className="body h-screen w-full bg-slate-800 flex justify-center items-start">
     <div className="p-2 bg-slate-500 rounded-lg w-[40rem] mt-5">
        <div className="text-xl text-white text-center">Password Generator</div>
        <div className="flex justify-center">
            <input type="text" placeholder="Password" value={password} className="px-2 py-1" ref={passwordRef}/>
            <button className="px-2 py-1 outline-none bg-sky-400 text-white" onClick={copyClipBoard}>Copy</button>
        </div>
        <div className="flex justify-between align-middle ">

           <input type="range" min="8" max="30" value={length} onChange={(e)=>{setLength(e.target.value)}} />
           <label htmlFor="">Lenght: {length}</label>

           <input type="checkbox" defaultChecked={numberAllowed} onChange={()=>{setNumberAllowed((prev)=>{ 
            prev= !prev; return(prev)}
            )}} />
           <label htmlFor="">Number Allowed: {numberAllowed}</label>

            <input type="checkbox" defaultChecked={charectorAllowed} onChange={()=>{setCharectorAllowed((prev)=>{ 
            prev= !prev; return(prev)}
            )}} />
           <label htmlFor="">Charactor Allowed: {numberAllowed}</label>
        </div>
     </div>
    </div>
   );
}

export default App;