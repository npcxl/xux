/**
 * Alert 警告提示组件
 * 居中显示，支持自动关闭和手动关闭
 */

export interface AlertOptions {
    title?: string
    content: string
    type?: 'success' | 'error' | 'warning' | 'info'
    duration?: number  // 自动关闭时间，毫秒。0 表示不自动关闭
    closable?: boolean // 是否显示关闭按钮
}

export const xlAlert = () => {
    // 创建 Alert 容器
    const createAlertContainer = () => {
        let container = document.getElementById('xl-alert-container')
        if (!container) {
            container = document.createElement('div')
            container.id = 'xl-alert-container'
            container.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: 12px;
                max-width: 90%;
                width: 420px;
                pointer-events: none;
            `
            document.body.appendChild(container)
        }
        return container
    }

    // 获取类型对应的样式和图标
    const getTypeStyles = (type: string) => {
        const styles = {
            success: {
                bgColor: 'rgb(240, 253, 244)',
                darkBgColor: 'rgb(20, 83, 45)',
                borderColor: 'rgb(134, 239, 172)',
                darkBorderColor: 'rgb(22, 101, 52)',
                textColor: 'rgb(22, 101, 52)',
                darkTextColor: 'rgb(187, 247, 208)',
                iconColor: 'rgb(34, 197, 94)',
                iconSvg: `<svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
                </svg>`
            },
            error: {
                bgColor: 'rgb(254, 242, 242)',
                darkBgColor: 'rgb(127, 29, 29)',
                borderColor: 'rgb(252, 165, 165)',
                darkBorderColor: 'rgb(153, 27, 27)',
                textColor: 'rgb(153, 27, 27)',
                darkTextColor: 'rgb(254, 202, 202)',
                iconColor: 'rgb(239, 68, 68)',
                iconSvg: `<svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
                </svg>`
            },
            warning: {
                bgColor: 'rgb(254, 252, 232)',
                darkBgColor: 'rgb(133, 77, 14)',
                borderColor: 'rgb(253, 224, 71)',
                darkBorderColor: 'rgb(161, 98, 7)',
                textColor: 'rgb(133, 77, 14)',
                darkTextColor: 'rgb(254, 240, 138)',
                iconColor: 'rgb(234, 179, 8)',
                iconSvg: `<svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
                </svg>`
            },
            info: {
                bgColor: 'rgb(239, 246, 255)',
                darkBgColor: 'rgb(30, 58, 138)',
                borderColor: 'rgb(147, 197, 253)',
                darkBorderColor: 'rgb(29, 78, 216)',
                textColor: 'rgb(30, 64, 175)',
                darkTextColor: 'rgb(191, 219, 254)',
                iconColor: 'rgb(59, 130, 246)',
                iconSvg: `<svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
                </svg>`
            }
        }
        return styles[type as keyof typeof styles] || styles.info
    }

    // 检测暗色模式
    const isDarkMode = () => {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    // 显示 Alert
    const show = (options: AlertOptions) => {
        const container = createAlertContainer()
        const type = options.type || 'info'
        const duration = options.duration !== undefined ? options.duration : 5000
        const closable = options.closable !== undefined ? options.closable : true
        const styles = getTypeStyles(type)
        const dark = isDarkMode()

        const alertId = `xl-alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        
        const alert = document.createElement('div')
        alert.id = alertId
        alert.setAttribute('role', 'alert')
        alert.style.cssText = `
            background-color: ${dark ? styles.darkBgColor : '#ffffff'};
            border: 1px solid ${dark ? styles.darkBorderColor : 'rgba(0, 0, 0, 0.08)'};
            border-left: 3px solid ${styles.iconColor};
            color: ${dark ? styles.darkTextColor : '#1a1a1a'};
            padding: 14px 16px;
            border-radius: 8px;
            display: flex;
            align-items: flex-start;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04);
            transform: translateY(-20px) scale(0.95);
            opacity: 0;
            position: relative;
            pointer-events: auto;
            backdrop-filter: blur(10px);
            min-width: 320px;
        `

        // 创建内容
        let innerHTML = `
            <div style="color: ${styles.iconColor}; width: 20px; height: 20px; flex-shrink: 0; margin-right: 12px;">
                ${styles.iconSvg}
            </div>
            <div style="flex: 1;">
                ${options.title ? `<p style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">${options.title}</p>` : ''}
                <p style="font-size: ${options.title ? '13px' : '14px'}; font-weight: ${options.title ? '400' : '600'};">${options.content}</p>
            </div>
        `

        // 添加关闭按钮
        if (closable) {
            innerHTML += `
                <button 
                    class="xl-alert-close"
                    style="
                        background: transparent;
                        border: none;
                        color: ${dark ? styles.darkTextColor : styles.textColor};
                        cursor: pointer;
                        padding: 4px;
                        margin-left: 8px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        opacity: 0.6;
                        transition: opacity 0.2s;
                        width: 20px;
                        height: 20px;
                        flex-shrink: 0;
                    "
                    onmouseover="this.style.opacity='1'"
                    onmouseout="this.style.opacity='0.6'"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            `
        }

        alert.innerHTML = innerHTML

        // 关闭函数
        const close = () => {
            alert.style.transform = 'translateY(-20px) scale(0.95)'
            alert.style.opacity = '0'
            setTimeout(() => {
                if (alert.parentNode) {
                    container.removeChild(alert)
                }
                // 如果容器为空，移除容器
                if (container.children.length === 0) {
                    document.body.removeChild(container)
                }
            }, 300)
        }

        // 添加关闭按钮事件
        if (closable) {
            const closeBtn = alert.querySelector('.xl-alert-close')
            if (closeBtn) {
                closeBtn.addEventListener('click', close)
            }
        }

        container.appendChild(alert)

        // 显示动画
        setTimeout(() => {
            alert.style.transform = 'translateY(0) scale(1)'
            alert.style.opacity = '1'
        }, 10)

        // 自动关闭
        if (duration > 0) {
            setTimeout(close, duration)
        }

        return { close }
    }

    // 快捷方法
    const success = (content: string, options?: Partial<AlertOptions>) => {
        return show({ content, type: 'success', ...options })
    }

    const error = (content: string, options?: Partial<AlertOptions>) => {
        return show({ content, type: 'error', ...options })
    }

    const warning = (content: string, options?: Partial<AlertOptions>) => {
        return show({ content, type: 'warning', ...options })
    }

    const info = (content: string, options?: Partial<AlertOptions>) => {
        return show({ content, type: 'info', ...options })
    }

    return {
        show,
        success,
        error,
        warning,
        info
    }
}

// 默认导出
export default xlAlert
