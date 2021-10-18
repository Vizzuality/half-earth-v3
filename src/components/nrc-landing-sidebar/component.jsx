import React from 'react';
import styles from './styles.module.scss';
import SidebarLegend from 'components/sidebar-legend';

const Component = () => (
  <div className={styles.container}>
    <p className={styles.title}>National Report Cards</p>
    <p className={styles.body}>The Species Protection Index reflects the average amount of area-based conservation targets met across all endemic species within a given country in a given year, weighted by a country's stewardship. Strategic and targeted protection of species habitat will generally result in a country's SPI increasing, but once a country meets an individual species' target, subsequent additional protection of habitat will not increase the country's SPI. Likewise, any protection of land that does not also protect species habitat will not increase a country's SPI.
</p>
<p className={styles.legendTitle}>National Species Protection Index</p>
  <SidebarLegend 
    className={styles.legend}
    legendItem='spi'
  />
  </div>
)

export default Component;