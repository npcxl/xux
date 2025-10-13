<template>
    <div class="x-badge" :class="{ 'x-badge--dot': dot }">
        <slot></slot>
        <div 
            v-if="showBadge" 
            class="x-badge__content"
            :class="{
                'x-badge__content--dot': dot,
                'x-badge__content--number': !dot
            }"
            :style="badgeStyle"
        >
            <span v-if="!dot" class="x-badge__text">{{ displayValue }}</span>
            <!-- 心跳扩散动画效果 -->
            <div class="x-badge__ping"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { BadgeProps } from '../../types/badge'

interface Props extends BadgeProps {}

const props = withDefaults(defineProps<Props>(), {
    value: 0,
    max: 99,
    dot: false,
    color: '#ff4d4f',
    hidden: false,
})

const showBadge = computed(() => {
    if (props.hidden) return false
    if (props.dot) return true
    return Number(props.value) > 0
})

const displayValue = computed(() => {
    if (props.dot) return ''
    const num = Number(props.value)
    if (num > props.max) {
        return `${props.max}+`
    }
    return num.toString()
})

const badgeStyle = computed(() => {
    return {
        backgroundColor: props.color
    }
})
</script>

<style scoped>
.x-badge {
    position: relative;
    display: inline-block;
}

.x-badge__content {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    border-radius: 10px;
    min-width: 18px;
    height: 18px;
    padding: 0 6px;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    box-sizing: border-box;
    z-index: 1;
    transition: all 0.3s ease;
}

.x-badge__content--dot {
    width: 8px;
    height: 8px;
    min-width: 8px;
    padding: 0;
    border-radius: 50%;
    transform: translate(50%, -50%);
}

.x-badge__content--number {
    border-radius: 10px;
}

.x-badge__text {
    display: inline-block;
    font-size: 12px;
    line-height: 1;
}

/* 当徽标内容为空时隐藏（但小红点模式除外） */
.x-badge__content:empty:not(.x-badge__content--dot) {
    display: none;
}

/* 动画效果 */
.x-badge__content {
    animation: badge-pulse 0.3s ease-out;
}

@keyframes badge-pulse {
    0% {
        transform: translate(50%, -50%) scale(0.8);
        opacity: 0;
    }
    50% {
        transform: translate(50%, -50%) scale(1.1);
    }
    100% {
        transform: translate(50%, -50%) scale(1);
        opacity: 1;
    }
}

/* 心跳扩散动画样式 */
.x-badge__ping {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    background-color: inherit;
    animation: badge-ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
    pointer-events: none;
}

@keyframes badge-ping {
    75%, 100% {
        transform: scale(2);
        opacity: 0;
    }
}

/* 响应式设计 */
@media (max-width: 768px) {
    .x-badge__content {
        font-size: 11px;
        min-width: 16px;
        height: 16px;
        line-height: 16px;
    }
    
    .x-badge__content--dot {
        width: 6px;
        height: 6px;
        min-width: 6px;
    }
}
</style>