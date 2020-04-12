import { google }  from '../../node_modules/googleapis/build/src/index';
const sheets = google.sheets('v4');
import { SCOPES } from './config.js'

export async function getAuthToken() {
    const auth = new google.auth.GoogleAuth({
        scopes: SCOPES
    });

    return await auth.getClient();
}

export async function getSpreadSheetValues({spreadsheetId, auth, sheetName}) {
    return await sheets.spreadsheets.values.get({
        spreadsheetId,
        auth,
        range: sheetName
    });
}


