const { REACT_APP_BITLY_TOKEN } = process.env;

export const getShortenUrl = async longUrl => {
  const params = {
    "long_url": longUrl
  }
  const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
    method: 'POST',
    body: JSON.stringify(params),
    headers:{
      'Content-Type': 'application/json',
      Authorization: `Bearer ${REACT_APP_BITLY_TOKEN}`
    },
  });

  if (response.status < 400) {
    const data = await response.json();
    return data.link;
  } else {
    return longUrl;
  }
}
