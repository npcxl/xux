<template>
  <!-- 默认开关样式 -->
  <div 
    v-if="variant === 'default'"
    class="switch" 
    :class="[
      `size-${size}`, 
      { 'disabled': disabled }, 
      { 'loading': loading },
      { 'checked': modelValue }
    ]"
  >
    <input 
      :id="switchId"
      :checked="modelValue"
      @change="handleChange"
      :disabled="disabled || loading"
      type="checkbox"
    >
    <label :for="switchId" class="slider">
      <span v-if="loading" class="loading-spinner">
        <span class="spinner-inner"></span>
      </span>
    </label>
  </div>

  <!-- 主题切换开关 (日夜模式) -->
  <label 
    v-else-if="variant === 'theme'"
    class="theme-switch"
    :class="[
      `size-${size}`,
      { 'disabled': disabled },
      { 'loading': loading }
    ]"
  >
    <input 
      :id="switchId"
      :checked="modelValue"
      @change="handleChange"
      :disabled="disabled || loading"
      type="checkbox" 
      class="theme-switch__checkbox"
    >
    <div class="theme-switch__container">
      <div class="theme-switch__clouds"></div>
      <div class="theme-switch__stars-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 55" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727C136.996 7.95722 137.172 7.25134 137.525 6.59129C137.886 5.93124 138.372 5.39954 138.98 5.00535C139.598 4.60199 140.268 4.39114 141 4.35447C139.88 4.2903 138.936 3.85027 138.16 3.00688C137.384 2.16348 136.996 1.16425 136.996 0C136.996 1.16425 136.607 2.16348 135.831 3.00688ZM31 23.3545C32.1114 23.2995 33.0551 22.8503 33.8313 22.0069C34.6075 21.1635 34.9956 20.1642 34.9956 19C34.9956 20.1642 35.3837 21.1635 36.1599 22.0069C36.9361 22.8503 37.8798 23.2903 39 23.3545C38.2679 23.3911 37.5976 23.602 36.9802 24.0053C36.3716 24.3995 35.8864 24.9312 35.5248 25.5913C35.172 26.2513 34.9956 26.9572 34.9956 27.7273C34.9956 26.563 34.6075 25.5546 33.8313 24.7112C33.0551 23.8587 32.1114 23.4095 31 23.3545ZM0 36.3545C1.11136 36.2995 2.05513 35.8503 2.83131 35.0069C3.6075 34.1635 3.99559 33.1642 3.99559 32C3.99559 33.1642 4.38368 34.1635 5.15987 35.0069C5.93605 35.8503 6.87982 36.2903 8 36.3545C7.26792 36.3911 6.59757 36.602 5.98015 37.0053C5.37155 37.3995 4.88644 37.9312 4.52481 38.5913C4.172 39.2513 3.99559 39.9572 3.99559 40.7273C3.99559 39.563 3.6075 38.5546 2.83131 37.7112C2.05513 36.8587 1.11136 36.4095 0 36.3545ZM56.8313 24.0069C56.0551 24.8503 55.1114 25.2995 54 25.3545C55.1114 25.4095 56.0551 25.8587 56.8313 26.7112C57.6075 27.5546 57.9956 28.563 57.9956 29.7273C57.9956 28.9572 58.172 28.2513 58.5248 27.5913C58.8864 26.9312 59.3716 26.3995 59.9802 26.0053C60.5976 25.602 61.2679 25.3911 62 25.3545C60.8798 25.2903 59.9361 24.8503 59.1599 24.0069C58.3837 23.1635 57.9956 22.1642 57.9956 21C57.9956 22.1642 57.6075 23.1635 56.8313 24.0069ZM81 25.3545C82.1114 25.2995 83.0551 24.8503 83.8313 24.0069C84.6075 23.1635 84.9956 22.1642 84.9956 21C84.9956 22.1642 85.3837 23.1635 86.1599 24.0069C86.9361 24.8503 87.8798 25.2903 89 25.3545C88.2679 25.3911 87.5976 25.602 86.9802 26.0053C86.3716 26.3995 85.8864 26.9312 85.5248 27.5913C85.172 28.2513 84.9956 28.9572 84.9956 29.7273C84.9956 28.563 84.6075 27.5546 83.8313 26.7112C83.0551 25.8587 82.1114 25.4095 81 25.3545ZM136 36.3545C137.111 36.2995 138.055 35.8503 138.831 35.0069C139.607 34.1635 139.996 33.1642 139.996 32C139.996 33.1642 140.384 34.1635 141.16 35.0069C141.936 35.8503 142.88 36.2903 144 36.3545C143.268 36.3911 142.598 36.602 141.98 37.0053C141.372 37.3995 140.886 37.9312 140.525 38.5913C140.172 39.2513 139.996 39.9572 139.996 40.7273C139.996 39.563 139.607 38.5546 138.831 37.7112C138.055 36.8587 137.111 36.4095 136 36.3545ZM101.831 49.0069C101.055 49.8503 100.111 50.2995 99 50.3545C100.111 50.4095 101.055 50.8587 101.831 51.7112C102.607 52.5546 102.996 53.563 102.996 54.7273C102.996 53.9572 103.172 53.2513 103.525 52.5913C103.886 51.9312 104.372 51.3995 104.98 51.0053C105.598 50.602 106.268 50.3911 107 50.3545C105.88 50.2903 104.936 49.8503 104.16 49.0069C103.384 48.1635 102.996 47.1642 102.996 46C102.996 47.1642 102.607 48.1635 101.831 49.0069Z" fill="currentColor"></path>
        </svg>
      </div>
      <div class="theme-switch__circle-container">
        <div class="theme-switch__sun-moon-container">
          <div class="theme-switch__moon">
            <div class="theme-switch__spot"></div>
            <div class="theme-switch__spot"></div>
            <div class="theme-switch__spot"></div>
          </div>
        </div>
      </div>
    </div>
    <span v-if="loading" class="loading-spinner-theme">
      <span class="spinner-inner"></span>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * Switch 开关组件
 * @displayName XSwitch
 */

interface Props {
  modelValue: boolean
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  variant?: 'default' | 'theme'
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  size: 'medium',
  variant: 'default',
  loading: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()

// 生成唯一的 ID 避免冲突
const switchId = computed(() => `switch-${Math.random().toString(36).substr(2, 9)}`)

const handleChange = () => {
  if (!props.disabled && !props.loading) {
    const newValue = !props.modelValue
    
    // 发出 change 事件供父组件处理异步逻辑
    emit('change', newValue)
    
    // 注意：在异步模式下，父组件应该在 @change 事件中阻止默认更新
    // 通过在异步操作成功后手动更新 v-model
    // 同步模式下，直接更新即可
    emit('update:modelValue', newValue)
  }
}
</script>

<style scoped>

/* 高级动画2 */
.theme-switch {
  --toggle-size: 17px;
  --container-width: 3.5em;
  --container-height: 2em;
  --container-radius: 6.25em;
  --container-light-bg: var(--x-theme-switch-light-bg, #3D7EAE);
  --container-night-bg: var(--x-theme-switch-night-bg, #1D1F2C);
  --circle-container-diameter: 2.7em;
  --sun-moon-diameter: 1.7em;
  --sun-bg: var(--x-theme-switch-sun-bg, #ECCA2F);
  --moon-bg: var(--x-theme-switch-moon-bg, #C4C9D1);
  --spot-color: var(--x-theme-switch-spot-color, #959DB1);
  --circle-container-offset: calc((var(--circle-container-diameter) - var(--container-height)) / 2 * -1);
  --stars-color: var(--x-theme-switch-stars-color, #fff);
  --clouds-color: var(--x-theme-switch-clouds-color, #F3FDFF);
  --back-clouds-color: var(--x-theme-switch-back-clouds-color, #AACADF);
  --transition: .5s cubic-bezier(0, -0.02, 0.4, 1.25);
  --circle-transition: .3s cubic-bezier(0, -0.02, 0.35, 1.17);
  position: relative;
  display: inline-block;
}

/* theme 开关尺寸 */
.theme-switch.size-small {
  --toggle-size: 14px;
  --container-width: 2.5em;
  --container-height: 1.4em;
  --circle-container-diameter: 1.9em;
  --sun-moon-diameter: 1.2em;
}

.theme-switch.size-medium {
  --toggle-size: 17px;
  --container-width: 3.5em;
  --container-height: 2em;
  --circle-container-diameter: 2.7em;
  --sun-moon-diameter: 1.7em;
}

.theme-switch.size-large {
  --toggle-size: 20px;
  --container-width: 4.5em;
  --container-height: 2.6em;
  --circle-container-diameter: 3.5em;
  --sun-moon-diameter: 2.2em;
}

.theme-switch, .theme-switch *, .theme-switch *::before, .theme-switch *::after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: var(--toggle-size);
}

.theme-switch__container {
  width: var(--container-width);
  height: var(--container-height);
  background-color: var(--container-light-bg);
  border-radius: var(--container-radius);
  overflow: hidden;
  cursor: pointer;
  -webkit-box-shadow: 0em -0.062em 0.062em rgba(0, 0, 0, 0.25), 0em 0.062em 0.125em rgba(255, 255, 255, 0.94);
  box-shadow: 0em -0.062em 0.062em rgba(0, 0, 0, 0.25), 0em 0.062em 0.125em rgba(255, 255, 255, 0.94);
  -webkit-transition: var(--transition);
  -o-transition: var(--transition);
  transition: var(--transition);
  position: relative;
}

.theme-switch__container::before {
  content: "";
  position: absolute;
  z-index: 1;
  inset: 0;
  -webkit-box-shadow: 0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset, 0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset;
  box-shadow: 0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset, 0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset;
  border-radius: var(--container-radius)
}

.theme-switch__checkbox {
  display: none;
}

.theme-switch__circle-container {
  width: var(--circle-container-diameter);
  height: var(--circle-container-diameter);
  background-color: rgba(255, 255, 255, 0.1);
  position: absolute;
  left: var(--circle-container-offset);
  top: var(--circle-container-offset);
  border-radius: var(--container-radius);
  -webkit-box-shadow: inset 0 0 0 3.375em rgba(255, 255, 255, 0.1), inset 0 0 0 3.375em rgba(255, 255, 255, 0.1), 0 0 0 0.625em rgba(255, 255, 255, 0.1), 0 0 0 1.25em rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 0 0 3.375em rgba(255, 255, 255, 0.1), inset 0 0 0 3.375em rgba(255, 255, 255, 0.1), 0 0 0 0.625em rgba(255, 255, 255, 0.1), 0 0 0 1.25em rgba(255, 255, 255, 0.1);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-transition: var(--circle-transition);
  -o-transition: var(--circle-transition);
  transition: var(--circle-transition);
  pointer-events: none;
}

.theme-switch__sun-moon-container {
  pointer-events: auto;
  position: relative;
  z-index: 2;
  width: var(--sun-moon-diameter);
  height: var(--sun-moon-diameter);
  margin: auto;
  border-radius: var(--container-radius);
  background-color: var(--sun-bg);
  -webkit-box-shadow: 0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset, 0em -0.062em 0.062em 0em #a1872a inset;
  box-shadow: 0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset, 0em -0.062em 0.062em 0em #a1872a inset;
  -webkit-filter: drop-shadow(0.062em 0.125em 0.125em rgba(0, 0, 0, 0.25)) drop-shadow(0em 0.062em 0.125em rgba(0, 0, 0, 0.25));
  filter: drop-shadow(0.062em 0.125em 0.125em rgba(0, 0, 0, 0.25)) drop-shadow(0em 0.062em 0.125em rgba(0, 0, 0, 0.25));
  overflow: hidden;
  -webkit-transition: var(--transition);
  -o-transition: var(--transition);
  transition: var(--transition);
}

.theme-switch__moon {
  -webkit-transform: translateX(100%);
  -ms-transform: translateX(100%);
  transform: translateX(100%);
  width: 100%;
  height: 100%;
  background-color: var(--moon-bg);
  border-radius: inherit;
  -webkit-box-shadow: 0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset, 0em -0.062em 0.062em 0em #969696 inset;
  box-shadow: 0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset, 0em -0.062em 0.062em 0em #969696 inset;
  -webkit-transition: var(--transition);
  -o-transition: var(--transition);
  transition: var(--transition);
  position: relative;
}

.theme-switch__spot {
  position: absolute;
  top: 0.75em;
  left: 0.312em;
  width: 0.75em;
  height: 0.75em;
  border-radius: var(--container-radius);
  background-color: var(--spot-color);
  -webkit-box-shadow: 0em 0.0312em 0.062em rgba(0, 0, 0, 0.25) inset;
  box-shadow: 0em 0.0312em 0.062em rgba(0, 0, 0, 0.25) inset;
}

.theme-switch__spot:nth-of-type(2) {
  width: 0.375em;
  height: 0.375em;
  top: 0.937em;
  left: 1.375em;
}

.theme-switch__spot:nth-last-of-type(3) {
  width: 0.25em;
  height: 0.25em;
  top: 0.312em;
  left: 0.812em;
}

.theme-switch__clouds {
  width: 1.25em;
  height: 1.25em;
  background-color: var(--clouds-color);
  border-radius: var(--container-radius);
  position: absolute;
  bottom: -0.625em;
  left: 0.312em;
  -webkit-box-shadow: 0.937em 0.312em var(--clouds-color), -0.312em -0.312em var(--back-clouds-color), 1.437em 0.375em var(--clouds-color), 0.5em -0.125em var(--back-clouds-color), 2.187em 0 var(--clouds-color), 1.25em -0.062em var(--back-clouds-color), 2.937em 0.312em var(--clouds-color), 2em -0.312em var(--back-clouds-color), 3.625em -0.062em var(--clouds-color), 2.625em 0em var(--back-clouds-color), 4.5em -0.312em var(--clouds-color), 3.375em -0.437em var(--back-clouds-color), 4.625em -1.75em 0 0.437em var(--clouds-color), 4em -0.625em var(--back-clouds-color), 4.125em -2.125em 0 0.437em var(--back-clouds-color);
  box-shadow: 0.937em 0.312em var(--clouds-color), -0.312em -0.312em var(--back-clouds-color), 1.437em 0.375em var(--clouds-color), 0.5em -0.125em var(--back-clouds-color), 2.187em 0 var(--clouds-color), 1.25em -0.062em var(--back-clouds-color), 2.937em 0.312em var(--clouds-color), 2em -0.312em var(--back-clouds-color), 3.625em -0.062em var(--clouds-color), 2.625em 0em var(--back-clouds-color), 4.5em -0.312em var(--clouds-color), 3.375em -0.437em var(--back-clouds-color), 4.625em -1.75em 0 0.437em var(--clouds-color), 4em -0.625em var(--back-clouds-color), 4.125em -2.125em 0 0.437em var(--back-clouds-color);
  -webkit-transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
  -o-transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
  transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
}

.theme-switch__stars-container {
  position: absolute;
  color: var(--stars-color);
  top: -100%;
  left: 0.312em;
  width: 2.75em;
  height: auto;
  -webkit-transition: var(--transition);
  -o-transition: var(--transition);
  transition: var(--transition);
}

/* actions */

.theme-switch__checkbox:checked + .theme-switch__container {
  background-color: var(--container-night-bg);
}

.theme-switch__checkbox:checked + .theme-switch__container .theme-switch__circle-container {
  left: calc(100% - var(--circle-container-offset) - var(--circle-container-diameter));
}

.theme-switch__checkbox:checked + .theme-switch__container .theme-switch__circle-container:hover {
  left: calc(100% - var(--circle-container-offset) - var(--circle-container-diameter) - 0.187em)
}

.theme-switch__circle-container:hover {
  left: calc(var(--circle-container-offset) + 0.187em);
}

.theme-switch__checkbox:checked + .theme-switch__container .theme-switch__moon {
  -webkit-transform: translate(0);
  -ms-transform: translate(0);
  transform: translate(0);
}

.theme-switch__checkbox:checked + .theme-switch__container .theme-switch__clouds {
  bottom: -4.062em;
}

.theme-switch__checkbox:checked + .theme-switch__container .theme-switch__stars-container {
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

/* theme 开关加载状态 */
.loading-spinner-theme {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  padding: 0.3em;
}

.loading-spinner-theme .spinner-inner {
  display: block;
  width: 0.8em;
  height: 0.8em;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

/* theme 开关禁用状态 */
.theme-switch.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.theme-switch.disabled .theme-switch__container {
  cursor: not-allowed;
}

.theme-switch.loading {
  cursor: wait;
}

.theme-switch.loading .theme-switch__container {
  cursor: wait;
}



/* The switch - the box around the slider */
.switch {
  font-size: 16px;
  position: relative;
  display: inline-block;
  width: 51px;
  height: 31px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  border: none;
  border-radius: 16px;
  transition: background-color 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  background-color: var(--x-border-color-dark, #C7C7CC);
}

.slider:before {
  position: absolute;
  content: "";
  height: 27px;
  width: 27px;
  left: 2px;
  top: 2px;
  background-color: var(--x-switch-thumb, #FFFFFF);
  border-radius: 50%;
  transition: transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.2);
}

.switch input:checked + .slider {
  background-color: var(--x-color-success, #34C759);
}

.switch input:checked + .slider:before {
  transform: translateX(20px);
}

/* 尺寸变体 */
.switch.size-small {
  width: 39px;
  height: 24px;
  font-size: 14px;
}

.switch.size-small .slider {
  border-radius: 12px;
}

.switch.size-small .slider:before {
  height: 20px;
  width: 20px;
}

.switch.size-small input:checked + .slider:before {
  transform: translateX(15px);
}

.switch.size-medium {
  width: 51px;
  height: 31px;
  font-size: 16px;
}

.switch.size-large {
  width: 63px;
  height: 39px;
  font-size: 18px;
}

.switch.size-large .slider {
  border-radius: 20px;
}

.switch.size-large .slider:before {
  height: 35px;
  width: 35px;
}

.switch.size-large input:checked + .slider:before {
  transform: translateX(24px);
}

/* 禁用状态 */
.switch.disabled .slider {
  cursor: not-allowed;
  opacity: 0.4;
}

.switch.disabled .slider:before {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* 悬停效果 */
.switch:not(.disabled):not(.loading):hover .slider:before {
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.25);
}

/* 点击效果 */
.switch:not(.disabled):not(.loading) input:active + .slider:before {
  transform: scale(0.92);
}

.switch:not(.disabled):not(.loading) input:checked:active + .slider:before {
  transform: translateX(20px) scale(0.92);
}

.switch.size-small:not(.disabled):not(.loading) input:checked:active + .slider:before {
  transform: translateX(15px) scale(0.92);
}

.switch.size-large:not(.disabled):not(.loading) input:checked:active + .slider:before {
  transform: translateX(24px) scale(0.92);
}

/* 焦点状态 */
.switch input:focus-visible + .slider {
  box-shadow: 0 0 0 4px rgba(142, 142, 147, 0.2);
}

.switch input:checked:focus-visible + .slider {
  box-shadow: 0 0 0 4px rgba(52, 199, 89, 0.2);
}

/* 加载状态 */
.switch.loading .slider {
  cursor: wait;
  opacity: 0.9;
}

.switch.loading .slider:before {
  opacity: 0.6;
}

.loading-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.spinner-inner {
  display: block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(142, 142, 147, 0.3);
  border-top-color: var(--x-border-color-dark, #8E8E93);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

.switch.checked .spinner-inner {
  border-color: rgba(52, 199, 89, 0.3);
  border-top-color: var(--x-color-success, #34C759);
}

.switch.size-small .spinner-inner {
  width: 11px;
  height: 11px;
  border-width: 1.5px;
}

.switch.size-large .spinner-inner {
  width: 17px;
  height: 17px;
  border-width: 2.5px;
}

/* 加载状态下禁用悬停效果 */
.switch.loading:hover .slider:before {
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.2);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}



</style>
