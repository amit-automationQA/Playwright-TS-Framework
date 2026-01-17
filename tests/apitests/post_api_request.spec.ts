import { test, expect } from '@playwright/test';
import fs from 'fs';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';
import Ajv from 'ajv';
import addFormats from "ajv-formats"; // <-- must import like this
import postResponseSchema from '../../schemas/post_api_response_schema.json';

const ajv = new Ajv({ strict: false }); // disables strict mode warnings
addFormats(ajv); // enables "date", "date-time", "email", etc.

const validate = ajv.compile(postResponseSchema);


test('Verify POST API Request @api', async ({ request }) => {
    const postData = {
        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "Breakfast"
    }

    //Make POST API Request to create a new booking and verify response
    const response = await request.post('/booking', {
        data: postData
    });

    //Validate Status Code and Response Body 
    expect.soft(response.status()).toBe(200);
    const responseBody = await response.json();

    console.log("Response Body: ", responseBody);
    // Validate response against JSON schema
    const valid = validate(responseBody);  // Step 1: validate schema
    if (!valid) console.error(validate.errors);  // Step 2: log errors if any
    expect(valid).toBeTruthy();  // Step 3: fail test if response doesn't match schema


    expect.soft(responseBody.booking.firstname).toBe(postData.firstname);
    expect.soft(responseBody.booking.lastname).toBe(postData.lastname);
    expect.soft(responseBody).toHaveProperty('bookingid');
    expect.soft(responseBody.booking.totalprice).toBe(postData.totalprice);
    expect.soft(responseBody.booking.depositpaid).toBe(postData.depositpaid);
    expect.soft(responseBody.booking.bookingdates.checkin).toBe(postData.bookingdates.checkin);
    expect.soft(responseBody.booking.bookingdates.checkout).toBe(postData.bookingdates.checkout);
    expect.soft(responseBody.booking.additionalneeds).toBe(postData.additionalneeds);

});

test('Verify POST API Request using JSON File @api', async ({ request }) => {

    const jsonFilePath = './testdata/post_request_body.json';
    const requestBody: any = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

    //Make POST API Request to create a new booking and verify response
    const response = await request.post('/booking', {
        data: requestBody
    });

    //Validate Status Code and Response Body 
    expect.soft(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log("Response Body: ", responseBody);

    // Validate response against JSON schema
    const valid = validate(responseBody);  // Step 1: validate schema
    if (!valid) console.error(validate.errors);  // Step 2: log errors if any
    expect(valid).toBeTruthy();  // Step 3: fail test if response doesn't match schema

    expect.soft(responseBody.booking.firstname).toBe(requestBody.firstname);
    expect.soft(responseBody.booking.lastname).toBe(requestBody.lastname);
    expect.soft(responseBody).toHaveProperty('bookingid');
    expect.soft(responseBody.booking.totalprice).toBe(requestBody.totalprice);
    expect.soft(responseBody.booking.depositpaid).toBe(requestBody.depositpaid);
    expect.soft(responseBody.booking.bookingdates.checkin).toBe(requestBody.bookingdates.checkin);
    expect.soft(responseBody.booking.bookingdates.checkout).toBe(requestBody.bookingdates.checkout);
    expect.soft(responseBody.booking.additionalneeds).toBe(requestBody.additionalneeds);

});

test('Verify POST API Request using random data generation @api', async ({ request }) => {

    //Data Generation using faker and luxon
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalPrice = faker.number.int({ min: 50, max: 500 });
    const depositPaid = faker.datatype.boolean();
    const checkInDate = DateTime.now().plus({ days: 1 }).toISODate();
    const checkOutDate = DateTime.now().plus({ days: 10 }).toISODate();
    const additionalNeeds = faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Dinner', 'None']);


    const postData = {
        "firstname": firstName,
        "lastname": lastName,
        "totalprice": totalPrice,
        "depositpaid": depositPaid,
        "bookingdates": {
            "checkin": checkInDate,
            "checkout": checkOutDate
        },
        "additionalneeds": additionalNeeds
    }

    //Make POST API Request to create a new booking and verify response
    const response = await request.post('/booking', {
        data: postData
    });

    //Validate Status Code and Response Body 
    expect.soft(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log("Response Body: ", responseBody);

    // Validate response against JSON schema
    const valid = validate(responseBody);  // Step 1: validate schema
    if (!valid) console.error(validate.errors);  // Step 2: log errors if any
    expect(valid).toBeTruthy();  // Step 3: fail test if response doesn't match schema
    
    expect.soft(responseBody.booking.firstname).toBe(postData.firstname);
    expect.soft(responseBody.booking.lastname).toBe(postData.lastname);
    expect.soft(responseBody).toHaveProperty('bookingid');
    expect.soft(responseBody.booking.totalprice).toBe(postData.totalprice);
    expect.soft(responseBody.booking.depositpaid).toBe(postData.depositpaid);
    expect.soft(responseBody.booking.bookingdates.checkin).toBe(postData.bookingdates.checkin);
    expect.soft(responseBody.booking.bookingdates.checkout).toBe(postData.bookingdates.checkout);
    expect.soft(responseBody.booking.additionalneeds).toBe(postData.additionalneeds);

});
