import { ReactComponent as FacebookIcon } from 'icons/facebook.svg';
import { ReactComponent as TwitterIcon } from 'icons/twitter.svg';
import { ReactComponent as MailIcon } from 'icons/mail.svg';
import { ReactComponent as InstagramIcon } from 'icons/instagram.svg';

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
