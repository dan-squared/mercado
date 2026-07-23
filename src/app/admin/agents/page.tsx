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

export default function AdminAgentsPage() {
  const [logs, setLogs] = useState<AgentLog[]>(INITIAL_LOGS);
  const [activeTask, setActiveTask] = useState<string | null>(null);

  const triggerAgentTask = (actionName: string) => {
    setActiveTask(actionName);
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
      setLogs([newLog, ...logs]);
      setActiveTask(null);
    }, 1200);
  };

  return (
    <AppShell role="admin">
      <div className="space-y-8 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl lg:text-3xl font-black text-[var(--text-primary)] tracking-tight flex items-center gap-2">
              <HugeIcon name="ai" size={28} className="text-purple-500" />
              <span>AI Agent Automation Hub</span>
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              Connect external LLM coding agents, autonomous fraud scanners, and automated escrow bots.
            </p>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            🤖 AI-Agent Ready Protocol Active
          </span>
        </div>

        {/* Action Trigger Buttons */}
        <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Trigger Autonomous Agent Actions
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => triggerAgentTask('Run Fraud & Bot Scan')}
              disabled={!!activeTask}
              className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--blue)] text-left transition-all btn-interactive space-y-1"
            >
              <div className="flex justify-between items-center text-[var(--blue)]">
                <HugeIcon name="shield" size={18} />
                <span className="text-[10px] font-bold uppercase">Trigger</span>
              </div>
              <p className="text-xs font-bold text-[var(--text-primary)]">Run Fraud & Bot Scan</p>
              <p className="text-[11px] text-[var(--text-muted)]">
                Scan submission links against shared IP blocklist.
              </p>
            </button>

            <button
              onClick={() => triggerAgentTask('Batch-Approve Low-Risk Queue')}
              disabled={!!activeTask}
              className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-emerald-500 text-left transition-all btn-interactive space-y-1"
            >
              <div className="flex justify-between items-center text-emerald-500">
                <HugeIcon name="check-circle" size={18} />
                <span className="text-[10px] font-bold uppercase">Trigger</span>
              </div>
              <p className="text-xs font-bold text-[var(--text-primary)]">
                Batch-Approve Low-Risk Queue
              </p>
              <p className="text-[11px] text-[var(--text-muted)]">
                Automatically release funds for Trusted & Elite creators.
              </p>
            </button>

            <button
              onClick={() => triggerAgentTask('Generate Weekly Escrow Audit')}
              disabled={!!activeTask}
              className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-purple-500 text-left transition-all btn-interactive space-y-1"
            >
              <div className="flex justify-between items-center text-purple-500">
                <HugeIcon name="sparkles" size={18} />
                <span className="text-[10px] font-bold uppercase">Trigger</span>
              </div>
              <p className="text-xs font-bold text-[var(--text-primary)]">
                Generate Weekly Escrow Audit
              </p>
              <p className="text-[11px] text-[var(--text-muted)]">
                Compile itemized revenue report for platform owner.
              </p>
            </button>
          </div>

          {activeTask && (
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 text-xs font-bold flex items-center justify-center gap-2 animate-pulse">
              <div className="w-4 h-4 rounded-full border-2 border-purple-600 border-t-transparent animate-spin" />
              <span>Executing Agent Action: {activeTask}...</span>
            </div>
          )}
        </div>

        {/* Real-time Agent Log Telemetry */}
        <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Agent Action Telemetry Log
            </h3>
            <span className="text-xs font-mono text-[var(--text-muted)]">Live Stream</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {logs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-xl bg-[#121214] text-zinc-300 border border-zinc-800 space-y-1"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-purple-400 font-bold">[{log.agentName}]</span>
                  <span className="text-zinc-500">{log.timestamp}</span>
                </div>
                <p className="font-bold text-white">{log.action}</p>
                <p className="text-zinc-400 text-[11px]">{log.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
