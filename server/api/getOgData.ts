import { defineEventHandler, getQuery } from 'h3';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

export default defineEventHandler(async (event) => {
  const { url } = getQuery(event);

  if (!url) {
    return { error: 'No URL provided' };
  }

  try {
    const response = await fetch(url as string);
    const html = await response.text();

    const $ = cheerio.load(html);
    const metaTags = $('meta[property^="og:"]');

    const ogData: Record<string, string> = {};

    metaTags.each((_, el) => {
      const property = $(el).attr('property');
      const content = $(el).attr('content');
      if (property && content) {
        ogData[property] = content;
      }
    });

    return { ogData };
  } catch (error) {
    return { error: 'Failed to fetch or parse Open Graph data' };
  }
});
