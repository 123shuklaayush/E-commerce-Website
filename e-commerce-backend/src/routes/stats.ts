import express from 'express'
import { getBarCharts, getDashboardStats, getLineCharts, getPieCharts } from '../controllers/stats.js';
import { get } from 'http';
import { adminOnly } from '../middlewares/auth.js';


const app = express.Router();

// route - /api/v1/dashboard/new/stats
app.get("/stats", adminOnly, getDashboardStats) 

// route - /api/v1/dashboard/new/pie
app.get("/pie", adminOnly, getPieCharts)

// route - /api/v1/dashboard/new/bar
app.get("/bar", adminOnly, getBarCharts)

// route - /api/v1/dashboard/new/line
app.get("/line", adminOnly, getLineCharts)
export default app;