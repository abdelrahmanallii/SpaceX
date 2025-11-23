<template>
    <div class="skeleton-container">
        <!-- مثال Skeleton عام للصفحات -->
        <div class="skeleton-block mb-2"></div>
        <div class="skeleton-text mb-1"></div>
        <div class="skeleton-text short mb-1"></div>
        <div class="skeleton-button"></div>
    </div>
</template>

<script>
export default{
    
}
</script>

<style scoped>
.skeleton-container {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

/* بلوك كبير */
.skeleton-block {
    width: 100%;
    height: 200px;
    border-radius: 8px;
}

/* نصوص */
.skeleton-text {
    width: 70%;
    height: 20px;
    border-radius: 4px;
}

.skeleton-text.short {
    width: 40%;
}

/* زرار */
.skeleton-button {
    width: 120px;
    height: 40px;
    border-radius: 6px;
}

/* تأثير shimmer */
.skeleton-block,
.skeleton-text,
.skeleton-button {
    background: linear-gradient(-90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%);
    background-size: 400% 400%;
    animation: shimmer 1.2s ease-in-out infinite;
}

@keyframes shimmer {
    0% {
        background-position: 100% 0;
    }

    100% {
        background-position: -100% 0;
    }
}
</style>
