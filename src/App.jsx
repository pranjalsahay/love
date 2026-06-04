import { useState, useEffect, useRef } from "react";
import pic1 from "./assets/pic1.jpeg";
import pic2 from "./assets/pic2.jpeg";
import pic3 from "./assets/pic3.jpeg";
import pic4 from "./assets/pic4.jpeg";
import pic5 from "./assets/pic5.jpeg";
import pic6 from "./assets/pic6.jpeg";
import pic7 from "./assets/pic7.jpeg";

const PHOTOS = [
  { image: pic1, caption: "Beautiful Memory ❤️",  date: "Special Moment"    },
  { image: pic2, caption: "Our Smile 🌸",          date: "Forever Together"  },
  { image: pic3, caption: "Best Day 💕",            date: "Unforgettable"     },
  { image: pic4, caption: "Just Us ✨",             date: "Pure Happiness"    },
  { image: pic5, caption: "Lovely Memory 💌",       date: "Always Special"    },
  { image: pic6, caption: "Golden Time 🌷",         date: "Beautiful Day"     },
  { image: pic7, caption: "You & Me 💖",            date: "My Favorite"       },
];

const VALID_NAMES = ["khushi", "khushi bansal"];
const VALID_PASS  = "ilovekhushi";

const SONGS = [
  {
    title: "Tum Hi Ho",
    artist: "Arijit Singh",
    reason: "Every word feels like I wrote it for you",
    color: "#c084fc",
    yt: "Umqb9KENgmk",
  },
  {
    title: "Tera Ban Jaunga",
    artist: "Akhil Sachdeva",
    reason: "This is exactly how I feel",
    color: "#f472b6",
    yt: "Qdz5n1Xe5Qo",
  },
  {
    title: "Pehla Nasha",
    artist: "Udit Narayan",
    reason: "You gave me this feeling",
    color: "#818cf8",
    yt: "S4m3K6aqA2M",
  },
  {
    title: "Jeena Jeena",
    artist: "Atif Aslam",
    reason: "You taught me what living feels like",
    color: "#a78bfa",
    yt: "zFhfksjf_mY",
  },
  {
    title: "Ik Vaari Aa",
    artist: "Arijit Singh",
    reason: "Come back to me once more",
    color: "#e879f9",
    yt: "T4SimnaiktU",
  },
  {
    title: "Main Rahoon Ya Na",
    artist: "Armaan Malik",
    reason: "My feelings for you will never change",
    color: "#c084fc",
    yt: "Dp6lbdoprZ0",
  },
  {
    title: "Raabta",
    artist: "Arijit Singh",
    reason: "There is something cosmic between us",
    color: "#818cf8",
    yt: "zlt38OOqwDc",
  },
];

const PROMISES = [
  { icon:"🤝", title:"Never Repeat This",   body:"Whatever hurt you — I promise with my whole heart it will never happen again." },
  { icon:"👂", title:"Always Listen",        body:"Your feelings come first. I'll listen before I speak, and truly understand you." },
  { icon:"💪", title:"Be Better Every Day",  body:"Not just words — actions. Every single day, I'll show up worthy of you." },
  { icon:"🌙", title:"Always Be There",      body:"In happy moments, hard days, random 2 AM thoughts — always, always there." },
  { icon:"💬", title:"Communicate Openly",  body:"No more silence, no more assumptions. Open, honest, always." },
  { icon:"🌸", title:"Choose You Daily",    body:"Not just when it's easy — on every ordinary day, I'll choose you. Always." },
];

const TIMELINE = [
  { icon:"💫", title:"The Moment I Noticed You",    date:"The Very Beginning",    body:"There was something about you — the way you carried yourself, the way you laughed. I knew then that you were different." },
  { icon:"☕", title:"Our First Real Conversation",  date:"Getting to Know You",   body:"We talked for hours and it felt like minutes. I thought: I never want this to end. And I still don't." },
  { icon:"💕", title:"When I Realised I Loved You",  date:"A Quiet Revelation",    body:"It wasn't a grand moment — something small, quiet. And I thought: oh. It's you. It's always been you." },
  { icon:"🌟", title:"The Best Days with You",       date:"Everything in Between", body:"Every laugh, every plan, every inside joke — the small, ordinary, extraordinary moments I treasure most." },
  { icon:"💔", title:"When I Hurt You",              date:"My Biggest Regret",     body:"I made a mistake. Seeing the hurt on your face was the worst feeling I have ever known. I'm so sorry." },
  { icon:"🌸", title:"The Promise I Make Now",       date:"From This Day Forward", body:"I choose to be better. I choose you — every day, in every way. This is my heart, not just a webpage." },
];

const WISHES = [
  { icon:"🌟", title:"Only Happiness",    body:"Every morning, I want you to wake up to peace, warmth, and joy. You deserve all of that and more." },
  { icon:"💪", title:"Strength Always",   body:"In hard days, long nights, quiet doubts — I wish you the strength to know you are more than enough." },
  { icon:"🌸", title:"Feel Loved",        body:"Not just by me — by the whole world. Someone as beautiful as you deserves to be surrounded by love." },
  { icon:"✨", title:"A Second Chance",   body:"If you find it in your heart to forgive me, I'll spend every day making you glad you did." },
];

const EMOJIS = ["🌸","💜","✨","💕","🌷","💝","💌","🦋","⭐","🌹"];

function Particles({ count=30 }) {
  const items = Array.from({length:count},(_,i)=>({
    emoji: EMOJIS[i%EMOJIS.length],
    left: `${3+(i*3.17)%94}%`,
    top:  `${2+(i*6.13)%96}%`,
    size: `${12+(i%4)*7}px`,
    dur:  `${6+(i%5)*2}s`,
    delay:`${(i*0.35)%5}s`,
    opacity: 0.12+(i%5)*0.04,
  }));
  return <>{items.map((p,i)=>(
    <span key={i} style={{
      position:"absolute", pointerEvents:"none", userSelect:"none",
      left:p.left, top:p.top, fontSize:p.size, opacity:p.opacity,
      animation:`particleFloat ${p.dur} ease-in-out ${p.delay} infinite`,
    }}>{p.emoji}</span>
  ))}</>;
}

function HeartBurst({x,y,onDone}) {
  useEffect(()=>{const t=setTimeout(onDone,1400);return()=>clearTimeout(t);},[]);
  return <div style={{position:"fixed",left:x-16,top:y-16,fontSize:28,pointerEvents:"none",zIndex:9999,animation:"heartRise 1.4s ease forwards"}}>💜</div>;
}

function MusicPlayer() {
  const [idx, setIdx] = useState(0);
  const song = SONGS[idx];

  return (
    <div
      style={{
        background: "rgba(20,10,40,0.96)",
        borderRadius: 32,
        padding: "40px",
        border: "1px solid rgba(180,157,224,0.25)",
        backdropFilter: "blur(24px)",
        maxWidth: 560,
        margin: "0 auto",
        boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
      }}
    >
      {/* YouTube Player */}
      <div
        style={{
          borderRadius: 20,
          overflow: "hidden",
          marginBottom: 28,
          boxShadow: `0 0 40px ${song.color}44`,
        }}
      >
     <iframe
  width="100%"
  height="300"
  src={`https://www.youtube.com/embed/${song.yt}`}
  title={song.title}
  frameBorder="0"
  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
/>
      </div>

      {/* Song info */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div
          style={{
            fontSize: 22,
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            color: "white",
            marginBottom: 6,
          }}
        >
          {song.title}
        </div>

        <div
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: 1,
          }}
        >
          {song.artist}
        </div>

        <div
          style={{
            fontSize: 12,
            color: song.color,
            fontStyle: "italic",
            marginTop: 8,
          }}
        >
          "{song.reason}"
        </div>
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <button
          onClick={() =>
            setIdx((idx - 1 + SONGS.length) % SONGS.length)
          }
          style={{
            background: song.color,
            border: "none",
            color: "white",
            width: 55,
            height: 55,
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: 20,
          }}
        >
          ⏮
        </button>

        <button
          onClick={() =>
            setIdx((idx + 1) % SONGS.length)
          }
          style={{
            background: song.color,
            border: "none",
            color: "white",
            width: 55,
            height: 55,
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: 20,
          }}
        >
          ⏭
        </button>
      </div>

      {/* Playlist */}
      <div
        style={{
          marginTop: 30,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: 20,
        }}
      >
        {SONGS.map((s, i) => (
          <div
            key={i}
            onClick={() => setIdx(i)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px",
              borderRadius: 12,
              cursor: "pointer",
              background:
                i === idx
                  ? "rgba(180,157,224,0.12)"
                  : "transparent",
              marginBottom: 6,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 8,
                background: s.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              🎵
            </div>

            <div>
              <div style={{ color: "white" }}>
                {s.title}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {s.artist}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Lightbox({ photo, idx, total, onClose, onPrev, onNext }) {
  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(10,5,20,0.95)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div onClick={(e) => e.stopPropagation()} style={{position:"relative",maxWidth:"min(90vw,700px)",width:"100%"}}>
        <div style={{position:"relative",borderRadius:24,overflow:"hidden",boxShadow:"0 40px 120px rgba(0,0,0,0.6)"}}>
          <img src={photo.image} alt={photo.caption} style={{width:"100%",maxHeight:"80vh",objectFit:"cover",display:"block"}}/>
          <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"24px",background:"linear-gradient(to top,rgba(20,10,40,0.95),transparent)"}}>
            <div style={{color:"white",fontFamily:"'Playfair Display', serif",fontSize:20}}>{photo.caption}</div>
            <div style={{color:"rgba(255,255,255,0.6)",fontSize:12}}>{photo.date}</div>
          </div>
        </div>
        <button onClick={onPrev} style={{position:"absolute",left:-60,top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.15)",color:"white",width:44,height:44,borderRadius:"50%",fontSize:18,cursor:"pointer"}}>◀</button>
        <button onClick={onNext} style={{position:"absolute",right:-60,top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.15)",color:"white",width:44,height:44,borderRadius:"50%",fontSize:18,cursor:"pointer"}}>▶</button>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:16,padding:"0 4px"}}>
          <span style={{color:"rgba(255,255,255,0.4)",fontSize:13}}>{idx+1} / {total}</span>
          <button onClick={onClose} style={{background:"none",border:"1px solid rgba(255,255,255,0.2)",color:"rgba(255,255,255,0.7)",padding:"6px 18px",borderRadius:20,fontSize:13,cursor:"pointer"}}>Close ✕</button>
        </div>
      </div>
    </div>
  );
}

function MasonryGallery() {
  const [lb, setLb] = useState(null);
  const heights = ["340px","280px","380px","310px","360px","290px","330px"];
  return (
    <>
      {lb !== null && (
        <Lightbox photo={PHOTOS[lb]} idx={lb} total={PHOTOS.length} onClose={() => setLb(null)}
          onPrev={() => setLb((i) => (i - 1 + PHOTOS.length) % PHOTOS.length)}
          onNext={() => setLb((i) => (i + 1) % PHOTOS.length)}/>
      )}
      <div style={{columns:"3 280px",columnGap:16,maxWidth:900,margin:"0 auto"}}>
        {PHOTOS.map((ph, i) => (
          <div key={i} onClick={() => setLb(i)}
            style={{breakInside:"avoid",marginBottom:16,borderRadius:20,overflow:"hidden",height:heights[i],position:"relative",cursor:"pointer",boxShadow:"0 6px 28px rgba(0,0,0,0.12)"}}>
            <img src={ph.image} alt={ph.caption} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.5s ease"}}/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(30,16,48,0.9), transparent)",display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"20px"}}>
              <div style={{color:"white",fontFamily:"'Playfair Display', serif",fontSize:16}}>{ph.caption}</div>
              <div style={{color:"rgba(255,255,255,0.7)",fontSize:12}}>{ph.date}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function FadeIn({children, delay=0}) {
  const ref=useRef();
  const [vis,setVis]=useState(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVis(true);obs.disconnect();}},{threshold:0.12});
    if(ref.current)obs.observe(ref.current);
    return()=>obs.disconnect();
  },[]);
  return <div ref={ref} style={{opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(36px)",transition:`opacity 0.8s ${delay}s ease, transform 0.8s ${delay}s ease`}}>{children}</div>;
}

function LoginScreen({onLogin}) {
  const [name,setName]=useState("");
  const [pass,setPass]=useState("");
  const [err,setErr]=useState("");
  const [shake,setShake]=useState(false);

  const attempt=()=>{
    const n=name.trim().toLowerCase(),p=pass.trim().toLowerCase();
    if(VALID_NAMES.includes(n)&&p===VALID_PASS){onLogin();}
    else{setErr("💜 Hmm, that doesn't match. Try again, love!");setShake(true);setTimeout(()=>{setErr("");setShake(false);},2200);}
  };

  return (
    <div style={{width:"100vw",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"radial-gradient(ellipse at 30% 30%,#e8d8ff,#f5f0ff 45%,#ede8ff)",position:"relative",overflow:"hidden",padding:40,boxSizing:"border-box"}}>
      <Particles count={28}/>
      <div style={{background:"rgba(255,255,255,0.85)",backdropFilter:"blur(24px)",border:"1.5px solid rgba(201,184,232,0.7)",borderRadius:32,padding:"52px 48px",width:"100%",maxWidth:440,zIndex:2,textAlign:"center",animation:shake?"loginAppear 0.9s ease both, shake 0.45s ease":"loginAppear 0.9s ease both",boxShadow:"0 32px 80px rgba(124,92,191,0.16)"}}>
        <div style={{fontSize:28,letterSpacing:14,animation:"heartBeat 2.2s ease-in-out infinite",display:"block",marginBottom:24}}>♥ ♥ ♥</div>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:36,fontWeight:700,fontStyle:"italic",background:"linear-gradient(90deg,#7c5cbf,#b49de0,#9b7fd4,#b49de0,#7c5cbf)",backgroundSize:"300% auto",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"shimmer 4s linear infinite",lineHeight:1.2,marginBottom:10}}>A Little Something<br/>Just for You</h1>
        <p style={{fontSize:11,color:"#6b5490",letterSpacing:"1.8px",marginBottom:36,textTransform:"uppercase"}}>Private · Made with love · Only for you 🌸</p>
        {[{label:"Your name",val:name,set:setName,type:"text",ph:"Enter your name…"},
          {label:"Secret password",val:pass,set:setPass,type:"password",ph:"Enter password…"}].map(f=>(
          <div key={f.label} style={{textAlign:"left",marginBottom:18}}>
            <label style={{fontSize:10,textTransform:"uppercase",letterSpacing:"1.8px",color:"#6b5490",marginBottom:7,display:"block"}}>{f.label}</label>
            <input type={f.type} value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph} onKeyDown={e=>e.key==="Enter"&&attempt()}
              style={{width:"100%",padding:"14px 18px",border:"1.5px solid #c9b8e8",borderRadius:14,fontSize:14,fontFamily:"inherit",color:"#1e1030",background:"rgba(250,248,255,0.9)",outline:"none",boxSizing:"border-box"}}
              onFocus={e=>{e.target.style.borderColor="#7c5cbf";e.target.style.boxShadow="0 0 0 3px rgba(124,92,191,0.1)"}}
              onBlur={e=>{e.target.style.borderColor="#c9b8e8";e.target.style.boxShadow="none"}}/>
          </div>
        ))}
        <div style={{fontSize:12.5,color:"#7c5cbf",minHeight:20,marginBottom:10}}>{err||" "}</div>
        <button onClick={attempt} style={{width:"100%",padding:15,background:"#7c5cbf",color:"white",border:"none",borderRadius:16,fontSize:16,fontFamily:"'Playfair Display',serif",fontWeight:600,fontStyle:"italic",cursor:"pointer",boxShadow:"0 8px 28px rgba(124,92,191,0.32)",transition:"all 0.2s"}}
          onMouseEnter={e=>{e.currentTarget.style.background="#5e3fa3";e.currentTarget.style.transform="translateY(-2px)"}}
          onMouseLeave={e=>{e.currentTarget.style.background="#7c5cbf";e.currentTarget.style.transform="translateY(0)"}}>
          Open with Love 💌
        </button>
        <p style={{fontSize:11,color:"#a090c8",marginTop:14,fontWeight:300}}>Psst… only one person in this world knows the password 🤫</p>
      </div>
    </div>
  );
}

function MainSite() {
  const [page,setPage]=useState("home");
  const [hearts,setHearts]=useState([]);
  const [wishText,setWishText]=useState("");
  const [wishSent,setWishSent]=useState(false);
  const [gradAngle,setGradAngle]=useState(0);
  const [mousePos,setMousePos]=useState({x:50,y:50});
  const [menuOpen,setMenuOpen]=useState(false);

  useEffect(()=>{const t=setInterval(()=>setGradAngle(a=>a+0.3),50);return()=>clearInterval(t);},[]);
  useEffect(()=>{
    const fn=e=>{setMousePos({x:(e.clientX/window.innerWidth)*100,y:(e.clientY/window.innerHeight)*100});};
    window.addEventListener("mousemove",fn);return()=>window.removeEventListener("mousemove",fn);
  },[]);

  const spawnHearts=e=>{setHearts(h=>[...h,{id:Date.now(),x:e.clientX,y:e.clientY}]);};

  const nav=[
    {k:"home",l:"Home"},{k:"story",l:"Our Story"},{k:"promises",l:"Promises"},
    {k:"photos",l:"Gallery"},{k:"timeline",l:"Timeline"},{k:"playlist",l:"Music"},
    {k:"letter",l:"Letter"},{k:"wishes",l:"Wishes"},
  ];

  const px=(f)=>mousePos.x*f;
  const py=(f)=>mousePos.y*f;

  const gradStyle={
    background:`radial-gradient(ellipse at ${45+Math.sin(gradAngle*0.017)*15}% ${42+Math.cos(gradAngle*0.013)*12}%,
      #e8d8ff 0%,#f0e8ff 30%,#ede4f7 55%,#f8f4ff 100%)`,
  };

  const goTo = (k) => { setPage(k); setMenuOpen(false); };

  return (
    <div onClick={spawnHearts} style={{width:"100vw",minHeight:"100vh",fontFamily:"'Jost',sans-serif",overflowX:"hidden",background:"#faf8ff",color:"#1e1030",boxSizing:"border-box"}}>
      {hearts.map(h=><HeartBurst key={h.id} x={h.x} y={h.y} onDone={()=>setHearts(hs=>hs.filter(x=>x.id!==h.id))}/>)}

      {/* TICKER */}
      <div style={{background:"#7c5cbf",color:"white",fontSize:11.5,padding:"9px 0",overflow:"hidden",whiteSpace:"nowrap",letterSpacing:0.5,width:"100%"}}>
        <div style={{display:"inline-block",animation:"ticker 28s linear infinite"}}>
          {"✦ I'm sorry, Khushi ✦ You are my everything ✦ I miss your smile ✦ I promise I'll be better ✦ Please forgive me ✦ You deserve the world ✦ I love you, Khushi Bansal ✦ ".repeat(3)}
        </div>
      </div>

      {/* NAV */}
      <header style={{background:"rgba(255,255,255,0.92)",borderBottom:"1px solid #ede4f7",padding:"0 32px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:200,backdropFilter:"blur(16px)",width:"100%",boxSizing:"border-box"}}>
        <div onClick={()=>goTo("home")} style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:"#7c5cbf",cursor:"pointer",lineHeight:1,flexShrink:0}}>
          Khushi's Corner
          <span style={{fontSize:10,display:"block",fontWeight:400,color:"#6b5490",letterSpacing:"2px",fontFamily:"'Jost',sans-serif"}}>A love letter in code</span>
        </div>
        {/* Desktop nav */}
        <nav style={{display:"flex",gap:4,flexWrap:"wrap",justifyContent:"flex-end"}}>
          {nav.map(l=>(
            <a key={l.k} onClick={()=>goTo(l.k)} style={{padding:"7px 12px",borderRadius:30,fontSize:12,color:page===l.k?"#7c5cbf":"#6b5490",cursor:"pointer",background:page===l.k?"#f3eeff":"transparent",border:`1px solid ${page===l.k?"#c9b8e8":"transparent"}`,transition:"all 0.2s",fontWeight:page===l.k?500:400,textDecoration:"none",whiteSpace:"nowrap"}}>
              {l.l}
            </a>
          ))}
        </nav>
      </header>

      {/* HOME */}
      {page==="home" && (
        <section style={{...gradStyle,minHeight:"calc(100vh - 102px)",width:"100%",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",padding:"80px 40px",boxSizing:"border-box"}}>
          <Particles count={32}/>
          <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(180,157,224,0.18),transparent 70%)",left:`calc(${px(0.08)}% - 200px)`,top:`calc(${py(0.08)}% - 200px)`,pointerEvents:"none",transition:"left 0.1s,top 0.1s"}}/>
          <div style={{textAlign:"center",zIndex:2,position:"relative",maxWidth:620,width:"100%"}}>
            <FadeIn><span style={{display:"inline-block",background:"rgba(124,92,191,0.08)",color:"#7c5cbf",fontSize:11,letterSpacing:3,padding:"7px 22px",borderRadius:20,border:"1px solid rgba(124,92,191,0.2)",marginBottom:28,textTransform:"uppercase"}}>✦ For Khushi Bansal · With all my love ✦</span></FadeIn>
            <FadeIn delay={0.15}>
              <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(40px,7vw,76px)",fontWeight:700,lineHeight:1.1,color:"#3b2070",marginBottom:26}}>
                Where <em style={{fontStyle:"italic",color:"#7c5cbf"}}>Romance</em><br/>Finds Its Way Back
              </h1>
            </FadeIn>
            <FadeIn delay={0.3}><p style={{fontSize:16,color:"#6b5490",lineHeight:2,maxWidth:460,margin:"0 auto 40px",fontWeight:300}}>A little corner of the internet built entirely for you — to say sorry, to make promises, and to remind you just how much you mean to me.</p></FadeIn>
            <FadeIn delay={0.45}>
              <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
                <button onClick={()=>goTo("letter")} style={{padding:"15px 36px",background:"#7c5cbf",color:"white",border:"none",borderRadius:40,fontSize:15,fontFamily:"'Playfair Display',serif",fontWeight:600,fontStyle:"italic",cursor:"pointer",boxShadow:"0 8px 30px rgba(124,92,191,0.32)",transition:"all 0.22s"}}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)"}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)"}}>
                  Read My Heart 💕
                </button>
                <button onClick={()=>goTo("promises")} style={{padding:"15px 36px",background:"transparent",color:"#7c5cbf",border:"1.5px solid #7c5cbf",borderRadius:40,fontSize:15,fontFamily:"'Playfair Display',serif",fontWeight:600,fontStyle:"italic",cursor:"pointer",transition:"all 0.22s"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="#f3eeff";e.currentTarget.style.transform="translateY(-2px)"}}
                  onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.transform="translateY(0)"}}>
                  My Promises 🤝
                </button>
              </div>
            </FadeIn>
            <FadeIn delay={0.6}>
              <div style={{display:"flex",gap:48,justifyContent:"center",marginTop:52,flexWrap:"wrap"}}>
                {[["6","Promises Made"],["∞","Love Given"],["1","Person in Mind"]].map(([n,l])=>(
                  <div key={l} style={{textAlign:"center"}}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:34,fontWeight:700,color:"#7c5cbf",lineHeight:1}}>{n}</div>
                    <div style={{fontSize:11,color:"#6b5490",letterSpacing:"1.5px",marginTop:5,textTransform:"uppercase"}}>{l}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
          <div onClick={()=>goTo("story")} style={{position:"absolute",bottom:36,left:"50%",transform:"translateX(-50%)",fontSize:24,animation:"bounce 2.2s ease-in-out infinite",color:"#7c5cbf",opacity:0.6,cursor:"pointer"}}>↓</div>
        </section>
      )}

      {/* STORY */}
      {page==="story" && (
        <section style={{...gradStyle,padding:"100px 5vw",minHeight:"calc(100vh - 102px)",width:"100%",boxSizing:"border-box"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:72,alignItems:"center",maxWidth:880,margin:"0 auto"}}>
            <FadeIn>
              <div style={{position:"relative"}}>
                <div style={{width:"100%",aspectRatio:1,borderRadius:32,background:"linear-gradient(135deg,#ede4f7,#d8c8f0,#e8d8ff)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:100,boxShadow:"0 28px 70px rgba(124,92,191,0.16), 0 0 0 1px rgba(201,184,232,0.5)"}}>🌸</div>
                <div style={{position:"absolute",bottom:-20,right:-20,background:"#7c5cbf",color:"white",borderRadius:"50%",width:76,height:76,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,boxShadow:"0 10px 28px rgba(124,92,191,0.38)",border:"3px solid white"}}>💞</div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div>
                <p style={{fontSize:10,letterSpacing:"3.5px",color:"#7c5cbf",textTransform:"uppercase",marginBottom:12}}>Discover</p>
                <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,4vw,44px)",fontWeight:700,color:"#3b2070",lineHeight:1.22,marginBottom:20}}>Our Story Is <em style={{fontStyle:"italic"}}>Worth</em> Fighting For</h2>
                {["Every love story has its bumps — ours is no different. But what makes ours special is you, Khushi. Your warmth, your laughter, your everything.",
                  "I messed up, and I own that completely. This page is my way of reaching out when words alone feel too small. Because you deserve more than just words.",
                  "You are the person I think about first when something good happens, and the person I want to hold when something goes wrong. That doesn't change."].map((t,i)=>(
                  <p key={i} style={{fontSize:15.5,color:"#6b5490",lineHeight:2.1,fontWeight:300,marginBottom:16}}>{t}</p>
                ))}
                <button onClick={()=>goTo("timeline")} style={{marginTop:8,padding:"13px 32px",background:"transparent",border:"1.5px solid #7c5cbf",color:"#7c5cbf",borderRadius:30,fontSize:14,fontFamily:"'Playfair Display',serif",fontWeight:600,fontStyle:"italic",cursor:"pointer",transition:"all 0.2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="#7c5cbf";e.currentTarget.style.color="white"}}
                  onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#7c5cbf"}}>
                  See Our Timeline 💞
                </button>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* PROMISES */}
      {page==="promises" && (
        <section style={{padding:"100px 5vw",background:"white",minHeight:"calc(100vh - 102px)",width:"100%",boxSizing:"border-box"}}>
          <FadeIn><div style={{textAlign:"center"}}>
            <p style={{fontSize:10,letterSpacing:"3.5px",color:"#7c5cbf",textTransform:"uppercase",marginBottom:12}}>From the heart</p>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,5vw,46px)",fontWeight:700,color:"#3b2070",maxWidth:500,margin:"0 auto"}}>My <em style={{fontStyle:"italic"}}>Promises</em> to You, Khushi</h2>
          </div></FadeIn>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:22,maxWidth:880,margin:"52px auto 0"}}>
            {PROMISES.map((p,i)=>(
              <FadeIn key={i} delay={i*0.1}>
                <div style={{background:"#f3eeff",border:"1px solid rgba(201,184,232,0.5)",borderRadius:24,padding:"32px 26px",position:"relative",overflow:"hidden",transition:"transform 0.25s, box-shadow 0.25s",cursor:"default"}}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-8px)";e.currentTarget.style.boxShadow="0 24px 60px rgba(124,92,191,0.13)"}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none"}}>
                  <div style={{position:"absolute",top:16,right:20,fontFamily:"'Playfair Display',serif",fontSize:56,fontWeight:700,color:"rgba(124,92,191,0.06)",lineHeight:1}}>0{i+1}</div>
                  <span style={{fontSize:42,marginBottom:16,display:"block"}}>{p.icon}</span>
                  <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:19,color:"#7c5cbf",marginBottom:10,fontWeight:700}}>{p.title}</h3>
                  <p style={{fontSize:13.5,color:"#6b5490",lineHeight:1.9,fontWeight:300}}>{p.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {/* PHOTOS */}
      {page==="photos" && (
        <section style={{padding:"100px 5vw",background:"white",minHeight:"calc(100vh - 102px)",width:"100%",boxSizing:"border-box"}}>
          <FadeIn>
            <div style={{textAlign:"center",marginBottom:52}}>
              <p style={{fontSize:10,letterSpacing:"3.5px",color:"#7c5cbf",textTransform:"uppercase",marginBottom:12}}>Gallery of us</p>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,5vw,46px)",fontWeight:700,color:"#3b2070",marginBottom:16}}><em style={{fontStyle:"italic"}}>Moments</em> That Live in My Heart</h2>
              <p style={{fontSize:15,color:"#6b5490",maxWidth:440,margin:"0 auto",fontWeight:300,lineHeight:1.9}}>Every photo is a memory. Every memory is proof of something real and beautiful. Click to open.</p>
            </div>
          </FadeIn>
          <MasonryGallery/>
        </section>
      )}

      {/* TIMELINE */}
      {page==="timeline" && (
        <section style={{padding:"100px 5vw",background:"radial-gradient(ellipse at 70% 30%,#f3eeff,#faf8ff 60%)",minHeight:"calc(100vh - 102px)",width:"100%",boxSizing:"border-box"}}>
          <FadeIn>
            <div style={{textAlign:"center",marginBottom:64}}>
              <p style={{fontSize:10,letterSpacing:"3.5px",color:"#7c5cbf",textTransform:"uppercase",marginBottom:12}}>Our journey</p>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,5vw,46px)",fontWeight:700,color:"#3b2070"}}>The Story of <em style={{fontStyle:"italic"}}>Us</em></h2>
            </div>
          </FadeIn>
          <div style={{maxWidth:680,margin:"0 auto",position:"relative"}}>
            <div style={{position:"absolute",left:36,top:20,bottom:20,width:2,background:"linear-gradient(to bottom,#c9b8e8,#7c5cbf,#c9b8e8)",borderRadius:2}}/>
            {TIMELINE.map((t,i)=>(
              <FadeIn key={i} delay={i*0.1}>
                <div style={{display:"flex",gap:32,marginBottom:48,alignItems:"flex-start"}}>
                  <div style={{width:72,height:72,borderRadius:"50%",background:"white",border:"3px solid #7c5cbf",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0,position:"relative",zIndex:1,boxShadow:"0 6px 22px rgba(124,92,191,0.18)"}}>{t.icon}</div>
                  <div style={{background:"white",borderRadius:20,padding:"24px 28px",flex:1,border:"1px solid rgba(201,184,232,0.5)",boxShadow:"0 4px 20px rgba(124,92,191,0.07)"}}>
                    <span style={{fontSize:11,color:"#9b7fd4",letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:10,display:"block"}}>{t.date}</span>
                    <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:"#7c5cbf",marginBottom:8,fontWeight:700}}>{t.title}</h3>
                    <p style={{fontSize:14,color:"#6b5490",lineHeight:1.9,fontWeight:300}}>{t.body}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {/* LETTER */}
      {page==="letter" && (
        <section style={{padding:"100px 5vw",background:"radial-gradient(ellipse at center,#f3eeff,#faf8ff)",minHeight:"calc(100vh - 102px)",width:"100%",boxSizing:"border-box"}}>
          <FadeIn>
            <div style={{textAlign:"center",marginBottom:44}}>
              <p style={{fontSize:10,letterSpacing:"3.5px",color:"#7c5cbf",textTransform:"uppercase",marginBottom:12}}>From me, to you</p>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,5vw,46px)",fontWeight:700,color:"#3b2070"}}>A <em style={{fontStyle:"italic"}}>Letter</em> from My Heart</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{maxWidth:640,margin:"0 auto",background:"white",borderRadius:28,padding:"56px 48px",boxShadow:"0 36px 90px rgba(124,92,191,0.10), 0 0 0 1px rgba(201,184,232,0.4)",position:"relative",overflow:"hidden",boxSizing:"border-box"}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:6,background:"linear-gradient(90deg,#7c5cbf,#b49de0,#9b7fd4,#b49de0,#7c5cbf)"}}/>
              <div style={{position:"absolute",top:28,right:40,fontFamily:"'Playfair Display',serif",fontSize:140,fontWeight:700,color:"rgba(124,92,191,0.04)",lineHeight:1,pointerEvents:"none"}}>"</div>
              <p style={{fontSize:12,color:"#a090c8",letterSpacing:"1.2px",marginBottom:26}}>June 2026 · Written with love and regret</p>
              <p style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontStyle:"italic",color:"#7c5cbf",marginBottom:24}}>Dearest Khushi,</p>
              <div style={{fontSize:15.5,color:"#6b5490",lineHeight:2.15,fontWeight:300}}>
                {["I know that \"sorry\" sometimes feels like just a word. But I need you to know that this one comes from the deepest, most honest part of me.",
                  "I made a mistake — and seeing you hurt because of something I did is something I never, ever want to feel again. You don't deserve pain. You deserve someone who is consistent, kind, thoughtful, and shows up fully for you every single day.",
                  "I'm not asking you to forget. I'm asking for the chance to prove to you that I've understood, that I've grown, and that you are worth every effort it takes to become better.",
                  "You are the first thought in my morning and the last in my night. You are the reason I want to be a better person. Not because I have to — but because you deserve nothing less.",
                  "You are my favourite person in this world, Khushi Bansal. And I promise — with everything I have — this will never happen again."].map((t,i)=>(
                  <p key={i} style={{marginBottom:20}}>{t}</p>
                ))}
              </div>
              <div style={{marginTop:38,display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
                <p style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontStyle:"italic",color:"#7c5cbf"}}>— Yours always, forever 💌</p>
              </div>
              <div style={{fontSize:24,letterSpacing:8,marginTop:20,textAlign:"center"}}>♥ ♥ ♥</div>
            </div>
          </FadeIn>
        </section>
      )}

      {/* PLAYLIST */}
      {page==="playlist" && (
        <section style={{padding:"100px 5vw",background:"linear-gradient(160deg,#0d0520,#1a0a35,#100825)",minHeight:"calc(100vh - 102px)",width:"100%",boxSizing:"border-box"}}>
          <FadeIn>
            <div style={{textAlign:"center",marginBottom:52}}>
              <p style={{fontSize:10,letterSpacing:"3.5px",color:"#c084fc",textTransform:"uppercase",marginBottom:12}}>Songs for you</p>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,5vw,46px)",fontWeight:700,color:"white",marginBottom:10}}>A <em style={{fontStyle:"italic",color:"#c084fc"}}>Playlist</em> That Thinks of You</h2>
              <p style={{fontSize:15,color:"rgba(255,255,255,0.45)",maxWidth:460,margin:"0 auto",fontWeight:300,lineHeight:1.9}}>Every time one of these songs plays, you're all I think about.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}><MusicPlayer/></FadeIn>
        </section>
      )}

      {/* WISHES */}
      {page==="wishes" && (
        <section style={{padding:"100px 5vw",background:"radial-gradient(ellipse at center,#f3eeff,#faf8ff)",minHeight:"calc(100vh - 102px)",width:"100%",boxSizing:"border-box"}}>
          <div style={{maxWidth:680,margin:"0 auto"}}>
            <FadeIn>
              <div style={{textAlign:"center",marginBottom:52}}>
                <p style={{fontSize:10,letterSpacing:"3.5px",color:"#7c5cbf",textTransform:"uppercase",marginBottom:12}}>From my heart</p>
                <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,5vw,46px)",fontWeight:700,color:"#3b2070"}}>My <em style={{fontStyle:"italic"}}>Wishes</em> for You</h2>
              </div>
            </FadeIn>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:20,marginBottom:40}}>
              {WISHES.map((w,i)=>(
                <FadeIn key={i} delay={i*0.1}>
                  <div style={{background:"white",borderRadius:22,padding:"28px 26px",border:"1px solid rgba(201,184,232,0.5)",boxShadow:"0 6px 28px rgba(124,92,191,0.07)",transition:"transform 0.25s",cursor:"default"}}
                    onMouseEnter={e=>e.currentTarget.style.transform="translateY(-4px)"}
                    onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
                    <div style={{fontSize:38,marginBottom:14}}>{w.icon}</div>
                    <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:"#7c5cbf",marginBottom:8}}>{w.title}</h3>
                    <p style={{fontSize:13.5,color:"#6b5490",lineHeight:1.9,fontWeight:300}}>{w.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.4}>
              <div style={{background:"white",borderRadius:28,padding:"44px 40px",boxShadow:"0 28px 80px rgba(124,92,191,0.10)",border:"1px solid rgba(201,184,232,0.4)",textAlign:"center",position:"relative",overflow:"hidden",boxSizing:"border-box"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:5,background:"linear-gradient(90deg,#7c5cbf,#9b7fd4,#7c5cbf)"}}/>
                <p style={{fontSize:10,letterSpacing:"3.5px",color:"#7c5cbf",textTransform:"uppercase",marginBottom:12}}>leave a message</p>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:24,color:"#7c5cbf",marginBottom:10}}>Say Something to Me, Khushi 💌</h3>
                <p style={{fontSize:14,color:"#6b5490",fontWeight:300}}>Whatever's on your heart. I'm listening.</p>
                {!wishSent ? (
                  <>
                    <textarea rows={4} value={wishText} onChange={e=>setWishText(e.target.value)} placeholder="Type your message here… 🌸"
                      style={{width:"100%",border:"1.5px solid #c9b8e8",borderRadius:16,padding:"16px 18px",fontSize:14.5,fontFamily:"inherit",color:"#1e1030",resize:"none",outline:"none",lineHeight:1.7,margin:"20px 0",background:"#faf8ff",boxSizing:"border-box",transition:"border-color 0.2s"}}
                      onFocus={e=>e.target.style.borderColor="#7c5cbf"} onBlur={e=>e.target.style.borderColor="#c9b8e8"}/>
                    <button onClick={()=>{if(wishText.trim())setWishSent(true);}} style={{padding:"14px 42px",background:"#7c5cbf",color:"white",border:"none",borderRadius:40,fontSize:15,fontFamily:"'Playfair Display',serif",fontWeight:600,fontStyle:"italic",cursor:"pointer",boxShadow:"0 6px 24px rgba(124,92,191,0.28)",transition:"all 0.2s"}}
                      onMouseEnter={e=>{e.currentTarget.style.background="#5e3fa3";e.currentTarget.style.transform="translateY(-2px)"}}
                      onMouseLeave={e=>{e.currentTarget.style.background="#7c5cbf";e.currentTarget.style.transform="translateY(0)"}}>
                      Send with Love 💕
                    </button>
                  </>
                ) : (
                  <div style={{marginTop:24}}>
                    <div style={{fontSize:52,marginBottom:16}}>💌</div>
                    <p style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:"#7c5cbf",fontStyle:"italic",marginBottom:10}}>Received with all my love</p>
                    <div style={{padding:"22px 26px",background:"#f3eeff",borderRadius:16,fontSize:14.5,color:"#6b5490",lineHeight:1.9,textAlign:"left",fontStyle:"italic"}}>
                      Your message: "{wishText}"<br/><br/>
                      Thank you for writing to me, Khushi. Every word from you means the whole world. 🌸
                    </div>
                    <button onClick={()=>{setWishSent(false);setWishText("");}} style={{marginTop:20,padding:"14px 32px",background:"#7c5cbf",color:"white",border:"none",borderRadius:40,fontSize:15,fontFamily:"'Playfair Display',serif",fontWeight:600,fontStyle:"italic",cursor:"pointer",transition:"all 0.2s"}}>Write Another 🌸</button>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer style={{background:"#1e1030",color:"#d8c8f0",textAlign:"center",padding:"64px 24px",position:"relative",overflow:"hidden",width:"100%",boxSizing:"border-box"}}>
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Playfair Display',serif",fontSize:200,fontWeight:700,color:"rgba(255,255,255,0.025)",pointerEvents:"none",lineHeight:1}}>Love</div>
        <span style={{fontSize:64,display:"block",marginBottom:18}}>🌸</span>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:32,fontWeight:700,fontStyle:"italic",marginBottom:12}}>Embrace the Magic of Us</h2>
        <p style={{fontSize:13,opacity:0.5,letterSpacing:"1.2px",fontWeight:300}}>Made with every bit of love in my heart · Only for Khushi Bansal · Always &amp; Forever</p>
        <div style={{marginTop:28,fontSize:20,letterSpacing:10,opacity:0.4}}>♥ ♥ ♥ ♥ ♥</div>
      </footer>
    </div>
  );
}

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; width: 100%; }
  body { font-family: 'Jost', sans-serif; background: #faf8ff; width: 100%; overflow-x: hidden; }
  #root { width: 100%; min-height: 100vh; }
  @keyframes particleFloat{0%{transform:translateY(0) rotate(0deg);}33%{transform:translateY(-20px) rotate(8deg);}66%{transform:translateY(-8px) rotate(-5deg);}100%{transform:translateY(0) rotate(0deg);}}
  @keyframes heartBeat{0%,100%{transform:scale(1);}14%{transform:scale(1.35);}28%{transform:scale(1);}42%{transform:scale(1.18);}70%{transform:scale(1);}}
  @keyframes shimmer{0%{background-position:200% center;}100%{background-position:-200% center;}}
  @keyframes loginAppear{from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);}}
  @keyframes shake{0%,100%{transform:translateX(0);}20%,60%{transform:translateX(-8px);}40%,80%{transform:translateX(8px);}}
  @keyframes heartRise{0%{opacity:1;transform:translateY(0) scale(1);}100%{opacity:0;transform:translateY(-90px) scale(1.5);}}
  @keyframes ticker{from{transform:translateX(0);}to{transform:translateX(-33.33%);}}
  @keyframes bounce{0%,100%{transform:translateX(-50%) translateY(0);}50%{transform:translateX(-50%) translateY(10px);}}
  @keyframes barDance{from{transform:scaleY(0.4);}to{transform:scaleY(1.2);}}
`;

export default function App() {
  const [loggedIn,setLoggedIn]=useState(false);
  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      {loggedIn ? <MainSite/> : <LoginScreen onLogin={()=>setLoggedIn(true)}/>}
    </>
  );
}