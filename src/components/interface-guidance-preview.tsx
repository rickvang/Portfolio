export function InterfaceGuidancePreview() {
  return (
    <div className="practice-board" aria-label="Illustrative interface guidance: layout, density and foundations">
      <div className="board-head">
        <span>Interface guidance</span><span aria-hidden="true">↗</span>
      </div>
      <div className="board-layout">
        <div className="mini-nav"><i /><i /><i /></div>
        <div>
          <b>Layout</b>
          <div className="mini-columns"><i /><i /></div>
          <div className="mini-line" />
          <div className="mini-line short" />
        </div>
      </div>
      <div className="board-bottom">
        <div><b>Density</b><i /><i /><i /></div>
        <div>
          <b>Foundations</b>
          <div className="swatches"><i /><i /><i /></div><span>Aa</span>
        </div>
      </div>
    </div>
  );
}
