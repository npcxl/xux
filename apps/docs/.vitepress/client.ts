import { defineClientConfig } from '@vitepress/client'
import {
  XButton,
  XInput,
  XTag,
  XSegmented,
  XFlex,
  XCard,
  XDivider,
  XSelect,
  XRadio,
  XCheckboxes,
  XSwitch,
  XDateTimePicker,
  XModal,
  XDrawer,
  XAlert,
  XMsg,
  XTooltips,
  XDropdown,
  XPopconfirm,
  XResult,
  XBadge,
  XImage,
  XScore,
  XTree,
  XAccordion,
  XSkeleton,
  XThumbnailContainer,
  XTimeline,
  XCarousel,
  XPagination,
  XDragSort,
  XColor,
  XQrcode,
  XCountrySelect,
  XRegionCascader,
  XForm,
  XFormItem,
  XSearch,
  XGrid,
  XSpecialEffects
} from '@xlui/xux-ui'

export default defineClientConfig({
  enhance({ app }) {
    // 全局注册组件
    app.component('XButton', XButton)
    app.component('XInput', XInput)
    app.component('XTag', XTag)
    app.component('XSegmented', XSegmented)
    app.component('XFlex', XFlex)
    app.component('XCard', XCard)
    app.component('XDivider', XDivider)
    app.component('XSelect', XSelect)
    app.component('XRadio', XRadio)
    app.component('XCheckboxes', XCheckboxes)
    app.component('XSwitch', XSwitch)
    app.component('XDateTimePicker', XDateTimePicker)
    app.component('XModal', XModal)
    app.component('XDrawer', XDrawer)
    app.component('XAlert', XAlert)
    app.component('XMsg', XMsg)
    app.component('XTooltips', XTooltips)
    app.component('XDropdown', XDropdown)
    app.component('XPopconfirm', XPopconfirm)
    app.component('XResult', XResult)
    app.component('XBadge', XBadge)
    app.component('XImage', XImage)
    app.component('XScore', XScore)
    app.component('XTree', XTree)
    app.component('XAccordion', XAccordion)
    app.component('XSkeleton', XSkeleton)
    app.component('XThumbnailContainer', XThumbnailContainer)
    app.component('XTimeline', XTimeline)
    app.component('XCarousel', XCarousel)
    app.component('XPagination', XPagination)
    app.component('XDragSort', XDragSort)
    app.component('XColor', XColor)
    app.component('XQrcode', XQrcode)
    app.component('XCountrySelect', XCountrySelect)
    app.component('XRegionCascader', XRegionCascader)
    app.component('XForm', XForm)
    app.component('XFormItem', XFormItem)
    app.component('XSearch', XSearch)
    app.component('XGrid', XGrid)
    app.component('XSpecialEffects', XSpecialEffects)
  }
})
