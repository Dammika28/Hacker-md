const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia05wVHk1NWlRTUxLcU1hVjRCOExFNWxpcHFCeTByU09ibUtVc0FDeDJWUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRmhQN3JGejRSN2pRZXpsYWE1aktxNzBHY0ZUcUNNQjh3MzlpRk0zM25YVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxRlA4UnViNHlaY3RpSi9SMWgvdmd0OWtBSUt1OGN4RVBzenB3VCsxYWwwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5cHhHL3FGQm9qODJiOXJudmQ1eE1wVDNaaTRxT1hjRUhONmcxUUgzd0JzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktGS291MUg1eTQvM0N2RFpZVDFmbXhkZ0lDdFl0eEpvZTE4UGFSc2V3MUE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdKeU5RMmZzamZXUjU4Q1ZYZks1REdERXY3bnlNYWtDZG55ekZQSDV4RXc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK09yc3RlbVRZOStFNDhQekZWT3pVOTg3c2pTVFNNUFhiUXpYbzdsSmFtST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiajV1R2Z5dFU0QWRoV3JOeDY5bkZtRENCYm9GbmFEUlpiZlRBVmExdXJYbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkU4anYxTlJ6TEZlQ1crcXJPMjdYOTdzaEo4K1BlL1ArL2ZBRjdxYUtBbEdacVhkUE9aVHJ6U0F2QXhndlFnNTVvMklaVWNNaWhVYkQ3MzRQN2ZJS0NnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYsImFkdlNlY3JldEtleSI6Iit1dDhWWWdyckJZa0QvZXI0eVkwYjcreEcza0ZYYmlIaFBNVFBuRUluK009IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImhWMERsZHJiUnQ2S3ZveHBiazRmN0EiLCJwaG9uZUlkIjoiMjhmNmIyZjEtNjYzMC00NzRjLTkwMmQtYWNjNDk1NWIwYTlhIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9lUmZSbzBWaEpHM3I1Lzd3UmN5STVDR1Ezdz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTRlVBbzBqcDhmNGNacStlTTFRNmJkSnB0YzQ9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiTkNMMU1BQkEiLCJtZSI6eyJpZCI6Ijk0NzE3NTE1NTg3OjY5QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuqngSAgICAgICAgICDwnZOX8J2TkPCdk5rwnZOU8J2ToSAgICAgICAgIOqngiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSmpmazdnREVPMm9xTFlHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoibTkxckVwdksvSm5tdUpQaGhWVUlNQlF4blZRY1ZnZk1xeTFadS9MbVlBUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZjhaRUNvT3RJQWNVSkI5S0lUMEdsdVdrcmJxOFUvT1kzOGRqMEpQLzljRytOdkNnKzZYY2FVb0dEdzZKS1JkVlpuQnFVcGR0YzVwamlPNDg1TGVWRGc9PSIsImRldmljZVNpZ25hdHVyZSI6IlVVVWdHdldQbDRtczJmY25NdXlPOEs5cmZWaW1LeDlGeUNpWUIyaHdZS0xyRHZudDQxWU9tb1B3dXVkclFLeG42c1ozcURXQk03RHcrY1dhb29lWEJBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTQ3MTc1MTU1ODc6NjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWnZkYXhLYnl2eVo1cmlUNFlWVkNEQVVNWjFVSEZZSHpLc3RXYnZ5NW1BRSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNDUxOTU0N30=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Hacker",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "94717515587",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Hacker bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/7fad220f8082eaff5eb1d.jpg',
    MODE: process.env.PUBLIC_MODE || "group ",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '9' ,
    ETAT : process.env.PRESENCE || '6',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   DB: process.env.DB || 'postgres://neoverse:pomrleUMXwlmlpIcW2oFJmMX0CXzaFkf@dpg-combonun7f5s73d7uoog-a.oregon-postgres.render.com/neoverse_wz98',
                  /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
