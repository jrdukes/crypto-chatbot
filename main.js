require('dotenv').config();

const fetch = require('isomorphic-fetch');

const Telegraf = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start(ctx => ctx.reply('Welcome'));
bot.help(ctx => ctx.reply('Send me a sticker'));
bot.on('sticker', ctx => ctx.reply('👍'));
bot.hears('hi', ctx => ctx.reply('Hey there'));

const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';

const fn = ctx => {
  fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then(res => res.json())
    .then(res =>
      ctx.reply(
        `Bitcoin's Current Price: $${res.bpi.USD.rate_float
          .toFixed(2)
          .toLocaleString()}`
      )
    );
};

bot.hears('bitcoin', fn);
bot.launch();
