import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, ChevronLeft, ChevronRight } from 'lucide-react';

const ChecklistTracker = ({ user, openAuth, shareToCommunity }) => {
  const [viewDate, setViewDate] = useState(new Date(2026, 3, 1)); // Start at April 2026
  const startDate = new Date(2026, 3, 1);

  const [daysData, setDaysData] = useState(() => {
    const saved = localStorage.getItem('crescendo_tracker_data');
    return saved ? JSON.parse(saved) : {};
  });

  const monthKey = `${viewDate.getFullYear()}-${viewDate.getMonth()}`;
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const currentMonthDays = daysData[monthKey] || Array.from({ length: daysInMonth }, (_, i) => ({ day: i + 1, completed: false }));

  useEffect(() => {
    localStorage.setItem('crescendo_tracker_data', JSON.stringify(daysData));
  }, [daysData]);

  const [activeGoalDay, setActiveGoalDay] = useState(null);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [goalsData, setGoalsData] = useState(() => {
    const saved = localStorage.getItem('crescendo_goals_data_v2');
    return saved ? JSON.parse(saved) : {};
  });

  const monthGoals = goalsData[monthKey] || {};

  useEffect(() => {
    localStorage.setItem('crescendo_goals_data_v2', JSON.stringify(goalsData));
  }, [goalsData]);

  const setGoalText = (dayNum, text) => {
    setGoalsData(prev => {
      const currentMonthGoals = { ...(prev[monthKey] || {}) };
      if (text === null) {
        delete currentMonthGoals[dayNum];
      } else {
        currentMonthGoals[dayNum] = text;
      }
      return { ...prev, [monthKey]: currentMonthGoals };
    });
  };

  const toggleDay = (dayNum) => {
    if (!user) {
      openAuth();
      return;
    }
    setDaysData(prev => {
      const currentMonth = prev[monthKey] || Array.from({ length: daysInMonth }, (_, i) => ({ day: i + 1, completed: false }));
      const updatedMonth = currentMonth.map(d => d.day === dayNum ? { ...d, completed: !d.completed } : d);
      return { ...prev, [monthKey]: updatedMonth };
    });
  };

  const monthName = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(viewDate);
  const completedCount = currentMonthDays.filter(d => d.completed).length;

  const navigateMonth = (direction) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(viewDate.getMonth() + direction);
    if (newDate >= startDate) {
      setViewDate(newDate);
    }
  };

  const isAtStart = viewDate.getFullYear() === startDate.getFullYear() && viewDate.getMonth() === startDate.getMonth();

  const calculateStreak = () => {
    let streak = 0;
    const sortedDays = [...currentMonthDays].sort((a, b) => b.day - a.day);
    const firstCompletedIndex = sortedDays.findIndex(d => d.completed);
    if (firstCompletedIndex === -1) return 0;
    
    for (let i = firstCompletedIndex; i < sortedDays.length; i++) {
      if (sortedDays[i].completed) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const streak = calculateStreak();

  return (
    <div style={{
      height: '100%',
      padding: '2rem',
      background: 'white',
      borderRadius: '24px',
      boxShadow: 'var(--shadow-lg)',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      border: '1px solid var(--glass-border)',
      position: 'relative'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <button 
            onClick={() => navigateMonth(-1)} 
            disabled={isAtStart}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: isAtStart ? 'default' : 'pointer',
              opacity: isAtStart ? 0.2 : 0.6,
              color: 'var(--text-main)',
              padding: '4px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ChevronLeft size={24} />
          </button>
          
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-main)', margin: 0, textTransform: 'uppercase', letterSpacing: '-0.02em', minWidth: '220px' }}>
            {monthName}
          </h2>

          <button 
            onClick={() => navigateMonth(1)} 
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              opacity: 0.6,
              color: 'var(--text-main)',
              padding: '4px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        <div style={{ 
          fontSize: '0.9rem', 
          fontWeight: 700, 
          color: 'var(--primary)',
          background: 'var(--bg-color)',
          display: 'inline-block',
          padding: '0.4rem 1rem',
          borderRadius: '20px',
          marginBottom: '1rem'
        }}>
          {completedCount} / {daysInMonth} DAYS CLAIMED
        </div>
        
        {/* Progress Bar */}
        <div style={{ 
          width: '100%', 
          maxWidth: '300px', 
          margin: '0 auto',
          height: '8px',
          background: 'rgba(16, 185, 129, 0.1)',
          borderRadius: '4px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: `${(completedCount / daysInMonth) * 100}%`,
            background: 'var(--primary)',
            boxShadow: '0 0 10px rgba(16, 185, 129, 0.4)',
            transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
          }} />
        </div>

        <div style={{ 
          marginTop: '1.5rem', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem', filter: 'drop-shadow(0 0 8px rgba(255, 165, 0, 0.4))' }}>🔥</span>
            <span style={{ 
              fontSize: '1.25rem', 
              fontWeight: 900, 
              color: 'var(--text-main)',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              whiteSpace: 'nowrap'
            }}>
              {streak} DAY STREAK
            </span>
          </div>
          {streak > 0 && shareToCommunity && (
            <button
              onClick={() => shareToCommunity(`🔥 ${streak} DAY STREAK `)}
              style={{
                background: 'rgba(245, 158, 11, 0.1)',
                color: '#f59e0b',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '100px',
                fontSize: '0.7rem',
                fontWeight: 900,
                cursor: 'pointer',
                transition: 'all 0.2s',
                letterSpacing: '0.05em'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(245, 158, 11, 0.2)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(245, 158, 11, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              SHARE TO COMMUNITY
            </button>
          )}
        </div>

        {/* Targets Display */}
        {Object.keys(monthGoals).length > 0 && (
          <div style={{ 
            marginTop: '1.5rem', 
            textAlign: 'left',
            background: 'rgba(245, 158, 11, 0.05)',
            padding: '1rem',
            borderRadius: '16px',
            border: '1px solid rgba(245, 158, 11, 0.2)'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#b45309', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '1rem' }}>🎯</span> CURRENT TARGETS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '120px', overflowY: 'auto', paddingRight: '4px' }}>
              {Object.entries(monthGoals).sort((a, b) => parseInt(a[0]) - parseInt(b[0])).map(([day, text]) => (
                <div key={day} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <span style={{ 
                    fontSize: '0.7rem', 
                    fontWeight: 900, 
                    color: 'white', 
                    background: '#f59e0b', 
                    padding: '2px 6px', 
                    borderRadius: '6px',
                    minWidth: '24px',
                    textAlign: 'center',
                    marginTop: '2px'
                  }}>
                    {day}
                  </span>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', margin: 0, lineHeight: 1.3 }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '0.5rem',
        flexGrow: 1,
        overflowY: 'auto',
        alignContent: 'start',
        padding: '0.5rem 0'
      }}>
        {currentMonthDays.map((d) => {
          const goalText = monthGoals[d.day];
          const isGoal = !!goalText;
          return (
            <button
              key={d.day}
              onClick={() => toggleDay(d.day)}
              title={isGoal ? `GOAL: ${goalText}` : ''}
              style={{
                aspectRatio: '1/1',
                borderRadius: '10px',
                border: '2px solid',
                borderColor: d.completed ? 'var(--primary)' : (isGoal ? '#f59e0b' : 'rgba(16, 185, 129, 0.1)'),
                background: d.completed ? 'var(--primary)' : (isGoal ? '#fef3c7' : 'white'),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2px',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: d.completed ? '0 4px 12px rgba(16, 185, 129, 0.2)' : (isGoal ? '0 4px 12px rgba(245, 158, 11, 0.1)' : 'none'),
                position: 'relative',
                padding: '0'
              }}
            >
              <span style={{ 
                fontSize: '0.75rem', 
                fontWeight: 900, 
                color: d.completed ? 'white' : (isGoal ? '#92400e' : 'var(--text-main)') 
              }}>
                {d.day}
              </span>
              {d.completed ? (
                <CheckCircle2 size={12} color="white" />
              ) : (
                <Circle size={12} color={isGoal ? "#f59e0b" : "rgba(16, 185, 129, 0.3)"} />
              )}
            </button>
          );
        })}
      </div>
      
      <button 
        onClick={() => {
          if (!user) {
            openAuth();
          } else {
            setIsGoalModalOpen(true);
          }
        }}
        style={{ 
          padding: '1rem', 
          background: 'var(--bg-color)', 
          borderRadius: '12px',
          textAlign: 'center',
          fontSize: '0.9rem',
          fontWeight: 800,
          color: 'var(--primary)',
          border: '1px dashed var(--primary)',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(16, 185, 129, 0.05)'; }}
        onMouseOut={(e) => { e.currentTarget.style.background = 'var(--bg-color)'; }}
      >
        SET GOALS FOR THE MONTH
      </button>

      {/* Goal Setting Modal */}
      {isGoalModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            width: '90%',
            maxWidth: '600px',
            background: 'white',
            borderRadius: '32px',
            padding: '2.5rem',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Set Your Targets</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginBottom: '1.5rem', fontWeight: 600 }}>
              Select a day to describe your goal. These will shine in <span style={{ color: '#d97706', fontWeight: 800 }}>GOLD</span>.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              {currentMonthDays.map(d => {
                const isGoal = !!monthGoals[d.day];
                const isActive = activeGoalDay === d.day;
                return (
                  <button
                    key={d.day}
                    onClick={() => setActiveGoalDay(d.day)}
                    style={{
                      aspectRatio: '1/1',
                      borderRadius: '8px',
                      border: '2px solid',
                      borderColor: isActive ? 'var(--primary)' : (isGoal ? '#f59e0b' : 'rgba(0,0,0,0.05)'),
                      background: isGoal ? '#f59e0b' : 'white',
                      color: isGoal ? 'white' : 'var(--text-main)',
                      fontWeight: 800,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      transform: isActive ? 'scale(1.1)' : 'scale(1)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {d.day}
                  </button>
                );
              })}
            </div>

            {activeGoalDay && (
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-dim)', marginBottom: '0.5rem' }}>
                  GOAL FOR DAY {activeGoalDay}
                </label>
                <textarea
                  value={monthGoals[activeGoalDay] || ''}
                  onChange={(e) => setGoalText(activeGoalDay, e.target.value)}
                  placeholder="What is your target for this day?"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '2px solid var(--bg-color)',
                    background: 'var(--bg-color)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    minHeight: '80px',
                    fontFamily: 'Inter, sans-serif'
                  }}
                />
                <button 
                  onClick={() => setGoalText(activeGoalDay, null)}
                  style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer', marginTop: '0.5rem' }}
                >
                  REMOVE GOAL
                </button>
              </div>
            )}

            <button
              onClick={() => {
                setIsGoalModalOpen(false);
                setActiveGoalDay(null);
              }}
              style={{
                width: '100%',
                padding: '1rem',
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: '16px',
                fontWeight: 900,
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 10px 20px rgba(16, 185, 129, 0.2)'
              }}
            >
              SAVE & CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChecklistTracker;

