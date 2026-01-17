import { test, expect } from '../../fixtures/apiFixtures';
import Ajv from 'ajv';
import addFormats from "ajv-formats";
import getResponseSchema from '../../schemas/get_api_response_schema.json';

// Initialize AJV for JSON schema validation
const ajv = new Ajv({ strict: false }); // disables strict mode warnings
addFormats(ajv); // enables "date", "date-time", "email", etc.
const validate = ajv.compile(getResponseSchema);

test('Get Booking Details by  ID - path parameter @api', async ({ bookingId, request }) => {

    //Make GET API Request to fetch booking details by ID and verify response
    const response = await request.get(`/booking/${bookingId}`);
    //Validate Status Code and Response Body 
    expect.soft(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log("Response Body: ", responseBody);

    // Validate response against JSON schema
    const valid = validate(responseBody); // Step 1: validate schema
    if (!valid) console.error(validate.errors);     // Step 2: log errors if any
    expect(valid).toBeTruthy(); // test fails if response doesn't match schema

    expect.soft(responseBody).toHaveProperty('firstname');
    expect.soft(responseBody).toHaveProperty('lastname');
    expect.soft(responseBody).toHaveProperty('totalprice');
    expect.soft(responseBody).toHaveProperty('depositpaid');
    expect.soft(responseBody).toHaveProperty('bookingdates');
    expect.soft(responseBody.bookingdates).toHaveProperty('checkin');
    expect.soft(responseBody.bookingdates).toHaveProperty('checkout');

});

test('Get Booking IDs by Name with Query Parameters @api', async ({ request }) => {
    const firstName = "Jim"; //Query Parameter
    const lastName = "Brown"; //Query Parameter
    //Make GET API Request to fetch booking IDs by Name using Query Parameters and verify response
    const response = await request.get(`/booking`, {
        params: {
            firstname: firstName,
            lastname: lastName
        }
    });
    //Validate Status Code and Response Body 
    expect.soft(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log("Response Body: ", responseBody);
    
    // Validate response against JSON schema
    const valid = validate(responseBody); // Step 1: validate schema
    if (!valid) console.error(validate.errors);     // Step 2: log errors if any
    expect(valid).toBeTruthy(); // test fails if response doesn't match schema
    
    expect.soft(responseBody.length).toBeGreaterThan(0);
    expect.soft(Array.isArray(responseBody)).toBeTruthy();
    for (const booking of responseBody) {
        expect.soft(booking).toHaveProperty('bookingid');
        expect.soft(typeof booking.bookingid).toBe('number');
        expect.soft(booking.bookingid).toBeGreaterThan(0);
    }
});
