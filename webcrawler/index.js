import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';

import { getJson } from 'serpapi';

import { ApifyClient } from 'apify-client';

const port = process.env.PORT || 3500;

const app = express();

app.use(cors());
app.use(express.json());

// Initialize the ApifyClient with API token
const client = new ApifyClient({
  token: process.env.APIFY_TOKEN,
});

// Hello world endpoint
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Patents endpoint
// The request should be a POST request with a body containing an array of keywords of the following format:
// {
//   "keywords": [
//     "machine learning",
//     "sustainable"
//   ]

app.post('/patents', async (req, res) => {
  try {
    // Getting the query from the request body
    const keywords = req.body.keywords;

    // Keywords to a query string
    const query = keywords.join(' ');

    const response = await getJson(
      {
        engine: 'google_patents',
        q: query,
        api_key: process.env.SERP_API_KEY,
      },
      (json) => {
        console.log(json['organic_results']);
      }
    );

    res.send(response?.organic_results || []);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// News endpoint
// The request should be a POST request with a body containing an array of urls of the following format:
// {
//   "urls": [
//     "https://www.theguardian.com",
//     "https://www.nytimes.com"
//   ]
// }

app.post('/news', async (req, res) => {
  try {
    // Getting the urls from the request body
    const urlsList = req.body.urls;

    const startUrls = urlsList.map((url) => {
      return { url };
    });

    // Prepare crawler settings

    const input = {
      startUrls: startUrls,
      onlyNewArticles: false,
      onlyNewArticlesPerDomain: false,
      onlyInsideArticles: true,
      enqueueFromArticles: false,
      crawlWholeSubdomain: false,
      onlySubdomainArticles: false,
      scanSitemaps: false,
      saveSnapshots: false,
      useGoogleBotHeaders: false,
      minWords: 150,
      mustHaveDate: true,
      isUrlArticleDefinition: {
        minDashes: 4,
        hasDate: true,
        linkIncludes: [
          'article',
          'storyid',
          '?p=',
          'id=',
          '/fpss/track',
          '.html',
          '/content/',
        ],
      },
      proxyConfiguration: {
        useApifyProxy: true,
      },
      useBrowser: false,
      extendOutputFunction: ($) => {
        const result = {};
        // Uncomment to add a title to the output
        // result.pageTitle = $('title').text().trim();

        return result;
      },
    };

    // Making a call to the crawler actor

    const run = await client.actor('hy5TYiCBwQ9o8uRKG').call(input);

    // Fetch results from the run's dataset (if any)

    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    // Sending the results back to the client
    res.send(items);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log('Server is running on port', port);
});
