import FacebookIcon  from 'icons/facebook.svg?react';
import InstagramIcon  from 'icons/instagram.svg?react';
import MailIcon  from 'icons/mail.svg?react';
import TwitterIcon  from 'icons/twitter.svg?react';

const facebook = {
  projectLink: 'https://www.facebook.com/halfearth/',
  sharePath: 'https://www.facebook.com/sharer/sharer.php?u=',
  icon: FacebookIcon,
  alt: 'Facebook',
};

const twitter = {
  projectLink: 'https://twitter.com/EOWilsonFndtn',
  sharePath: 'https://twitter.com/intent/tweet?url=',
  icon: TwitterIcon,
  alt: 'Twitter',
};

const mail = {
  projectLink: null,
  sharePath: 'mailto:?body=',
  icon: MailIcon,
  alt: 'Email',
};

const instagram = {
  projectLink: 'https://www.instagram.com/thehalfearthproject',
  sharePath: null,
  icon: InstagramIcon,
  alt: 'Instagram',
};

export const joinConversationSocialMedia = [facebook, twitter, instagram];

export const shareSocialMedia = [facebook, twitter, mail];
