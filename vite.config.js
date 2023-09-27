import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'


export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    console.log(env)
    return {
        plugins:[react()],
        define: {
            'process.env.apiToken': JSON.stringify(env.apiToken),
            'process.env.apiUrl': JSON.stringify(env.apiUrl),
            // If you want to exposes all env variables, which is not recommended
            // 'process.env': env
        },
    };
});