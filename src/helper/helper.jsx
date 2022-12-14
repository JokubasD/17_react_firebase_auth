/**
 *
 * @param {object} whatToSend
 * @param {string} url
 * @returns
 */

export async function sendRequest(whatToSend, url) {
  try {
    // test url
    console.log('url ===', url);
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(whatToSend),
    });
    if (!resp.ok) {
      throw await resp.json();
    }
    const result = await resp.json();
    // console.log('result ===', result);
    // viskas ivyko gerai
    return [result, null];
  } catch (error) {
    // console.warn('klaida sendRequest', error);
    return [null, error];
  }
}
/**
 * Transforms fireObj in object to an array
 * @param {object} fireObj
 * @returns [{id, data}]
 */
export function fireObjToArr(fireObj) {
  let dataArr = [];
  for (let key in fireObj) {
    dataArr.push({ ...fireObj[key], postId: key });
  }
  return dataArr;
}

export async function patchRequest(url, patchObject) {
  try {
    const resp = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(patchObject),
    });
    if (!resp.ok) {
      throw await resp.json();
    }
    const result = await resp.json();

    return [result, null];
  } catch (error) {
    return [null, error];
  }
}

export const getData = async (from) => {
  try {
    const resp = await fetch(from);
    return [await resp.json(), null];
  } catch (error) {
    return [null, error];
  }
};
