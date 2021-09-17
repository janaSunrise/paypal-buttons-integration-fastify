async function prettyPrint(jsonData, pre = '') {
  let pretty = '';

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  for (let key in jsonData) {
    if (jsonData.hasOwnProperty(key)) {
      if (isNaN(key)) pretty += pre + capitalize(key) + ': ';
      else pretty += pre + (parseInt(key) + 1) + ': ';

      if (typeof jsonData[key] === 'object') {
        pretty += '\n';
        pretty += await prettyPrint(jsonData[key], pre + '    ');
      } else {
        pretty += jsonData[key] + '\n';
      }
    }
  }
  return pretty;
}

module.exports = { prettyPrint };
