<template>
    <div class="text-container">
  <p class="styled-text">
    The quick brown fox jumps over the lazy dog. This is an example paragraph with multiple CSS properties applied to demonstrate various text styling options available in CSS.
  </p>
</div>
</template>
<script setup>
</script>
<style scoped>
.text-container {
  width: 60%;
  margin: 0 auto;
}

.styled-text {
  /* 字体和样式 */
  font-family: 'Arial', sans-serif;         /* 字体系列 */
  font-size: 20px;                          /* 字体大小 */
  font-weight: 700;                         /* 字体粗细 */
  font-style: italic;                       /* 字体样式 */
  font-variant: small-caps;                 /* 小型大写字母 */
  line-height: 1.8;                         /* 行高 */

  /* 文字颜色和阴影 */
  color: #333;                              /* 文字颜色 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* 文字阴影 */

  /* 间距设置 */
  letter-spacing: 1px;                      /* 字母间距 */
  word-spacing: 5px;                        /* 单词间距 */

  /* 对齐和换行 */
  text-align: justify;                      /* 文字对齐 */
  vertical-align: middle;                   /* 垂直对齐 */
  text-indent: 2em;                         /* 首行缩进 */
  white-space: normal;                      /* 保持正常空白和换行 */
  word-break: break-word;                   /* 单词内换行 */
  overflow-wrap: break-word;                /* 溢出单词换行 */

  /* 装饰效果 */
  text-decoration: underline dotted red;    /* 下划线样式 */
  text-decoration-thickness: 2px;           /* 装饰线粗细 */
  text-decoration-color: red;               /* 装饰线颜色 */
  text-decoration-style: dotted;            /* 装饰线样式 */
  text-transform: uppercase;                /* 全部大写 */

  /* 方向和书写模式 */
  direction: ltr;                           /* 从左到右 */
  writing-mode: horizontal-tb;              /* 水平书写模式 */

  /* 溢出处理 */
  text-overflow: ellipsis;                  /* 溢出省略号 */
  display: inline-block;
  max-width: 100%;                          /* 最大宽度 */
}

</style>