import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import MatrixRain from '@/components/MatrixRain';
import Terminal from '@/components/Terminal';
import Dashboard from '@/components/Dashboard';
import NetworkGraph from '@/components/NetworkGraph';
import ScanResults from '@/components/ScanResults';

function App() {
  const [currentView, setCurrentView] = useState('terminal');
  const [scanData, setScanData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async (query, type) => {
    setIsScanning(true);
    
    // Simulate OSINT scan
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockResults = {
      query,
      type,
      platforms: [
        {
          name: 'GitHub',
          found: true,
          profile: {
            username: query,
            avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face',
            bio: 'Full-stack developer passionate about cybersecurity',
            followers: 234,
            repos: 42,
            joinDate: '2019-03-15'
          }
        },
        {
          name: 'Twitter/X',
          found: true,
          profile: {
            username: query,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
            bio: 'Tech enthusiast | OSINT researcher',
            followers: 1337,
            following: 420,
            joinDate: '2018-07-22'
          }
        },
        {
          name: 'Reddit',
          found: true,
          profile: {
            username: query,
            karma: 15420,
            cakeDay: '2020-01-10',
            activeIn: ['cybersecurity', 'programming', 'osint']
          }
        },
        {
          name: 'Instagram',
          found: false,
          reason: 'Private account or not found'
        },
        {
          name: 'LinkedIn',
          found: true,
          profile: {
            username: query,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
            title: 'Cybersecurity Analyst',
            company: 'TechCorp Inc.',
            connections: 500
          }
        }
      ],
      breaches: type === 'email' ? [
        {
          name: 'Collection #1',
          date: '2019-01-07',
          compromisedData: ['Email addresses', 'Passwords']
        },
        {
          name: 'LinkedIn',
          date: '2021-06-22',
          compromisedData: ['Email addresses', 'Professional information']
        }
      ] : [],
      correlations: [
        {
          type: 'Same avatar hash',
          platforms: ['GitHub', 'Twitter/X'],
          confidence: 0.95
        },
        {
          type: 'Similar bio keywords',
          platforms: ['GitHub', 'LinkedIn'],
          confidence: 0.78
        }
      ],
      riskScore: 7.2,
      recommendations: [
        'Utiliser des pseudos différents sur chaque plateforme',
        'Éviter de réutiliser la même photo de profil',
        'Activer l\'authentification à deux facteurs',
        'Vérifier régulièrement les fuites de données'
      ]
    };

    setScanData(mockResults);
    setIsScanning(false);
    setCurrentView('results');
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <>
      <Helmet>
        <title>ShadowLink - OSINT Intelligence Platform</title>
        <meta name="description" content="Plateforme d'investigation OSINT pour traquer les identités numériques et analyser les connexions sociales" />
      </Helmet>
      
      <div className="min-h-screen bg-black relative overflow-hidden">
        <MatrixRain />
        
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {currentView === 'terminal' && (
              <motion.div
                key="terminal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Terminal onScan={handleScan} onViewChange={handleViewChange} />
              </motion.div>
            )}
            
            {currentView === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <Dashboard onViewChange={handleViewChange} />
              </motion.div>
            )}
            
            {currentView === 'network' && (
              <motion.div
                key="network"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <NetworkGraph 
                  data={scanData} 
                  onViewChange={handleViewChange} 
                />
              </motion.div>
            )}
            
            {currentView === 'results' && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <ScanResults 
                  data={scanData} 
                  isScanning={isScanning}
                  onViewChange={handleViewChange} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <Toaster />
      </div>
    </>
  );
}

export default App;