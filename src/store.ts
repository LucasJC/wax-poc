import { readable, Subscriber, writable } from 'svelte/store';
import { getAlcorPrice, getWaxPriceInUSD } from './integration';
import { ALCOR_MARKET } from './types';

export const account = writable("");

export const miningPower = writable(0.0);

export const waxPrice = readable(0.0, function start(set) {
  getWaxPriceInUSD().then(wp => set(wp.wax.usd));
});

export const aetherPrice = readable(0.0, function start(set) {
  return setAlcorPriceWithInterval(ALCOR_MARKET.AETHER, set);
});

export const wecanPrice = readable(0.0, function start(set) {
  return setAlcorPriceWithInterval(ALCOR_MARKET.WECAN, set);
});

export const caponPrice = readable(0.0, function start(set) {
  return setAlcorPriceWithInterval(ALCOR_MARKET.CAPON, set);
});

export const waxonPrice = readable(0.0, function start(set) {
  return setAlcorPriceWithInterval(ALCOR_MARKET.WAXON, set);
});

export const eneftPrice = readable(0.0, function start(set) {
  return setAlcorPriceWithInterval(ALCOR_MARKET.ENEFT, set);
});

function setAlcorPriceWithInterval(market: ALCOR_MARKET, set: Subscriber<number>, frequence: number = 10000)  {
  getAlcorPrice(market).then(ap => set(ap.last_price));
  const interval = setInterval(() => {
    getAlcorPrice(market).then(ap => set(ap.last_price));
  }, frequence);
  return function stop() {
    clearInterval(interval);
  };
}