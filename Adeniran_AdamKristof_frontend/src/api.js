import { API_BASE_URL } from './config';

const withBase = (path) => `${API_BASE_URL}${path}`;

export async function readResponseError(response) {
  const text = await response.text();
  if (text) {
    return text;
  }
  return `HTTP ${response.status}`;
}

export async function fetchAllShips() {
  const response = await fetch(withBase('/api/Hajo/All'));
  if (!response.ok) {
    throw new Error(await readResponseError(response));
  }
  return response.json();
}

export async function fetchShipByName(name) {
  const response = await fetch(withBase(`/api/Hajo/ByName/${encodeURIComponent(name)}`));
  if (!response.ok) {
    throw new Error(await readResponseError(response));
  }
  return response.json();
}

export async function fetchBattleParticipants(battleName) {
  const response = await fetch(
    withBase(`/api/Csata/Resztvevok/${encodeURIComponent(battleName)}`)
  );

  if (response.status === 204) {
    return [];
  }

  if (!response.ok) {
    throw new Error(await readResponseError(response));
  }

  return response.json();
}

export async function deleteBattleResult(battleName, shipName) {
  const response = await fetch(
    withBase(
      `/api/Kimenet/KimenetTorles/${encodeURIComponent(battleName)}/${encodeURIComponent(shipName)}`
    ),
    { method: 'DELETE' }
  );

  if (!response.ok) {
    throw new Error(await readResponseError(response));
  }
}
