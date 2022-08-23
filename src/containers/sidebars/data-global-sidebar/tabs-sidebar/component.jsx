import React, { useState } from 'react';

import cx from 'classnames';

import Tabs from 'components/tabs';

import styles from './styles.module.scss';

import { getTabs } from './constants';

function TabsSidebarComponent({
  className,
  onboardingStep,
  onboardingType,

}) {
  const tabNames = getTabs();
  const [isOpen/* , setOpen */] = useState(false);
  const [activeTab, setActiveTab] = useState(tabNames[0].slug);

  console.log({ activeTab });

  const handleTabs = (tabSlug) => setActiveTab(tabSlug);

  return (
    <div className={cx(styles.sidebarCardContainer, className, {
      [styles.open]: isOpen,
      [styles.onboardingOverlay]:
          onboardingType === 'priority-places' && onboardingStep === 2,
    })}
    >
      <Tabs
        tabs={tabNames}
        onClick={handleTabs}
        className={styles.speciesTab}
        defaultTabSlug={tabNames[0].slug}
      />
    </div>
  );
}

export default TabsSidebarComponent;
