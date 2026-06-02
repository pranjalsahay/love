import { useState, useEffect } from "react";

import pic1 from "./assets/pic1.jpeg";
import pic2 from "./assets/pic2.jpeg";
import pic3 from "./assets/pic3.jpeg";
import pic4 from "./assets/pic4.jpeg";
import pic5 from "./assets/pic5.jpeg";
import pic6 from "./assets/pic6.jpeg";
import pic7 from "./assets/pic7.jpeg";

const VALID_NAMES = ["khushi", "khushi bansal"];
const VALID_PASS = "ilovekhushi";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500&display=swap');`;

const style = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --rose: #7c5cbf;
    --rose-light: #c9b8e8;
    --rose-pale: #f3eeff;
    --rose-deep: #3b2070;
    --cream: #faf8ff;
    --petal: #ede4f7;
    --text: #1e1030;
    --muted: #6b5490;
    --gold: #9b7fd4;
    --nav-h: 64px;
  }
  html { scroll-behavior: smooth; }
  body { font-family: 'Jost', sans-serif; background: var(--cream); color: var(--text); overflow-x: hidden; }

  @keyframes petalFloat {
    0%   { transform: translateY(0px)   rotate(0deg)   scale(1);   opacity: 0.18; }
    33%  { transform: translateY(-22px) rotate(9deg)   scale(1.06); opacity: 0.24; }
    66%  { transform: translateY(-9px)  rotate(-6deg)  scale(0.96); opacity: 0.16; }
    100% { transform: translateY(0px)   rotate(0deg)   scale(1);   opacity: 0.18; }
  }
  .petal-float { position: absolute; pointer-events: none; animation: petalFloat var(--dur) ease-in-out infinite; animation-delay: var(--delay); user-select: none; }

  @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  @keyframes heartBeat { 0%,100%{transform:scale(1);} 14%{transform:scale(1.35);} 28%{transform:scale(1);} 42%{transform:scale(1.18);} 70%{transform:scale(1);} }
  @keyframes shimmer { 0%{background-position:200% center;} 100%{background-position:-200% center;} }
  @keyframes borderPulse { 0%,100%{box-shadow:0 0 0 0 rgba(124,92,191,0);} 50%{box-shadow:0 0 24px 6px rgba(124,92,191,0.16);} }
  @keyframes ticker { from{transform:translateX(0%);} to{transform:translateX(-50%);} }
  @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0);} 50%{transform:translateX(-50%) translateY(9px);} }
  @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.5;} }
  @keyframes floatUp { 0%{opacity:1;transform:translateY(0) scale(1);} 100%{opacity:0;transform:translateY(-80px) scale(1.4);} }
  @keyframes spin { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
  @keyframes slideIn { from{opacity:0;transform:translateX(-30px);} to{opacity:1;transform:translateX(0);} }
  @keyframes scaleIn { from{opacity:0;transform:scale(0.85);} to{opacity:1;transform:scale(1);} }
  @keyframes shake { 0%,100%{transform:translateX(0);} 20%,60%{transform:translateX(-8px);} 40%,80%{transform:translateX(8px);} }

  /* ── LOGIN ── */
  .login-wrap {
    min-height:100vh; display:flex; align-items:center; justify-content:center;
    background: radial-gradient(ellipse at 30% 30%, #e8d8ff 0%, #f5f0ff 45%, #ede8ff 100%);
    position:relative; overflow:hidden; padding:40px 20px;
  }
  .login-card {
    background:rgba(255,255,255,0.85); backdrop-filter:blur(20px);
    border:1.5px solid rgba(201,184,232,0.7); border-radius:32px;
    padding:48px 44px; width:100%; max-width:430px; z-index:2;
    animation:fadeUp 0.9s ease both, borderPulse 3s ease-in-out 1.2s infinite;
    text-align:center;
  }
  .login-hearts { font-size:30px; letter-spacing:14px; animation:heartBeat 2.2s ease-in-out infinite; display:block; margin-bottom:22px; }
  .login-headline {
    font-family:'Playfair Display',serif; font-size:36px; font-weight:700; font-style:italic;
    background:linear-gradient(90deg,#7c5cbf,#b49de0,#9b7fd4,#b49de0,#7c5cbf);
    background-size:300% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    animation:shimmer 4s linear infinite; line-height:1.2; margin-bottom:10px;
  }
  .login-sub { font-size:12px; color:var(--muted); letter-spacing:1.8px; margin-bottom:34px; text-transform:uppercase; }
  .field-wrap { text-align:left; margin-bottom:18px; }
  .field-label { font-size:10px; text-transform:uppercase; letter-spacing:1.8px; color:var(--muted); margin-bottom:7px; display:block; }
  .field-input {
    width:100%; padding:14px 18px; border:1.5px solid var(--rose-light);
    border-radius:14px; font-size:14px; font-family:'Jost',sans-serif;
    color:var(--text); background:rgba(250,248,255,0.9); outline:none;
    transition:border-color 0.2s, box-shadow 0.2s;
  }
  .field-input:focus { border-color:var(--rose); box-shadow:0 0 0 3px rgba(124,92,191,0.1); }
  .login-err { font-size:12.5px; color:var(--rose); min-height:20px; margin-bottom:10px; animation:fadeUp 0.3s ease; }
  .login-btn {
    width:100%; padding:15px; background:var(--rose); color:white; border:none;
    border-radius:16px; font-size:16px; font-family:'Playfair Display',serif;
    font-weight:600; font-style:italic; cursor:pointer;
    transition:background 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow:0 8px 28px rgba(124,92,191,0.32);
  }
  .login-btn:hover { background:#5e3fa3; box-shadow:0 12px 36px rgba(124,92,191,0.42); transform:translateY(-2px); }
  .login-btn:active { transform:scale(0.97); }
  .login-hint { font-size:11px; color:#a090c8; margin-top:14px; font-weight:300; }

  /* ── ANNOUNCE ── */
  .announce { background:var(--rose); color:white; font-size:11.5px; padding:9px 0; overflow:hidden; white-space:nowrap; letter-spacing:0.5px; }
  .announce-inner { display:inline-block; animation:ticker 30s linear infinite; }

  /* ── HEADER / NAV ── */
  .site-header {
    background:rgba(255,255,255,0.93); border-bottom:1px solid #ede4f7;
    padding:0 48px; height:var(--nav-h); display:flex; align-items:center; justify-content:space-between;
    position:sticky; top:0; z-index:200; backdrop-filter:blur(12px);
  }
  .header-logo { font-family:'Playfair Display',serif; font-size:26px; font-weight:700; color:var(--rose); line-height:1; cursor:pointer; }
  .header-logo span { font-size:10px; display:block; font-weight:400; color:var(--muted); letter-spacing:2.5px; font-family:'Jost',sans-serif; font-style:normal; }
  .header-nav { display:flex; gap:6px; }
  .nav-link {
    padding:7px 16px; border-radius:30px; font-size:13px; color:var(--muted);
    cursor:pointer; transition:all 0.2s; text-decoration:none; border:1px solid transparent;
    font-weight:400;
  }
  .nav-link:hover { color:var(--rose); background:var(--rose-pale); border-color:var(--rose-light); }
  .nav-link.active { color:var(--rose); background:var(--rose-pale); border-color:var(--rose-light); font-weight:500; }

  /* ── SECTIONS ── */
  .page { display:none; }
  .page.active { display:block; animation:fadeUp 0.5s ease; }

  /* ── HERO ── */
  .hero {
    min-height:calc(100vh - var(--nav-h) - 38px); display:flex; align-items:center; justify-content:center;
    position:relative; overflow:hidden;
    background:radial-gradient(ellipse at 65% 42%, #e8d8ff 0%, #f5f0ff 50%, #ede8ff 100%);
    padding:80px 40px;
  }
  .hero-content { text-align:center; z-index:2; position:relative; max-width:600px; }
  .hero-tag {
    display:inline-block; background:rgba(124,92,191,0.08); color:var(--rose);
    font-size:11px; letter-spacing:3px; padding:7px 20px; border-radius:20px;
    border:1px solid rgba(124,92,191,0.2); margin-bottom:28px;
    animation:fadeUp 0.7s ease both; text-transform:uppercase;
  }
  .hero-h1 {
    font-family:'Playfair Display',serif; font-size:clamp(44px,8vw,72px);
    font-weight:700; line-height:1.1; color:var(--rose-deep);
    animation:fadeUp 0.8s 0.15s ease both; margin-bottom:26px;
  }
  .hero-h1 em { font-style:italic; color:var(--rose); }
  .hero-p {
    font-size:16px; color:var(--muted); line-height:2; max-width:460px; margin:0 auto 40px;
    animation:fadeUp 0.8s 0.3s ease both; font-weight:300;
  }
  .hero-actions { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; animation:fadeUp 0.8s 0.45s ease both; }
  .btn-primary {
    padding:15px 38px; background:var(--rose); color:white; border:none;
    border-radius:40px; font-size:15px; font-family:'Playfair Display',serif;
    font-weight:600; font-style:italic; cursor:pointer; transition:all 0.22s;
    box-shadow:0 8px 30px rgba(124,92,191,0.32);
  }
  .btn-primary:hover { transform:translateY(-3px); box-shadow:0 16px 44px rgba(124,92,191,0.40); }
  .btn-ghost {
    padding:15px 38px; background:transparent; color:var(--rose);
    border:1.5px solid var(--rose); border-radius:40px; font-size:15px;
    font-family:'Playfair Display',serif; font-weight:600; font-style:italic; cursor:pointer; transition:all 0.22s;
  }
  .btn-ghost:hover { background:var(--rose-pale); transform:translateY(-2px); }
  .hero-scroll { position:absolute; bottom:36px; left:50%; transform:translateX(-50%); font-size:24px; animation:bounce 2.2s ease-in-out infinite; color:var(--rose); opacity:0.6; cursor:pointer; }
  .hero-stats { display:flex; gap:40px; justify-content:center; margin-top:48px; animation:fadeUp 0.8s 0.6s ease both; }
  .stat-item { text-align:center; }
  .stat-num { font-family:'Playfair Display',serif; font-size:32px; font-weight:700; color:var(--rose); line-height:1; }
  .stat-label { font-size:11px; color:var(--muted); letter-spacing:1.5px; margin-top:4px; text-transform:uppercase; }

  /* ── SHARED SECTION ── */
  .section { padding:100px 48px; }
  .section-label { font-size:10px; letter-spacing:3.5px; color:var(--rose); text-transform:uppercase; margin-bottom:12px; }
  .section-h2 { font-family:'Playfair Display',serif; font-size:clamp(28px,5vw,46px); font-weight:700; color:var(--rose-deep); line-height:1.22; margin-bottom:20px; }
  .section-h2 em { font-style:italic; }

  /* ── STORY ── */
  .story-grid { display:grid; grid-template-columns:1fr 1fr; gap:70px; align-items:center; max-width:880px; margin:0 auto; }
  .story-img {
    width:100%; aspect-ratio:1; border-radius:32px;
    background:linear-gradient(135deg,#ede4f7,#d8c8f0,#e8d8ff);
    display:flex; align-items:center; justify-content:center; font-size:120px;
    box-shadow:0 28px 70px rgba(124,92,191,0.14), 0 0 0 1px rgba(201,184,232,0.5);
    position:relative; overflow:hidden;
  }
  .story-img::after { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(255,255,255,0.28),transparent); }
  .story-badge {
    position:absolute; bottom:-16px; right:-16px;
    background:var(--rose); color:white; border-radius:50%; width:76px; height:76px;
    display:flex; align-items:center; justify-content:center; font-size:32px;
    box-shadow:0 10px 28px rgba(124,92,191,0.38); border:3px solid white;
  }
  .story-img-wrap { position:relative; }
  .story-text p { font-size:15.5px; color:var(--muted); line-height:2.1; font-weight:300; margin-bottom:16px; }
  .story-btn { margin-top:10px; padding:13px 30px; background:transparent; border:1.5px solid var(--rose); color:var(--rose); border-radius:30px; font-size:14px; font-family:'Playfair Display',serif; font-weight:600; font-style:italic; cursor:pointer; transition:all 0.2s; }
  .story-btn:hover { background:var(--rose); color:white; }

  /* ── PROMISES ── */
  .promises-bg { background:white; }
  .promises-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; max-width:860px; margin:52px auto 0; }
  .promise-card {
    background:var(--rose-pale); border:1px solid rgba(201,184,232,0.5);
    border-radius:24px; padding:32px 26px; transition:transform 0.25s, box-shadow 0.25s;
    position:relative; overflow:hidden; cursor:default;
  }
  .promise-card::before { content:''; position:absolute; top:-28px; right:-28px; width:90px; height:90px; border-radius:50%; background:rgba(124,92,191,0.05); }
  .promise-card:hover { transform:translateY(-8px); box-shadow:0 24px 60px rgba(124,92,191,0.13); }
  .promise-icon { font-size:42px; margin-bottom:16px; display:block; }
  .promise-card h3 { font-family:'Playfair Display',serif; font-size:19px; color:var(--rose); margin-bottom:10px; font-weight:700; }
  .promise-card p { font-size:13.5px; color:var(--muted); line-height:1.9; font-weight:300; }
  .promise-num { position:absolute; top:16px; right:20px; font-family:'Playfair Display',serif; font-size:56px; font-weight:700; color:rgba(124,92,191,0.06); line-height:1; }

  /* ── LETTER ── */
  .letter-bg { background:radial-gradient(ellipse at center,#f3eeff,var(--cream)); }
  .letter-wrap { max-width:640px; margin:0 auto; }
  .letter-paper {
    background:white; border-radius:28px; padding:56px 56px;
    box-shadow:0 36px 90px rgba(124,92,191,0.10), 0 0 0 1px rgba(201,184,232,0.4);
    position:relative; overflow:hidden;
  }
  .letter-paper::before { content:''; position:absolute; top:0; left:0; right:0; height:6px; background:linear-gradient(90deg,var(--rose),#b49de0,var(--gold),#b49de0,var(--rose)); }
  .letter-paper::after { content:'"'; position:absolute; top:28px; right:40px; font-family:'Playfair Display',serif; font-size:140px; font-weight:700; color:rgba(124,92,191,0.04); line-height:1; pointer-events:none; }
  .letter-date { font-size:12px; color:#a090c8; letter-spacing:1.2px; margin-bottom:26px; }
  .letter-salute { font-family:'Playfair Display',serif; font-size:28px; font-style:italic; color:var(--rose); margin-bottom:24px; }
  .letter-body { font-size:15.5px; color:var(--muted); line-height:2.15; font-weight:300; }
  .letter-body p { margin-bottom:20px; }
  .letter-sign-wrap { margin-top:38px; display:flex; flex-direction:column; align-items:flex-end; gap:4px; }
  .letter-sign { font-family:'Playfair Display',serif; font-size:24px; font-style:italic; color:var(--rose); }
  .letter-hearts { font-size:24px; letter-spacing:8px; margin-top:10px; text-align:center; }

  /* ── PHOTOS ── */
  .photos-bg { background:white; }
  .photos-header { text-align:center; margin-bottom:52px; }
  .photo-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; max-width:900px; margin:0 auto; }
  .photo-card {
    border-radius:22px; overflow:hidden; position:relative;
    aspect-ratio:4/5; cursor:pointer; transition:transform 0.35s, box-shadow 0.35s;
    box-shadow:0 6px 24px rgba(124,92,191,0.09);
  }
  .photo-card:hover { transform:scale(1.035) rotate(-1deg); box-shadow:0 20px 50px rgba(124,92,191,0.18); }
  .photo-card:hover .photo-overlay { opacity:1; }
  .photo-inner { width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-size:72px; position:relative; }
  .photo-inner img { width:100%; height:100%; object-fit:cover; display:block; }
  .photo-overlay {
    position:absolute; inset:0; background:linear-gradient(to top, rgba(59,32,112,0.85) 0%, transparent 60%);
    display:flex; flex-direction:column; justify-content:flex-end; padding:20px;
    opacity:0; transition:opacity 0.3s;
  }
  .photo-caption { color:white; font-size:13px; font-family:'Playfair Display',serif; font-style:italic; font-weight:400; }
  .photo-date { color:rgba(255,255,255,0.65); font-size:11px; margin-top:3px; letter-spacing:1px; }
  .photo-featured { grid-column:span 2; aspect-ratio:16/9; }

  /* ── TIMELINE ── */
  .timeline-bg { background:radial-gradient(ellipse at 70% 30%, #f3eeff, var(--cream) 60%); }
  .timeline-wrap { max-width:680px; margin:0 auto; position:relative; }
  .timeline-line {
    position:absolute; left:36px; top:20px; bottom:20px; width:2px;
    background:linear-gradient(to bottom, var(--rose-light), var(--rose), var(--rose-light));
    border-radius:2px;
  }
  .timeline-item { display:flex; gap:32px; margin-bottom:48px; align-items:flex-start; animation:slideIn 0.5s ease both; }
  .timeline-dot {
    width:72px; height:72px; border-radius:50%; background:white;
    border:3px solid var(--rose); display:flex; align-items:center; justify-content:center;
    font-size:28px; flex-shrink:0; position:relative; z-index:1;
    box-shadow:0 6px 22px rgba(124,92,191,0.18);
  }
  .timeline-body { background:white; border-radius:20px; padding:24px 28px; flex:1; border:1px solid rgba(201,184,232,0.5); box-shadow:0 4px 20px rgba(124,92,191,0.07); }
  .timeline-body h3 { font-family:'Playfair Display',serif; font-size:20px; color:var(--rose); margin-bottom:6px; font-weight:700; }
  .timeline-body .tl-date { font-size:11px; color:var(--gold); letter-spacing:1.5px; text-transform:uppercase; margin-bottom:10px; display:block; }
  .timeline-body p { font-size:14px; color:var(--muted); line-height:1.9; font-weight:300; }

  /* ── PLAYLIST ── */
  .playlist-bg { background:white; }
  .playlist-header { text-align:center; margin-bottom:52px; }
  .playlist-wrap { max-width:640px; margin:0 auto; }
  .playlist-card {
    background:white; border:1px solid rgba(201,184,232,0.6); border-radius:18px;
    padding:18px 22px; display:flex; align-items:center; gap:18px;
    margin-bottom:14px; transition:all 0.25s; cursor:pointer; position:relative; overflow:hidden;
  }
  .playlist-card::before { content:''; position:absolute; left:0; top:0; bottom:0; width:4px; background:var(--rose); transform:scaleY(0); transition:transform 0.2s; border-radius:2px 0 0 2px; }
  .playlist-card:hover { background:var(--rose-pale); transform:translateX(6px); border-color:var(--rose-light); }
  .playlist-card:hover::before { transform:scaleY(1); }
  .playlist-card.playing { background:var(--rose-pale); border-color:var(--rose); }
  .playlist-card.playing::before { transform:scaleY(1); }
  .song-num { font-family:'Playfair Display',serif; font-size:22px; font-weight:700; color:rgba(124,92,191,0.2); min-width:32px; }
  .song-info { flex:1; }
  .song-title { font-size:15px; font-weight:500; color:var(--text); margin-bottom:3px; }
  .song-artist { font-size:12.5px; color:var(--muted); font-weight:300; }
  .song-reason { font-size:11.5px; color:var(--rose); margin-top:5px; font-style:italic; }
  .song-emoji { font-size:28px; }
  .song-dur { font-size:12px; color:var(--muted); min-width:36px; text-align:right; }
  .playlist-note { margin-top:32px; text-align:center; padding:22px; background:var(--rose-pale); border-radius:16px; border:1px solid rgba(201,184,232,0.5); }
  .playlist-note p { font-size:14px; color:var(--muted); line-height:1.9; }

  /* ── WISH / MESSAGE ── */
  .wish-bg { background:radial-gradient(ellipse at center, #f3eeff, var(--cream)); }
  .wish-wrap { max-width:680px; margin:0 auto; }
  .wish-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:40px; }
  .wish-card {
    background:white; border-radius:22px; padding:28px 26px;
    border:1px solid rgba(201,184,232,0.5); box-shadow:0 6px 28px rgba(124,92,191,0.07);
    transition:transform 0.25s; cursor:default;
  }
  .wish-card:hover { transform:translateY(-4px); }
  .wish-card-icon { font-size:38px; margin-bottom:14px; }
  .wish-card h3 { font-family:'Playfair Display',serif; font-size:18px; color:var(--rose); margin-bottom:8px; }
  .wish-card p { font-size:13.5px; color:var(--muted); line-height:1.9; font-weight:300; }
  .wish-message {
    background:white; border-radius:28px; padding:44px 44px;
    box-shadow:0 28px 80px rgba(124,92,191,0.10); border:1px solid rgba(201,184,232,0.4);
    text-align:center; position:relative; overflow:hidden;
  }
  .wish-message::before { content:''; position:absolute; top:0; left:0; right:0; height:5px; background:linear-gradient(90deg,var(--rose),var(--gold),var(--rose)); }
  .wish-input-area { width:100%; border:1.5px solid var(--rose-light); border-radius:16px; padding:16px 18px; font-size:14.5px; font-family:'Jost',sans-serif; color:var(--text); resize:none; outline:none; line-height:1.7; margin:20px 0; background:var(--cream); transition:border-color 0.2s; }
  .wish-input-area:focus { border-color:var(--rose); }
  .wish-submit { padding:14px 40px; background:var(--rose); color:white; border:none; border-radius:40px; font-size:15px; font-family:'Playfair Display',serif; font-weight:600; font-style:italic; cursor:pointer; transition:all 0.2s; box-shadow:0 6px 24px rgba(124,92,191,0.28); }
  .wish-submit:hover { background:#5e3fa3; transform:translateY(-2px); }
  .wish-response { margin-top:24px; padding:22px 26px; background:var(--rose-pale); border-radius:16px; font-size:14.5px; color:var(--muted); line-height:1.9; text-align:left; font-style:italic; display:none; }
  .heart-burst { position:fixed; pointer-events:none; z-index:9999; font-size:26px; animation:floatUp 1.2s ease forwards; }

  /* ── FOOTER ── */
  .site-footer { background:#1e1030; color:#d8c8f0; text-align:center; padding:64px 24px; position:relative; overflow:hidden; }
  .footer-bg-text { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-family:'Playfair Display',serif; font-size:200px; font-weight:700; color:rgba(255,255,255,0.025); pointer-events:none; line-height:1; letter-spacing:-10px; }
  .footer-rose { font-size:64px; display:block; margin-bottom:18px; }
  .footer-h { font-family:'Playfair Display',serif; font-size:32px; font-weight:700; font-style:italic; margin-bottom:12px; }
  .footer-sub { font-size:13px; opacity:0.5; letter-spacing:1.2px; font-weight:300; }
  .footer-hearts { margin-top:28px; font-size:20px; letter-spacing:10px; opacity:0.4; }

  /* ── FULL SCREEN FIX ── */
  html, body, #root { margin:0 !important; padding:0 !important; width:100% !important; min-height:100vh; overflow-x:hidden; }
  body { display:block; }
  #root { width:100vw; max-width:100vw; }
  .site-header, .hero, .section, .site-footer, .page { width:100%; }
  .section { padding-left:5vw !important; padding-right:5vw !important; }
  .hero { min-height:100vh !important; }

  /* ── RESPONSIVE ── */
  @media (max-width:680px) {
    .story-grid { grid-template-columns:1fr; gap:36px; }
    .promises-grid { grid-template-columns:1fr; }
    .photo-grid { grid-template-columns:1fr 1fr; }
    .photo-featured { grid-column:span 2; aspect-ratio:4/3; }
    .header-nav { display:none; }
    .letter-paper { padding:36px 26px; }
    .site-header { padding:0 20px; }
    .section { padding:70px 20px; }
    .hero { padding:60px 20px; }
    .wish-grid { grid-template-columns:1fr; }
    .timeline-line { left:28px; }
    .timeline-dot { width:56px; height:56px; font-size:22px; }
    .wish-message { padding:32px 24px; }
  }
`;

const FloatingPetals = ({ count = 18 }) => {
  const items = Array.from({ length: count }, (_, i) => ({
    emoji: ["🌸", "♥", "💜", "✨", "💕", "🌷", "💝", "💌"][i % 8],
    left: `${5 + (i * 5.2) % 90}%`,
    top: `${5 + (i * 7.3) % 88}%`,
    dur: `${5 + (i % 4)}s`,
    delay: `${(i * 0.4) % 4}s`,
    size: `${14 + (i % 3) * 8}px`,
  }));
  return (
    <>
      {items.map((p, i) => (
        <span key={i} className="petal-float"
          style={{ left: p.left, top: p.top, "--dur": p.dur, "--delay": p.delay, fontSize: p.size }}>
          {p.emoji}
        </span>
      ))}
    </>
  );
};

const LoginScreen = ({ onLogin }) => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [shaking, setShaking] = useState(false);

  const attempt = () => {
    const n = name.trim().toLowerCase();
    const p = pass.trim().toLowerCase();
    if (VALID_NAMES.includes(n) && p === VALID_PASS) {
      onLogin();
    } else {
      setErr("💜 Hmm, that doesn't match. Try again, love!");
      setShaking(true);
      setTimeout(() => { setErr(""); setShaking(false); }, 2200);
    }
  };

  return (
    <div className="login-wrap">
      <FloatingPetals count={24} />
      <div
        className="login-card"
        style={shaking ? { animation: "fadeUp 0.9s ease both, borderPulse 3s ease-in-out 1.2s infinite, shake 0.4s ease" } : {}}
      >
        <span className="login-hearts">♥ ♥ ♥</span>
        <h1 className="login-headline">A Little Something<br />Just for You</h1>
        <p className="login-sub">Private · Made with love · Only for you 🌸</p>
        <div className="field-wrap">
          <label className="field-label">Your name</label>
          <input
            className="field-input"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter your name…"
            onKeyDown={e => e.key === "Enter" && attempt()}
          />
        </div>
        <div className="field-wrap">
          <label className="field-label">Secret password</label>
          <input
            className="field-input"
            type="password"
            value={pass}
            onChange={e => setPass(e.target.value)}
            placeholder="Enter password…"
            onKeyDown={e => e.key === "Enter" && attempt()}
          />
        </div>
        <div className="login-err">{err || " "}</div>
        <button className="login-btn" onClick={attempt}>Open with Love 💌</button>
        <p className="login-hint">Psst… only one person in this world knows the password 🤫</p>
      </div>
    </div>
  );
};

const HeartBurst = ({ x, y, onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 1300);
    return () => clearTimeout(t);
  }, []);
  return <div className="heart-burst" style={{ left: x - 13, top: y - 13 }}>💜</div>;
};

const MainSite = () => {
  const [page, setPage] = useState("home");
  const [hearts, setHearts] = useState([]);
  const [wishText, setWishText] = useState("");
  const [wishSent, setWishSent] = useState(false);
  const [playingIdx, setPlayingIdx] = useState(null);

  const tickerText = "✦ I'm sorry, Khushi ✦ You are my everything ✦ I miss your smile ✦ I promise I'll be better ✦ Please forgive me ✦ You deserve the world ✦ This will never happen again ✦ I love you, Khushi Bansal ✦ ";

  const promises = [
    { icon: "🤝", title: "I will never repeat this", body: "Whatever hurt you — I promise with my whole heart it will never happen again. Never, ever.", n: "01" },
    { icon: "👂", title: "I will always listen", body: "Your feelings come first. I'll listen before I speak, and truly understand you.", n: "02" },
    { icon: "💪", title: "I will be better", body: "Not just in words — in actions. Every single day, I'll show up worthy of you.", n: "03" },
    { icon: "🌙", title: "I'll always be there", body: "In your happy moments, hard days, random 2 AM thoughts — always, always there.", n: "04" },
    { icon: "💬", title: "I will communicate", body: "No more silence, no more assumptions. Open, honest, always.", n: "05" },
    { icon: "🌸", title: "I'll choose you daily", body: "Not just when it's easy — on every ordinary day, I'll choose you. Always.", n: "06" },
  ];

  const photos = [
    { image: pic1, caption: "Beautiful Memory ❤️", date: "Special Moment" },
    { image: pic2, caption: "Our Smile 🌸", date: "Forever Together" },
    { image: pic3, caption: "Best Day 💕", date: "Unforgettable" },
    { image: pic4, caption: "Just Us ✨", date: "Pure Happiness" },
    { image: pic5, caption: "Lovely Memory 💌", date: "Always Special" },
    { image: pic6, caption: "Golden Time 🌷", date: "Beautiful Day" },
    { image: pic7, caption: "You & Me 💖", date: "My Favorite" },
  ];

  const timeline = [
    { icon: "💫", title: "The Moment I Noticed You", date: "The Very Beginning", body: "There was something about you — the way you carried yourself, the way you laughed. I knew then that you were different. That you were special." },
    { icon: "☕", title: "Our First Real Conversation", date: "Getting to Know You", body: "We talked for hours and it felt like minutes. I remember thinking: I never want this to end. And I still don't." },
    { icon: "💕", title: "When I Realised I Loved You", date: "A Quiet Revelation", body: "It wasn't a grand moment. It was something small — and I thought: oh. It's you. It's always been you." },
    { icon: "🌟", title: "The Best Days with You", date: "Everything in Between", body: "Every laugh, every plan, every inside joke, every message — those are the things I treasure most. The small, ordinary, extraordinary moments." },
    { icon: "💔", title: "When I Hurt You", date: "My Biggest Regret", body: "I made a mistake. And seeing the hurt on your face was the worst feeling I have ever known. I am so deeply sorry, Khushi." },
    { icon: "🌸", title: "The Promise I'm Making Now", date: "From This Day Forward", body: "I choose to be better. I choose you — every day, in every way. This is not just a page on the internet. This is my heart." },
  ];

  const songs = [
    { title: "Tum Hi Ho", artist: "Arijit Singh", reason: "Every word feels like I wrote it for you", emoji: "🎵", dur: "4:22" },
    { title: "Tera Ban Jaunga", artist: "Akhil Sachdeva", reason: "This is exactly how I feel", emoji: "🎶", dur: "3:47" },
    { title: "Pehla Nasha", artist: "Udit Narayan", reason: "You gave me this feeling", emoji: "🎵", dur: "5:10" },
    { title: "Jeena Jeena", artist: "Atif Aslam", reason: "You taught me what living feels like", emoji: "🎶", dur: "3:38" },
    { title: "Ik Vaari Aa", artist: "Arijit Singh", reason: "Come back to me once more", emoji: "🎵", dur: "4:05" },
    { title: "Main Rahoon Ya Na Rahoon", artist: "Armaan Malik", reason: "My feelings for you will never change", emoji: "🎶", dur: "4:51" },
    { title: "Raabta", artist: "Arijit Singh", reason: "There is something cosmic between us", emoji: "🎵", dur: "3:55" },
  ];

  const wishes = [
    { icon: "🌟", title: "I wish you only happiness", body: "Every single morning, I want you to wake up to peace, warmth, and joy. You deserve all of that and more." },
    { icon: "💪", title: "I wish you strength", body: "In your hard days, your long nights, your doubts — I wish you the strength to know you are more than enough." },
    { icon: "🌸", title: "I wish you to feel loved", body: "Not just by me — but by the world. Because someone as beautiful as you deserves to be surrounded by love." },
    { icon: "✨", title: "I wish us a second chance", body: "If you find it in your heart to forgive me, I promise I will spend every day making you glad you did." },
  ];

  const spawnHearts = (e) => {
    const newHeart = { id: Date.now(), x: e.clientX, y: e.clientY };
    setHearts(h => [...h, newHeart]);
  };

  const navLinks = [
    { key: "home", label: "Home" },
    { key: "story", label: "Our Story" },
    { key: "promises", label: "Promises" },
    { key: "photos", label: "Photos" },
    { key: "timeline", label: "Timeline" },
    { key: "playlist", label: "Playlist" },
    { key: "letter", label: "Sorry Letter" },
    { key: "wishes", label: "Wishes" },
  ];

  return (
    <div onClick={spawnHearts}>
      {hearts.map(h => (
        <HeartBurst key={h.id} x={h.x} y={h.y} onDone={() => setHearts(hs => hs.filter(x => x.id !== h.id))} />
      ))}

      {/* Announce */}
      <div className="announce">
        <div className="announce-inner">{tickerText.repeat(3)}</div>
      </div>

      {/* Header */}
      <header className="site-header">
        <div className="header-logo" onClick={() => setPage("home")}>
          Khushi's Corner
          <span>A love letter in code</span>
        </div>
        <nav className="header-nav">
          {navLinks.map(l => (
            <a key={l.key} className={`nav-link ${page === l.key ? "active" : ""}`} onClick={() => setPage(l.key)}>
              {l.label}
            </a>
          ))}
        </nav>
      </header>

      {/* ── HOME ── */}
      <div className={`page ${page === "home" ? "active" : ""}`}>
        <section className="hero">
          <FloatingPetals count={26} />
          <div className="hero-content">
            <span className="hero-tag">✦ For Khushi Bansal · With all my love ✦</span>
            <h1 className="hero-h1">
              Where <em>Romance</em><br />Finds Its Way Back
            </h1>
            <p className="hero-p">
              A little corner of the internet built entirely for you — to say sorry, to make promises, and to remind you just how much you mean to me.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => setPage("letter")}>Read My Heart 💕</button>
              <button className="btn-ghost" onClick={() => setPage("promises")}>My Promises 🤝</button>
            </div>
            <div className="hero-stats">
              <div className="stat-item"><div className="stat-num">6</div><div className="stat-label">Promises Made</div></div>
              <div className="stat-item"><div className="stat-num">∞</div><div className="stat-label">Love Given</div></div>
              <div className="stat-item"><div className="stat-num">1</div><div className="stat-label">Person in Mind</div></div>
            </div>
          </div>
          <div className="hero-scroll" onClick={() => setPage("story")}>↓</div>
        </section>
      </div>

      {/* ── OUR STORY ── */}
      <div className={`page ${page === "story" ? "active" : ""}`}>
        <section className="section" style={{ background: "radial-gradient(ellipse at 60% 40%, #e8d8ff 0%, #f5f0ff 50%, #ede8ff 100%)" }}>
          <div className="story-grid">
            <div className="story-img-wrap">
              <div className="story-img">🌸</div>
              <div className="story-badge">💞</div>
            </div>
            <div className="story-text">
              <p className="section-label">Discover</p>
              <h2 className="section-h2">Our Story Is <em>Worth</em> Fighting For</h2>
              <p>Every love story has its bumps — ours is no different. But what makes ours special is <em>you</em>, Khushi. Your warmth, your laughter, your everything.</p>
              <p>I messed up, and I own that completely. This page is my way of reaching out when words alone feel too small. Because you deserve more than just words.</p>
              <p>You are the person I think about first when something good happens, and the person I want to hold when something goes wrong. That doesn't change. That will never change.</p>
              <button className="story-btn" onClick={() => setPage("timeline")}>See Our Timeline 💞</button>
            </div>
          </div>
        </section>
      </div>

      {/* ── PROMISES ── */}
      <div className={`page ${page === "promises" ? "active" : ""}`}>
        <section className="section promises-bg">
          <div style={{ textAlign: "center" }}>
            <p className="section-label">From the heart</p>
            <h2 className="section-h2" style={{ maxWidth: 500, margin: "0 auto" }}>My <em>Promises</em> to You, Khushi</h2>
          </div>
          <div className="promises-grid">
            {promises.map((p, i) => (
              <div className="promise-card" key={i}>
                <span className="promise-num">{p.n}</span>
                <span className="promise-icon">{p.icon}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── PHOTOS ── */}
      <div className={`page ${page === "photos" ? "active" : ""}`}>
        <section className="section photos-bg">
          <div className="photos-header">
            <p className="section-label">Gallery of us</p>
            <h2 className="section-h2"><em>Moments</em> That Live in My Heart</h2>
            <p style={{ fontSize: 15, color: "var(--muted)", maxWidth: 440, margin: "0 auto", fontWeight: 300, lineHeight: 1.9 }}>
              Every photo is a memory. Every memory is proof of something real and beautiful.
            </p>
          </div>
          <div className="photo-grid">
            <div className="photo-card photo-featured">
              <div className="photo-inner" style={{ padding: 0 }}>
                <img src={photos[0].image} alt={photos[0].caption} />
              </div>
              <div className="photo-overlay" style={{ opacity: 1, background: "linear-gradient(to top, rgba(59,32,112,0.8) 0%, transparent 50%)" }}>
                <div className="photo-caption">{photos[0].caption}</div>
                <div className="photo-date">{photos[0].date}</div>
              </div>
            </div>
            {photos.slice(1).map((ph, i) => (
              <div className="photo-card" key={i}>
                <div className="photo-inner" style={{ padding: 0 }}>
                  <img src={ph.image} alt={ph.caption} />
                </div>
                <div className="photo-overlay">
                  <div className="photo-caption">{ph.caption}</div>
                  <div className="photo-date">{ph.date}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── TIMELINE ── */}
      <div className={`page ${page === "timeline" ? "active" : ""}`}>
        <section className="section timeline-bg">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p className="section-label">Our journey</p>
            <h2 className="section-h2">The Story of <em>Us</em></h2>
          </div>
          <div className="timeline-wrap">
            <div className="timeline-line"></div>
            {timeline.map((t, i) => (
              <div className="timeline-item" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="timeline-dot">{t.icon}</div>
                <div className="timeline-body">
                  <span className="tl-date">{t.date}</span>
                  <h3>{t.title}</h3>
                  <p>{t.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── LETTER ── */}
      <div className={`page ${page === "letter" ? "active" : ""}`}>
        <section className="section letter-bg">
          <div className="letter-wrap">
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <p className="section-label">From me, to you</p>
              <h2 className="section-h2">A <em>Letter</em> from My Heart</h2>
            </div>
            <div className="letter-paper">
              <p className="letter-date">June 2026 · Written with love and regret</p>
              <p className="letter-salute">Dearest Khushi,</p>
              <div className="letter-body">
                <p>I know that "sorry" sometimes feels like just a word. But I need you to know that this one comes from the deepest, most honest part of me.</p>
                <p>I made a mistake — and seeing you hurt because of something I did is something I never, ever want to feel again. You don't deserve pain. You deserve someone who is consistent, kind, thoughtful, and shows up fully for you every single day.</p>
                <p>I'm not asking you to forget. I'm asking for the chance to <em>prove</em> to you that I've understood, that I've grown, and that you are worth every effort it takes to become better.</p>
                <p>You are the first thought in my morning and the last in my night. You are the reason I want to be a better person. Not because I have to — but because you deserve nothing less.</p>
                <p>You are my favourite person in this world, Khushi Bansal. And I promise — with everything I have — this will never happen again.</p>
              </div>
              <div className="letter-sign-wrap">
                <p className="letter-sign">— Yours always, forever 💌</p>
              </div>
              <div className="letter-hearts">♥ ♥ ♥</div>
            </div>
          </div>
        </section>
      </div>

      {/* ── PLAYLIST ── */}
      <div className={`page ${page === "playlist" ? "active" : ""}`}>
        <section className="section playlist-bg">
          <div className="playlist-header">
            <p className="section-label">Songs for you</p>
            <h2 className="section-h2">A <em>Playlist</em> That Thinks of You</h2>
            <p style={{ fontSize: 15, color: "var(--muted)", maxWidth: 460, margin: "10px auto 0", fontWeight: 300, lineHeight: 1.9 }}>
              Every time one of these songs plays, you're all I think about.
            </p>
          </div>
          <div className="playlist-wrap">
            {songs.map((s, i) => (
              <div
                className={`playlist-card ${playingIdx === i ? "playing" : ""}`}
                key={i}
                onClick={() => setPlayingIdx(playingIdx === i ? null : i)}
              >
                <div className="song-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="song-info">
                  <div className="song-title">{s.title}</div>
                  <div className="song-artist">{s.artist}</div>
                  {playingIdx === i && <div className="song-reason">"{s.reason}"</div>}
                </div>
                <div className="song-emoji">{playingIdx === i ? "💜" : s.emoji}</div>
                <div className="song-dur">{s.dur}</div>
              </div>
            ))}
            <div className="playlist-note">
              <p>💜 These songs carry everything I couldn't say out loud. Put them on, close your eyes, and know that every word was written for someone like you.</p>
            </div>
          </div>
        </section>
      </div>

      {/* ── WISHES ── */}
      <div className={`page ${page === "wishes" ? "active" : ""}`}>
        <section className="section wish-bg">
          <div className="wish-wrap">
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <p className="section-label">From my heart</p>
              <h2 className="section-h2">My <em>Wishes</em> for You</h2>
            </div>
            <div className="wish-grid">
              {wishes.map((w, i) => (
                <div className="wish-card" key={i}>
                  <div className="wish-card-icon">{w.icon}</div>
                  <h3>{w.title}</h3>
                  <p>{w.body}</p>
                </div>
              ))}
            </div>
            <div className="wish-message">
              <p className="section-label" style={{ textAlign: "center" }}>leave a message</p>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, color: "var(--rose)", marginBottom: 10 }}>
                Say Something to Me, Khushi 💌
              </h3>
              <p style={{ fontSize: 14, color: "var(--muted)", fontWeight: 300 }}>Whatever's on your heart. I'm listening.</p>
              {!wishSent ? (
                <>
                  <textarea
                    className="wish-input-area"
                    rows={4}
                    placeholder="Type your message here… 🌸"
                    value={wishText}
                    onChange={e => setWishText(e.target.value)}
                  />
                  <button className="wish-submit" onClick={() => { if (wishText.trim()) setWishSent(true); }}>
                    Send with Love 💕
                  </button>
                </>
              ) : (
                <div style={{ marginTop: 24 }}>
                  <div style={{ fontSize: 52, marginBottom: 16 }}>💌</div>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: "var(--rose)", fontStyle: "italic", marginBottom: 10 }}>
                    Received with all my love
                  </p>
                  <div className="wish-response" style={{ display: "block" }}>
                    Your message: "{wishText}"<br /><br />
                    Thank you for writing to me, Khushi. Every word from you means the whole world. I will carry this with me always. 🌸
                  </div>
                  <button className="wish-submit" style={{ marginTop: 20 }} onClick={() => { setWishSent(false); setWishText(""); }}>
                    Write Another 🌸
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-bg-text">Love</div>
        <span className="footer-rose">🌸</span>
        <h2 className="footer-h">Embrace the Magic of Us</h2>
        <p className="footer-sub">Made with every bit of love in my heart · Only for Khushi Bansal · Always & Forever</p>
        <div className="footer-hearts">♥ ♥ ♥ ♥ ♥</div>
      </footer>
    </div>
  );
};

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <>
      <style>{`${fonts}${style}`}</style>
      {!loggedIn ? <LoginScreen onLogin={() => setLoggedIn(true)} /> : <MainSite />}
    </>
  );
}

