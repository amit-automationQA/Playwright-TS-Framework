import { test, expect } from '../../fixtures/apiFixtures';
import Ajv from 'ajv';
import addFormats from "ajv-formats"; 
import putResponseSchema from '../../schemas/put_api_response_schema.json';

// Initialize AJV for JSON schema validation
const ajv = new Ajv({ strict: false }); // disables strict mode warnings
addFormats(ajv); // enables "date", "date-time", "email", etc.
const validate = ajv.compile(putResponseSchema);

function readJsonFile(filePath: string): any {
    const fs = require('fs');
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

test('Verify PUT API Request @api', async ({ bookingId, token, request }) => {
    //Make PUT API Request to update the booking and verify response
    const putRequestBody = readJsonFile('./testdata/put_request_body.json');
    const putResponse = await request.put(`/booking/${bookingId}`, {
        data: putRequestBody,
        headers: {
            'Cookie': `token=${token}`,
            'Content-Type': 'application/json'
        }
    });
    //Validate Status Code and Response Body 
    expect.soft(putResponse.ok()).toBeTruthy();
    const putResponseBody = await putResponse.json();
    console.log("PUT Response Body: ", putResponseBody);

    // Validate response against JSON schema
    const valid = validate(putResponseBody); // Step 1: validate schema
    if (!valid) console.error(validate.errors); // Step 2: log errors if any
    expect(valid).toBeTruthy(); // Step 3: fail test if response doesn't match schema

    expect.soft(putResponseBody.firstname).toBe(putRequestBody.firstname);
    expect.soft(putResponseBody.lastname).toBe(putRequestBody.lastname);
    expect.soft(putResponseBody.totalprice).toBe(putRequestBody.totalprice);
    expect.soft(putResponseBody.depositpaid).toBe(putRequestBody.depositpaid);
    expect.soft(putResponseBody.bookingdates.checkin).toBe(putRequestBody.bookingdates.checkin);
    expect.soft(putResponseBody.bookingdates.checkout).toBe(putRequestBody.bookingdates.checkout);
    expect.soft(putResponseBody.additionalneeds).toBe(putRequestBody.additionalneeds);
});