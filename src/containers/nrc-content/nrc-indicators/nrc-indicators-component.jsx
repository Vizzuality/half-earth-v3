/* eslint-disable camelcase */
import React from 'react';

import { T, useT, useLocale } from '@transifex/react';

import { getLocaleNumber } from 'utils/data-formatting-utils';

import cx from 'classnames';

import IndicatorCard from 'containers/nrc-content/nrc-indicators/indicator-card';

import { useMobile } from 'constants/responsive';

import COLORS from 'styles/settings';

import styles from './nrc-indicators-styles.module.scss';
import { getBarStyles } from './nrc-indicators-utils';

function Indicators({ countryData, landMarineSelection }) {
  const t = useT();
  const locale = useLocale();
  const {
    SPI_ter,
    SPI_mar,
    total_endemic_mar,
    total_endemic_ter,
    prop_protected_ter,
    prop_protected_mar,
    nspecies_ter,
    nspecies_mar,
    protection_needed_ter,
    protection_needed_mar,
    Global_SPI_ter,
    Global_SPI_mar,
    hm_vh_ter,
    hm_vh_mar,
    hm_ter,
    hm_mar,
  } = countryData || {};

  const land = landMarineSelection === 'land';
  const SPI = land ? SPI_ter : SPI_mar;
  const Global_SPI = land ? Global_SPI_ter : Global_SPI_mar;
  const total_endemic = land ? total_endemic_ter : total_endemic_mar;
  const prop_protected = land ? prop_protected_ter : prop_protected_mar;
  const nspecies = land ? nspecies_ter : nspecies_mar;
  const protection_needed = land
    ? protection_needed_ter
    : protection_needed_mar;
  const hm_vh = land ? hm_vh_ter : hm_vh_mar;
  const hm = land ? hm_ter : hm_mar;

  const isNumberOr0 = (value) => value === 0 || !!value;
  const isMobile = useMobile();

  return (
    <div
      className={cx(styles.indicatorCardsContainer, {
        [styles.mobile]: isMobile,
      })}
    >
      <IndicatorCard
        indicator={!!SPI || SPI === 0 ? getLocaleNumber(SPI, locale) : ''}
        description={
          <p>
            {land ? (
              <T _str="Land Species Protection Index (SPI)" />
            ) : (
              <T _str="Marine Species Protection Index (SPI)" />
            )}
          </p>
        }
        tooltipInfo={t(
          'The Species Protection Index (SPI) reflects the average amount of area-based conservation targets that have been met for all species within the country each year, weighted by a country`s stewardship of those species (the proportion of the species population present in that country).'
        )}
      >
        <div>
          <p className={styles.spiAverageText}>
            <T
              _str="{more} Global SPI average: {spiAverage}"
              _comment="> Global SPI average: 100"
              more=">"
              spiAverage={getLocaleNumber(Global_SPI, locale) || 0}
            />
          </p>
        </div>
      </IndicatorCard>
      <IndicatorCard
        color={COLORS.gold}
        indicator={total_endemic_ter && getLocaleNumber(total_endemic, locale)}
        description={
          <p>
            {nspecies &&
              (land ? (
                <T
                  _str="{bold} of a total of {totalEndemicNumber} land vertebrates"
                  _comment="8 are endemic land vertebrate species (of a total of) 10 land vertebrates"
                  bold={
                    <b>
                      <T
                        _str="are endemic vertebrate species"
                        _comment="8 {are endemic vertebrate species} land vertebrate species of a total of 10 land vertebrates"
                      />
                    </b>
                  }
                  totalEndemicNumber={getLocaleNumber(nspecies, locale)}
                />
              ) : (
                <T
                  _str="{bold} of a total of {totalEndemicNumber} marine vertebrates"
                  _comment="8 are endemic marine vertebrate species (of a total of) 10 marine vertebrates"
                  bold={
                    <b>
                      <T
                        _str="are endemic vertebrate species"
                        _comment="8 {are endemic vertebrate species} land vertebrate species of a total of 10 land vertebrates"
                      />
                    </b>
                  }
                  totalEndemicNumber={getLocaleNumber(nspecies, locale)}
                />
              ))}
          </p>
        }
        tooltipInfo={t(
          'Endemic species are species unique to the region. A high number of endemic species involves more effort and highly customized networks of protected places.'
        )}
      >
        <div
          className={styles.bar}
          style={{
            backgroundImage: getBarStyles({
              color1: COLORS.gold,
              value1: (total_endemic * 100) / nspecies,
            }),
          }}
        />
      </IndicatorCard>
      <IndicatorCard
        color={COLORS['protected-areas']}
        indicator={prop_protected && `${Math.round(prop_protected)}%`}
        description={
          <p>
            {isNumberOr0(protection_needed) && (
              <T
                _str="of {bold} and {needsProtectionNumber}% needs protection"
                _comment="10% (of) land is protected (and) 2% (needs protection)"
                bold={
                  <b>
                    {land ? (
                      <T
                        _str="land is protected"
                        _comment="10% of {land is protected} and 2% needs protection"
                      />
                    ) : (
                      <T
                        _str="marine area is protected"
                        _comment="10% of {marine area is protected} and 2% needs protection"
                      />
                    )}
                  </b>
                }
                needsProtectionNumber={getLocaleNumber(
                  protection_needed,
                  locale
                )}
              />
            )}
          </p>
        }
        tooltipInfo={t(
          'Regions that are recognized as currently being managed for long-term nature conservation. An increase of protected areas will result in an increase of the SPI, only if areas aid in achieving species protection targets.'
        )}
      >
        <div
          className={styles.bar}
          style={{
            backgroundImage: getBarStyles({
              color1: COLORS['protected-areas'],
              value1: prop_protected,
              color2: COLORS['protection-needed'],
              value2: prop_protected + protection_needed,
            }),
          }}
        />
      </IndicatorCard>

      {/* Very high human modification and some human modification up to zero cases */}
      {Math.round(hm_vh) !== 0 && Math.round(hm) !== 0 && (
        <IndicatorCard
          color={COLORS['high-modification']}
          indicator={`${Math.round(hm)}%`}
          description={
            <p>
              {land && (
                <T
                  _str="of land has {veryHighHumanModification} and {someModificationNumber}% has some modification"
                  _comment="27% { of } land has {very high human modification} and 10% has some modification"
                  veryHighHumanModification={
                    <b>
                      <T
                        _str="very high human modification"
                        _comment="27% of land has {very high human modification} and 10% has some modification"
                      />
                    </b>
                  }
                  someModificationNumber={Math.round(hm)}
                />
              )}
              {!land && (
                <T
                  _str="of marine area has {veryHighHumanModification} and {someModificationNumber}% has some modification"
                  _comment="27% { of } marine area has {very high human modification} and 10% has some modification"
                  veryHighHumanModification={
                    <b>
                      <T
                        _str="very high human modification"
                        _comment="27% of land has {very high human modification} and 10% has some modification"
                      />
                    </b>
                  }
                  someModificationNumber={Math.round(hm)}
                />
              )}
            </p>
          }
          tooltipInfo={t(
            'How much human encroachment occurs from urbanization and other economic activities. Some species are less tolerant than others to human disturbances.'
          )}
        >
          <div
            className={styles.bar}
            style={{
              backgroundImage: getBarStyles({
                color1: COLORS['high-modification'],
                value1: hm_vh,
                color2: COLORS['some-modification'],
                value2: hm,
              }),
            }}
          />
        </IndicatorCard>
      )}
      {/* Some human modification zero cases */}
      {Math.round(hm) === 0 && Math.round(hm_vh) !== 0 && (
        <IndicatorCard
          color={COLORS['high-modification']}
          indicator={`${Math.round(hm_vh)}%`}
          description={
            <p>
              {land && (
                <T
                  _str="of land has {veryHighModification}"
                  _comment="27% { of } land has {very high human modification}"
                  veryHighModification={
                    <b>
                      <T _str="very high human modification" />
                    </b>
                  }
                />
              )}

              {!land && (
                <T
                  _str="of marine area has {veryHighModification}"
                  _comment="27% { of } marine area has {very high human modification}"
                  veryHighModification={
                    <b>
                      <T _str="very high human modification" />
                    </b>
                  }
                />
              )}
            </p>
          }
          tooltipInfo={t(
            'How much human encroachment occurs from urbanization and other economic activities. Some species are less tolerant than others to human disturbances.'
          )}
        >
          <div
            className={styles.bar}
            style={{
              backgroundImage: getBarStyles({
                color1: COLORS['high-modification'],
                value1: hm_vh,
                color2: COLORS['some-modification'],
                value2: hm,
              }),
            }}
          />
        </IndicatorCard>
      )}
      {/* Very high human modification zero cases */}
      {Math.round(hm_vh) === 0 && Math.round(hm) !== 0 && (
        <IndicatorCard
          color={COLORS['high-modification']}
          indicator={`${Math.round(hm)}%`}
          description={
            <p>
              {land && (
                <T
                  _str="of land has {someModification}"
                  _comment="27% { of } land has {some human modification}"
                  someModification={
                    <b>
                      <T _str="some human modification" />
                    </b>
                  }
                />
              )}

              {!land && (
                <T
                  _str="of marine area has {someModification}"
                  _comment="27% { of } marine area has {some human modification}"
                  someModification={
                    <b>
                      <T _str="some human modification" />
                    </b>
                  }
                />
              )}
            </p>
          }
          tooltipInfo={t(
            'How much human encroachment occurs from urbanization and other economic activities. Some species are less tolerant than others to human disturbances.'
          )}
        >
          <div
            className={styles.bar}
            style={{
              backgroundImage: getBarStyles({
                color1: COLORS['high-modification'],
                value1: hm_vh,
                color2: COLORS['some-modification'],
                value2: hm,
              }),
            }}
          />
        </IndicatorCard>
      )}
    </div>
  );
}

export default Indicators;
