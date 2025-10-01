import React from 'react'

import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import BackGround from "../assets/bgnano.png"
import BGround from "../assets/bground.jpg"
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';




// GlassLogin.jsx
// React component with liquid glass distortion effect using SVG filter

export default function LoginForm() {


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = () => {
        console.log(email + " - " + password)

        let bodyForAPI = {
            email: email,
            password: password
        }
        setIsLoading(true)
        // axios.get("http://localhost:8080/api/materias/availablesubjects", {
        axios.post("http://localhost:8080/api/auth/login", bodyForAPI)
            .then((response) => {
                console.log(response.data)
                let token = localStorage.setItem("token", JSON.stringify(response.data))
                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false)

            });

    }



  return (
    <div className="glass-root breathing-bg"
    style={{
      backgroundImage: `url(${BGround})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
        <LoadingSpinner isLoading={isLoading} />
      {/* SVG Filter (should be included once in your document) */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.013 0.013"
              numOctaves="2"
              seed="92"
              result="noise"
            />
            <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blurred"
              scale="60"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Liquid Glass Login Card */}
      <div className="liquid-glass-card">
        <div className="card-content ">
          <h2>Sign In</h2>
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email" className="input" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" className="input" onChange={(e) => setPassword(e.target.value)}/>
            <button className="glass-button" onClick={handleSubmit}>Login</button>
          </form>
          <div className="forgot">Forgot Password?</div>
        </div>
      </div>

      <style>{`
        .glass-root{
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
   
          font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
        }

        .liquid-glass-card {
          position: relative;
          width: 600px;
          height: 400px;
          border-radius: 28px;
          isolation: isolate;
          box-shadow: 0px 6px 22px -11px rgba(199, 199, 199, 0.2);
          
          overflow: hidden;
        }

        .liquid-glass-card::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          border-radius: 28px;
          box-shadow: inset 0 0 5px -3px rgba(188, 188, 188, 0.3);
          background-color: rgba(255, 255, 255, 0);
          pointer-events: none;
        }

        .liquid-glass-card::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          border-radius: 28px;
          backdrop-filter: blur(0px);
          -webkit-backdrop-filter: blur(0px);
          filter: url(#glass-distortion);
          -webkit-filter: url(#glass-distortion);
          isolation: isolate;
          pointer-events: none;
        }

        .card-content {
          position: relative;
          z-index: 10;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 32px;
          color: white;
        }

        .card-content h2 {
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 24px;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
        }

        .input {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          padding: 12px;
          color: white;
          outline: none;
          font-size: 16px;
        }

        .glass-button {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
        }

        .glass-button:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .forgot {
          margin-top: 12px;
          font-size: 14px;
          opacity: 0.7;
        }


        .breathing-bg {
  animation: breathingBackground 6s ease-in-out infinite;
}

@keyframes breathingBackground {
  0% {
    background-size: 100%;
  }
  50% {
    background-size: 110%; /* La imagen crece un poco */
  }
  100% {
    background-size: 100%;
  }
}
  
      `}</style>
    </div>
  );
}







// export default function GlassLogin({ bgImage = `${BackGround}` }) {
//   return (
//     <div className="glass-root">
//       <div className="bg-layer" aria-hidden />

      

//       <main className="center-wrap" role="main">
//         <section className="glass-card" aria-labelledby="signin-title">
//           <h1 id="signin-title" className="title">Sign In</h1>

//           <form className="form" onSubmit={(e) => e.preventDefault()}>
//             <label className="input-row">
//               <span className="icon" aria-hidden>
//                 {/* Mail icon */}
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M3 6.5C3 5.67157 3.67157 5 4.5 5H19.5C20.3284 5 21 5.67157 21 6.5V17.5C21 18.3284 20.3284 19 19.5 19H4.5C3.67157 19 3 18.3284 3 17.5V6.5Z" stroke="#222" strokeOpacity="0.6" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
//                   <path d="M3.75 7.5L12 13L20.25 7.5" stroke="#222" strokeOpacity="0.6" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//               </span>
//               <input className="input" type="email" placeholder="Email" aria-label="Email" />
//             </label>

//             <label className="input-row">
//               <span className="icon" aria-hidden>
//                 {/* Lock icon */}
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <rect x="3.5" y="10" width="17" height="10" rx="2" stroke="#222" strokeOpacity="0.6" strokeWidth="0.9"/>
//                   <path d="M8 10V7.5C8 5.567 9.567 4 11.5 4C13.433 4 15 5.567 15 7.5V10" stroke="#222" strokeOpacity="0.6" strokeWidth="0.9" strokeLinecap="round" />
//                 </svg>
//               </span>
//               <input className="input" type="password" placeholder="Password" aria-label="Password" />
//             </label>

//             <button type="submit" className="btn-login">Login</button>

//             <div className="forgot">Forgot Password?</div>
//           </form>
//         </section>
//       </main>

//       {/* Component-scoped CSS */}
//       <style>{`
//         :root{
//           --card-width: 420px;
//           --card-radius: 22px;
//         }

//         .glass-root{
//           min-height: 100vh;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: #f2f4f7;
//           position: relative;
//           overflow: hidden;
//           font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
//         }

//         .bg-layer{
//           position: absolute;
//           inset: 0;
//           background-image: url('${bgImage}');
//           background-size: cover;
//           background-position: center center;
//           transform: scale(1.06);
//           filter: blur(8px) saturate(1.05) contrast(0.98);
//           opacity: 0.95;
//         }

//         /* subtle gradient overlay to shift tones like the reference */
//         .glass-root::after{
//           content: "";
//           position: absolute;
//           inset: 0;
//           background: linear-gradient(180deg, rgba(255,255,255,0.1), rgba(200,210,255,0.06));
//           mix-blend-mode: overlay;
//           pointer-events: none;
//         }

//         .center-wrap{
//           position: relative;
//           z-index: 2;
//           width: 100%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 60px 24px;
//         }

//         .glass-card{
//           width: var(--card-width);
//           border-radius: var(--card-radius);
//           padding: 36px 32px 28px;
//           backdrop-filter: blur(12px) saturate(120%);
//           -webkit-backdrop-filter: blur(12px) saturate(120%);
//           background: linear-gradient(180deg, rgba(255,255,255,0.45), rgba(255,255,255,0.12));
//           border: 1px solid rgba(255,255,255,0.6);
//           box-shadow:
//             0 10px 30px rgba(16,24,40,0.18),
//             inset 0 1px 0 rgba(255,255,255,0.6);
//           display: flex;
//           flex-direction: column;
//           align-items: stretch;
//           color: #0b1220;
//           position: relative;
//           overflow: hidden;
//         }

//         /* subtle glow rim like liquid glass */
//         .glass-card::before{
//           content: "";
//           position: absolute;
//           inset: 0;
//           border-radius: inherit;
//           padding: 2px;
//           background: linear-gradient(90deg, rgba(120,160,255,0.12), rgba(160,100,255,0.06));
//           mask: linear-gradient(#000, #000) content-box, linear-gradient(#000, #000);
//           -webkit-mask: linear-gradient(#000,#000) content-box, linear-gradient(#000,#000);
//           pointer-events: none;
//         }

//         .title{
//           font-size: 36px;
//           font-weight: 700;
//           margin: 0 0 22px 0;
//           text-align: center;
//           color: rgba(10,14,20,0.92);
//           text-shadow: 0 1px 0 rgba(255,255,255,0.6);
//         }

//         .form{
//           display: flex;
//           gap: 14px;
//           flex-direction: column;
//         }

//         .input-row{
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           background: linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0.42));
//           border-radius: 12px;
//           padding: 12px 14px;
//           border: 1px solid rgba(10,14,20,0.06);
//           box-shadow: inset 0 1px 0 rgba(255,255,255,0.7), 0 1px 0 rgba(10,14,20,0.02);
//         }

//         .icon{
//           display: inline-flex;
//           min-width: 28px;
//           min-height: 28px;
//           align-items: center;
//           justify-content: center;
//           opacity: 0.9;
//         }

//         .input{
//           border: 0;
//           outline: none;
//           font-size: 15px;
//           background: transparent;
//           padding: 6px 0;
//           color: #071022;
//           width: 100%;
//         }

//         .btn-login{
//           margin-top: 6px;
//           height: 54px;
//           border-radius: 12px;
//           border: 0;
//           font-size: 18px;
//           font-weight: 600;
//           cursor: pointer;
//           background: linear-gradient(90deg, #4aa3ff, #7b6bff 60%);
//           color: white;
//           box-shadow: 0 8px 20px rgba(80,70,160,0.18), inset 0 -2px 6px rgba(0,0,0,0.08);
//           transition: transform 160ms ease, box-shadow 160ms ease, opacity 120ms ease;
//         }

//         .btn-login:active{ transform: translateY(1px) scale(0.998); }
//         .btn-login:hover{ box-shadow: 0 14px 28px rgba(80,70,160,0.22); }

//         .forgot{
//           margin-top: 8px;
//           text-align: center;
//           font-size: 13px;
//           color: rgba(6,10,18,0.45);
//         }

//         /* responsive tweaks */
//         @media (max-width: 520px){
//           .glass-card{ width: min(92%, 420px); padding: 28px 18px; }
//           .title{ font-size: 28px; }
//         }
//       `}</style>
//     </div>
//   );
// }











// export default function App() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     // Simulate API call
//     setTimeout(() => {
//       setIsSubmitting(false);
//       alert('Login successful!');
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4"
//     style={{
//       backgroundImage: `url(${BackGround})`,
//       backgroundSize: 'contain',
//       backgroundPosition: 'center',
//       backgroundRepeat: 'no-repeat',
//     }}>
//       {/* SVG Filter for liquid glass effect */}
//       <svg width="0" height="0" style={{ position: 'absolute' }}>
//         <defs>
//           <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
//             <feTurbulence 
//               type="fractalNoise" 
//               baseFrequency="0.013 0.013"
//               numOctaves="2" 
//               seed="92" 
//               result="noise" 
//             />
//             <feGaussianBlur 
//               in="noise" 
//               stdDeviation="2" 
//               result="blurred" 
//             />
//             <feDisplacementMap 
//               in="SourceGraphic" 
//               in2="blurred" 
//               scale="60"
//               xChannelSelector="R" 
//               yChannelSelector="G" 
//             />
//           </filter>
//         </defs>
//       </svg>

//       {/* Liquid Glass Login Card */}
//       <div className="relative w-full max-w-md">
//         <div className="liquid-glass-card">
//           <div className="card-content">
//             <h1 className="text-4xl font-bold mb-8 text-white">Sign In</h1>
            
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Email Input */}
//               <div className="relative">
//                 <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/80">
//                   <Mail size={20} />
//                 </div>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Email"
//                   className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 placeholder-white/60 backdrop-blur-sm"
//                   required
//                 />
//               </div>
              
//               {/* Password Input */}
//               <div className="relative">
//                 <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/80">
//                   <Lock size={20} />
//                 </div>
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Password"
//                   className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 placeholder-white/60 backdrop-blur-sm"
//                   required
//                 />
//               </div>
              
//               {/* Login Button */}
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 ${
//                   isSubmitting 
//                     ? 'bg-white/30 cursor-not-allowed' 
//                     : 'bg-gradient-to-r from-blue-500/80 to-purple-500/80 hover:from-blue-500 hover:to-purple-500 transform hover:scale-105'
//                 } backdrop-blur-sm`}
//               >
//                 {isSubmitting ? (
//                   <div className="flex items-center justify-center">
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                     Signing in...
//                   </div>
//                 ) : (
//                   'Login'
//                 )}
//               </button>
//             </form>
            
//             {/* Forgot Password Link */}
//             <div className="mt-6 text-center">
//               <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
//                 Forgot Password?
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .liquid-glass-card {
//           position: relative;
//           width: 100%;
//           min-height: 400px;
//           border-radius: 28px;
//           isolation: isolate;
//           box-shadow: 0px 6px 22px -11px rgba(199, 199, 199, 0.2);
//           cursor: pointer;
//           background: rgba(255, 255, 255, 0.05);
//           backdrop-filter: blur(10px);
//           -webkit-backdrop-filter: blur(10px);
//         }

//         .liquid-glass-card::before {
//           content: '';
//           position: absolute;
//           inset: 0;
//           z-index: 0;
//           border-radius: 28px;
//           box-shadow: inset 0 0 5px -3px rgba(188, 188, 188, 0.3);
//           background-color: rgba(255, 255, 255, 0);
//           pointer-events: none;
//         }

//         .liquid-glass-card::after {
//           content: '';
//           position: absolute;
//           inset: 0;
//           z-index: -1;
//           border-radius: 28px;
//           backdrop-filter: blur(0px);
//           -webkit-backdrop-filter: blur(0px);
//           filter: url(#glass-distortion);
//           -webkit-filter: url(#glass-distortion);
//           isolation: isolate;
//           pointer-events: none;
//         }

//         .card-content {
//           position: relative;
//           z-index: 10;
//           width: 100%;
//           height: 100%;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           text-align: center;
//           padding: 32px;
//           color: white;
//         }
//       `}</style>
//     </div>
//   );
// }