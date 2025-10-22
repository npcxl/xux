<template>
  <!-- 双圆环交错旋转 -->
  <g>
    <circle 
      cx="12" 
      cy="12" 
      r="9" 
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-dasharray="14 14"
      opacity="0.8"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 12 12"
        to="360 12 12"
        dur="2s"
        repeatCount="indefinite"
      />
    </circle>
    
    <circle 
      cx="12" 
      cy="12" 
      r="6" 
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-dasharray="9 9"
      opacity="0.6"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="360 12 12"
        to="0 12 12"
        dur="1.5s"
        repeatCount="indefinite"
      />
    </circle>
    
    <circle 
      cx="12" 
      cy="12" 
      r="3" 
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-dasharray="5 5"
      opacity="0.4"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 12 12"
        to="360 12 12"
        dur="1s"
        repeatCount="indefinite"
      />
    </circle>
  </g>
</template>

