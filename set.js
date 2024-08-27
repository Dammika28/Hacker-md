const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || ''eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYU1lV1psMFA1dEhZYzQwM3Frd09JdXM2cDBMaUdXdnBjMTBjMy9INVkwYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicGJpdFdLbnlDbVpTVGV0LzVSMGNRZ1F3bktyVFJnaEkyNUhxdTZXYnZTST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBSHRlYVhiMmwycWhQTGZFd3NvWUtxeXk2TU1EbFJoazErTWdvK0NOQjBnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqSXAvb2ptekcydnhSSXFMaStOSk9pbFRLV3JnSmZNLy9YSC95V3ZaR3djPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFBb3NlTTlWVHlKMndNZXlaOHk0STJvU2RCSVNNWE5pTjBleTRsamd0RVU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVCK1dIVU5EZFAxeUI0WHJzQlJNQVgwZGFSRGV2QkRuc0JHVU13MVozR1k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUdUcnNuU2xSYUt1K0diMUFFTDdkQ3RCdUF3NkwyME5sc1FsTnZKMHkxaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRkpyTC9wVHpMMVYzeWFTL2ErYTdYc0JPbjkvd3N6SXRnQ2paeFlCTy9tOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJLWWVRd1E4MzlRZlBCRmlhRnFVRmRaZC9hN1VGN1lwM0diSVF4NGFBT05URUtCT3U2Rmx5bmFYWkQwWFB4VmladkpkQWVBenJvN0tNV2RhVXQ4QUJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTgsImFkdlNlY3JldEtleSI6InFxRFRpd3d0WDlhaXRVMUJKTU1yR3JHcGt1bUljd0ZnZnA5UjAveGFmM1E9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlMxSGxTdVFkUmhleVNYY1JKVGlHNHciLCJwaG9uZUlkIjoiYjFhMjZlMDAtN2IxMi00NDQxLWI1YTctZTZhNDNhOTQ4ZTVjIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkF3OFBqTzRVWU9QZm5sNTBHSHdMOU5sclphWT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKSUxPMjdRTDhRN2FiYUR5RFYxQ3dhbGxKVTg9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiTU1QNURBQ1ciLCJtZSI6eyJpZCI6Ijk0NzE3NTE1NTg3OjczQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuqngSAgICAgICAgICDwnZOX8J2TkPCdk5rwnZOU8J2ToSAgICAgICAgIOqngiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSm5mazdnREVJakh0N1lHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoibTkxckVwdksvSm5tdUpQaGhWVUlNQlF4blZRY1ZnZk1xeTFadS9MbVlBUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiY3lMa21tU2U1TkdmS1ZSNjY1ZmU1TytOZmpxY0pmQXdZV0dpWjdOUzEzVjVWS0ErMWhRSWhDSEprbHJZOVlQNmJZU1N1VjZyZDQ5dkpTcXpGRU9qQ1E9PSIsImRldmljZVNpZ25hdHVyZSI6Iks3dTJmR2xTbEJVaWgzM2srYXoxZTAxdnBUdkJGMUpDVm96dndDRk5xUXU1cmdSTVN6VzFYbEM0NEJRbkFCQ3MybEVBNUh1T1RDaWhmVmJNYWlUVkFnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTQ3MTc1MTU1ODc6NzNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWnZkYXhLYnl2eVo1cmlUNFlWVkNEQVVNWjFVSEZZSHpLc3RXYnZ5NW1BRSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNDc2OTE3M30=
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "joel_it",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255714595078",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'joel bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/7fad220f8082eaff5eb1d.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '1',
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
