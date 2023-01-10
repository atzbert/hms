import {
  HackathonData,
  makeHackathon,
} from '../repository/domain/hackathon-maker';
import HackathonPreviewResponse from '../../src/rest/Hackathon/HackathonPreviewResponse';

describe('Compare', () => {
  test('All values different', () => {
    const a = HackathonPreviewResponse.from(
      makeHackathon({
        title: 'a',
        startDate: new Date(0),
        endDate: new Date(Math.random()),
      } as HackathonData),
    );
    const b = HackathonPreviewResponse.from(
      makeHackathon({
        title: 'b',
        startDate: new Date(1),
        endDate: new Date(Math.random()),
      } as HackathonData),
    );

    expect(HackathonPreviewResponse.compare(a, b)).toBeLessThan(0);
    expect(HackathonPreviewResponse.compare(b, a)).toBeGreaterThan(0);
  });

  test('Same titles', () => {
    const a = HackathonPreviewResponse.from(
      makeHackathon({
        title: 'a',
        startDate: new Date(0),
        endDate: new Date(Math.random()),
      } as HackathonData),
    );
    const b = HackathonPreviewResponse.from(
      makeHackathon({
        title: 'a',
        startDate: new Date(1),
        endDate: new Date(Math.random()),
      } as HackathonData),
    );

    expect(HackathonPreviewResponse.compare(a, b)).toBeLessThan(0);
    expect(HackathonPreviewResponse.compare(b, a)).toBeGreaterThan(0);
  });

  test('Same titles, start dates', () => {
    const a = HackathonPreviewResponse.from(
      makeHackathon({
        title: 'a',
        startDate: new Date(0),
        endDate: new Date(2),
      } as HackathonData),
    );
    const b = HackathonPreviewResponse.from(
      makeHackathon({
        title: 'a',
        startDate: new Date(0),
        endDate: new Date(3),
      } as HackathonData),
    );

    expect(HackathonPreviewResponse.compare(a, b)).toBeLessThan(0);
    expect(HackathonPreviewResponse.compare(b, a)).toBeGreaterThan(0);
  });

  test('Same titles, start dates, end dates', () => {
    const a = HackathonPreviewResponse.from(
      makeHackathon({
        id: 'a',
        title: 'a',
        startDate: new Date(0),
        endDate: new Date(2),
      } as HackathonData),
    );
    const b = HackathonPreviewResponse.from(
      makeHackathon({
        id: 'b',
        title: 'a',
        startDate: new Date(0),
        endDate: new Date(2),
      } as HackathonData),
    );

    expect(HackathonPreviewResponse.compare(a, b)).toBeLessThan(0);
    expect(HackathonPreviewResponse.compare(b, a)).toBeGreaterThan(0);
  });

  test('All values same', () => {
    const a = HackathonPreviewResponse.from(
      makeHackathon({
        id: 'a',
        title: 'a',
        startDate: new Date(0),
        endDate: new Date(2),
      } as HackathonData),
    );
    const b = HackathonPreviewResponse.from(
      makeHackathon({
        id: 'a',
        title: 'a',
        startDate: new Date(0),
        endDate: new Date(2),
      } as HackathonData),
    );

    expect(HackathonPreviewResponse.compare(a, b)).toBe(0);
    expect(HackathonPreviewResponse.compare(b, a)).toBe(0);
  });
});
