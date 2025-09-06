
    import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, Zap, Shield, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Terminal = ({ onScan, onViewChange }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [showCursor, setShowCursor] = useState(true);
  const inputRef = useRef(null);

  const welcomeText = [
    '╔═══════════════════════════════════════════════════════════════╗',
    '║                        SHADOWLINK v2.1                       ║',
    '║                   OSINT Intelligence Platform                 ║',
    '║                                                               ║',
    '║  [CLASSIFIED] Système d\'investigation numérique avancé       ║',
    '║  Développé par l\'équipe CyberSec Division                     ║',
    '╚═══════════════════════════════════════════════════════════════╝',
    '',
    '> Initialisation des modules OSINT...',
    '> Connexion aux bases de données sécurisées...',
    '> Chargement des algorithmes de corrélation...',
    '> Système opérationnel.',
    '',
    'COMMANDES DISPONIBLES:',
    '  scan <pseudo>     - Rechercher un pseudonyme',
    '  trace <email>     - Tracer une adresse email',
    '  dashboard         - Accéder au tableau de bord',
    '  network           - Visualiser le graphe réseau',
    '  help              - Afficher l\'aide',
    '  clear             - Effacer l\'écran',
    '',
    'Tapez votre commande et appuyez sur ENTRÉE...',
    ''
  ];

  useEffect(() => {
    let index = 0;
    const typeWriter = () => {
      if (index < welcomeText.length) {
        setHistory(prev => [...prev, welcomeText[index]]);
        index++;
        setTimeout(typeWriter, 100);
      }
    };
    if (history.length === 0) {
      typeWriter();
    }
    
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleCommand = (command) => {
    const [cmd, ...args] = command.toLowerCase().trim().split(' ');
    const arg = args.join(' ');

    setHistory(prev => [...prev, `> ${command}`, '']);

    switch (cmd) {
      case 'scan':
        if (!arg) {
          setHistory(prev => [...prev, 'ERREUR: Veuillez spécifier un pseudonyme', 'Usage: scan <pseudonyme>', '']);
        } else {
          setHistory(prev => [...prev, `Lancement du scan OSINT pour: ${arg}`, 'Recherche en cours sur les plateformes...', '']);
          setTimeout(() => onScan(arg, 'username'), 1000);
        }
        break;
      
      case 'trace':
        if (!arg) {
          setHistory(prev => [...prev, 'ERREUR: Veuillez spécifier une adresse email', 'Usage: trace <email>', '']);
        } else {
          setHistory(prev => [...prev, `Traçage de l'email: ${arg}`, 'Vérification des fuites de données...', '']);
          setTimeout(() => onScan(arg, 'email'), 1000);
        }
        break;
      
      case 'dashboard':
        setHistory(prev => [...prev, 'Accès au tableau de bord...', '']);
        setTimeout(() => onViewChange('dashboard'), 500);
        break;
      
      case 'network':
        setHistory(prev => [...prev, 'Chargement du graphe réseau...', '']);
        setTimeout(() => onViewChange('network'), 500);
        break;
      
      case 'help':
        setHistory(prev => [...prev, 
          'COMMANDES SHADOWLINK:',
          '  scan <pseudo>     - Rechercher un pseudonyme sur les réseaux sociaux',
          '  trace <email>     - Tracer une adresse email et vérifier les fuites',
          '  dashboard         - Accéder au tableau de bord principal',
          '  network           - Visualiser le graphe des connexions',
          '  clear             - Effacer l\'historique du terminal',
          '  exit              - Quitter le système',
          ''
        ]);
        break;
      
      case 'clear':
        setHistory([]);
        break;
      
      case 'exit':
        setHistory(prev => [...prev, 'Déconnexion du système SHADOWLINK...', 'Au revoir, agent.', '']);
        break;
      
      default:
        setHistory(prev => [...prev, `Commande inconnue: ${cmd}`, 'Tapez "help" pour voir les commandes disponibles', '']);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  const quickActions = [
    { icon: Search, label: 'SCAN', action: () => {
        const pseudo = window.prompt("Entrez le pseudonyme à scanner :");
        if (pseudo && pseudo.trim()) {
          handleCommand(`scan ${pseudo.trim()}`);
        }
      } 
    },
    { icon: Zap, label: 'TRACE', action: () => {
        const email = window.prompt("Entrez l'email à tracer :");
        if (email && email.trim()) {
          handleCommand(`trace ${email.trim()}`);
        }
      } 
    },
    { icon: Shield, label: 'DASHBOARD', action: () => handleCommand('dashboard') },
    { icon: Eye, label: 'NETWORK', action: () => handleCommand('network') }
  ];

  return (
    <div className="min-h-screen p-4 flex flex-col">
      <div className="flex-1 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="terminal-window h-full flex flex-col"
        >
          <div className="terminal-header">
            <div className="terminal-dot red"></div>
            <div className="terminal-dot yellow"></div>
            <div className="terminal-dot green"></div>
            <span className="neon-green font-bold ml-4">SHADOWLINK TERMINAL</span>
            <div className="ml-auto text-xs neon-cyan">
              STATUS: OPERATIONAL | CLEARANCE: ALPHA
            </div>
          </div>
          
          <div className="flex-1 p-6 font-mono text-sm overflow-y-auto">
            <div className="space-y-1">
              {history.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={line && line.startsWith('>') ? 'neon-cyan' : 'text-green-400'}
                >
                  {line}
                </motion.div>
              ))}
            </div>
            
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="flex items-center">
                <span className="neon-green mr-2">shadowlink@osint:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="bg-transparent border-none outline-none text-green-400 flex-1 font-mono"
                  autoComplete="off"
                />
                <span className={`cursor ${showCursor ? 'opacity-100' : 'opacity-0'} neon-green`}>
                  █
                </span>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-6 flex justify-center gap-4"
      >
        {quickActions.map((action, index) => (
          <Button
            key={index}
            onClick={action.action}
            className="cyber-button flex items-center gap-2 px-6 py-3"
          >
            <action.icon size={18} />
            {action.label}
          </Button>
        ))}
      </motion.div>
    </div>
  );
};

export default Terminal;
  