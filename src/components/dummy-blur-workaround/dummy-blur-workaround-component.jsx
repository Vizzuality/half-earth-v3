import styles from './dummy-blur-workaround-styles.module.scss';

function DummyBlurWorkaround() {
  return (
    <div className={styles.dummyBlurWorkaround}>
      {/* This supposes to fix blur background issue on mac OS */}
    </div>
  );
}

export default DummyBlurWorkaround;
