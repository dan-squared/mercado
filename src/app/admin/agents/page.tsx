'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { HugeIcon } from '@/components/ui/huge-icon';

interface AgentLog {
  id: string;
  agentName: string;
  action: string;
  target: string;
  status: 'Completed' | 'Running' | 'Queued';
  timestamp: string;
  details: string;
}

const INITIAL_LOGS: AgentLog[] = [
  {
    id: 'log-101',
    agentName: 'FraudSentinel-v4',
    action: 'Automated Bot & View-Spike Scan',
    target: 'Campaign camp-2 (Kifiya Wallet)',
    status: 'Completed',
    timestamp: '2026-07-23 14:35:10',
    details: 'Flagged 1 submission for view count 4.2x above channel average.',
  },
  {
    id: 'log-102',
    agentName: 'TrustTierAudit-v2',
    action: 'Channel Follower Verification',
    target: 'Creator @selam_tech',
    status: 'Completed',
    timestamp: '2026-07-23 12:10:04',
    details: 'Verified 45,000 Telegram subscribers via API spot check. Promoted to Elite.',
  },
  {
    id: 'log-103',
    agentName: 'EscrowBatchPay-v1',
    action: 'Batch Mobile Money Payout Trigger',
    target: 'Weekly Batch #28',
    status: 'Queued',
    timestamp: '2026-07-23 15:00:00',
    details: 'Scheduled for Friday 00:00 UTC via Telebirr API batch hook.',
  },
];

// Emil: Status dot vs label — communicate state with more than just color alone (accessibility).
const statusConfig: Record<AgentLog['status'], { color: string; bg: string; border: string }> = {
  Completed: { color: '#3a3d43', bg: '#f4f4f4',              border: '1px solid var(--border)' },
  Running:   { color: '#2f5fe0', bg: 'rgba(47,95,224,0.07)', border: '1px solid rgba(47,95,224,0.15)' },
  Queued:    { color: '#7a7e85', bg: '#f4f4f4',              border: '1px solid var(--border)' },
};

// Emil: Agent trigger cards — single config array instead of 3x repeated JSX.
// Software engineering = DRY.
const AGENT_TASKS = [
  {
    id: 'fraud-scan',
    action: 'Run Fraud & Bot Scan',
    description: 'Scan submission links against shared IP blocklist.',
    icon: 'shield' as const,
  },
  {
    id: 'batch-approve',
    action: 'Batch-Approve Low-Risk Queue',
    description: 'Automatically release funds for Trusted & Elite creators.',
    icon: 'check-circle' as const,
  },
  {
    id: 'audit-report',
    action: 'Generate Weekly Escrow Audit',
    description: 'Compile itemized revenue report for platform owner.',
    icon: 'sparkles' as const,
  },
];

export default function AdminAgentsPage() {
  const [logs, setLogs]           = useState<AgentLog[]>(INITIAL_LOGS);
  const [activeTask, setActiveTask] = useState<string | null>(null);

  const triggerAgentTask = (taskId: string, actionName: string) => {
    setActiveTask(taskId);
    setTimeout(() => {
      const newLog: AgentLog = {
        id: `log-${Date.now()}`,
        agentName: 'MercadoAutonomous-Agent',
        action: actionName,
        target: 'Platform-wide telemetry',
        status: 'Completed',
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        details: 'Execution successful. 0 anomalies detected.',
      };
      // Emil: prepend to list so new items animate in at top (spatially consistent).
      setLogs((prev) => [newLog, ...prev]);
      setActiveTask(null);
    }, 1400);
  };

  return (
    <AppShell role="admin">
      <div style={{ maxWidth: 900, display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Page header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: 'var(--text-dark)',
                margin: '0 0 6px',
                letterSpacing: '-0.025em',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <HugeIcon name="ai" size={26} />
              AI Agent Hub
            </h1>
            <p style={{ fontSize: 13.5, color: 'var(--text-muted)', margin: 0 }}>
              Autonomous fraud scanners, batch escrow bots, and LLM-powered audit agents.
            </p>
          </div>
          {/* Status badge — monochrome, no purple */}
          <span
            style={{
              padding: '5px 12px',
              borderRadius: 'var(--radius-sm)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              background: '#f4f4f4',
              color: 'var(--text-mid)',
              border: '1px solid var(--border)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            Protocol Active
          </span>
        </div>

        {/* Trigger Cards */}
        <div
          style={{
            background: '#fff',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xl)',
            padding: '24px 28px',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--text-faint)',
              margin: '0 0 16px',
            }}
          >
            Trigger Agent Actions
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {AGENT_TASKS.map((task) => {
              const isRunning = activeTask === task.id;
              return (
                <button
                  key={task.id}
                  onClick={() => !activeTask && triggerAgentTask(task.id, task.action)}
                  disabled={!!activeTask}
                  style={{
                    padding: '18px 16px',
                    borderRadius: 'var(--radius-lg)',
                    background: isRunning ? '#f4f4f4' : '#f9f9f8',
                    border: isRunning ? '1px solid var(--border-mid)' : '1px solid var(--border)',
                    textAlign: 'left',
                    cursor: activeTask ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    // Emil: specify exact transition properties
                    transition: 'background-color var(--dur-base) var(--ease), border-color var(--dur-base) var(--ease), transform var(--dur-fast) var(--ease-out)',
                    opacity: activeTask && !isRunning ? 0.5 : 1,
                  }}
                  className={activeTask ? '' : 'btn-interactive'}
                  onMouseEnter={(e) => { if (!activeTask) e.currentTarget.style.borderColor = 'var(--border-mid)'; }}
                  onMouseLeave={(e) => { if (!activeTask) e.currentTarget.style.borderColor = 'var(--border)'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <HugeIcon name={task.icon} size={18} />
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: isRunning ? 'var(--blue)' : 'var(--text-faint)',
                      }}
                    >
                      {isRunning ? 'Running…' : 'Trigger'}
                    </span>
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-dark)', margin: '0 0 4px' }}>
                      {task.action}
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                      {task.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Loading state — Emil: immediately visible, communicates progress */}
          {activeTask && (
            <div
              style={{
                marginTop: 14,
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                background: '#f4f4f4',
                border: '1px solid var(--border)',
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--text-dark)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  border: '2px solid var(--border-mid)',
                  borderTopColor: 'var(--text-dark)',
                  animation: 'agentSpin 600ms linear infinite',
                  flexShrink: 0,
                }}
              />
              Executing: {AGENT_TASKS.find((t) => t.id === activeTask)?.action}…
            </div>
          )}
        </div>

        {/* Agent Telemetry Log */}
        <div
          style={{
            background: '#fff',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xl)',
            padding: '24px 28px',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-faint)',
                margin: 0,
              }}
            >
              Agent Telemetry Log
            </p>
            <span style={{ fontSize: 11.5, fontFamily: 'monospace', color: 'var(--text-muted)' }}>
              Live Stream
            </span>
          </div>

          {/* Log terminal — Emil: dark background creates context separation from the page.
              This is deliberate: log output is machine data, different visual register. */}
          <div
            style={{
              borderRadius: 'var(--radius-lg)',
              background: '#111113',
              border: '1px solid #222226',
              overflow: 'hidden',
            }}
          >
            {logs.map((log, i) => {
              const sc = statusConfig[log.status];
              return (
                <div
                  key={log.id}
                  style={{
                    padding: '14px 18px',
                    borderBottom: i < logs.length - 1 ? '1px solid #1c1c20' : 'none',
                    // Emil: stagger-item animates new entries in from the top
                    animation: i === 0 && logs.length > INITIAL_LOGS.length
                      ? 'fadeSlideUp 240ms var(--ease-out) both'
                      : 'none',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 5,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontFamily: 'monospace', fontSize: 11.5, color: '#7c8090', fontWeight: 600 }}>
                        [{log.agentName}]
                      </span>
                      {/* Status chip — communicates state with text, not just color */}
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          padding: '2px 7px',
                          borderRadius: 4,
                          background: sc.bg,
                          color: sc.color,
                          border: sc.border,
                        }}
                      >
                        {log.status}
                      </span>
                    </div>
                    <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#4a4d56' }}>
                      {log.timestamp}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#e8eaf0', margin: '0 0 3px', fontFamily: 'monospace' }}>
                    {log.action}
                  </p>
                  <p style={{ fontSize: 12, color: '#5c6070', margin: 0, fontFamily: 'monospace', lineHeight: 1.5 }}>
                    {log.details}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes agentSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </AppShell>
  );
}
