import { test, expect } from '../../fixtures/apiFixtures';

test('Verify DELETE API Request @api', async ({ bookingId, token, request }) => {
    //Make DELETE API Request to delete the booking and verify response
    const deleteResponse = await request.delete(`/booking/${bookingId}`, {
        headers: {
            'Cookie': `token=${token}`,
            'Content-Type': 'application/json'
        }
    });
    //Validate Status Code
    expect.soft(deleteResponse.status()).toBe(201);
    console.log("DELETE Response Status: ", deleteResponse.status());

    //Make GET API Request to verify booking is deleted
    const getResponse = await request.get(`/booking/${bookingId}`);

    //Validate Status Code
    expect.soft(getResponse.status()).toBe(404);
    console.log("GET Response Status after Deletion: ", getResponse.status());
    console.log("GET Response Body after Deletion: ", await getResponse.text());
});