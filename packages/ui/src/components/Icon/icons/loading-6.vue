<template>
  <!-- 方块翻转 -->
  <g>
    <rect 
      x="8" 
      y="8" 
      width="8" 
      height="8" 
      rx="1"
      fill="currentColor"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        values="0 12 12;90 12 12;180 12 12;270 12 12;360 12 12"
        dur="1.2s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="rx"
        values="1;8;1;8;1"
        dur="1.2s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="1;0.3;1;0.3;1"
        dur="1.2s"
        repeatCount="indefinite"
      />
    </rect>
  </g>
</template>

