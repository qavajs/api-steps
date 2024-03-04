import memory from '@qavajs/memory';
import {DataTable, When} from '@cucumber/cucumber';
import {dataTable2Object, sendHttpRequest} from './utils';
import GraphQl from './GraphQl';

/**
 * Create request template and save it to memory
 * @param {string} method - should be named as one of the http methods (e.g. GET, POST, PUT, DELETE and etc.)
 *
 * @example
 * When I create 'GET' request 'request'
 */
When('I create {string} request {string}', function (method: string, key: string) {
  memory.setValue(key, { method });
});

/**
 * Create GraphQL request template and save it to memory
 * @example
 * When I create GraphQL request 'request'
 */
When('I create GraphQL request {string}', function (key: string) {
  const blankRequest = new GraphQl();
  memory.setValue(key, blankRequest);
});

/**
 * Add data table of headers to request
 * @param {string} requestKey - memory key of request
 * @param {Array<[string, string]>} headersDataTable - key value headers
 *
 * @example
 * When I add headers to '$request':
 *   | Content-Type | application/json |
 */
When('I add headers to {string}:', async function (requestKey: string, headersDataTable: DataTable) {
  const request: RequestInit = await memory.getValue(requestKey);
  request.headers = Object.assign(await dataTable2Object(headersDataTable), request.headers);
});

/**
 * Add headers to request
 * @param {string} requestKey - memory key of request
 * @param {string} headersKey - memory key of headers that resolves to JS object
 *
 * @example
 * When I add '$headers' headers to '$request'
 */
When('I add {string} headers to {string}', async function (headersKey: string, requestKey: string) {
  const request: RequestInit = await memory.getValue(requestKey);
  request.headers = Object.assign(await memory.getValue(headersKey), request.headers);
});

/**
 * Add body to request
 * @param {string} requestKey - memory key of request
 * @param {string} body - body
 *
 * @example
 * When I add body to '$request':
 * """
 *  {
 *      "message": "qavajs"
 *  }
 * """
 */
When('I add body to {string}:', async function (requestKey: string, body: string) {
  const request: RequestInit = await memory.getValue(requestKey);
  request.body = await memory.getValue(body);
});

/**
 * Add query or variables to GraphQL request.
 * @param {string} property - one of GraphQl specific properties "query" or "variables"
 * @param {string} requestKey - memory key of request
 * @param {string} valueString - multiline string to be set as GraphQl body value.
 *
 * @example
 * When I add query to GraphQL '$request':
 * """
 *    query {
 *      characters(page: 2, filter: { name: "rick" }) {
 *        results {
 *          name
 *           }
 *         }
 *      }
 **/
When('I add {gqlRequestProperty} to GraphQL {string}:', async function (property: string, requestKey: string, valueString: string) {
  const request: any = await memory.getValue(requestKey);
  request[property] = (await memory.getValue(valueString));
});

/**
 * Add form data body to request
 * @param {string} requestKey - memory key of request
 * @param {string} body - body
 *
 * @example
 * When I add body to '$request':
 *   | key      | value                    | filename | contentType      |
 *   | formKey  | formValue                |          | application/json |
 *   | otherKey | otherValue               |          | text/plain       |
 *   | fileKey  | $file('./path/file.png') | file.png | image/png        |
 */
When('I add form data body to {string}:', async function (requestKey: string, dataTable: DataTable) {
  const request: RequestInit = await memory.getValue(requestKey);
  const formData = new FormData();
  for (const record of dataTable.hashes()) {
    const key = await memory.getValue(record.key);
    const value = await memory.getValue(record.value);
    const fileName = await memory.getValue(record.filename) ?? 'default';
    const type = await memory.getValue(record.contentType);
    formData.append(key, new Blob([value], { type }), fileName);
  }
  request.body = formData;
});

/**
 * Add body to request
 * @param {string} requestKey - memory key of request
 * @param {string} body - body
 *
 * @example
 * When I add '$body' body to '$request'
 */
When('I add {string} body to {string}', async function (bodyKey: string, requestKey: string) {
  const request: RequestInit = await memory.getValue(requestKey);
  request.body = await memory.getValue(bodyKey);
});

/**
 * Add url to request
 * @param {string} requestKey - memory key of request
 * @param {string} url - url
 *
 * @example
 * When I add 'https://qavajs.github.io/' url to '$request'
 */
When('I add {string} url to {string}', async function (urlKey: string, requestKey: string) {
  const request: RequestInit & { url: string } = await memory.getValue(requestKey);
  request.url = await memory.getValue(urlKey);
});

/**
 * Send request and send response
 * @param {string} requestKey - memory key of request
 * @param {string} responseKey - memory key to save response
 *
 * @example
 * When I send '$request' request and save response as 'response'
 */
When('I send {string} request and save response as {string}', async function (requestKey: string, responseKey: string) {
  const request: RequestInit & { url: string } = await memory.getValue(requestKey);
  const response = await sendHttpRequest(request.url, request, this);
  memory.setValue(responseKey, response);
});
