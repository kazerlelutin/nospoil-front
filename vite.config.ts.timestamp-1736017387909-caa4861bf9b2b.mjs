// vite.config.ts
import { defineConfig, loadEnv } from "file:///F:/www/nospoil/nospoil-front/node_modules/.pnpm/vite@5.3.3_@types+node@22.10.2/node_modules/vite/dist/node/index.js";
import preact from "file:///F:/www/nospoil/nospoil-front/node_modules/.pnpm/@preact+preset-vite@2.9.0_@babel+core@7.26.0_preact@10.22.1_vite@5.3.3/node_modules/@preact/preset-vite/dist/esm/index.mjs";
import UnoCSS from "file:///F:/www/nospoil/nospoil-front/node_modules/.pnpm/unocss@0.63.6_postcss@8.4.49_typescript@5.6.3_vite@5.3.3/node_modules/unocss/dist/vite.mjs";
import tsconfigPaths from "file:///F:/www/nospoil/nospoil-front/node_modules/.pnpm/vite-tsconfig-paths@5.0.1_typescript@5.6.3_vite@5.3.3/node_modules/vite-tsconfig-paths/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///F:/www/nospoil/nospoil-front/vite.config.ts";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  return {
    define: {
      "process.env": {
        ...env
        //merge all env
      }
    },
    plugins: [
      UnoCSS(),
      tsconfigPaths(),
      preact({
        prerender: {
          enabled: true,
          renderTarget: "#app",
          additionalPrerenderRoutes: ["/404", "/login"],
          previewMiddlewareEnabled: true,
          previewMiddlewareFallback: "/404"
        }
      })
    ],
    resolve: {
      alias: [
        {
          find: "@",
          replacement: new URL("./src", __vite_injected_original_import_meta_url).pathname
        }
      ]
    },
    //@ts-ignore
    test: {
      globals: true,
      pool: "forks",
      environment: "jsdom",
      setupFiles: ["./__tests__/units/setupTests.js"],
      exclude: ["node_modules", "__tests__/e2e", "__tests__/step-definitions"],
      server: {},
      coverage: {
        provider: "istanbul",
        reporter: [
          ["text", { file: "coverage.txt" }],
          ["text-summary", { file: "coverage-summary.txt" }],
          "html"
        ],
        reportOnFailure: true,
        reportsDirectory: "./coverage",
        include: ["src/"],
        exclude: ["node_modules/", "__tests__/", "src/types/", "src/index.tsx"]
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFx3d3dcXFxcbm9zcG9pbFxcXFxub3Nwb2lsLWZyb250XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFx3d3dcXFxcbm9zcG9pbFxcXFxub3Nwb2lsLWZyb250XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi93d3cvbm9zcG9pbC9ub3Nwb2lsLWZyb250L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcbmltcG9ydCBwcmVhY3QgZnJvbSAnQHByZWFjdC9wcmVzZXQtdml0ZSdcbmltcG9ydCBVbm9DU1MgZnJvbSAndW5vY3NzL3ZpdGUnXG5cbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgJ1ZJVEVfJylcblxuICByZXR1cm4ge1xuICAgIGRlZmluZToge1xuICAgICAgJ3Byb2Nlc3MuZW52Jzoge1xuICAgICAgICAuLi5lbnYsIC8vbWVyZ2UgYWxsIGVudlxuICAgICAgfSxcbiAgICB9LFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIFVub0NTUygpLFxuICAgICAgdHNjb25maWdQYXRocygpLFxuICAgICAgcHJlYWN0KHtcbiAgICAgICAgcHJlcmVuZGVyOiB7XG4gICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICByZW5kZXJUYXJnZXQ6ICcjYXBwJyxcbiAgICAgICAgICBhZGRpdGlvbmFsUHJlcmVuZGVyUm91dGVzOiBbJy80MDQnLCAnL2xvZ2luJ10sXG4gICAgICAgICAgcHJldmlld01pZGRsZXdhcmVFbmFibGVkOiB0cnVlLFxuICAgICAgICAgIHByZXZpZXdNaWRkbGV3YXJlRmFsbGJhY2s6ICcvNDA0JyxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGZpbmQ6ICdAJyxcbiAgICAgICAgICByZXBsYWNlbWVudDogbmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpLnBhdGhuYW1lLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIC8vQHRzLWlnbm9yZVxuICAgIHRlc3Q6IHtcbiAgICAgIGdsb2JhbHM6IHRydWUsXG4gICAgICBwb29sOiAnZm9ya3MnLFxuICAgICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXG4gICAgICBzZXR1cEZpbGVzOiBbJy4vX190ZXN0c19fL3VuaXRzL3NldHVwVGVzdHMuanMnXSxcbiAgICAgIGV4Y2x1ZGU6IFsnbm9kZV9tb2R1bGVzJywgJ19fdGVzdHNfXy9lMmUnLCAnX190ZXN0c19fL3N0ZXAtZGVmaW5pdGlvbnMnXSxcbiAgICAgIHNlcnZlcjoge30sXG4gICAgICBjb3ZlcmFnZToge1xuICAgICAgICBwcm92aWRlcjogJ2lzdGFuYnVsJyxcbiAgICAgICAgcmVwb3J0ZXI6IFtcbiAgICAgICAgICBbJ3RleHQnLCB7IGZpbGU6ICdjb3ZlcmFnZS50eHQnIH1dLFxuICAgICAgICAgIFsndGV4dC1zdW1tYXJ5JywgeyBmaWxlOiAnY292ZXJhZ2Utc3VtbWFyeS50eHQnIH1dLFxuICAgICAgICAgICdodG1sJyxcbiAgICAgICAgXSxcbiAgICAgICAgcmVwb3J0T25GYWlsdXJlOiB0cnVlLFxuICAgICAgICByZXBvcnRzRGlyZWN0b3J5OiAnLi9jb3ZlcmFnZScsXG4gICAgICAgIGluY2x1ZGU6IFsnc3JjLyddLFxuICAgICAgICBleGNsdWRlOiBbJ25vZGVfbW9kdWxlcy8nLCAnX190ZXN0c19fLycsICdzcmMvdHlwZXMvJywgJ3NyYy9pbmRleC50c3gnXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFEsU0FBUyxjQUFjLGVBQWU7QUFDcFQsT0FBTyxZQUFZO0FBQ25CLE9BQU8sWUFBWTtBQUVuQixPQUFPLG1CQUFtQjtBQUo2SSxJQUFNLDJDQUEyQztBQU94TixJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN4QyxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxHQUFHLE9BQU87QUFFaEQsU0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLE1BQ04sZUFBZTtBQUFBLFFBQ2IsR0FBRztBQUFBO0FBQUEsTUFDTDtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxNQUNQLGNBQWM7QUFBQSxNQUNkLE9BQU87QUFBQSxRQUNMLFdBQVc7QUFBQSxVQUNULFNBQVM7QUFBQSxVQUNULGNBQWM7QUFBQSxVQUNkLDJCQUEyQixDQUFDLFFBQVEsUUFBUTtBQUFBLFVBQzVDLDBCQUEwQjtBQUFBLFVBQzFCLDJCQUEyQjtBQUFBLFFBQzdCO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0w7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLGFBQWEsSUFBSSxJQUFJLFNBQVMsd0NBQWUsRUFBRTtBQUFBLFFBQ2pEO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBRUEsTUFBTTtBQUFBLE1BQ0osU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsWUFBWSxDQUFDLGlDQUFpQztBQUFBLE1BQzlDLFNBQVMsQ0FBQyxnQkFBZ0IsaUJBQWlCLDRCQUE0QjtBQUFBLE1BQ3ZFLFFBQVEsQ0FBQztBQUFBLE1BQ1QsVUFBVTtBQUFBLFFBQ1IsVUFBVTtBQUFBLFFBQ1YsVUFBVTtBQUFBLFVBQ1IsQ0FBQyxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFBQSxVQUNqQyxDQUFDLGdCQUFnQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFBQSxVQUNqRDtBQUFBLFFBQ0Y7QUFBQSxRQUNBLGlCQUFpQjtBQUFBLFFBQ2pCLGtCQUFrQjtBQUFBLFFBQ2xCLFNBQVMsQ0FBQyxNQUFNO0FBQUEsUUFDaEIsU0FBUyxDQUFDLGlCQUFpQixjQUFjLGNBQWMsZUFBZTtBQUFBLE1BQ3hFO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
