import { useEffect, useState } from 'react';

import { useT } from '@transifex/react';

import { AnimatePresence, motion } from 'framer-motion';

import Button from 'components/button';

import styles from './styles.module.scss';
import cx from 'classnames';

import MegaphoneIcon from 'icons/megaphone.svg?react';
import ExternalLinkIcon from 'icons/external_link.svg?react';
import CloseIcon from 'icons/close.svg?react';
import {  FEATURED } from 'router';

const DISMISS_HE_BANNER = 'HE_VIEW_STORY_BANNER';
const DISMISS_TTL_DAYS = 30;


function setDismissed(value: string, days: number) {
  const expiresAt = Date.now() + days * 24 * 60 * 60 * 1000;
  const data = { value, expiresAt };
  localStorage.setItem(DISMISS_HE_BANNER, JSON.stringify(data));
}

function getDismissed(): string | null {
  const raw = localStorage.getItem(DISMISS_HE_BANNER);
  if (!raw) return null;
  try {
    const { value, expiresAt } = JSON.parse(raw);
    if (Date.now() > expiresAt) {
      localStorage.removeItem(DISMISS_HE_BANNER); 
      return null;
    }
    return value;
  } catch {
    localStorage.removeItem(DISMISS_HE_BANNER); 
    return null;
  }
}

function Banner({ browsePage }: { browsePage: (arg: { type: string }) => void }) {
  const [isOpen, setOpen] = useState(false);
  const t = useT();

useEffect(() => {
  const dismissed = getDismissed();
  const isVisible = dismissed !== 'true';
  setOpen(isVisible);
}, []);

const handleClose = () => {
  setDismissed('true', DISMISS_TTL_DAYS);
  setOpen(false);
};

const handleClickStoryView = () => {
  browsePage({ type: FEATURED });
};
  
  return (
    isOpen && <AnimatePresence>
      <div>
        <motion.div
          initial={{
            opacity: 0,
            y: '100%',
          }}
          animate={{
            opacity: 1,
            y: '0%',
            transition: {
              delay: 0.5,
            },
          }}
          exit={{
            opacity: 0,
            y: '100%',
            transition: {
              delay: 0,
            },
          }}
          className={styles.banner}
        >
          <div className={styles.bannerContainer}>
            <Button
              type="icon"
              handleClick={() => console.log("openNRCInNewTab")}
              label={t('')}
              Icon={MegaphoneIcon}
            />
            <span className={styles.bannerHeading}>{t('HALF-EARTH NEWS:')}</span>
            <span className={styles.bannerText}>{t('Dive into the latest Species Protection Index 2025 Report with our in-depth analysis.')}</span>
          </div>
          <div className={styles.actions}>
            <Button
              type="rectangular-primary"
              Icon={ExternalLinkIcon}
              handleClick={handleClickStoryView}
              label={t('View story')}
              className={cx(styles.button, styles.buttonItems)}
            />
          <motion.div
            onClick={handleClose}
            className={styles.closeIcon}        
            whileHover={{
              rotate: 180,
              color: '#18BAB4',                  
              transition: { duration: 0.2, ease: 'circInOut' },
            }}
            role="button"
            aria-label="Close banner"
          >
            <CloseIcon className={styles.closeIconSvg} />  
          </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default Banner;
