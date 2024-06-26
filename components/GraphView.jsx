'use client';
import React, { useEffect, useRef, useState } from 'react';
import { DataSet } from 'vis-data';
import { initializeNetwork, getAllChildNodes } from '../utils/graphUtils';
import FilterPanel from './FilterPanel';
import NodeModal from './NodeModal';
import { SearchInput } from './SearchAndFilter';
import { motion, AnimatePresence } from 'framer-motion';

const GraphView = () => {
  const graphRef = useRef(null);
  const networkRef = useRef(null);
  const nodesRef = useRef(new DataSet());
  const edgesRef = useRef(new DataSet());
  const [filters, setFilters] = useState({
    all: true,
    department: false,
    manager: false,
    subnode: false,
    worker: false,
    team: false,
    intern: false,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [filterPanelIsOpen, setFilterPanelIsOpen] = useState(false);

  const toggleFilter = (filter) => {
    setFilters((prevFilters) => {
      if (filter === 'all') {
        return { all: true, department: false, manager: false, subnode: false, worker: false, team: false, intern: false };
      } else {
        return { ...prevFilters, [filter]: !prevFilters[filter], all: false };
      }
    });
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleNodeClick = (params, networkInstance) => {
    if (params.nodes.length === 1) {
      const nodeId = params.nodes[0];
      const nodePosition = networkInstance.getPositions([nodeId])[nodeId];

      const allNodes = nodesRef.current.get();
      const allEdges = edgesRef.current.get();

      const childNodes = getAllChildNodes(nodeId, edgesRef);

      const updatedNodes = allNodes.map(node => ({
        ...node,
        opacity: node.id === nodeId || childNodes.includes(node.id) ? 1 : 0.1,
        font: {
          color: node.id === nodeId || childNodes.includes(node.id) ? '#ffffff' : 'rgba(255, 255, 255, 0.1)'
        }
      }));

      const updatedEdges = allEdges.map(edge => ({
        ...edge,
        color: {
          color: '#848484',
          opacity: childNodes.includes(edge.to) ? 1 : 0.1
        }
      }));

      nodesRef.current.update(updatedNodes);
      edgesRef.current.update(updatedEdges);

      setSelectedNode(allNodes.find(node => node.id === nodeId));
      networkInstance.moveTo({
        position: { x: nodePosition.x, y: nodePosition.y },
        scale: networkInstance.getScale(),
        animation: {
          duration: 1000,
          easingFunction: 'easeInOutQuad'
        }
      });

      setTimeout(() => {
        openModal();
      }, 500);
    } else {
      toggleFilter('all'); // Show all nodes and edges
    }
  };

  useEffect(() => {
    const networkInstance = initializeNetwork(graphRef, nodesRef, edgesRef, networkRef, handleNodeClick);
    networkRef.current = networkInstance;
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (networkRef.current) {
      const allNodes = nodesRef.current.get();
      const allEdges = edgesRef.current.get();

      const activeFilters = Object.keys(filters).filter(filter => filters[filter]);

      const filteredNodes = allNodes.map(node => {
        const matchesType = filters.all || activeFilters.includes(node.type);
        const matchesSearch = searchQuery === '' || node.label.toLowerCase().includes(searchQuery.toLowerCase());
        return {
          ...node,
          opacity: matchesType && matchesSearch ? 1 : 0.1,
          font: {
            color: matchesType && matchesSearch ? '#ffffff' : 'rgba(255, 255, 255, 0.1)'
          }
        };
      });

      const updatedEdges = allEdges.map(edge => {
        const fromNodeGroup = allNodes.find(node => node.id === edge.from).group;
        const toNodeGroup = allNodes.find(node => node.id === edge.to).group;
        const fromNodeMatches = filters.all || activeFilters.includes(fromNodeGroup);
        const toNodeMatches = filters.all || activeFilters.includes(toNodeGroup);
        const edgeOpacity = fromNodeMatches && toNodeMatches ? 1 : 0.1;
        return {
          ...edge,
          color: {
            color: '#848484',
            opacity: edgeOpacity
          }
        };
      });

      nodesRef.current.update(filteredNodes);
      edgesRef.current.update(updatedEdges);

      networkRef.current.redraw();
    }
  }, [filters, searchQuery]);

  const toggleFilterPanel = () => {
    setFilterPanelIsOpen(!filterPanelIsOpen);
  };

  return (
    <div className="flex flex-col h-[100dvh]">
      <div className="flex items-center p-4 bg-slate-800 z-50">
        <SearchInput searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
        <button
          className={`ml-4 p-2 bg-slate-800 transition text-white/80 rounded-full border border-white/20 ${filterPanelIsOpen && 'bg-white'}`}
          onClick={toggleFilterPanel}
        >
          {/* {filterPanelIsOpen ? 'Filters' : 'Filters'} */}
            <img src="/assets/icons/filter1.svg" alt="Search" className={`h-5 w-5 opacity-80 transition ${filterPanelIsOpen && 'invert'}`} />

        </button>
      </div>
      <AnimatePresence>
        {filterPanelIsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="absolute z-40 top-16 w-full flex justify-center"
          >
            <FilterPanel
              filters={filters}
              toggleFilter={toggleFilter}
              isOpen={filterPanelIsOpen}
              toggleMenu={toggleFilterPanel}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div ref={graphRef} className="flex-1 bg-gradient-to-tl from-neutral-950 to-slate-900" />

      <AnimatePresence>
        {modalIsOpen && (
          <NodeModal
            selectedNode={selectedNode}
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GraphView;
