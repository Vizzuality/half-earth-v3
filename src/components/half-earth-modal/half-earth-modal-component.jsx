import React, { useState } from 'react';
import useEventListener from 'hooks/use-event-listener';
import { ReactComponent as HalfEarthGlobe } from 'images/halfEarthGlobe.svg';

import styles from './half-earth-modal-styles.module.scss';

const loremIpsumDesription = 'Lorem ipsum dolor amet knausgaard ugh humblebrag letterpress waistcoat kogi. Affogato pug vexillologist kickstarter tofu, copper mug disrupt artisan direct trade lo-fi biodiesel. Viral ethical copper mug, subway tile migas vexillologist microdosing. Man braid shaman ramps, activated charcoal thundercats 8-bit man bun forage vape poke asymmetrical roof party celiac everyday carry. Typewriter drinking vinegar hammock 3 wolf moon keffiyeh. Shabby chic cray scenester pickled YOLO yr. Fingerstache franzen tousled synth hella plaid echo park, kickstarter unicorn glossier la croix lomo. Hexagon tumblr gastropub +1 church-key portland, meditation drinking vinegar meggings microdosing af.Bespoke cloud bread fingerstache, enamel pin cardigan +1 kickstarter fixie franzen normcore. Prism ethical typewriter cray you probably havent heard of them keytar, pickled DIY ramps green juice tofu listicle knausgaard before they sold out vice. Heirloom cornhole thundercats, mixtape yuccie microdosing tbh street art gastropub. Butcher neutra etsy, affogato irony synth health goth typewriter shaman.Stumptown food truck craft beer, polaroid lumbersexual migas scenester post-ironic blue bottle wolf whatever. Forage sartorial cardigan +1 ugh, fashion axe church-key 90s biodiesel umami literally bespoke wolf franzen gastropub. Hammock activated charcoal 3 wolf moon meggings. Jean shorts YOLO neutra glossier 90s, gentrify echo park single-origin coffee vinyl succulents. Before they sold out taxidermy readymade keffiyeh cray wag edison bulb vaporware vape woke freegan unicorn pabst franzen fam pok pok forage. Woke lumbersexual neutra, small batch literally cornhole affogato you probably havent heard of them craft beer twee chartreuse slow-carb tumeric unicorn. Sartorial tumeric mumblecore messenger bag 3 wolf moon PBR&B echo park, occupy umami. Disrupt snackwave flannel master cleanse hot chicken. DIY biodiesel poutine occupy sriracha venmo man bun enamel pin tousled PBR&B you probably havent heard of them hammock narwhal everyday carry direct trade.';
'Air plant yr marfa, semiotics kogi everyday carry kinfolk tacos XOXO franzen godard poke normcore. Green juice synth cliche, etsy wolf actually man bun tbh roof party narwhal butcher pickled selvage stumptown hexagon. Pork belly cred 3 wolf moon venmo street art, organic live-edge narwhal four loko whatever XOXO tumeric listicle hexagon. Live-edge palo santo keytar mlkshk wayfarers food truck artisan kitsch raw denim air plant. Cold-pressed pour-over irony church-key helvetica retro disrupt, vexillologist 3 wolf moon flannel.',
'Post-ironic fanny pack helvetica pork belly, chillwave hell of adaptogen prism lumbersexual mlkshk. Man bun readymade vice banjo. Kickstarter meggings pinterest stumptown 8-bit vape banjo scenester locavore cred keffiyeh actually slow-carb. Fashion axe tofu cred 90s, sustainable locavore vaporware pour-over fixie next level copper mug wayfarers kitsch. +1 before they sold out humblebrag, flannel franzen cred selfies fam authentic hella snackwave 8-bit street art. Knausgaard beard tumeric snackwave ennui. Mumblecore chillwave farm-to-table, lyft heirloom letterpress subway tile ennui distillery.',
'Readymade slow-carb swag pork belly, health goth cloud bread paleo enamel pin franzen roof party pop-up raw denim XOXO hammock cray. Health goth green juice cray, flexitarian four loko wolf lyft jean shorts humblebrag tofu direct trade jianbing authentic chicharrones palo santo. Synth retro lumbersexual kickstarter quinoa, kogi sustainable beard tumeric pug green juice copper mug. Offal narwhal adaptogen, vinyl literally live-edge cloud bread letterpress glossier messenger bag migas pok pok sriracha hot chicken. Coloring book pinterest normcore PBR&B, venmo activated charcoal gastropub gentrify.',
'Hashtag prism semiotics, DIY yuccie chia meditation forage tote bag church-key literally normcore jean shorts tumeric. Poke venmo before they sold out shoreditch. Normcore la croix banh mi taxidermy before they sold out green juice. Bespoke locavore whatever chia hashtag freegan swag knausgaard, kogi blog shabby chic. Shaman everyday carry iceland lomo shabby chic master cleanse organic narwhal fixie. Shoreditch scenester prism, four dollar toast wolf pabst heirloom post-ironic freegan YOLO tbh green juice palo santo.',
'Oh. You need a little dummy text for your mockup? How quaint.',
'I bet you’re still using Bootstrap too…';

const HalfEarthModalComponent = ({ handleModalClose }) => {
  const keyEscapeEventListener = (evt) => {
    evt = evt || window.event;
    if (evt.keyCode === 27)
      handleModalClose();
  };

  useEventListener('keydown', keyEscapeEventListener);

  return (
    <div className={styles.halfEarthModal}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h1>Monitoring Progress Toward the Goal of Half-Earth</h1>
          <div className={styles.description}>{loremIpsumDesription}</div>
        </div>
        <div className={styles.globeWrapper}>
          <HalfEarthGlobe className={styles.globe} />
        </div>
      </div>
    </div>
  );
}

export default HalfEarthModalComponent;