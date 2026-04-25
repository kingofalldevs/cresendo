import React, { useState } from 'react';
import {
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ComposedChart,
  Customized
} from 'recharts';

// Seeded random for deterministic output
const seededRandom = (seed) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

// ── LIFETIME DATA (141 pts, every 0.5yr) ────────────────────────────────────
const generateLifetimeData = () => {
  const points = [];
  let noise = 0;
  for (let i = 0; i <= 140; i++) {
    const age = i * 0.5;
    const peak = 100;
    const a = peak / Math.pow(35, 2);
    const base = Math.max(0, -a * Math.pow(age - 35, 2) + peak);
    const volatility = 1.0 + 3 * Math.exp(-Math.pow(age - 35, 2) / 300);
    noise = noise * 0.94 + (seededRandom(i * 7.3 + 1.1) - 0.5) * volatility;
    points.push({
      age: parseFloat(age.toFixed(1)),
      momentum: parseFloat(Math.max(0.5, base + noise).toFixed(2)),
      base: parseFloat(base.toFixed(2))
    });
  }
  return points;
};

// ── YEARLY DATA (120 pts, every 0.1mo) ──────────────────────────────────────
const generateYearlyData = () => {
  const points = [];
  let noise = 0;
  const step = 0.1;
  const totalSteps = Math.round(12 / step);
  const midYear = 6;
  const peakHeight = 88;
  const a = peakHeight / Math.pow(6, 2);
  for (let i = 0; i <= totalSteps; i++) {
    const month = parseFloat((i * step + 1).toFixed(2));
    const base = Math.max(20, -a * Math.pow(month - midYear, 2) + peakHeight);
    const volatility = 1.0 + 3 * Math.exp(-Math.pow(month - midYear, 2) / 12);
    noise = noise * 0.94 + (seededRandom(i * 7.3 + 1.1) - 0.5) * volatility;
    points.push({
      month: parseFloat(month.toFixed(2)),
      momentum: parseFloat(Math.max(5, Math.min(105, base + noise)).toFixed(2)),
      base: parseFloat(base.toFixed(2))
    });
  }
  return points;
};

// ── MONTHLY DATA (120 pts, every 0.25 day) ───────────────────────────────────
const generateMonthlyData = (daysInMonth) => {
  const points = [];
  let noise = 0;
  const step = 0.25;
  const totalSteps = Math.round(daysInMonth / step);
  const midMonth = daysInMonth / 2;
  const peakHeight = 80;
  const a = peakHeight / Math.pow(midMonth, 2);
  for (let i = 0; i <= totalSteps; i++) {
    const day = parseFloat((i * step + 1).toFixed(2));
    const base = Math.max(15, -a * Math.pow(day - midMonth, 2) + peakHeight + 15);
    const volatility = 1.0 + 3 * Math.exp(-Math.pow(day - midMonth, 2) / 60);
    noise = noise * 0.94 + (seededRandom(i * 7.3 + 2.1) - 0.5) * volatility;
    points.push({
      day: parseFloat(day.toFixed(2)),
      momentum: parseFloat(Math.max(5, Math.min(105, base + noise)).toFixed(2)),
      base: parseFloat(base.toFixed(2))
    });
  }
  return points;
};

const milestones = [
  { age: 1, title: "The First Step", color: "#3b82f6", description: "Recognizing the pattern and choosing a new path." },
  { age: 5, title: "Establishing Rhythm", color: "#3b82f6", description: "Finding balance in the daily climb." },
  { age: 15, title: "Deep Resilience", color: "#3b82f6", description: "Navigating major challenges with established support." },
  { age: 25, title: "Harmony Found", color: "#3b82f6", description: "Living in a state of sustained peace and growth." },
  { age: 35, title: "Peak Momentum", color: "#3b82f6", description: "Mentoring others through their own crescendo." },
  { age: 50, title: "Legacy of Strength", color: "#3b82f6", description: "A life defined by reclamation and resilience." }
];

const CustomTooltip = ({ active, payload, isGoalHover, viewType }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    let timeLabel = "";
    const today = new Date();
    
    if (viewType === 'Monthly') {
      const day = Math.round(d.day);
      const monthName = today.toLocaleString('default', { month: 'long' });
      const getOrdinal = (n) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
      };
      timeLabel = `${getOrdinal(day)} ${monthName}`;
    } else if (viewType === 'Yearly') {
      const monthIndex = Math.max(0, Math.min(11, Math.round(d.month) - 1));
      const date = new Date(today.getFullYear(), monthIndex, 1);
      timeLabel = date.toLocaleString('default', { month: 'long' }).toUpperCase();
    } else {
      timeLabel = `AGE ${d.age}Y`;
    }

    if (isGoalHover) {
      const milestone = milestones.find(m => Math.abs(m.age - d.age) < 0.5);
      if (milestone) {
        return (
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', fontSize: '0.75rem', maxWidth: '300px' }}>
            <p style={{ color: '#3b82f6', fontWeight: 800, fontSize: '0.55rem', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>MILESTONE</p>
            <h4 style={{ color: '#0f172a', fontWeight: 700, margin: '0 0 0.75rem 0', fontSize: '0.85rem' }}>{milestone.title}</h4>
            <div style={{ color: '#64748b', lineHeight: 1.5, fontSize: '0.7rem' }}>
              <p style={{ margin: '0 0 0.5rem 0' }}>{milestone.description}</p>
              <p style={{ margin: '0 0 0.75rem 0', color: '#3b82f6', fontWeight: 600 }}>Phase: {milestone.age}Y Progress</p>
            </div>
          </div>
        );
      }
    }

    return (
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.65rem 0.85rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontSize: '0.75rem' }}>
        <p style={{ color: '#10b981', fontWeight: 900, fontSize: '0.55rem', letterSpacing: '0.12em', marginBottom: '0.35rem' }}>{timeLabel}</p>
        <p style={{ color: '#64748b', margin: 0, fontWeight: 500 }}>Momentum: <strong style={{ color: '#10b981', fontWeight: 800 }}>{d.momentum?.toFixed(1)}%</strong></p>
      </div>
    );
  }
  return null;
};

const MilestoneTooltip = ({ milestone, x, y }) => {
  if (!milestone) return null;
  return (
    <div style={{ position: 'absolute', left: x + 15, top: y - 80, background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem', boxShadow: '0 8px 32px rgba(0,0,0,0.15)', fontSize: '0.75rem', maxWidth: '280px', zIndex: 1000, pointerEvents: 'none' }}>
      <p style={{ color: '#3b82f6', fontWeight: 800, fontSize: '0.55rem', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>MILESTONE</p>
      <h4 style={{ color: '#0f172a', fontWeight: 700, margin: '0 0 0.75rem 0', fontSize: '0.9rem' }}>{milestone.title}</h4>
      <p style={{ margin: '0 0 0.5rem 0', color: '#64748b', lineHeight: 1.5, fontSize: '0.8rem' }}>{milestone.description}</p>
      <p style={{ margin: 0, color: '#3b82f6', fontWeight: 600, fontSize: '0.75rem' }}>Phase: {milestone.age}Y Progress</p>
    </div>
  );
};

const TimelineView = ({ data }) => {
  const [hoveredDay, setHoveredDay] = useState(null);
  const today = new Date();
  const currentDay = today.getDate();
  const getOrdinal = (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  const displayData = data.filter(d => d.day % 1 === 0);
  const totalWidth = 1600;
  const spreadWidth = 1400;
  const startX = (totalWidth - spreadWidth) / 2;

  const originX = totalWidth / 2;
  const originY = 460;

  // Fan from convergence point using polar coordinates
  // Angle spread: ~170 degrees total fan (-85 to +85 from vertical)
  const fanAngle = 170; // degrees
  const startAngle = -(fanAngle / 2);
  const angleStep = fanAngle / (displayData.length - 1);
  
  // Stick lengths: short at edges, long at center
  const minRadius = 80;
  const maxRadius = 340;

  const displayPoints = displayData.map((d, i) => {
    const midIndex = (displayData.length - 1) / 2;
    const t = (i - midIndex) / midIndex; // -1 to 1, 0 at center
    
    // Parabolic height: tall center, short edges
    const maxHeight = 350;
    const minHeight = 40;
    const height = minHeight + (maxHeight - minHeight) * (1 - t * t);
    
    return {
      x: startX + i * (spreadWidth / (displayData.length - 1)),
      y: (originY - 30) - height,
      d,
      isToday: Math.round(d.day) === currentDay
    };
  });

  const getSmoothPath = (points) => {
    if (points.length === 0) return '';
    let path = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? 0 : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2 < points.length ? i + 2 : i + 1];
      const cp1x = p1.x + (p2.x - p0.x) * 0.15;
      const cp1y = p1.y + (p2.y - p0.y) * 0.15;
      const cp2x = p2.x - (p3.x - p1.x) * 0.15;
      const cp2y = p2.y - (p3.y - p1.y) * 0.15;
      path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }
    return path;
  };


  return (
    <div className="resilience-bloom-container" style={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      overflowX: 'auto',
      padding: '1rem 0',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      WebkitOverflowScrolling: 'touch',
      maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
    }}>
      <style>{`
        .resilience-bloom-container::-webkit-scrollbar { display: none; }
        
        @keyframes fan-entrance {
          from { opacity: 0; transform: translateY(30px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .bloom-item {
          animation: fan-entrance 0.8s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .animate-ping-slow {
          animation: ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes ping {
          75%, 100% { transform: scale(3); opacity: 0; }
        }
        .today-glow {
          filter: drop-shadow(0 0 15px rgba(16, 185, 129, 0.6));
          animation: today-pulse 3s infinite;
        }
        @keyframes today-pulse {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.4)); }
          50% { filter: drop-shadow(0 0 25px rgba(16, 185, 129, 0.8)); }
        }
      `}</style>

      <div style={{ position: 'relative', width: '100%', minWidth: '1200px', maxWidth: '100%' }}>
        <svg width="100%" viewBox={`0 0 ${totalWidth} 480`} preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
          <defs>
            <linearGradient id="fanGradient" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.9" />
            </linearGradient>
            <radialGradient id="bgGlow" cx="50%" cy="100%" r="70%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width={totalWidth} height="480" fill="url(#bgGlow)" />

          <path
            d={getSmoothPath(displayPoints)}
            fill="none"
            stroke="#10b981"
            strokeWidth="4"
            strokeOpacity="0.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {displayPoints.map(({ x, y, d, isToday }, i) => {
            const isHovered = hoveredDay?.day === d.day;
            return (
              <g 
                key={i} 
                className="bloom-item" 
                style={{ animationDelay: `${i * 25}ms`, cursor: 'pointer' }}
                onMouseEnter={() => setHoveredDay({ ...d, x, y })}
                onMouseLeave={() => setHoveredDay(null)}
              >
                <line
                  x1={originX}
                  y1={originY - 30}
                  x2={x}
                  y2={y + 15}
                  stroke={isToday || isHovered ? "#10b981" : "url(#fanGradient)"}
                  strokeWidth={isToday || isHovered ? "4" : "1.8"}
                  strokeLinecap="round"
                  opacity={isToday || isHovered ? 1 : 0.6}
                  style={{ transition: 'all 0.3s ease' }}
                />

                <g transform={`translate(${x}, ${y})`} style={{ transition: 'all 0.3s ease', transform: `translate(${x}px, ${y}px) ${isHovered ? 'scale(1.2) translateY(-8px)' : 'scale(1)'}` }}>
                  <rect
                    x="-18"
                    y="-16"
                    width="36"
                    height="32"
                    rx="8"
                    fill={isToday ? "#10b981" : (isHovered ? "#ecfdf5" : "rgba(255, 255, 255, 0.98)")}
                    stroke={isToday ? "#10b981" : (isHovered ? "#10b981" : "rgba(16, 185, 129, 0.25)")}
                    strokeWidth={isHovered ? "2.5" : "1"}
                    className={isToday ? "today-glow" : ""}
                    style={{ 
                      filter: !isToday && isHovered ? 'drop-shadow(0 6px 16px rgba(0,0,0,0.12))' : (isToday ? '' : 'none'),
                      backdropFilter: 'blur(8px)'
                    }}
                  />

                  <text
                    x="0"
                    y="5"
                    textAnchor="middle"
                    style={{
                      fontSize: isToday ? '11px' : '9px',
                      fontWeight: 900,
                      fill: isToday ? "#ffffff" : "#064e3b",
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      pointerEvents: 'none',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {getOrdinal(Math.round(d.day))}
                  </text>
                </g>

                {isToday && (
                  <g transform={`translate(${x}, ${y - 35})`}>
                    <circle r="4" fill="#10b981" />
                    <circle r="14" fill="none" stroke="#10b981" strokeWidth="2" className="animate-ping-slow" style={{ opacity: 0.4 }} />
                  </g>
                )}
              </g>
            );
          })}

          <g transform={`translate(${originX}, ${originY - 30})`}>
            <circle r="12" fill="#10b981" opacity={0.15} />
            <circle r="7" fill="#10b981" />
            <circle r="18" fill="none" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.3" />
          </g>

          <text
            x={originX}
            y={originY}
            textAnchor="middle"
            style={{ 
              fontSize: '13px', 
              fontWeight: 900, 
              fill: '#10b981', 
              letterSpacing: '0.65em', 
              textTransform: 'uppercase',
              opacity: 0.85 
            }}
          >
            Resilience Bloom
          </text>
          {/* SVG Tooltip */}
          {hoveredDay && (
            <g transform={`translate(${hoveredDay.x}, ${hoveredDay.y - 45})`}>
              <rect x="-55" y="-16" width="110" height="28" rx="8" fill="rgba(15, 23, 42, 0.95)" />
              <text x="0" y="3" textAnchor="middle" style={{ fontSize: '11px', fontWeight: 800, fill: '#ffffff', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {hoveredDay.momentum.toFixed(1)}% MOMENTUM
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};

const LifeChart = ({ age, viewType = 'Lifetime' }) => {
  const [hoveredGoal, setHoveredGoal] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const monthName = today.toLocaleString('default', { month: 'long' }).toUpperCase();

  const chartData = React.useMemo(() => {
    if (viewType === 'Monthly') return generateMonthlyData(daysInMonth);
    if (viewType === 'Yearly') return generateYearlyData();
    return generateLifetimeData();
  }, [viewType, daysInMonth]);

  const activePoint = viewType === 'Lifetime' ? age : (viewType === 'Yearly' ? currentMonth : currentDay);
  const dataKeyX = viewType === 'Lifetime' ? 'age' : (viewType === 'Yearly' ? 'month' : 'day');
  const domainX = viewType === 'Lifetime' ? [0, 70] : (viewType === 'Yearly' ? [1, 13] : [1, daysInMonth + 1]);

  const labelX = {
    'Lifetime': 'YEARS OF GROWTH',
    'Yearly': `MONTHS IN ${currentYear}`,
    'Monthly': `DAYS IN ${monthName}`
  }[viewType];

  const ticksX = {
    'Lifetime': [0, 10, 20, 30, 35, 40, 50, 60, 70],
    'Yearly': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    'Monthly': Array.from({ length: daysInMonth }, (_, i) => i + 1)
  }[viewType];

  if (viewType === 'Monthly') {
    return <TimelineView data={chartData} />;
  }

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '520px', position: 'relative' }}>
      <MilestoneTooltip milestone={hoveredGoal} x={tooltipPos.x} y={tooltipPos.y} />
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} margin={{ top: 28, right: 20, left: 0, bottom: 45 }}>
          <defs>
            <linearGradient id="momentumGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#10b981" stopOpacity={0.18} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />

          <XAxis
            dataKey={dataKeyX}
            type="number"
            domain={domainX}
            ticks={ticksX}
            stroke="#94a3b8"
            tick={{ fontSize: 9, fill: '#64748b', fontWeight: 600 }}
            axisLine={{ stroke: '#cbd5e1', strokeWidth: 1 }}
            tickLine={{ stroke: '#cbd5e1', strokeWidth: 1 }}
            minTickGap={0}
            label={{ value: labelX, position: 'bottom', offset: 10, fill: '#94a3b8', fontSize: 7, fontWeight: 800, letterSpacing: 3 }}
          />
          <YAxis domain={[0, 115]} hide />
          <Tooltip content={<CustomTooltip isGoalHover={!!hoveredGoal} viewType={viewType} />} cursor={{ stroke: '#e2e8f0', strokeWidth: 1 }} />

          {viewType === 'Lifetime' && (
            <>
              <ReferenceLine
                x={35}
                stroke="#3b82f6"
                strokeDasharray="4 4"
                label={{ value: 'STABILITY APEX', position: 'top', fill: '#3b82f6', fontSize: 9, fontWeight: 800 }}
              />
              <Customized component={(props) => {
                const { xAxisMap, yAxisMap } = props;
                const xAxis = xAxisMap && Object.values(xAxisMap)[0];
                const yAxis = yAxisMap && Object.values(yAxisMap)[0];
                if (!xAxis?.scale || !yAxis?.scale) return null;
                return (
                  <g>
                    <style>{`
                      @keyframes goal-pulse { 0% { r: 5; opacity: 0.7; } 50% { r: 12; opacity: 0; } 100% { r: 5; opacity: 0.7; } }
                      .goal-pulse-ring { animation: goal-pulse 2.5s ease-out infinite; }
                    `}</style>
                    {milestones.map((milestone) => {
                      const milestonePoint = chartData.find(d => Math.abs(d.age - milestone.age) < 0.5);
                      if (!milestonePoint) return null;
                      const cx = xAxis.scale(milestonePoint.age);
                      const cy = yAxis.scale(milestonePoint.momentum);
                      return (
                        <g key={milestone.age}>
                          <circle cx={cx} cy={cy} r={25} fill="transparent" onMouseEnter={() => { setHoveredGoal(milestone); setTooltipPos({ x: cx, y: cy }); }} onMouseLeave={() => setHoveredGoal(null)} style={{ cursor: 'pointer' }} />
                          <circle cx={cx} cy={cy} r={12} fill={milestone.color} opacity={0.06} />
                          <circle cx={cx} cy={cy} r={8}  fill={milestone.color} opacity={0.12} />
                          <circle cx={cx} cy={cy} r={5} fill="none" stroke={milestone.color} strokeWidth={2} className="goal-pulse-ring" />
                          <circle cx={cx} cy={cy} r={4} fill="#fff" />
                          <circle cx={cx} cy={cy} r={2.5} fill={milestone.color} />
                        </g>
                      );
                    })}
                  </g>
                );
              }} />
            </>
          )}

          <Customized component={(props) => {
            const { xAxisMap, yAxisMap } = props;
            const xAxis = xAxisMap && Object.values(xAxisMap)[0];
            const yAxis = yAxisMap && Object.values(yAxisMap)[0];
            if (!xAxis?.scale || !yAxis?.scale) return null;
            
            const activeData = chartData.find(d => (viewType === 'Lifetime' ? d.age : (viewType === 'Yearly' ? d.month : d.day)) === activePoint);
            if (!activeData) return null;
            
            const cx = xAxis.scale(activeData[dataKeyX]);
            const cy = yAxis.scale(activeData.momentum);
            
            return (
              <g>
                <style>{`
                  @keyframes lc-pulse { 0% { r: 8; opacity: 0.6; } 50% { r: 18; opacity: 0; } 100% { r: 8; opacity: 0.6; } }
                  .lc-pulse-ring { animation: lc-pulse 1.8s ease-out infinite; }
                `}</style>
                <circle cx={cx} cy={cy} r={20} fill="#f43f5e" opacity={0.08} />
                <circle cx={cx} cy={cy} r={14} fill="#f43f5e" opacity={0.15} />
                <circle cx={cx} cy={cy} r={8} fill="none" stroke="#f43f5e" strokeWidth={2.5} className="lc-pulse-ring" />
                <circle cx={cx} cy={cy} r={7} fill="#fff" />
                <circle cx={cx} cy={cy} r={5} fill="#f43f5e" />
              </g>
            );
          }} />

          <Line
            dataKey="base"
            type="monotone"
            stroke="#10b981"
            strokeWidth={1}
            strokeOpacity={0.2}
            dot={false}
            activeDot={false}
            legendType="none"
          />

          <Area
            dataKey="momentum"
            type="monotone"
            stroke="#10b981"
            strokeWidth={2.5}
            fill="url(#momentumGradient)"
            fillOpacity={1}
            dot={false}
            activeDot={{ r: 4, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
            animationDuration={2500}
            animationEasing="ease-out"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LifeChart;
