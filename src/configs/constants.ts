import dotenv from 'dotenv';
dotenv.config();

const { NODE_APP_DB_NAME, NODE_APP_DB_URL, NODE_APP_DB_COLLECTION_NAME } = process.env;

export const ListAmBaseURL = 'https://www.list.am';
export const MobileCentreBaseURL = 'www.mobilecentre.am';
export const DB_NAME = NODE_APP_DB_NAME;
export const DB_COLLECTION_NAME = NODE_APP_DB_COLLECTION_NAME;
export const DB_URL = NODE_APP_DB_URL;
