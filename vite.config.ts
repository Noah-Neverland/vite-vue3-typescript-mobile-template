import { defineConfig, normalizePath, loadEnv, UserConfig, ConfigEnv } from 'vite';
import { resolve } from 'path';
import autoprefixer from 'autoprefixer';
import postcsspxtoviewport8plugin from 'postcss-px-to-viewport-8-plugin';
import { createProxy } from './build/vite/proxy';
import { wrapperEnv } from './build/utils';
import { createVitePlugins } from './build/vite/plugin';
import { OUTPUT_DIR } from './build/constant';

// 全局 scss 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(resolve('./src/styles/variable.scss'));

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE, VITE_SERVE_WWW } = viteEnv;

  const isBuild = command === 'build';

  return {
    base: VITE_PUBLIC_PATH,
    root,
    server: {
      // Listening on all local IPs
      host: true,
      port: VITE_PORT,
      open: true,
      // Load proxy configuration from .env
      proxy: createProxy(VITE_PROXY, VITE_SERVE_WWW),
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: OUTPUT_DIR,
      sourcemap: !VITE_DROP_CONSOLE,
      chunkSizeWarningLimit: 2000, // 消除打包大小超过500kb警告
      minify: 'terser', // Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效
      terserOptions: {
        compress: {
          keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          drop_console: true, // 生产环境去除 console
          drop_debugger: true, // 生产环境去除 debugger
        },
        format: {
          comments: false, // 删除注释
        },
      },
    },
    // css 相关的配置
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData 的内容会在每个 scss 文件的开头自动注入
          additionalData: `@import "${variablePath}";`,
        },
      },
      // 进行 PostCSS 配置
      postcss: {
        plugins: [
          autoprefixer({
            // 指定目标浏览器
            overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11'],
          }),
          postcsspxtoviewport8plugin({
            unitToConvert: 'px',
            viewportWidth: (file) => {
              let num = 750;
              // van是375
              if (file.indexOf('van') > 0) {
                num = 375;
              }
              return num;
            },
            unitPrecision: 5, // 单位转换后保留的精度
            propList: ['*'], // 能转化为vw的属性列表
            viewportUnit: 'vw', // 希望使用的视口单位
            fontViewportUnit: 'vw', // 字体使用的视口单位
            selectorBlackList: ['ignore-'], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
            minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: true, // 媒体查询里的单位是否需要转换单位
            replace: true, //  是否直接更换属性值，而不添加备用属性
            exclude: [], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
            include: [], // 如果设置了include，那将只有匹配到的文件才会被转换
            landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
            landscapeUnit: 'vw', // 横屏时使用的单位
            landscapeWidth: 1628, // 横屏时使用的视口宽度
          }),
        ],
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
      extensions: ['.mjs', '.js', '.cjs', '.jsx', '.ts', '.json', '.vue'],
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    // 预加载项目必须的组件
    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        'pinia',
        'axios',
        '@vueuse/core',
        'vant/es/toast/style',
        'vant/es/dialog/style',
        'vant/es/notify/style',
        'vant/es/image-preview/style',
        'vant/es',
        'vant/es/button/style/index',
        'vant/es/cell-group/style/index',
        'vant/es/cell/style/index',
        'vant/es/icon/style/index',
        'vant/es/checkbox/style/index',
      ],
    },
  };
});
