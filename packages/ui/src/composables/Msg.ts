/**
 * Msg 消息提示组件
 * @displayName XMsg
 */

interface ConfirmOptions {
    title: string
    content: string
    confirmText?: string
    cancelText?: string
    onConfirm?: () => void
    onCancel?: () => void
    type?: 'success' | 'error' | 'warning' | 'info'
    duration?: number
}

interface MessageOptions {
    title: string
    content?: string
    type?: 'success' | 'error' | 'warning' | 'info'
    duration?: number
}

export const xlMsg = () => {
    // 创建消息容器
    const createMessageContainer = () => {
        let container = document.getElementById('xl-message-container')
        if (!container) {
            container = document.createElement('div')
            container.id = 'xl-message-container'
            container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 10px;
            `
            document.body.appendChild(container)
        }
        return container
    }

    // 获取类型对应的样式和图标
    const getTypeStyles = (type: string) => {
        const styles = {
            success: {
                bgColor: '#f0fdf4',
                borderColor: '#86efac',
                textColor: '#166534',
                iconColor: '#22c55e',
                iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`
            },
            error: {
                bgColor: '#fef2f2',
                borderColor: '#fca5a5',
                textColor: '#991b1b',
                iconColor: '#ef4444',
                iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`
            },
            warning: {
                bgColor: '#fefce8',
                borderColor: '#fde047',
                textColor: '#854d0e',
                iconColor: '#eab308',
                iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`
            },
            info: {
                bgColor: '#f8fafc',
                borderColor: '#cbd5e1',
                textColor: '#1e293b',
                iconColor: '#64748b',
                iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`
            }
        }
        return styles[type as keyof typeof styles] || styles.info
    }

    // 显示消息
    const show = (options: MessageOptions) => {
        const container = createMessageContainer()
        const type = options.type || 'info'
        const duration = options.duration !== undefined ? options.duration : 3000
        const styles = getTypeStyles(type)

        const messageId = `xl-msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        
        const message = document.createElement('div')
        message.id = messageId
        message.style.cssText = `
            background-color: ${styles.bgColor};
            border: 1px solid ${styles.borderColor};
            color: ${styles.textColor};
            border-radius: 12px;
            padding: 16px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            max-width: 384px;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: auto;
        `
        
        message.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 12px;">
                <div style="flex-shrink: 0; color: ${styles.iconColor}; margin-top: 2px;">
                    ${styles.iconSvg}
                </div>
                <div style="flex: 1; min-width: 0;">
                    <div style="font-size: 14px; font-weight: 500; line-height: 1.5; color: ${styles.textColor};">
                        ${options.title}
                    </div>
                    ${options.content ? `<div style="margin-top: 4px; font-size: 13px; line-height: 1.5; color: ${styles.textColor}; opacity: 0.8;">${options.content}</div>` : ''}
                </div>
                <button 
                    style="flex-shrink: 0; background: none; border: none; padding: 4px; cursor: pointer; color: ${styles.textColor}; opacity: 0.5; border-radius: 4px; transition: all 0.15s; display: flex; align-items: center; justify-content: center;"
                    onmouseover="this.style.opacity='1'; this.style.backgroundColor='rgba(0,0,0,0.05)';"
                    onmouseout="this.style.opacity='0.5'; this.style.backgroundColor='transparent';"
                    onclick="document.getElementById('${messageId}')?.remove()"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                        <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        `

        container.appendChild(message)

        // 动画进入
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                message.style.transform = 'translateX(0)'
                message.style.opacity = '1'
            })
        })

        // 自动移除
        if (duration > 0) {
            setTimeout(() => {
                removeMessage(messageId)
            }, duration)
        }
    }

    // 移除消息
    const removeMessage = (messageId: string) => {
        const message = document.getElementById(messageId)
        if (message) {
            message.style.transform = 'translateX(100%)'
            message.style.opacity = '0'
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message)
                }
            }, 300)
        }
    }

    // 确认对话框
    const confirm = (options: ConfirmOptions) => {
        const type = options.type || 'info'
        const styles = getTypeStyles(type)
        
        const modalId = `xl-confirm-${Date.now()}`
        const modal = document.createElement('div')
        modal.id = modalId
        modal.style.cssText = `
            position: fixed;
            inset: 0;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(0, 0, 0, 0.5);
            opacity: 0;
            transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(4px);
        `
        
        const dialogHtml = `
            <div class="xl-confirm-dialog" style="
                background-color: white;
                border-radius: 12px;
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                max-width: 448px;
                width: 100%;
                margin: 16px;
                transform: scale(0.95);
                opacity: 0;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            ">
                <div style="padding: 24px;">
                    <div style="display: flex; align-items: flex-start; gap: 16px; margin-bottom: 20px;">
                        <div style="flex-shrink: 0; color: ${styles.iconColor}; margin-top: 2px;">
                            ${styles.iconSvg}
                        </div>
                        <div style="flex: 1;">
                            <h3 style="font-size: 18px; font-weight: 600; color: #1a1a1a; line-height: 1.5; margin: 0;">
                                ${options.title}
                            </h3>
                        </div>
                    </div>
                    <div style="font-size: 14px; color: #64748b; line-height: 1.6; margin-bottom: 24px; padding-left: 36px;">
                        ${options.content}
                    </div>
                    <div style="display: flex; justify-content: flex-end; gap: 12px;">
                        <button class="xl-confirm-cancel" style="
                            padding: 8px 16px;
                            font-size: 14px;
                            font-weight: 500;
                            height: 36px;
                            color: #1a1a1a;
                            background-color: white;
                            border: 1px solid #cacaca;
                            border-radius: 6px;
                            cursor: pointer;
                            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                            box-shadow: 0 1px 2px rgba(26, 26, 26, 0.05);
                            position: relative;
                            overflow: hidden;
                            transform: translateY(0);
                        " 
                        onmouseover="this.style.borderColor='#1a1a1a'; this.style.color='#1a1a1a'; this.style.boxShadow='0 4px 12px rgba(26, 26, 26, 0.3)'; this.style.transform='translateY(-2px)';" 
                        onmouseout="this.style.backgroundColor='white'; this.style.borderColor='#cacaca'; this.style.color='#1a1a1a'; this.style.boxShadow='0 1px 2px rgba(26, 26, 26, 0.05)'; this.style.transform='translateY(0)';"
                        onmousedown="this.style.transform='translateY(1px)'; this.style.boxShadow='0 2px 4px rgba(0, 0, 0, 0.1)';"
                        onmouseup="this.style.transform='translateY(-2px)';">
                            ${options.cancelText || '取消'}
                        </button>
                        <button class="xl-confirm-ok" style="
                            padding: 8px 16px;
                            font-size: 14px;
                            font-weight: 500;
                            height: 36px;
                            color: white;
                            background: linear-gradient(135deg, #1a1a1a 0%, #3a3a3a 100%);
                            border: 1px solid #1a1a1a;
                            border-radius: 6px;
                            cursor: pointer;
                            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                            box-shadow: 0 4px 12px rgba(26, 26, 26, 0.3);
                            position: relative;
                            overflow: hidden;
                            transform: translateY(0);
                        " 
                        onmouseover="this.style.background='linear-gradient(135deg, #3a3a3a 0%, #4a4a4a 100%)'; this.style.boxShadow='0 8px 24px rgba(26, 26, 26, 0.4)'; this.style.transform='translateY(-2px)';" 
                        onmouseout="this.style.background='linear-gradient(135deg, #1a1a1a 0%, #3a3a3a 100%)'; this.style.boxShadow='0 4px 12px rgba(26, 26, 26, 0.3)'; this.style.transform='translateY(0)';"
                        onmousedown="this.style.transform='translateY(1px)'; this.style.boxShadow='0 2px 4px rgba(0, 0, 0, 0.1)';"
                        onmouseup="this.style.transform='translateY(-2px)';">
                            ${options.confirmText || '确认'}
                        </button>
                    </div>
                </div>
            </div>
        `
        
        modal.innerHTML = dialogHtml

        document.body.appendChild(modal)

        // 动画进入
        requestAnimationFrame(() => {
            modal.style.opacity = '1'
            const dialog = modal.querySelector('.xl-confirm-dialog') as HTMLElement
            if (dialog) {
                requestAnimationFrame(() => {
                    dialog.style.transform = 'scale(1)'
                    dialog.style.opacity = '1'
                })
            }
        })

        // 绑定事件
        const confirmBtn = modal.querySelector('.xl-confirm-ok')
        const cancelBtn = modal.querySelector('.xl-confirm-cancel')

        const closeModal = () => {
            const dialog = modal.querySelector('.xl-confirm-dialog') as HTMLElement
            if (dialog) {
                dialog.style.transform = 'scale(0.95)'
                dialog.style.opacity = '0'
            }
            modal.style.opacity = '0'
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal)
                }
            }, 300)
        }

        confirmBtn?.addEventListener('click', () => {
            options.onConfirm?.()
            closeModal()
        })

        cancelBtn?.addEventListener('click', () => {
            options.onCancel?.()
            closeModal()
        })

        // 点击背景关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                options.onCancel?.()
                closeModal()
            }
        })

        // ESC 键关闭
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                options.onCancel?.()
                closeModal()
                document.removeEventListener('keydown', handleEsc)
            }
        }
        document.addEventListener('keydown', handleEsc)
    }

    // 快捷方法
    const success = (title: string, content?: string, duration?: number) => {
        show({ title, content, type: 'success', duration })
    }

    const error = (title: string, content?: string, duration?: number) => {
        show({ title, content, type: 'error', duration })
    }

    const warning = (title: string, content?: string, duration?: number) => {
        show({ title, content, type: 'warning', duration })
    }

    const info = (title: string, content?: string, duration?: number) => {
        show({ title, content, type: 'info', duration })
    }

    return { 
        show, 
        confirm, 
        success, 
        error, 
        warning, 
        info,
        remove: removeMessage
    }
}

export default xlMsg
