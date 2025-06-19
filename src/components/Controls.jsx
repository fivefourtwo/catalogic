import React from 'react';
import { VISUALIZATION_MODES, HIGHLIGHT_COLOR, LASSO_COLOR } from '../utils/constants.js';

const Controls = ({
  visualizationMode,
  onVisualizationModeChange,
  isLassoMode,
  onLassoToggle,
  isShiftPressed,
  searchQuery,
  onSearchChange,
  searchSuggestions,
  onSuggestionClick,
  showSuggestions,
  selectedSuggestionIndex,
  onKeyDown,
  filterLogicMode,
  onToggleFilterLogicMode,
  highlightThreshold,
  onHighlightThresholdChange,
  activeTab,
  // Transition mode props
  transitionMode,
  onTransitionModeToggle,
  startTrack,
  endTrack,
  transitionPath,
  pathCompatibilityScores,
  onClearTransition
}) => {
  return (
    <div className="controls-container" style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div className="search-controls" style={{ position: 'absolute', top: 0, right: 0, marginBottom: 10 }}>
        <div className="search-input-container" style={{ position: 'relative', width: '400px' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={onSearchChange}
            onKeyDown={onKeyDown}
            placeholder="Search by title, filename, artist, album, genre, or key..."
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid #4a4a4a',
              backgroundColor: '#2a2a2a',
              color: '#e0e0e0',
              fontSize: '14px'
            }}
          />
          {showSuggestions && searchSuggestions.length > 0 && (
            <div 
              className="search-suggestions"
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: '#2a2a2a',
                border: '1px solid #4a4a4a',
                borderTop: 'none',
                borderRadius: '0 0 4px 4px',
                maxHeight: '200px',
                overflowY: 'auto',
                zIndex: 1000
              }}
            >
              {searchSuggestions.map((suggestion, index) => (
                <div
                  key={suggestion}
                  onClick={() => onSuggestionClick(suggestion)}
                  style={{
                    padding: '8px 12px',
                    cursor: 'pointer',
                    backgroundColor: index === selectedSuggestionIndex ? '#4a4a4a' : 'transparent',
                    color: '#e0e0e0',
                    borderBottom: index < searchSuggestions.length - 1 ? '1px solid #4a4a4a' : 'none'
                  }}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="visualization-mode-toggle" 
           style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
        <button
          style={{
            backgroundColor: visualizationMode === VISUALIZATION_MODES.SIMILARITY ? HIGHLIGHT_COLOR : '#232323',
            color: visualizationMode === VISUALIZATION_MODES.SIMILARITY ? '#fff' : '#b0b0b0',
            border: `1.5px solid ${HIGHLIGHT_COLOR}`,
            borderRadius: 6,
            padding: '4px 14px',
            fontWeight: 500,
            cursor: 'pointer',
            fontSize: '1em',
          }}
          onClick={() => onVisualizationModeChange(VISUALIZATION_MODES.SIMILARITY)}
        >
          Similarity
        </button>
        <button
          style={{
            backgroundColor: visualizationMode === VISUALIZATION_MODES.XY ? HIGHLIGHT_COLOR : '#232323',
            color: visualizationMode === VISUALIZATION_MODES.XY ? '#fff' : '#b0b0b0',
            border: `1.5px solid ${HIGHLIGHT_COLOR}`,
            borderRadius: 6,
            padding: '4px 14px',
            fontWeight: 500,
            cursor: 'pointer',
            fontSize: '1em',
          }}
          onClick={() => onVisualizationModeChange(VISUALIZATION_MODES.XY)}
        >
          X/Y
        </button>
        <button
          style={{
            backgroundColor: isLassoMode ? LASSO_COLOR : '#232323',
            color: isLassoMode ? '#fff' : '#b0b0b0',
            border: `1.5px solid ${LASSO_COLOR}`,
            borderRadius: 6,
            padding: '4px 14px',
            fontWeight: 500,
            cursor: 'pointer',
            fontSize: '1em',
          }}
          onClick={onLassoToggle}
        >
          Lasso Select {isShiftPressed ? '(Active)' : '(Shift + Drag)'}
        </button>
        <button
          style={{
            backgroundColor: transitionMode ? '#FF6B35' : '#232323',
            color: transitionMode ? '#fff' : '#b0b0b0',
            border: `1.5px solid #FF6B35`,
            borderRadius: 6,
            padding: '4px 14px',
            fontWeight: 500,
            cursor: 'pointer',
            fontSize: '1em',
          }}
          onClick={onTransitionModeToggle}
        >
          🎛️ Transition Mode
        </button>
      </div>

      {/* Transition Mode Status Panel */}
      {transitionMode && (
        <div className="transition-status-panel" style={{
          backgroundColor: '#2a2a2a',
          border: '1px solid #FF6B35',
          borderRadius: 6,
          padding: 12,
          marginBottom: 10,
          color: '#e0e0e0'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <h4 style={{ margin: 0, color: '#FF6B35', fontSize: '0.95rem' }}>
              🎛️ Transition Path Finder
            </h4>
            {onClearTransition && (startTrack || endTrack) && (
              <button
                onClick={onClearTransition}
                style={{
                  background: 'transparent',
                  border: '1px solid #666',
                  color: '#b0b0b0',
                  borderRadius: 3,
                  padding: '4px 8px',
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                Clear
              </button>
            )}
          </div>
          
          <div style={{ fontSize: '0.85rem', lineHeight: 1.4 }}>
            {!startTrack && !endTrack ? (
              <div>
                <strong>Step 1:</strong> Click a track to set as <span style={{ color: '#4CAF50' }}>START</span>
                <br />
                <strong>Step 2:</strong> Click another track to set as <span style={{ color: '#F44336' }}>END</span>
                <br />
                <small style={{ color: '#b0b0b0' }}>Algorithm will find the best transition path between genres/styles</small>
              </div>
            ) : startTrack && !endTrack ? (
              <div>
                <div><strong>START:</strong> <span style={{ color: '#4CAF50' }}>{startTrack.title}</span></div>
                <div style={{ marginTop: 4, color: '#b0b0b0' }}>
                  Now click another track to set as END and calculate path...
                </div>
              </div>
            ) : startTrack && endTrack ? (
              <div>
                <div><strong>START:</strong> <span style={{ color: '#4CAF50' }}>{startTrack.title}</span></div>
                <div><strong>END:</strong> <span style={{ color: '#F44336' }}>{endTrack.title}</span></div>
                {transitionPath && transitionPath.length > 0 && (
                  <div style={{ marginTop: 4, color: '#b0b0b0' }}>
                    <strong>Path found:</strong> {transitionPath.length} tracks
                    {pathCompatibilityScores && pathCompatibilityScores.length > 0 && (
                      <span style={{ marginLeft: 8 }}>
                        (Avg compatibility: {(pathCompatibilityScores.reduce((a, b) => a + b, 0) / pathCompatibilityScores.length * 100).toFixed(0)}%)
                      </span>
                    )}
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      )}

      {activeTab === 'Map' && !transitionMode && (
        <div className="FilterPanelActions" style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
          <button 
            onClick={onToggleFilterLogicMode} 
            className="FilterLogicButton"
            style={{
              backgroundColor: '#232323',
              color: '#b0b0b0',
              border: '1px solid #4a4a4a',
              borderRadius: 4,
              padding: '6px 12px',
              fontWeight: 500,
              cursor: 'pointer',
              fontSize: '0.9em',
            }}
          >
            Match: {filterLogicMode === 'intersection' ? 'All Categories (AND)' : 'Any Tag (OR)'}
          </button>
          <div className="confidence-slider" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label 
              htmlFor="highlightThreshold" 
              style={{ 
                minWidth: 110, 
                display: 'inline-block',
                color: '#e0e0e0',
                fontSize: '0.9em'
              }}
            >
              Confidence: {highlightThreshold.toFixed(2)}
            </label>
            <input
              id="highlightThreshold"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={highlightThreshold}
              onChange={e => onHighlightThresholdChange(Number(e.target.value))}
              className="confidence-input"
              style={{
                width: '120px'
              }}
            />
          </div>
        </div>
      )}
      
      {/* Show confidence slider in transition mode for X/Y mode threshold control */}
      {transitionMode && visualizationMode === VISUALIZATION_MODES.XY && (
        <div className="transition-xy-controls" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: 10,
          padding: '8px 12px',
          backgroundColor: '#232323',
          borderRadius: 4,
          border: '1px solid #4a4a4a'
        }}>
          <div className="confidence-slider" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label 
              htmlFor="transitionThreshold" 
              style={{ 
                minWidth: 140, 
                display: 'inline-block',
                color: '#e0e0e0',
                fontSize: '0.9em'
              }}
            >
              X/Y Confidence: {highlightThreshold.toFixed(2)}
            </label>
            <input
              id="transitionThreshold"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={highlightThreshold}
              onChange={e => onHighlightThresholdChange(Number(e.target.value))}
              className="confidence-input"
              style={{
                width: '120px'
              }}
            />
          </div>
        </div>
      )}


    </div>
  );
};

export default Controls; 