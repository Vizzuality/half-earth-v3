import React from 'react';
import ReactMarkdown from 'react-markdown';

import { useT } from '@transifex/react';

import cx from 'classnames';

import styles from './styles.module.scss';

function Component({
  theme,
  sources,
  className,
  metaDataSources,
  isJSX = false,
}) {
  const t = useT();

  const lastSource = sources && sources.length - 1;
  const isMultiSource = sources && sources.length > 1;
  return (
    <section className={className}>
      {metaDataSources && (
        <cite
          className={cx(styles.metadataSource, {
            [styles.light]: theme === 'light',
          })}
        >
          {!isJSX && (
            <ReactMarkdown
              renderers={{
                link: ({ href, children }) => (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {children[0].props.children}
                  </a>
                ),
              }}
            >
              {`${t('Source:')} ${metaDataSources}`}
            </ReactMarkdown>
          )}
          {isJSX && (
            <span>
              {t('Source: ')}
              {metaDataSources}
            </span>
          )}
        </cite>
      )}
      {sources && (
        <span className={styles.sourcesWrapper}>
          {t('Source:')}{' '}
          {sources.map((source, index) => (
            <>
              {isMultiSource && index === lastSource && <span> and </span>}
              <cite className={styles.source}>{`${source.label}`}</cite>
              {index !== lastSource && <span>, </span>}
              {index === lastSource && <span>.</span>}
            </>
          ))}
        </span>
      )}
    </section>
  );
}

export default Component;
