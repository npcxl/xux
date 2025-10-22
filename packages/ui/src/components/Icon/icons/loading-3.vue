<template>
  <!-- 三角形旋转变形 -->
  <g>
    <path 
      d="M12 4 L20 20 L4 20 Z" 
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linejoin="round"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 12 12"
        to="360 12 12"
        dur="1.5s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="stroke-dasharray"
        values="0,100;50,50;100,0;50,50;0,100"
        dur="1.5s"
        repeatCount="indefinite"
      />
    </path>
    
    <circle 
      cx="12" 
      cy="12" 
      r="3" 
      fill="currentColor"
    >
      <animate
        attributeName="r"
        values="3;5;3"
        dur="1.5s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="1;0.3;1"
        dur="1.5s"
        repeatCount="indefinite"
      />
    </circle>
  </g>
</template>

