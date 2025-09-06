import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Download, Share2, AlertTriangle, CheckCircle, XCircle, Eye, EyeOff, Shield, Users, Calendar, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const ScanResults = ({ data, isScanning, onViewChange }) => {
  const [activeTab, setActiveTab] = useState('platforms');
  const [showDetails, setShowDetails] = useState({});

  if (isScanning) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="terminal-window p-8 text-center max-w-md"
        >
          <div className="loading-spinner w-16 h-16 mx-auto mb-6"></div>
          <h2 className="text-xl font-bold neon-green mb-4">SCAN EN COURS</h2>
          <div className="space-y-2 text-sm text-gray-400">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Interrogation des bases de données...
            </motion.div>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              Analyse des corrélations...
            </motion.div>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              Génération du rapport...
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!data) return null;

  const toggleDetails = (platform) => {
    setShowDetails(prev => ({
      ...prev,
      [platform]: !prev[platform]
    }));
  };

  const getRiskColor = (score) => {
    if (score >= 8) return 'text-red-500';
    if (score >= 6) return 'text-orange-500';
    if (score >= 4) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getRiskLabel = (score) => {
    if (score >= 8) return 'CRITIQUE';
    if (score >= 6) return 'ÉLEVÉ';
    if (score >= 4) return 'MOYEN';
    return 'FAIBLE';
  };

  const handleExport = () => {
    toast({ title: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine invite ! 🚀" });
  };

  const handleShare = () => {
    toast({ title: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine invite ! 🚀" });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
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
                RAPPORT D'ANALYSE
              </h1>
              <p className="text-gray-400 mt-1">
                Cible: <span className="neon-cyan font-mono">{data.query}</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button onClick={handleExport} className="cyber-button">
              <Download size={16} className="mr-2" />
              EXPORT
            </Button>
            <Button onClick={handleShare} className="cyber-button">
              <Share2 size={16} className="mr-2" />
              PARTAGER
            </Button>
            <Button onClick={() => onViewChange('network')} className="cyber-button">
              <LinkIcon size={16} className="mr-2" />
              GRAPHE
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="terminal-window p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="neon-green" size={24} />
              <span className="font-bold">SCORE DE RISQUE</span>
            </div>
            <div className={`text-4xl font-bold font-mono ${getRiskColor(data.riskScore)}`}>
              {data.riskScore}/10
            </div>
            <div className={`text-sm mt-2 ${getRiskColor(data.riskScore)}`}>
              {getRiskLabel(data.riskScore)}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="terminal-window p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Users className="neon-cyan" size={24} />
              <span className="font-bold">PLATEFORMES</span>
            </div>
            <div className="text-4xl font-bold neon-cyan font-mono">
              {data.platforms.filter(p => p.found).length}
            </div>
            <div className="text-sm text-gray-400 mt-2">
              sur {data.platforms.length} analysées
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="terminal-window p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="neon-magenta" size={24} />
              <span className="font-bold">FUITES</span>
            </div>
            <div className="text-4xl font-bold neon-magenta font-mono">
              {data.breaches?.length || 0}
            </div>
            <div className="text-sm text-gray-400 mt-2">
              bases compromises
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="terminal-window p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <LinkIcon className="text-yellow-400" size={24} />
              <span className="font-bold">CORRÉLATIONS</span>
            </div>
            <div className="text-4xl font-bold text-yellow-400 font-mono">
              {data.correlations.length}
            </div>
            <div className="text-sm text-gray-400 mt-2">
              liens détectés
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="terminal-window"
            >
              <div className="terminal-header">
                <div className="flex gap-4">
                  <button
                    onClick={() => setActiveTab('platforms')}
                    className={`px-4 py-2 text-sm font-bold ${activeTab === 'platforms' ? 'neon-green' : 'text-gray-400'}`}
                  >
                    PLATEFORMES
                  </button>
                  <button
                    onClick={() => setActiveTab('breaches')}
                    className={`px-4 py-2 text-sm font-bold ${activeTab === 'breaches' ? 'neon-green' : 'text-gray-400'}`}
                  >
                    FUITES
                  </button>
                  <button
                    onClick={() => setActiveTab('correlations')}
                    className={`px-4 py-2 text-sm font-bold ${activeTab === 'correlations' ? 'neon-green' : 'text-gray-400'}`}
                  >
                    CORRÉLATIONS
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === 'platforms' && (
                    <motion.div
                      key="platforms"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      {data.platforms.map((platform, index) => (
                        <div key={index} className="border border-green-900/30 rounded p-4 bg-black/30">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {platform.found ? (
                                <CheckCircle className="text-green-500" size={20} />
                              ) : (
                                <XCircle className="text-red-500" size={20} />
                              )}
                              <span className="font-bold neon-cyan">{platform.name}</span>
                            </div>
                            {platform.found && (
                              <Button
                                onClick={() => toggleDetails(platform.name)}
                                className="cyber-button p-2"
                              >
                                {showDetails[platform.name] ? <EyeOff size={16} /> : <Eye size={16} />}
                              </Button>
                            )}
                          </div>
                          
                          {!platform.found && platform.reason && (
                            <div className="text-sm text-gray-400 mt-2">
                              {platform.reason}
                            </div>
                          )}
                          
                          <AnimatePresence>
                            {platform.found && showDetails[platform.name] && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 pt-4 border-t border-green-900/30"
                              >
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  {platform.profile?.username && (
                                    <div>
                                      <span className="text-gray-400">Username:</span>
                                      <div className="neon-cyan font-mono">{platform.profile.username}</div>
                                    </div>
                                  )}
                                  {platform.profile?.followers && (
                                    <div>
                                      <span className="text-gray-400">Followers:</span>
                                      <div className="text-green-400">{platform.profile.followers}</div>
                                    </div>
                                  )}
                                  {platform.profile?.joinDate && (
                                    <div>
                                      <span className="text-gray-400">Membre depuis:</span>
                                      <div className="text-yellow-400">{platform.profile.joinDate}</div>
                                    </div>
                                  )}
                                  {platform.profile?.bio && (
                                    <div className="col-span-2">
                                      <span className="text-gray-400">Bio:</span>
                                      <div className="text-green-400 mt-1">{platform.profile.bio}</div>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </motion.div>
                  )}
                  
                  {activeTab === 'breaches' && (
                    <motion.div
                      key="breaches"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      {data.breaches && data.breaches.length > 0 ? (
                        data.breaches.map((breach, index) => (
                          <div key={index} className="border border-red-500/30 rounded p-4 bg-red-900/10">
                            <div className="flex items-center gap-3 mb-2">
                              <AlertTriangle className="text-red-500" size={20} />
                              <span className="font-bold text-red-400">{breach.name}</span>
                            </div>
                            <div className="text-sm text-gray-400 mb-2">
                              Date: {breach.date}
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-400">Données compromises:</span>
                              <div className="mt-1">
                                {breach.compromisedData.map((data, i) => (
                                  <span key={i} className="inline-block bg-red-900/30 text-red-300 px-2 py-1 rounded text-xs mr-2 mb-1">
                                    {data}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-gray-400 py-8">
                          <Shield className="mx-auto mb-4" size={48} />
                          <p>Aucune fuite de données détectée</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                  
                  {activeTab === 'correlations' && (
                    <motion.div
                      key="correlations"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      {data.correlations.map((correlation, index) => (
                        <div key={index} className="border border-yellow-500/30 rounded p-4 bg-yellow-900/10">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-yellow-400">{correlation.type}</span>
                            <span className="text-sm bg-yellow-900/30 text-yellow-300 px-2 py-1 rounded">
                              {(correlation.confidence * 100).toFixed(0)}% confiance
                            </span>
                          </div>
                          <div className="text-sm text-gray-400">
                            Plateformes: {correlation.platforms.join(', ')}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-6"
          >
            <div className="terminal-window">
              <div className="terminal-header">
                <span className="neon-green font-bold">RECOMMANDATIONS</span>
              </div>
              <div className="p-4 space-y-3">
                {data.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="terminal-window">
              <div className="terminal-header">
                <span className="neon-green font-bold">ACTIONS RAPIDES</span>
              </div>
              <div className="p-4 space-y-3">
                <Button 
                  onClick={() => onViewChange('network')} 
                  className="cyber-button w-full justify-start"
                >
                  <LinkIcon size={16} className="mr-2" />
                  Voir le graphe réseau
                </Button>
                <Button 
                  onClick={handleExport} 
                  className="cyber-button w-full justify-start"
                >
                  <Download size={16} className="mr-2" />
                  Exporter le rapport
                </Button>
                <Button 
                  onClick={() => onViewChange('dashboard')} 
                  className="cyber-button w-full justify-start"
                >
                  <Calendar size={16} className="mr-2" />
                  Programmer un suivi
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ScanResults;