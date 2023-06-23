import React from 'react';

import { useT } from '@transifex/react';

import { AnimatePresence, motion } from 'framer-motion';

import Button from 'components/button';

import styles from './styles.module.scss';

import type { CookiesProps } from './types';

function Cookies({ open, onAccept, onReject }: CookiesProps) {
  const t = useT();
  return (
    <AnimatePresence>
      {open && (
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
            className={styles.cookies}
          >
            <div className={styles.bannerContainer}>
              <p>
                This website uses cookies to ensure you get the best experience
                on our website. Read our{' '}
                <a
                  href="https://eowilsonfoundation.org/privacy-policy/"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.link}
                >
                  privacy policy
                </a>{' '}
                to know more.
              </p>
              <div className={styles.actions}>
                <Button
                  type="rectangular"
                  handleClick={onReject}
                  label={t('Deny')}
                  className={styles.button}
                />
                <Button
                  type="rectangular-primary"
                  handleClick={onAccept}
                  label={t('Accept')}
                  className={styles.button}
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default Cookies;
