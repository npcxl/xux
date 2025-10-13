export interface BadgeProps {
    /** 徽标显示的数字 */
    value?: number | string
    /** 最大值，超过最大值显示 `${max}+` */
    max?: number
    /** 是否显示小红点 */
    dot?: boolean
    /** 徽标颜色 */
    color?: string
    /** 是否隐藏徽标 */
    hidden?: boolean
    /** 是否显示心跳扩散动画 */
    animated?: boolean
}
