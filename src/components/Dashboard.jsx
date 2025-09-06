import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Activity, Users, Shield, AlertTriangle, TrendingUp, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = ({ onViewChange }) => {
  const stats = [
    { icon: Users, label: 'Profils Analysés', value: '1,337', change: '+12%', color: 'neon-green' },
    { icon: Shield, label: 'Fuites Détectées', value: '42', change: '+5%', color: 'neon-magenta' },
    { icon: Database, label: 'Bases Consultées', value: '15', change: '0%', color: 'neon-cyan' },
    { icon: AlertTriangle, label: 'Alertes Actives', value: '7', change: '-3%', color: 'text-red-400' }
  ];

  const recentScans = [
    { target: 'john_doe_2024', type: 'Username', platforms: 8, risk: 'HIGH', time: '2 min ago' },
    { target: 'alice.smith@email.com', type: 'Email', platforms: 5, risk: 'MEDIUM', time: '15 min ago' },
    { target: 'hackerman_elite', type: 'Username', platforms: 12, risk: 'CRITICAL', time: '1 hour ago' },
    { target: 'bob.wilson@corp.com', type: 'Email', platforms: 3, risk: 'LOW', time: '2 hours ago' }
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'CRITICAL': return 'text-red-500';
      case 'HIGH': return 'text-orange-500';
      case 'MEDIUM': return 'text-yellow-500';
      case 'LOW': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <Button
              onClick={() => onViewChange('terminal')}
              className="cyber-button"
            >
              <ArrowLeft size={18} />
            </Button>
            <div>
              <h1 className="text-3xl font-bold neon-green font-mono">
                SHADOWLINK DASHBOARD
              </h1>
              <p className="text-gray-400 mt-1">
                Centre de contrôle OSINT - Surveillance en temps réel
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Activity className="neon-green" size={16} />
            <span className="neon-green">SYSTÈME OPÉRATIONNEL</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="terminal-window p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={stat.color} size={24} />
                <span className={`text-xs ${stat.change.startsWith('+') ? 'text-green-400' : stat.change.startsWith('-') ? 'text-red-400' : 'text-gray-400'}`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold neon-cyan mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="terminal-window"
          >
            <div className="terminal-header">
              <span className="neon-green font-bold">SCANS RÉCENTS</span>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentScans.map((scan, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-black/30 rounded border border-green-900/30">
                    <div className="flex-1">
                      <div className="font-mono text-sm neon-cyan">
                        {scan.target}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {scan.type} • {scan.platforms} plateformes • {scan.time}
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-bold ${getRiskColor(scan.risk)}`}>
                      {scan.risk}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="terminal-window"
          >
            <div className="terminal-header">
              <span className="neon-green font-bold">ACTIVITÉ RÉSEAU</span>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Requêtes API</span>
                  <span className="neon-cyan font-mono">2,847</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-cyan-500 h-2 rounded-full" style={{ width: '73%' }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Taux de succès</span>
                  <span className="neon-green font-mono">94.2%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Latence moyenne</span>
                  <span className="neon-magenta font-mono">247ms</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-gradient-to-r from-yellow-500 to-red-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 terminal-window"
        >
          <div className="terminal-header">
            <span className="neon-green font-bold">ALERTES SÉCURITÉ</span>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-red-900/20 border border-red-500/30 rounded">
                <AlertTriangle className="text-red-500" size={20} />
                <div>
                  <div className="text-sm font-semibold text-red-400">
                    Nouvelle fuite de données détectée
                  </div>
                  <div className="text-xs text-gray-400">
                    Base de données "TechCorp2024" compromise - 15,000 emails exposés
                  </div>
                </div>
                <div className="ml-auto text-xs text-gray-500">
                  Il y a 5 min
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded">
                <TrendingUp className="text-yellow-500" size={20} />
                <div>
                  <div className="text-sm font-semibold text-yellow-400">
                    Activité suspecte détectée
                  </div>
                  <div className="text-xs text-gray-400">
                    Tentatives de connexion multiples sur profil surveillé
                  </div>
                </div>
                <div className="ml-auto text-xs text-gray-500">
                  Il y a 12 min
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;