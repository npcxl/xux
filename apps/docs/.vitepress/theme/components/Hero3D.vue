<template>
  <div class="hero-universe">
    <!-- 深空背景 -->
    <div class="cosmos-bg"></div>
    
    <!-- 星空层 -->
    <div class="star-field">
      <div class="star" v-for="i in 150" :key="i" :style="getStarStyle(i)"></div>
    </div>
    
    <!-- 超大黑洞主体 -->
    <div class="blackhole-mega">
      <!-- 纯黑核心 -->
      <div class="singularity"></div>
      
      <!-- 光子球 - 最亮光环 -->
      <div class="photon-sphere"></div>
      
      <!-- 5层吸积盘 -->
      <div class="accretion-layer layer-1"></div>
      <div class="accretion-layer layer-2"></div>
      <div class="accretion-layer layer-3"></div>
      <div class="accretion-layer layer-4"></div>
      <div class="accretion-layer layer-5"></div>
      
      <!-- 喷流 -->
      <div class="jet jet-north"></div>
      <div class="jet jet-south"></div>
    </div>
    
    <!-- 环绕粒子云 -->
    <div class="orbit-particles">
      <div class="orbit-particle" v-for="i in 100" :key="i" :style="getOrbitStyle(i)"></div>
    </div>
    
    <!-- 引力波纹 -->
    <div class="gravity-waves">
      <div class="wave" v-for="i in 8" :key="i"></div>
    </div>
    
    <!-- 全局辉光 -->
    <div class="universal-glow"></div>
  </div>
</template>

<script setup>
const getStarStyle = (i) => {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    '--size': `${1 + Math.random() * 3}px`,
    '--delay': `${Math.random() * 5}s`,
  }
}

const getOrbitStyle = (i) => {
  const angle = (i / 100) * 360
  return {
    '--angle': `${angle}deg`,
    '--radius': `${500 + Math.random() * 400}px`,
    '--delay': `${Math.random() * 15}s`,
    '--duration': `${12 + Math.random() * 8}s`,
  }
}
</script>

<style scoped>
.hero-universe {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
}

/* 宇宙背景 */
.cosmos-bg {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse at 30% 40%, rgba(20, 40, 80, 0.4) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 60%, rgba(40, 20, 60, 0.3) 0%, transparent 50%),
    linear-gradient(180deg, #0a0d1a 0%, #1a1d2a 50%, #0f1218 100%);
}

/* 星空 */
.star-field {
  position: absolute;
  inset: 0;
}

.star {
  position: absolute;
  width: var(--size);
  height: var(--size);
  background: radial-gradient(circle, 
    rgba(255, 255, 255, 1) 0%,
    rgba(180, 200, 255, 0.8) 40%,
    transparent 100%
  );
  border-radius: 50%;
  animation: starPulse 4s ease-in-out infinite;
  animation-delay: var(--delay);
  box-shadow: 0 0 4px rgba(255, 255, 255, 0.8);
}

@keyframes starPulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.3); }
}

/* 超大黑洞 */
.blackhole-mega {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1400px;
  height: 1400px;
}

/* 奇点 */
.singularity {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 280px;
  height: 280px;
  background: 
    radial-gradient(circle at 40% 40%,
      #000000 0%,
      #000000 70%,
      rgba(0, 0, 0, 0.98) 85%,
      rgba(0, 0, 0, 0) 100%
    );
  border-radius: 50%;
  box-shadow: 
    inset 0 0 100px rgba(0, 0, 0, 1),
    inset 0 0 50px rgba(0, 0, 0, 1),
    0 0 80px rgba(0, 0, 0, 0.9),
    0 0 150px rgba(0, 0, 0, 0.7);
  animation: singularityVibrate 2s ease-in-out infinite;
}

@keyframes singularityVibrate {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.02); }
}

/* 光子球 - 超亮光环 */
.photon-sphere {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 360px;
  height: 360px;
  border-radius: 50%;
  background: 
    radial-gradient(circle,
      transparent 0%,
      transparent 73%,
      rgba(80, 180, 255, 0.3) 76%,
      rgba(120, 200, 255, 0.7) 78%,
      rgba(160, 220, 255, 0.95) 79.5%,
      rgba(255, 255, 255, 1) 80.5%,
      rgba(160, 220, 255, 0.95) 82%,
      rgba(120, 200, 255, 0.7) 83.5%,
      rgba(80, 180, 255, 0.3) 86%,
      transparent 90%
    );
  box-shadow: 
    0 0 60px rgba(160, 220, 255, 1),
    0 0 120px rgba(120, 200, 255, 0.8),
    0 0 180px rgba(80, 180, 255, 0.6),
    0 0 240px rgba(60, 160, 255, 0.4),
    inset 0 0 60px rgba(255, 255, 255, 0.5);
  animation: photonGlow 2.5s ease-in-out infinite;
}

@keyframes photonGlow {
  0%, 100% {
    filter: brightness(1) blur(2px);
    opacity: 0.95;
  }
  50% {
    filter: brightness(1.4) blur(3px);
    opacity: 1;
  }
}

/* 吸积盘层 */
.accretion-layer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  animation: diskSpin linear infinite;
}

.layer-1 {
  width: 600px;
  height: 600px;
  background: conic-gradient(
    from 0deg,
    rgba(60, 140, 255, 0) 0deg,
    rgba(60, 140, 255, 0.8) 20deg,
    rgba(80, 180, 255, 0.95) 50deg,
    rgba(120, 200, 255, 1) 80deg,
    rgba(160, 220, 255, 0.95) 110deg,
    rgba(80, 180, 255, 0.8) 140deg,
    rgba(60, 140, 255, 0) 160deg,
    transparent 180deg
  );
  mask-image: radial-gradient(circle, transparent 38%, black 45%, black 68%, transparent 78%);
  -webkit-mask-image: radial-gradient(circle, transparent 38%, black 45%, black 68%, transparent 78%);
  filter: blur(6px);
  animation-duration: 20s;
}

.layer-2 {
  width: 750px;
  height: 750px;
  background: conic-gradient(
    from 90deg,
    rgba(255, 140, 60, 0) 0deg,
    rgba(255, 160, 80, 0.7) 30deg,
    rgba(255, 180, 100, 0.9) 60deg,
    rgba(255, 200, 120, 1) 90deg,
    rgba(255, 180, 100, 0.9) 120deg,
    rgba(255, 160, 80, 0.7) 150deg,
    rgba(255, 140, 60, 0) 180deg,
    transparent 200deg
  );
  mask-image: radial-gradient(circle, transparent 43%, black 50%, black 63%, transparent 73%);
  -webkit-mask-image: radial-gradient(circle, transparent 43%, black 50%, black 63%, transparent 73%);
  filter: blur(8px);
  animation-duration: 28s;
}

.layer-3 {
  width: 900px;
  height: 900px;
  background: conic-gradient(
    from 180deg,
    rgba(140, 80, 255, 0) 0deg,
    rgba(160, 100, 255, 0.6) 40deg,
    rgba(180, 120, 255, 0.85) 80deg,
    rgba(200, 140, 255, 0.95) 120deg,
    rgba(180, 120, 255, 0.85) 160deg,
    rgba(160, 100, 255, 0.6) 200deg,
    rgba(140, 80, 255, 0) 240deg,
    transparent 260deg
  );
  mask-image: radial-gradient(circle, transparent 48%, black 55%, black 58%, transparent 68%);
  -webkit-mask-image: radial-gradient(circle, transparent 48%, black 55%, black 58%, transparent 68%);
  filter: blur(10px);
  animation-duration: 36s;
}

.layer-4 {
  width: 1050px;
  height: 1050px;
  background: conic-gradient(
    from 270deg,
    rgba(80, 200, 255, 0) 0deg,
    rgba(100, 210, 255, 0.5) 50deg,
    rgba(120, 220, 255, 0.75) 100deg,
    rgba(140, 230, 255, 0.9) 150deg,
    rgba(120, 220, 255, 0.75) 200deg,
    rgba(100, 210, 255, 0.5) 250deg,
    rgba(80, 200, 255, 0) 300deg,
    transparent 320deg
  );
  mask-image: radial-gradient(circle, transparent 53%, black 60%, black 53%, transparent 63%);
  -webkit-mask-image: radial-gradient(circle, transparent 53%, black 60%, black 53%, transparent 63%);
  filter: blur(12px);
  animation-duration: 44s;
}

.layer-5 {
  width: 1200px;
  height: 1200px;
  background: conic-gradient(
    from 45deg,
    rgba(200, 220, 255, 0) 0deg,
    rgba(210, 230, 255, 0.4) 60deg,
    rgba(220, 240, 255, 0.65) 120deg,
    rgba(230, 245, 255, 0.8) 180deg,
    rgba(220, 240, 255, 0.65) 240deg,
    rgba(210, 230, 255, 0.4) 300deg,
    rgba(200, 220, 255, 0) 360deg
  );
  mask-image: radial-gradient(circle, transparent 58%, black 64%, black 48%, transparent 58%);
  -webkit-mask-image: radial-gradient(circle, transparent 58%, black 64%, black 48%, transparent 58%);
  filter: blur(15px);
  animation-duration: 52s;
}

@keyframes diskSpin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

/* 喷流 */
.jet {
  position: absolute;
  left: 50%;
  width: 120px;
  height: 600px;
  transform: translateX(-50%);
  background: linear-gradient(180deg,
    rgba(120, 180, 255, 1) 0%,
    rgba(100, 160, 255, 0.9) 10%,
    rgba(80, 140, 255, 0.7) 25%,
    rgba(60, 120, 255, 0.5) 45%,
    rgba(40, 100, 255, 0.3) 65%,
    transparent 100%
  );
  filter: blur(10px);
  animation: jetFlare 4s ease-in-out infinite;
}

.jet-north {
  bottom: 50%;
  transform: translateX(-50%) scaleY(-1);
  animation-delay: 0s;
}

.jet-south {
  top: 50%;
  animation-delay: 2s;
}

@keyframes jetFlare {
  0%, 100% {
    opacity: 0.7;
    transform: translateX(-50%) scaleY(1);
  }
  50% {
    opacity: 1;
    transform: translateX(-50%) scaleY(1.1);
  }
}

/* 轨道粒子 */
.orbit-particles {
  position: absolute;
  top: 50%;
  left: 50%;
}

.orbit-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle,
    rgba(255, 255, 255, 1) 0%,
    rgba(120, 200, 255, 0.9) 50%,
    transparent 100%
  );
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(120, 200, 255, 1);
  animation: orbitPath linear infinite;
  animation-delay: var(--delay);
  animation-duration: var(--duration);
}

@keyframes orbitPath {
  0% {
    transform: 
      translate(-50%, -50%)
      rotate(var(--angle))
      translateX(var(--radius))
      scale(1);
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  92% {
    opacity: 1;
  }
  100% {
    transform: 
      translate(-50%, -50%)
      rotate(calc(var(--angle) + 1440deg))
      translateX(140px)
      scale(0.1);
    opacity: 0;
  }
}

/* 引力波纹 */
.gravity-waves {
  position: absolute;
  top: 50%;
  left: 50%;
}

.wave {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 2px solid rgba(120, 200, 255, 0.4);
  animation: waveExpand 10s ease-out infinite;
}

.wave:nth-child(1) { animation-delay: 0s; }
.wave:nth-child(2) { animation-delay: -1.25s; }
.wave:nth-child(3) { animation-delay: -2.5s; }
.wave:nth-child(4) { animation-delay: -3.75s; }
.wave:nth-child(5) { animation-delay: -5s; }
.wave:nth-child(6) { animation-delay: -6.25s; }
.wave:nth-child(7) { animation-delay: -7.5s; }
.wave:nth-child(8) { animation-delay: -8.75s; }

@keyframes waveExpand {
  0% {
    width: 300px;
    height: 300px;
    opacity: 0;
    border-width: 4px;
  }
  15% {
    opacity: 0.8;
  }
  100% {
    width: 2000px;
    height: 2000px;
    opacity: 0;
    border-width: 0px;
  }
}

/* 全局辉光 */
.universal-glow {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse 60% 60% at 50% 50%,
      rgba(120, 200, 255, 0.2) 0%,
      rgba(80, 160, 255, 0.15) 25%,
      rgba(60, 140, 255, 0.1) 45%,
      transparent 70%
    );
  animation: glowPulse 8s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

/* 响应式 */
@media (max-width: 1024px) {
  .blackhole-mega {
    width: 1000px;
    height: 1000px;
  }

  .singularity {
    width: 200px;
    height: 200px;
  }

  .photon-sphere {
    width: 260px;
    height: 260px;
  }

  .layer-1 { width: 430px; height: 430px; }
  .layer-2 { width: 540px; height: 540px; }
  .layer-3 { width: 650px; height: 650px; }
  .layer-4 { width: 760px; height: 760px; }
  .layer-5 { width: 870px; height: 870px; }
}

@media (max-width: 768px) {
  .blackhole-mega {
    width: 700px;
    height: 700px;
  }

  .singularity {
    width: 140px;
    height: 140px;
  }

  .photon-sphere {
    width: 180px;
    height: 180px;
  }

  .layer-1 { width: 300px; height: 300px; }
  .layer-2 { width: 380px; height: 380px; }
  .layer-3 { width: 460px; height: 460px; }
  .layer-4 { width: 540px; height: 540px; }
  .layer-5 { width: 620px; height: 620px; }

  .jet {
    width: 80px;
    height: 400px;
  }
}

/* 浅色模式 */
@media (prefers-color-scheme: light) {
  .cosmos-bg {
    background: 
      radial-gradient(ellipse at 30% 40%, rgba(180, 200, 255, 0.3) 0%, transparent 50%),
      radial-gradient(ellipse at 70% 60%, rgba(200, 180, 255, 0.25) 0%, transparent 50%),
      linear-gradient(180deg, #e8f0ff 0%, #f0f4ff 50%, #f8f9ff 100%);
  }

  .singularity {
    box-shadow: 
      inset 0 0 100px rgba(0, 0, 0, 1),
      0 0 100px rgba(0, 0, 0, 0.4);
  }

  .star {
    background: radial-gradient(circle, 
      rgba(100, 140, 255, 1) 0%,
      rgba(80, 120, 255, 0.7) 40%,
      transparent 100%
    );
  }
}
</style>

