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
                width: 400px;
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
                iconColor: '#34C759',
                bgColor: 'rgba(52, 199, 89, 0.1)',
                iconSvg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15"/>
                    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="none"/>
                    <path d="M8 12.5L10.5 15L16 9.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`
            },
            error: {
                iconColor: '#FF3B30',
                bgColor: 'rgba(255, 59, 48, 0.1)',
                iconSvg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15"/>
                    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="none"/>
                    <path d="M9 9L15 15M15 9L9 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>`
            },
            warning: {
                iconColor: '#FF9500',
                bgColor: 'rgba(255, 149, 0, 0.1)',
                iconSvg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3L3 19h18L12 3z" fill="currentColor" opacity="0.15"/>
                    <path d="M12 3L3 19h18L12 3z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                    <path d="M12 9v4M12 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>`
            },
            info: {
                iconColor: '#007AFF',
                bgColor: 'rgba(0, 122, 255, 0.1)',
                iconSvg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15"/>
                    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="none"/>
                    <path d="M12 11v5M12 8h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
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
            background: ${dark ? 'rgba(28, 28, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
            border: 1px solid ${dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'};
            color: ${dark ? '#FFFFFF' : '#1C1C1E'};
            padding: 16px 18px;
            border-radius: 14px;
            display: flex;
            align-items: flex-start;
            gap: 12px;
            transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
            transform: translateY(-12px) scale(0.96);
            opacity: 0;
            position: relative;
            pointer-events: auto;
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            min-width: 320px;
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        `

        // 创建内容
        let innerHTML = `
            <div style="color: ${styles.iconColor}; width: 24px; height: 24px; flex-shrink: 0;">
                ${styles.iconSvg}
            </div>
            <div style="flex: 1; min-width: 0;">
                ${options.title ? `<p style="font-weight: 600; font-size: 15px; line-height: 1.4; margin: 0 0 4px 0; letter-spacing: -0.3px; color: ${dark ? '#FFFFFF' : '#1C1C1E'};">${options.title}</p>` : ''}
                <p style="font-size: ${options.title ? '14px' : '15px'}; font-weight: ${options.title ? '400' : '600'}; line-height: 1.4; margin: 0; letter-spacing: -0.2px; color: ${dark ? 'rgba(255, 255, 255, 0.85)' : '#3C3C43'};">${options.content}</p>
            </div>
        `

        // 添加关闭按钮
        if (closable) {
            innerHTML += `
                <button 
                    class="xl-alert-close"
                    style="
                        background: ${dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
                        border: none;
                        border-radius: 50%;
                        color: ${dark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(60, 60, 67, 0.6)'};
                        cursor: pointer;
                        padding: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                        width: 24px;
                        height: 24px;
                        flex-shrink: 0;
                    "
                    onmouseover="this.style.background='${dark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)'}'; this.style.color='${dark ? '#FFFFFF' : '#1C1C1E'}'; this.style.transform='scale(1.05)'"
                    onmouseout="this.style.background='${dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}'; this.style.color='${dark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(60, 60, 67, 0.6)'}'; this.style.transform='scale(1)'"
                    onmousedown="this.style.transform='scale(0.95)'"
                    onmouseup="this.style.transform='scale(1.05)'"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            `
        }

        alert.innerHTML = innerHTML

        // 关闭函数
        const close = () => {
            alert.style.transform = 'translateY(-12px) scale(0.96)'
            alert.style.opacity = '0'
            setTimeout(() => {
                if (alert.parentNode) {
                    container.removeChild(alert)
                }
                // 如果容器为空，移除容器
                if (container.children.length === 0) {
                    document.body.removeChild(container)
                }
            }, 350)
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
