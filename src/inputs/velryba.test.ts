import assert from 'assert';
import { scraper } from './velryba.js';
import { successResponse, successResponseDate } from '../__tests__/velryba-responses.js';

describe('Prague / Kavarna Velryba', () => {
  it('is able to parse menu', () => {
    const result = scraper(successResponse, successResponseDate);
    assert.ok(result.includes(':whale: *Kavárna Velryba*'), 'contains heading');
    assert.ok(result.includes('Tomatová polévka s bazalkovým pestem \n39 Kč'), 'contains soup');
    const mainMeal = 'Medailonky \nz vepřové panenky se švestkovou omáčkou s bramborovým pyré\n135 Kč';
    assert.ok(result.includes(mainMeal), 'contains main meal');
    assert.ok(!result.includes('\nKč'), 'does not contain empty rows');
  });

  it('throws if menu is out of date', () => {
    assert.throws(
      () => scraper(successResponse, new Date("2000-01-01T00:00:00.000Z")),
      {
        name: 'Error',
        message: '_Today\'s daily menu was not published._'
      }
    );
  });

  it('throws if menu is in wrong format', () => {
    assert.throws(
      () => scraper('<html>Some invalid code'),
      {
        name: 'Error',
        message: '_Today\'s daily menu was not published._'
      }
    );
  });
});
