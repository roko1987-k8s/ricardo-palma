import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE = __ENV.BASE || 'https://kubefest-137705938574.us-west1.run.app';
const PLAYERS = Number(__ENV.PLAYERS || 10);
const HITS_PER_PLAYER = Number(__ENV.HITS_PER_PLAYER || 200);

export const options = {
  scenarios: {
    players: {
      executor: 'per-vu-iterations',
      vus: PLAYERS,
      iterations: 1,
      maxDuration: '90s',
    },

    host: {
      executor: 'shared-iterations',
      vus: 1,
      iterations: 1,
      startTime: '10s',
      exec: 'host',
    },
  },
};

export function setup() {

  console.log('======================================');
  console.log('🔥 KUBEFEST LOAD TEST');
  console.log('======================================');
  console.log('PLAYERS: ' + PLAYERS);
  console.log('HITS:    ' + HITS_PER_PLAYER);
  console.log('======================================');

  const reset = http.post(BASE + '/api/reset');

  if (reset.status !== 200) {
    throw new Error(
      'RESET FAILED: HTTP ' + reset.status
    );
  }

  console.log('✅ RESET OK');
}

export function host() {

  console.log('🔥 HOST STARTING');

  const start = http.post(BASE + '/api/start');

  check(start, {
    'start OK': r => r.status === 200,
  });

  console.log(
    '🚀 START HTTP ' + start.status
  );
}

export default function () {

  // ============================================
  // JOIN
  // ============================================

  const join = http.post(
    BASE + '/api/join',
    JSON.stringify({
      name: 'K6-' + __VU,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (join.status !== 200) {

    console.log(
      '[VU ' + __VU +
      '] ❌ JOIN HTTP ' +
      join.status
    );

    return;
  }

  const player = join.json();

  console.log(
    '[VU ' + __VU +
    '] ✅ PLAYER ' +
    player.id
  );


  // ============================================
  // WAIT FOR HOST
  // ============================================

  sleep(11);


  // ============================================
  // HITS
  // ============================================

  let accepted = 0;
  let rejected = 0;

  for (
    let i = 0;
    i < HITS_PER_PLAYER;
    i++
  ) {

    const score = http.post(
      BASE +
      '/api/score?id=' +
      encodeURIComponent(player.id)
    );

    if (score.status !== 200) {

      rejected++;

    } else {

      const result = score.json();

      if (result.accepted === true) {
        accepted++;
      } else {
        rejected++;
      }
    }
  }


  console.log(
    '[VU ' + __VU +
    '] 🏁 ' +
    'hits=' + HITS_PER_PLAYER +
    ' accepted=' + accepted +
    ' rejected=' + rejected
  );
}
