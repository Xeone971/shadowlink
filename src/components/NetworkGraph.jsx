import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ZoomIn, ZoomOut, RotateCcw, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import * as d3 from 'd3';

const NetworkGraph = ({ data, onViewChange }) => {
  const svgRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!data) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 800;
    const height = 600;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    // Create nodes and links from scan data
    const nodes = [
      { id: data.query, type: 'target', group: 0, size: 20 },
      ...data.platforms.filter(p => p.found).map((platform, index) => ({
        id: platform.name,
        type: 'platform',
        group: 1,
        size: 15,
        data: platform
      }))
    ];

    const links = data.platforms
      .filter(p => p.found)
      .map(platform => ({
        source: data.query,
        target: platform.name,
        strength: Math.random() * 0.5 + 0.5
      }));

    // Add correlation links
    data.correlations.forEach(corr => {
      if (corr.platforms.length >= 2) {
        for (let i = 0; i < corr.platforms.length - 1; i++) {
          links.push({
            source: corr.platforms[i],
            target: corr.platforms[i + 1],
            strength: corr.confidence,
            type: 'correlation'
          });
        }
      }
    });

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const container = svg.append("g");

    // Add zoom behavior
    const zoomBehavior = d3.zoom()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        container.attr("transform", event.transform);
        setZoom(event.transform.k);
      });

    svg.call(zoomBehavior);

    // Create links
    const link = container.append("g")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("class", "graph-link")
      .attr("stroke-width", d => d.type === 'correlation' ? 3 : 2)
      .attr("stroke", d => d.type === 'correlation' ? '#ff00ff' : '#00ff41')
      .attr("stroke-opacity", d => d.strength || 0.6);

    // Create nodes
    const node = container.append("g")
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("class", "graph-node")
      .attr("r", d => d.size)
      .attr("fill", d => {
        switch (d.type) {
          case 'target': return '#00ffff';
          case 'platform': return '#00ff41';
          default: return '#ffffff';
        }
      })
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 2)
      .style("filter", "drop-shadow(0 0 10px currentColor)")
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))
      .on("click", (event, d) => {
        setSelectedNode(d);
      });

    // Add labels
    const labels = container.append("g")
      .selectAll("text")
      .data(nodes)
      .enter().append("text")
      .text(d => d.id)
      .attr("font-size", "12px")
      .attr("font-family", "Source Code Pro, monospace")
      .attr("fill", "#00ff41")
      .attr("text-anchor", "middle")
      .attr("dy", d => d.size + 20)
      .style("text-shadow", "0 0 5px #00ff41");

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

      labels
        .attr("x", d => d.x)
        .attr("y", d => d.y);
    });

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

  }, [data]);

  const handleZoomIn = () => {
    const svg = d3.select(svgRef.current);
    svg.transition().call(
      d3.zoom().transform,
      d3.zoomTransform(svg.node()).scale(zoom * 1.5)
    );
  };

  const handleZoomOut = () => {
    const svg = d3.select(svgRef.current);
    svg.transition().call(
      d3.zoom().transform,
      d3.zoomTransform(svg.node()).scale(zoom * 0.75)
    );
  };

  const handleReset = () => {
    const svg = d3.select(svgRef.current);
    svg.transition().call(
      d3.zoom().transform,
      d3.zoomIdentity
    );
  };

  const handleExport = () => {
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
                GRAPHE RÉSEAU
              </h1>
              <p className="text-gray-400 mt-1">
                Visualisation des connexions et corrélations
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button onClick={handleZoomIn} className="cyber-button p-2">
              <ZoomIn size={16} />
            </Button>
            <Button onClick={handleZoomOut} className="cyber-button p-2">
              <ZoomOut size={16} />
            </Button>
            <Button onClick={handleReset} className="cyber-button p-2">
              <RotateCcw size={16} />
            </Button>
            <Button onClick={handleExport} className="cyber-button p-2">
              <Download size={16} />
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="terminal-window h-[600px] relative overflow-hidden">
              <div className="terminal-header">
                <span className="neon-green font-bold">CARTE RÉSEAU INTERACTIVE</span>
                <span className="ml-auto text-xs neon-cyan">
                  Zoom: {(zoom * 100).toFixed(0)}%
                </span>
              </div>
              <div className="p-4 h-full">
                <svg
                  ref={svgRef}
                  width="100%"
                  height="100%"
                  viewBox="0 0 800 600"
                  className="border border-green-900/30 rounded bg-black/50"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="terminal-window">
              <div className="terminal-header">
                <span className="neon-green font-bold">LÉGENDE</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-cyan-400" style={{ filter: 'drop-shadow(0 0 5px #00ffff)' }}></div>
                  <span className="text-sm">Cible principale</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-green-400" style={{ filter: 'drop-shadow(0 0 5px #00ff41)' }}></div>
                  <span className="text-sm">Plateforme trouvée</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-0.5 bg-green-400"></div>
                  <span className="text-sm">Connexion directe</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-0.5 bg-magenta-400"></div>
                  <span className="text-sm">Corrélation</span>
                </div>
              </div>
            </div>

            {selectedNode && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="terminal-window"
              >
                <div className="terminal-header">
                  <span className="neon-green font-bold">DÉTAILS NŒUD</span>
                </div>
                <div className="p-4">
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="text-gray-400">ID:</span>
                      <span className="ml-2 neon-cyan font-mono">{selectedNode.id}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-400">Type:</span>
                      <span className="ml-2 text-green-400">{selectedNode.type}</span>
                    </div>
                    {selectedNode.data && selectedNode.data.profile && (
                      <div className="mt-3 pt-3 border-t border-green-900/30">
                        <div className="text-xs text-gray-400 mb-2">Informations du profil:</div>
                        {selectedNode.data.profile.followers && (
                          <div className="text-sm">
                            <span className="text-gray-400">Followers:</span>
                            <span className="ml-2 neon-cyan">{selectedNode.data.profile.followers}</span>
                          </div>
                        )}
                        {selectedNode.data.profile.bio && (
                          <div className="text-sm mt-2">
                            <span className="text-gray-400">Bio:</span>
                            <div className="ml-2 text-green-400 text-xs mt-1">
                              {selectedNode.data.profile.bio}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {data && (
              <div className="terminal-window">
                <div className="terminal-header">
                  <span className="neon-green font-bold">STATISTIQUES</span>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Plateformes trouvées:</span>
                    <span className="neon-cyan font-mono">
                      {data.platforms.filter(p => p.found).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Corrélations:</span>
                    <span className="neon-magenta font-mono">
                      {data.correlations.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Score de risque:</span>
                    <span className="text-red-400 font-mono">
                      {data.riskScore}/10
                    </span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NetworkGraph;