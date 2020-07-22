import React from 'react';
import PartnersTrigger from 'components/about';
import styles from './partners-card-styles.module.scss';

const PartnersCardComponent = () => {
  return (
    <div className={styles.container}>
      <section className={styles.partner}>
        <p className={styles.partnerField}>INITIATIVE BY:</p>
        <p className={styles.partnerName}>E.O Wilson Foundation</p>
      </section>
      <section className={styles.partner}>
        <p className={styles.partnerField}>BIODIVERSITY DATA BY:</p>
        <p className={styles.partnerName}>Map Of Life (Yale University)</p>
      </section>
      <section className={styles.partner}>
        <p className={styles.partnerField}>DEVELOPMENT BY:</p>
        <p className={styles.partnerName}>Vizzuality</p>
      </section>
      <section className={styles.partner}>
        <p className={styles.partnerField}>MAP TECHNOLOGY BY:</p>
        <p className={styles.partnerName}>Esri</p>
      </section>
      <PartnersTrigger className={styles.partnersButton} buttonTitle='See all partners'/>
    </div>
  )
}

export default PartnersCardComponent;