<template>
  <div class="x-card-container">
    <!-- 瀑布流布局 -->
    <div v-if="layout === 'masonry'" :class="['masonry-layout', masonryColsClass, 'gap-4 sm:gap-6']">
      <div
        v-for="product in displayProducts"
        :key="product.id + '-masonry'"
        class="mb-4 sm:mb-6 break-inside-avoid group cursor-pointer product-card"
        @click="handleProductClick(product.id)"
      >
        <div class="relative p-2">
          <!-- 瀑布流保持自然高度 -->
          <div class="image-container relative overflow-hidden rounded-lg bg-gray-100">
            <img
              :src="product.image"
              :alt="product.name"
              loading="lazy"
              class="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.01]"
            />
            <!-- 光效蒙版 -->
            <div class="light-effect"></div>
          </div>

          <div v-if="product.label" class="absolute top-3 left-3">
            <span class="label-badge">{{ product.label }}</span>
          </div>
        </div>

        <div class="product-info p-5 ml-5">
          <h3 class="text-sm lg:text-base text-gray-700 leading-relaxed line-clamp-2 mb-3">{{ product.name }}</h3>
          <div class="flex items-center justify-between gap-2">
            <span class="text-base lg:text-lg font-bold text-[var(--x-color-primary)]">{{ product.price }}</span>
            <XButton
              @click.stop="handleLike(product)"
              type="text"
              size="small"
              class="like-button !min-w-0 !p-1"
            >
              <i v-if="!product.isWish" class="bi bi-heart text-gray-500"></i>
              <i v-else class="bi bi-heart-fill text-[#FE374F]"></i>
            </XButton>
          </div>
        </div>
      </div>
    </div>

    <!-- 网格布局 -->
    <div v-else :class="['grid', gridColsClass, 'gap-4 lg:gap-6']">
      <div v-for="product in displayProducts" :key="product.id + '-grid'" class="h-full">
        <div
          class="py-2 px-2 group cursor-pointer product-card h-full flex flex-col"
          @click="handleProductClick(product.id)"
        >
          <div class="relative flex-shrink-0 p-2">
            <!-- 网格布局使用固定比例 -->
            <div class="image-container aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-cover transition-transform duration-300"
                loading="lazy"
              />
              <!-- 光效蒙版 -->
              <div class="light-effect"></div>
            </div>

            <div v-if="product.label" class="absolute top-3 left-3">
              <span class="label-badge">{{ product.label }}</span>
            </div>
          </div>

          <div class="flex-1 flex flex-col justify-between product-info p-5 ml-5">
            <h3 class="text-sm lg:text-base text-gray-700 font-medium line-clamp-2 leading-relaxed mb-3">
              {{ product.name }}
            </h3>
            <div class="flex items-center justify-between gap-2 mt-auto">
              <span class="text-base lg:text-lg font-bold text-[var(--x-color-primary)]">{{ product.price }}</span>
              <XButton
                @click.stop="handleLike(product)"
                type="text"
                size="small"
                class="like-button !min-w-0 !p-1"
              >
                <Icon v-if="!product.isWish" icon="bi:heart" class="bi bi-heart text-gray-500 text-lg"></Icon>
                <Icon v-else icon="bi:heart-fill" class="bi bi-heart-fill text-[#FE374F] text-lg"></Icon>
              </XButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import XButton from '../Button/index.vue'
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
/**
 * Card 产品卡片组件
 * @displayName XCard
 */

interface Product {
  id: string
  name: string
  image: string
  label: string
  price: string
  isWish: boolean
}

export interface CardProps {
  /** 布局模式: masonry(瀑布流) | grid(网格) */
  layout?: 'masonry' | 'grid'
  /** 产品数据列表 */
  products?: Product[]
  /** 是否使用模拟数据 */
  useMockData?: boolean
  /** 列数: 1-4 */
  columns?: number
}

const props = withDefaults(defineProps<CardProps>(), {
  layout: 'grid',
  products: () => [],
  useMockData: true,
  columns: 4
})

const emit = defineEmits<{
  /** 点击产品卡片时触发 */
  productClick: [id: string]
  /** 点击收藏按钮时触发 */
  like: [product: Product]
}>()

// 模拟数据
const mockProducts: Product[] = [
  {
    id: '1',
    name: '北欧风简约陶瓷花瓶',
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400',
    price: '¥299',
    label: '热卖',
    isWish: false
  },
  {
    id: '2',
    name: '手工编织棉麻抱枕套',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400',
    price: '¥89',
    label: '新品',
    isWish: true
  },
  {
    id: '3',
    name: '实木原木置物架收纳架',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400',
    price: '¥459',
    label: '',
    isWish: false
  },
  {
    id: '4',
    name: 'ins风格桌面装饰摆件',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400',
    price: '¥129',
    label: '特价',
    isWish: false
  },
  {
    id: '5',
    name: '现代简约台灯护眼学习灯',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
    price: '¥399',
    label: '',
    isWish: true
  },
  {
    id: '6',
    name: '北欧风格装饰画挂画',
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400',
    price: '¥199',
    label: '热卖',
    isWish: false
  },
  {
    id: '7',
    name: '多功能收纳盒桌面整理',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    price: '¥68',
    label: '',
    isWish: false
  },
  {
    id: '8',
    name: '创意陶瓷马克杯咖啡杯',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400',
    price: '¥59',
    label: '新品',
    isWish: false
  },
  {
    id: '9',
    name: '手工玻璃花瓶透明花器',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400',
    price: '¥179',
    label: '',
    isWish: true
  },
  {
    id: '10',
    name: '日式和风招财猫摆件',
    image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=400',
    price: '¥149',
    label: '热卖',
    isWish: false
  },
  {
    id: '11',
    name: '北欧风木质挂钟客厅',
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400',
    price: '¥259',
    label: '',
    isWish: false
  },
  {
    id: '12',
    name: '现代简约落地花架',
    image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400',
    price: '¥329',
    label: '特价',
    isWish: false
  }
]

const internalProducts = ref<Product[]>([])

// 计算显示的产品列表
const displayProducts = computed(() => {
  if (props.products && props.products.length > 0) {
    return props.products
  }
  return internalProducts.value
})

// 计算网格列数类名
const gridColsClass = computed(() => {
  const cols = Math.min(Math.max(props.columns || 4, 1), 4)
  const colsMap: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
  }
  return colsMap[cols] || colsMap[4]
})

// 计算瀑布流列数类名
const masonryColsClass = computed(() => {
  const cols = Math.min(Math.max(props.columns || 4, 1), 4)
  const colsMap: Record<number, string> = {
    1: 'columns-1',
    2: 'columns-1 md:columns-2',
    3: 'columns-2 md:columns-2 lg:columns-3',
    4: 'columns-2 sm:columns-2 md:columns-3 lg:columns-4'
  }
  return colsMap[cols] || colsMap[4]
})

// 加载模拟数据
onMounted(() => {
  if (props.useMockData && (!props.products || props.products.length === 0)) {
    internalProducts.value = mockProducts
  }
})

// 点击产品卡片
const handleProductClick = (id: string) => {
  emit('productClick', id)
}

// 点击收藏
const handleLike = (product: Product) => {
  // 切换收藏状态
  product.isWish = !product.isWish
  emit('like', product)
}
</script>

<style scoped>
.x-card-container {
  width: 100%;
}

.product-card {
  background: var(--x-color-white);
  border-radius: var(--x-radius-lg);
  overflow: hidden;
  transition: all var(--x-transition);
  box-shadow: var(--x-shadow-sm);
}

.product-card:hover {
  box-shadow: var(--x-shadow-md);
  transform: translateY(-2px);
}

.product-info {
  padding: 0;
}

/* 标签徽章 */
.label-badge {
  display: inline-block;
  background: var(--x-color-primary);
  color: var(--x-color-white);
  font-size: 12px;
  padding: 4px 8px;
  border-radius: var(--x-radius-sm);
  font-weight: 500;
}

/* 收藏按钮 */
.like-button {
  flex-shrink: 0;
}

.like-button i {
  font-size: 18px;
  transition: all var(--x-transition-fast);
}

.like-button:hover i {
  transform: scale(1.1);
}

/* 文本截断 */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 瀑布流布局优化 - 支持所有屏幕尺寸 */
.masonry-layout {
  column-gap: 1rem;
}

.masonry-layout.columns-2 {
  column-count: 2;
}

@media (min-width: 640px) {
  .masonry-layout.sm\:columns-2 {
    column-count: 2;
  }
  .masonry-layout {
    column-gap: 1.5rem;
  }
}

@media (min-width: 768px) {
  .masonry-layout.md\:columns-3 {
    column-count: 3;
  }
}

@media (min-width: 1024px) {
  .masonry-layout.lg\:columns-4 {
    column-count: 4;
  }
}

/* 防止卡片被截断 */
.break-inside-avoid {
  break-inside: avoid;
  page-break-inside: avoid;
}

/* 光效蒙版动画 */
.light-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    transparent 0%,
    transparent 30%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.3) 60%,
    rgba(255, 255, 255, 0.1) 70%,
    transparent 100%
  );
  transform: translateX(-100%) translateY(-100%);
  transition: transform 0.3s ease-out;
  pointer-events: none;
  z-index: 1;
}

/* 只在悬停图片容器时触发光效动画 */
.image-container:hover .light-effect {
  transform: translateX(100%) translateY(100%);
}
</style>

