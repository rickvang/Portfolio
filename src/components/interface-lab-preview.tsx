import styles from "./interface-lab-preview.module.css";

export function InterfaceLabPreview() {
  return (
    <div
      className={styles.preview}
      role="img"
      aria-label="Illustration of UI foundations and a create-project form with a saved state."
    >
      <div className={styles.foundation} aria-hidden="true">
        <span className={styles.type}>Aa</span>
        <div className={styles.swatches}><i /><i /><i /></div>
        <span className={styles.foundationLabel}>Foundations</span>
      </div>
      <div className={styles.form} aria-hidden="true">
        <div className={styles.formTop}><span>UI SYSTEMS LAB</span><span>FORM PATTERN</span></div>
        <strong className={styles.formTitle}>Project</strong>
        <span className={styles.fieldLabel}>Project name</span>
        <div className={styles.field}>Studio</div>
        <span className={styles.fieldLabel}>Description</span>
        <div className={styles.field}><span className={styles.fieldLine} /></div>
        <span className={styles.save}>Save</span>
      </div>
      <div className={styles.saved} aria-hidden="true"><span>✓</span> Saved</div>
    </div>
  );
}
