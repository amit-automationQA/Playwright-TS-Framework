import { test as base, expect } from '@playwright/test'; //Base Playwright test and expect
import { faker } from '@faker-js/faker';  //Used to generate random test data
import { DateTime } from 'luxon'; //Used to handle date and time
import dotenv from 'dotenv'; //Used to manage environment variables
import Ajv from 'ajv';
import addFormats from "ajv-formats"; // <-- must import like this
import postResponseSchema from '../schemas/post_api_response_schema.json';


// Load environment variables from .env file
dotenv.config();

// Initialize AJV for JSON schema validation
const ajv = new Ajv({ strict: false }); // disables strict mode warnings
addFormats(ajv); // enables "date", "date-time", "email", etc.
const validate = ajv.compile(postResponseSchema);


// Define custom fixtures
type MyFixtures = {
  bookingId: number;
  token: string;
  bookingData: {
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    bookingdates: { checkin: string; checkout: string };
    additionalneeds: string;
  };
};

// Helper function to generate random booking data
const generateBookingData = (): MyFixtures['bookingData'] => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const totalPrice = faker.number.int({ min: 50, max: 500 });
  const depositPaid = faker.datatype.boolean();
  const checkInDate = DateTime.now().plus({ days: 1 }).toISODate()!;
  const checkOutDate = DateTime.now().plus({ days: 10 }).toISODate()!;
  const additionalNeeds = faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Dinner', 'None']);

  return {
    firstname: firstName,
    lastname: lastName,
    totalprice: totalPrice,
    depositpaid: depositPaid,
    bookingdates: {
      checkin: checkInDate,
      checkout: checkOutDate,
    },
    additionalneeds: additionalNeeds,
  };
};

// Extend Playwright test with custom fixtures
export const test = base.extend<MyFixtures>({
  bookingData: async ({ }, use: (value: MyFixtures['bookingData']) => Promise<void>) => {
    const data = generateBookingData();
    await use(data);
  },

  bookingId: async ({ request, bookingData }, use: (value: number) => Promise<void>) => {
    const res = await request.post('/booking', { data: bookingData });
    expect(res.ok()).toBeTruthy();
    const body = await res.json();

    // Validate response against JSON schema
    const valid = validate(body);  // Step 1: validate schema
    if (!valid) console.error(validate.errors);  // Step 2: log errors if any
    expect(valid).toBeTruthy();  // Step 3: fail test if response doesn't match schema
    console.log('Created Booking ID via POST Request in Fixtures : ', body.bookingid);
    await use(body.bookingid);
  },

  token: async ({ request }, use: (value: string) => Promise<void>) => {
    const tokenBody = {
      username: process.env.AUTH_USERNAME!,
      password: process.env.AUTH_PASSWORD!,
    };
    const res = await request.post('/auth', { data: tokenBody });
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    console.log('Generated Token via Auth Request in Fixtures : ', body.token);
    await use(body.token);
  },
});


export { expect };
