import { HERO_BG_IMAGE } from '../constants';

export const BRAND = {
  red: '#aa4b5f',
  redLight: '#fb7185',
  redDeep: '#6d3d49',
  pink: '#db2777',
  pinkLight: '#f472b6',
  gradient: 'linear-gradient(135deg, #864153 0%, #e11d48 55%, #ff5d8f 100%)',
  gradientText: 'linear-gradient(90deg, #ff4d6d, #ff8fb1)',
  gradientTextOnDark: 'linear-gradient(90deg, #ff9db4, #ffd0de)',
  heroOverlay:
    'linear-gradient(105deg, rgba(40,4,16,.93) 0%, rgba(140,12,48,.72) 50%, rgba(197, 175, 183, 0.55) 100%)',
  scrim: 'rgba(24,6,12,.62)',
  scrimStrong: 'rgba(24,6,12,.88)',
  fallbackBg: '#3b0a1a',
};

export const heroBackgroundSx = (overlay = BRAND.heroOverlay) => ({
  backgroundColor: BRAND.fallbackBg, 
  backgroundImage: `${overlay}, url("${HERO_BG_IMAGE}")`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
});
