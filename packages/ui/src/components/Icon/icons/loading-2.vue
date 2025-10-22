<template>
  <!-- 波浪式上下跳动 -->
  <g>
    <rect x="2" y="10" width="2" height="4" rx="1" fill="currentColor">
      <animate
        attributeName="y"
        values="10;4;10"
        dur="1s"
        begin="0s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="height"
        values="4;16;4"
        dur="1s"
        begin="0s"
        repeatCount="indefinite"
      />
    </rect>
    
    <rect x="7" y="10" width="2" height="4" rx="1" fill="currentColor">
      <animate
        attributeName="y"
        values="10;4;10"
        dur="1s"
        begin="0.15s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="height"
        values="4;16;4"
        dur="1s"
        begin="0.15s"
        repeatCount="indefinite"
      />
    </rect>
    
    <rect x="12" y="10" width="2" height="4" rx="1" fill="currentColor">
      <animate
        attributeName="y"
        values="10;4;10"
        dur="1s"
        begin="0.3s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="height"
        values="4;16;4"
        dur="1s"
        begin="0.3s"
        repeatCount="indefinite"
      />
    </rect>
    
    <rect x="17" y="10" width="2" height="4" rx="1" fill="currentColor">
      <animate
        attributeName="y"
        values="10;4;10"
        dur="1s"
        begin="0.45s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="height"
        values="4;16;4"
        dur="1s"
        begin="0.45s"
        repeatCount="indefinite"
      />
    </rect>
    
    <rect x="22" y="10" width="2" height="4" rx="1" fill="currentColor">
      <animate
        attributeName="y"
        values="10;4;10"
        dur="1s"
        begin="0.6s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="height"
        values="4;16;4"
        dur="1s"
        begin="0.6s"
        repeatCount="indefinite"
      />
    </rect>
  </g>
</template>
