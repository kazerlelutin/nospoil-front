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
        exclude: ["node_modules/", "__tests__/", "src/types/"]
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFx3d3dcXFxcbm9zcG9pbFxcXFxub3Nwb2lsLWZyb250XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFx3d3dcXFxcbm9zcG9pbFxcXFxub3Nwb2lsLWZyb250XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi93d3cvbm9zcG9pbC9ub3Nwb2lsLWZyb250L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcbmltcG9ydCBwcmVhY3QgZnJvbSAnQHByZWFjdC9wcmVzZXQtdml0ZSdcbmltcG9ydCBVbm9DU1MgZnJvbSAndW5vY3NzL3ZpdGUnXG5cbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgJ1ZJVEVfJylcblxuICByZXR1cm4ge1xuICAgIGRlZmluZToge1xuICAgICAgJ3Byb2Nlc3MuZW52Jzoge1xuICAgICAgICAuLi5lbnYsIC8vbWVyZ2UgYWxsIGVudlxuICAgICAgfSxcbiAgICB9LFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIFVub0NTUygpLFxuICAgICAgdHNjb25maWdQYXRocygpLFxuICAgICAgcHJlYWN0KHtcbiAgICAgICAgcHJlcmVuZGVyOiB7XG4gICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICByZW5kZXJUYXJnZXQ6ICcjYXBwJyxcbiAgICAgICAgICBhZGRpdGlvbmFsUHJlcmVuZGVyUm91dGVzOiBbJy80MDQnLCAnL2xvZ2luJ10sXG4gICAgICAgICAgcHJldmlld01pZGRsZXdhcmVFbmFibGVkOiB0cnVlLFxuICAgICAgICAgIHByZXZpZXdNaWRkbGV3YXJlRmFsbGJhY2s6ICcvNDA0JyxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGZpbmQ6ICdAJyxcbiAgICAgICAgICByZXBsYWNlbWVudDogbmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpLnBhdGhuYW1lLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIC8vQHRzLWlnbm9yZVxuICAgIHRlc3Q6IHtcbiAgICAgIGdsb2JhbHM6IHRydWUsXG4gICAgICBwb29sOiAnZm9ya3MnLFxuICAgICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXG4gICAgICBzZXR1cEZpbGVzOiBbJy4vX190ZXN0c19fL3VuaXRzL3NldHVwVGVzdHMuanMnXSxcbiAgICAgIGV4Y2x1ZGU6IFsnbm9kZV9tb2R1bGVzJywgJ19fdGVzdHNfXy9lMmUnLCAnX190ZXN0c19fL3N0ZXAtZGVmaW5pdGlvbnMnXSxcbiAgICAgIHNlcnZlcjoge30sXG4gICAgICBjb3ZlcmFnZToge1xuICAgICAgICBwcm92aWRlcjogJ2lzdGFuYnVsJyxcbiAgICAgICAgcmVwb3J0ZXI6IFtcbiAgICAgICAgICBbJ3RleHQnLCB7IGZpbGU6ICdjb3ZlcmFnZS50eHQnIH1dLFxuICAgICAgICAgIFsndGV4dC1zdW1tYXJ5JywgeyBmaWxlOiAnY292ZXJhZ2Utc3VtbWFyeS50eHQnIH1dLFxuICAgICAgICAgICdodG1sJyxcbiAgICAgICAgXSxcbiAgICAgICAgcmVwb3J0T25GYWlsdXJlOiB0cnVlLFxuICAgICAgICByZXBvcnRzRGlyZWN0b3J5OiAnLi9jb3ZlcmFnZScsXG4gICAgICAgIGluY2x1ZGU6IFsnc3JjLyddLFxuICAgICAgICBleGNsdWRlOiBbJ25vZGVfbW9kdWxlcy8nLCAnX190ZXN0c19fLycsICdzcmMvdHlwZXMvJ10sXG4gICAgICB9LFxuICAgIH0sXG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThRLFNBQVMsY0FBYyxlQUFlO0FBQ3BULE9BQU8sWUFBWTtBQUNuQixPQUFPLFlBQVk7QUFFbkIsT0FBTyxtQkFBbUI7QUFKNkksSUFBTSwyQ0FBMkM7QUFPeE4sSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksR0FBRyxPQUFPO0FBRWhELFNBQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxNQUNOLGVBQWU7QUFBQSxRQUNiLEdBQUc7QUFBQTtBQUFBLE1BQ0w7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUCxjQUFjO0FBQUEsTUFDZCxPQUFPO0FBQUEsUUFDTCxXQUFXO0FBQUEsVUFDVCxTQUFTO0FBQUEsVUFDVCxjQUFjO0FBQUEsVUFDZCwyQkFBMkIsQ0FBQyxRQUFRLFFBQVE7QUFBQSxVQUM1QywwQkFBMEI7QUFBQSxVQUMxQiwyQkFBMkI7QUFBQSxRQUM3QjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixhQUFhLElBQUksSUFBSSxTQUFTLHdDQUFlLEVBQUU7QUFBQSxRQUNqRDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLE1BQU07QUFBQSxNQUNKLFNBQVM7QUFBQSxNQUNULE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLFlBQVksQ0FBQyxpQ0FBaUM7QUFBQSxNQUM5QyxTQUFTLENBQUMsZ0JBQWdCLGlCQUFpQiw0QkFBNEI7QUFBQSxNQUN2RSxRQUFRLENBQUM7QUFBQSxNQUNULFVBQVU7QUFBQSxRQUNSLFVBQVU7QUFBQSxRQUNWLFVBQVU7QUFBQSxVQUNSLENBQUMsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQUEsVUFDakMsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQUEsVUFDakQ7QUFBQSxRQUNGO0FBQUEsUUFDQSxpQkFBaUI7QUFBQSxRQUNqQixrQkFBa0I7QUFBQSxRQUNsQixTQUFTLENBQUMsTUFBTTtBQUFBLFFBQ2hCLFNBQVMsQ0FBQyxpQkFBaUIsY0FBYyxZQUFZO0FBQUEsTUFDdkQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
