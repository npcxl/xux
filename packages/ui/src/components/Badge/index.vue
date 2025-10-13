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

<style  scoped>
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

/* 平滑入场动画（只执行一次） */
.x-badge__content {
    animation: badge-fade-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes badge-fade-in {
    0% {
        transform: translate(50%, -50%) scale(0.3);
        opacity: 0;
    }
    100% {
        transform: translate(50%, -50%) scale(1);
        opacity: 1;
    }
}

/* 小红点模式的入场动画 */
.x-badge__content--dot {
    animation: badge-dot-fade-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes badge-dot-fade-in {
    0% {
        transform: translate(50%, -50%) scale(0);
        opacity: 0;
    }
    100% {
        transform: translate(50%, -50%) scale(1);
        opacity: 1;
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