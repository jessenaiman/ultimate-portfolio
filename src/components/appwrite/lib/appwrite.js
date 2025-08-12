import { Client, Account, Databases } from "appwrite";


const client = new Client()
    .setEndpoint(import.meta.env.PUBLIC_APPWRITE_PUBLIC_ENDPOINT)
    .setProject(import.meta.env.PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };
