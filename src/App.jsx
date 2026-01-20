import React, { useEffect, useRef, useState } from 'react'
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { Mic, MicOff, Video, VideoOff, PhoneOff, UserPlus, Phone, Loader2, ShieldCheck, Wifi } from 'lucide-react';

const App = () => {
  const [userID] = useState("user_" + Math.floor(Math.random() * 1000));
  const [isZimReady, setIsZimReady] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  
  const zpRef = useRef(null);

  const appID = YOUR_appID; 
  const serverSecret = "YOUR_SECRETE_CODE";

  useEffect(() => {
    const initZego = async () => {
      try {
        const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, null, userID, "User_" + userID);
        const zp = ZegoUIKitPrebuilt.create(TOKEN);
        zpRef.current = zp;

        // Important: ZIM Plugin setup for invitations
        zp.addPlugins({ ZIM });
        setIsZimReady(true);

        zp.setCallInvitationConfig({
          onCallInvitationEnded: () => setIsInCall(false),
          onOutgoingCallInvitationAccepted: () => setIsInCall(true),
          onIncomingCallInvitationAccepted: () => setIsInCall(true),
          onOutgoingCallInvitationRejected: () => {
            alert("Call Rejected!");
            setIsInCall(false);
          }
        });

      } catch (err) {
        console.error("Zego Init Error:", err);
      }
    };
    initZego();
  }, [userID]);

  const handleCall = async (callType) => {
    if (!isZimReady) return alert("System connecting... please wait");
    
    const targetUserID = prompt("Enter Target User ID:");
    if (!targetUserID) return;

    try {
      const res = await zpRef.current.sendCallInvitation({
        callees: [{ userID: targetUserID, userName: "User_" + targetUserID }],
        callType: callType,
        timeout: 60,
      });
      
      if (res.errorInvitees.length === 0) {
        setIsInCall(true);
      } else {
        alert("User is offline!");
        setIsInCall(false);
      }
    } catch (err) {
      console.error("Call Invitation Error:", err);
      alert("Call failed! Make sure ZIM is installed.");
    }
  }

  return (
    <div className="h-screen w-full bg-[#0f172a] flex flex-col items-center justify-center text-white font-sans overflow-hidden">
      
      {/* Background Decorative Circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]"></div>

      {!isInCall ? (
        /* --- LANDING UI --- */
        <div className="z-10 w-full max-w-md p-8 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl text-center space-y-8">
          <div className="space-y-2">
            <div className="flex justify-center gap-2 mb-4">
               <span className={`px-3 py-1 rounded-full text-[10px] flex items-center gap-1 ${isZimReady ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                 <Wifi size={12} /> {isZimReady ? "System Online" : "Connecting..."}
               </span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight">Call<span className="text-indigo-500">One</span></h1>
            <p className="text-slate-400 text-sm italic">Secure HD Audio & Video Calling</p>
          </div>

          <div className="p-6 bg-black/20 rounded-3xl border border-white/5">
             <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Your Personal ID</p>
             <h2 className="text-2xl font-mono font-bold text-indigo-400 selection:bg-indigo-500 selection:text-white">{userID}</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => handleCall(ZegoUIKitPrebuilt.InvitationTypeVideoCall)}
              className="group flex flex-col items-center gap-3 p-6 bg-indigo-600 hover:bg-indigo-500 rounded-[32px] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-indigo-600/20"
            >
              <Video size={28} />
              <span className="font-semibold text-sm">Video Call</span>
            </button>

            <button 
              onClick={() => handleCall(ZegoUIKitPrebuilt.InvitationTypeVoiceCall)}
              className="group flex flex-col items-center gap-3 p-6 bg-white/10 hover:bg-white/20 rounded-[32px] transition-all hover:scale-105 active:scale-95 border border-white/10"
            >
              <Phone size={28} />
              <span className="font-semibold text-sm">Voice Call</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-slate-500 text-xs">
            <ShieldCheck size={14} /> End-to-end Encrypted
          </div>
        </div>
      ) : (
        /* --- ACTIVE CALL UI --- */
        <div className="relative w-full h-full flex items-center justify-center bg-black">
          <div className="text-center">
            <Loader2 className="animate-spin text-indigo-500 mb-4 mx-auto" size={48} />
            <p className="text-lg font-medium text-slate-300">Call in Progress...</p>
          </div>

          {/* Floating Glass Controls */}
          <div className="absolute bottom-12 flex items-center gap-6 px-10 py-5 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[40px] shadow-2xl z-50 transition-all animate-bounce-in">
            <button onClick={() => setIsMuted(!isMuted)} className={`p-4 rounded-2xl transition-all ${isMuted ? 'bg-red-500' : 'bg-white/10 hover:bg-white/20'}`}>
              {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
            </button>

            <button onClick={() => window.location.reload()} className="p-6 bg-red-600 hover:bg-red-700 rounded-3xl shadow-lg shadow-red-600/40 transform hover:scale-110 active:scale-90 transition-all">
              <PhoneOff size={32} />
            </button>

            <button onClick={() => setIsVideoOff(!isVideoOff)} className={`p-4 rounded-2xl transition-all ${isVideoOff ? 'bg-red-500' : 'bg-white/10 hover:bg-white/20'}`}>
              {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App;
