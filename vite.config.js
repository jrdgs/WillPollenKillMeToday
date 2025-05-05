import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import glob from "glob";

export default defineConfig({  
	plugins: [react()],
});

